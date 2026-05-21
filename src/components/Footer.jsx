"use client";

import Link from "next/link";

import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import {
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Brain,
  HeartPulse,
  Wallet,
  GraduationCap,
  Leaf,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#020617]">
      {/* GLOW */}
      <div className="absolute left-1/2 top-0 h-75 w-75 -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* TOP GRID */}
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-cyan-500 shadow-[0_0_30px_rgba(139,92,246,.4)]">
                <Lightbulb size={22} className="text-white" />
              </div>

              <h2 className="text-3xl font-black text-white">IdeaVault</h2>
            </div>

            <p className="mt-6 leading-8 text-gray-400">
              A modern platform where innovators share startup ideas,
              collaborate with creators, and validate concepts with the
              community.
            </p>

            {/* SOCIALS */}
            <div className="mt-8 flex items-center gap-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub].map(
                (Icon, i) => (
                  <button
                    key={i}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gray-300 transition hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white"
                  >
                    <Icon size={18} />
                  </button>
                ),
              )}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-xl font-bold text-white">Quick Links</h3>

            <div className="mt-6 flex flex-col gap-4">
              {[
                {
                  name: "Home",
                  path: "/",
                },

                {
                  name: "Ideas",
                  path: "/ideas",
                },

                {
                  name: "Add Idea",
                  path: "/add-idea",
                },

                {
                  name: "My Ideas",
                  path: "/my-ideas",
                },

                {
                  name: "My Interactions",
                  path: "/my-interactions",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.path}
                  className="group flex items-center gap-2 text-gray-400 transition hover:text-white"
                >
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-xl font-bold text-white">Categories</h3>

            <div className="mt-6 flex flex-col gap-4">
              {[
                {
                  icon: Brain,
                  name: "AI",
                },

                {
                  icon: HeartPulse,
                  name: "HealthTech",
                },

                {
                  icon: Wallet,
                  name: "FinTech",
                },

                {
                  icon: GraduationCap,
                  name: "EdTech",
                },

                {
                  icon: Leaf,
                  name: "GreenTech",
                },
              ].map((item, i) => (
                <button
                  key={i}
                  className="group flex w-fit items-center gap-2 text-left text-gray-400 transition hover:text-white"
                >
                  <item.icon
                    size={16}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-xl font-bold text-white">Contact</h3>

            <div className="mt-6 space-y-4 text-gray-400">
              <div className="flex items-center gap-3">
                <Mail size={18} />

                <p>support@ideavault.com</p>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />

                <p>Dhaka, Bangladesh</p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />

                <p>+880 1234-567890</p>
              </div>
            </div>

            {/* NEWSLETTER */}
            <div className="mt-8">
              <h4 className="mb-4 font-semibold text-white">
                Subscribe Newsletter
              </h4>

              <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full bg-transparent px-4 py-4 text-white outline-none placeholder:text-gray-500"
                />

                <button className="bg-linear-to-r from-violet-600 to-cyan-500 px-6 font-semibold text-white transition hover:opacity-90">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 IdeaVault. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <button className="transition hover:text-white">
              Privacy Policy
            </button>

            <button className="transition hover:text-white">
              Terms & Conditions
            </button>

            <button className="transition hover:text-white">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
