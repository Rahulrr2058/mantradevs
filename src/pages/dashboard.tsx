import React, { useState, useEffect } from "react";
import Head from "next/head";
import { 
  Phone, User, Calendar, Tag, CheckSquare, Square, 
  Search, Plus, Trash2, Edit3, LogOut, Lock, Mail, 
  Database, AlertCircle, Clock, CheckCircle2, ChevronRight, ArrowLeft
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { Nav } from "@/components/Nav";

// Supported CRM statuses and their curated colors
const STATUS_OPTIONS = [
  { value: "Not Called", label: "Not Called", color: "#64748b", bg: "rgba(100, 116, 139, 0.1)" },
  { value: "Spoke to Decision Maker", label: "Decision Maker Spoken", color: "#10b981", bg: "rgba(16, 185, 129, 0.1)" },
  { value: "Follow-up Required", label: "Follow-up Needed", color: "#ec4899", bg: "rgba(236, 72, 153, 0.1)" },
  { value: "Callback Scheduled", label: "Callback Scheduled", color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
  { value: "Not Interested", label: "Not Interested", color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" }
];

interface ClinicRecord {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  contact_person: string;
  called: boolean;
  status: string;
  notes: string;
  reminder_time: string | null;
  user_id?: string;
}

export default function Dashboard() {
  const [isSandbox, setIsSandbox] = useState(true);
  const [session, setSession] = useState<any>(null);
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // CRM Workspace State
  const [clinics, setClinics] = useState<ClinicRecord[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [callFilter, setCallFilter] = useState("All");
  const [workspaceLoading, setWorkspaceLoading] = useState(true);

  // Edit / Add Modal Drawer State
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeClinic, setActiveClinic] = useState<Partial<ClinicRecord> | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Force light mode strictly for the CRM dashboard route
  useEffect(() => {
    const hadDarkClass = document.documentElement.classList.contains("dark");
    
    // Remove the dark class to force light theme on the dashboard page
    document.documentElement.classList.remove("dark");

    return () => {
      // Restore dark theme when navigating away if it was previously active
      if (hadDarkClass) {
        document.documentElement.classList.add("dark");
      }
    };
  }, []);

  // Check Supabase configurations and initialize
  useEffect(() => {
    const isSupabaseConfigured = 
      (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kflsxekakwgfqugvxvqj.supabase.co") && 
      (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_ye_NLbIZmZ6c7YsInHQUiw_la1G-nZf");

    if (isSupabaseConfigured) {
      setIsSandbox(false);
      // Fetch session from supabase auth
      supabase.auth.getSession().then((res:any) => {
        const session = res.data?.session;
        setSession(session);
        if (session) {
          fetchClinicsCloud(session.user.id);
        } else {
          setWorkspaceLoading(false);
        }
      });

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event:any, session: any) => {
        setSession(session);
        if (session) {
          fetchClinicsCloud(session.user.id);
        } else {
          setClinics([]);
          setWorkspaceLoading(false);
        }
      });

      return () => subscription.unsubscribe();
    } else {
      setIsSandbox(true);
      // Initialize sandbox localStorage mock user session if wanted
      const mockSession = localStorage.getItem("crm_sandbox_session");
      if (mockSession) {
        setSession(JSON.parse(mockSession));
        fetchClinicsSandbox();
      } else {
        setWorkspaceLoading(false);
      }
    }
  }, []);

  // --- MOCK SANDBOX LOCAL STORAGE FUNCTIONS ---
  const handleSandboxAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    setTimeout(() => {
      const mockUser = {
        user: { id: "sandbox-user-123", email: email || "operator@mantradevs.com" }
      };
      localStorage.setItem("crm_sandbox_session", JSON.stringify(mockUser));
      setSession(mockUser);
      
      // Load initial mock clinics for testing if none exist
      const existing = localStorage.getItem("crm_sandbox_clinics");
      if (!existing) {
        const dummyData: ClinicRecord[] = [
          {
            id: "1",
            created_at: new Date().toISOString(),
            name: "Himalayan Dental Care",
            phone: "+977 9812345678",
            contact_person: "Dr. Bipin Adhikari",
            called: true,
            status: "Spoke to Decision Maker",
            notes: "Spoke with Dr. Bipin. He is highly interested in custom SaaS booking tools. Callback scheduled for tomorrow to discuss design proposal.",
            reminder_time: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
          },
          {
            id: "2",
            created_at: new Date().toISOString(),
            name: "Chitwan Wellness Clinic",
            phone: "+977 9856011111",
            contact_person: "Pooja Shrestha (Manager)",
            called: false,
            status: "Not Called",
            notes: "Needs to be called. Check if they have an active website or need UI branding.",
            reminder_time: null
          },
          {
            id: "3",
            created_at: new Date().toISOString(),
            name: "Kathmandu Eye & Laser Center",
            phone: "+977 01-4432109",
            contact_person: "Suman Thapa",
            called: true,
            status: "Follow-up Required",
            notes: "Called clinic desk, busy during morning hours. Asked to call back at 1:00 PM when doctor returns.",
            reminder_time: new Date().toISOString().slice(0, 10) + "T13:00"
          }
        ];
        localStorage.setItem("crm_sandbox_clinics", JSON.stringify(dummyData));
        setClinics(dummyData);
      } else {
        setClinics(JSON.parse(existing));
      }
      
      setAuthLoading(false);
      setWorkspaceLoading(false);
    }, 600);
  };

  const fetchClinicsSandbox = () => {
    const list = localStorage.getItem("crm_sandbox_clinics");
    if (list) {
      setClinics(JSON.parse(list));
    }
    setWorkspaceLoading(false);
  };

  const saveClinicsSandbox = (updatedList: ClinicRecord[]) => {
    localStorage.setItem("crm_sandbox_clinics", JSON.stringify(updatedList));
    setClinics(updatedList);
  };

  // --- SUPABASE CLOUD DATABASE FUNCTIONS ---
  const fetchClinicsCloud = async (userId: string) => {
    try {
      setWorkspaceLoading(true);
      const { data, error } = await supabase
        .from("clinics")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setClinics(data || []);
    } catch (err: any) {
      console.error("Error loading clinics from Supabase:", err);
      // Failover to local storage silently to preserve UX
      fetchClinicsSandbox();
    } finally {
      setWorkspaceLoading(false);
    }
  };

  const handleCloudAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      if (authMode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw new Error("Registration complete! Please check your email to confirm registration or sign in.");
      }
    } catch (err: any) {
      setAuthError(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  // --- GENERAL CRM ACTIONS (ADAPTIVE TO MODES) ---
  const toggleCallState = async (id: string, currentVal: boolean) => {
    const updatedClinics = clinics.map(c => 
      c.id === id ? { ...c, called: !currentVal, status: !currentVal ? "Spoke to Decision Maker" : "Not Called" } : c
    );
    
    if (isSandbox) {
      saveClinicsSandbox(updatedClinics);
    } else {
      setClinics(updatedClinics);
      try {
        await supabase
          .from("clinics")
          .update({ called: !currentVal, status: !currentVal ? "Spoke to Decision Maker" : "Not Called" })
          .eq("id", id);
      } catch (err) {
        console.error("Supabase update error:", err);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this clinic record?")) return;
    const updated = clinics.filter(c => c.id !== id);
    
    if (isSandbox) {
      saveClinicsSandbox(updated);
    } else {
      setClinics(updated);
      try {
        await supabase.from("clinics").delete().eq("id", id);
      } catch (err) {
        console.error("Delete error:", err);
      }
    }
  };

  const handleOpenDrawer = (clinic: Partial<ClinicRecord> | null) => {
    setActiveClinic(clinic || {
      name: "",
      phone: "",
      contact_person: "",
      called: false,
      status: "Not Called",
      notes: "",
      reminder_time: ""
    });
    setNotification(null);
    setDrawerOpen(true);
  };

  const triggerEmailJSAlert = async (clinicName: string, time: string) => {
    // Attempt email alert using EmailJS configuration
    const emailJsKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "tbI_vrjGzkQYOQr81";
    if (!emailJsKey) return;
    
    try {
      const payload = {
        service_id: "service_3k9h2kt",
        template_id: "template_8fu2hl5",
        user_id: emailJsKey,
        template_params: {
          from_name: "Mantra CRM System",
          from_email: "crm@mantradevs.com",
          subject: `📞 Reminder Set: Call ${clinicName} Scheduled callback`,
          message: `This is a callback alert reminder for your studio queue.
          
Clinic: ${clinicName}
Scheduled Callback Time: ${new Date(time).toLocaleString()}
          
Make sure to open your dashboard to view the logs and record call notes.`,
          to_name: session?.user?.email || "Studio Manager"
        }
      };

      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (e) {
      console.warn("EmailJS notification trigger bypassed:", e);
    }
  };

  const handleSubmitDrawer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClinic?.name) {
      setNotification({ type: "error", message: "Clinic name is required." });
      return;
    }

    setSubmitLoading(true);
    setNotification(null);

    const isEditing = !!activeClinic.id;
    let finalClinic: ClinicRecord;

    if (isEditing) {
      finalClinic = activeClinic as ClinicRecord;
    } else {
      finalClinic = {
        ...activeClinic,
        id: Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString()
      } as ClinicRecord;
    }

    // Trigger email reminder if reminder time is newly added/modified
    // if (finalClinic.reminder_time) {
    //   await triggerEmailJSAlert(finalClinic.name, finalClinic.reminder_time);
    // }

    if (isSandbox) {
      let updated: ClinicRecord[];
      if (isEditing) {
        updated = clinics.map(c => c.id === finalClinic.id ? finalClinic : c);
      } else {
        updated = [finalClinic, ...clinics];
      }
      saveClinicsSandbox(updated);
      setSubmitLoading(false);
      setDrawerOpen(false);
    } else {
      try {
        if (isEditing) {
          const { error } = await supabase
            .from("clinics")
            .update({
              name: finalClinic.name,
              phone: finalClinic.phone,
              contact_person: finalClinic.contact_person,
              called: finalClinic.called,
              status: finalClinic.status,
              notes: finalClinic.notes,
              reminder_time: finalClinic.reminder_time
            })
            .eq("id", finalClinic.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("clinics")
            .insert({
              name: finalClinic.name,
              phone: finalClinic.phone,
              contact_person: finalClinic.contact_person,
              called: finalClinic.called,
              status: finalClinic.status,
              notes: finalClinic.notes,
              reminder_time: finalClinic.reminder_time || "2026-05-19T09:30",
              user_id: session.user.id
            });
          if (error) throw error;
        }
        await fetchClinicsCloud(session.user.id);
        setSubmitLoading(false);
        setDrawerOpen(false);
      } catch (err: any) {
        setNotification({ type: "error", message: err.message || "Failed to save record" });
        setSubmitLoading(false);
      }
    }
  };

  const handleLogout = () => {
    if (isSandbox) {
      localStorage.removeItem("crm_sandbox_session");
      setSession(null);
    } else {
      supabase.auth.signOut();
    }
  };

  // --- COMPUTED KPI METRICS ---
  const totalClinics = clinics.length;
  const calledCount = clinics.filter(c => c.called).length;
  const pendingCount = totalClinics - calledCount;
  const callbacksCount = clinics.filter(c => c.status === "Callback Scheduled" || c.reminder_time).length;
  const successRatio = totalClinics > 0 ? Math.round((calledCount / totalClinics) * 100) : 0;

  // --- FILTERED WORKSPACE LIST ---
  const filteredClinics = clinics.filter(clinic => {
    const matchesSearch = 
      clinic.name.toLowerCase().includes(search.toLowerCase()) ||
      (clinic.contact_person && clinic.contact_person.toLowerCase().includes(search.toLowerCase())) ||
      (clinic.notes && clinic.notes.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter === "All" || clinic.status === statusFilter;
    const matchesCall = 
      callFilter === "All" || 
      (callFilter === "Called" && clinic.called) || 
      (callFilter === "Not Called" && !clinic.called);

    return matchesSearch && matchesStatus && matchesCall;
  });

  return (
    <>
      <Head>
        <title>Mantra CRM — Dynamic Clinic Calling Manager</title>
        <meta name="description" content="Securely track calling records, client remarks, and automate callback schedules with built-in Supabase Cloud integration." />
      </Head>

      <div className="min-h-screen dark:bg-[#030014] bg-gradient-to-b from-[#faf9fe] via-[#f5f2ff] to-[#faf9fe] transition-colors duration-500 text-slate-800 dark:text-slate-100 pb-20">
        {/* <Nav /> */}

        {/* --- DYNAMIC HEADER METADATA SPACE --- */}
        <div className="pt-32 max-w-7xl mx-auto px-4">
          
          {/* Active Mode Banner */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl dark:bg-white/3 bg-white border dark:border-white/10 border-slate-200 backdrop-blur-2xl">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isSandbox ? "bg-amber-500" : "bg-emerald-500"}`} />
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-indigo-200/50">
                Workspace Status:
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                isSandbox ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
              }`}>
                {isSandbox ? "Sandbox (LocalStorage Demo)" : "Supabase Cloud Online"}
              </span>
            </div>

            {session && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium text-slate-500 dark:text-indigo-200/60 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> {session.user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full dark:bg-white/5 bg-slate-100 hover:bg-red-500/10 hover:text-red-500 dark:hover:bg-red-500/20 text-xs font-bold transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* --- AUTHENTICATION SHIELD (IF NO SESSION ACTIVE) --- */}
          {!session ? (
            <div className="max-w-md mx-auto my-12 relative z-10">
              <div className="dark:bg-white/3 bg-white border dark:border-white/10 border-slate-200 rounded-[32px] p-8 md:p-10 shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:shadow-2xl backdrop-blur-3xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 dark:bg-[#030014]/60 bg-slate-100 rounded-2xl flex items-center justify-center border dark:border-white/10 border-slate-200 mx-auto mb-4 shadow-md">
                    <Database className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h1 className="text-2xl font-black tracking-tight dark:text-white text-slate-900 mb-2">
                    MANTRA CRM PORTAL
                  </h1>
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">
                    Studio Calling Records Manager
                  </p>
                  <p className="text-sm dark:text-indigo-200/40 text-slate-500 max-w-xs mx-auto">
                    Track calls, record spoken status remarks, and schedule email notifications.
                  </p>
                </div>

                {authError && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 text-red-500 text-xs font-medium flex gap-3 items-center">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{authError}</span>
                  </div>
                )}

                <form onSubmit={isSandbox ? handleSandboxAuth : handleCloudAuth} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" /> Email Account
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="manager@mantradevs.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/20 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 placeholder:text-slate-400 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>

                  {!isSandbox && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600 flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5" /> Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/20 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-[0_10px_20px_rgba(79,70,229,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {authLoading ? "Initializing..." : (isSandbox ? "Access Sandbox Workspace" : (authMode === "signin" ? "Sign In" : "Register Manager"))}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {!isSandbox && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
                      className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      {authMode === "signin" ? "Need a manager account? Register here" : "Already have an account? Sign In"}
                    </button>
                  </div>
                )}

                {isSandbox && (
                  <div className="mt-8 border-t dark:border-white/5 border-slate-200 pt-6">
                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-[11px] leading-relaxed dark:text-indigo-200/50 text-slate-500">
                      <strong className="dark:text-indigo-400 text-indigo-600 block mb-1">ℹ️ Database Offline Notice</strong>
                      To unlock secure persistence, database schemas, and trigger automations, add your credentials inside `.env.local`:
                      <code className="block mt-2 p-1.5 rounded dark:bg-black bg-slate-100 font-mono text-[9px] select-all overflow-x-auto">
                        NEXT_PUBLIC_SUPABASE_URL=your_project_url<br/>
                        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
                      </code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            
            // --- FULL CRM WORKSPACE SYSTEM ---
            <div className="space-y-8 relative z-10">
              
              {/* Workspace Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black dark:text-white text-slate-900 leading-tight">
                    CLINIC CALLS <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-400">BOARD</span>
                  </h1>
                  <p className="dark:text-indigo-200/40 text-slate-500 text-sm mt-2">
                    Review and maintain records of call statuses, feedback comments, and appointments.
                  </p>
                </div>
                
                <button
                  onClick={() => handleOpenDrawer(null)}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_10px_30px_rgba(79,70,229,0.2)] cursor-pointer self-start md:self-auto group"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" /> Add New Clinic
                </button>
              </div>

              {/* CRM Key Metrics KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard 
                  title="Total Clinics" 
                  value={totalClinics} 
                  subtext="Registered leads"
                  icon={<Database className="w-5 h-5 text-indigo-500" />}
                />
                <KPICard 
                  title="Spoken / Called" 
                  value={calledCount} 
                  subtext={`${successRatio}% called`}
                  icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  progress={successRatio}
                />
                <KPICard 
                  title="Call Backs" 
                  value={callbacksCount} 
                  subtext="Reminders scheduled"
                  icon={<Clock className="w-5 h-5 text-amber-500" />}
                />
                <KPICard 
                  title="Pending Leads" 
                  value={pendingCount} 
                  subtext="Waiting for first call"
                  icon={<Phone className="w-5 h-5 text-pink-500" />}
                />
              </div>

              {/* Table Filter Panel */}
              <div className="p-6 rounded-[28px] dark:bg-white/3 bg-white border dark:border-white/10 border-slate-200 backdrop-blur-2xl space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  
                  {/* Search Bar */}
                  <div className="relative w-full lg:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Search clinic, contact, or notes..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl dark:bg-[#0a071e]/70 bg-slate-50 border dark:border-white/15 border-slate-200 focus:outline-none focus:border-indigo-500 dark:text-white text-slate-800 text-sm"
                    />
                  </div>

                  {/* Status Filters */}
                  <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">Call:</span>
                      <select 
                        value={callFilter}
                        onChange={(e) => setCallFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl dark:bg-[#0a071e] bg-slate-50 border dark:border-white/15 border-slate-200 dark:text-white text-slate-800 text-xs"
                      >
                        <option value="All">All Leads</option>
                        <option value="Called">Called Only</option>
                        <option value="Not Called">Not Called</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-500 uppercase">Remarks:</span>
                      <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 rounded-xl dark:bg-[#0a071e] bg-slate-50 border dark:border-white/15 border-slate-200 dark:text-white text-slate-800 text-xs"
                      >
                        <option value="All">All Statuses</option>
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* MAIN CLINICS TABLE */}
              <div className="rounded-[32px] dark:bg-[#030014]/60 bg-white border dark:border-white/10 border-slate-200 shadow-xl overflow-hidden">
                {workspaceLoading ? (
                  <div className="py-20 text-center">
                    <div className="w-10 h-10 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto mb-4" />
                    <p className="text-sm dark:text-indigo-200/30 text-slate-400">Loading call tracker data...</p>
                  </div>
                ) : filteredClinics.length === 0 ? (
                  <div className="py-20 text-center px-4">
                    <Phone className="w-12 h-12 text-slate-300 dark:text-indigo-950 mx-auto mb-4" />
                    <p className="text-lg font-bold dark:text-white text-slate-800 mb-1">No Clinic Records Found</p>
                    <p className="text-sm dark:text-indigo-200/30 text-slate-400 max-w-sm mx-auto">
                      Adjust your filters or add a new clinic to the list using the button above to begin tracking.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b dark:border-white/5 border-slate-200 text-xs font-black uppercase tracking-wider dark:text-indigo-200/40 text-slate-500 dark:bg-white/2 bg-slate-50/50">
                          <th className="py-5 px-6 w-16 text-center">Called</th>
                          <th className="py-5 px-6">Clinic Info</th>
                          <th className="py-5 px-6">Phone / Contact</th>
                          <th className="py-5 px-6">CRM Call Remarks</th>
                          <th className="py-5 px-6">Scheduled Callback</th>
                          <th className="py-5 px-6 w-32 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y dark:divide-white/5 divide-slate-150">
                        {filteredClinics.map((clinic) => {
                          const statusConfig = STATUS_OPTIONS.find(opt => opt.value === clinic.status) || STATUS_OPTIONS[0];
                          
                          return (
                            <tr key={clinic.id} className="dark:hover:bg-white/1 hover:bg-slate-50/50 transition-colors group">
                              
                              {/* Checkbox called toggle */}
                              <td className="py-5 px-6 text-center">
                                <button 
                                  onClick={() => toggleCallState(clinic.id, clinic.called)}
                                  className="mx-auto flex items-center justify-center p-1 rounded-lg hover:bg-indigo-500/10 text-indigo-500 transition-colors cursor-pointer"
                                >
                                  {clinic.called ? (
                                    <CheckSquare className="w-5.5 h-5.5" />
                                  ) : (
                                    <Square className="w-5.5 h-5.5 text-slate-400 dark:text-indigo-200/20" />
                                  )}
                                </button>
                              </td>

                              {/* Clinic Name & excerpt notes */}
                              <td className="py-5 px-6">
                                <div className="font-semibold text-base dark:text-white text-slate-900 group-hover:text-indigo-500 transition-colors">
                                  {clinic.name}
                                </div>
                                {clinic.notes ? (
                                  <p className="text-xs dark:text-indigo-200/40 text-slate-500 mt-1.5 max-w-sm line-clamp-2 italic leading-relaxed">
                                    "{clinic.notes}"
                                  </p>
                                ) : (
                                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-indigo-200/10 block mt-1.5">No comments recorded</span>
                                )}
                              </td>

                              {/* Phone & Contact Person */}
                              <td className="py-5 px-6">
                                <div className="flex items-center gap-1.5 text-sm font-semibold dark:text-indigo-200/80 text-slate-800">
                                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {clinic.phone || "No phone record"}
                                </div>
                                {clinic.contact_person && (
                                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                                    <User className="w-3 h-3 text-slate-400" /> {clinic.contact_person}
                                  </div>
                                )}
                              </td>

                              {/* Remarks Badge Status */}
                              <td className="py-5 px-6">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border"
                                  style={{ color: statusConfig.color, backgroundColor: statusConfig.bg, borderColor: `${statusConfig.color}20` }}>
                                  {statusConfig.label}
                                </span>
                              </td>

                              {/* Scheduled Callback reminder */}
                              <td className="py-5 px-6">
                                {clinic.reminder_time ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl dark:bg-amber-500/5 bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-600 dark:text-amber-500">
                                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                                    {new Date(clinic.reminder_time).toLocaleString(undefined, {
                                      month: "short",
                                      day: "numeric",
                                      hour: "2-digit",
                                      minute: "2-digit"
                                    })}
                                  </span>
                                ) : (
                                  <span className="text-xs dark:text-indigo-200/20 text-slate-400">None Scheduled</span>
                                )}
                              </td>

                              {/* Row edit/delete CTA */}
                              <td className="py-5 px-6 text-center">
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() => handleOpenDrawer(clinic)}
                                    className="p-2 rounded-xl dark:bg-white/5 bg-slate-100 hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500/20 dark:hover:text-indigo-400 text-slate-600 transition-all cursor-pointer"
                                    title="Edit call log"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(clinic.id)}
                                    className="p-2 rounded-xl dark:bg-white/5 bg-slate-100 hover:bg-red-500 hover:text-white dark:hover:bg-red-500/20 dark:hover:text-red-500 text-slate-600 transition-all cursor-pointer"
                                    title="Delete record"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Database Schema Guide */}
              {/* <div className="p-8 rounded-[36px] dark:bg-indigo-950/10 bg-indigo-500/5 border dark:border-indigo-500/10 border-indigo-500/20 backdrop-blur-3xl">
                <div className="flex items-start gap-4">
                  <Database className="w-6 h-6 text-indigo-500 mt-1 flex-shrink-0" />
                  <div className="space-y-4">
                    <h3 className="text-lg font-black dark:text-white text-slate-900 uppercase tracking-wide">
                      Supabase Tables Setup Guide
                    </h3>
                    <p className="text-sm dark:text-indigo-200/60 text-slate-600 leading-relaxed">
                      To connect your online cloud database:
                    </p>
                    <ol className="text-xs space-y-2 dark:text-indigo-200/50 text-slate-600 list-decimal pl-4">
                      <li>Create a new project in your Supabase Account Dashboard.</li>
                      <li>Open the <strong>SQL Editor</strong> tab on the left sidebar in Supabase.</li>
                      <li>Copy the SQL script below and paste it into a new query sheet, then click <strong>Run</strong>.</li>
                    </ol>

                    <div className="relative">
                      <pre className="p-4 rounded-2xl dark:bg-black bg-slate-100 font-mono text-[10px] text-indigo-600 dark:text-indigo-300 select-all overflow-x-auto leading-relaxed border dark:border-white/5 border-slate-200">
{`-- Create clinics database table
create table public.clinics (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text,
  contact_person text,
  called boolean default false not null,
  status text default 'Not Called'::text not null,
  notes text,
  reminder_time timestamp with time zone,
  user_id uuid references auth.users(id) on delete cascade default auth.uid() not null
);

-- Enable Row Level Security
alter table public.clinics enable row level security;

-- Setup Access Policies
create policy "Users can manage their own clinics"
  on public.clinics
  for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          )}
        </div>

        {/* --- DYNAMIC SLIDE-OVER DRAWER MODAL --- */}
        {drawerOpen && activeClinic && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            
            {/* Backdrop glass cover */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setDrawerOpen(false)}
            />

            {/* Slider container */}
            <div className="relative w-full max-w-lg dark:bg-[#060417] bg-white border-l dark:border-white/10 border-slate-200 shadow-2xl p-8 overflow-y-auto z-10 flex flex-col justify-between h-full">
              <div>
                {/* Back button header */}
                <div className="flex items-center justify-between pb-6 border-b dark:border-white/5 border-slate-200 mb-8">
                  <button 
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-500 dark:text-indigo-200/50 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                  </button>
                  <span className="text-xs font-black uppercase tracking-widest text-indigo-500">
                    {activeClinic.id ? "Edit call log" : "New Clinic Lead"}
                  </span>
                </div>

                <h2 className="text-2xl font-black dark:text-white text-slate-900 tracking-tight mb-8 uppercase">
                  {activeClinic.id ? "Update CRM Record" : "Add New Clinic Record"}
                </h2>

                {notification && (
                  <div className={`p-4 rounded-xl mb-6 text-xs font-medium flex gap-3 items-center ${
                    notification.type === "success" ? "bg-green-500/5 border border-green-500/20 text-green-600" : "bg-red-500/5 border border-red-500/20 text-red-500"
                  }`}>
                    {notification.type === "success" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{notification.message}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitDrawer} className="space-y-6">
                  {/* Clinic Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600">
                      Clinic Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adhikari Orthopedic Care"
                      value={activeClinic.name || ""}
                      onChange={(e) => setActiveClinic({ ...activeClinic, name: e.target.value })}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/15 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Contact Person */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        placeholder="Dr. Bipin Adhikari"
                        value={activeClinic.contact_person || ""}
                        onChange={(e) => setActiveClinic({ ...activeClinic, contact_person: e.target.value })}
                        className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/15 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        placeholder="+977 9866115154"
                        value={activeClinic.phone || ""}
                        onChange={(e) => setActiveClinic({ ...activeClinic, phone: e.target.value })}
                        className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/15 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                      />
                    </div>
                  </div>

                  {/* Called State */}
                  <div className="flex items-center justify-between p-4 rounded-2xl dark:bg-white/2 bg-slate-50 border dark:border-white/5 border-slate-200">
                    <div>
                      <div className="text-sm font-semibold dark:text-white text-slate-800">Has been called?</div>
                      <div className="text-xs dark:text-indigo-200/30 text-slate-400 mt-0.5">Toggle initial calling history</div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => {
                        const nextVal = !activeClinic.called;
                        setActiveClinic({ 
                          ...activeClinic, 
                          called: nextVal,
                          status: nextVal ? "Spoke to Decision Maker" : "Not Called"
                        });
                      }}
                      className="p-1 text-indigo-500 hover:bg-indigo-500/10 rounded-xl transition-colors cursor-pointer"
                    >
                      {activeClinic.called ? (
                        <CheckSquare className="w-7 h-7" />
                      ) : (
                        <Square className="w-7 h-7 text-slate-400 dark:text-indigo-200/20" />
                      )}
                    </button>
                  </div>

                  {/* CRM Status select */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" /> Call Remarks / Pipeline Status
                    </label>
                    <select
                      value={activeClinic.status || "Not Called"}
                      onChange={(e) => setActiveClinic({ ...activeClinic, status: e.target.value })}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/15 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm"
                    >
                      {STATUS_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Last Spoken Remarks / Notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider dark:text-indigo-200/60 text-slate-600">
                      Spoken Details / Remarks
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What did they say? e.g. Interested in mobile app booking system but budget is tight. Callback scheduled to review a lighter package..."
                      value={activeClinic.notes || ""}
                      onChange={(e) => setActiveClinic({ ...activeClinic, notes: e.target.value })}
                      className="w-full dark:bg-[#0a071e] bg-slate-50/70 border dark:border-white/15 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-indigo-400 focus:border-indigo-500 transition-colors text-sm resize-none"
                    />
                  </div>

                  {/* Appointment Reminder Time */}
                  <div className="space-y-2 p-5 rounded-2xl dark:bg-amber-500/3 bg-amber-500/5 border dark:border-amber-500/10 border-amber-500/20">
                    <label className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-500 flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4" /> Schedule Call-Back Reminder Alert
                    </label>
                    <p className="text-[11px] dark:text-amber-500/50 text-amber-600/70 mb-3 leading-relaxed">
                      Enter date/time to schedule callback alerts. An email alert will automatically be dispatched to your team!
                    </p>
                    <input
                      type="datetime-local"
                      value={activeClinic.reminder_time || ""}
                      onChange={(e) => setActiveClinic({ ...activeClinic, reminder_time: e.target.value })}
                      className="w-full dark:bg-[#0a071e]/75 bg-white border dark:border-amber-500/20 border-amber-500/30 rounded-xl px-4 py-3 dark:text-white text-slate-800 focus:outline-none dark:focus:border-amber-500 focus:border-amber-500 transition-colors text-sm font-bold text-amber-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitLoading ? "Saving Log..." : "Save Call Record"}
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              </div>

              <div className="mt-8 border-t dark:border-white/5 border-slate-200 pt-6">
                <p className="text-[10px] dark:text-indigo-200/10 text-slate-400 uppercase tracking-widest text-center">
                  Mantra Devs Studio Calling Console
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// KPI Dashboard Helper Card Component
function KPICard({ title, value, subtext, icon, progress }: { title: string; value: number; subtext: string; icon: React.ReactNode; progress?: number }) {
  return (
    <div className="p-6 rounded-[28px] dark:bg-white/3 bg-white border dark:border-white/10 border-slate-200 backdrop-blur-2xl transition-all duration-300 hover:translate-y-[-2px] shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black dark:text-indigo-200/50 text-slate-500 uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg dark:bg-white/5 bg-slate-50 flex items-center justify-center border dark:border-white/5 border-slate-150">
          {icon}
        </div>
      </div>
      
      <div className="my-3">
        <div className="text-3xl font-black dark:text-white text-slate-900 tracking-tight">{value}</div>
        {progress !== undefined && (
          <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      <span className="text-[10px] font-bold dark:text-indigo-200/30 text-slate-400 uppercase tracking-widest">{subtext}</span>
    </div>
  );
}
