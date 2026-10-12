
const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-amber-50 px-4 py-5 text-center text-black sm:px-6 sm:py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row md:gap-6">

        {/* Copyright / Website Description */}
        <p className="text-sm leading-6 sm:text-base md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>

        {/* Price Disclaimer */}
        <p className="max-w-2xl text-xs leading-5 text-gray-700 sm:text-sm sm:leading-6 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>

      </div>
    </footer>
  );
};

export default Footer;

