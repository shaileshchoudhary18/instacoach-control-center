"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageSquare, LayoutDashboard, Users, Video, Settings, 
  ChevronRight, DollarSign, Activity, TrendingUp, Award 
} from "lucide-react";

const sections = [
  { name: "Programs", href: "/programs", icon: Activity },
  { name: "Video Repo", href: "/video-repo", icon: Video },
  { name: "Client Dashboard", href: "/clients", icon: Users },
  { name: "Onboarding", href: "/onboarding", icon: Users },
  { name: "Paywall", href: "/paywall", icon: DollarSign },
  { name: "Promotions Control", href: "/promotions-control", icon: Award, active: true },
  { name: "Progress Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Kai Chats", href: "/kai-chats", icon: MessageSquare },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

export default function Home() {
  return (
    <div className="min-h-full bg-[#050505] relative selection:bg-indigo-500/30 text-slate-200">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-16"
        >
          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.15)] inline-block mb-6">
            Instacoach Control Center
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Control the platform. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient">
              Dominate the metrics.
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-medium">
            Navigate through your workspace efficiently. Access programs, manage clients, and track analytics from your intelligent dashboard.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div key={section.name} variants={itemVariants}>
                <Link href={section.href} className="block h-full group focus:outline-none">
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`h-full relative overflow-hidden rounded-2xl p-6 transition-all duration-300
                      ${section.active 
                        ? 'bg-[#0a0a0c] border border-indigo-500/30 shadow-[0_8px_30px_rgb(99,102,241,0.15)]' 
                        : 'bg-[#0a0a0c] border border-white/5 shadow-xl hover:border-white/10 hover:bg-[#0f0f12]'
                      }
                    `}
                  >
                    {/* Glass sheen effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex items-start justify-between mb-8">
                        <div className={`p-3.5 rounded-xl ${
                          section.active 
                            ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                            : 'bg-white/5 text-slate-400 group-hover:text-white group-hover:scale-110 transition-all duration-300 group-hover:bg-white/10'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className={`p-2 rounded-full ${
                          section.active 
                            ? 'bg-indigo-500/20 text-indigo-400' 
                            : 'bg-transparent text-slate-600 group-hover:bg-white/5 group-hover:text-slate-300 transition-colors'
                        }`}>
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className={`text-xl font-bold mb-1.5 ${
                          section.active ? 'text-indigo-50' : 'text-slate-200 group-hover:text-white transition-colors'
                        }`}>
                          {section.name}
                        </h3>
                        <p className={`text-sm font-medium ${
                          section.active ? 'text-indigo-200/60' : 'text-slate-500'
                        }`}>
                          {section.active ? 'New feature available' : 'Access module'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
