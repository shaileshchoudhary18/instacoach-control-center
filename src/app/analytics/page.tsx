"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Download, RefreshCw, ArrowLeft, ChevronRight,
  TrendingUp, Activity, Users, Target
} from "lucide-react";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

// --- Mock Data ---

const recentLogs = [
  { id: 1, datetime: "Jun 23, 2026 11:55 PM", user: "Guest User", value: "95 mph", metricType: "velocity", category: "Hitting", type: "Metrics", loggedDate: "Jun 24, 2026", email: "guest_178228@guest.com" },
  { id: 2, datetime: "Jun 23, 2026 11:49 PM", user: "Guest User", value: "93 mph", metricType: "velocity", category: "Pitching", type: "Metrics", loggedDate: "Jun 24, 2026", email: "guest_178228@guest.com" },
  { id: 3, datetime: "Jun 23, 2026 11:33 PM", user: "Sandeep M A", value: "93 mph", metricType: "velocity", category: "Pitching", type: "Metrics", loggedDate: "Jun 24, 2026", email: "sandeep@example.com" },
  { id: 4, datetime: "Jun 23, 2026 8:04 PM", user: "Will Hiers", value: "7.3 seconds", metricType: "velocity", category: "Speed", type: "Metrics", loggedDate: "Jun 23, 2026", email: "will@example.com" },
  { id: 5, datetime: "Jun 23, 2026 8:03 PM", user: "Will Hiers", value: "0", metricType: "Ks", category: "Game Stats", type: "Game Stats", loggedDate: "Jun 23, 2026", email: "will@example.com" },
  { id: 6, datetime: "Jun 23, 2026 8:03 PM", user: "Will Hiers", value: "0", metricType: "HR", category: "Game Stats", type: "Game Stats", loggedDate: "Jun 23, 2026", email: "will@example.com" },
  { id: 7, datetime: "Jun 23, 2026 8:03 PM", user: "Will Hiers", value: "2", metricType: "AB", category: "Game Stats", type: "Game Stats", loggedDate: "Jun 23, 2026", email: "will@example.com" },
];

const hittingMetrics = [
  { id: 1, date: "Jun 23, 2026 11:55 PM", user: "Guest User", value: "95 mph" },
  { id: 2, date: "Jun 23, 2026 6:03 PM", user: "Jett", value: "58 mph" },
  { id: 3, date: "Jun 23, 2026 1:40 PM", user: "Nolan Lennox", value: "75 mph" },
  { id: 4, date: "Jun 23, 2026 9:35 AM", user: "Sandeep M A", value: "120 mph" },
  { id: 5, date: "Jun 22, 2026 11:56 PM", user: "Maddox", value: "103 mph" },
];

const pitchingMetrics = [
  { id: 1, date: "Jun 23, 2026 11:49 PM", user: "Guest User", value: "93 mph" },
  { id: 2, date: "Jun 23, 2026 11:33 PM", user: "Sandeep M A", value: "93 mph" },
  { id: 3, date: "Jun 23, 2026 6:05 PM", user: "Jett", value: "57 mph" },
  { id: 4, date: "Jun 23, 2026 1:39 PM", user: "Nolan Lennox", value: "69 mph" },
  { id: 5, date: "Jun 23, 2026 7:35 AM", user: "Aj", value: "50 mph" },
];

const ofInfMetrics = [
  { id: 1, date: "Jun 23, 2026 6:05 PM", user: "Jett", value: "56 mph" },
  { id: 2, date: "Jun 21, 2026 6:56 PM", user: "Kingston Cooper", value: "76 mph" },
  { id: 3, date: "Jun 19, 2026 10:59 AM", user: "Colt Lester", value: "70 mph" },
];

const speedMetrics = [
  { id: 1, date: "Jun 23, 2026 8:04 PM", user: "Will Hiers", value: "7.3 seconds" },
  { id: 2, date: "Jun 23, 2026 6:06 PM", user: "Jett", value: "7.1 seconds" },
  { id: 3, date: "Jun 23, 2026 9:51 AM", user: "Sandeep M A", value: "7.6 seconds" },
];

// Chart Data
const submissionsOverTime = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  count: Math.floor(Math.random() * 40) + 5,
}));

const submissionsByType = [
  { name: 'Metrics', value: 75, color: '#0ea5e9' },
  { name: 'Game Stats', value: 25, color: '#6366f1' },
];

