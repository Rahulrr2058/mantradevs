import Head from "next/head";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { assetPath } from "@/lib/assetPath";
import { Clock, Calendar, ArrowUpRight, Tag } from "lucide-react";
import { Nav } from "@/components/Nav";

export default function BlogIndex() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      <Head>
        <title>Mantra Devs Blog — Insights on Web, AI, Mobile & Cloud</title>
        <meta name="description" content="Deep-dive articles on web engineering, AI integration, mobile development, cloud architecture, design systems, and custom software — from the Mantra Devs team." />
        <meta property="og:title" content="Mantra Devs Blog" />
        <meta property="og:description" content="Engineering insights from Nepal's premier software studio." />
        <meta property="og:image" content={`https://mantradevs.com${featured.featuredImage}`} />
        <link rel="canonical" href="https://mantradevs.com/blog" />
      </Head>

      <div className="min-h-screen dark:bg-[#030014] bg-[#faf9fe] transition-colors duration-500 text-slate-800 dark:text-slate-100">
        <Nav />

        {/* Page Header */}
        <section className="pt-40 pb-20 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/5 blur-[150px] -z-10 rounded-full" />
          <div className="max-w-7xl mx-auto px-4">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-6">
                <Tag className="w-3 h-3" />
                Mantra Devs Blog
              </div>
              <h1 className="text-5xl md:text-7xl font-black dark:text-white text-slate-900 leading-tight mb-6 transition-colors duration-500">
                IDEAS THAT <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">SCALE.</span>
              </h1>
              <p className="text-xl dark:text-indigo-200/50 text-slate-500 leading-relaxed max-w-2xl transition-colors duration-500">
                Engineering insights, design thinking, and product wisdom — from the team at Mantra Devs. 
                No fluff, no hype. Just the stuff we actually use.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="relative grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border dark:border-white/10 border-slate-200 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl">
              <div className="relative aspect-[16/10] md:aspect-auto">
                <img
                  src={assetPath(featured.featuredImage)}
                  alt={featured.featuredImageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r dark:from-transparent dark:to-[#030014]/80 from-transparent to-white/95 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b dark:from-transparent dark:to-[#030014]/90 from-transparent to-white/95 md:hidden" />
              </div>
              <div className="relative p-8 md:p-12 dark:bg-[#030014]/60 bg-white/95 backdrop-blur-sm flex flex-col justify-center transition-colors duration-500">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4"
                  style={{ color: featured.color, backgroundColor: `${featured.color}15`, border: `1px solid ${featured.color}30` }}>
                  Featured
                </div>
                <h2 className="text-2xl md:text-3xl font-black dark:text-white text-slate-900 leading-tight mb-4 dark:group-hover:text-indigo-400 group-hover:text-indigo-600 transition-colors duration-500">
                  {featured.title}
                </h2>
                <p className="dark:text-indigo-200/50 text-slate-650 leading-relaxed mb-6 transition-colors duration-500">{featured.excerpt}</p>
                <div className="flex items-center gap-6 text-xs dark:text-indigo-200/30 text-slate-400 mb-6 transition-colors duration-500">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{featured.publishDate}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{featured.readingTime} min read</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-indigo-500 dark:text-indigo-400 group-hover:gap-3 transition-all">
                  Read Article <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>

        {/* Rest of Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-32">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black dark:text-white text-slate-900 transition-colors duration-500">All Articles</h2>
            <span className="text-sm dark:text-indigo-200/30 text-slate-400 transition-colors duration-500">{blogPosts.length} posts</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                <article className="h-full rounded-2xl overflow-hidden border dark:border-white/8 border-slate-200 hover:border-indigo-500/30 transition-all duration-300 dark:bg-white/2 bg-white hover:bg-slate-100/50 flex flex-col shadow-sm">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={assetPath(post.featuredImage)}
                      alt={post.featuredImageAlt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t dark:from-[#030014] from-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                        style={{ color: post.color, backgroundColor: `${post.color}15`, border: `1px solid ${post.color}30` }}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-col flex-1 p-6">
                    <h3 className="text-lg font-bold dark:text-white text-slate-800 leading-tight mb-3 dark:group-hover:text-indigo-400 group-hover:text-indigo-655 transition-colors flex-1 transition-colors duration-500">
                      {post.title}
                    </h3>
                    <p className="dark:text-indigo-200/40 text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2 transition-colors duration-500">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs dark:text-indigo-200/25 text-slate-400 pt-4 border-t dark:border-white/5 border-slate-150 transition-colors duration-500">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.publishDate}</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readingTime} min</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="border-t dark:border-white/5 border-slate-200 py-16 text-center transition-colors duration-500">
          <p className="dark:text-indigo-200/20 text-slate-400 text-xs font-black tracking-[1em] uppercase transition-colors duration-500">
            © 2026 MANTRA DEVS • CRAFTED IN NEPAL
          </p>
        </div>
      </div>
    </>
  );
}
