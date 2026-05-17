import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { assetPath } from '@/lib/assetPath';

export function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Read the initial theme from classList
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    
    return () => window.removeEventListener('scroll', handleScroll);
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-8'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`relative flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
          isScrolled
            ? 'dark:bg-black/60 bg-white/80 dark:border-white/10 border-slate-200/80 backdrop-blur-2xl shadow-2xl'
            : 'bg-transparent border-transparent'
        }`}>
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.href = '/'}>
            <div className="w-10 h-10 dark:bg-[#030014]/60 bg-slate-100 rounded-xl flex items-center justify-center border dark:border-white/10 border-slate-200 overflow-hidden p-1.5 shadow-[0_0_15px_rgba(34,211,238,0.2)] dark:hover:border-cyan-500/40 hover:border-indigo-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300">
              <img 
                src={assetPath('/logo.png')} 
                alt="Mantra Devs Logo" 
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
              />
            </div>
            <span className="text-xl font-black dark:text-white text-slate-900 tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-indigo-500 transition-all duration-300">
              MANTRA DEVS
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Work', 'Blog', 'Contact'].map((item) => (
              <a
                key={item}
                href={item === 'Blog' ? '/blog' : `/#${item.toLowerCase()}`}
                className="text-xs font-bold uppercase tracking-widest dark:text-indigo-100/40 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
            
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

            <button className="px-6 py-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest rounded-full hover:bg-indigo-500 transition-all shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer">
              Launch App
            </button>
          </div>

          {/* Mobile Actions Container */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full dark:bg-white/5 bg-slate-100 dark:text-indigo-200 text-slate-700 transition-all border dark:border-white/10 border-slate-200 shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
            <button
              className="text-slate-800 dark:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`absolute top-full left-0 right-0 mt-2 mx-4 p-8 dark:bg-black/95 bg-white border dark:border-white/10 border-slate-200/80 backdrop-blur-3xl rounded-[32px] transition-all duration-300 shadow-2xl ${
        mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="flex flex-col gap-8">
          {['Services', 'Work', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="text-4xl font-black dark:text-white text-slate-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors tracking-tighter"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="w-full py-5 bg-indigo-600 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg cursor-pointer">
            Launch App
          </button>
        </div>
      </div>
    </nav>
  );
}
