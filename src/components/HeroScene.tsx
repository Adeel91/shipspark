"use client";

import {
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
  const phone = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time =
      state.clock.elapsedTime;

    if (phone.current) {
      phone.current.rotation.y =
        -0.12 +
        Math.sin(time * 0.34) *
          0.13;

      phone.current.rotation.x =
        0.05 +
        Math.sin(time * 0.27) *
          0.035;

      phone.current.rotation.z =
        -0.035 +
        Math.sin(time * 0.22) *
          0.025;
    }

    if (core.current) {
      const pulse =
        1 +
        Math.sin(time * 2.7) *
          0.11;

      core.current.scale.setScalar(
        pulse,
      );
    }

    if (ringA.current) {
      ringA.current.rotation.z =
        time * 0.34;
    }

    if (ringB.current) {
      ringB.current.rotation.z =
        time * -0.42;
    }
  });

  return (
    <group ref={phone}>
      <RoundedBox
        args={[2.55, 5.15, 0.36]}
        radius={0.29}
        smoothness={8}
      >
        <meshStandardMaterial
          color="#151821"
          metalness={0.82}
          roughness={0.17}
        />
      </RoundedBox>

      <RoundedBox
        args={[2.28, 4.82, 0.05]}
        radius={0.23}
        smoothness={8}
        position={[0, 0, 0.21]}
      >
        <meshStandardMaterial
          color="#070a12"
          emissive="#102753"
          emissiveIntensity={0.38}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.75, 0.18, 0.055]}
        radius={0.09}
        smoothness={6}
        position={[
          0,
          2.03,
          0.255,
        ]}
      >
        <meshStandardMaterial color="#010205" />
      </RoundedBox>

      <mesh
        ref={ringA}
        position={[
          0,
          0.6,
          0.27,
        ]}
      >
        <ringGeometry
          args={[0.96, 0.982, 100]}
        />

        <meshBasicMaterial
          color="#57e6ff"
          transparent
          opacity={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={ringB}
        position={[
          0,
          0.6,
          0.28,
        ]}
      >
        <ringGeometry
          args={[0.69, 0.712, 100]}
        />

        <meshBasicMaterial
          color="#f4f2ed"
          transparent
          opacity={0.78}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh
        ref={core}
        position={[
          0,
          0.6,
          0.31,
        ]}
      >
        <sphereGeometry
          args={[0.205, 40, 40]}
        />

        <meshStandardMaterial
          color="#ffffff"
          emissive="#57e6ff"
          emissiveIntensity={4}
        />
      </mesh>

      <RoundedBox
        args={[1.7, 0.55, 0.045]}
        radius={0.14}
        smoothness={6}
        position={[
          0,
          -0.72,
          0.255,
        ]}
      >
        <meshStandardMaterial
          color="#122239"
          emissive="#276d80"
          emissiveIntensity={0.35}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.42, 0.4, 0.045]}
        radius={0.11}
        smoothness={6}
        position={[
          0,
          -1.43,
          0.255,
        ]}
      >
        <meshStandardMaterial
          color="#10131a"
        />
      </RoundedBox>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />

      <directionalLight
        position={[5, 6, 8]}
        intensity={3}
      />

      <pointLight
        position={[-4, 2, 4]}
        intensity={18}
        distance={13}
        color="#5970ff"
      />

      <pointLight
        position={[4, -2, 4]}
        intensity={16}
        distance={12}
        color="#57e6ff"
      />

      <Sparkles
        count={58}
        scale={[7, 7, 4]}
        size={1.6}
        speed={0.2}
        opacity={0.34}
        color="#dce6ff"
      />

      <Float
        speed={1.25}
        rotationIntensity={0.08}
        floatIntensity={0.48}
      >
        <Phone />
      </Float>
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{
        position: [
          0,
          0.05,
          7.8,
        ],
        fov: 37,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      <Scene />
    </Canvas>
  );
}
