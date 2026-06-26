"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageSquare, Users, Video, 
  ChevronRight, Activity, TrendingUp, Award 
} from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";

const sections = [
  { name: "Progress Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Content & Programs", href: "/content", icon: Video },
  { name: "Operations", href: "/operations", icon: Users },
  { name: "AI Hub", href: "/ai", icon: MessageSquare, active: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// Mock data for Dashboard
const activityData = [
  { name: 'Mon', active: 120, new: 12 },
  { name: 'Tue', active: 132, new: 18 },
  { name: 'Wed', active: 101, new: 24 },
  { name: 'Thu', active: 143, new: 10 },
  { name: 'Fri', active: 190, new: 30 },
  { name: 'Sat', active: 205, new: 45 },
  { name: 'Sun', active: 180, new: 22 },
];

const topContent = [
  { title: "Hitting Mechanics 101", views: 1240 },
  { title: "Game Day Routine", views: 980 },
  { title: "Pitching Grip Basics", views: 850 },
  { title: "Mental Prep", views: 620 },
];

const recentActivity = [
  { action: "Ezra uploaded a new video", time: "2 mins ago", type: "content" },
  { action: "Guest User logged 95 mph", time: "15 mins ago", type: "user" },
  { action: "Blake Assistant answered 5 queries", time: "1 hour ago", type: "ai" },
  { action: "Brandon updated Game Day Routine", time: "3 hours ago", type: "content" },
];

export default function Home() {
  return (
    <div className="min-h-full bg-transparent relative selection:bg-indigo-500/30 text-slate-200 pb-16">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-300% animate-gradient">Instacoach Center</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-medium">
            Your unified dashboard for analytics, content management, and AI operations.
          </p>
        </motion.div>

        {/* Dashboard Widgets */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Active Users Chart */}
          <div className="lg:col-span-2 bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-lg font-bold text-white mb-6">User Activity (7 Days)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                  <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }} name="Active Users" />
                  <Line type="monotone" dataKey="new" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899', strokeWidth: 0 }} name="New Signups" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Content List */}
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <h3 className="text-lg font-bold text-white mb-6">Trending Content</h3>
            <div className="flex-1 space-y-4">
              {topContent.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-colors">
                  <span className="font-medium text-slate-200">{item.title}</span>
                  <span className="text-sm font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">{item.views} views</span>
                </div>
              ))}
            </div>
            <Link href="/content" className="mt-6 text-center text-sm font-bold text-slate-400 hover:text-white transition-colors">
              View All Content →
            </Link>
          </div>

          {/* Live Activity Feed */}
          <div className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group flex flex-col">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white">Live Activity</h3>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Live</span>
              </div>
            </div>
            <div className="flex-1 space-y-4 relative">
              {/* Vertical line connector */}
              <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/10 z-0" />
              
              {recentActivity.map((item, idx) => (
                <div key={idx} className="relative z-10 flex gap-4">
                  <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${
                    item.type === 'content' ? 'bg-indigo-500/20 text-indigo-400' :
                    item.type === 'user' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {item.type === 'content' && <Video className="w-3 h-3" />}
                    {item.type === 'user' && <Users className="w-3 h-3" />}
                    {item.type === 'ai' && <MessageSquare className="w-3 h-3" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">{item.action}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Links Section */}
        <h3 className="text-xl font-bold text-white mb-6">Quick Navigation</h3>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
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
                          {section.active ? 'Active module' : 'Access module'}
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
