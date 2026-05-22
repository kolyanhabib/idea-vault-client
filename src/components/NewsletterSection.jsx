import { Send, Sparkles, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-28 transition-colors duration-300 dark:bg-[#020617]">
      {/* Background Blur */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 sm:h-[450px] sm:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100 blur-[120px] dark:bg-violet-950/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main Wrapper */}
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[40px] lg:rounded-[48px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.08)] transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          {/* Top Gradient Line */}
          <div className="absolute left-0 top-0 h-1.5 sm:h-2 w-full bg-linear-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

          {/* Decorative Blur */}
          <div className="absolute -right-20 -top-20 h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-violet-100 blur-3xl dark:bg-violet-950/30" />

          <div className="absolute -bottom-20 -left-20 h-52 w-52 sm:h-72 sm:w-72 rounded-full bg-cyan-100 blur-3xl dark:bg-cyan-950/20" />

          {/* Content */}
          <div className="grid items-center gap-10 lg:gap-16 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:px-16 lg:py-20">
            {/* Left Side */}
            <div className="relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs sm:text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
                <Sparkles size={15} />
                Weekly Startup Insights
              </div>

              {/* Heading */}
              <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Stay Ahead In
                <span className="bg-linear-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  {" "}
                  Startup Innovation
                </span>
              </h2>

              {/* Description */}
              <p className="mt-6 sm:mt-8 max-w-2xl text-base sm:text-lg leading-7 sm:leading-9 text-slate-500 dark:text-slate-400">
                Get curated startup ideas, product trends, founder stories, and
                innovation insights delivered directly to your inbox every week.
              </p>

              {/* Tags */}
              <div className="mt-8 sm:mt-10 flex flex-wrap gap-3">
                {[
                  "Weekly Insights",
                  "Startup Trends",
                  "AI Innovations",
                  "Founder Stories",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 sm:px-5 sm:py-3 text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side */}
            <div className="relative z-10">
              <div className="rounded-[28px] sm:rounded-[40px] border border-slate-200 bg-white p-5 sm:p-8 shadow-xl transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800">
                {/* Icon */}
                <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-linear-to-br from-violet-600 to-fuchsia-600 shadow-xl shadow-violet-200 dark:shadow-violet-950/50">
                  <Send size={28} className="text-white sm:size-9" />
                </div>

                {/* Title */}
                <h3 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Subscribe To Newsletter
                </h3>

                {/* Description */}
                <p className="mt-4 text-sm sm:text-base leading-7 sm:leading-8 text-slate-500 dark:text-slate-400">
                  Join thousands of creators, founders, and startup enthusiasts
                  in the IdeaVault community.
                </p>

                {/* Form */}
                <div className="mt-8 sm:mt-10 space-y-4 sm:space-y-5">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 sm:py-5 text-sm sm:text-base text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-500 dark:focus:bg-slate-950 dark:focus:ring-violet-900"
                  />

                  <button className="group flex w-full items-center justify-center gap-3 rounded-xl sm:rounded-2xl bg-linear-to-r from-violet-600 to-fuchsia-600 py-4 sm:py-5 text-base sm:text-lg font-semibold text-white shadow-xl shadow-violet-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl dark:shadow-violet-950/40">
                    Subscribe Now
                    <ArrowRight
                      size={20}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                </div>

                {/* Footer Text */}
                <p className="mt-5 text-xs sm:text-sm leading-6 text-slate-400 dark:text-slate-500">
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
