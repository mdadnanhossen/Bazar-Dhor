
import React from "react";
import ProductCard from "./ProductCard";

const AllProducts = ({ products = [] }) => {
  return (
    <div id="সব-পণ্য" className="scroll-mt-24">
      <h2 className="text-xl font-bold sm:text-2xl">
        সব পণ্য
      </h2>

      <p className="mt-1 text-sm text-gray-600 sm:text-base">
        মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

