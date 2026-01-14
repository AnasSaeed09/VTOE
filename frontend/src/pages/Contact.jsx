import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-2xl text-center border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28"
      >
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-300">OUR STORE</p>
          <p className="text-gray-400 ">
            54500 AWAN TOWN <br /> PUNJAB, LAHORE, PAKISTAN
          </p>
          <p className="text-gray-400 ">
            Tel: (042) 555-0132 <br />
            BUSINESS Email: F2021065268@umt.edu.pk
          </p>
          <p className="text-xl font-semibold text-gray-300">
            Careers at Forever
          </p>
          <p className="text-gray-500 ">
            Learn more about our teams and job openings.
          </p>
          <button className="px-8 py-4 text-sm transition-all duration-500 border border-black hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </motion.div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
