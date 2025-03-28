import { useFrame } from "@react-three/fiber";

const CHAIR_SPEED = 0.1;
const DISTANCE_THRESHOLD = 0.01;

export default function useChairAnimation(chairRef, targetChairPosition, setTargetChairPosition) {
  useFrame(() => {
    if (chairRef.current && targetChairPosition) {
      chairRef.current.position.lerp(targetChairPosition, CHAIR_SPEED);
      if (chairRef.current.position.distanceTo(targetChairPosition) < DISTANCE_THRESHOLD) {
        setTargetChairPosition(null);
      }
    }
  });
}
