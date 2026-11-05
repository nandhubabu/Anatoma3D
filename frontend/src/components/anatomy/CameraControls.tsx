import React, { useEffect, useRef, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { CameraPreset } from '../../types/anatomy';

interface CameraControlsProps {
  preset: CameraPreset;
  distance?: number;
  target?: [number, number, number];
}

export const CameraControls: React.FC<CameraControlsProps> = ({
  preset,
  distance = 4.2,
  target = [0, 0, 0]
}) => {
  const { camera, gl } = useThree();
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const isTransitioning = useRef<boolean>(false);
  const controlsRef = useRef<any>(null);
  const prevPresetRef = useRef<CameraPreset | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  // Stable target vector memoized by coordinate values
  const targetVec = useMemo(
    () => new THREE.Vector3(target[0], target[1], target[2]),
    [target[0], target[1], target[2]]
  );

  // Set initial position cleanly on mount without animation or fighting
  useEffect(() => {
    if (!isInitializedRef.current) {
      const [tx, ty, tz] = target;
      camera.position.set(
        tx + distance * 0.6,
        ty + distance * 0.45,
        tz + distance * 0.6
      );
      camera.lookAt(tx, ty, tz);
      if (controlsRef.current) {
        controlsRef.current.target.set(tx, ty, tz);
        controlsRef.current.update();
      }
      prevPresetRef.current = preset;
      isInitializedRef.current = true;
      isTransitioning.current = false;
      return;
    }

    // Only transition if preset has explicitly changed from a user action
    if (prevPresetRef.current !== preset) {
      prevPresetRef.current = preset;
      const newPos = new THREE.Vector3();
      const [tx, ty, tz] = target;

      switch (preset) {
        case 'front':
          newPos.set(tx, ty, tz + distance);
          break;
        case 'back':
          newPos.set(tx, ty, tz - distance);
          break;
        case 'left':
          newPos.set(tx - distance, ty, tz);
          break;
        case 'right':
          newPos.set(tx + distance, ty, tz);
          break;
        case 'top':
          newPos.set(tx, ty + distance, tz + 0.001);
          break;
        case 'bottom':
          newPos.set(tx, ty - distance, tz + 0.001);
          break;
        case 'isometric':
        default:
          newPos.set(
            tx + distance * 0.6,
            ty + distance * 0.45,
            tz + distance * 0.6
          );
          break;
      }

      targetPos.current.copy(newPos);
      isTransitioning.current = true;
    }
  }, [preset, distance, target[0], target[1], target[2]]);

  // Smooth lerp transition ONLY during explicit preset switches
  useFrame(() => {
    if (isTransitioning.current) {
      camera.position.lerp(targetPos.current, 0.08);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetVec);
        controlsRef.current.update();
      }
      if (camera.position.distanceTo(targetPos.current) < 0.02) {
        camera.position.copy(targetPos.current);
        isTransitioning.current = false;
      }
    }
  });

  // Cancel any camera transition instantly when user interacts with mouse/touch
  useEffect(() => {
    const domElement = gl.domElement;
    const cancelTransition = () => {
      isTransitioning.current = false;
    };

    domElement.addEventListener('pointerdown', cancelTransition, { passive: true });
    domElement.addEventListener('wheel', cancelTransition, { passive: true });
    domElement.addEventListener('touchstart', cancelTransition, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', cancelTransition);
      domElement.removeEventListener('wheel', cancelTransition);
      domElement.removeEventListener('touchstart', cancelTransition);
    };
  }, [gl]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.12}
      rotateSpeed={0.38}
      zoomSpeed={0.28}
      panSpeed={0.4}
      minDistance={1.0}
      maxDistance={8.5}
      target={targetVec}
      screenSpacePanning
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
