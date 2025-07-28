import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { TypeWriterAnimation } from "./TypeWriterAnimation";
import { useInView } from "framer-motion";
const Hero = () => {
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });
  useEffect(() => {
    if (!isInView) {
      setStep(0);
    }
  }, [isInView]);
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div
        ref={ref}
        className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0"
      >
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            {step >= 0 && (
              <TypeWriterAnimation
                key={`step-0-${isInView}`}
                tag="p"
                text="OUR BESTSELLERS"
                speed={40}
                onComplete={() => setStep(1)}
                trigger={isInView}
                classString="font-medium text-sm md:text-base"
              />
            )}
          </div>

          {step >= 1 && (
            <TypeWriterAnimation
              key={`step-1-${isInView}`}
              tag="h1"
              text="Latest Arrivals"
              speed={40}
              onComplete={() => setStep(2)}
              classString="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed"
              trigger={isInView}
            />
          )}
          <div className="flex items-center gap-2">
            {step >= 2 && (
              <TypeWriterAnimation
                key={`step-2-${isInView}`}
                tag="p"
                text="SHOP NOW"
                speed={40}
                onComplete={() => setStep(3)}
                classString="font-semibold text-sm md:text-base"
                trigger={isInView}
              />
            )}

            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="w-full sm:w-1/2" src={assets.hero_img} alt="" />
    </div>
  );
};

export default Hero;
