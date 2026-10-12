
import ProductCard from "@/components/ProductCard";
import baseUrl from "@/services/baseUrl";
import AllProducts from "@/components/AllProducts";
import Banner from "@/components/homePage/shared/Banner";

const getProducts = async () => {
  const res = await fetch(`${baseUrl}/products`);

  if (!res.ok) {
    throw new Error("Products fetch করা যায়নি");
  }

  return res.json();
};

export default async function Home() {
  const products = await getProducts();

  const downProducts = products
    .filter((product) => product.change?.dir === "down")
    .sort(
      (a, b) =>
        Math.abs(Number(b.change?.pct ?? 0)) -
        Math.abs(Number(a.change?.pct ?? 0))
    )
    .slice(0, 6);

  const upProducts = products
    .filter((product) => product.change?.dir === "up")
    .sort(
      (a, b) =>
        Number(b.change?.pct ?? 0) -
        Number(a.change?.pct ?? 0)
    )
    .slice(0, 6);

  return (
    <>
      <Banner />

      <main className="mx-auto w-full max-w-5xl space-y-8 px-3 py-6 sm:space-y-10 sm:px-5 lg:px-6">
        {/* Price Increased */}
        <section>
          <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-red-600">▲</span>{" "}
            আজ দাম বেড়েছে
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {upProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* Price Decreased */}
        <section>
          <h2 className="text-xl font-bold sm:text-2xl">
            <span className="text-green-600">▼</span>{" "}
            আজ দাম কমেছে
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {downProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        {/* All Products */}
        <section>
          <AllProducts products={products} />
        </section>
      </main>
    </>
  );
}
