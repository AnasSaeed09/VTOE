import React, { useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import { useLoading } from "../context/LoadingContext";

export const Loader = () => {
  const { progress, active } = useProgress();
  const { setLoading } = useLoading();

  useEffect(() => {
    let mounted = true;
    if (mounted) setLoading(active);
    return () => {
      mounted = false;
    };
  }, [active, setLoading]);

  return (
    <Html center>
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 border-4 border-white border-t-blue-600 rounded-full animate-spin mb-2"></div>
        <p className="text-white text-sm">Loading... {Math.floor(progress)}%</p>
      </div>
    </Html>
  );
};
