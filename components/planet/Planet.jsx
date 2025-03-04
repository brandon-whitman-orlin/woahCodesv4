import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

import EarthModel from "../../assets/models/Earth.fbx";
import MoonModel from "../../assets/models/Moon.fbx";

const Planet = ({ type = "earth" }) => {
  const planetRef = useRef();
  const modelPath = type === "moon" ? MoonModel : EarthModel;
  const planetModel = useLoader(FBXLoader, modelPath);

  useEffect(() => {
    if (planetRef.current) {
      if (type === "earth") {
        planetRef.current.rotation.set(0.5, 2.8, 0);
      } else if (type === "moon") {
        planetRef.current.rotation.set(-0.2, -0.55, 3);
      }
    }
  }, [type]);

  useFrame(({ clock }) => {
    if (planetRef.current) {
      const floatSpeed = 1.5;
      const floatHeight = 0.3;
      const offset = type === "moon" ? Math.PI / 2 : 0;

      planetRef.current.position.y = Math.sin(clock.getElapsedTime() * floatSpeed + offset) * floatHeight;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 5, 5]} intensity={5} castShadow />
      <primitive ref={planetRef} object={planetModel} scale={type === "moon" ? 0.05 : 0.025} position={[0, 0, 0]} />
    </>
  );
};

export default Planet;
