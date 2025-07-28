import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { motion } from "framer-motion";
import { fadeIn, fadeInLeft, staggerContainer } from "../variants";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = Number(getCartAmount());
  const shipping = Number(delivery_fee);
  const total = subtotal === 0 ? 0 : subtotal + shipping;

  const rows = [
    { label: "Subtotal", value: subtotal },
    { label: "Shipping Fee", value: shipping },
    { label: "Total", value: total },
  ];

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.7 }}
        className="flex flex-col gap-2 mt-2 text-sm font-bold"
      >
        {rows.map((row, index) => (
          <motion.div
            key={index}
            variants={fadeInLeft}
            className="flex justify-between"
          >
            <p>{row.label}</p>
            <p>
              {currency}
              {row.value.toFixed(2)}
            </p>
          </motion.div>
        ))}

        <hr />
      </motion.div>
    </div>
  );
};

export default CartTotal;
