import React, { useRef, useEffect } from "react";

function AnimationFrame() {
  const boxRef = useRef();

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (boxRef.current) {
        boxRef.current.rotation.x += 0.01;
        boxRef.current.rotation.y += 0.01;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <mesh ref={boxRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="green" />
    </mesh>
  );
}

export default AnimationFrame;
