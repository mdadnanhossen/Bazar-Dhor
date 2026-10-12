
// "use client";

// import { authClient } from "@/lib/auth-client";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const UserInfo = () => {
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;
//   const router = useRouter();

//   const handleSignout = async () => {
//     const { error } = await authClient.signOut();

//     if (!error) {
//       router.push("/sign-in");
//       router.refresh();
//     }
//   };

//   if (isPending) {
//     return (
//       <div className="absolute right-4 top-4 text-sm">
//         লোড হচ্ছে...
//       </div>
//     );
//   }

//   return (
//     <div className="absolute right-4 top-4 flex items-center gap-3 text-sm">
//       {user ? (
//         <div className="flex flex-col items-center gap-2">
//           <Link href="/profile">
//             <div className="avatar">
//               <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
//                 {user.image ? (
//                   <img
//                     src={user.image.replace(/=s\d+-c$/, "=s256-c")}
//                     alt={user.name || "Google profile"}
//                     referrerPolicy="no-referrer"
//                     className="block h-full w-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center bg-green-100">
//                     <span className="font-bold text-green-800">
//                       {(user?.name || user?.email || "U")
//                         .charAt(0)
//                         .toUpperCase()}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </Link>

//           <h2>{user.name}</h2>

//           <button
//             onClick={handleSignout}
//             className="btn btn-error btn-xs"
//           >
//             Sign out
//           </button>
//         </div>
//       ) : (
//         <div className="flex items-center gap-2">
//           <Link
//             href="/sign-in"
//             className="btn btn-ghost text-neutral-700 transition-colors hover:text-red-700"
//           >
//             সাইন ইন
//           </Link>

//           <Link
//             href="/sign-up"
//             className="btn bg-red-700 px-3 py-1.5 font-semibold text-white transition-colors hover:bg-red-800"
//           >
//             সাইন আপ
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInfo;
