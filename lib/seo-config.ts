export const seoConfig = {
  siteName: "Car Junction LLC",
  siteUrl: "https://carjunctionllc.com",
  
  googleVerification: "",
  bingVerification: "",
  yandexVerification: "",
  
  googleTagManagerId: "",
  googleAnalyticsId: "",
  facebookPixelId: "",
  
  business: {
    name: "Car Junction LLC",
    legalName: "Car Junction LLC",
    description: "Quality pre-owned vehicles at competitive prices in Dallas, Texas. Wide selection of cars, trucks, and SUVs with financing options available.",
    phone: "+1 (214) 215-6273",
    email: "cjunctionllc@gmail.com",
    address: {
      street: "2435 Glenda Lane Ste 4",
      city: "Dallas",
      state: "Texas",
      stateCode: "TX",
      zip: "75229",
      country: "United States",
      countryCode: "US"
    },
    geo: {
      latitude: "32.8998",
      longitude: "-96.8867"
    },
    hours: {
      monday: "09:00-19:00",
      tuesday: "09:00-19:00",
      wednesday: "09:00-19:00",
      thursday: "09:00-19:00",
      friday: "09:00-19:00",
      saturday: "09:00-19:00",
      sunday: "Closed"
    },
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
      linkedin: ""
    }
  },

  defaultKeywords: [
    "Car Junction LLC",
    "Car Junction Dallas",
    "used cars Dallas",
    "pre-owned vehicles Texas",
    "buy used cars Dallas TX",
    "car dealership Dallas",
    "affordable used cars",
    "quality pre-owned vehicles",
    "auto financing Dallas",
    "used trucks Dallas",
    "used SUVs Dallas",
    "car dealer near me",
    "best used car dealer Dallas"
  ],

  pages: {
    home: {
      title: "Car Junction LLC | Quality Pre-Owned Vehicles in Dallas, TX",
      description: "Find your perfect vehicle at Car Junction LLC in Dallas, Texas. Browse our wide selection of quality pre-owned cars, trucks, and SUVs with competitive pricing and flexible financing options.",
      keywords: ["used cars Dallas", "Car Junction LLC", "pre-owned vehicles", "car dealer Dallas TX"]
    },
    vehicles: {
      title: "Browse Our Inventory | Car Junction LLC Dallas",
      description: "Explore our complete inventory of quality pre-owned vehicles. Cars, trucks, SUVs and more at competitive prices. Financing available.",
      keywords: ["used car inventory", "pre-owned cars for sale", "buy used cars Dallas"]
    },
    about: {
      title: "About Us | Car Junction LLC - Trusted Dallas Car Dealer",
      description: "Learn about Car Junction LLC, your trusted source for quality pre-owned vehicles in Dallas, Texas. Family-owned dealership committed to customer satisfaction.",
      keywords: ["about Car Junction", "Dallas car dealer", "trusted used car dealer"]
    },
    contact: {
      title: "Contact Us | Car Junction LLC Dallas, TX",
      description: "Contact Car Junction LLC for all your vehicle needs. Visit us at 2435 Glenda Lane Ste 4, Dallas, TX 75229 or call (214) 215-6273.",
      keywords: ["contact Car Junction", "car dealer phone number", "Dallas dealership location"]
    },
    apply: {
      title: "Apply for Financing | Car Junction LLC",
      description: "Apply for auto financing at Car Junction LLC. Quick and easy credit application for quality pre-owned vehicles in Dallas, TX.",
      keywords: ["auto financing Dallas", "car loan application", "vehicle financing"]
    },
    export: {
      title: "Vehicle Export Services | Car Junction LLC",
      description: "International vehicle export services from Car Junction LLC. Quality American used cars shipped worldwide.",
      keywords: ["car export", "vehicle export USA", "international car sales"]
    }
  }
}

export function generateStructuredData() {
  const { business } = seoConfig
  
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": business.name,
    "legalName": business.legalName,
    "description": business.description,
    "url": seoConfig.siteUrl,
    "telephone": business.phone,
    "email": business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": business.address.street,
      "addressLocality": business.address.city,
      "addressRegion": business.address.stateCode,
      "postalCode": business.address.zip,
      "addressCountry": business.address.countryCode
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": business.geo.latitude,
      "longitude": business.geo.longitude
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00"
      }
    ],
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "paymentAccepted": "Cash, Credit Card, Financing",
    "areaServed": {
      "@type": "City",
      "name": "Dallas",
      "containedInPlace": {
        "@type": "State",
        "name": "Texas"
      }
    },
    "sameAs": Object.values(business.socialMedia).filter(url => url)
  }
}

export function generateVehicleStructuredData(vehicle: {
  id: number
  name: string
  year: number
  make: string
  model: string
  price: number
  mileage: number
  vin?: string
  exteriorColor?: string
  images?: string[]
  stockNumber?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": `${vehicle.year} ${vehicle.name}`,
    "brand": {
      "@type": "Brand",
      "name": vehicle.make
    },
    "model": vehicle.model,
    "modelDate": vehicle.year.toString(),
    "vehicleIdentificationNumber": vehicle.vin || undefined,
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileage,
      "unitCode": "SMI"
    },
    "color": vehicle.exteriorColor || undefined,
    "image": vehicle.images?.[0] ? `${seoConfig.siteUrl}${vehicle.images[0]}` : undefined,
    "offers": {
      "@type": "Offer",
      "price": vehicle.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": seoConfig.business.name
      }
    },
    "sku": vehicle.stockNumber || vehicle.id.toString()
  }
}
