"use client";

import Link from "next/link";

import { Rocket, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] px-6">
      {/* BG GLOW */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="relative z-10 text-center">
        {/* ICON */}
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 shadow-[0_0_50px_rgba(139,92,246,.35)]">
          <Rocket size={60} className="text-white" />
        </div>

        {/* 404 */}
        <h1 className="mt-10 text-8xl font-black text-white md:text-[160px]">
          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
          Lost In Space 🚀
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          The page you are looking for doesn&apos;t exist or has been moved to
          another galaxy.
        </p>

        {/* BUTTON */}
        <Link
          href="/"
          className="mx-auto mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-8 py-5 text-lg font-semibold text-white shadow-[0_0_35px_rgba(139,92,246,.35)] transition hover:scale-105"
        >
          <ArrowLeft size={22} />
          Back To Home
        </Link>
      </div>
    </section>
  );
}
