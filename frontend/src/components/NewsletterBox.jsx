import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "../variants";
import { TypeWriterAnimation } from "./TypeWriterAnimation";
const NewsletterBox = () => {
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });

  useEffect(() => {
    if (!isInView) {
      setStep(0); // Reset animation when leaving view
    }
  }, [isInView]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className=" text-center"
    >
      {step >= 0 && (
        <TypeWriterAnimation
          key={`step-0-${isInView}`}
          text="Subscribe now & get 20% off"
          tag="p"
          speed={10}
          onComplete={() => setStep(1)}
          trigger={isInView}
          classString="text-2xl font-medium text-red-400"
        />
      )}

      {step >= 1 && (
        <TypeWriterAnimation
          key={`step-1-${isInView}`}
          text="Stay connected and never miss an update! Subscribe to our newsletter to get the latest on new arrivals, exclusive offers, and special discounts — delivered straight to your inbox. Be the first to know and enjoy members-only benefits! "
          tag="p"
          speed={10}
          onComplete={() => setStep(1)}
          trigger={isInView}
          classString="text-gray-400 mt-3"
        />
      )}

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </motion.div>
  );
};

export default NewsletterBox;
