import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
const Title = ({ text1, text2 }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="inline-flex gap-2 items-center mb-3"
    >
      <p className="text-gray-300">
        {text1} <span className="text-red-500 font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-200"></p>
    </motion.div>
  );
};

export default Title;
