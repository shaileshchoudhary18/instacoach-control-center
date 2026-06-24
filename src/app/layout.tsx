import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Instacoach Control Center",
  description: "Modern analytics and management platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex h-screen overflow-hidden bg-[#050505] text-slate-100 relative">
        {/* Subtle Animating Sunray/Light Beam Overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-100 mix-blend-screen">
          <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(99,102,241,0.15)_45deg,transparent_90deg,rgba(168,85,247,0.15)_135deg,transparent_180deg,rgba(99,102,241,0.15)_225deg,transparent_270deg,rgba(168,85,247,0.15)_315deg,transparent_360deg)] animate-[spin_60s_linear_infinite]" />
        </div>
        <Sidebar />
        <main className="flex-1 h-full overflow-y-auto overflow-x-hidden relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
