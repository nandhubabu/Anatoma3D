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
  const { camera, gl, size } = useThree();
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3());
  const isTransitioning = useRef<boolean>(false);
  const controlsRef = useRef<any>(null);
  const prevPresetRef = useRef<CameraPreset | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  const prevAspectRef = useRef<number | null>(null);

  // Stable target vector memoized by coordinate values
  const targetVec = useMemo(
    () => new THREE.Vector3(target[0], target[1], target[2]),
    [target[0], target[1], target[2]]
  );

  // Calculate responsive auto-fit distance based on current canvas viewport aspect ratio
  const aspect = size.width / Math.max(size.height, 1);
  const responsiveDistance = aspect < 1.0
    ? distance * (1.1 / Math.max(aspect * 0.9, 0.45))
    : distance;

  // Set initial position cleanly on mount and adapt on significant aspect ratio shifts (e.g. mobile rotation)
  useEffect(() => {
    const [tx, ty, tz] = target;

    if (!isInitializedRef.current) {
      camera.position.set(
        tx + responsiveDistance * 0.6,
        ty + responsiveDistance * 0.45,
        tz + responsiveDistance * 0.6
      );
      camera.lookAt(tx, ty, tz);
      if (controlsRef.current) {
        controlsRef.current.target.set(tx, ty, tz);
        controlsRef.current.update();
      }
      prevPresetRef.current = preset;
      prevAspectRef.current = aspect;
      isInitializedRef.current = true;
      isTransitioning.current = false;
      return;
    }

    // Auto-fit on display orientation change (e.g., portrait <-> landscape)
    if (prevAspectRef.current !== null && Math.abs(prevAspectRef.current - aspect) > 0.15) {
      prevAspectRef.current = aspect;
      const currentDir = camera.position.clone().sub(targetVec).normalize();
      if (currentDir.lengthSq() < 0.001) currentDir.set(0, 0, 1);
      camera.position.copy(targetVec.clone().add(currentDir.multiplyScalar(responsiveDistance)));
      camera.lookAt(targetVec);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetVec);
        controlsRef.current.update();
      }
    }

    // Preset camera switches
    if (prevPresetRef.current !== preset) {
      prevPresetRef.current = preset;
      const newPos = new THREE.Vector3();

      switch (preset) {
        case 'front':
          newPos.set(tx, ty, tz + responsiveDistance);
          break;
        case 'back':
          newPos.set(tx, ty, tz - responsiveDistance);
          break;
        case 'left':
          newPos.set(tx - responsiveDistance, ty, tz);
          break;
        case 'right':
          newPos.set(tx + responsiveDistance, ty, tz);
          break;
        case 'top':
          newPos.set(tx, ty + responsiveDistance, tz + 0.001);
          break;
        case 'bottom':
          newPos.set(tx, ty - responsiveDistance, tz + 0.001);
          break;
        case 'isometric':
        default:
          newPos.set(
            tx + responsiveDistance * 0.6,
            ty + responsiveDistance * 0.45,
            tz + responsiveDistance * 0.6
          );
          break;
      }

      targetPos.current.copy(newPos);
      isTransitioning.current = true;
    }
  }, [preset, responsiveDistance, target[0], target[1], target[2], aspect]);

  // Smooth lerp transition ONLY during explicit preset switches
  useFrame(() => {
    if (isTransitioning.current) {
      camera.position.lerp(targetPos.current, 0.09);
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
      rotateSpeed={0.4}
      zoomSpeed={0.3}
      panSpeed={0.4}
      minDistance={0.8}
      maxDistance={Math.max(responsiveDistance * 3.0, 18)}
      target={targetVec}
      screenSpacePanning
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
};
