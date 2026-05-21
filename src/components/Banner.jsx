"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop",
    badge: "IDEAVAULT VISION",
    title: "Unlock Your Startup Potential",
    description:
      "Share your innovative ideas and get feedback from the community of creators.",
    button: "Explore Ideas",
  },

  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    badge: "STARTUP COMMUNITY",
    title: "Turn Creative Ideas Into Reality",
    description:
      "Connect with innovators, entrepreneurs, and future startup founders.",
    button: "Get Started",
  },

  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop",
    badge: "AI INNOVATION",
    title: "Build The Future With Technology",
    description:
      "Discover next generation startup concepts powered by AI and innovation.",
    button: "View Trends",
  },
];

export default function BannerSection() {
  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="heroSwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-125 overflow-hidden sm:h-130 md:h-155 lg:h-180 xl:h-205">
              {/* IMAGE */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                sizes="100vw"
                priority={slide.id === 1}
                className="object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/60" />

              {/* GRADIENT */}
              <div className="absolute inset-0 bg-linear-to-r from-[#0B1020]/95 via-[#0B1020]/70 to-transparent" />

              {/* CONTENT */}
              <div className="relative z-10 flex h-full items-center">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-14">
                  <div className="max-w-xl lg:max-w-2xl">
                    {/* BADGE */}
                    <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-white backdrop-blur-md sm:mb-6 sm:px-5 sm:py-2 sm:text-xs">
                      {slide.badge}
                    </div>

                    {/* TITLE */}
                    <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight lg:text-7xl">
                      {slide.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="mt-4 max-w-lg text-sm leading-6 text-gray-300 sm:mt-6 sm:text-base sm:leading-8 md:text-lg">
                      {slide.description}
                    </p>

                    {/* BUTTON */}
                    <button className="group mt-6 flex items-center gap-2 rounded-2xl bg-[#5B4BFF] px-5 py-3 text-sm font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:bg-[#6B5CFF] sm:mt-8 sm:px-7 sm:py-4 sm:text-base">
                      {slide.button}

                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* CUSTOM SWIPER STYLE */}
      <style jsx global>{`
        .heroSwiper .swiper-button-next,
        .heroSwiper .swiper-button-prev {
          color: white;
          width: 42px;
          height: 42px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(8px);
          transition: all 0.3s ease;
        }

        .heroSwiper .swiper-button-next:hover,
        .heroSwiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .heroSwiper .swiper-button-next::after,
        .heroSwiper .swiper-button-prev::after {
          font-size: 16px;
          font-weight: 700;
        }

        .heroSwiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .heroSwiper .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 9999px;
          background: white;
        }

        @media (max-width: 768px) {
          .heroSwiper .swiper-button-next,
          .heroSwiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
