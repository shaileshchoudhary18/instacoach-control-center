"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, Activity, Building, Key, Ticket, Search, 
  Filter, Plus, Calendar, Download, RefreshCw, X, ChevronDown, ChevronRight
} from "lucide-react";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, ResponsiveContainer 
} from "recharts";

// Mock Data for Charts
const paywallData = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  users: 310 + Math.floor(Math.random() * 20),
}));

const trialData = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  starts: i % 7 === 0 ? 1 : 0,
}));

const cancelData = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  cancelled: i % 10 === 2 ? Math.floor(Math.random() * 3) + 1 : 0,
}));

const netGrowthData = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  growth: Math.sin(i / 2) * 2 + (Math.random() - 0.5),
}));

// Mock Data for Tables
const subscribers = [
  { id: "01726...", name: "d.billy08@yahoo.com", plan: "external_paid", status: "active", enrolled: "Dec 29, 2025", source: "external" },
  { id: "02492...", name: "Ryan Niehoff", plan: "yearly", status: "active", enrolled: "Feb 12, 2026", source: "internal" },
  { id: "025b2...", name: "Jaxsen", plan: "yearly", status: "active", enrolled: "Jan 28, 2026", source: "internal" },
  { id: "027f8...", name: "Joe", plan: "monthly", status: "active", enrolled: "Feb 4, 2026", source: "internal" },
];

const organizations = [
  { view: "View Users", name: "INC Test Org", id: "974e3cf7...", created: "Jan 27, 2026", users: 6 },
  { view: "View Users", name: "Retool Test", id: "29909f7a...", created: "Jan 26, 2026", users: 0 },
  { view: "View Users", name: "Roderick's Org", id: "0cd4b3ab...", created: "Jan 21, 2026", users: 1 },
];

const redeemCodes = [
  { view: "View Redeemers", code: "RodPromo", status: "active", limit: 4, count: 1, summary: "This is a real test", created: "Jan 21, 2026", orgId: "0cd4b3ab..." },
  { view: "View Redeemers", code: "TESTONLY", status: "disabled", limit: 1, count: 1, summary: "Test Only", created: "Feb 3, 2026", orgId: "d2614b82..." },
];

// UI Components
const Card = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative ${className}`}>
    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    {children}
  </div>
);

const StatBadge = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="flex items-center gap-4 p-5">
    <div className={`p-3 rounded-xl bg-white/5 ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-400 font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
    </div>
  </div>
);

const SectionHeader = ({ title, action }: any) => (
  <div className="flex items-center justify-between p-5 border-b border-white/5">
    <h2 className="text-lg font-semibold text-white tracking-wide">{title}</h2>
    {action && action}
  </div>
);

