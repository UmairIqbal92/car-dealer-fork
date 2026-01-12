import Header from "@/components/header"
import Hero from "@/components/hero"
import SearchFilter from "@/components/search-filter"
import FeaturesSection from "@/components/features-section"
import BrowseByBrands from "@/components/browse-brands"
import StatsSection from "@/components/stats-section"
import CarFinderForm from "@/components/car-finder-form"
import TestimonialsSection from "@/components/testimonials-section"
import NewsletterBanner from "@/components/newsletter-banner"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <SearchFilter />
      <BrowseByBrands />
      <FeaturesSection />
      <StatsSection />
      <CarFinderForm />
      <TestimonialsSection />
      <NewsletterBanner />
      <Footer />
    </main>
  )
}
