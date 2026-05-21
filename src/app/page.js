import Banner from "@/components/Banner";

import NewsletterSection from "@/components/NewsletterSection";


import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import TrendingIdeas from "@/components/TrendingIdeas";
import WhyChooseSection from "@/components/WhyChooseSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617]">
      <Banner />
      <TrendingIdeas />
      <StatsSection/>
      <WhyChooseSection/>
      <Testimonials />
      <NewsletterSection/>
    </div>
  );
}
