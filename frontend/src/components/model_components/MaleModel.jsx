import { useGLTF } from '@react-three/drei';
import PropTypes from 'prop-types';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three'



export function MaleModel({ adjustCloth, height, waist, shirtColor, product, setIsLoading }) {

  
  const [heights, setHeights] = useState(1);
  const [waists, setWaists] = useState(1);

   if (!product || !product.model) {
    console.warn("Invalid or missing product model:", product);
  
  }
  const humanModel = useGLTF(
  product.category === "Men"
    ? "https://AnasSaeed09.github.io/EcoModels/tryOn-Models/Male.glb"
    : "https://AnasSaeed09.github.io/EcoModels/tryOn-Models/Woman.glb"
);


  const clothingModel = useGLTF(product.model || "https://AnasSaeed09.github.io/EcoModels/MShirt2.glb");
  
   const scene = humanModel.scene;
  const humanRef = useRef();
  const clothingRef = useRef();



// For centering model on canvas
  useEffect(() => {

    if(!scene) return;
   const box = new THREE.Box3().setFromObject(scene);
   const center = new THREE.Vector3();
   box.getCenter(center);
   scene.position.sub(center);
  }, [scene]);


 useEffect(() => {
    if (scene && clothingModel.scene) {
      // ✅ Delay to ensure post-render, preventing "setState during render"
      const timeout = setTimeout(() => setIsLoading?.(false), 0);
      return () => clearTimeout(timeout);
    }
  }, [scene, clothingModel.scene, setIsLoading]);

// For Handling height and waist on Human Model
useEffect(() => {

  const spine = scene.getObjectByName('spine');
  
  if (!spine) {
    console.warn('❌ Could not find "Spine" object');
    return;
  }

  const DEFAULT_HEIGHT = 155;
  const DEFAULT_WAIST = 82;

  const heightScale = height / DEFAULT_HEIGHT;
  const waistScale = waist / DEFAULT_WAIST;

  const newX = 1 + waistScale * 0.15;
  const newY = 1 + heightScale * 0.1;
  const newZ = 1 + waistScale * 0.15;

  spine.scale.set(newX, newY, newZ);

  console.log("Adjust: ", adjustCloth);

  setHeights(newY);
  setWaists(newX);
}, [height, waist, humanModel, shirtColor, clothingModel]);


// Function to Handle Colors on shirt
const handleColorChange = (object) => {
  object.traverse((child) => {
    if (child.isMesh && child.material) {
      // Avoid modifying shared material
      child.material = child.material.clone();
      child.material.color.set(shirtColor);
    }
  });
};

// For Adjusting Cloth on Human Model
  useEffect(() => {
    
 if(!adjustCloth) return;

  const suit = product.subCategory === "Bottomwear"
    ? scene.getObjectByName("Pants")
    : scene.getObjectByName("Cloth");

  if (!suit) {
    console.warn('❌ Could not find suit object');
    return;
  }

  const parent = suit.parent;
  parent.remove(suit);

  const cloth = clothingModel.scene.clone(true);
  cloth.name = product.subCategory === "Bottomwear" ? "RePants" : "ReCloth";
  clothingRef.current = cloth;
  parent.add(cloth);

  const skinnedMesh = [];
  cloth.traverse((child) =>{
    if(child.type === "SkinnedMesh"){
      skinnedMesh.push(child);
    }
  })
 // const shirtMesh = cloth.getObjectByProperty('type','SkinnedMesh');
  const humanMesh = scene.getObjectByProperty('type','SkinnedMesh');

  const humanSkeleton = humanMesh?.skeleton;

  if(skinnedMesh.length > 0 && humanSkeleton){
    skinnedMesh.forEach((mesh)=>{
      mesh.bind(humanSkeleton, mesh.matrixWorld);
    })
    
  }else{
     console.warn("Could not find shirt mesh or human skeleton", { skinnedMesh, humanSkeleton });
  }


  }, [adjustCloth,heights, waists, clothingModel]);

  // For Applying color on shirt
useEffect(()=>{
  if(!adjustCloth || !scene) return ;
  const cloth = product.subCategory === "Bottomwear" ? scene.getObjectByName("RePants") : scene.getObjectByName("ReCloth");

   if(!cloth){
    console.warn("Cloth was not found.");
    return;
   }
   if(shirtColor !==""){
    handleColorChange(cloth);
   }
    // cloth.scale.set(waists, heights, waists);

},[shirtColor,adjustCloth]);


 

  return (
 product?.model && product?.category && product?.subCategory ?(
    <group ref={humanRef}>
      <primitive object={humanModel.scene} />
    </group>
 ): null
  );
}


MaleModel.propTypes = {
  adjustCloth: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  waist: PropTypes.number.isRequired,
  shirtColor: PropTypes.string.isRequired,
  product: PropTypes.shape({
      category: PropTypes.string.isRequired,
       subCategory: PropTypes.string.isRequired,
       model: PropTypes.string.isRequired,  
    }).isRequired,
setIsLoading: PropTypes.func.isRequired,
}
