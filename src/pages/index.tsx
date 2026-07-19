import Head from 'next/head';
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";

export default function Index() {
  const siteUrl = "https://mantradevs.com"; 

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Mantra Devs",
      "alternateName": ["MantraDevs", "Mantrs Devs"],
      "description": "Premium software studio and the best IT company in Nepal crafting web, mobile, AI and cloud products. Makers of ClinicSathi and Retrokit Nepal.",
      "url": siteUrl,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "author": {
        "@type": "Organization",
        "name": "Mantra Devs",
        "url": siteUrl,
        "logo": `${siteUrl}/favicon.png`,
        "sameAs": [
          "https://github.com/rahulrr2058/mantradevs",
          "https://twitter.com/mantradevs"
        ]
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Mantra Devs",
      "alternateName": ["MantraDevs", "Mantrs Devs", "Mantra Verse"],
      "image": `${siteUrl}/logo.png`,
      "@id": `${siteUrl}/#organization`,
      "url": siteUrl,
      "telephone": "+9779866115154",
      "priceRange": "$$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Chitwan",
        "addressLocality": "Chitwan",
        "addressRegion": "Bagmati",
        "postalCode": "44200",
        "addressCountry": "NP"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 27.6833,
        "longitude": 84.4333
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "sameAs": [
        "https://github.com/rahulrr2058/mantradevs",
        "https://twitter.com/mantradevs"
      ],
      "description": "Mantra Devs is the best IT company and software development agency in Nepal, specializing in premium web engineering, cross-platform mobile apps (Expo & React Native), artificial intelligence integrations (RAG/LLMs), and cloud architecture.",
      "knowsAbout": [
        "Web Engineering",
        "Software Development",
        "Mobile App Development",
        "Artificial Intelligence",
        "Cloud Architecture",
        "IT Training in Nepal",
        "Next.js Development",
        "NestJS Backend"
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Mantra Devs | Best IT Company & Software Development Studio Nepal</title>
        <meta name="description" content="Mantra Devs (also known as MantraDevs / Mantrs Devs) is the best IT company and premium software engineering studio in Nepal, specializing in custom web engineering, AI, mobile apps, and design." />
        <meta name="keywords" content="Mantra Devs, MantraDevs, Mantrs Devs, best IT company, IT company in Nepal, software development company Nepal, best software company, custom software development, digital studio, ClinicSathi, Retrokit" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:site_name" content="Mantra Devs" />
        <meta property="og:title" content="Mantra Devs | Best IT Company & Software Development Studio Nepal" />
        <meta property="og:description" content="Mantra Devs (MantraDevs/Mantrs Devs) is the best IT company in Nepal. We build premium web, mobile, and AI solutions." />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}/`} />
        <meta property="twitter:title" content="Mantra Devs | Best IT Company & Software Development Studio Nepal" />
        <meta property="twitter:description" content="Premium software studio and IT company in Nepal. We craft scalable, beautiful, and secure software." />
        <meta property="twitter:image" content={`${siteUrl}/og-image.png`} />
        
        <link rel="canonical" href={`${siteUrl}/`} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <div className="dark:bg-[#030014] bg-[#faf9fe] transition-colors duration-500 min-h-screen">
        <Nav />
        <main>
          <Hero />
          <Services />
          <Work />
          <Contact />
        </main>
      </div>
    </>
  );
}

