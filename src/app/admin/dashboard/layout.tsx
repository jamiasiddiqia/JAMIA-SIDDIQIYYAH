"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  Shield, 
  LayoutDashboard, 
  DollarSign, 
  Inbox, 
  FileText, 
  FolderClosed, 
  LogOut, 
  Loader2,
  Users,
  ChevronRight,
  BookOpen
} from "lucide-react";

interface AdminProfile {
  full_name: string;
  email: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionLoading, setSessionLoading] = useState(true);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/admin/login");
        return;
      }

      // Load user profile
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email, role")
        .eq("id", session.user.id)
        .single();

      if (error || !data || !["super_admin", "admin", "editor"].includes(data.role)) {
        await supabase.auth.signOut();
        router.push("/admin/login");
        return;
      }

      setProfile(data as AdminProfile);
      setSessionLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-background-warm flex items-center justify-center">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-xs text-on-surface-variant font-semibold uppercase tracking-wider">
            Verifying administrative session...
          </p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
    { id: "donations", label: "Donation Registry", icon: DollarSign, path: "/admin/dashboard/donations" },
    { id: "contacts", label: "Contact Inbox", icon: Inbox, path: "/admin/dashboard/contacts" },
    { id: "cms", label: "Website CMS Blocks", icon: FileText, path: "/admin/dashboard/cms" },
    { id: "academy", label: "Academy & LMS", icon: BookOpen, path: "/admin/dashboard/academy" },
    { id: "media", label: "Media Library", icon: FolderClosed, path: "/admin/dashboard/media" },
  ];

  return (
    <div className="min-h-screen bg-background-warm flex relative">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-primary border-r border-white/5 flex flex-col justify-between text-white p-6 relative">
        <div className="space-y-8">
          {/* Institution Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-secondary-fixed">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base leading-tight italic">
                Jamia Siddiqiyyah
              </h2>
              <span className="block text-[8px] text-white/50 tracking-widest font-extrabold uppercase">
                Enterprise Portal
              </span>
            </div>
          </div>

          <div className="h-px bg-white/5 w-full"></div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    pathname === item.path || (item.id === "overview" && pathname === "/admin/dashboard")
                      ? "bg-secondary-fixed text-primary shadow-md"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                </a>
              );
            })}
          </nav>
        </div>

        {/* Footer User Profiles & Logout */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-xs font-extrabold uppercase text-secondary-fixed">
              {profile?.full_name?.charAt(0)}
            </div>
            <div className="truncate">
              <p className="font-semibold text-xs text-white truncate">
                {profile?.full_name}
              </p>
              <span className="block text-[8px] text-secondary-fixed font-bold tracking-wider uppercase">
                {profile?.role?.replace("_", " ")}
              </span>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full py-3 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin Panel
          </button>
        </div>
      </aside>

      {/* Main Dashboard Space */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header Ribbon */}
        <header className="h-20 border-b border-primary/5 bg-white/50 backdrop-blur-md px-10 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-primary text-lg capitalize italic">
              Welcome Back, {profile?.full_name.split(" ")[0]}
            </h3>
            <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase tracking-wider">
              Portal Overview and System Performance Analytics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3.5 py-1.5 bg-primary/5 border border-primary/10 rounded-lg text-[9px] font-extrabold text-primary uppercase tracking-wider">
              Role: {profile?.role?.replace("_", " ")}
            </div>
          </div>
        </header>

        {/* Dynamic Page Views */}
        <div className="flex-1 p-10 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
