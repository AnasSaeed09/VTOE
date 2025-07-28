import React, { useEffect, useRef, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { motion, useInView } from "framer-motion";
import { TypeWriterAnimation } from "../components/TypeWriterAnimation";
import { fadeIn, fadeInRight, staggerContainer } from "../variants";
const About = () => {
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6, once: false });

  useEffect(() => {
    let timeout;
    if (!isInView) {
      timeout = setTimeout(() => setStep(0), 300); // delay reset
    }
    return () => clearTimeout(timeout);
  }, [isInView]);
  return (
    <div>
      <div className="pt-8 text-2xl text-center border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        ref={ref}
        className="flex flex-col gap-16 my-10 md:flex-row"
      >
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          {step >= 0 && (
            <TypeWriterAnimation
              key={`step-0-${isInView}`}
              text="Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.
                "
              tag="p"
              speed={2}
              onComplete={() => setStep(1)}
              trigger={isInView}
              classString=""
            />
          )}
          {step >= 1 && (
            <TypeWriterAnimation
              key={`step-1-${isInView}`}
              text="Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                "
              tag="p"
              speed={2}
              onComplete={() => setStep(2)}
              trigger={isInView}
              classString=""
            />
          )}

          {step >= 2 && (
            <TypeWriterAnimation
              key={`step-2-${isInView}`}
              text="Our Mission"
              tag="b"
              speed={2}
              onComplete={() => setStep(3)}
              trigger={isInView}
              classString="text-gray-400"
            />
          )}

          {step >= 3 && (
            <TypeWriterAnimation
              key={`step-3-${isInView}`}
              text="Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond."
              tag="b"
              speed={2}
              onComplete={() => setStep(4)}
              trigger={isInView}
              classString=""
            />
          )}
        </div>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="py-4 text-xl "
      >
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col mb-20 text-sm md:flex-row"
      >
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            variants={fadeInRight}
            className="flex flex-col gap-5 px-10 py-8 border md:px-16 sm:py-20"
          >
            <b>
              {index === 0 && "Quality Assurance:"}
              {index === 1 && "Convenience:"}
              {index === 2 && "Exceptional Customer Service:"}
            </b>
            <p className="text-gray-400">
              {index === 0 &&
                "We meticulously select and vet each product to ensure it meets our stringent quality standards."}
              {index === 1 &&
                "With our user-friendly interface and hassle-free ordering process, shopping has never been easier."}
              {index === 2 &&
                "Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority."}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <NewsletterBox />
    </div>
  );
};

export default About;
