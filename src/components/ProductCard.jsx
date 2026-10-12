
import React from "react";
import { Card } from "@heroui/react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const isUp = product.change?.dir === "up";

  const toBanglaNumber = (value) =>
    String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[digit]);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full w-full"
    >
      <Card
        shadow="none"
        className="h-full w-full rounded-2xl border border-[#dce5dd] bg-[#f9fbf9] transition duration-200 hover:shadow-md sm:rounded-[20px]"
      >
        <div className="flex h-full flex-col gap-3 p-3 sm:gap-4 sm:p-5">

          {/* Product Information */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f4f0] text-2xl sm:h-[58px] sm:w-[58px] sm:rounded-2xl sm:text-[30px]">
              {product.image || product.categoryIcon}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-[#263329] sm:text-lg">
                {product.nameBn}
              </h3>

              <p className="text-xs text-[#4b574e] sm:text-sm">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit}
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex min-w-0 items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="mb-1 text-xs text-[#4b574e] sm:text-sm">
                আজকের দাম
              </p>

              <p className="text-lg font-extrabold text-[#263329] sm:text-xl">
                {toBanglaNumber(product.today)} টাকা
              </p>
            </div>

            <div
              className={`mb-0.5 flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-xs font-bold sm:px-3 sm:py-1.5 sm:text-sm ${
                isUp
                  ? "bg-[#eef5ef] text-[#dc3737]"
                  : product.change?.dir === "down"
                    ? "bg-[#edf7ee] text-[#168348]"
                    : "bg-gray-100 text-gray-600"
              }`}
            >
              <span>
                {isUp
                  ? "▲"
                  : product.change?.dir === "down"
                    ? "▼"
                    : "●"}
              </span>

              <span>
                {toBanglaNumber(product.change?.pct ?? 0)}%
              </span>
            </div>
          </div>

        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;

