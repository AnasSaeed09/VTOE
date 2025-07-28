import React, { useEffect } from 'react'
import {Html,useProgress} from "@react-three/drei"
export const Loader = ({setIsLoading}) => {
  const {progress, active} = useProgress();

  useEffect(() => {
    setIsLoading?.(active); // Optional chaining in case setIsLoading is not provided
  }, [active, setIsLoading]);
  
    return (
   <Html center>
    <div className='flex flex-col items-center'>
        <div className='w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-2'>
        <p className='text-white text-sm'>Loading... {Math.floor(progress)}%</p>
    </div>
    </div>
   </Html>
  )
}
