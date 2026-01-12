import Link from "next/link"

export default function NewsletterBanner() {
  return (
    <section className="relative py-0 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative -mb-24 md:-mb-28 z-10">
          <div className="rounded-xl shadow-2xl py-6 px-8 md:py-8 md:px-12 bg-red-700 text-white max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img src="/images/logo2.png" alt="Cars & Trucks Logo" className="h-12 md:h-14 w-auto" />
              </div>

              {/* Message - takes more space */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold mb-1.5">WE CAN GET YOU FINANCED</h3>
                <p className="text-sm text-red-100">
                  Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores and situations.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex-shrink-0">
                <Link href="/apply">
                  <button className="bg-black text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm whitespace-nowrap">
                    Apply Online
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
