import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "../variants";
import { TypeWriterAnimation } from "./TypeWriterAnimation";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });
  useEffect(() => {
    if (!isInView) {
      setStep(0); // Reset animation when leaving view
    }
  }, [isInView]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10">
      <div ref={ref} className="text-center py-8 text-3xl ">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <TypeWriterAnimation
          key={`step-0-${isInView}`}
          text="Unveil your style with our latest handpicked collection, where elegance meets everyday comfort. From timeless classics to trendsetting essentials, discover outfits that redefine your wardrobe."
          tag="p"
          speed={30}
          onComplete={() => setStep(1)}
          trigger={isInView}
          classString="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-300"
        />
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
