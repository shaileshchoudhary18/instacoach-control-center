"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, RefreshCw, Info, Download, Calendar, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// --- DUMMY DATA ---
const ALL_CHATS_DATA = [
  { id: "c1", lastInteracted: "Jun 21, 2026 · 01:01 PM", started: "Jun 21, 2026 · 12:56 PM", totalTurns: 11, clientName: "Emil Agustinez", firstMessage: "Strength Plan", badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" },
  { id: "c2", lastInteracted: "Jun 21, 2026 · 01:32 AM", started: "Jun 21, 2026 · 01:32 AM", totalTurns: 1, clientName: "Guest User", firstMessage: "Build velocity", badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  { id: "c3", lastInteracted: "Jun 20, 2026 · 11:14 PM", started: "Jun 20, 2026 · 11:14 PM", totalTurns: 1, clientName: "Urirhrb", firstMessage: "Give me a quick pre-game...", badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { id: "c4", lastInteracted: "Jun 19, 2026 · 10:59 PM", started: "Jun 19, 2026 · 10:59 PM", totalTurns: 1, clientName: "Urirhrb", firstMessage: "Subscription availability pro...", badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20" },
  { id: "c5", lastInteracted: "Jun 19, 2026 · 01:25 PM", started: "Jun 19, 2026 · 01:25 PM", totalTurns: 4, clientName: "Emil Agustinez", firstMessage: "Schedule change for tomorrow", badgeColor: "bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20" },
  { id: "c6", lastInteracted: "Jun 18, 2026 · 09:14 AM", started: "Jun 18, 2026 · 09:14 AM", totalTurns: 7, clientName: "Alex Martin", firstMessage: "Dietary restrictions added", badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  { id: "c7", lastInteracted: "Jun 17, 2026 · 04:45 PM", started: "Jun 17, 2026 · 04:30 PM", totalTurns: 15, clientName: "Sam Solomon", firstMessage: "Form check for deadlifts", badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  { id: "c8", lastInteracted: "Jun 16, 2026 · 11:00 AM", started: "Jun 16, 2026 · 11:00 AM", totalTurns: 2, clientName: "Guest User", firstMessage: "How do I upgrade?", badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
];

const DAILY_SUMMARY_DATA = [
  { date: "Jun 21, 2026", users: 2, convos: 2, turns: 12, tPerConvo: 6.0, cPerUser: 1.0, tPerUser: 6.0 },
  { date: "Jun 20, 2026", users: 1, convos: 3, turns: 3, tPerConvo: 1.0, cPerUser: 3.0, tPerUser: 3.0 },
  { date: "Jun 19, 2026", users: 3, convos: 12, turns: 12, tPerConvo: 1.0, cPerUser: 4.0, tPerUser: 4.0 },
  { date: "Jun 18, 2026", users: 22, convos: 168, turns: 356, tPerConvo: 2.1, cPerUser: 7.6, tPerUser: 16.2 },
  { date: "Jun 17, 2026", users: 22, convos: 55, turns: 206, tPerConvo: 3.7, cPerUser: 2.5, tPerUser: 9.4 },
  { date: "Jun 16, 2026", users: 16, convos: 88, turns: 165, tPerConvo: 1.9, cPerUser: 5.5, tPerUser: 10.3 },
  { date: "Jun 15, 2026", users: 15, convos: 86, turns: 153, tPerConvo: 1.8, cPerUser: 5.7, tPerUser: 10.2 },
];

const APP_VS_WEB_DATA = [
  { date: "Jun 21, 2026", app: { users: 2, sess: 2, turns: 12, tPerSess: 6.0, sPerUser: 1.0, tPerUser: 6.0 }, web: { users: 0, sess: 0, turns: 0, tPerSess: 0.0 } },
  { date: "Jun 20, 2026", app: { users: 1, sess: 3, turns: 3, tPerSess: 1.0, sPerUser: 3.0, tPerUser: 3.0 }, web: { users: 0, sess: 0, turns: 0, tPerSess: 0.0 } },
  { date: "Jun 19, 2026", app: { users: 2, sess: 11, turns: 11, tPerSess: 1.0, sPerUser: 5.5, tPerUser: 5.5 }, web: { users: 1, sess: 1, turns: 1, tPerSess: 1.0 } },
  { date: "Jun 18, 2026", app: { users: 13, sess: 158, turns: 281, tPerSess: 1.8, sPerUser: 12.2, tPerUser: 21.6 }, web: { users: 9, sess: 10, turns: 75, tPerSess: 7.5 } },
  { date: "Jun 17, 2026", app: { users: 16, sess: 47, turns: 168, tPerSess: 3.6, sPerUser: 2.9, tPerUser: 10.5 }, web: { users: 6, sess: 8, turns: 38, tPerSess: 4.8 } },
  { date: "Jun 16, 2026", app: { users: 8, sess: 73, turns: 97, tPerSess: 1.3, sPerUser: 9.1, tPerUser: 12.1 }, web: { users: 8, sess: 15, turns: 68, tPerSess: 4.5 } },
  { date: "Jun 15, 2026", app: { users: 11, sess: 80, turns: 136, tPerSess: 1.7, sPerUser: 7.3, tPerUser: 12.4 }, web: { users: 4, sess: 6, turns: 17, tPerSess: 2.8 } },
];

const POWER_USERS_SESSIONS = [
  { id: "1", name: "Sam Solomon", email: "fa5357f2...", sess: 142, turns: 142, tPerSess: 1.0, platform: "APP", lastVisited: "Jun 14 · 08:56 PM" },
  { id: "2", name: "Urirhrb", email: "1a681ca5...", sess: 81, turns: 111, tPerSess: 1.4, platform: "APP", lastVisited: "Jun 20 · 11:14 PM" },
  { id: "3", name: "dev67", email: "1c92f524...", sess: 33, turns: 41, tPerSess: 1.2, platform: "APP", lastVisited: "Jun 17 · 09:41 AM" },
  { id: "4", name: "QDev", email: "cb299c2d...", sess: 32, turns: 96, tPerSess: 3.0, platform: "APP", lastVisited: "May 28 · 03:07 AM" },
  { id: "5", name: "Test", email: "a8c6a98f...", sess: 28, turns: 30, tPerSess: 1.1, platform: "APP", lastVisited: "May 13 · 02:35 AM" },
  { id: "6", name: "Dev 11", email: "f9b2d3e1...", sess: 24, turns: 24, tPerSess: 1.0, platform: "APP", lastVisited: "Jun 18 · 06:16 AM" },
  { id: "7", name: "Alex Martin", email: "d4a1c5b8...", sess: 22, turns: 50, tPerSess: 2.3, platform: "WEB", lastVisited: "Jun 18 · 09:14 AM" },
];

const POWER_USERS_TURNS = [
  { id: "1", name: "Sam Solomon", email: "5e2381e5...", turns: 166, sess: 31, tPerSess: 5.4, platform: "APP", lastVisited: "Jun 12 · 11:11 AM" },
  { id: "2", name: "Sam Solomon", email: "fa5357f2...", turns: 142, sess: 142, tPerSess: 1.0, platform: "APP", lastVisited: "Jun 14 · 08:56 PM" },
  { id: "3", name: "sandeep89@gmail.com", email: "b4beb0b8...", turns: 130, sess: 18, tPerSess: 7.2, platform: "WEB", lastVisited: "Jun 10 · 12:18 AM" },
  { id: "4", name: "Urirhrb", email: "1a681ca5...", turns: 111, sess: 81, tPerSess: 1.4, platform: "APP", lastVisited: "Jun 20 · 11:14 PM" },
  { id: "5", name: "sandeep001@gmail.com", email: "737ab330...", turns: 99, sess: 18, tPerSess: 5.5, platform: "WEB", lastVisited: "Jun 11 · 09:08 PM" },
  { id: "6", name: "QDev", email: "cb299c2d...", turns: 96, sess: 32, tPerSess: 3.0, platform: "APP", lastVisited: "May 28 · 03:07 AM" },
  { id: "7", name: "mahesh113@gmail.com", email: "9d3e8a4b...", turns: 92, sess: 16, tPerSess: 5.8, platform: "WEB", lastVisited: "Jun 11 · 01:57 AM" },
];

const CHAT_MESSAGES = [
  { id: "m1", sender: "client", name: "EMIL AGUSTINEZ", text: "Strength Plan", timestamp: "Jun 21, 12:56 PM", turn: 1 },
  { id: "m2", sender: "kai", name: "KAI", text: "Before I build it — what are your goals right now?", timestamp: "Jun 21, 12:56 PM", turn: 1 },
  { id: "m3", sender: "client", name: "EMIL AGUSTINEZ", text: "arm strength", timestamp: "Jun 21, 12:57 PM", turn: 2 },
  { id: "m4", sender: "kai", name: "KAI", text: "Arm strength is about more than just throwing harder — it's what keeps you healthy through a long season. Let's start with Block 1 from Tommy's system.", timestamp: "Jun 21, 12:57 PM", turn: 2 },
  { id: "m5", sender: "client", name: "EMIL AGUSTINEZ", text: "Okay, I'll review Block 1. How many weeks is it?", timestamp: "Jun 21, 01:05 PM", turn: 3 },
  { id: "m6", sender: "kai", name: "KAI", text: "Block 1 runs for 4 weeks. Let me know if you want to preview week 1.", timestamp: "Jun 21, 01:06 PM", turn: 3 },
];

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

const ThemeCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative ${className}`}>
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    {children}
  </div>
);

export default function KaiChatsDashboard() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openChat = (chat: any) => {
    setSelectedChat(chat);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans pb-16 relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* Top Header */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-8 py-5 flex items-center"
      >
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-white mr-5 rounded-xl bg-[#0a0a0c] border border-white/5 hover:bg-white/5 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-3">
            Kai Chats Analytics
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-0.5">May 13th, 2026 – Present</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 px-5 h-10 font-semibold transition-all border-0">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-8 mt-10 space-y-16 relative z-10">
        
        {/* ================= SECTION 1: ALL CHATS ================= */}
        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">All Chats</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {[
                    { label: "Session Started", type: "date" },
                    { label: "Client ID", type: "text" },
                    { label: "Client Name", type: "select" },
                    { label: "Platform", type: "select" },
                  ].map((filter, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{filter.label}</label>
                      {filter.type === "date" ? (
                        <div className="relative group">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                          <Input placeholder="Select date range" className="pl-10 h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl" />
                        </div>
                      ) : filter.type === "select" ? (
                        <Select>
                          <SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 focus:ring-indigo-500 rounded-xl">
                            <SelectValue placeholder={`Select ${filter.label.toLowerCase()}`} />
                          </SelectTrigger>
                          <SelectContent className="bg-[#0a0a0c] border-white/10 text-slate-300">
                            <SelectItem value="1">Option 1</SelectItem>
                            <SelectItem value="2">Option 2</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input placeholder="Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 rounded-xl" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ThemeCard>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#0a0a0c] border border-white/5 rounded-2xl p-6 flex space-x-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            <div className="bg-indigo-500/10 p-2 rounded-xl h-fit border border-indigo-500/20">
              <Info className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-indigo-400 mb-1 text-lg">Understanding Turn Metrics</h3>
              <p className="text-[15px] text-slate-400 leading-relaxed font-medium">
                Applying an <span className="font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded">Active User Date Range</span> filters the table to show only sessions that had activity during those dates.
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex-1">
              <Button className="w-full bg-[#0a0a0c] hover:bg-white/5 text-slate-300 border border-white/5 rounded-xl h-12 font-bold text-[15px] transition-all">
                <Download className="h-4 w-4 mr-2 text-slate-500" /> Download CSV
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }} className="flex-1">
              <Button className="w-full bg-[#0a0a0c] hover:bg-white/5 text-slate-300 border border-white/5 rounded-xl h-12 font-bold text-[15px] transition-all">
                <Download className="h-4 w-4 mr-2 text-slate-500" /> Download DOC
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <Table>
                <TableHeader className="bg-white/[0.03] border-b border-white/5">
                  <TableRow className="hover:bg-transparent border-0">
                    <TableHead className="font-bold text-slate-400 h-14 pl-6 uppercase tracking-wider text-[11px]">Action</TableHead>
                    <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Last interacted</TableHead>
                    <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Started</TableHead>
                    <TableHead className="font-bold text-slate-400 h-14 text-right uppercase tracking-wider text-[11px]">Total Turns</TableHead>
                    <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client name</TableHead>
                    <TableHead className="font-bold text-slate-400 h-14 pr-6 uppercase tracking-wider text-[11px]">First message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {ALL_CHATS_DATA.map((row, i) => (
                      <motion.tr 
                        key={row.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="hover:bg-white/[0.02] transition-colors group border-0"
                      >
                        <TableCell className="pl-6 py-4 border-0">
                          <Button 
                            onClick={() => openChat(row)}
                            size="sm" 
                            className="bg-indigo-600/20 hover:bg-indigo-600 border border-indigo-500/20 text-indigo-300 hover:text-white px-4 rounded-lg transition-all font-semibold text-xs"
                          >
                            View Chat <ArrowUpRight className="ml-1.5 h-3 w-3 opacity-70" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-slate-300 text-[14px] border-0">{row.lastInteracted}</TableCell>
                        <TableCell className="text-slate-300 text-[14px] border-0">{row.started}</TableCell>
                        <TableCell className="text-white text-[15px] text-right font-bold border-0">{row.totalTurns}</TableCell>
                        <TableCell className="border-0">
                          <Badge variant="secondary" className={`${row.badgeColor} border font-medium px-2.5 py-1 rounded-md`}>
                            {row.clientName}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-500 text-[14px] pr-6 truncate max-w-[200px] italic border-0">"{row.firstMessage}"</TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 2: DAILY SUMMARY ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-emerald-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Daily Summary</h2>
          </motion.div>
          
          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-white/5 mb-8">
                  <Table>
                    <TableHeader className="bg-white/[0.03]">
                      <TableRow className="hover:bg-transparent border-white/5">
                        {["Date", "Unique users", "Conversations", "Turns", "Turns/convo", "Convo/user", "Turns/user"].map((th) => (
                          <TableHead key={th} className="font-bold text-slate-400 uppercase tracking-wider text-[10px] h-12">{th}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-white/5">
                      {DAILY_SUMMARY_DATA.map((row, i) => (
                        <TableRow key={i} className="hover:bg-white/[0.02] border-0">
                          <TableCell className="font-bold text-white border-0">{row.date}</TableCell>
                          <TableCell className="text-slate-300 font-medium border-0">{row.users}</TableCell>
                          <TableCell className="text-slate-300 font-medium border-0">{row.convos}</TableCell>
                          <TableCell className="text-slate-300 font-medium border-0">{row.turns}</TableCell>
                          <TableCell className="text-slate-500 border-0">{row.tPerConvo}</TableCell>
                          <TableCell className="text-slate-500 border-0">{row.cPerUser}</TableCell>
                          <TableCell className="text-slate-500 border-0">{row.tPerUser}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Engagement Tiers</h3>
                  <div className="w-full h-5 flex rounded-full overflow-hidden mb-6 bg-white/5">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "22%" }} transition={{ duration: 1, ease: "easeOut" }} className="h-full bg-rose-500/80 relative overflow-hidden"><div className="absolute inset-0 bg-white/20 w-full h-full skew-x-12 translate-x-full animate-[shimmer_2s_infinite]"></div></motion.div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "30%" }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="h-full bg-amber-500/80"></motion.div>
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "48%" }} transition={{ duration: 1, delay: 0.4, ease: "easeOut" }} className="h-full bg-emerald-500/80"></motion.div>
                  </div>
                  <div className="flex flex-wrap gap-6 mb-2">
                    <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-rose-500/80"></div><span className="text-sm font-medium text-slate-300">Bounced <span className="text-rose-400 font-bold">22%</span></span></div>
                    <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-amber-500/80"></div><span className="text-sm font-medium text-slate-300">Sampled <span className="text-amber-400 font-bold">30%</span></span></div>
                    <div className="flex items-center space-x-2"><div className="w-4 h-4 rounded-full bg-emerald-500/80"></div><span className="text-sm font-medium text-slate-300">Returned <span className="text-emerald-400 font-bold">48%</span></span></div>
                  </div>
                </div>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 3: APP VS WEB ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">App vs Web Performance</h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6">
                <div className="overflow-x-auto rounded-xl border border-white/5">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-white/5">
                        <TableHead className="bg-white/[0.03] border-r border-white/5"></TableHead>
                        <TableHead colSpan={6} className="bg-indigo-500/10 text-center font-bold text-indigo-400 border-r border-b border-white/5 tracking-widest uppercase text-xs py-3">Mobile App</TableHead>
                        <TableHead colSpan={4} className="bg-emerald-500/10 text-center font-bold text-emerald-400 border-b border-white/5 tracking-widest uppercase text-xs py-3">Web Portal</TableHead>
                      </TableRow>
                      <TableRow className="hover:bg-transparent bg-white/[0.02] border-white/5">
                        <TableHead className="font-bold text-slate-300 border-r border-white/5">Date</TableHead>
                        {/* APP */}
                        <TableHead className="font-medium text-slate-400">Users</TableHead>
                        <TableHead className="font-medium text-slate-400">Sess</TableHead>
                        <TableHead className="font-medium text-slate-400">Turns</TableHead>
                        <TableHead className="font-medium text-slate-400">T/sess</TableHead>
                        <TableHead className="font-medium text-slate-400">S/user</TableHead>
                        <TableHead className="font-medium text-slate-400 border-r border-white/5">T/user</TableHead>
                        {/* WEB */}
                        <TableHead className="font-medium text-slate-400">Users</TableHead>
                        <TableHead className="font-medium text-slate-400">Sess</TableHead>
                        <TableHead className="font-medium text-slate-400">Turns</TableHead>
                        <TableHead className="font-medium text-slate-400">T/sess</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-white/5">
                      {APP_VS_WEB_DATA.map((row, i) => (
                        <TableRow key={i} className="hover:bg-white/[0.02] border-0">
                          <TableCell className="font-bold text-white border-r border-white/5">{row.date}</TableCell>
                          <TableCell className="text-indigo-300">{row.app.users}</TableCell>
                          <TableCell className="text-indigo-300">{row.app.sess}</TableCell>
                          <TableCell className="text-indigo-300">{row.app.turns}</TableCell>
                          <TableCell className="text-slate-500">{row.app.tPerSess}</TableCell>
                          <TableCell className="text-slate-500">{row.app.sPerUser}</TableCell>
                          <TableCell className="text-slate-500 border-r border-white/5">{row.app.tPerUser}</TableCell>
                          <TableCell className="text-emerald-300">{row.web.users}</TableCell>
                          <TableCell className="text-emerald-300">{row.web.sess}</TableCell>
                          <TableCell className="text-emerald-300">{row.web.turns}</TableCell>
                          <TableCell className="text-slate-500">{row.web.tPerSess}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 4: POWER USERS ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-purple-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Power Users Directory</h2>
          </motion.div>
          <motion.div variants={fadeUp}>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* By Most Sessions */}
              <ThemeCard className="flex flex-col">
                <div className="bg-white/[0.03] px-6 py-5 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-bold text-white text-lg">By Most Sessions</h3>
                  <span className="text-[10px] bg-white/10 text-slate-300 font-bold px-3 py-1 rounded-full tracking-wider uppercase border border-white/10">Top 100 Pool</span>
                </div>
                <div className="overflow-x-auto p-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-0 hover:bg-transparent">
                        <TableHead className="text-center text-slate-500 font-bold uppercase text-[10px]">Rank</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px]">User</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-right">Sess</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-right">Turns</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-center">Platform</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {POWER_USERS_SESSIONS.map((row, i) => (
                        <TableRow 
                          key={row.id} 
                          className="hover:bg-white/[0.02] border-b border-white/5 transition-all cursor-default"
                        >
                          <TableCell className="text-center text-slate-500 font-bold border-0">{i + 1}</TableCell>
                          <TableCell className="border-0">
                            <div className="font-medium text-white">{row.name}</div>
                            <div className="text-[11px] text-slate-500">{row.email}</div>
                          </TableCell>
                          <TableCell className="text-right font-bold text-indigo-400 text-lg border-0">{row.sess}</TableCell>
                          <TableCell className="text-right text-slate-400 border-0">{row.turns}</TableCell>
                          <TableCell className="text-center border-0">
                            <Badge className={`${row.platform === 'APP' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border font-medium px-2 py-0.5 rounded-md text-[10px]`}>
                              {row.platform}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ThemeCard>

              {/* By Most Turns */}
              <ThemeCard className="flex flex-col">
                <div className="bg-white/[0.03] px-6 py-5 border-b border-white/5 flex justify-between items-center">
                  <h3 className="font-bold text-white text-lg">By Most Turns</h3>
                  <span className="text-[10px] bg-white/10 text-slate-300 font-bold px-3 py-1 rounded-full tracking-wider uppercase border border-white/10">Top 100 Pool</span>
                </div>
                <div className="overflow-x-auto p-2">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-0 hover:bg-transparent">
                        <TableHead className="text-center text-slate-500 font-bold uppercase text-[10px]">Rank</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px]">User</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-right">Turns</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-right">Sess</TableHead>
                        <TableHead className="text-slate-500 font-bold uppercase text-[10px] text-center">Platform</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {POWER_USERS_TURNS.map((row, i) => (
                        <TableRow 
                          key={row.id} 
                          className="hover:bg-white/[0.02] border-b border-white/5 transition-all cursor-default"
                        >
                          <TableCell className="text-center text-slate-500 font-bold border-0">{i + 1}</TableCell>
                          <TableCell className="border-0">
                            <div className="font-medium text-white">{row.name}</div>
                            <div className="text-[11px] text-slate-500">{row.email}</div>
                          </TableCell>
                          <TableCell className="text-right font-bold text-purple-400 text-lg border-0">{row.turns}</TableCell>
                          <TableCell className="text-right text-slate-400 border-0">{row.sess}</TableCell>
                          <TableCell className="text-center border-0">
                            <Badge className={`${row.platform === 'APP' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'} border font-medium px-2 py-0.5 rounded-md text-[10px]`}>
                              {row.platform}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ThemeCard>

            </div>
          </motion.div>
        </motion.section>

      </div>

      {/* Chat Dialog - Enhanced */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-[#0a0a0c]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[2rem] h-[85vh] flex flex-col">
          <div className="bg-white/5 px-8 py-6 border-b border-white/5 flex items-center justify-between z-10">
            <div>
              <DialogTitle className="text-2xl font-extrabold text-white flex items-center space-x-3">
                <span className="text-indigo-400">Conversation Record</span>
                <span className="text-slate-600">/</span>
                <span className="text-slate-300">{selectedChat?.clientName}</span>
              </DialogTitle>
              <p className="text-sm text-slate-500 mt-1 font-medium tracking-wide">
                {selectedChat?.totalTurns} turns · 22 messages
              </p>
            </div>
            <Button variant="outline" className="bg-[#050505] border-white/10 text-slate-300 hover:bg-white/5 hover:text-white rounded-xl font-bold transition-all">
              <Download className="h-4 w-4 mr-2" /> Download Log
            </Button>
          </div>

          <ScrollArea className="flex-1 p-8 bg-[#050505]/50">
            <div className="max-w-2xl mx-auto space-y-8 pb-8">
              {CHAT_MESSAGES.reduce((acc: any[], message, index) => {
                const isNewTurn = index === 0 || CHAT_MESSAGES[index - 1].turn !== message.turn;
                if (isNewTurn) {
                  acc.push(
                    <div key={`turn-${message.turn}`} className="flex items-center my-10">
                      <Separator className="flex-1 bg-white/10" />
                      <span className="mx-4 text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                        TURN {message.turn}
                      </span>
                      <Separator className="flex-1 bg-white/10" />
                    </div>
                  );
                }

                const isKai = message.sender === "kai";
                acc.push(
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={message.id} 
                    className={`flex flex-col ${isKai ? "items-start" : "items-end"} mb-6`}
                  >
                    <div className="flex items-center mb-2 space-x-2 px-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isKai ? 'text-indigo-400' : 'text-slate-500'}`}>
                        {message.name}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        {message.timestamp}
                      </span>
                    </div>
                    <div 
                      className={`px-6 py-4 max-w-[85%] text-[15px] leading-relaxed shadow-lg ${
                        isKai 
                          ? "bg-white/5 border border-white/10 text-slate-200 rounded-3xl rounded-tl-sm" 
                          : "bg-indigo-600 text-white rounded-3xl rounded-tr-sm shadow-indigo-500/20"
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                );
                return acc;
              }, [])}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

    </div>
  );
}

