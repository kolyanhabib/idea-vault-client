"use client";

import { useEffect, useMemo, useState } from "react";

import IdeaCard from "@/components/IdeaCard";

import { Search } from "lucide-react";

import { FcIdea } from "react-icons/fc";

const IdeasPage = () => {
  const [allIdeas, setAllIdeas] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("All");

  // FETCH IDEAS
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ideas`, {
          cache: "no-store",
        });

        const data = await res.json();

        setAllIdeas(data);

        // DYNAMIC CATEGORY
        const uniqueCategories = [
          "All",

          ...new Set(data.map((idea) => idea.category)),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, []);

  // FILTER IDEAS
  const filteredIdeas = useMemo(() => {
    let filtered = [...allIdeas];

    // SEARCH
    if (search) {
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(search.toLowerCase()) ||
          idea.shortDescription.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // CATEGORY
    if (selectedCategory !== "All") {
      filtered = filtered.filter((idea) => idea.category === selectedCategory);
    }

    return filtered;
  }, [search, selectedCategory, allIdeas]);

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-[#F8FAFC] py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-5">
        {/* HEADER */}
        <div className="mb-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
            <FcIdea className="text-lg" />
            Startup Ideas
          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-6xl">
            Explore Ideas
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Discover innovative startup concepts, collaborate with creators, and
            explore future-ready business solutions.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="mb-14 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}
          <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-violet-500 dark:focus-within:ring-violet-500/20">
            <Search size={22} className="text-slate-400 dark:text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search startup ideas..."
              className="w-full bg-transparent text-slate-800 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* FILTER */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-4 font-medium text-slate-700 shadow-sm outline-none transition-all duration-300 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex min-h-100 items-center justify-center">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600 dark:border-violet-500/20 dark:border-t-violet-400"></div>
          </div>
        ) : filteredIdeas.length === 0 ? (
          /* EMPTY */
          <div className="flex min-h-100 flex-col items-center justify-center rounded-4xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="rounded-full bg-violet-100 p-5 dark:bg-violet-500/15">
              <FcIdea className="text-5xl" />
            </div>

            <h2 className="mt-6 text-3xl font-black text-slate-900 dark:text-white">
              No Ideas Found
            </h2>

            <p className="mt-3 max-w-md text-slate-500 dark:text-slate-400">
              Try changing the search keyword or category filter to discover
              more startup ideas.
            </p>
          </div>
        ) : (
          <>
            {/* RESULT */}
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-violet-700 dark:text-violet-400">
                  {filteredIdeas.length}
                </span>{" "}
                ideas
              </p>
            </div>

            {/* GRID */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {filteredIdeas.map((idea) => (
                <IdeaCard key={idea._id} idea={idea} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default IdeasPage;
