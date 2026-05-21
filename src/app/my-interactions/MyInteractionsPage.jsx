"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import { MessageCircleMore, Clock3, ArrowRight } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function MyInteractionsPage() {
  const { data: session } = authClient.useSession();

  const [ideas, setIdeas] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH
  useEffect(() => {
    const fetchInteractions = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-interactions/${session?.user?.email}`,
        );

        const data = await res.json();

        setIdeas(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) {
      fetchInteractions();
    }
  }, [session]);

  return (
    <section className="min-h-screen bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
              <MessageCircleMore size={16} />
              Community Activity
            </div>

            <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              My Interactions
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
              Track your comments and engagement across startup ideas.
            </p>
          </div>

          {/* COMMENT COUNT */}
          <div className="flex items-center gap-4 rounded-[28px] border border-violet-200 bg-white px-7 py-6 shadow-sm transition-colors duration-300 dark:border-violet-800 dark:bg-slate-900">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40">
              <MessageCircleMore
                size={30}
                className="text-violet-600 dark:text-violet-400"
              />
            </div>

            <div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white">
                {ideas.length}
              </h2>

              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Total Comments
              </p>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-75 items-center justify-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-violet-900 dark:border-t-violet-400"></div>
          </div>
        ) : ideas.length === 0 ? (
          /* EMPTY */
          <div className="flex flex-col items-center justify-center rounded-[40px] border border-slate-200 bg-white px-8 py-24 text-center shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/40">
              <MessageCircleMore
                className="text-violet-600 dark:text-violet-400"
                size={42}
              />
            </div>

            <h2 className="mt-8 text-4xl font-black text-slate-900 dark:text-white">
              No Interactions Yet
            </h2>

            <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-400">
              Start commenting on startup ideas to see your activity here.
            </p>
          </div>
        ) : (
          /* LIST */
          <div className="space-y-8">
            {ideas.map((idea) => (
              <div
                key={`${idea._id}-${idea.commentCreatedAt}`}
                className="group overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid gap-8 p-6 lg:grid-cols-[320px_1fr]">
                  {/* IMAGE */}
                  <div className="overflow-hidden rounded-[28px]">
                    <Image
                      src={idea.imageURL}
                      alt={idea.title}
                      width={500}
                      height={400}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col justify-between">
                    <div>
                      {/* TOP */}
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        {/* CATEGORY */}
                        <div className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
                          {idea.category}
                        </div>

                        {/* COMMENT COUNT */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <MessageCircleMore size={16} />1 Comment
                        </div>
                      </div>

                      {/* TITLE */}
                      <h2 className="text-3xl font-black leading-tight text-slate-900 dark:text-white">
                        {idea.title}
                      </h2>

                      {/* COMMENT BOX */}
                      <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 dark:bg-violet-950/40">
                            <MessageCircleMore
                              size={20}
                              className="text-violet-600 dark:text-violet-400"
                            />
                          </div>

                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white">
                              Your Comment
                            </h4>

                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              Interaction Activity
                            </p>
                          </div>
                        </div>

                        <p className="leading-8 text-slate-600 dark:text-slate-300">
                          {idea.commentText}
                        </p>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="mt-8 flex flex-col gap-5 border-t border-slate-200 pt-6 dark:border-slate-800 lg:flex-row lg:items-center lg:justify-between">
                      {/* DATE */}
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                        <Clock3 size={18} />

                        <span className="text-sm">
                          {new Date(idea.commentCreatedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      {/* BUTTON */}
                      <Link href={`/ideas/${idea._id}`}>
                        <button className="group/button flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition-all duration-300 hover:bg-violet-700">
                          View Idea
                          <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover/button:translate-x-1"
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
