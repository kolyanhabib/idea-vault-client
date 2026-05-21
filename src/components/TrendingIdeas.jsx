import TrendingCard from "./TrendingCard";

const fetchFeaturedIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data || [];
};

const TrendingIdeas = async () => {
  const featured = await fetchFeaturedIdeas();

  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-end justify-between">
          <div>
            <span className="mb-3 inline-block rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold uppercase tracking-wider text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
              Trending Ideas
            </span>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Explore Featured Startup Ideas
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
              Discover innovative startup concepts shared by creators,
              entrepreneurs, and tech enthusiasts.
            </p>
          </div>
        </div>

        {featured.length === 0 ? (
          <div className="flex min-h-75 items-center justify-center rounded-4xl border border-dashed border-slate-300 bg-slate-50 text-center dark:border-slate-700 dark:bg-slate-900">
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                No Featured Ideas
              </h3>

              <p className="mt-3 text-slate-500 dark:text-slate-400">
                Featured startup ideas will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {featured?.map((feature) => (
              <TrendingCard key={feature._id} feature={feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingIdeas;