const submissionsByMetricType = [
  { name: 'velocity', count: 340 },
  { name: 'AB', count: 320 },
  { name: 'Ks', count: 220 },
  { name: 'HR', count: 120 },
  { name: 'Sprint', count: 50 },
];

const topActiveUsers = [
  { name: 'Will Hiers', count: 70 },
  { name: 'Sandeep M A', count: 68 },
  { name: 'Jett', count: 60 },
  { name: 'Guest User', count: 35 },
  { name: 'Nolan', count: 32 },
];

// Deep Dive Mock
const deepDiveExitVelocity = [
  { date: "10 Jun", value: 98 },
  { date: "15 Jun", value: 100 },
  { date: "18 Jun", value: 101 },
  { date: "20 Jun", value: 103 },
  { date: "22 Jun", value: 98 },
];

// --- Components ---

const ThemeCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a0a0c] border border-white/5 rounded-xl overflow-hidden shadow-2xl relative ${className}`}>
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    {children}
  </div>
);

const Pill = ({ children, colorTheme }: { children: React.ReactNode, colorTheme: string }) => {
  const themes: Record<string, string> = {
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    slate: "bg-white/5 text-slate-300 border-white/10",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${themes[colorTheme] || themes.slate} inline-block whitespace-nowrap`}>
      {children}
    </span>
  );
};

