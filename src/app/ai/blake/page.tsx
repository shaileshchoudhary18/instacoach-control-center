"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Download, RefreshCw, Calendar, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

// --- DUMMY DATA ---

const PROGRAM_STARTS = [
  { date: "May 12, 2026 7:25 PM", name: "Hayden Frohling", nameColor: "bg-amber-500/10 text-amber-400 border-amber-500/20", id: "3b83113c-0b03...", email: "guest_17652...gmail.com", progName: "Hitter's In-Season Routine", progId: "fbdadd9f-..." },
  { date: "May 12, 2026 2:12 PM", name: "Nolan De Francis", nameColor: "bg-blue-500/10 text-blue-400 border-blue-500/20", id: "d2153ffd-5e7a...", email: "whitney.de...gmail.com", progName: "In Season Starting Pitcher's...", progId: "6f90cdc9-..." },
  { date: "May 12, 2026 1:28 PM", name: "Zach", nameColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", id: "e244a9d9-4589...", email: "guest_17682...gmail.com", progName: "Phase 1 Pitcher's Offseason...", progId: "6663e4af-..." },
  { date: "May 12, 2026 1:16 PM", name: "Laiden", nameColor: "bg-blue-500/10 text-blue-400 border-blue-500/20", id: "fb18f75b-3ae6...", email: "9zpdrc4frj@...appleid.com", progName: "Hitters Offseason Lifting", progId: "abbf3836-..." },
  { date: "May 12, 2026 11:11 AM", name: "Charlie Ruwe", nameColor: "bg-orange-500/10 text-orange-400 border-orange-500/20", id: "58423ce1-9e43...", email: "charlieruwe...gmail.com", progName: "Hitter's In-Season Lifting", progId: "4c477cb1-..." },
  { date: "May 12, 2026 10:10 AM", name: "CJ Weber", nameColor: "bg-rose-500/10 text-rose-400 border-rose-500/20", id: "2898c9d5-5ad5...", email: "webercj568@gmail.com", progName: "Hitters Offseason Lifting", progId: "abbf3836-..." },
];

const VIDEO_SUBMISSION = [
  { name: "Landon Brimer", id: "06f71435-7e77...", email: "dbrimer81@gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 21, 2026 12:00 PM" },
  { name: "Landon Brimer", id: "06f71435-7e77...", email: "dbrimer81@gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 21, 2026 11:55 AM" },
  { name: "cooper rispen", id: "6dc4b889-baa9...", email: "cooper30cu...outlook.com", progName: "The Complete Catcher Program", progId: "459611a9-...", createdBy: "Trey Newman", date: "Jun 18, 2026 3:41 AM" },
  { name: "Bryson Allen", id: "e6a62fe7-e3e0...", email: "alisonallen...gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 15, 2026 12:26 PM" },
];

const VIDEO_SWIPED = [
  { name: "caden millsback", id: "20b7db15-8802...", email: "cmillsback...gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 25, 2026 3:55 AM" },
  { name: "enzo", id: "29ece606-46e3...", email: "nlaz350@gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 25, 2026 12:16 AM" },
  { name: "enzo", id: "29ece606-46e3...", email: "nlaz350@gmail.com", progName: "-", progId: "-", createdBy: "-", date: "Jun 25, 2026 12:16 AM" },
];

const ASK_QUESTION = [
  { q: "hello", qColor: "bg-amber-500/10 text-amber-400 border-amber-500/20", start: "Jun 25, 2026 3:15 AM", end: "Jun 25, 2026 3:16 AM", name: "Msprod520", email: "guest_17822...gmail.com", drill: "-", dColor: "" },
  { q: "substitute not cable", qColor: "bg-rose-500/10 text-rose-400 border-rose-500/20", start: "Jun 23, 2026 4:46 PM", end: "Jun 23, 2026 4:46 PM", name: "Trey Taylor", email: "treyt7289@gmail.com", drill: "2 A SS Cable Rotati...", dColor: "bg-rose-500/10 text-rose-400 border-rose-500/20" },
  { q: "what is this", qColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", start: "Jun 23, 2026 10:18 AM", end: "Jun 23, 2026 10:18 AM", name: "Msprod520", email: "guest_17822...gmail.com", drill: "-", dColor: "" },
  { q: "drills for this", qColor: "bg-orange-500/10 text-orange-400 border-orange-500/20", start: "Jun 21, 2026 4:13 PM", end: "Jun 21, 2026 4:13 PM", name: "Sara Moore", email: "josiahdmoore@gmail.com", drill: "-", dColor: "" },
  { q: "what can I do if not box squats", qColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", start: "Jun 15, 2026 4:22 PM", end: "Jun 15, 2026 4:23 PM", name: "Trey Taylor", email: "treyt7289@gmail.com", drill: "1 A Box Squat", dColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
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

export default function BlakeDashboard() {
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
            Blake
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-0.5">Control Center / Blake</p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button variant="default" className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 px-5 h-10 font-semibold transition-all border-0">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </motion.div>
      </motion.div>

      <div className="max-w-[1600px] mx-auto px-8 mt-10 space-y-16 relative z-10">
        
        {/* ================= SECTION 1: PROGRAM STARTS ================= */}
        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Program Starts</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Start Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                      <Input placeholder="Start date  -  End date" className="pl-10 h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                    <Select>
                      <SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 focus:ring-indigo-500 rounded-xl">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0c] border-white/10">
                        <SelectItem value="all">All Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client ID</label>
                    <Input placeholder="Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 rounded-xl" />
                  </div>
                </div>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-11 font-bold shadow-lg shadow-indigo-500/20 transition-all border-0">
                  Download all data
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 uppercase tracking-wider text-[11px]">Program start date</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client email</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Program name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 uppercase tracking-wider text-[11px]">Program ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {PROGRAM_STARTS.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 text-slate-300 py-4 font-medium border-0">{row.date}</TableCell>
                        <TableCell className="border-0">
                          <Badge variant="secondary" className={`${row.nameColor} border font-medium px-2.5 py-1 rounded-md`}>
                            {row.name}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 text-sm font-mono border-0">{row.id}</TableCell>
                        <TableCell className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors border-0">{row.email}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.progName}</TableCell>
                        <TableCell className="pr-6 text-slate-400 font-mono text-sm border-0">{row.progId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 2: VIDEO SUBMISSION ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-emerald-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Video Submission Live Data</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Submission Date</label>
                    <div className="relative group">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400 group-focus-within:text-indigo-400 transition-colors" />
                      <Input placeholder="Start date  -  End date" className="pl-10 h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 rounded-xl" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client Name</label>
                    <Select>
                      <SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 focus:ring-indigo-500 rounded-xl">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0c] border-white/10">
                        <SelectItem value="all">All Clients</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Client ID</label>
                    <Input placeholder="Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 focus-visible:ring-indigo-500 rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Coach Video</label>
                    <Select>
                      <SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 focus:ring-indigo-500 rounded-xl">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a0c] border-white/10">
                        <SelectItem value="all">All Videos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="w-full lg:w-auto px-10 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-11 font-bold shadow-lg shadow-indigo-500/20 transition-all border-0">
                    Download All Data
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 uppercase tracking-wider text-[11px]">Client name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client email</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Program name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Program ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Created by</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 uppercase tracking-wider text-[11px]">Submission date and time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {VIDEO_SUBMISSION.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 text-slate-300 py-4 font-medium border-0">{row.name}</TableCell>
                        <TableCell className="text-slate-400 text-sm font-mono border-0">{row.id}</TableCell>
                        <TableCell className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors border-0">{row.email}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.progName}</TableCell>
                        <TableCell className="text-slate-400 font-mono text-sm border-0">{row.progId}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.createdBy}</TableCell>
                        <TableCell className="pr-6 text-slate-300 font-medium border-0">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 3: VIDEO SWIPED ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-blue-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Video Swiped</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <Button className="w-[300px] bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl h-11 font-bold shadow-lg shadow-indigo-500/20 transition-all border-0">
                  Download All Data
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 uppercase tracking-wider text-[11px]">Client name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client email</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Program name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Program ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Created by</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 uppercase tracking-wider text-[11px]">Submission date and time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {VIDEO_SWIPED.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 text-slate-300 py-4 font-medium border-0">{row.name}</TableCell>
                        <TableCell className="text-slate-400 text-sm font-mono border-0">{row.id}</TableCell>
                        <TableCell className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors border-0">{row.email}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.progName}</TableCell>
                        <TableCell className="text-slate-400 font-mono text-sm border-0">{row.progId}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.createdBy}</TableCell>
                        <TableCell className="pr-6 text-slate-300 font-medium border-0">{row.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 4: ASK A QUESTION ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex items-center space-x-3 mb-2">
            <div className="h-8 w-2 bg-purple-500 rounded-full" />
            <h2 className="text-2xl font-bold text-white tracking-wide">Ask a question</h2>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 uppercase tracking-wider text-[11px]">View Conversation</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Question Asked</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Conversation Start</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Conversation end</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Client email</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 uppercase tracking-wider text-[11px]">Drill name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 uppercase tracking-wider text-[11px]">Drill ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {ASK_QUESTION.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 py-4 border-0">
                          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold w-full max-w-[120px] rounded-lg border-0 shadow-lg shadow-indigo-500/20">
                            View
                          </Button>
                        </TableCell>
                        <TableCell className="border-0 min-w-[200px]">
                          <Badge variant="secondary" className={`${row.qColor} border font-medium px-2.5 py-1 rounded-md max-w-full overflow-hidden text-ellipsis whitespace-nowrap`}>
                            {row.q}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300 border-0 whitespace-nowrap">{row.start}</TableCell>
                        <TableCell className="text-slate-300 border-0 whitespace-nowrap">{row.end}</TableCell>
                        <TableCell className="text-slate-300 border-0 font-medium whitespace-nowrap">{row.name}</TableCell>
                        <TableCell className="text-indigo-400 hover:text-indigo-300 cursor-pointer transition-colors border-0">{row.email}</TableCell>
                        <TableCell className="border-0">
                          {row.drill !== "-" ? (
                            <Badge variant="secondary" className={`${row.dColor} border font-medium px-2.5 py-1 rounded-md`}>
                              {row.drill}
                            </Badge>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </TableCell>
                        <TableCell className="pr-6 text-slate-400 font-mono text-sm border-0">-</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
