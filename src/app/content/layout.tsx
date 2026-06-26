"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { name: "Video Repo", href: "/content/video-repo" },
  { name: "Workouts", href: "/content/workout" },
];

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-full flex flex-col">
      <div className="bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-30 pt-6 px-8 flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Content & Programs</h1>
          <p className="text-sm font-medium text-slate-400 mt-1">Manage all your platform content, drills, and workouts.</p>
        </div>
        <div className="flex gap-6">
          {tabs.map((tab) => {
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link key={tab.name} href={tab.href} className="relative pb-3">
                <span className={`text-sm font-bold transition-colors ${isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"}`}>
                  {tab.name}
                </span>
                {isActive && (
                  <motion.div layoutId="content-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-t-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex-1 relative z-10">
        {children}
      </div>
    </div>
  );
}
