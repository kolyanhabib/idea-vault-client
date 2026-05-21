import Link from "next/link";

import { Plus, Sparkles } from "lucide-react";

const MyIdeasHeader = () => {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
          <Sparkles size={16} />
          My Startup Ideas
        </p>

        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          My Ideas
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
          Manage your submitted startup ideas.
        </p>
      </div>

      <Link href="/add-idea">
        <button className="flex items-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-700">
          <Plus size={18} />
          Add New Idea
        </button>
      </Link>
    </div>
  );
};

export default MyIdeasHeader;
