"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Plus, Map, ListOrdered, ChevronRight, 
  Trash2, X, Info, Edit, GripVertical
} from "lucide-react";

// --- Mock Data ---

const predefinedWorkouts = [
  { id: 1, order: 1, title: "Brandon's Game Day Routine", creator: "Brandon Stahlman", status: "Active" },
  { id: 2, order: 2, title: "Position Player Stretching", creator: "Brandon Stahlman", status: "Active" },
  { id: 3, order: 3, title: "Core Workout", creator: "Brandon Stahlman", status: "Active" },
  { id: 4, order: 4, title: "Test", creator: "Blake Atkins", status: "Inactive" },
  { id: 5, order: 5, title: "Skill Work", creator: "Brandon Stahlman", status: "Active" },
];

const contentLibrary = [
  { id: 1, title: "How to Do Push Ups", creator: "Ezra Samperi", type: "how_to" },
  { id: 2, title: "How to Do Pull Ups", creator: "Ezra Samperi", type: "how_to" },
  { id: 3, title: "How to Bench Press", creator: "Ezra Samperi", type: "how_to" },
  { id: 4, title: "How to Back Squat", creator: "Ezra Samperi", type: "how_to" },
  { id: 5, title: "How to RDL", creator: "Ezra Samperi", type: "how_to" },
];

const categoriesData = [
  { id: 'd7c2cc87-b86a-455d...', order: 1, title: "Mental Performance", type: "mixed", created: "Mar 17, 2026 8:13 PM", updated: "Mar 25, 2026 12:09 AM" },
  { id: '61749135-43a6-4a9f...', order: 2, title: "Game Day Routines", type: "mixed", created: "Mar 17, 2026 8:12 PM", updated: "Mar 25, 2026 12:09 AM" },
  { id: 'b741b664-556e-4235...', order: 3, title: "Recovery", type: "text", created: "Mar 17, 2026 8:13 PM", updated: "Mar 24, 2026 3:04 PM" },
];

const categoryWorkouts = [
  { id: 1, title: "Calming Your Nerves", creator: "Cole Hinkelman", type: "audio", name: "Calming Your Nerves" },
  { id: 2, title: "Focusing Your Mind", creator: "Cole Hinkelman", type: "audio", name: "Focusing Your Mind" },
  { id: 3, title: "How to Read Scouting Reports", creator: "Brandon Stahlman", type: "text", name: "How to Read Scouting Reports" },
];

const manageQuestions = [
  { id: "1e0e44cc-...", question: "Which baseball position do you like the most?", options: ["Pitcher", "Catcher", "First Base"], focus: null },
  { id: "7e1f8129-...", question: "What do you want to work on?", options: ["Hitting", "Pitching", "Infield"], focus: null },
  { id: "81e64765-...", hierarchy: "Hitting", question: "What do you want to include in your workout?", options: ["Mobility", "Dry Reps", "Water Bag"], focus: null },
  { id: "403e3f96-...", hierarchy: "Pitching", question: "What do you want to focus on?", options: ["Catch Play", "Mechanics", "Pickoffs"], focus: null },
];

const sectionBuilderFocus = [
  { id: "5f13a091-...", focus: "Hitting" },
  { id: "3e1f6d43-...", focus: "Defined Workouts" },
  { id: "fc1d081a-...", focus: "Outfield" },
];

