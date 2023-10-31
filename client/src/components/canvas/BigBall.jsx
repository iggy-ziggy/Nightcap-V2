import React, { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Decal, Edges, Float, OrbitControls, Preload, useTexture } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import CanvasLoader from '../Loader';
import { logo } from '../../assets';


function BigBall() {
  const decal = useTexture(logo);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh 
        castShadow
         receiveShadow 
         scale={1.75}
         rotation={[0, 45, 0]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhongMaterial
          color="mediumslateblue"
          opacity={0.5}
          transparent
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          flatShading
          map={decal}
        />
        <Edges />
      </mesh>
    </Float>
  )
}

export default function BigBallCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [20, 1, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <BigBall />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}