"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, Download, RefreshCw, Calendar, Edit2, Play, Video, ListPlus, UploadCloud, FileText
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
import { exportToCSV } from "@/lib/exportUtils";

// --- DUMMY DATA ---

const DRILL_RECORDS = [
  { title: "How to Do Push Ups", name: "How to Do Push Ups", desc: "", reps: "", skill: "", focus: "" },
  { title: "How to Do Pull Ups", name: "How to Do Pull Ups", desc: "", reps: "", skill: "", focus: "" },
  { title: "How to Bench Press", name: "How to Bench Press", desc: "", reps: "", skill: "", focus: "" },
  { title: "How to Back Squat", name: "How to Back Squat", desc: "", reps: "", skill: "", focus: "" },
  { title: "How to RDL", name: "How to RDL", desc: "", reps: "", skill: "", focus: "" },
  { title: "Single Arm Preacher Curl", name: "Single Arm Preacher Curl", desc: "Place your upper arm firmly on th...", reps: "10 reps", skill: "", focus: "" },
  { title: "Suitcase Carry", name: "Suitcase Carry", desc: "Hold a dumbbell or kettlebell at y...", reps: "10 reps", skill: "", focus: "" },
];

const PROGRAM_DRILL_ASSIGNMENT = [
  { title: "1 B Stationary Exte...", name: "1 B Stationary Extended Backh...", desc: "Watch the ball all the way in glove.", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Backhand Picks", name: "1 B Backhand Picks Brandon", desc: "Move your feet to the correct side o...", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Stationary Mid...", name: "1 B Stationary Middle Picks Br...", desc: "Pick the ball out front.", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Stationary Bac...", name: "1 B Stationary Backhand Brand...", desc: "Pick the ball out front.", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Middle Picks", name: "1 B Middle Picks Brandon", desc: "Pick the ball out front.", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Forehand Picks", name: "1 B Forehand Picks Brandon", desc: "Move your feet to the correct side o...", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
  { title: "1 B Knee Forehand...", name: "1 B Knee Forehand Picks Bran...", desc: "Pick the ball out front.", reps: "10 Reps", program: "1B Pick Series", week: "1", day: "1" },
];

const CONTENT_VERSIONS = [
  { id: "0e86a7aa-8899...", name: "How to Do Push Ups", title: "How to Do Push Ups", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Ezra-How to do Push Ups" },
  { id: "337b4b2e-67fc...", name: "How to Do Pull Ups", title: "How to Do Pull Ups", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Ezra- How to pull ups" },
  { id: "8186be21-28ba...", name: "How to Bench Press", title: "How to Bench Press", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Ezra- How to Bench Press" },
  { id: "87d70815-99d5...", name: "How to Back Squat", title: "How to Back Squat", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Ezra Samperi- How to Back" },
  { id: "b0e94b61-4dfd...", name: "How to RDL", title: "How to RDL", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Ezra-Hot to RDL Revised" },
  { id: "2a1cf1d3-b339...", name: "Dumbbell Skull Crushers", title: "Dumbbell Skull Crushers", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Dumbbell Skull Crushers" },
  { id: "7965ebea-da88...", name: "Copenhagen Iso", title: "Copenhagen Iso", thumb: "https://storage.googleapis.com/inst...", urlTitle: "Copenhagen Iso" },
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

export default function VideoRepoDashboard() {
  return (
    <div className="min-h-screen bg-transparent text-slate-200 font-sans pb-16 relative overflow-hidden selection:bg-indigo-500/30">
      <div className="max-w-[1600px] mx-auto px-8 mt-10 space-y-16 relative z-10">
        
        {/* ================= GLOBAL FILTERS ================= */}
        <motion.section variants={fadeUp} initial="hidden" animate="show">
          <ThemeCard className="p-6 bg-white/[0.02]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Input placeholder="Drill ID: Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl" />
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Drill Name: Select options" /></SelectTrigger><SelectContent/></Select>
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Skills: Select options" /></SelectTrigger><SelectContent/></Select>
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Skill Level: Select options" /></SelectTrigger><SelectContent/></Select>
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Equipment: Select options" /></SelectTrigger><SelectContent/></Select>
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Focus Area: Select an option" /></SelectTrigger><SelectContent/></Select>
              <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Drill Title: Select an option" /></SelectTrigger><SelectContent/></Select>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input placeholder="Updated at: Start date - End date" className="pl-10 h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl" />
              </div>
            </div>
          </ThemeCard>
        </motion.section>

        {/* ================= SECTION 1: DRILL RECORDS TABLE ================= */}
        <motion.section variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 bg-indigo-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white tracking-wide">Drill Records Table</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default"><ListPlus className="w-4 h-4 mr-2"/> Add new record</Button>
              <Button variant="warning"><Edit2 className="w-4 h-4 mr-2"/> Bulk Update</Button>
              <Button variant="default" onClick={() => exportToCSV(DRILL_RECORDS, "drill_records")}><Download className="w-4 h-4 mr-2"/> Download All Data</Button>
              <Button variant="default"><UploadCloud className="w-4 h-4 mr-2"/> Bulk upload drills</Button>
              <Button variant="warning"><FileText className="w-4 h-4 mr-2"/> Add transcription to video</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 text-[11px] uppercase tracking-wider w-[200px]"></TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill title</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Description</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Reps</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Skill level</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 text-[11px] uppercase tracking-wider">Focus area</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {DRILL_RECORDS.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 py-3 border-0 flex gap-2">
                          <Button size="sm" variant="default">Edit</Button>
                          <Button size="sm" variant="default">Content Versions</Button>
                        </TableCell>
                        <TableCell className="text-white font-medium border-0">{row.title}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.name}</TableCell>
                        <TableCell className="text-slate-400 border-0 max-w-[200px] truncate">{row.desc}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.reps}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.skill}</TableCell>
                        <TableCell className="pr-6 text-slate-300 border-0">{row.focus}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 2: PROGRAM DRILL ASSIGNMENT ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 bg-purple-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white tracking-wide">Program Drill Assignment</h2>
            </div>
            <div className="flex items-center gap-3">
              <Select><SelectTrigger className="w-[200px] h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Creator: Select an option" /></SelectTrigger><SelectContent/></Select>
              <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg border-0 font-semibold px-8"><Download className="w-4 h-4 mr-2"/> Download All</Button>
              <Button className="bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-lg border-0 font-semibold px-8"><Edit2 className="w-4 h-4 mr-2"/> Bulk Edit</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 text-[11px] uppercase tracking-wider w-[240px]">Edit</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill title</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Description</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Reps</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Title program</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Week</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 text-[11px] uppercase tracking-wider">Day</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {PROGRAM_DRILL_ASSIGNMENT.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 py-3 border-0 flex gap-2">
                          <Button size="sm" variant="default" className="w-16">Edit</Button>
                          <Button size="sm" variant="secondary">Go to Program</Button>
                        </TableCell>
                        <TableCell className="border-0">
                          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-2 py-1 truncate max-w-[150px] block">{row.title}</Badge>
                        </TableCell>
                        <TableCell className="border-0">
                          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-2 py-1 truncate max-w-[150px] block">{row.name}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-400 border-0 max-w-[150px] truncate">{row.desc}</TableCell>
                        <TableCell className="border-0">
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-2 py-1">{row.reps}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-300 border-0">{row.program}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.week}</TableCell>
                        <TableCell className="pr-6 text-slate-300 border-0">{row.day}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ThemeCard>
          </motion.div>
        </motion.section>

        {/* ================= SECTION 3: CONTENT VERSIONS ================= */}
        <motion.section variants={staggerContainer} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="space-y-6 pt-8 border-t border-white/5">
          <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-2 bg-emerald-500 rounded-full" />
              <h2 className="text-2xl font-bold text-white tracking-wide">Content Versions</h2>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ThemeCard>
              <div className="p-6 border-b border-white/5 bg-white/[0.02]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Content Style: Select options" /></SelectTrigger><SelectContent/></Select>
                  <Input placeholder="ID: Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl" />
                  <Input placeholder="Video URL: Enter value" className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl" />
                  <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Name: Select an option" /></SelectTrigger><SelectContent/></Select>
                  <Select><SelectTrigger className="h-11 bg-[#050505] border-white/10 text-slate-300 rounded-xl"><SelectValue placeholder="Video URL title: Select an option" /></SelectTrigger><SelectContent/></Select>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button className="flex-1" variant="warning"><Edit2 className="w-4 h-4 mr-2"/> Bulk Update All Content Version</Button>
                  <Button className="flex-1" variant="default"><ListPlus className="w-4 h-4 mr-2"/> Add Content Version</Button>
                  <Button className="flex-1" variant="default" onClick={() => exportToCSV(CONTENT_VERSIONS, "content_versions")}><Download className="w-4 h-4 mr-2"/> Download All Data</Button>
                  <Button className="flex-1" variant="default"><UploadCloud className="w-4 h-4 mr-2"/> Bulk Upload Content Versions</Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-white/[0.03]">
                    <TableRow className="border-b border-white/5 hover:bg-transparent">
                      <TableHead className="font-bold text-slate-400 h-14 pl-6 text-[11px] uppercase tracking-wider w-[100px]">Edit</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">ID</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill name</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Drill title</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 text-[11px] uppercase tracking-wider">Thumbnail URL</TableHead>
                      <TableHead className="font-bold text-slate-400 h-14 pr-6 text-[11px] uppercase tracking-wider">Video URL Title</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-white/5">
                    {CONTENT_VERSIONS.map((row, i) => (
                      <TableRow key={i} className="hover:bg-white/[0.02] border-0 transition-colors">
                        <TableCell className="pl-6 py-3 border-0">
                          <Button size="sm" variant="default" className="w-16">Edit</Button>
                        </TableCell>
                        <TableCell className="text-slate-400 font-mono text-sm border-0">{row.id}</TableCell>
                        <TableCell className="text-white font-medium border-0">{row.name}</TableCell>
                        <TableCell className="text-slate-300 border-0">{row.title}</TableCell>
                        <TableCell className="text-indigo-400 hover:text-indigo-300 truncate max-w-[200px] border-0">{row.thumb}</TableCell>
                        <TableCell className="pr-6 text-slate-300 border-0">{row.urlTitle}</TableCell>
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
