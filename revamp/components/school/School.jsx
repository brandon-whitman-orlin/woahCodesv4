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
      if (type === "pencil") {
        schoolRef.current.rotation.set(20, 0.8, 0);
      } else if (type === "paper") {
        schoolRef.current.rotation.set(1, -0.6, 0.30);
      }
    }
  }, [type]);

  useFrame(({ clock }) => {
    if (schoolRef.current) {
      const floatSpeed = 1.5;
      const floatHeight = 0.3;
      const offset = type === "paper" ? Math.PI / 2 : 0;

      schoolRef.current.position.y = Math.sin(clock.getElapsedTime() * floatSpeed + offset) * floatHeight;
    }
  });

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 5, 5]} intensity={5} castShadow />
      <primitive ref={schoolRef} object={schoolModel} scale={type === "paper" ? 0.08 : 0.02} position={[0, 0, 0]} />
    </>
  );
};

export default School;
