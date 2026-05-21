"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import toast from "react-hot-toast";

import { Save } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const [session, setSession] = useState(null);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  // DEFAULT IMAGE
  const defaultImage = "https://i.ibb.co/4pDNDk1/avatar.png";

  // GET SESSION
  useEffect(() => {
    const getSession = async () => {
      const data = await authClient.getSession();

      setSession(data?.data);

      setName(data?.data?.user?.name || "");

      setImage(data?.data?.user?.image || "");
    };

    getSession();
  }, []);

  // UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // UPDATE DATABASE
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${session?.user?.email}`,
        {
          method: "PATCH",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify({
            name,
            image,
          }),
        },
      );

      const data = await res.json();

      console.log(data);

      // UPDATE AUTH SESSION USER
      await authClient.updateUser({
        name,
        image,
      });

      // UPDATE LOCAL SESSION
      setSession((prev) => ({
        ...prev,

        user: {
          ...prev.user,

          name,
          image,
        },
      }));

      toast.success("Profile updated successfully");

      // REFRESH PAGE DATA
      window.location.reload();
    } catch (error) {
      console.log(error);

      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 py-20 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-3xl px-5">
        {/* CARD */}
        <div className="overflow-hidden rounded-[40px] border border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
          {/* TOP */}
          <div className="bg-linear-to-r from-violet-600 to-fuchsia-600 px-8 py-14">
            <div className="flex flex-col items-center text-center">
              {/* IMAGE */}
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src={image || defaultImage}
                  alt="profile"
                  fill
                  priority
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              <h1 className="mt-5 text-4xl font-black text-white">
                {name || "User"}
              </h1>

              <p className="mt-2 text-white/80">{session?.user?.email}</p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleUpdate} className="space-y-7 p-8">
            {/* NAME */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-violet-900"
              />
            </div>

            {/* IMAGE URL */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Profile Image URL
              </label>

              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Enter image URL"
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:ring-violet-900"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                disabled
                value={session?.user?.email || ""}
                className="w-full cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-100 px-5 py-4 text-slate-500 outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Save size={18} />

              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
