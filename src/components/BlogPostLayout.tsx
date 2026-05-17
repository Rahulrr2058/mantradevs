import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { BlogPost } from "@/lib/blogData";
import { assetPath } from "@/lib/assetPath";
import {
  Clock, Calendar, User, Twitter, Linkedin,
  Link2, ChevronRight, BookOpen, Tag,
  CheckCircle2, ArrowUpRight, Sun, Moon
} from "lucide-react";

function TableOfContents({ sections }: { sections: BlogPost["sections"] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-20% 0% -60% 0%" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="p-6 rounded-2xl dark:bg-white/3 bg-white border dark:border-white/8 border-slate-200/80 backdrop-blur-xl shadow-lg transition-colors duration-500">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
        <span className="text-xs font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400">Contents </span>
      </div>
      <ol className="space-y-2">
        {sections.map((s, i) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex items-start gap-3 text-sm py-1.5 px-3 rounded-lg transition-all duration-200 group ${
                active === s.id
                  ? "bg-indigo-500/15 dark:text-white text-indigo-700 font-bold"
                  : "dark:text-indigo-200/40 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-200/80 dark:hover:bg-white/5 hover:bg-slate-100"
              }`}
            >
              <span className={`text-xs font-mono mt-0.5 flex-shrink-0 ${active === s.id ? "text-indigo-500" : "dark:text-white/20 text-slate-300"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-snug">{s.heading}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : `https://mantradevs.com/blog/${slug}`;
  const encoded = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-black uppercase tracking-widest dark:text-indigo-200/30 text-slate-400">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="w-9 h-9 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex items-center justify-center dark:text-indigo-200/50 text-slate-600 dark:hover:text-[#1DA1F2] hover:text-[#1DA1F2] dark:hover:border-[#1DA1F2]/30 hover:border-[#1DA1F2]/30 dark:hover:bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/10 transition-all"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank" rel="noreferrer"
        className="w-9 h-9 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex items-center justify-center dark:text-indigo-200/50 text-slate-600 dark:hover:text-[#0A66C2] hover:text-[#0A66C2] dark:hover:border-[#0A66C2]/30 hover:border-[#0A66C2]/30 dark:hover:bg-[#0A66C2]/10 hover:bg-[#0A66C2]/10 transition-all"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
      <button
        onClick={copyLink}
        className="w-9 h-9 rounded-xl dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 flex items-center justify-center dark:text-indigo-200/50 text-slate-600 dark:hover:text-white hover:text-slate-800 dark:hover:bg-white/10 hover:bg-slate-200 transition-all cursor-pointer"
        aria-label="Copy link"
      >
        {copied ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}

function AuthorBio() {
  return (
    <div className="mt-16 p-8 rounded-3xl dark:bg-white/3 bg-white border dark:border-white/8 border-slate-200/80 backdrop-blur-xl flex flex-col sm:flex-row gap-6 items-start shadow-md transition-colors duration-500">
      <img
        src={assetPath("/blog/author.png")}
        alt="Mantra Devs Team"
        className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border dark:border-white/10 border-slate-200 shadow-sm"
      />
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold dark:text-white text-slate-900 transition-colors duration-500">The Mantra Devs Team</h3>
          <a href="https://twitter.com/mantradevs" target="_blank" rel="noreferrer"
            className="text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
            @mantradevs <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <p className="dark:text-indigo-200/50 text-slate-600 text-sm leading-relaxed max-w-2xl transition-colors duration-500">
          We are a team of engineers, designers, and product thinkers based in Kathmandu, Nepal. We build 
          digital products that scale — from healthcare platforms to commerce experiences. If you want to 
          work with us or just want to geek out about tech, we would love to hear from you.
        </p>
        <div className="flex items-center gap-4 pt-1">
          <Link href="/#contact" className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors flex items-center gap-1">
            Work with us <ArrowUpRight className="w-3 h-3" />
          </Link>
          <Link href="/blog" className="text-xs font-bold dark:text-white/30 text-slate-400 hover:text-slate-700 dark:hover:text-white/60 transition-colors">
            More articles →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BlogPostLayout({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const siteUrl = "https://mantradevs.com";
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    // Sync initial theme
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  return (
    <>
      <Head>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="author" content="Mantra Devs" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:image" content={`${siteUrl}${post.featuredImage}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:modified_time" content={post.updatedDate} />
        <meta property="article:section" content={post.category} />
        {post.tags.map((t) => <meta key={t} property="article:tag" content={t} />)}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content={`${siteUrl}${post.featuredImage}`} />
        <link rel="canonical" href={`${siteUrl}/blog/${post.slug}`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          image: `${siteUrl}${post.featuredImage}`,
          author: { "@type": "Organization", name: "Mantra Devs", url: siteUrl },
          publisher: { "@type": "Organization", name: "Mantra Devs", logo: { "@type": "ImageObject", url: `${siteUrl}/favicon.png` } },
          datePublished: post.publishDate,
          dateModified: post.updatedDate,
          description: post.metaDescription,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/blog/${post.slug}` },
        })}} />
      </Head>

      <div className="min-h-screen dark:bg-[#030014] bg-[#faf9fe] transition-colors duration-500 text-slate-800 dark:text-slate-100">
        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-50 py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between px-6 py-3 rounded-full dark:bg-black/60 bg-white/80 border dark:border-white/10 border-slate-200/80 backdrop-blur-2xl shadow-2xl transition-colors duration-500">
              <Link href="/" className="flex items-center gap-3 dark:text-white text-slate-800 font-black tracking-tighter hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
                <span className="text-indigo-500 group-hover:-translate-x-1 transition-transform">←</span>
                <div className="w-8 h-8 dark:bg-[#030014]/60 bg-slate-100 rounded-lg flex items-center justify-center border dark:border-white/10 border-slate-200 overflow-hidden p-1 shadow-[0_0_10px_rgba(34,211,238,0.2)] dark:group-hover:border-cyan-500/40 group-hover:border-indigo-500/30 transition-all duration-300">
                  <img 
                    src={assetPath('/logo.png')} 
                    alt="Mantra Devs Logo" 
                    className="w-full h-full object-contain filter drop-shadow-[0_0_6px_rgba(6,182,212,0.5)]"
                  />
                </div>
                <span>MANTRA DEVS</span>
              </Link>
              
              {/* Desktop Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                {[
                  { name: 'Services', href: '/#services' },
                  { name: 'Work', href: '/#work' },
                  { name: 'Blog', href: '/blog' },
                  { name: 'Contact', href: '/#contact' }
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      item.name === 'Blog' ? 'text-indigo-600 dark:text-white' : 'dark:text-indigo-100/40 text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleTheme}
                  className="p-2 rounded-full dark:bg-white/5 bg-slate-100 hover:bg-slate-200 dark:hover:bg-white/10 dark:text-indigo-200 text-slate-700 transition-all border dark:border-white/10 border-slate-200 shadow-md group cursor-pointer"
                  aria-label="Toggle Theme"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600 group-hover:-rotate-12 transition-transform duration-500" />
                  )}
                </button>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img src={assetPath(post.featuredImage)} alt={post.featuredImageAlt} className="w-full h-full object-cover opacity-15 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-b dark:from-[#030014]/50 dark:via-[#030014]/70 dark:to-[#030014] from-slate-100/40 via-slate-100/60 to-[#faf9fe]" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] blur-[150px] -z-10 opacity-30"
            style={{ backgroundColor: post.color }} />

          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs dark:text-indigo-200/30 text-slate-400 mb-8 transition-colors duration-500">
              <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-indigo-500 dark:text-indigo-400 font-bold">{post.category}</span>
            </div>

            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-widest mb-6"
              style={{ borderColor: `${post.color}40`, color: post.color, backgroundColor: `${post.color}10` }}>
              <Tag className="w-3 h-3" />
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black dark:text-white text-slate-900 leading-tight tracking-tight mb-8 transition-colors duration-500">
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm dark:text-indigo-200/40 text-slate-500 mb-8 pb-8 border-b dark:border-white/5 border-slate-200 transition-colors duration-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Mantra Devs Team</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Published {post.publishDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-500 dark:text-green-400/60" />
                <span>Updated {post.updatedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-xl dark:text-indigo-200/60 text-slate-650 leading-relaxed italic border-l-4 pl-6 mb-0 transition-colors duration-500"
              style={{ borderColor: post.color }}>
              {post.excerpt}
            </p>
          </div>
        </section>

        {/* Featured image */}
        <div className="max-w-5xl mx-auto px-4 mb-16">
          <div className="relative rounded-3xl overflow-hidden aspect-[16/7] shadow-2xl border dark:border-white/10 border-slate-200">
            <img src={assetPath(post.featuredImage)} alt={post.featuredImageAlt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t dark:from-[#030014]/40 to-transparent" />
          </div>
          <p className="text-center text-xs dark:text-indigo-200/30 text-slate-400 mt-3 italic">{post.featuredImageAlt}</p>
        </div>

        {/* Body */}
        <div className="max-w-[1400px] mx-auto px-4 pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_250px] gap-8 xl:gap-12">
            {/* Content */}
            <article className="prose dark:prose-invert prose-lg max-w-none order-1 lg:order-2 min-w-0">
              {post.sections.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32 mb-16">
                  {section.level === 2 ? (
                    <h2 className="text-3xl font-black dark:text-white text-slate-900 mb-6 leading-tight flex items-start gap-3 transition-colors duration-500">
                      <span className="text-lg mt-1.5 flex-shrink-0" style={{ color: post.color }}>§</span>
                      {section.heading}
                    </h2>
                  ) : (
                    <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-4 transition-colors duration-500">{section.heading}</h3>
                  )}

                  <p className="dark:text-indigo-200/60 text-slate-650 leading-relaxed mb-6 text-lg transition-colors duration-500">{section.content}</p>

                  {section.bullets && (
                    <ul className="space-y-3 mb-8">
                      {section.bullets.map((b, i) => (
                        <li key={i} className="flex items-start gap-3 dark:text-indigo-200/70 text-slate-650 transition-colors duration-500">
                          <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: post.color }} />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.image && (
                    <figure className="my-10 rounded-2xl overflow-hidden border dark:border-white/10 border-slate-200 shadow-xl">
                      <img src={assetPath(section.image.src)} alt={section.image.alt} className="w-full object-cover max-h-80" />
                      <figcaption className="px-6 py-3 dark:bg-white/3 bg-slate-50 text-xs dark:text-indigo-200/40 text-slate-500 italic text-center">
                        {section.image.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>
              ))}

              {/* Tags */}
              <div className="mt-16 pt-8 border-t dark:border-white/5 border-slate-200 transition-colors duration-500">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-4 py-1.5 rounded-full dark:bg-white/5 bg-slate-100 border dark:border-white/10 border-slate-200 text-xs font-bold dark:text-indigo-200/50 text-slate-600 dark:hover:text-white hover:text-slate-800 dark:hover:border-white/20 hover:border-slate-350 transition-all cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom share */}
              <div className="mt-8 p-6 rounded-2xl dark:bg-white/3 bg-white border dark:border-white/8 border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm transition-colors duration-500">
                <div>
                  <p className="dark:text-white text-slate-800 font-bold mb-1 transition-colors duration-500">Found this useful?</p>
                  <p className="dark:text-indigo-200/40 text-slate-555 text-sm transition-colors duration-500">Share it with your team or network.</p>
                </div>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>

              <AuthorBio />
            </article>

            {/* Left Sidebar (Related posts & CTA) */}
            <aside className="sticky top-28 space-y-8 order-2 lg:order-1 h-fit">
              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="p-6 rounded-2xl dark:bg-white/3 bg-white border dark:border-white/8 border-slate-200/80 shadow-sm transition-colors duration-500">
                  <p className="text-xs font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-4">More Articles</p>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.slug} href={`/blog/${rp.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-xl dark:hover:bg-white/5 hover:bg-slate-100 transition-all">
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border dark:border-white/5 border-slate-200">
                          <img src={assetPath(rp.featuredImage)} alt={rp.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold dark:text-white text-slate-800 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">{rp.title.slice(0, 60)}…</p>
                          <p className="text-xs dark:text-indigo-200/30 text-slate-400 mt-1">{rp.readingTime} min read</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="p-6 rounded-2xl border text-center shadow-sm" style={{ borderColor: `${post.color}30`, background: `${post.color}08` }}>
                <p className="dark:text-white text-slate-800 font-bold mb-2 transition-colors duration-500">Ready to build?</p>
                <p className="dark:text-indigo-200/40 text-slate-500 text-sm mb-4 transition-colors duration-500">Let's bring your vision into the Verse.</p>
                <Link href="/#contact"
                  className="block w-full py-3 rounded-xl font-black text-sm text-white uppercase tracking-widest transition-all hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: post.color }}>
                  Start a Project
                </Link>
              </div>
            </aside>

            {/* Right Sidebar (Table of Contents) */}
            <aside className="sticky top-28 space-y-8 order-3 lg:order-3 h-fit">
              <TableOfContents sections={post.sections} />
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
