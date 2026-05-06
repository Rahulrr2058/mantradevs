import { createFileRoute } from "@tanstack/react-router";
import { MantraverseProvider, useMantraverse } from "@/components/MantraverseContext";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";
import { CursorTrail } from "@/components/CursorTrail";
import { FallingIcons } from "@/components/FallingIcons";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mantra Devs — Software studio crafting digital mantras" },
      { name: "description", content: "Mantra Devs is a software studio building web, mobile, AI and cloud products. Makers of ClinicSathi, Retrokit Nepal and more." },
      { property: "og:title", content: "Mantra Devs — Digital craft studio" },
      { property: "og:description", content: "Web, mobile, AI and cloud products engineered with care." },
    ],
  }),
  component: Index,
});

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

function Index() {
  return (
    <MantraverseProvider>
      <Shell />
    </MantraverseProvider>
  );
}