export default function ProgressAnalytics() {
  const [activeTab, setActiveTab] = useState<"overview" | "deepdive">("overview");
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [deepDiveTab, setDeepDiveTab] = useState("Metrics Performance");

  const handleRowClick = (userEmail: string, userName: string) => {
    setSelectedUser({ name: userName, email: userEmail });
    setActiveTab("deepdive");
  };

  // --- Views ---

  const renderOverview = () => (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* 4 Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ThemeCard>
          <div className="p-4 border-b border-white/5 font-bold text-white">Submissions Over Time (90d)</div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={submissionsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="date" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ThemeCard>

        <ThemeCard>
          <div className="p-4 border-b border-white/5 font-bold text-white">Submissions by Type</div>
          <div className="h-64 p-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={submissionsByType} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {submissionsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ThemeCard>

        <ThemeCard>
          <div className="p-4 border-b border-white/5 font-bold text-white">Submissions by Metric Type</div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={submissionsByMetricType}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ThemeCard>

        <ThemeCard>
          <div className="p-4 border-b border-white/5 font-bold text-white">Top 10 Most Active Users</div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topActiveUsers}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#ffffff05' }} contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ThemeCard>
      </div>

      {/* Recent Submission Logs Table */}
      <ThemeCard>
        <div className="p-5 border-b border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-xl font-extrabold text-white">Recent Submission Logs</h2>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
              Download All Data
            </button>
          </div>
          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 text-sm mr-2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">User</span>
              <select className="bg-transparent text-slate-300 text-sm focus:outline-none w-full appearance-none">
                <option>Select an option</option>
              </select>
            </div>
            <div className="flex items-center bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 text-sm mr-2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">Skill level</span>
              <select className="bg-transparent text-slate-300 text-sm focus:outline-none w-full appearance-none">
                <option>Select an option</option>
              </select>
            </div>
            <div className="flex items-center bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 text-sm mr-2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">Source</span>
              <input type="text" placeholder="null" className="bg-transparent text-slate-300 text-sm focus:outline-none w-full" />
            </div>
            <div className="flex items-center bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors">
              <span className="text-slate-500 text-sm mr-2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">Date Logged</span>
              <input type="text" placeholder="Start date - End date" className="bg-transparent text-slate-300 text-sm focus:outline-none w-full" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
              <tr>
                <th className="p-4 font-medium">Date time</th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Metrics type</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Logged Date</th>
                <th className="p-4 font-medium">User email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentLogs.map((log) => (
                <tr 
                  key={log.id} 
                  onClick={() => handleRowClick(log.email, log.user)}
                  className="hover:bg-white/[0.03] cursor-pointer transition-colors border-0 group"
                >
                  <td className="p-4 border-0 text-slate-400 whitespace-nowrap">{log.datetime}</td>
                  <td className="p-4 border-0 font-medium text-white">{log.user}</td>
                  <td className="p-4 border-0">{log.value}</td>
                  <td className="p-4 border-0 text-slate-400">{log.metricType}</td>
                  <td className="p-4 border-0">
                    <Pill colorTheme={
                      log.category === "Hitting" ? "orange" : 
                      log.category === "Pitching" ? "blue" : 
                      log.category === "Speed" ? "purple" : 
                      log.category === "Game Stats" ? "yellow" : "slate"
                    }>{log.category}</Pill>
                  </td>
                  <td className="p-4 border-0">
                    <Pill colorTheme={
                      log.type === "Metrics" ? "blue" : 
                      log.type === "Game Stats" ? "yellow" : "slate"
                    }>{log.type}</Pill>
                  </td>
                  <td className="p-4 border-0 text-slate-400">{log.loggedDate}</td>
                  <td className="p-4 border-0 text-blue-400 group-hover:text-blue-300 transition-colors truncate max-w-[150px]">{log.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-white/5 text-center text-xs text-slate-500">
          20 results
        </div>
      </ThemeCard>

      {/* Specific Metric Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hitting */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between items-start">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">⚾</span> Hitting Metrics
            </h3>
            <div className="text-right">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">30-Days Average of All Users</div>
              <div className="text-2xl font-bold text-blue-400">85.87 <span className="text-sm font-medium">MPH</span></div>
            </div>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Exit velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {hittingMetrics.map(row => (
                <tr key={row.id} onClick={() => handleRowClick(row.user + "@example.com", row.user)} className="hover:bg-white/[0.03] cursor-pointer">
                  <td className="p-3 text-slate-400 whitespace-nowrap text-xs">{row.date}</td>
                  <td className="p-3"><Pill colorTheme="yellow">{row.user}</Pill></td>
                  <td className="p-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ThemeCard>

        {/* Pitching */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between items-start">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">⚡</span> Pitching Metrics
            </h3>
            <div className="text-right">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">30-Days Average of All Users</div>
              <div className="text-2xl font-bold text-blue-400">74.66 <span className="text-sm font-medium">MPH</span></div>
            </div>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Pitch Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pitchingMetrics.map(row => (
                <tr key={row.id} onClick={() => handleRowClick(row.user + "@example.com", row.user)} className="hover:bg-white/[0.03] cursor-pointer">
                  <td className="p-3 text-slate-400 whitespace-nowrap text-xs">{row.date}</td>
                  <td className="p-3"><Pill colorTheme={row.user === "Sandeep M A" ? "blue" : row.user === "Aj" ? "rose" : "yellow"}>{row.user}</Pill></td>
                  <td className="p-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ThemeCard>

        {/* OF/INF */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between items-start">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">🎯</span> OF/INF Metrics
            </h3>
            <div className="text-right">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">30-Days Average of All Users</div>
              <div className="text-2xl font-bold text-blue-400">73.71 <span className="text-sm font-medium">MPH</span></div>
            </div>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Throw Velocity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ofInfMetrics.map(row => (
                <tr key={row.id} onClick={() => handleRowClick(row.user + "@example.com", row.user)} className="hover:bg-white/[0.03] cursor-pointer">
                  <td className="p-3 text-slate-400 whitespace-nowrap text-xs">{row.date}</td>
                  <td className="p-3"><Pill colorTheme={row.user === "Kingston Cooper" ? "purple" : row.user === "Kayden" ? "rose" : "yellow"}>{row.user}</Pill></td>
                  <td className="p-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ThemeCard>

        {/* Speed */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between items-start">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-xl">🏃</span> Speed Metrics
            </h3>
            <div className="text-right">
              <div className="text-xs text-blue-400 font-semibold uppercase tracking-wider mb-0.5">30-Days Average of All Users</div>
              <div className="text-2xl font-bold text-blue-400">7.23 <span className="text-sm font-medium">Sec</span></div>
            </div>
          </div>
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
              <tr>
                <th className="p-3">Date</th>
                <th className="p-3">User</th>
                <th className="p-3">Sprint Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {speedMetrics.map(row => (
                <tr key={row.id} onClick={() => handleRowClick(row.user + "@example.com", row.user)} className="hover:bg-white/[0.03] cursor-pointer">
                  <td className="p-3 text-slate-400 whitespace-nowrap text-xs">{row.date}</td>
                  <td className="p-3"><Pill colorTheme={row.user === "Will Hiers" ? "orange" : "yellow"}>{row.user}</Pill></td>
                  <td className="p-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ThemeCard>
      </div>
    </motion.div>
  );

  const renderDeepDive = () => {
    if (!selectedUser) return null;
    return (
      <motion.div
        key="deepdive"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab("overview")}
            className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-extrabold text-white">{selectedUser.name}</h2>
          <div className="ml-auto bg-[#0a0a0c] border border-white/10 rounded-lg px-3 py-1.5 focus-within:border-blue-500 transition-colors flex items-center">
            <span className="text-slate-500 text-sm mr-2 whitespace-nowrap bg-white/5 px-2 py-1 rounded">User</span>
            <select className="bg-transparent text-slate-300 text-sm focus:outline-none appearance-none pr-4">
              <option>{selectedUser.name}</option>
            </select>
          </div>
        </div>

        {/* User Stats Banner */}
        <ThemeCard className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/5">
          <div className="p-5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Email</div>
            <div className="text-blue-400 font-medium truncate" title={selectedUser.email}>{selectedUser.email}</div>
          </div>
          <div className="p-5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Signup Date</div>
            <div className="text-white font-bold">2026-06-24</div>
          </div>
          <div className="p-5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Total Submissions</div>
            <div className="text-white font-bold">2</div>
          </div>
          <div className="p-5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Last Active</div>
            <div className="text-white font-bold">2026-06-24</div>
          </div>
          <div className="p-5">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2">Days Active</div>
            <div className="text-white font-bold">1</div>
          </div>
        </ThemeCard>

        {/* Inner Tabs */}
        <div className="flex border-b border-white/10 mt-6">
          {["Metrics Performance", "Game Stats", "Journal", "Programs"].map(tab => (
            <button
              key={tab}
              onClick={() => setDeepDiveTab(tab)}
              className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${
                deepDiveTab === tab 
                  ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {deepDiveTab === "Metrics Performance" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
            {/* Exit Velocity */}
            <ThemeCard>
              <div className="p-5 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Exit Velocity</h3>
                <div className="flex gap-2">
                  <Pill colorTheme="rose">AVG: 95.0 MPH</Pill>
                  <Pill colorTheme="orange">PR: 95MPH</Pill>
                </div>
              </div>
              <div className="h-64 p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={deepDiveExitVelocity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} domain={[0, 'dataMax + 10']} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <table className="w-full text-left text-sm text-slate-300 border-t border-white/5">
                <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
                  <tr>
                    <th className="p-3">Logged Date</th>
                    <th className="p-3">value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3 text-slate-400">Jun 22, 2026</td>
                    <td className="p-3">98 mph</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3 text-slate-400">Jun 21, 2026</td>
                    <td className="p-3">100 mph</td>
                  </tr>
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3 text-slate-400">Jun 20, 2026</td>
                    <td className="p-3">103 mph</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-3 border-t border-white/5 text-center text-xs text-slate-500">
                5 results
              </div>
            </ThemeCard>

            {/* Pitch Speed */}
            <ThemeCard>
              <div className="p-5 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Pitch Speed</h3>
                <div className="flex gap-2">
                  <Pill colorTheme="blue">AVG: 93.0 MPH</Pill>
                  <Pill colorTheme="purple">PR: 93MPH</Pill>
                </div>
              </div>
              <div className="h-64 p-5">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[{ date: "24 Jun", value: 93 }]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                    <XAxis dataKey="date" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} domain={[40, 100]} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <table className="w-full text-left text-sm text-slate-300 border-t border-white/5">
                <thead className="bg-white/[0.02] border-b border-white/5 text-slate-400">
                  <tr>
                    <th className="p-3">Logged Date</th>
                    <th className="p-3">value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr className="hover:bg-white/[0.03]">
                    <td className="p-3 text-slate-400">Jun 24, 2026</td>
                    <td className="p-3">93 mph</td>
                  </tr>
                </tbody>
              </table>
            </ThemeCard>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="min-h-full bg-transparent p-6 lg:p-8 selection:bg-blue-500/30">
      
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Progress Analytics</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex gap-2 mb-8 bg-[#0a0a0c] p-1 border border-white/5 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "overview" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          Usage Overview
        </button>
        <button 
          onClick={() => setActiveTab("deepdive")}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === "deepdive" 
              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          User Deep Dive
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" ? renderOverview() : renderDeepDive()}
      </AnimatePresence>

    </div>
  );
}
