



// "use client";

// import { useState } from "react";


// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import {
//   Button,
//   Description,
//   FieldError,
//   FieldGroup,
//   Fieldset,
//   Form,
//   Input,
//   Label,
//   TextField,
// } from "@heroui/react";
// import { signIn } from "@/lib/auth-client";
// import toast from "react-hot-toast";

// const SignIn = () => {
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);
//   const [socialLoading, setSocialLoading] = useState("");

//   const onSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const email = String(formData.get("email") || "").trim();
//     const password = String(formData.get("password") || "");

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       toast.error("সঠিক ইমেইল ঠিকানা দিন");
//       return;
//     }

//     if (!password) {
//       toast.error("পাসওয়ার্ড লিখুন");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const { error } = await signIn.email({
//         email,
//         password,
//         callbackURL: "/",
//       });

//       if (error) {
//         toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
//         return;
//       }

//       toast.success("সফলভাবে সাইন ইন হয়েছে!");
//       router.push("/");
//       router.refresh();
//     } catch (error) {
//       toast.error("লগইন করা যায়নি। আবার চেষ্টা করুন।");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSocialLogin = async (provider) => {
//     setSocialLoading(provider);

//     try {
//       const { error } = await signIn.social({
//         provider,
//         callbackURL: "/",
//       });

//       if (error) {
//         toast.error(error.message || "Social login failed");
//       }
//     } catch (error) {
//       toast.error("সোশ্যাল লগইন করা যায়নি। আবার চেষ্টা করুন।");
//     } finally {
//       setSocialLoading("");
//     }
//   };

//   return (
//     <div className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-8 text-[#202820]">
//       <header className="mb-5 text-center">
//         <h1 className="text-2xl font-bold">সাইন ইন</h1>

//         <p className="mt-1 text-xs text-[#7b857c] sm:text-sm">
//           আপনার অ্যাকাউন্টে প্রবেশ করুন এবং সব ফিচার উপভোগ করুন।
//         </p>
//       </header>

//       <section className="w-full max-w-[440px] rounded-xl border border-[#e0e9e0] bg-[#fbfcfb] p-5 sm:p-6">
//         <Form onSubmit={onSubmit}>
//           <Fieldset className="w-full">
//             <FieldGroup className="gap-3">
//               <TextField
//                 isRequired
//                 name="email"
//                 type="email"
//               >
//                 <Label className="mb-1 block text-xs font-medium">
//                   ইমেইল
//                 </Label>

//                 <Input
//                   placeholder="you@example.com"
//                   autoComplete="email"
//                   className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
//                 />

//                 <FieldError />
//               </TextField>

//               <TextField
//                 isRequired
//                 name="password"
//                 type="password"
//               >
//                 <Label className="mb-1 block text-xs font-medium">
//                   পাসওয়ার্ড
//                 </Label>

//                 <Input
//                   placeholder="আপনার পাসওয়ার্ড"
//                   autoComplete="current-password"
//                   className="h-10 w-full rounded-lg border border-[#e0e8e0] bg-transparent px-3 text-sm outline-none focus:border-[#078b45]"
//                 />

//                 <FieldError />
//               </TextField>
//             </FieldGroup>

//             <Fieldset.Actions>
//               <Button
//                 type="submit"
//                 isDisabled={isLoading || !!socialLoading}
//                 className="mt-3 h-10 w-full rounded-lg bg-[#078b45] text-sm font-semibold text-white shadow-[0_3px_0_#056b35] hover:bg-[#06783c] disabled:opacity-60"
//               >
//                 {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
//               </Button>
//             </Fieldset.Actions>
//           </Fieldset>
//         </Form>

//         <div className="my-5 flex items-center gap-3">
//           <div className="h-px flex-1 bg-[#dfe6df]" />
//           <span className="text-xs text-[#687268]">অথবা</span>
//           <div className="h-px flex-1 bg-[#dfe6df]" />
//         </div>

//         <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
//           <Button
//             type="button"
//             variant="secondary"
//             isDisabled={isLoading || !!socialLoading}
//             onPress={() => handleSocialLogin("google")}
//             className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent text-xs hover:bg-[#f1f5f1]"
//           >
//             <span className="mr-1 font-bold text-[#4285F4]">G</span>
//             {socialLoading === "google"
//               ? "সংযোগ হচ্ছে..."
//               : "Google দিয়ে চালিয়ে যান"}
//           </Button>

//           <Button
//             type="button"
//             variant="secondary"
//             isDisabled={isLoading || !!socialLoading}
//             onPress={() => handleSocialLogin("github")}
//             className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent text-xs hover:bg-[#f1f5f1]"
//           >
//             <span className="mr-1">●</span>
//             {socialLoading === "github"
//               ? "সংযোগ হচ্ছে..."
//               : "GitHub দিয়ে চালিয়ে যান"}
//           </Button>
//         </div>

//         <p className="mt-5 text-center text-xs text-[#626d63]">
//           অ্যাকাউন্ট নেই?{" "}
//           <Link
//             href="/sign-up"
//             className="font-semibold text-[#078b45] hover:underline"
//           >
//             সাইন আপ করুন
//           </Link>
//         </p>
//       </section>

//       <Link
//         href="/"
//         className="mt-5 text-xs text-[#7b857c] hover:text-[#078b45]"
//       >
//         ← হোম পেজে ফিরে যান
//       </Link>
//     </div>
//   );
// };

// export default SignIn;

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

const SignIn = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    // Keep the email pattern as a normal JavaScript regex.
 if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  toast.error("সঠিক ইমেইল ঠিকানা দিন");
  return;
}

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error?.message || "লগইন করা যায়নি। আবার চেষ্টা করুন।"
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
        toast.error(error.message || `${provider} দিয়ে লগইন করা যায়নি`);
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
        <h1 className="text-2xl font-bold">সাইন ইন</h1>
        <p className="mt-1 text-xs text-[#7b857c] sm:text-sm">
          আপনার অ্যাকাউন্টে প্রবেশ করুন এবং সব ফিচার উপভোগ করুন।
        </p>
      </header>

      <section className="w-full max-w-[440px] rounded-xl border border-[#e0e9e0] bg-[#fbfcfb] p-5 sm:p-6">
        <Form onSubmit={onSubmit}>
          <Fieldset className="w-full">
            <FieldGroup className="gap-3">
              <TextField isRequired name="email" type="email">
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

              <TextField isRequired name="password" type="password">
                <Label className="mb-1 block text-xs font-medium">
                  পাসওয়ার্ড
                </Label>
                <Input
                  placeholder="আপনার পাসওয়ার্ড"
                  autoComplete="current-password"
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
                {isLoading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
              </Button>
            </Fieldset.Actions>
          </Fieldset>
        </Form>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#dfe6df]" />
          <span className="text-xs text-[#687268]">অথবা</span>
          <div className="h-px flex-1 bg-[#dfe6df]" />
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            type="button"
            variant="secondary"
            isDisabled={isLoading || !!socialLoading}
            onPress={() => handleSocialLogin("google")}
            className="h-10 rounded-lg border border-[#e0e8e0] bg-transparent text-xs hover:bg-[#f1f5f1]"
          >
            <span className="mr-1 font-bold text-[#4285F4]">G</span>
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

        <p className="mt-5 text-center text-xs text-[#626d63]">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-[#078b45] hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </section>

      <Link
        href="/"
        className="mt-5 text-xs text-[#7b857c] hover:text-[#078b45]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignIn;
