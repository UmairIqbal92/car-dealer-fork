export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "name": "Car Junction LLC",
    "description": "Quality used cars and trucks dealership in Dallas, TX. Wide selection of pre-owned vehicles at unbeatable prices with easy financing options.",
    "url": "https://carjunctionllc.com",
    "logo": "https://carjunctionllc.com/logo.png",
    "image": "https://carjunctionllc.com/og-image.png",
    "telephone": "+1-214-215-6273",
    "email": "cjunctionllc@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2435 Glenda Lane Ste 4",
      "addressLocality": "Dallas",
      "addressRegion": "TX",
      "postalCode": "75229",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "32.89",
      "longitude": "-96.87"
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
    "paymentAccepted": ["Cash", "Credit Card", "Financing"],
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "32.89",
        "longitude": "-96.87"
      },
      "geoRadius": "50 miles"
    },
    "sameAs": [
      "https://www.facebook.com/people/Car-Junction-USA/61584677702455/",
      "https://www.instagram.com/carjunctionllc"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Car Junction LLC",
    "url": "https://carjunctionllc.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://carjunctionllc.com/vehicles?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function VehicleSchema({ vehicle }: { vehicle: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    "brand": {
      "@type": "Brand",
      "name": vehicle.make
    },
    "model": vehicle.model,
    "vehicleModelDate": vehicle.year.toString(),
    "mileageFromOdometer": {
      "@type": "QuantitativeValue",
      "value": vehicle.mileage,
      "unitCode": "SMI"
    },
    "color": vehicle.color,
    "vehicleTransmission": vehicle.transmission,
    "fuelType": vehicle.fuel_type,
    "bodyType": vehicle.body_type,
    "offers": {
      "@type": "Offer",
      "price": vehicle.price,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Car Junction LLC"
      }
    },
    "image": vehicle.images?.[0] || "https://carjunctionllc.com/og-image.png"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
