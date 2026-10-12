
"use client";

import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Navbar({ categories = [] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const safeCategories = Array.isArray(categories) ? categories : [];

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Logout failed:", error);
        return;
      }

      setIsProfileOpen(false);
      setIsMenuOpen(false);

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderAvatar = (size = "h-9 w-9") => (
    <div
      className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 ring-2 ring-green-700`}
    >
      {user?.image ? (
        <img
          src={user.image.replace(/=s\d+-c$/, "=s256-c")}
          alt={user.name || "Google profile"}
          referrerPolicy="no-referrer"
          className="block h-full w-full rounded-full object-cover"
        />
      ) : (
        <span className="font-bold text-green-800">
          {(user?.name || user?.email || "U")
            .charAt(0)
            .toUpperCase()}
        </span>
      )}
    </div>
  );

  const renderCategories = (mobile = false) =>
    safeCategories.map((category, index) => (
      <li key={category.id ?? category.slug ?? index}>
        <Link
          href={`/category/${category.slug}`}
          onPress={mobile ? closeMenu : undefined}
          className={
            mobile
              ? "flex min-w-0 items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-800 transition-colors hover:bg-green-50 hover:text-green-700"
              : "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700 md:text-sm"
          }
        >
          <span className="shrink-0">{category.icon}</span>
          <span className="truncate">{category.nameBn}</span>
        </Link>
      </li>
    ));

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white">
      {/* Top Navbar */}
      <header className="mx-auto flex min-h-[60px] w-full max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:min-h-[68px] sm:gap-4 sm:px-5 md:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-700 sm:h-10 sm:w-10">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={28}
              height={28}
              priority
              className="h-6 w-6 object-contain sm:h-7 sm:w-7"
            />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-base font-bold leading-6 text-gray-900 sm:text-xl">
              বাজার দর
            </span>

            <span className="max-w-[145px] truncate text-[9px] text-gray-600 sm:max-w-none sm:text-xs">
              {date}
            </span>
          </div>
        </Link>

        {/* Desktop Authentication */}
        <div className="hidden shrink-0 items-center gap-3 md:flex lg:gap-4">
          {isPending ? (
            <span className="text-sm text-gray-500">
              লোড হচ্ছে...
            </span>
          ) : user ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                type="button"
                onClick={() =>
                  setIsProfileOpen((previous) => !previous)
                }
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                aria-label="প্রোফাইল মেনু"
                className="flex max-w-[240px] items-center gap-2 rounded-full px-2 py-1.5 transition hover:bg-green-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600"
              >
                {renderAvatar()}

                <span className="max-w-28 truncate text-sm font-medium text-gray-800">
                  {user.name || "আমার প্রোফাইল"}
                </span>

                <svg
                  className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.09 1.032l-4.25 4.5a.75.75 0 01-1.09 0l-4.25-4.5a.75.75 0 01.02-1.052z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <>
                  <button
                    type="button"
                    aria-label="মেনু বন্ধ করুন"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setIsProfileOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-[280px] max-w-[calc(100vw-24px)] rounded-2xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="border-b border-gray-100 px-2 pb-3">
                      <p className="truncate text-sm font-semibold text-gray-900">
                        {user.name || "আমার প্রোফাইল"}
                      </p>

                      <p className="mt-1 break-all text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/profile"
                        onPress={() => setIsProfileOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-800"
                      >
                        <span aria-hidden="true">👤</span>
                        আমার প্রোফাইল
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                      >
                        <span aria-hidden="true">↩</span>
                        সাইন আউট
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-medium text-gray-900 transition hover:text-green-700"
              >
                সাইন ইন
              </Link>

              <Button
                size="sm"
                className="rounded-lg bg-green-700 px-4 font-semibold text-white shadow-md hover:bg-green-800"
                onPress={() => router.push("/sign-up")}
              >
                সাইন আপ
              </Button>
            </>
          )}
        </div>

        {/* Mobile / Tablet Menu Toggle */}
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-800 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 md:hidden"
          onClick={() => setIsMenuOpen((previous) => !previous)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Desktop Categories */}
      <div className="hidden border-t border-gray-100 md:block">
        <ul className="mx-auto flex max-w-7xl items-center justify-center gap-x-2 overflow-x-auto px-4 py-2.5 lg:gap-x-4 lg:px-8">
          {renderCategories()}
        </ul>
      </div>

      {/* Mobile / Tablet Menu */}
      {isMenuOpen && (
        <div className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-gray-200 bg-white p-3 sm:p-4 md:hidden">
          {/* Mobile Navigation Links */}
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <li>
              <Link
                href="/"
                onPress={closeMenu}
                className="flex min-w-0 items-center rounded-lg px-3 py-2.5 text-sm text-gray-800 transition-colors hover:bg-green-50 hover:text-green-700"
              >
                🏠 <span className="ml-2">হোম</span>
              </Link>
            </li>

            {renderCategories(true)}
          </ul>

          {/* Mobile Authentication */}
          <div className="mt-4 flex flex-col gap-3 border-t border-gray-200 pt-4">
            {isPending ? (
              <p className="text-center text-sm text-gray-500">
                লোড হচ্ছে...
              </p>
            ) : user ? (
              <>
                {/* Mobile Profile Info */}
                <Link
                  href="/profile"
                  onPress={closeMenu}
                  className="flex min-w-0 items-center gap-3 rounded-xl p-2 transition hover:bg-green-50"
                >
                  {renderAvatar("h-10 w-10")}

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900">
                      {user.name || "আমার প্রোফাইল"}
                    </p>

                    <p className="break-all text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                >
                  <span aria-hidden="true">↩</span>
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="bordered"
                  className="min-h-11 w-full"
                  onPress={() => {
                    closeMenu();
                    router.push("/sign-in");
                  }}
                >
                  সাইন ইন
                </Button>

                <Button
                  className="min-h-11 w-full bg-green-700 text-white hover:bg-green-800"
                  onPress={() => {
                    closeMenu();
                    router.push("/sign-up");
                  }}
                >
                  সাইন আপ
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

