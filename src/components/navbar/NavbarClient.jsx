"use client";

import Link from "next/link";

import Image from "next/image";

import { Moon, Sun, ChevronDown, User, LogOut, Menu, X } from "lucide-react";

import { usePathname, useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import { useTheme } from "next-themes";

import { authClient } from "@/lib/auth-client";

const NavbarClient = () => {
  const pathname = usePathname();

  const router = useRouter();

  const { theme, setTheme } = useTheme();

  const { data: session, isPending } = authClient.useSession();

  const [mounted, setMounted] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const defaultProfile =
    "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff&size=256";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);

    setMobileOpen(false);

    await authClient.signOut();

    router.push("/login");

    router.refresh();
  };

  if (!mounted || isPending) {
    return (
      <div className="h-11 w-11 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    );
  }

  const navLinks = session
    ? [
        { name: "Home", path: "/" },

        { name: "Ideas", path: "/ideas" },

        { name: "Add Idea", path: "/add-idea" },

        { name: "My Ideas", path: "/my-ideas" },

        {
          name: "My Interactions",
          path: "/my-interactions",
        },
      ]
    : [
        { name: "Home", path: "/" },

        { name: "Ideas", path: "/ideas" },
      ];

  return (
    <>
      <div className="hidden items-center gap-4 lg:flex">
        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded-full px-5 py-1.5 text-[16px] font-semibold transition-all duration-300 ${
                pathname === link.path
                  ? "bg-[#5B4BFF] text-white"
                  : "text-slate-600 hover:bg-[#F3F1FF] hover:text-[#5B4BFF] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hidden rounded-full border border-slate-200 bg-white p-3 text-slate-700 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 lg:flex cursor-pointer"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!session ? (
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/login"
              className="rounded-full border bg-white px-6 py-3 text-base font-semibold text-slate-700 hover:bg-[#5B4BFF]  hover:text-white dark:text-white dark:bg-slate-600 dark:hover:bg-slate-800 dark:hover:text-white transition-all duration-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-full bg-[#5B4BFF] px-6 py-3 text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3"
            >
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-violet-200 dark:ring-violet-800">
                <Image
                  src={session?.user?.image || defaultProfile}
                  alt="user"
                  fill
                  sizes="44px"
                  className="object-cover object-center"
                />
              </div>

              <span className="hidden text-[16px] font-medium text-slate-700 dark:text-white lg:block">
                {session?.user?.name}
              </span>

              <ChevronDown
                size={18}
                className={`hidden transition duration-300 dark:text-slate-400 lg:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 top-16 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 ${
                dropdownOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-4 opacity-0"
              }`}
            >
              <div className="border-b border-slate-100 bg-violet-50 p-5 dark:border-slate-800 dark:bg-slate-800">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-violet-200 dark:ring-violet-800">
                    <Image
                      src={session?.user?.image || defaultProfile}
                      alt="user"
                      fill
                      sizes="64px"
                      className="object-cover object-center"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {session?.user?.name}
                    </h3>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-violet-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <User size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-slate-800"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full border border-slate-200 bg-white p-2 transition-all duration-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800 lg:hidden"
        >
          {mobileOpen ? (
            <X size={24} className="text-slate-700 dark:text-white cursor-pointer" />
          ) : (
            <Menu size={24} className="text-slate-700 dark:text-white cursor-pointer" />
          )}
        </button>
      </div>

      <div
        className={`absolute left-0 top-20 w-full overflow-hidden border-t border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-[#020617] lg:hidden ${
          mobileOpen
            ? "visible max-h-175 opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-3 px-5 py-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300 ${
                pathname === link.path
                  ? "bg-violet-600 text-white"
                  : "text-slate-700 hover:bg-violet-50 hover:text-violet-700 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <span>{link.name}</span>

              <ChevronDown
                size={18}
                className={`-rotate-90 transition-transform duration-300 ${
                  pathname === link.path ? "text-white" : "text-slate-400"
                }`}
              />
            </Link>
          ))}

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {theme === "dark" ? (
                  <>
                    <Sun size={18} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    Dark Mode
                  </>
                )}
              </div>

              <ChevronDown size={18} className="-rotate-90" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarClient;
