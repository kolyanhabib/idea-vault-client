"use client";

import Image from "next/image";

import { Pencil, Trash2, CalendarDays } from "lucide-react";

const MyIdeaCard = ({ idea, onDelete, onEdit }) => {
  return (
    <div className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900">
      {/* IMAGE */}
      <div className="relative">
        <Image
          src={idea.imageURL}
          alt={idea.title}
          width={600}
          height={400}
          className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* CATEGORY */}
        <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 backdrop-blur dark:bg-slate-900/90 dark:text-slate-200">
          {idea.category}
        </div>

        {/* ACTIONS */}
        <div className="absolute right-5 top-5 flex gap-2">
          <button
            onClick={() => onEdit(idea)}
            className="rounded-2xl bg-white/90 p-3 text-blue-600 shadow-lg backdrop-blur transition hover:scale-105 dark:bg-slate-900/90"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(idea._id)}
            className="rounded-2xl bg-white/90 p-3 text-red-600 shadow-lg backdrop-blur transition hover:scale-105 dark:bg-slate-900/90"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7">
        {/* TITLE */}
        <h2 className="line-clamp-2 text-2xl font-black leading-tight text-slate-900 dark:text-white">
          {idea.title}
        </h2>

        {/* DESC */}
        <p className="mt-4 line-clamp-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          {idea.shortDescription}
        </p>

        {/* TAGS */}
        <div className="mt-5 flex flex-wrap gap-2">
          {idea.tags?.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-violet-50 px-4 py-2 text-xs font-semibold text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* INFO */}
        <div className="mt-7 grid grid-cols-2 gap-4 rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
          <div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Audience
            </p>

            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {idea.targetAudience}
            </h4>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
              Budget
            </p>

            <h4 className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              ${idea.estimatedBudget}
            </h4>
          </div>
        </div>

        {/* AUTHOR */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={idea.profile}
                alt={idea.author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {idea.author}
              </h4>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <CalendarDays size={13} />

                {new Date(idea.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyIdeaCard;
