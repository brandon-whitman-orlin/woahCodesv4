import React, { useRef, useEffect } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

import PaperModel from "../../assets/models/Paper.fbx";
import PencilModel from "../../assets/models/Pencil.fbx";

const School = ({ type = "pencil" }) => {
  const schoolRef = useRef();
  const modelPath = type === "paper" ? PaperModel : PencilModel;
  const schoolModel = useLoader(FBXLoader, modelPath);

  useEffect(() => {
    if (schoolRef.current) {
      // Log initial model position for debugging
      // console.log("Initial model position:", schoolRef.current.position);

      // Adjust rotation and position before animation
      if (type === "pencil") {
        schoolRef.current.rotation.set(20, 0.8, 0);
        schoolRef.current.position.set(0, 0, 0); // Adjust as needed
      } else if (type === "paper") {
        schoolRef.current.rotation.set(1.1, -0.5, 0);
        schoolRef.current.position.set(0.5, 1.2, 1); // Adjust to the correct height
      }

      // Log the adjusted position
      // console.log("Adjusted model position:", schoolRef.current.position);
    }
  }, [type]); // Run this effect when `type` changes

  useFrame(({ clock }) => {
    if (schoolRef.current) {
      const floatSpeed = 1.5;
      const floatHeight = 0.0025;
      const offset = type === "paper" ? Math.PI / 2 : 0;

      // Apply floating effect only to the Y-axis
      schoolRef.current.position.y =
        Math.sin(clock.getElapsedTime() * floatSpeed + offset) * floatHeight +
        schoolRef.current.position.y; // Keep other axes unaffected
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 5, 5]} intensity={5} castShadow />
      <primitive ref={schoolRef} object={schoolModel} scale={type === "paper" ? 0.23 : 0.02} />
    </>
  );
};

export default School;
