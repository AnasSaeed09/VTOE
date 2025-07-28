import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Product = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100 ">
      {/*----------- Product Data-------------- */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2}}
        className="flex flex-col gap-12 border-2 border-red-600 sm:gap-12 sm:flex-row bg-gray-950"
      >
        {/*---------- Product Images------------- */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
    {/* Thumbnails */}
    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-start sm:w-[18.7%] w-full gap-3 sm:gap-0">
      {productData.image.map((item, index) => (
        <img
          onClick={() => setImage(item)}
          src={item}
          key={index}
          className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded"
          alt=""
        />
      ))}
    </div>

    {/* Main Image */}
    <div className="w-full sm:w-[80%] overflow-hidden">
      <img className="object-cover w-full h-full rounded-md" src={image} alt="" />
    </div>
  </div>

  {/* Product Info */}
  <div className="flex-1 px-2 sm:px-0">
    <h1 className="mt-2 text-xl font-medium sm:text-2xl">{productData.name}</h1>

    {/* Rating */}
    <div className="flex items-center gap-1 mt-2">
      {Array(4).fill().map((_, i) => (
        <img key={i} src={assets.star_icon} alt="" className="w-4" />
      ))}
      <img src={assets.star_dull_icon} alt="" className="w-4" />
      <p className="pl-2 text-sm">(122)</p>
    </div>

    {/* Price */}
    <p className="mt-4 text-2xl font-semibold">
      {currency}
      {productData.price}
    </p>

    {/* Description */}
    <p className="mt-4 text-sm text-gray-600 sm:text-base md:w-4/5">{productData.description}</p>

    {/* Size Selection */}
    <div className="flex flex-col gap-3 my-6">
      <p className="font-medium">Select Size</p>
      <div className="flex flex-wrap gap-2">
        {productData.sizes.map((item, index) => (
          <button
            onClick={() => setSize(item)}
            className={`border-2 hover:shadow-md py-2 px-4 rounded-md bg-gray-100 ${
              item === size ? "border-orange-500" : "border-gray-300"
            }`}
            key={index}
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        className="px-6 py-3 text-sm text-white transition bg-blue-600 rounded hover:bg-blue-500 active:bg-blue-700"
        onClick={() => {
          if (!size) {
            toast.error("Select Product Size");
            return;
          }
          navigate(`/virtualtry-on/${productId}/${size}`);
        }}
      >
        Try on
      </button>

      <button
        onClick={() => addToCart(productData._id, size)}
        className="px-6 py-3 text-sm text-white transition bg-black rounded hover:bg-gray-700 active:bg-gray-900"
      >
        Add to Cart
      </button>
    </div>

    {/* Additional Info */}
    <hr className="mt-8 sm:w-4/5" />
    <div className="flex flex-col gap-1 mt-4 text-xs text-gray-500">
      <p>100% Original product.</p>
      <p>Cash on delivery is available on this product.</p>
      <p>Easy return and exchange policy within 7 days.</p>
    </div>
  </div>
      </motion.div>

      {/* ---------- Description & Review Section ------------- */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.2 }}
        className="mt-20"
      >
        <div className="flex">
          <b className="px-5 py-3 text-sm border">Description</b>
          <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      </motion.div>

      {/* --------- display related products ---------- */}

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;
