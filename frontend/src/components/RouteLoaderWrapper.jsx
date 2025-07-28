import React from 'react'
import { useLoading } from '../context/LoadingContext'
import { FullScreenLoader } from './FullScreenLoader';


export const RouteLoaderWrapper = ({children}) => {
    const {loading} = useLoading();
    return (
    <>
     {loading && <FullScreenLoader />}
     {children}
    </>
  )
}
