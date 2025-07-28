import React, { useContext, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import { TypeWriterAnimation } from "./TypeWriterAnimation";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "../variants";
const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("down", 0.1 * 1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      className="text-gray-700 cursor-pointer shadow-md hover:shadow-blue-500 transition-shadow duration-300 p-2 rounded"
    >
      <Link onClick={() => scrollTo(0, 0)} to={`/product/${id}`}>
        <div className="overflow-hidden w-full h-64 rounded-lg bg-gray-600 ">
          <img
            className="transition ease-in-out hover:scale-110 hover:drop-shadow-[0_4px_10px_rgba(59,130,246,0.5)] w-full h-full object-cover"
            src={image[0]}
            alt=""
          />
        </div>
        <TypeWriterAnimation
          key={`step-0-${isInView}`}
          tag="p"
          text={name}
          speed={50}
          onComplete={() => setStep(1)}
          trigger={isInView}
          classString="pt-3 pb-1 text-sm"
        />
        {step >= 1 && (
          <p className="text-sm font-medium ">
            {currency}
            {price}
          </p>
        )}
      </Link>
    </motion.div>
  );
};

export default ProductItem;
