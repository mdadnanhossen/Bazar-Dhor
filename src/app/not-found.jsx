import Link from "next/link";

export default function NotFound() {
return ( <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center"> <h1 className="text-5xl font-bold text-[#078b45]">
404 </h1>


  <h2 className="mt-4 text-xl font-semibold">
    দুঃখিত! পেজটি খুঁজে পাওয়া যায়নি
  </h2>

  <p className="mt-2 text-sm text-gray-500">
    আপনি যে পেজ বা পণ্যটি খুঁজছেন, সেটি পাওয়া যায়নি।
  </p>

  <Link
    href="/"
    className="mt-6 rounded-lg bg-[#078b45] px-5 py-3 text-white hover:bg-[#06783c]"
  >
    হোম পেজে ফিরে যান
  </Link>
</main>


);
}
