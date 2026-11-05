import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface AutoFitCameraProps {
  baseDistance?: number;
  target?: [number, number, number];
}

export const AutoFitCamera: React.FC<AutoFitCameraProps> = ({
  baseDistance = 4.2,
  target = [0, 0, 0]
}) => {
  const { camera, size } = useThree();
  const prevAspectRef = useRef<number | null>(null);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);
    const fitDistance = aspect < 1.0 ? baseDistance * (1.1 / Math.max(aspect * 0.9, 0.45)) : baseDistance;

    if (prevAspectRef.current === null || Math.abs(prevAspectRef.current - aspect) > 0.12) {
      prevAspectRef.current = aspect;
      const targetVec = new THREE.Vector3(...target);
      const currentDir = camera.position.clone().sub(targetVec).normalize();
      if (currentDir.lengthSq() < 0.001) currentDir.set(0.6, 0.45, 0.6).normalize();
      camera.position.copy(targetVec.clone().add(currentDir.multiplyScalar(fitDistance)));
      camera.lookAt(targetVec);
    }
  }, [size.width, size.height, baseDistance, target, camera]);

  return null;
};
