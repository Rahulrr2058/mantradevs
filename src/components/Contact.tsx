import React, { useState } from 'react';
import { 
  Mail, MessageSquare, MapPin, Send, 
  User, Tag, CheckCircle2, AlertCircle 
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setStatusMessage('Please fill in all the required form fields.');
      return;
    }

    setStatus('sending');

    try {
      const payload = {
        service_id: 'service_3k9h2kt',
        template_id: 'template_8fu2hl5',
        user_id: 'tbI_vrjGzkQYOQr81',
        template_params: {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Mantra Devs Team'
        }
      };

      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Your message has been delivered to Mantra Devs securely! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorText = await response.text();
        if (response.status === 400 && errorText.includes('public key')) {
          setStatus('success');
          setStatusMessage('EmailJS is almost ready! Please set your Public Key inside the `.env.local` file or directly in the code.');
        } else {
          setStatusMessage(`Failed to send email: ${errorText || response.statusText}`);
        }
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(`Network error occurred: ${err.message || err}`);
    }
  };

  return (
    <section id="contact" className="py-32 dark:bg-[#030014] bg-[#fafafc] transition-colors duration-500 relative overflow-hidden">
      {/* Dynamic Grid Pattern Overlay */}
      <div className="absolute inset-0 dark:opacity-[0.05] opacity-[0.2] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[radial-gradient(#4f46e5_0.8px,transparent_0.8px)] [background-size:24px_24px] pointer-events-none transition-all duration-500" />
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto dark:bg-white/3 bg-white/80 backdrop-blur-2xl rounded-[48px] p-8 md:p-20 border dark:border-white/10 border-slate-200 shadow-[0_30px_70px_rgba(99,102,241,0.04)] overflow-hidden transition-all duration-500">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] -mr-64 -mt-64 rounded-full" />
          
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.4em] text-indigo-500 mb-4 font-bold">Get in touch</p>
                <h2 className="text-5xl md:text-7xl font-black dark:text-white text-slate-900 leading-tight tracking-tight transition-colors duration-500">
                  LET'S <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-indigo-400 dark:to-purple-500 animate-pulse">TALK.</span>
                </h2>
                <p className="dark:text-indigo-100/90 text-slate-600 text-base md:text-lg leading-relaxed max-w-md font-medium transition-colors duration-500">
                  Have a vision? Let's bring it into the Verse. We're ready to engineer your next big idea.
                </p>
              </div>

              <div className="space-y-8">
                <ContactInfo 
                  icon={<Mail className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />} 
                  label="Email Us" 
                  value="mantravdevs@gmail.com"
                  color="indigo"
                />
                <ContactInfo 
                  icon={<MessageSquare className="w-6 h-6 text-purple-500 dark:text-purple-400" />} 
                  label="WhatsApp" 
                  value="+977 986-6115154"
                  color="purple"
                />
                <ContactInfo 
                  icon={<MapPin className="w-6 h-6 text-pink-500 dark:text-pink-400" />} 
                  label="Studio" 
                  value="Chitwan, Nepal"
                  color="pink"
                />
              </div>
            </div>

            <div className="relative">
              <form className="space-y-6 dark:bg-black/50 bg-white border dark:border-white/15 border-slate-200 p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:shadow-2xl backdrop-blur-3xl transition-colors duration-500" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold tracking-wide dark:text-white/95 text-slate-700 transition-colors duration-500">
                      <User className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 hover:bg-white focus:bg-white border dark:border-white/20 border-slate-200 dark:hover:border-indigo-400/50 hover:border-indigo-500/30 rounded-2xl px-6 py-4 dark:text-white text-slate-800 placeholder:text-slate-400 dark:placeholder:text-white/50 focus:outline-none dark:focus:border-cyan-400 focus:border-indigo-500 dark:focus:bg-[#030014] focus:ring-4 dark:focus:ring-cyan-400/20 focus:ring-indigo-500/10 transition-all text-base font-normal tracking-wide shadow-inner duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold tracking-wide dark:text-white/95 text-slate-700 transition-colors duration-500">
                      <Mail className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 hover:bg-white focus:bg-white border dark:border-white/20 border-slate-200 dark:hover:border-indigo-400/50 hover:border-indigo-500/30 rounded-2xl px-6 py-4 dark:text-white text-slate-800 placeholder:text-slate-400 dark:placeholder:text-white/50 focus:outline-none dark:focus:border-cyan-400 focus:border-indigo-500 dark:focus:bg-[#030014] focus:ring-4 dark:focus:ring-cyan-400/20 focus:ring-indigo-500/10 transition-all text-base font-normal tracking-wide shadow-inner duration-200"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wide dark:text-white/95 text-slate-700 transition-colors duration-500">
                    <Tag className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    Subject
                  </label>
                  <input 
                    type="text" 
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full dark:bg-[#0a071e] bg-slate-50/70 hover:bg-white focus:bg-white border dark:border-white/20 border-slate-200 dark:hover:border-indigo-400/50 hover:border-indigo-500/30 rounded-2xl px-6 py-4 dark:text-white text-slate-800 placeholder:text-slate-400 dark:placeholder:text-white/50 focus:outline-none dark:focus:border-cyan-400 focus:border-indigo-500 dark:focus:bg-[#030014] focus:ring-4 dark:focus:ring-cyan-400/20 focus:ring-indigo-500/10 transition-all text-base font-normal tracking-wide shadow-inner duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold tracking-wide dark:text-white/95 text-slate-700 transition-colors duration-500">
                    <MessageSquare className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your project or training goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full dark:bg-[#0a071e] bg-slate-50/70 hover:bg-white focus:bg-white border dark:border-white/20 border-slate-200 dark:hover:border-indigo-400/50 hover:border-indigo-500/30 rounded-2xl px-6 py-4 dark:text-white text-slate-800 placeholder:text-slate-400 dark:placeholder:text-white/50 focus:outline-none dark:focus:border-cyan-400 focus:border-indigo-500 dark:focus:bg-[#030014] focus:ring-4 dark:focus:ring-cyan-400/20 focus:ring-indigo-500/10 transition-all resize-none text-base font-normal tracking-wide shadow-inner duration-200"
                  />
                </div>

                {status !== 'idle' && (
                  <div className={`p-5 rounded-2xl border backdrop-blur-md transition-all flex items-start gap-4 ${
                    status === 'sending' ? 'bg-indigo-500/5 border-indigo-500/20 text-indigo-650' :
                    status === 'success' ? 'bg-green-500/5 border-green-500/20 text-green-600' :
                    'bg-red-500/5 border-red-500/20 text-red-600'
                  }`}>
                    {status === 'sending' && (
                      <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mt-0.5" />
                    )}
                    {status === 'success' && (
                      <CheckCircle2 className="w-5 h-5 text-green-550 mt-0.5 flex-shrink-0" />
                    )}
                    {status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-555 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="text-sm font-medium leading-relaxed">
                      {status === 'sending' ? 'Sending your  message securely to Mantra Devs!' : statusMessage}
                    </div>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-400 hover:via-purple-400 hover:to-cyan-400 text-white font-extrabold uppercase tracking-widest rounded-2xl transition-all dark:shadow-[0_10px_40px_rgba(6,182,212,0.3)] shadow-[0_10px_30px_rgba(79,70,229,0.2)] flex items-center justify-center gap-3 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                  <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-32 text-center">
        <div className="flex justify-center gap-8 mb-8 opacity-20 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Add logos here if needed */}
        </div>
        <p className="text-indigo-200/25 dark:text-indigo-200/20 text-[10px] font-black tracking-[1em] uppercase">
          © 2026 MANTRA DEVS • CRAFTED IN NEPAL
        </p>
      </div>
    </section>
  );
}

function ContactInfo({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) {
  return (
    <div className="flex items-center gap-6 text-indigo-200/70 group cursor-pointer">
      <div className="w-16 h-16 rounded-3xl dark:bg-white/5 bg-white flex items-center justify-center border dark:border-white/10 border-slate-200 group-hover:border-indigo-500/30 transition-all shadow-[0_8px_30px_rgba(99,102,241,0.03)] dark:shadow-none backdrop-blur-xl duration-300">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] dark:text-indigo-500/50 text-indigo-600/70 mb-1 transition-colors duration-500">{label}</p>
        <p className="text-lg md:text-xl font-semibold tracking-wide dark:text-white text-slate-800 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors duration-500">{value}</p>
      </div>
    </div>
  );
}
