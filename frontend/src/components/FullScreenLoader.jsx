import React from 'react'

export const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-[1000] bg-black bg-opacity-70 flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-white ml-4">Loading...</p>
    </div>
  )
}
