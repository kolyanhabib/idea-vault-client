import Image from "next/image";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,

    name: "Sarah Ahmed",

    role: "Startup Founder",

    image: "https://randomuser.me/api/portraits/women/68.jpg",

    review:
      "IdeaVault helped me validate my AI startup idea before investing months into development. The feedback system is amazing.",
  },

  {
    id: 2,

    name: "Rifat Hasan",

    role: "Product Designer",

    image: "https://randomuser.me/api/portraits/men/32.jpg",

    review:
      "A beautiful platform where innovators collaborate and improve ideas together. The community is highly engaging.",
  },

  {
    id: 3,

    name: "Emily Carter",

    role: "Tech Entrepreneur",

    image: "https://randomuser.me/api/portraits/women/44.jpg",

    review:
      "The modern UI and startup-focused ecosystem make IdeaVault feel like a premium innovation hub.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white py-24 transition-colors duration-300 dark:bg-[#020617]">
      <div className="absolute left-1/2 top-0 h-87.5 w-87.5 -translate-x-1/2 rounded-full bg-violet-100 blur-[120px] dark:bg-violet-950/30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-5 py-2 text-sm font-semibold text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300">
            <Star size={15} className="fill-yellow-400 text-yellow-400" />
            Success Stories
          </div>

          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white md:text-5xl">
            What Innovators Say
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">
            Hear from founders, creators, and entrepreneurs who use IdeaVault to
            validate and improve their startup ideas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-4xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-100 opacity-0 blur-3xl transition duration-500 group-hover:opacity-100 dark:bg-violet-950/30" />

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-200 dark:shadow-violet-950/40">
                <Quote size={28} className="text-white" />
              </div>

              <p className="relative z-10 mt-8 leading-8 text-slate-600 dark:text-slate-300">
                {item.review}
              </p>

              <div className="mt-6 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-violet-100 dark:ring-violet-900">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="absolute inset-0 rounded-4xl border border-transparent transition-all duration-500 group-hover:border-violet-100 dark:group-hover:border-violet-800" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
