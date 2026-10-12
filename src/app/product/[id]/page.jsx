import baseUrl from "@/services/baseUrl";
import Link from "next/link";
import { notFound } from "next/navigation";

const getSingleProduct = async (id) => {
  const res = await fetch(`${baseUrl}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Products API failed: ${res.status}`);
  }

  const data = await res.json();
  const products = Array.isArray(data) ? data : data.products || [];

  const product = products.find(
    (item) => String(item.id) === String(id) || item.slug === id,
  );

  if (!product) {
    notFound();
  }

  return product;
};

const formatPrice = (price) => {
  const number = Number(price);

  if (price === null || price === undefined || price === "") {
    return "—";
  }

  return number.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  });
};

const ProductDetails = async ({ params }) => {
  const { id } = await params;
  const product = await getSingleProduct(id);

  // Calculate price summary from market data.
  const markets = Array.isArray(product.markets) ? product.markets : [];

  const allPrices = markets.flatMap((market) =>
    [market.min, market.max]
      .filter(
        (price) =>
          price !== null &&
          price !== undefined &&
          price !== "" &&
          Number.isFinite(Number(price)),
      )
      .map(Number),
  );

  const lowestPrice = allPrices.length > 0 ? Math.min(...allPrices) : null;

  const highestPrice = allPrices.length > 0 ? Math.max(...allPrices) : null;

  const averagePrice =
    allPrices.length > 0
      ? allPrices.reduce((sum, price) => sum + price, 0) / allPrices.length
      : null;

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 text-gray-800 sm:px-6">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>‹</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>

          <span>‹</span>

          <span className="font-semibold text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-4 sm:p-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-3xl">
              {product.image || product.categoryIcon || "🍚"}
            </div>

            <div>
              <h1 className="text-xl font-bold sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="text-sm text-gray-500">প্রতি {product.unit}</p>

              <p className="mt-1 text-xs text-gray-600">
                {product.categoryNameBn}
              </p>
            </div>
          </div>

          <div className="min-w-28 rounded-xl bg-[#f0f5f0] px-4 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>

            <h2 className="my-1 text-2xl font-bold">
              {formatPrice(product.today)}
            </h2>

            <p className="text-xs text-gray-500">টাকা / {product.unit}</p>

            <p
              className={`mt-1 text-xs font-semibold ${
                product.change?.dir === "up"
                  ? "text-red-600"
                  : product.change?.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change?.dir === "up"
                ? "▲"
                : product.change?.dir === "down"
                  ? "▼"
                  : "●"}{" "}
              {formatPrice(product.change?.pct ?? 0)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-3 text-base font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
            <div className="rounded-xl border border-[#e1e9e1] p-3 sm:p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {lowestPrice !== null
                  ? `${formatPrice(lowestPrice)} টাকা`
                  : "—"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বনিম্ন
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-3 sm:p-4">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>

              <p className="mt-1 text-xl font-bold text-red-600">
                {highestPrice !== null
                  ? `${formatPrice(highestPrice)} টাকা`
                  : "—"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                বাজারগুলোর মধ্যে সর্বাধিক
              </p>
            </div>

            <div className="rounded-xl border border-[#e1e9e1] p-3 sm:p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <p className="mt-1 text-xl font-bold text-green-600">
                {averagePrice !== null
                  ? `${formatPrice(averagePrice)} টাকা`
                  : "—"}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit}-এর হিসাবে
              </p>
            </div>
          </div>
        </section>

        {/* Market Prices */}
        <section className="rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-4 sm:p-5">
          <h2 className="mb-3 text-base font-bold">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-[#e1e9e1]">
            <table className="w-full min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#f8fbf8] text-gray-500">
                  <th className="px-3 py-3 text-left font-medium">বাজার</th>

                  <th className="px-3 py-3 text-left font-medium">বিভাগ</th>

                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>

                  <th className="px-3 py-3 text-right font-medium">সর্বাধিক</th>

                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {markets.length > 0 ? (
                  markets.map((market, index) => {
                    const min = Number(market.min);
                    const max = Number(market.max);

                    const hasValidPrices =
                      market.min !== null &&
                      market.min !== undefined &&
                      market.min !== "" &&
                      market.max !== null &&
                      market.max !== undefined &&
                      market.max !== "" &&
                      Number.isFinite(min) &&
                      Number.isFinite(max);

                    const marketAverage = hasValidPrices
                      ? (min + max) / 2
                      : null;

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="border-t border-[#e1e9e1] odd:bg-[#fbfdfb] even:bg-[#f0f5f0]"
                      >
                        <td className="px-3 py-3 font-medium">
                          {market.market}
                        </td>

                        <td className="px-3 py-3">{market.division}</td>

                        <td className="px-3 py-3 text-right">
                          {formatPrice(market.min)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right">
                          {formatPrice(market.max)} টাকা
                        </td>

                        <td className="px-3 py-3 text-right font-semibold">
                          {marketAverage !== null
                            ? `${formatPrice(marketAverage)} টাকা`
                            : "—"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-3 py-8 text-center text-gray-500"
                    >
                      বাজারের কোনো তথ্য পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;
