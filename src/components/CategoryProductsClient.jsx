
"use client";

import { useEffect, useState } from "react";
import baseUrl from "@/services/baseUrl";
import ProductCard from "@/components/ProductCard";

export default function CategoryProductsClient({
  categorySlug,
  currentCategory,
}) {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${baseUrl}/products?category=${encodeURIComponent(categorySlug)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch category products");
        }

        const data = await response.json();
        setCategoryProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category data error:", error);
        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const sortedProducts = [...categoryProducts].sort((a, b) => {
    const priceA = Number(a.today) || 0;
    const priceB = Number(b.today) || 0;

    if (sortBy === "asc") return priceA - priceB;
    if (sortBy === "desc") return priceB - priceA;

    return 0;
  });

  const productCount = categoryProducts.length.toLocaleString("bn-BD");

  if (loading) {
    return (
      <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex min-h-40 items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 p-4 sm:gap-4 sm:p-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl sm:h-14 sm:w-14 sm:text-3xl">
          {currentCategory.icon}
        </div>

        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">
            {currentCategory.nameBn || "পণ্য"}
          </h1>

          <p className="mt-1 text-xs text-base-content/60 sm:text-sm">
            {productCount} টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-base-300 bg-base-100 p-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
        <p className="text-sm text-base-content/70">
          মোট{" "}
          <span className="font-semibold text-base-content">
            {productCount}
          </span>{" "}
          টি পণ্য
        </p>

        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <label htmlFor="sortBy" className="shrink-0 text-sm">
            সাজান:
          </label>

          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm w-full max-w-56 sm:w-56"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl border border-base-300 bg-base-100 p-8 text-center">
          <p className="text-base font-semibold">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      )}
    </main>
  );
}