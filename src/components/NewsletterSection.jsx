import { Send, Sparkles, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-28 transition-colors duration-300 dark:bg-[#020617]">
      <div className="absolute left-1/2 top-1/2 h-112.5 w-112.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100 blur-[140px] dark:bg-violet-950/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-[48px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="absolute left-0 top-0 h-2 w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet-100 blur-3xl dark:bg-violet-950/30" />

          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-cyan-100 blur-3xl dark:bg-cyan-950/20" />

          <div className="grid items-center gap-16 px-8 py-14 lg:grid-cols-2 lg:px-16 lg:py-20">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
                <Sparkles size={16} />
                Weekly Startup Insights
              </div>

              <h2 className="mt-8 text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white md:text-6xl">
                Stay Ahead In
                <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {" "}
                  Startup Innovation
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-500 dark:text-slate-400">
                Get curated startup ideas, product trends, founder stories, and
                innovation insights delivered directly to your inbox every week.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  "Weekly Insights",
                  "Startup Trends",
                  "AI Innovations",
                  "Founder Stories",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10">
              <div className="rounded-[40px] border border-slate-200 bg-white p-8 shadow-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-xl shadow-violet-200 dark:shadow-violet-950/50">
                  <Send size={36} className="text-white" />
                </div>

                <h3 className="mt-8 text-3xl font-black text-slate-900 dark:text-white">
                  Subscribe To Newsletter
                </h3>

                <p className="mt-4 leading-8 text-slate-500 dark:text-slate-400">
                  Join thousands of creators, founders, and startup enthusiasts
                  in the IdeaVault community.
                </p>

                <div className="mt-10 space-y-5">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:bg-slate-950 dark:focus:ring-violet-900"
                  />

                  <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-5 text-lg font-semibold text-white shadow-xl shadow-violet-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl dark:shadow-violet-950/40">
                    Subscribe Now
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-400 dark:text-slate-500">
                  No spam. Only high-quality startup insights and innovation
                  updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