const sectionBuilderDrills = [
  { id: 1, title: "Bat Speed", focus: "Hitting", subLevels: "", created: "Mar 13, 2026 12:47 PM", updated: "Mar 13, 2026 12:47 PM" },
  { id: 2, title: "Front Toss", focus: "Hitting", subLevels: "", created: "Mar 13, 2026 12:48 PM", updated: "Mar 13, 2026 12:48 PM" },
  { id: 3, title: "Catch Play Drills", focus: "Pitching", subLevels: "Catch Play", created: "Mar 13, 2026 4:21 PM", updated: "Mar 13, 2026 4:21 PM" },
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
    pink: "bg-pink-500/10 text-pink-400 border-pink-500/20",
    yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    teal: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    slate: "bg-white/5 text-slate-300 border-white/10",
    red: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    orange: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-medium border ${themes[colorTheme] || themes.slate} inline-block whitespace-nowrap`}>
      {children}
    </span>
  );
};

// --- Modals ---

const ModalContainer = ({ isOpen, onClose, title, children }: any) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#050505]/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-50 p-4 max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden"
        >
          <div className="bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/5 bg-[#0a0a0c] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Drag and drop reorderable list component (mock interaction)
const DraggableList = ({ items }: { items: any[] }) => {
  const [list, setList] = useState(items);
  
  const moveItem = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= list.length) return;
    const newList = [...list];
    const temp = newList[index];
    newList[index] = newList[newIndex];
    newList[newIndex] = temp;
    setList(newList);
  };

  return (
    <div className="bg-[#0a0a0c] border border-white/10 rounded-lg overflow-hidden divide-y divide-white/5">
      {list.map((item, index) => (
        <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-white/[0.02] transition-colors group">
          <GripVertical className="w-4 h-4 text-slate-600 cursor-move" />
          <span className="font-bold text-slate-500 w-6 text-right">{index + 1}</span>
          <span className="font-bold text-white flex-1">{item.title}</span>
          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => moveItem(index, -1)} className="text-slate-500 hover:text-white px-2">▲</button>
            <button onClick={() => moveItem(index, 1)} className="text-slate-500 hover:text-white px-2">▼</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Workouts() {
  const [activeTab, setActiveTab] = useState("Categories");
  
  // Category View State
  const [activeCategoryView, setActiveCategoryView] = useState<string | null>(null);

  // Modal States
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAddWorkoutModalOpen, setIsAddWorkoutModalOpen] = useState(false);
  const [isAddContentModalOpen, setIsAddContentModalOpen] = useState(false);
  const [isReorderModalOpen, setIsReorderModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditQuestionModalOpen, setIsEditQuestionModalOpen] = useState(false);
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  // --- 1. Categories Tab ---
  const renderCategoriesTab = () => {
    if (activeCategoryView) {
      return (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => setActiveCategoryView(null)} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Back to Categories
            </button>
            <h1 className="text-2xl font-bold text-white">Edit Category</h1>
          </div>

          <ThemeCard>
            <div className="p-6 space-y-5 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
                  <input type="text" defaultValue="Mental Performance" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Type</label>
                  <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                    <option>mixed</option>
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Sort Order</label>
                <input type="number" defaultValue="1" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div>
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-purple-500/20">
                  Submit
                </button>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">Workouts / Audio, Articles and Video</h2>
              <div className="flex gap-3 mb-6">
                <button onClick={() => setIsReorderModalOpen(true)} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">Reorder</button>
                <button onClick={() => setIsAddContentModalOpen(true)} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">Add Content</button>
                <button onClick={() => setIsMapModalOpen(true)} className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg text-sm font-bold transition-colors">Add/remove Workout</button>
              </div>
              
              <div className="overflow-x-auto border border-white/5 rounded-xl">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                    <tr>
                      <th className="p-4 font-medium">Title</th>
                      <th className="p-4 font-medium">Creator name</th>
                      <th className="p-4 font-medium">Type</th>
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Thumbnail URL</th>
                      <th className="p-4 font-medium"></th>
                      <th className="p-4 font-medium">View Section</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {categoryWorkouts.map((cw) => (
                      <tr key={cw.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">{cw.title}</td>
                        <td className="p-4">{cw.creator}</td>
                        <td className="p-4">{cw.type}</td>
                        <td className="p-4">{cw.name}</td>
                        <td className="p-4 text-blue-400 truncate max-w-[150px]">https://storage.googl...</td>
                        <td className="p-4"><button className="text-slate-500 hover:text-rose-400"><Trash2 className="w-4 h-4" /></button></td>
                        <td className="p-4">
                          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ThemeCard>
        </motion.div>
      );
    }

    return (
      <motion.div key="categories" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
        {/* Pre-Defined Workouts Repository */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">Pre-Defined Workouts Repository</h2>
                <span className="bg-white/10 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">5</span>
              </div>
              <p className="text-sm text-slate-400">Reusable workout templates that can be mapped into client sections</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsMapModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white rounded-lg text-sm font-semibold transition-all">
                <Map className="w-4 h-4" /> Map Pre-defined Workout to Section
              </button>
              <button onClick={() => setIsAddWorkoutModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                <Plus className="w-4 h-4" /> Add Pre-Defined Workout
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium w-24 text-center">Sort order</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Creator name</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {predefinedWorkouts.map((workout) => (
                  <tr key={workout.id} className="hover:bg-white/[0.02] transition-colors border-0">
                    <td className="p-4 border-0 text-center text-slate-400">{workout.order}</td>
                    <td className="p-4 border-0 font-medium text-white">{workout.title}</td>
                    <td className="p-4 border-0"><Pill colorTheme={workout.creator === "Brandon Stahlman" ? "pink" : "yellow"}>{workout.creator}</Pill></td>
                    <td className="p-4 border-0"><Pill colorTheme={workout.status === "Active" ? "green" : "slate"}>{workout.status}</Pill></td>
                    <td className="p-4 border-0">
                      <button className="flex items-center gap-1 px-4 py-1.5 bg-white/5 hover:bg-white/10 text-blue-400 rounded-lg border border-white/5 transition-colors text-xs font-semibold">
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeCard>

        {/* Content Library */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">Content Library</h2>
                <span className="bg-white/10 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">64</span>
              </div>
            </div>
            <button onClick={() => setIsAddContentModalOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
              <Plus className="w-4 h-4" /> Add Content
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium">Drill title</th>
                  <th className="p-4 font-medium">Creator name</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {contentLibrary.map((drill) => (
                  <tr key={drill.id} className="hover:bg-white/[0.02] transition-colors border-0">
                    <td className="p-4 border-0 text-white">{drill.title}</td>
                    <td className="p-4 border-0"><Pill colorTheme="green">{drill.creator}</Pill></td>
                    <td className="p-4 border-0 text-slate-400">{drill.type}</td>
                    <td className="p-4 border-0">
                      <button className="flex items-center gap-1 px-4 py-1.5 bg-white/5 hover:bg-white/10 text-blue-400 rounded-lg border border-white/5 transition-colors text-xs font-semibold">
                        View <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeCard>

        {/* Categories */}
        <ThemeCard>
          <div className="p-5 border-b border-white/5 flex justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-bold text-white">Categories</h2>
                <span className="bg-white/10 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">7</span>
              </div>
              <p className="text-sm text-slate-400">Content categories shown in the client app. Drag rows to reorder.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsReorderModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/10 hover:bg-white/5 text-slate-300 hover:text-white rounded-lg text-sm font-semibold transition-all">
                <ListOrdered className="w-4 h-4" /> Reorder category
              </button>
              <button onClick={() => setIsAddCategoryModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20">
                <Plus className="w-4 h-4" /> Add category
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium w-32"></th>
                  <th className="p-4 font-medium w-24 text-center">Sort order</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Created at</th>
                  <th className="p-4 font-medium w-16 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {categoriesData.map((cat) => (
                  <tr key={cat.id} className="hover:bg-white/[0.02] transition-colors border-0">
                    <td className="p-4 border-0">
                      <button onClick={() => setActiveCategoryView(cat.id)} className="flex items-center gap-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-400 rounded-lg border border-white/5 transition-colors text-xs font-bold whitespace-nowrap">
                        View Category <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                    <td className="p-4 border-0 text-center text-slate-400">{cat.order}</td>
                    <td className="p-4 border-0"><Pill colorTheme={cat.order % 2 === 0 ? "pink" : "blue"}>{cat.title}</Pill></td>
                    <td className="p-4 border-0 text-slate-400">{cat.type}</td>
                    <td className="p-4 border-0 text-slate-500 font-mono text-xs">{cat.id}</td>
                    <td className="p-4 border-0 text-slate-400 text-xs">{cat.created}</td>
                    <td className="p-4 border-0 text-center"><button className="text-slate-500 hover:text-rose-400 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ThemeCard>
      </motion.div>
    );
  };

  // --- 2. App Questions Tab ---
  const renderAppQuestionsTab = () => (
    <motion.div key="appQuestions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <div className="flex justify-between items-center bg-[#0a0a0c] p-4 rounded-xl border border-white/5">
        <div className="flex gap-4 items-center">
          <label className="text-sm font-bold text-slate-400">Focus Area</label>
          <select className="bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none w-64 appearance-none">
            <option>Select an option</option>
          </select>
        </div>
        <button onClick={() => setIsEditQuestionModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">
          Add Questions
        </button>
      </div>

      <ThemeCard>
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-white mb-8">Hitting</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">What do you want to work on?</h3>
              <div className="flex gap-2">
                <Pill colorTheme="orange">Hitting</Pill>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-bold text-white">What do you want to include in your workout?</h3>
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">HITTING</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Pill colorTheme="blue">Mobility</Pill>
                <Pill colorTheme="pink">Dry Reps</Pill>
                <Pill colorTheme="blue">Water Bag</Pill>
                <Pill colorTheme="purple">Medball</Pill>
                <Pill colorTheme="red">Tee Work</Pill>
                <Pill colorTheme="yellow">Bat Speed</Pill>
                <Pill colorTheme="red">Front Toss</Pill>
                <Pill colorTheme="blue">Machine/Live BP</Pill>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-b border-white/5">
          <h2 className="text-2xl font-bold text-white mb-8">Pitching</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">What do you want to focus on?</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <Pill colorTheme="purple">Catch Play</Pill>
                  <Pill colorTheme="pink">Mechanics</Pill>
                  <Pill colorTheme="blue">Pickoffs</Pill>
                </div>
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">PITCHING</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">What part of mechanics do you want to work on?</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <Pill colorTheme="green">Separation</Pill>
                  <Pill colorTheme="blue">The Block</Pill>
                  <Pill colorTheme="red">The Drift</Pill>
                  <Pill colorTheme="red">The Drop</Pill>
                </div>
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-slate-400">PITCHING &gt; MECHANICS</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Manage Questions</h2>
          <div className="overflow-x-auto border border-white/5 rounded-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
                <tr>
                  <th className="p-4 font-medium w-24">ID</th>
                  <th className="p-4 font-medium w-64">Hierarchy</th>
                  <th className="p-4 font-medium">Question</th>
                  <th className="p-4 font-medium">Options</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {manageQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => setIsEditQuestionModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded text-xs font-bold">Edit</button>
                        <span className="text-slate-500 font-mono truncate w-32">{q.id}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {q.hierarchy && <Pill colorTheme={q.hierarchy === "Hitting" ? "orange" : "blue"}>{q.hierarchy}</Pill>}
                    </td>
                    <td className="p-4 text-white font-medium">{q.question}</td>
                    <td className="p-4">
                      <div className="flex gap-2 flex-wrap">
                        {q.options.map(opt => (
                          <Pill key={opt} colorTheme={["Pitcher","Hitting"].includes(opt) ? "green" : ["Catcher","Pitching"].includes(opt) ? "orange" : "yellow"}>{opt}</Pill>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ThemeCard>
    </motion.div>
  );

  // --- 3. Section Builder Tab ---
  const renderSectionBuilderTab = () => (
    <motion.div key="sectionBuilder" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
      <ThemeCard>
        <div className="p-4 border-b border-white/5">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">Add Focus Area</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
              <tr>
                <th className="p-4 font-medium w-48">ID</th>
                <th className="p-4 font-medium">Focus area</th>
                <th className="p-4 font-medium">Sub levels</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sectionBuilderFocus.map((f) => (
                <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-slate-500 font-mono truncate">{f.id}</td>
                  <td className="p-4 text-white font-medium">{f.focus}</td>
                  <td className="p-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ThemeCard>

      <ThemeCard>
        <div className="p-4 flex justify-between items-center border-b border-white/5">
          <h2 className="text-xl font-bold text-white">Section Builder</h2>
          <button onClick={() => setIsAddSectionModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">Add New Section</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/[0.02] text-slate-400 border-b border-white/5">
              <tr>
                <th className="p-4 font-medium w-16"></th>
                <th className="p-4 font-medium w-32"></th>
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Focus area</th>
                <th className="p-4 font-medium">Sub Levels</th>
                <th className="p-4 font-medium">Created at</th>
                <th className="p-4 font-medium">Updated at</th>
                <th className="p-4 font-medium">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sectionBuilderDrills.map((drill) => (
                <tr key={drill.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 text-slate-500"><Edit className="w-4 h-4 cursor-pointer" /></td>
                  <td className="p-4"><button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">View Drill</button></td>
                  <td className="p-4 text-white font-medium">{drill.title}</td>
                  <td className="p-4"><Pill colorTheme={drill.focus === "Hitting" ? "orange" : "blue"}>{drill.focus}</Pill></td>
                  <td className="p-4">{drill.subLevels && <Pill colorTheme="purple">{drill.subLevels}</Pill>}</td>
                  <td className="p-4 text-slate-400 text-xs">{drill.created}</td>
                  <td className="p-4 text-slate-400 text-xs">{drill.updated}</td>
                  <td className="p-4"><button className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-colors">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ThemeCard>
    </motion.div>
  );

  return (
    <div className="min-h-full bg-transparent p-6 lg:p-8 selection:bg-blue-500/30 relative">
      
      {/* Top Navigation */}
      <div className="flex gap-2 mb-8 bg-[#0a0a0c] p-1 border border-white/5 rounded-xl w-fit relative z-10">
        {["Categories", "App Questions", "Section Builder"].map(tab => (
          <button 
            key={tab}
            onClick={() => { setActiveTab(tab); setActiveCategoryView(null); }}
            className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === tab 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "Categories" && renderCategoriesTab()}
        {activeTab === "App Questions" && renderAppQuestionsTab()}
        {activeTab === "Section Builder" && renderSectionBuilderTab()}
      </AnimatePresence>

      {/* --- Modals --- */}
      
      {/* Map Workout Modal */}
      <ModalContainer isOpen={isMapModalOpen} onClose={() => setIsMapModalOpen(false)} title="Map Pre-defined Workout to Section">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {["Workout", "Focus Area", "Sub Level", "Sub level 2", "Section"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">{field}</label>
                <select className="bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none appearance-none transition-colors">
                  <option>Select an option</option>
                </select>
              </div>
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5 h-full">
              <h3 className="text-blue-400 font-bold flex items-center gap-2 mb-4">
                <Info className="w-5 h-5" /> Quick Start Guide
              </h3>
              <ol className="space-y-4 text-slate-300 text-sm">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">1</div>
                  <span>Select a <strong className="text-white">Workout</strong> from the dropdown.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">2</div>
                  <span>Choose your <strong className="text-white">Focus Area and sub levels</strong> to filter available sections.</span>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">3</div>
                  <span>Pick a <strong className="text-white">Section</strong> and hit <strong className="text-emerald-400">Submit</strong>.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

      {/* Add Workout Modal */}
      <ModalContainer isOpen={isAddWorkoutModalOpen} onClose={() => setIsAddWorkoutModalOpen(false)} title="Add Pre-Defined Workout">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea placeholder="Enter value(Optional)" rows={4} className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors resize-none" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Thumbnail</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Creator</label>
            <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
              <option>Select an option(optional)</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

      {/* Add Content Modal */}
      <ModalContainer isOpen={isAddContentModalOpen} onClose={() => setIsAddContentModalOpen(false)} title="Create Article or Audio">
        <div className="space-y-5">
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg text-yellow-400 text-sm flex items-center gap-2">
            ⚠️ Select a content style for <strong className="text-yellow-300">Audio</strong> or <strong className="text-yellow-300">LFV</strong> uploads.
          </div>
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Type</label>
              <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>Select an option</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Name</label>
              <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>Select an option</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Content Style</label>
            <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
              <option>Select an option</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Description</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Duration</label>
            <input type="number" defaultValue="0" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Thumbnail URL</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-purple-500/20">Create</button>
        </div>
      </ModalContainer>

      {/* Reorder Modal (Drag and Drop List) */}
      <ModalContainer isOpen={isReorderModalOpen} onClose={() => setIsReorderModalOpen(false)} title="Reorder">
        <DraggableList items={activeCategoryView ? categoryWorkouts : categoriesData} />
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

      {/* Add Category Modal */}
      <ModalContainer isOpen={isAddCategoryModalOpen} onClose={() => setIsAddCategoryModalOpen(false)} title="Add Category">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" placeholder="Enter value" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Type</label>
            <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
              <option>Select an option</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Thumbnail URL</label>
            <input type="text" placeholder="Enter value (optional)" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Layout Type</label>
            <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
              <option>Select an option</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

      {/* Edit Question Modal */}
      <ModalContainer isOpen={isEditQuestionModalOpen} onClose={() => setIsEditQuestionModalOpen(false)} title="Edit Question">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Questions</label>
            <input type="text" defaultValue="Which baseball position do you like the most?" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Select Options</label>
            <div className="flex gap-2 p-2 border border-white/10 bg-[#0a0a0c] rounded-lg">
              <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-md text-sm flex items-center gap-2">Pitcher <X className="w-3 h-3 cursor-pointer" /></span>
              <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-md text-sm flex items-center gap-2">Catcher <X className="w-3 h-3 cursor-pointer" /></span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Suggestion</label>
              <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>Select options</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Multi Select</label>
              <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>No</option>
              </select>
            </div>
          </div>
          <div className="p-4 border border-white/5 rounded-xl bg-white/[0.01] space-y-4">
            {["Focus Area", "Sub Level", "Sub Level 2", "Sub Level 3"].map((level, i) => (
              <div key={level} className="flex items-center gap-4">
                <label className="text-sm font-bold text-slate-400 w-48 text-right whitespace-nowrap">Hierarchy → {level}</label>
                <select className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                  <option>{i === 0 ? "Select an option" : "Select options"}</option>
                </select>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

      {/* Add New Section Modal */}
      <ModalContainer isOpen={isAddSectionModalOpen} onClose={() => setIsAddSectionModalOpen(false)} title="Add New Section">
        <div className="space-y-5">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Title</label>
            <input type="text" placeholder="Enter value (required)" className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea placeholder="Enter value (required)" rows={4} className="w-full bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-slate-400 w-32 text-right">Focus area</label>
            <div className="flex-1 border border-white/10 rounded-lg bg-[#0a0a0c] p-1.5 flex items-center">
              <span className="bg-white/10 text-slate-300 px-3 py-1 rounded-md text-sm flex items-center gap-2">Hitting <X className="w-3 h-3 cursor-pointer" /></span>
            </div>
          </div>
          {["Sub levels", "Sub level 2", "Sub level 3"].map((level) => (
            <div key={level} className="flex items-center gap-4">
              <label className="text-sm font-bold text-slate-400 w-32 text-right">{level}</label>
              <select className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors appearance-none">
                <option>Select options (optional)</option>
              </select>
            </div>
          ))}
          <div className="flex items-center gap-4">
            <label className="text-sm font-bold text-slate-400 w-32 text-right">Workout Addons</label>
            <input type="text" placeholder="Enter value (optional)" className="flex-1 bg-[#0a0a0c] border border-white/10 rounded-lg px-4 py-2 text-sm text-slate-300 focus:border-blue-500 outline-none transition-colors" />
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20">Submit</button>
        </div>
      </ModalContainer>

    </div>
  );
}
