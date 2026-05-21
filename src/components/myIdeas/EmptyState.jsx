import Link from "next/link";

import { Plus, Sparkles } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-[40px] border border-dashed border-slate-300 bg-white px-8 py-24 text-center shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/40">
        <Sparkles size={40} className="text-violet-600 dark:text-violet-400" />
      </div>

      <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white">
        No Ideas Yet
      </h2>

      <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
        You haven’t added any startup ideas yet.
      </p>

      <Link href="/add-idea">
        <button className="mt-8 flex items-center gap-2 rounded-2xl bg-violet-600 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-violet-700">
          <Plus size={18} />
          Add Your First Idea
        </button>
      </Link>
    </div>
  );
};

export default EmptyState;
