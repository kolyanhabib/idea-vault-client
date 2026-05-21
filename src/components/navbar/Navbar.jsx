import Link from "next/link";

import { Lightbulb } from "lucide-react";

import NavbarClient from "./NavbarClient";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow transition-colors duration-300 dark:border-slate-800 dark:bg-[#020617]">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Lightbulb size={30} className="text-[#5B4BFF]" />

          <h2 className="text-[22px] font-bold text-[#111827] dark:text-white">
            IdeaVault
          </h2>
        </Link>

        <NavbarClient />
      </nav>
    </header>
  );
};

export default Navbar;
