import { ShieldCheck, Brain, Users, Rocket } from "lucide-react";

const features = [
  {
    id: 1,

    icon: Brain,

    title: "AI Powered Discovery",

    description:
      "Explore innovative startup concepts with intelligent idea discovery and smart recommendations.",
  },

  {
    id: 2,

    icon: Users,

    title: "Creative Community",

    description:
      "Connect with founders, developers, creators, and entrepreneurs from around the world.",
  },

  {
    id: 3,

    icon: ShieldCheck,

    title: "Secure Idea Sharing",

    description:
      "Safely share startup ideas, receive feedback, and collaborate with confidence.",
  },

  {
    id: 4,

    icon: Rocket,

    title: "Launch Faster",

    description:
      "Validate concepts quickly and transform innovative ideas into real startup opportunities.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-slate-50 py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
            Why Choose IdeaVault
          </span>

          <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Build The Future With Better Collaboration
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">
            IdeaVault helps creators discover, validate, and collaborate on
            startup ideas in a modern innovation ecosystem.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-violet-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 dark:bg-violet-950/30" />

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-500 shadow-lg shadow-violet-200 transition-transform duration-500 group-hover:scale-110 dark:shadow-violet-950/40">
                <feature.icon size={30} className="text-white" />
              </div>

              <div className="relative z-10">
                <h3 className="mt-8 text-2xl font-black text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-8 text-slate-500 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-4xl border border-transparent transition-all duration-500 group-hover:border-violet-100 dark:group-hover:border-violet-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
