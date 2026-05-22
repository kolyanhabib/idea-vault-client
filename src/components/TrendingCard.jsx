import Link from "next/link";

import Image from "next/image";

import {
  ArrowRight,
  Sparkles,
  Book,
  Rocket,
  GraduationCap,
  Users,
  Brain,
  Monitor,
  HeartPulse,
  Shield,
  Activity,
  Heart,
  Dumbbell,
  Cpu,
  PenTool,
  Megaphone,
  Code,
  Terminal,
  Cloud,
  Workflow,
  Lock,
  Briefcase,
  Wallet,
  CalendarDays,
} from "lucide-react";

import { GrGroup } from "react-icons/gr";

const tagIcons = {
  AI: Sparkles,

  Education: GraduationCap,

  Learning: Book,

  Community: Users,

  Virtual: Monitor,

  Technology: Cpu,

  Health: HeartPulse,

  Wellness: Heart,

  Mental: Brain,

  Fitness: Dumbbell,

  Lifestyle: Activity,

  Automation: Rocket,

  Content: PenTool,

  Marketing: Megaphone,

  Coding: Code,

  Software: Terminal,

  Cloud: Cloud,

  Productivity: Workflow,

  Security: Shield,

  Cyber: Lock,

  Workspace: Briefcase,

  Remote: Monitor,
};

const TrendingCard = ({ feature }) => {
  if (!feature) return null;

  const {
    _id = "",

    imageURL = "",

    title = "Untitled Idea",

    category = "Startup",

    shortDescription = "No description available",

    tags = [],

    targetAudience = "Everyone",

    estimatedBudget = "0",

    author = "Unknown User",

    profile = "",

    createdAt = new Date(),
  } = feature;

  const defaultBanner =
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop";

  const defaultProfile = "https://i.ibb.co/4pDNDk1/avatar.png";

  return (
    <div className="group overflow-hidden rounded-[30px] border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-violet-300 hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)] dark:border-slate-800 dark:bg-slate-900 dark:hover:border-violet-700">
      <div className="relative overflow-hidden">
        <Image
          src={imageURL || defaultBanner}
          alt={title}
          width={600}
          height={400}
          sizes="(max-width:768px) 100vw, 33vw"
          className="h-44 sm:h-52 md:h-60 w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

        <div className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold tracking-wide text-slate-700 shadow-lg dark:bg-slate-900/90 dark:text-slate-200">
          {category}
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 md:p-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-slate-900 transition duration-300 group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-400">
            {title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm sm:text-[15px] leading-6 sm:leading-7 text-slate-600 dark:text-slate-400">
            {shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags?.map((tag, index) => {
              const Icon = tagIcons[tag];

              return (
                <div
                  key={index}
                  className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 transition-all duration-300 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-violet-700 dark:hover:bg-violet-950/40 dark:hover:text-violet-300"
                >
                  {Icon && (
                    <Icon
                      size={15}
                      className="text-violet-600 dark:text-violet-400"
                    />
                  )}

                  <span>{tag}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
                <GrGroup size={15} />
              </div>

              <div>
                <p className="text- font-medium text-slate-400 dark:text-slate-500">
                  Audience
                </p>

                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {targetAudience}
                </p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 mr-1" />

            <div className="flex items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Wallet size={17} />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  Budget
                </p>

                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  {estimatedBudget}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 flex items-center gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-violet-100 dark:ring-violet-900">
              <Image
                src={profile || defaultProfile}
                alt={author}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {author}
              </h4>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                <CalendarDays size={13} />

                {new Date(createdAt).toLocaleDateString("en-US", {
                  year: "numeric",

                  month: "short",

                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6">
          <Link href={`/ideas/${_id}`}>
            <button className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-5 py-3.5 text-sm font-semibold text-violet-700 transition-all duration-300 hover:bg-violet-600 hover:text-white dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300 dark:hover:bg-violet-600 dark:hover:text-white">
              <span>View Details</span>

              <ArrowRight
                size={17}
                className="transition duration-300 group-hover:translate-x-1"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrendingCard;