const Badge = ({ children, status }: { children: React.ReactNode, status?: string }) => {
  const colors = {
    active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    disabled: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    external: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    internal: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    default: "bg-slate-500/10 text-slate-400 border-slate-500/20"
  };
  const color = colors[status as keyof typeof colors] || colors.default;
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${color}`}>
      {children}
    </span>
  );
};

export default function PromotionsControl() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-full bg-transparent text-slate-200 p-6 lg:p-8 font-sans selection:bg-indigo-500/30">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
            Promotions Control
            <div className="h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
          </h1>
          <p className="text-slate-400">Manage subscriptions, paywalls, organizations, and promo codes.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 bg-[#0f0f11] border border-white/5 p-1 rounded-xl"
        >
          {["overview", "subscribers", "organizations", "codes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 capitalize ${
                activeTab === tab 
                  ? "bg-indigo-500/10 text-indigo-400 shadow-sm border border-indigo-500/20" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* KPI Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="lg:col-span-1">
                <StatBadge title="Active Trial Users" value="1" icon={Users} colorClass="text-blue-400" />
              </Card>
              <Card className="lg:col-span-1">
                <StatBadge title="Active Paid Users" value="412" icon={Users} colorClass="text-indigo-400" />
              </Card>
              <Card className="lg:col-span-1">
                <StatBadge title="Total Organizations" value="9" icon={Building} colorClass="text-purple-400" />
              </Card>
              <Card className="lg:col-span-1">
                <StatBadge title="Active Codes" value="7" icon={Key} colorClass="text-emerald-400" />
              </Card>
              <Card className="lg:col-span-1">
                <StatBadge title="Total Redemptions" value="15" icon={Ticket} colorClass="text-pink-400" />
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <SectionHeader 
                  title="Paywall Active Users" 
                  action={
                    <div className="flex gap-2">
                      <span className="text-xs bg-white/5 px-2 py-1 rounded text-slate-400">May 23 - Jun 23</span>
                    </div>
                  } 
                />
                <div className="h-72 p-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={paywallData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                      <Line type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} dot={false} activeDot={{ r: 6, fill: '#6366f1', stroke: '#000', strokeWidth: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionHeader title="Net Subscription Growth" />
                <div className="h-72 p-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={netGrowthData}>
                      <defs>
                        <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="growth" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorGrowth)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionHeader title="Trial Starts" />
                <div className="h-64 p-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trialData}>
                      <defs>
                        <linearGradient id="colorStarts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="starts" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorStarts)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card>
                <SectionHeader title="Cancelled Users" />
                <div className="h-64 p-5">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cancelData}>
                      <defs>
                        <linearGradient id="colorCancel" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" vertical={false} />
                      <XAxis dataKey="date" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip contentStyle={{ backgroundColor: '#0f0f11', border: '1px solid #ffffff1a', borderRadius: '8px' }} />
                      <Area type="monotone" dataKey="cancelled" stroke="#f43f5e" strokeWidth={2} fillOpacity={1} fill="url(#colorCancel)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {activeTab === "subscribers" && (
          <motion.div key="subscribers" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <Card>
              <SectionHeader 
                title="Subscribers List" 
                action={
                  <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-indigo-500/20">
                    <Plus className="w-4 h-4" /> Enroll User
                  </button>
                }
              />
              <div className="p-4 border-b border-white/5 grid grid-cols-1 md:grid-cols-5 gap-4 bg-white/[0.02]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="text" placeholder="Search Email..." className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="relative">
                  <input type="text" placeholder="Client ID" className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div className="relative md:col-span-2 flex gap-2">
                  <div className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-sm flex items-center text-slate-400">
                    <Calendar className="w-4 h-4 mr-2" /> Start date - End date
                  </div>
                </div>
                <div className="flex justify-end items-center gap-2">
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"><Filter className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"><Download className="w-4 h-4" /></button>
                  <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"><RefreshCw className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">User ID</th>
                      <th className="p-4 font-medium">User Name</th>
                      <th className="p-4 font-medium">Plan Type</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Enrolled At</th>
                      <th className="p-4 font-medium">Source</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscribers.map((sub, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="p-4 font-mono text-xs">{sub.id}</td>
                        <td className="p-4">
                          <span className="bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-md">{sub.name}</span>
                        </td>
                        <td className="p-4 capitalize">{sub.plan}</td>
                        <td className="p-4"><Badge status={sub.status}>{sub.status}</Badge></td>
                        <td className="p-4">{sub.enrolled}</td>
                        <td className="p-4"><Badge status={sub.source}>{sub.source}</Badge></td>
                        <td className="p-4 text-right">
                          <button className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors opacity-0 group-hover:opacity-100">
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <SectionHeader title="New Subscriptions by Plan Type" />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">Plan type</th>
                      <th className="p-4 font-medium text-right">Subscriber count</th>
                      <th className="p-4 font-medium text-right">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-4 bg-indigo-500/5">yearly</td>
                      <td className="p-4 text-right">141</td>
                      <td className="p-4 text-right text-indigo-400 font-medium">34.2%</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-4">monthly</td>
                      <td className="p-4 text-right">129</td>
                      <td className="p-4 text-right">31.3%</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-4">external_paid</td>
                      <td className="p-4 text-right">118</td>
                      <td className="p-4 text-right">28.6%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "organizations" && (
          <motion.div key="organizations" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <Card>
              <SectionHeader 
                title="Organizations Management" 
                action={
                  <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">
                    <Plus className="w-4 h-4" /> Add Organization
                  </button>
                }
              />
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">View</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">ID</th>
                      <th className="p-4 font-medium">Created at</th>
                      <th className="p-4 font-medium text-right">Number of users</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {organizations.map((org, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                            {org.view}
                          </button>
                        </td>
                        <td className="p-4 font-medium text-white">{org.name}</td>
                        <td className="p-4 font-mono text-xs text-slate-500">{org.id}</td>
                        <td className="p-4">{org.created}</td>
                        <td className="p-4 text-right text-purple-400 font-bold">{org.users}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card>
              <SectionHeader 
                title="Exclusion List For Paywall" 
                action={
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Add User to Exclusion List
                  </button>
                }
              />
               <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">User ID</th>
                      <th className="p-4 font-medium">Email</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Created at</th>
                      <th className="p-4 font-medium text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="p-4 font-mono text-xs">6fd67e...</td>
                      <td className="p-4 text-blue-400">jk@mailnesia.com</td>
                      <td className="p-4">JK Jeon</td>
                      <td className="p-4">Apr 9, 2026</td>
                      <td className="p-4 text-right">
                        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === "codes" && (
          <motion.div key="codes" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
            <Card>
              <SectionHeader 
                title="Redeem Codes" 
                action={
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-500/20">
                    <Key className="w-4 h-4" /> Generate Codes
                  </button>
                }
              />
              <div className="p-4 border-b border-white/5">
                <div className="w-64 relative">
                  <select className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-emerald-500 appearance-none">
                    <option value="">Select Organization...</option>
                    <option value="1">INC Test Org</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.03] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">View</th>
                      <th className="p-4 font-medium">Promo Code</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Limit</th>
                      <th className="p-4 font-medium">Redeemed</th>
                      <th className="p-4 font-medium">Summary</th>
                      <th className="p-4 font-medium">Created at</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {redeemCodes.map((code, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <button className="bg-slate-700/30 hover:bg-slate-700/50 text-slate-300 border border-slate-600/30 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                            {code.view}
                          </button>
                        </td>
                        <td className="p-4 font-mono text-emerald-400 font-medium">{code.code}</td>
                        <td className="p-4"><Badge status={code.status}>{code.status}</Badge></td>
                        <td className="p-4">{code.limit}</td>
                        <td className="p-4">{code.count}</td>
                        <td className="p-4 truncate max-w-[150px]">{code.summary}</td>
                        <td className="p-4 text-slate-500">{code.created}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
