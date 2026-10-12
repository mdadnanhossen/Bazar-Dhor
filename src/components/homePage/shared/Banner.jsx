
"use client";

import React from "react";
import Image from "next/image";

const Banner = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleScroll = () => {
    document.getElementById("সব-পণ্য")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="mx-auto w-full max-w-7xl overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-5 px-4 py-6 sm:gap-6 sm:px-6 sm:py-8 md:flex-row md:justify-between md:gap-8 lg:px-10 lg:py-12">

        {/* Left Content */}
        <div className="w-full min-w-0 text-center md:w-1/2 md:text-left">
          <span className="inline-flex max-w-full rounded-full bg-green-100 px-3 py-2 text-xs font-medium text-green-800 sm:px-4 sm:text-sm">
            {date}
          </span>

          <h1 className="mt-4 text-2xl font-extrabold leading-snug tracking-tight text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl">
            আজকের বাজারের দাম{" "}
            <span className="text-green-700">এক নজরে</span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base sm:leading-7 md:mx-0 lg:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <div className="mt-5 flex justify-center md:mt-6 md:justify-start">
            <button
              type="button"
              onClick={handleScroll}
              className="w-full rounded-xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 focus-visible:ring-offset-2 sm:w-auto sm:px-6 sm:text-base"
            >
              সব পণ্য দেখুন <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative mx-auto w-full max-w-[220px] shrink-0 sm:max-w-[280px] md:mx-0 md:w-1/2 md:max-w-[340px] lg:max-w-[420px]">
          <div className="absolute inset-4 rounded-full bg-green-100/70 blur-3xl" />

          <Image
            src="/bazar-hero.png"
            alt="বাজারের বিভিন্ন পণ্য"
            width={600}
            height={400}
            priority
            sizes="(max-width: 639px) 85vw, (max-width: 767px) 280px, (max-width: 1023px) 40vw, 420px"
            className="relative h-auto w-full object-contain drop-shadow-sm"
          />
        </div>

      </div>
    </section>
  );
};

export default Banner;

