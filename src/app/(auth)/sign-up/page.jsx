
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      confirmPassword: String(
        formData.get("confirmPassword") || ""
      ),
    };

    if (data.name.length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }

    if (!/[A-Z]/.test(data.password)) {
      toast.error("পাসওয়ার্ডে একটি বড় হাতের অক্ষর থাকতে হবে");
      return;
    }

    if (data.password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (!/[0-9]/.test(data.password)) {
      toast.error("পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/sign-in");
    } catch (error) {
      toast.error(
        error?.message ||
          "সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setSocialLoading(provider);

    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || `${provider} দিয়ে সাইন আপ করা যায়নি`
        );
      }
    } catch (error) {
      toast.error(
        error?.message || "সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।"
      );
    } finally {
      setSocialLoading("");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 text-[#202820]">
      <header className="mb-5 text-center">
        <h1 className="text-2xl font-bold">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-1 text-xs text-[#7b857c] sm:text-sm">
          বিনা খরচে নতুন অ্যাকাউন্ট খুলুন এবং সব ফিচার উপভোগ করুন।
        </p>
      </header>

      <section className="w-full max-w-[440px] rounded-xl border border-[#e0e9e0] bg-[#fbfcfb] p-5 sm:p-6">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              {/* Name */}
              <TextField
                isRequired
                name="name"
                validate={(value) =>
                  value.trim().length < 3
                    ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                    : null
                }
              >
                <Label className="mb-1 block text-xs font-medium">
                  নাম
                </Label>

                <Input
                  placeholder="যেমন: রহিম উদ্দিন"
                  autoComplete="name"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
                />

                <FieldError />
              </TextField>

              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
              >
                <Label className="mb-1 block text-xs font-medium">
                  ইমেইল
                </Label>

                <Input
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
                />

                <FieldError />
              </TextField>

              {/* Password */}
              <TextField
                isRequired
                name="password"
                type="password"
                minLength={8}
                validate={(value) => {
                  if (value.length < 8) {
                    return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                  }

                  if (!/[A-Z]/.test(value)) {
                    return "পাসওয়ার্ডে একটি বড় হাতের অক্ষর থাকতে হবে";
                  }

                  if (!/[0-9]/.test(value)) {
                    return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে";
                  }

                  return null;
                }}
              >
                <Label className="mb-1 block text-xs font-medium">
                  পাসওয়ার্ড
                </Label>

                <Input
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
                />

                <Description>
                  কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা।
                </Description>

                <FieldError />
              </TextField>

              {/* Confirm Password */}
              <TextField
                isRequired
                name="confirmPassword"
                type="password"
                validate={(value) =>
                  value !== password
                    ? "দুটি পাসওয়ার্ড মিলছে না"
                    : null
                }
              >
                <Label className="mb-1 block text-xs font-medium">
                  পাসওয়ার্ড নিশ্চিত করুন
                </Label>

                <Input
                  placeholder="আবার পাসওয়ার্ড লিখুন"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
                />

                <FieldError />
              </TextField>
            </FieldGroup>

            <Fieldset.Actions>
              <Button
                type="submit"
                isDisabled={isLoading || !!socialLoading}
                className="mt-3 h-10 w-full rounded-lg bg-[#078b45] text-sm font-semibold text-white shadow-[0_3px_0_#056b35] hover:bg-[#06783c] disabled:opacity-60"
              >
                {isLoading
                  ? "অ্যাকাউন্ট তৈরি হচ্ছে..."
                  : "অ্যাকাউন্ট তৈরি করুন"}
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#dfe6df]" />

          <span className="text-xs text-[#687268]">
            অথবা
          </span>

          <div className="h-px flex-1 bg-[#dfe6df]" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            isDisabled={isLoading || !!socialLoading}
            onPress={() => handleSocialLogin("google")}
            className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent text-xs hover:bg-[#f1f5f1]"
          >
            <span className="mr-1 font-bold text-[#4285F4]">
              G
            </span>

            {socialLoading === "google"
              ? "সংযোগ হচ্ছে..."
              : "Google দিয়ে চালিয়ে যান"}
          </Button>

          <Button
            type="button"
            variant="secondary"
            isDisabled={isLoading || !!socialLoading}
            onPress={() => handleSocialLogin("github")}
            className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent text-xs hover:bg-[#f1f5f1]"
          >
            <span className="mr-1">●</span>

            {socialLoading === "github"
              ? "সংযোগ হচ্ছে..."
              : "GitHub দিয়ে চালিয়ে যান"}
          </Button>
        </div>

        {/* Sign In Link */}
        <p className="mt-5 text-center text-xs text-[#626d63]">
          অ্যাকাউন্ট আছে?{" "}

          <Link
            href="/sign-in"
            className="font-semibold text-[#078b45] hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </section>

      {/* Home Link */}
      <Link
        href="/"
        className="mt-5 text-xs text-[#7b857c] hover:text-[#078b45]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUp;
