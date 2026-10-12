


import { notFound } from "next/navigation";
import baseUrl from "@/services/baseUrl";
import CategoryProductsClient from "@/components/CategoryProductsClient";

export default async function CategoryProducts({ params }) {
  const { categorySlug } = await params;

  const response = await fetch(`${baseUrl}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  const categories = await response.json();

  const currentCategory = categories.find(
    (category) => category.slug === categorySlug
  );

  // Category না পাওয়া গেলে custom 404 page দেখাবে
  if (!currentCategory) {
    notFound();
  }

  return (
    <CategoryProductsClient
      categorySlug={categorySlug}
      currentCategory={currentCategory}
    />
  );
}