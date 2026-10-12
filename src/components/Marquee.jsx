"use client";

import React from "react";
import MarqueeText from "react-marquee-text";

const Marquee = ({ products = [] }) => {
return ( <div className="overflow-hidden rounded-xl border border-[#dce5de] bg-[#f9fbf9] py-3"> <MarqueeText direction="right" duration={8}>
{products.map((product) => {
const isUp = product.change?.dir === "up";
const isDown = product.change?.dir === "down";


      return (
        <div
          key={product.id}
          className="mx-5 flex shrink-0 items-center gap-2"
        >
          {/* Product icon */}
          <span className="text-xl">
            {product.image || product.categoryIcon || "🛒"}
          </span>

          {/* Product name */}
          <span className="whitespace-nowrap text-sm font-semibold text-[#26312a]">
            {product.nameBn}
          </span>

          {/* Price */}
          <span className="whitespace-nowrap text-sm font-bold text-[#26312a]">
            {Number(product.today).toLocaleString("bn-BD")} টাকা/
            {product.unit === "kg" ? "কেজি" : product.unit}
          </span>

          {/* Price change */}
          <span
            className={`flex items-center gap-1 whitespace-nowrap text-sm font-semibold ${
              isUp
                ? "text-red-500"
                : isDown
                  ? "text-green-600"
                  : "text-gray-500"
            }`}
          >
            {isUp ? "▲" : isDown ? "▼" : "●"}

            {Number(product.change?.pct ?? 0).toLocaleString("bn-BD", {
              maximumFractionDigits: 2,
            })}
            %
          </span>

          {/* Separator */}
          <span className="ml-3 text-gray-300">|</span>
        </div>
      );
    })}
  </MarqueeText>
</div>

);
};

export default Marquee;
