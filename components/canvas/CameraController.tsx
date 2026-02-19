import { OrbitControls } from '@react-three/drei';

export function CameraController() {
  return (
    <OrbitControls 
        minDistance={3}
        maxDistance={15}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
    />
  );
}
