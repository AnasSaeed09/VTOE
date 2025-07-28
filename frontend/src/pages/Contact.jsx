import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28"
      >
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-300">OUR STORE</p>
          <p className=" text-gray-400">
            54500 AWAN TOWN <br /> PUNJAB, LAHORE, PAKISTAN
          </p>
          <p className=" text-gray-400">
            Tel: (042) 555-0132 <br />
            BUSINESS Email: F2021065268@umt.edu.pk
          </p>
          <p className="font-semibold text-xl text-gray-300">
            Careers at Forever
          </p>
          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </motion.div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
