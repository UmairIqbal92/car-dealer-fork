import Link from "next/link"

export default function NewsletterBanner() {
  return (
    <section className="relative py-0 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative -mb-28 md:-mb-32 z-10">
          <div className="rounded-2xl shadow-2xl p-10 md:p-12 bg-red-700 text-white max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Logo */}
              <div className="flex items-center justify-center md:justify-start">
                <img src="/images/logo2.png" alt="Cars & Trucks Logo" className="h-16 w-auto" />
              </div>

              {/* Message */}
              <div className="md:col-span-1 text-center md:text-left">
                <h3 className="text-xl font-bold mb-2">WE CAN GET YOU FINANCED</h3>
                <p className="text-sm text-red-100">
                  Good Credit, Bad Credit, First Time Buyer? Our lenders work with all types of scores and situations.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex justify-center md:justify-end">
                <Link href="/apply">
                  <button className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors text-sm">
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
