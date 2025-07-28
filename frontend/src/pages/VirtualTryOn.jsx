import { useState, Suspense, useEffect, useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { MaleModel } from "../components/model_components/MaleModel";
import { DirectionalLight } from "three";
import { Loader } from "../components/Loader";
import { ErrorBoundary } from 'react-error-boundary';
import { useLoading } from "../context/LoadingContext";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

import { useNavigate } from 'react-router-dom';



export const VirtualTryOn = () => {

  const navigate = useNavigate();
  const {productId, size} = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState('');
  const [productData, setProductData] = useState(false);
  const [adjustCloth, setAdjustCloth] = useState(false);
  const [height, setHeight] = useState(120);
  const [waist, setWaist] = useState(40);
  const [selectedColor, setSelectedColor] = useState("");
  const availableColors = ["red", "blue", "yellow", "green"];
 const [isLoading, setIsLoading] = useState(false);

 const fetchProductData = async () =>{
    products.map((item)=>{
      if(item._id === productId){
          setProductData(item);
          setImage(item.image[0]);
          return null;
      }
    })

 } 
 useEffect(()=>{
  fetchProductData();
 },[productId,products]);



function ErrorFallback({ error }) {
  return <div className="text-red-500">Something went wrong: {error.message}</div>;
}
  const handleInputChange = (e, setter) => {
    const value = parseInt(e.target.value) || 0;
    setter(value);
  };

  const increment = (setter, value, max) =>{ 
    if(value < max)
    {
     setter(value + 1); 
    }
    }
  const decrement = (setter, value, min) => { 
    if(value > min){
setter(value -1 );
    }
    }
  return (
    <div className="flex  bg-slate-700 w-full h-screen p-10 ">
      
       {/* Canvas */}
      <div className="bg-slate-400 w-1/2 h-full items-center flex justify-center flex-wrap">
       
       <ErrorBoundary FallBackComponent = {ErrorFallback}>
        <Canvas camera={{ position: [1, 3, 14], fov: 15 }} shadows
        className="bg-black">
          <ambientLight intensity={2} />
          <directionalLight position={[5,5,5]} intensity={3} castShadow />
          <directionalLight position={[-5,-5,-5]} intensity={3} />
          <pointLight position={[-1,1,1]} intensity={8} />
          <Environment preset="studio" />

          <Suspense fallback={<Loader />} >
          <MaleModel 
          key={`${height}-${waist}-${selectedColor}-${adjustCloth}`}
          adjustCloth={adjustCloth} 
          height={height}
          waist={waist}
          shirtColor={selectedColor}
          product={productData}
          setIsLoading = {setIsLoading}
          />
          </Suspense>
          <OrbitControls />
        </Canvas>
        </ErrorBoundary>
      </div>
      
      {/* Form Section  */}
      <div className="w-full sm:w-1/2 h-full p-4 sm:p-10 bg-white justify-center flex items-center flex-wrap">
        <form className={`space-y-6 ${isLoading ? 'pointer-events-none opacity-50': ''} max-w-md w-full`}>
          <fieldset>
            <legend className="text-xl font-bold mb-3">
              Add your requirements
            </legend>

            {/* Height Input */}
            <div className="mb-4">
              <label htmlFor="height" className="block mb-1">
                Height (cm)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decrement(setHeight, height, 120)}
                  className="px-2 py-1 bg-gray-600 text-white text-lg font-bold hover:bg-black active:bg-blue-500"
                >
                  -
                </button>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={height}
                  max={200}
                  min={120}
                  onChange={(e) => handleInputChange(e, setHeight)}
                  onKeyDown={(e) => e.preventDefault()}
                  className="text-center border w-44 border-b-sky-200"
                />

                <button
                  type="button"
                  onClick={() => increment(setHeight, height, 200)}
                  className="px-2 py-1 bg-gray-600 text-white text-lg font-bold hover:bg-black active:bg-blue-500"
                >
                  +
                </button>
              </div>
            </div>

            {/* Waist Input */}
            <div className="mb-4">
              <label htmlFor="waist" className="block mb-1">
                Waist (cm)
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => decrement(setWaist, waist, 40)}
                  className="px-2 py-1 bg-gray-600 text-white text-lg font-bold hover:bg-black active:bg-blue-500"
                >
                  -
                </button>
                <input
                  type="number"
                  name="waist"
                  id="waist"
                  max={110}
                  min={40}
                  value={waist}
                  onChange={(e) => handleInputChange(e, setWaist)}
                   onKeyDown={(e) => e.preventDefault()}
                  className="text-center border w-44 border-b-sky-200"
                />

                <button
                  type="button"
                  onClick={() => increment(setWaist, waist, 110)}
                  className="px-2 py-1 bg-gray-600 text-white text-lg font-bold hover:bg-black active:bg-blue-500"
                >
                  +
                </button>
              </div>
            </div>

          

              {/* Fitting Clothes */}
            <div className="mb-2">
                  <label className="block mb-1 text-lg "> Select given garment to fit:</label>
                  <img src={image} alt="Image Adjustment" 
                    className={`w-32 h-32 sm:h-34 md:w-34 md:h-34 object-contain cursor-pointer border border-b-2 hover:border-blue-500 active:border-red-300 border-black hover:shadow-md hover:shadow-blue-500
                      ${adjustCloth ? 'border-red-500 shadow-md shadow-red-500': ''}`}
                  onClick={()=> setAdjustCloth(true)}
                  />
      </div>

        {/* Color Selection  */}

            <div className="mb-3">
              <label className="block mb-1">Shirt Color</label>

              <div className="flex gap-2">
                {availableColors.map((color) => (
                  <div
                    key={color}
                    className={`w-10 h-10 rounded-full border-4 cursor-pointer ${
                      selectedColor === color
                        ? "border-slate-700"
                        : "border-transparent"
                    }`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color)}
                  ></div>
                ))}
              </div>
            </div>

            <div className='flex flex-row gap-3'>
<button 
  className='bg-blue-600 text-white px-8 py-3 text-sm active:bg-gray-700 shadow-md shadow-blue-400 hover:bg-slate-400'
  onClick={(e) => {
    e.preventDefault();
    navigate(`/product/${productId}`);
  }}
>
  Cancel
</button>

<button 
  onClick={(e) => {
    e.preventDefault();
    addToCart(productData._id, size);
    navigate(`/product/${productId}`);
  }} 
  className='bg-black text-white px-8 py-3 text-sm shadow-md active:bg-gray-700 hover:shadow-blue-300 hover:bg-gray-400'
>
  ADD TO CART
</button>

      </div>

          </fieldset>
        </form>
      </div>
    </div>
  );
};
