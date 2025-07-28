import React from 'react'

export const LoaderOverlay = () => {
  return (
    <div style={{
        position:'fixed',
        top:0, left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgb(0,0,0,0.5',
        zIndex: 9999,
        display: 'flex',
        alignItems:'center',
        justifyContent:'center',
        color: '#fff',
        fontSize: '1.5rem'
    }}>
        <div className='loader'>
            <div className='w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin'></div>
           <p className='ml-4'>Uploading, please wait...</p>
        </div>
    </div>
  )
}
