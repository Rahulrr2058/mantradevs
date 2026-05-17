import Head from 'next/head';
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";

export default function Index() {
  const siteUrl = "https://rahulrr2058.github.io/mantradevs"; 

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Mantra Devs",
    "alternateName": "MantraDevs",
    "description": "Premium software studio in Nepal crafting web, mobile, AI and cloud products. Makers of ClinicSathi and Retrokit Nepal.",
    "url": siteUrl,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "author": {
      "@type": "Organization",
      "name": "Mantra Devs",
      "location": {
        "@type": "Place",
        "name": "Nepal"
      }
    }
  };

  return (
    <>
      <Head>
        <title>Mantra Devs l Creafting Digital Mantras</title>
        <meta name="description" content="Experience Mantra Devs Verse 2.0. We craft digital dimensions through advanced web engineering, AI, and premium design." />
        <meta name="keywords" content="Mantra Devs, MantraDevs, Software Studio Nepal, Web Development Nepal, Mobile App Development, AI Solutions Nepal, ClinicSathi, Retrokit Nepal" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:site_name" content="Mantra Devs" />
        <meta property="og:title" content="Mantra Devs — Verse 2.0" />
        <meta property="og:description" content="Premium software engineering studio building the future of digital experiences." />
        <meta property="og:image" content={`${siteUrl}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}/`} />
        <meta property="twitter:title" content="Mantra Devs — Digital Craft Studio" />
        <meta property="twitter:description" content="Building the future of web, mobile and AI solutions from Nepal." />
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

