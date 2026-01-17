import Header from "@/components/header"
import Hero from "@/components/hero"
import SearchFilter from "@/components/search-filter"
import FeaturesSection from "@/components/features-section"
import BrowseByBrands from "@/components/browse-brands"
import CarFinderForm from "@/components/car-finder-form"
import NewsletterBanner from "@/components/newsletter-banner"
import Footer from "@/components/footer"
import FloatingActions from "@/components/floating-actions"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <FloatingActions />
      <Hero />
      <SearchFilter />
      <BrowseByBrands />
      <FeaturesSection />
      <CarFinderForm />
      <NewsletterBanner />
      <Footer />
    </main>
  )
}
