import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { fadeInRight, staggerContainer } from "../variants";

const OurPolicy = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.7 }}
      className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700"
    >
      {[...Array(3)].map((_, index) => (
        <motion.div key={index} variants={fadeInRight}>
          {index === 0 && (
            <>
              <img
                src={assets.exchange_icon}
                className="w-12 m-auto mb-5 bg-white object-cover"
                alt=""
              />
              <p className=" font-semibold">Easy Exchange Policy</p>
              <p className=" text-gray-400">
                We offer hassle free exchange policy
              </p>
            </>
          )}
          {index === 1 && (
            <>
              <img
                src={assets.quality_icon}
                className="w-12 m-auto mb-5"
                alt=""
              />
              <p className=" font-semibold">7 Days Return Policy</p>
              <p className=" text-gray-400">
                We provide 7 days free return policy
              </p>
            </>
          )}

          {index === 2 && (
            <>
              <img
                src={assets.support_img}
                className="w-12 m-auto mb-5 bg-white object-cover "
                alt=""
              />
              <p className=" font-semibold">Best customer support</p>
              <p className=" text-gray-400">we provide 24/7 customer support</p>
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default OurPolicy;
