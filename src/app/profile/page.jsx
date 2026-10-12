"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const [editedName, setEditedName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  // Show session name unless the user edits it
  const name = editedName ?? user?.name ?? "";

  // Update profile name
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("নাম লিখুন");
      return;
    }

    if (updatedName === (user?.name || "")) {
      toast("কোনো পরিবর্তন করা হয়নি");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "প্রোফাইল আপডেট করা যায়নি");
        return;
      }

      setEditedName(null);
      toast.success("নাম সফলভাবে আপডেট হয়েছে");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const handleSignout = async () => {
    setSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি");
        return;
      }

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("সাইন আউট করতে সমস্যা হয়েছে");
    } finally {
      setSigningOut(false);
    }
  };

  // Loading state
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-7 sm:px-6">
        <div className="mx-auto w-full max-w-3xl text-sm text-gray-500">
          লোড হচ্ছে...
        </div>
      </main>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <main className="min-h-screen bg-[#f0f5f0] px-4 py-7 sm:px-6">
        <div className="mx-auto w-full max-w-3xl rounded-xl border border-[#e3eae3] bg-white p-5">
          <h1 className="text-lg font-bold text-gray-800">আমার প্রোফাইল</h1>

          <p className="mt-2 text-sm text-gray-500">
            প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
          </p>

          <button
            type="button"
            onClick={() => router.push("/sign-in")}
            className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm text-white transition hover:bg-green-800"
          >
            সাইন ইন
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Page heading */}
        <header className="mb-5">
          <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Profile card */}
        <section className="flex min-w-0 flex-col gap-4 rounded-2xl border border-[#e3eae3] bg-white/80 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100 sm:h-14 sm:w-14">
              {user.image ? (
                <img
                  src={user.image.replace(/=s\d+-c$/, "=s256-c")}
                  alt={user.name || "Google profile"}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="font-bold text-green-800">
                  {(user.name || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
                {user.name || "ব্যবহারকারী"}
              </h2>

              <p className="break-all text-xs leading-5 text-gray-500 sm:break-normal sm:truncate sm:text-sm">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignout}
            disabled={signingOut}
            className="w-full shrink-0 rounded-lg border border-red-400 px-4 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:text-sm"
          >
            {signingOut ? "সাইন আউট হচ্ছে..." : "↩ সাইন আউট"}
          </button>
        </section>

        {/* Profile information */}
        <section className="mt-4 rounded-2xl border border-[#e3eae3] bg-white/80 p-4 sm:mt-5 sm:p-5">
          <h2 className="mb-6 text-sm font-bold text-gray-800">তথ্য</h2>

          <form onSubmit={handleUpdateProfile}>
            <label
              htmlFor="profile-name"
              className="mb-2 block text-xs text-gray-700 sm:text-sm"
            >
              নাম
            </label>

            <input
              id="profile-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setEditedName(e.target.value)}
              required
              maxLength={100}
              placeholder="আপনার নাম লিখুন"
              className="h-9 w-full rounded-lg border border-[#e3eae3] bg-transparent px-3 text-sm text-gray-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100 sm:h-10"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-3 w-full rounded-lg bg-[#07883e] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;
