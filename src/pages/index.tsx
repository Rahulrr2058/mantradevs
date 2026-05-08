import Head from 'next/head';
import { MantraverseProvider, useMantraverse } from "@/components/MantraverseContext";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { CursorTrail } from "@/components/CursorTrail";
import { FallingIcons } from "@/components/FallingIcons";

function Shell() {
  const { mantraverse } = useMantraverse();
  return (
    <div className={`relative min-h-screen ${mantraverse ? "bg-[#08060f]" : "bg-background"} transition-colors duration-700`}>
      <CursorTrail active={mantraverse} />
      <FallingIcons active={mantraverse} />
      <Nav />
      <main>
        <Hero />
        <Services />
        <Work />
        <Process />
        <Contact />
      </main>
    </div>
  );
}

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
        <title>Mantra Devs — Best Software Studio in Nepal | Web, Mobile & AI</title>
        <meta name="description" content="Mantra Devs is the leading software studio in Nepal building world-class web, mobile, AI, and cloud solutions. We craft digital mantras that scale." />
        <meta name="keywords" content="Mantra Devs, MantraDevs, Software Studio Nepal, Web Development Nepal, Mobile App Development, AI Solutions Nepal, ClinicSathi, Retrokit Nepal" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/`} />
        <meta property="og:site_name" content="Mantra Devs" />
        <meta property="og:title" content="Mantra Devs — Crafting Digital Mantras that Scale" />
        <meta property="og:description" content="Premium software engineering studio building web, mobile, AI and cloud products with care." />
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


      <MantraverseProvider>
        <Shell />
      </MantraverseProvider>
    </>
  );
}

