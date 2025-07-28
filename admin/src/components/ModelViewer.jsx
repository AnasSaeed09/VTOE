import React, { useEffect, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from './Loader';
// Load and display the model
const Model = ({ url }) => {
  const gltf = useGLTF(url);

  if (!gltf?.scene) {
    console.error("No scene found in GLTF file:", url);
    return null;
  }

  return <primitive object={gltf.scene} />;
};

// 3D Model Viewer Component
export const ModelViewer = ({ file }) => {
  const [modelUrl, setModelUrl] = useState(null);

  function ErrorFallback({ error }) {
  return <div className="text-red-500">Something went wrong: {error.message}</div>;
}

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);

      // Cleanup URL object when component unmounts or file changes
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  if (!modelUrl) return null;

  return (
      <ErrorBoundary FallBackComponent = {ErrorFallback}>
    <Canvas style={{ width: 160, height: 160 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Loader setIsLoading={()=> {}} />}>
        <Model url={modelUrl} />
      </Suspense>
      <OrbitControls enableZoom />
    </Canvas>
    </ErrorBoundary>
  );
};
