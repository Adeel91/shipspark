"use client";

import {
  Environment,
  Float,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import {
  Canvas,
  useFrame,
} from "@react-three/fiber";
import {
  useRef,
} from "react";
import * as THREE from "three";

function Phone() {
  const group =
    useRef<THREE.Group>(
      null,
    );

  const elapsed =
    useRef(0);

  useFrame(
    (
      _state,
      delta,
    ) => {
      elapsed.current +=
        delta;

      if (
        !group.current
      ) {
        return;
      }

      /*
       * Smooth premium product animation.
       * Never spins around completely.
       */
      group.current.rotation.x =
        -0.045 +
        Math.sin(
          elapsed.current *
            0.45,
        ) *
          0.018;

      group.current.rotation.y =
        -0.13 +
        Math.sin(
          elapsed.current *
            0.32,
        ) *
          0.065;

      group.current.rotation.z =
        -0.015 +
        Math.sin(
          elapsed.current *
            0.38,
        ) *
          0.018;
    },
  );

  return (
    <Float
      speed={1.15}
      rotationIntensity={0}
      floatIntensity={0.28}
      floatingRange={[
        -0.1,
        0.1,
      ]}
    >
      <group
        ref={group}
        rotation={[
          -0.045,
          -0.13,
          -0.015,
        ]}
      >
        {/* TITANIUM OUTER CHASSIS */}
        <RoundedBox
          args={[
            3.18,
            6.48,
            0.36,
          ]}
          radius={0.43}
          smoothness={12}
        >
          <meshPhysicalMaterial
            color="#8c918a"
            metalness={0.95}
            roughness={0.16}
            clearcoat={0.75}
            clearcoatRoughness={0.14}
          />
        </RoundedBox>

        {/* DARK SIDE FRAME */}
        <RoundedBox
          args={[
            3.06,
            6.36,
            0.385,
          ]}
          radius={0.4}
          smoothness={12}
          position={[
            0,
            0,
            0.015,
          ]}
        >
          <meshPhysicalMaterial
            color="#252a25"
            metalness={0.88}
            roughness={0.2}
            clearcoat={0.45}
          />
        </RoundedBox>

        {/* BLACK FRONT BEZEL */}
        <RoundedBox
          args={[
            2.92,
            6.2,
            0.19,
          ]}
          radius={0.355}
          smoothness={12}
          position={[
            0,
            0,
            0.185,
          ]}
        >
          <meshStandardMaterial
            color="#020302"
            metalness={0.22}
            roughness={0.24}
          />
        </RoundedBox>

        {/* OLED GLASS DISPLAY */}
        <RoundedBox
          args={[
            2.78,
            6.04,
            0.075,
          ]}
          radius={0.3}
          smoothness={12}
          position={[
            0,
            0,
            0.305,
          ]}
        >
          <meshPhysicalMaterial
            color="#030806"
            emissive="#06170b"
            emissiveIntensity={0.4}
            metalness={0.05}
            roughness={0.08}
            clearcoat={1}
            clearcoatRoughness={0.04}
            reflectivity={1}
          />
        </RoundedBox>

        {/* SUBTLE SCREEN GLOW */}
        <RoundedBox
          args={[
            2.62,
            5.87,
            0.018,
          ]}
          radius={0.26}
          smoothness={10}
          position={[
            0,
            0,
            0.355,
          ]}
        >
          <meshBasicMaterial
            color="#07130a"
            transparent
            opacity={0.72}
          />
        </RoundedBox>

        {/* DYNAMIC ISLAND */}
        <RoundedBox
          args={[
            0.87,
            0.245,
            0.055,
          ]}
          radius={0.12}
          smoothness={10}
          position={[
            0,
            2.55,
            0.385,
          ]}
        >
          <meshPhysicalMaterial
            color="#000000"
            roughness={0.08}
            clearcoat={1}
          />
        </RoundedBox>

        {/* FRONT CAMERA */}
        <mesh
          position={[
            0.27,
            2.55,
            0.416,
          ]}
        >
          <circleGeometry
            args={[
              0.045,
              32,
            ]}
          />

          <meshPhysicalMaterial
            color="#08110c"
            emissive="#17291c"
            emissiveIntensity={0.25}
            roughness={0.05}
            clearcoat={1}
          />
        </mesh>

        {/* RELEASE INTELLIGENCE OUTER RING */}
        <mesh
          position={[
            0,
            0.92,
            0.405,
          ]}
        >
          <torusGeometry
            args={[
              1.02,
              0.021,
              18,
              140,
            ]}
          />

          <meshStandardMaterial
            color="#53ff72"
            emissive="#53ff72"
            emissiveIntensity={1.45}
          />
        </mesh>

        {/* SOFT OUTER RING */}
        <mesh
          position={[
            0,
            0.92,
            0.397,
          ]}
        >
          <torusGeometry
            args={[
              1.17,
              0.009,
              16,
              140,
            ]}
          />

          <meshBasicMaterial
            color="#53ff72"
            transparent
            opacity={0.2}
          />
        </mesh>

        {/* INNER LIME RING */}
        <mesh
          position={[
            0,
            0.92,
            0.415,
          ]}
        >
          <torusGeometry
            args={[
              0.71,
              0.018,
              18,
              140,
            ]}
          />

          <meshStandardMaterial
            color="#c5ff0a"
            emissive="#c5ff0a"
            emissiveIntensity={1.25}
          />
        </mesh>

        {/* SIGNAL CORE */}
        <mesh
          position={[
            0,
            0.92,
            0.435,
          ]}
        >
          <circleGeometry
            args={[
              0.18,
              48,
            ]}
          />

          <meshStandardMaterial
            color="#efffc9"
            emissive="#c5ff0a"
            emissiveIntensity={1.3}
          />
        </mesh>

        {/* MAIN INTELLIGENCE CARD */}
        <RoundedBox
          args={[
            1.92,
            0.57,
            0.045,
          ]}
          radius={0.14}
          smoothness={10}
          position={[
            0,
            -0.72,
            0.41,
          ]}
        >
          <meshPhysicalMaterial
            color="#365b1d"
            emissive="#53ff72"
            emissiveIntensity={0.26}
            roughness={0.22}
            clearcoat={0.7}
          />
        </RoundedBox>

        {/* CARD ACCENT */}
        <RoundedBox
          args={[
            1.48,
            0.105,
            0.024,
          ]}
          radius={0.045}
          smoothness={6}
          position={[
            -0.06,
            -0.72,
            0.442,
          ]}
        >
          <meshStandardMaterial
            color="#c5ff0a"
            emissive="#c5ff0a"
            emissiveIntensity={0.65}
          />
        </RoundedBox>

        {/* SECONDARY INTELLIGENCE CARD */}
        <RoundedBox
          args={[
            1.62,
            0.49,
            0.04,
          ]}
          radius={0.12}
          smoothness={10}
          position={[
            0,
            -1.59,
            0.408,
          ]}
        >
          <meshPhysicalMaterial
            color="#101810"
            emissive="#16341a"
            emissiveIntensity={0.3}
            roughness={0.28}
            clearcoat={0.5}
          />
        </RoundedBox>

        {/* SECONDARY SIGNAL */}
        <mesh
          position={[
            -0.56,
            -1.59,
            0.44,
          ]}
        >
          <circleGeometry
            args={[
              0.06,
              32,
            ]}
          />

          <meshStandardMaterial
            color="#53ff72"
            emissive="#53ff72"
            emissiveIntensity={1.6}
          />
        </mesh>

        {/* HOME INDICATOR */}
        <RoundedBox
          args={[
            0.82,
            0.055,
            0.018,
          ]}
          radius={0.025}
          smoothness={6}
          position={[
            0,
            -2.72,
            0.402,
          ]}
        >
          <meshBasicMaterial
            color="#d7ddd7"
            transparent
            opacity={0.78}
          />
        </RoundedBox>

        {/* ACTION BUTTON */}
        <RoundedBox
          args={[
            0.052,
            0.34,
            0.13,
          ]}
          radius={0.025}
          smoothness={5}
          position={[
            -1.625,
            1.92,
            0,
          ]}
        >
          <meshPhysicalMaterial
            color="#737972"
            metalness={0.95}
            roughness={0.16}
          />
        </RoundedBox>

        {/* VOLUME UP */}
        <RoundedBox
          args={[
            0.052,
            0.58,
            0.13,
          ]}
          radius={0.025}
          smoothness={5}
          position={[
            -1.625,
            1.22,
            0,
          ]}
        >
          <meshPhysicalMaterial
            color="#737972"
            metalness={0.95}
            roughness={0.16}
          />
        </RoundedBox>

        {/* VOLUME DOWN */}
        <RoundedBox
          args={[
            0.052,
            0.58,
            0.13,
          ]}
          radius={0.025}
          smoothness={5}
          position={[
            -1.625,
            0.52,
            0,
          ]}
        >
          <meshPhysicalMaterial
            color="#737972"
            metalness={0.95}
            roughness={0.16}
          />
        </RoundedBox>

        {/* POWER BUTTON */}
        <RoundedBox
          args={[
            0.052,
            0.86,
            0.13,
          ]}
          radius={0.025}
          smoothness={5}
          position={[
            1.625,
            1.05,
            0,
          ]}
        >
          <meshPhysicalMaterial
            color="#737972"
            metalness={0.95}
            roughness={0.16}
          />
        </RoundedBox>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight
        intensity={0.58}
      />

      {/* WHITE PRODUCT LIGHT */}
      <directionalLight
        position={[
          4,
          6,
          7,
        ]}
        intensity={2.6}
        color="#ffffff"
      />

      {/* TITANIUM EDGE LIGHT */}
      <directionalLight
        position={[
          -5,
          2,
          5,
        ]}
        intensity={1.6}
        color="#dce3da"
      />

      {/* SHIPSPARK GREEN REFLECTION */}
      <pointLight
        position={[
          3.5,
          -0.4,
          3,
        ]}
        intensity={8}
        distance={7}
        color="#53ff72"
      />

      <pointLight
        position={[
          -3,
          2.8,
          3,
        ]}
        intensity={5}
        distance={6}
        color="#c5ff0a"
      />

      <Phone />

      <Sparkles
        count={26}
        scale={[
          6,
          7,
          3,
        ]}
        size={0.7}
        speed={0.14}
        opacity={0.24}
        color="#c5ff0a"
      />

      <Environment
        preset="city"
      />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [
            0,
            0,
            8.6,
          ],
          fov: 42,
        }}
        dpr={[
          1,
          1.5,
        ]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference:
            "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

export default HeroScene;
