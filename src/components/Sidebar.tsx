"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Video, 
  Settings, 
  MessageSquare, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Award,
  Zap
} from "lucide-react";

const navigation = [
  { name: "Home page", href: "/", icon: LayoutDashboard },
  { name: "Programs", href: "/programs", icon: Activity },
  { name: "Video Repo", href: "/video-repo", icon: Video },
  { name: "Client Dashboard", href: "/clients", icon: Users },
  { name: "Onboarding", href: "/onboarding", icon: Users },
  { name: "Blake", href: "/blake", icon: Users },
  { name: "Promotions control", href: "/promotions-control", icon: Award },
  { name: "Progress Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Workout", href: "/workout", icon: Activity },
  { name: "Kai Chats", href: "/kai-chats", icon: MessageSquare },
  { name: "Configuration", href: "/config", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 border-r border-slate-800 bg-[#0A0A0A] text-slate-300 h-full relative z-20">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
        <Zap className="h-6 w-6 text-indigo-500 mr-3" />
        <span className="font-bold text-[15px] tracking-wide text-slate-100">Instacoach <span className="text-indigo-500">Control Center</span></span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative ${
                  isActive 
                    ? "text-white" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon
                  className={`flex-shrink-0 h-5 w-5 mr-3 transition-colors ${
                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
                  }`}
                  aria-hidden="true"
                />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-4 border-t border-slate-800/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-900/50 cursor-pointer transition-colors">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-200">Admin User</span>
            <span className="text-xs text-slate-500">admin@instacoach.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
