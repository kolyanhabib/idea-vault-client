import { Lightbulb, Users, Rocket, MessageCircle } from "lucide-react";

const stats = [
  {
    id: 1,

    icon: Lightbulb,

    value: "12K+",

    label: "Ideas Shared",
  },

  {
    id: 2,

    icon: Users,

    value: "4K+",

    label: "Active Creators",
  },

  {
    id: 3,

    icon: Rocket,

    value: "250+",

    label: "Startups Built",
  },

  {
    id: 4,

    icon: MessageCircle,

    value: "98%",

    label: "Positive Feedback",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="absolute left-1/2 top-0 h-87.5 w-87.5 -translate-x-1/2 rounded-full bg-violet-100 blur-[120px] dark:bg-violet-950/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
            Platform Growth
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Empowering Startup Innovation Worldwide
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">
            Thousands of creators, founders, and innovators are already building
            the future with IdeaVault.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 dark:bg-violet-950/30" />

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-200 transition-transform duration-500 group-hover:scale-110 dark:shadow-violet-950/40">
                <item.icon size={30} className="text-white" />
              </div>

              <h3 className="relative z-10 mt-8 text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                {item.value}
              </h3>

              <p className="relative z-10 mt-4 text-lg font-medium text-slate-500 dark:text-slate-400">
                {item.label}
              </p>

              <div className="absolute inset-0 rounded-4xl border border-transparent transition-all duration-500 group-hover:border-violet-100 dark:group-hover:border-violet-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
