import React, { useState, useMemo } from "react";
import {
  Home, Compass, Target, Search, Map as MapIcon, Rocket, FileText, Briefcase,
  BarChart3, User, ChevronRight, Check, X, Plus, Upload, Sparkles, ArrowRight,
  Sun, Moon, LogOut, TrendingUp, BookOpen, Video, Wrench, Award, Clock,
  ChevronDown, Menu, AlertCircle, Trash2
} from "lucide-react";

/* ============================================================
   DESIGN TOKENS
   Base: near-white slate background, indigo/violet AI accent gradient.
   Headings: Sora (geometric, confident). Body: Inter.
   Motif: soft rounded cards with a single gradient accent reserved for
   primary actions, score rings, and the sidebar — not sprinkled everywhere.
============================================================ */
/* Fonts (Sora / Inter) and .font-head / .font-body utility classes are
   loaded globally in src/index.css — nothing to do here. */

/* ============================================================
   MOCK DATA
============================================================ */
const SKILL_CATEGORIES = {
  Programming: ["Python", "Java", "C", "C++", "JavaScript", "HTML/CSS"],
  Data: ["SQL", "Excel", "Power BI", "Tableau", "Statistics", "Pandas"],
  "AI / ML": ["Machine Learning", "Deep Learning", "NLP"],
  "Web & Cloud": ["React", "Node.js", "Git", "AWS", "Docker", "Linux", "Networking", "Cybersecurity Fundamentals"],
  Design: ["Figma", "UI Design", "UX Research"],
  Business: ["Communication", "Leadership", "Problem Solving", "Teamwork", "Product Management", "Marketing Analytics", "SEO"],
};
const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

const CAREERS = [
  {
    id: "data-analyst", name: "Data Analyst", category: "Technology",
    description: "Turns raw business data into clear insights and dashboards that guide decisions.",
    tools: ["Excel", "SQL", "Power BI", "Tableau", "Python"],
    difficulty: "Beginner Friendly",
    sampleProjects: ["Sales Performance Dashboard", "Customer Churn Analysis"],
    codingLevel: 1,
    interestTags: ["Data Analysis", "Business"],
    enjoyTags: ["Numbers", "Data", "Business"],
    envTags: ["Team work", "Client interaction"],
    activityTags: ["Finding patterns in data", "Presenting ideas"],
    roadmap: [
      { skill: "Python", level: 65, weeks: 2 },
      { skill: "SQL", level: 80, weeks: 2 },
      { skill: "Statistics", level: 70, weeks: 3 },
      { skill: "Pandas", level: 70, weeks: 3 },
      { skill: "Power BI", level: 65, weeks: 2 },
    ],
  },
  {
    id: "business-analyst", name: "Business Analyst", category: "Business",
    description: "Bridges business needs and technical teams, using data to recommend better decisions.",
    tools: ["Excel", "SQL", "Power BI", "Confluence"],
    difficulty: "Beginner Friendly",
    sampleProjects: ["Process Improvement Report", "Market Requirement Analysis"],
    codingLevel: 0,
    interestTags: ["Business", "Management", "Communication"],
    enjoyTags: ["Business", "People", "Numbers"],
    envTags: ["Client interaction", "Team work"],
    activityTags: ["Presenting ideas", "Managing projects"],
    roadmap: [
      { skill: "Excel", level: 75, weeks: 2 },
      { skill: "Communication", level: 75, weeks: 2 },
      { skill: "SQL", level: 60, weeks: 3 },
      { skill: "Power BI", level: 65, weeks: 2 },
      { skill: "Problem Solving", level: 70, weeks: 2 },
    ],
  },
  {
    id: "data-scientist", name: "Data Scientist", category: "Technology",
    description: "Builds models that find patterns in data and predict future outcomes.",
    tools: ["Python", "Jupyter", "SQL", "Scikit-learn"],
    difficulty: "Intermediate",
    sampleProjects: ["Student Performance Prediction", "Price Forecasting Model"],
    codingLevel: 2,
    interestTags: ["Data Analysis", "Artificial Intelligence", "Research"],
    enjoyTags: ["Data", "Technology", "Research"],
    envTags: ["Research-oriented", "Individual work"],
    activityTags: ["Finding patterns in data", "Conducting research"],
    roadmap: [
      { skill: "Python", level: 80, weeks: 2 },
      { skill: "SQL", level: 70, weeks: 2 },
      { skill: "Statistics", level: 80, weeks: 3 },
      { skill: "Pandas", level: 75, weeks: 3 },
      { skill: "Machine Learning", level: 75, weeks: 4 },
      { skill: "Deep Learning", level: 60, weeks: 4 },
    ],
  },
  {
    id: "ai-engineer", name: "AI Engineer", category: "Technology",
    description: "Designs and ships production AI systems, from model training to deployment.",
    tools: ["Python", "PyTorch", "Docker", "AWS"],
    difficulty: "Advanced",
    sampleProjects: ["Chatbot with NLP", "Image Classifier API"],
    codingLevel: 2,
    interestTags: ["Artificial Intelligence", "Coding", "Research"],
    enjoyTags: ["Technology", "Research", "Machines"],
    envTags: ["Research-oriented", "Individual work"],
    activityTags: ["Solving technical problems", "Conducting research"],
    roadmap: [
      { skill: "Python", level: 85, weeks: 2 },
      { skill: "Statistics", level: 70, weeks: 3 },
      { skill: "Machine Learning", level: 80, weeks: 4 },
      { skill: "Deep Learning", level: 75, weeks: 4 },
      { skill: "NLP", level: 65, weeks: 3 },
      { skill: "Docker", level: 55, weeks: 2 },
    ],
  },
  {
    id: "ml-engineer", name: "ML Engineer", category: "Technology",
    description: "Takes ML models from notebooks to reliable, scalable production pipelines.",
    tools: ["Python", "Docker", "AWS", "Git"],
    difficulty: "Advanced",
    sampleProjects: ["ML Model Deployment Pipeline", "Automated Retraining System"],
    codingLevel: 2,
    interestTags: ["Artificial Intelligence", "Coding"],
    enjoyTags: ["Technology", "Machines", "Data"],
    envTags: ["Individual work", "Fast-paced environment"],
    activityTags: ["Building applications", "Solving technical problems"],
    roadmap: [
      { skill: "Python", level: 80, weeks: 2 },
      { skill: "Machine Learning", level: 75, weeks: 4 },
      { skill: "Git", level: 65, weeks: 1 },
      { skill: "Docker", level: 65, weeks: 2 },
      { skill: "AWS", level: 60, weeks: 3 },
    ],
  },
  {
    id: "software-developer", name: "Software Developer", category: "Technology",
    description: "Designs and builds the applications people use every day.",
    tools: ["JavaScript", "React", "Node.js", "Git"],
    difficulty: "Beginner Friendly",
    sampleProjects: ["Personal Portfolio Site", "Task Management App"],
    codingLevel: 2,
    interestTags: ["Coding", "Problem Solving"],
    enjoyTags: ["Technology", "Machines"],
    envTags: ["Individual work", "Team work", "Fast-paced environment"],
    activityTags: ["Building applications", "Solving technical problems"],
    roadmap: [
      { skill: "JavaScript", level: 75, weeks: 3 },
      { skill: "HTML/CSS", level: 70, weeks: 2 },
      { skill: "Git", level: 65, weeks: 1 },
      { skill: "React", level: 70, weeks: 3 },
      { skill: "Node.js", level: 60, weeks: 3 },
    ],
  },
  {
    id: "cybersecurity-analyst", name: "Cybersecurity Analyst", category: "Technology",
    description: "Protects systems and data by finding vulnerabilities before attackers do.",
    tools: ["Wireshark", "Linux", "SIEM tools"],
    difficulty: "Intermediate",
    sampleProjects: ["Home Network Security Audit", "Phishing Simulation Report"],
    codingLevel: 1,
    interestTags: ["Problem Solving", "Research"],
    enjoyTags: ["Technology", "Research"],
    envTags: ["Individual work", "Research-oriented"],
    activityTags: ["Solving technical problems", "Conducting research"],
    roadmap: [
      { skill: "Networking", level: 70, weeks: 3 },
      { skill: "Linux", level: 65, weeks: 2 },
      { skill: "Cybersecurity Fundamentals", level: 75, weeks: 4 },
      { skill: "Python", level: 55, weeks: 2 },
    ],
  },
  {
    id: "cloud-engineer", name: "Cloud Engineer", category: "Technology",
    description: "Builds and manages the cloud infrastructure that powers modern applications.",
    tools: ["AWS", "Docker", "Linux", "Git"],
    difficulty: "Intermediate",
    sampleProjects: ["Deploy a Scalable Web App", "CI/CD Pipeline Setup"],
    codingLevel: 1,
    interestTags: ["Coding", "Problem Solving"],
    enjoyTags: ["Technology", "Machines"],
    envTags: ["Individual work", "Fast-paced environment"],
    activityTags: ["Building applications", "Solving technical problems"],
    roadmap: [
      { skill: "Linux", level: 70, weeks: 2 },
      { skill: "Networking", level: 60, weeks: 2 },
      { skill: "AWS", level: 75, weeks: 4 },
      { skill: "Docker", level: 65, weeks: 2 },
      { skill: "Git", level: 60, weeks: 1 },
    ],
  },
  {
    id: "product-manager", name: "Product Manager", category: "Business",
    description: "Decides what gets built next by balancing user needs, business goals, and tech limits.",
    tools: ["Jira", "Figma", "SQL", "Analytics tools"],
    difficulty: "Intermediate",
    sampleProjects: ["Feature Launch Plan", "User Research Report"],
    codingLevel: 0,
    interestTags: ["Management", "Business", "Communication"],
    enjoyTags: ["Business", "People"],
    envTags: ["Leadership", "Client interaction", "Team work"],
    activityTags: ["Managing projects", "Presenting ideas"],
    roadmap: [
      { skill: "Communication", level: 80, weeks: 2 },
      { skill: "Leadership", level: 70, weeks: 2 },
      { skill: "Product Management", level: 75, weeks: 4 },
      { skill: "SQL", level: 55, weeks: 2 },
      { skill: "Statistics", level: 50, weeks: 2 },
    ],
  },
  {
    id: "digital-marketer", name: "Digital Marketing Specialist", category: "Business",
    description: "Grows brands online using data-driven campaigns across search and social.",
    tools: ["Google Analytics", "SEMrush", "Excel"],
    difficulty: "Beginner Friendly",
    sampleProjects: ["SEO Audit Report", "Social Media Campaign Plan"],
    codingLevel: 0,
    interestTags: ["Business", "Communication"],
    enjoyTags: ["Business", "Creativity", "People"],
    envTags: ["Fast-paced environment", "Team work"],
    activityTags: ["Presenting ideas", "Creating designs"],
    roadmap: [
      { skill: "Communication", level: 70, weeks: 2 },
      { skill: "SEO", level: 70, weeks: 3 },
      { skill: "Marketing Analytics", level: 70, weeks: 3 },
      { skill: "Excel", level: 60, weeks: 2 },
    ],
  },
  {
    id: "ui-ux-designer", name: "UI/UX Designer", category: "Design",
    description: "Shapes how digital products look, feel, and work for real users.",
    tools: ["Figma", "Adobe XD", "Miro"],
    difficulty: "Beginner Friendly",
    sampleProjects: ["Mobile App Redesign", "Usability Test Report"],
    codingLevel: 0,
    interestTags: ["Designing", "Research"],
    enjoyTags: ["Creativity", "People"],
    envTags: ["Individual work", "Client interaction"],
    activityTags: ["Creating designs", "Conducting research"],
    roadmap: [
      { skill: "UX Research", level: 65, weeks: 3 },
      { skill: "Figma", level: 75, weeks: 3 },
      { skill: "UI Design", level: 75, weeks: 3 },
      { skill: "Communication", level: 60, weeks: 2 },
    ],
  },
  {
    id: "product-designer", name: "Product Designer", category: "Design",
    description: "Owns the full design journey from research to polished, shippable interfaces.",
    tools: ["Figma", "Prototyping tools"],
    difficulty: "Intermediate",
    sampleProjects: ["End-to-End App Design", "Design System Starter Kit"],
    codingLevel: 0,
    interestTags: ["Designing", "Management", "Research"],
    enjoyTags: ["Creativity", "People"],
    envTags: ["Team work", "Individual work"],
    activityTags: ["Creating designs", "Managing projects"],
    roadmap: [
      { skill: "UX Research", level: 70, weeks: 3 },
      { skill: "UI Design", level: 75, weeks: 3 },
      { skill: "Figma", level: 75, weeks: 2 },
      { skill: "Product Management", level: 55, weeks: 3 },
    ],
  },
];

const PROJECTS_CATALOG = [
  { id: "p1", title: "Sales Performance Dashboard", skills: ["SQL", "Power BI", "Excel"], difficulty: "Beginner", description: "Build an interactive dashboard tracking regional sales trends." },
  { id: "p2", title: "Customer Churn Analysis", skills: ["Python", "Pandas", "Statistics"], difficulty: "Beginner", description: "Analyze which customers are likely to leave and why." },
  { id: "p3", title: "Student Performance Prediction", skills: ["Python", "Pandas", "Machine Learning"], difficulty: "Intermediate", description: "Predict exam outcomes from study habits and attendance data." },
  { id: "p4", title: "Price Forecasting Model", skills: ["Python", "Statistics", "Machine Learning"], difficulty: "Intermediate", description: "Forecast product prices using historical trend data." },
  { id: "p5", title: "Chatbot with NLP", skills: ["Python", "NLP", "Deep Learning"], difficulty: "Advanced", description: "Build a support chatbot that understands customer questions." },
  { id: "p6", title: "Personal Portfolio Site", skills: ["HTML/CSS", "JavaScript", "React"], difficulty: "Beginner", description: "A responsive personal site showcasing your projects." },
  { id: "p7", title: "Task Management App", skills: ["React", "Node.js", "Git"], difficulty: "Intermediate", description: "A full-stack app for creating and tracking daily tasks." },
  { id: "p8", title: "Deploy a Scalable Web App", skills: ["AWS", "Docker", "Linux"], difficulty: "Intermediate", description: "Ship a containerized app to the cloud with autoscaling." },
  { id: "p9", title: "Home Network Security Audit", skills: ["Networking", "Cybersecurity Fundamentals"], difficulty: "Beginner", description: "Identify and fix vulnerabilities on a home network." },
  { id: "p10", title: "Mobile App Redesign", skills: ["Figma", "UI Design", "UX Research"], difficulty: "Beginner", description: "Redesign a clunky app screen based on real user feedback." },
  { id: "p11", title: "SEO Audit Report", skills: ["SEO", "Marketing Analytics"], difficulty: "Beginner", description: "Audit a website and recommend concrete SEO fixes." },
  { id: "p12", title: "Feature Launch Plan", skills: ["Product Management", "Communication"], difficulty: "Intermediate", description: "Plan a feature launch end-to-end, from spec to metrics." },
];

const DISCOVERY_QUESTIONS = [
  {
    id: "q1", type: "multi", question: "What type of work interests you?",
    options: ["Coding", "Data Analysis", "Artificial Intelligence", "Designing", "Business", "Management", "Research", "Communication", "Problem Solving", "Finance"],
    field: "interestTags",
  },
  {
    id: "q2", type: "multi", question: "What do you enjoy working with?",
    options: ["Numbers", "Data", "Technology", "People", "Business", "Creativity", "Machines", "Research"],
    field: "enjoyTags",
  },
  {
    id: "q3", type: "slider", question: "How comfortable are you with coding?",
    options: ["Beginner", "Intermediate", "Advanced"],
    field: "codingLevel",
  },
  {
    id: "q4", type: "multi", question: "What type of work environment do you prefer?",
    options: ["Individual work", "Team work", "Leadership", "Client interaction", "Research-oriented", "Fast-paced environment"],
    field: "envTags",
  },
  {
    id: "q5", type: "multi", question: "Which activities do you enjoy?",
    options: ["Building applications", "Finding patterns in data", "Solving technical problems", "Creating designs", "Presenting ideas", "Managing projects", "Conducting research"],
    field: "activityTags",
  },
];

/* ============================================================
   LOGIC HELPERS  (stand-in "AI" — deterministic, explainable)
============================================================ */
function skillLevel(profileSkills, skillName) {
  const found = profileSkills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
  return found ? found.level : 0;
}

function computeDiscoveryMatches(answers, profileSkills) {
  const results = CAREERS.map(career => {
    let score = 0, max = 0, reasons = [];
    ["interestTags", "enjoyTags", "envTags", "activityTags"].forEach(field => {
      const selected = answers[field] || [];
      const overlap = career[field].filter(t => selected.includes(t));
      score += overlap.length * 10;
      max += career[field].length * 10;
      if (overlap.length > 0) reasons.push(`${overlap.length > 1 ? "Strong" : "Some"} interest in ${overlap.slice(0, 2).join(" & ").toLowerCase()}`);
    });
    // coding comfort proximity
    const codingDiff = Math.abs((answers.codingLevel ?? 1) - career.codingLevel);
    const codingScore = Math.max(0, 10 - codingDiff * 5);
    score += codingScore; max += 10;
    if (codingDiff === 0) reasons.push("Coding comfort matches this role");
    // existing skill bonus
    const relevantSkills = career.roadmap.filter(r => skillLevel(profileSkills, r.skill) > 0);
    if (relevantSkills.length > 0) {
      score += relevantSkills.length * 4; max += career.roadmap.length * 4;
      reasons.push(`Already knows ${relevantSkills.length} relevant skill${relevantSkills.length > 1 ? "s" : ""}`);
    } else {
      max += career.roadmap.length * 4;
    }
    const pct = max > 0 ? Math.round((score / max) * 100) : 0;
    return { career, pct: Math.min(97, pct), reasons: reasons.slice(0, 4) };
  });
  return results.sort((a, b) => b.pct - a.pct);
}

function computeSkillGap(profileSkills, career) {
  return career.roadmap.map(req => {
    const level = skillLevel(profileSkills, req.skill);
    let status = "missing";
    if (level >= req.level * 0.85) status = "have";
    else if (level > 0) status = "improve";
    return { ...req, currentLevel: level, status };
  });
}

function computeReadiness(gap) {
  if (gap.length === 0) return 0;
  const total = gap.reduce((sum, g) => sum + Math.min(g.currentLevel / g.level, 1), 0);
  return Math.round((total / gap.length) * 100);
}

function buildRoadmap(gap) {
  const skillPhases = gap
    .filter(g => g.status !== "have")
    .map((g, i) => ({
      id: `skill-${g.skill}`, type: "skill", title: g.skill, weeks: g.weeks,
      targetLevel: g.level, status: "Not Started",
      learnItems: ["Core concepts", "Hands-on practice", "Mini exercises", "Self-assessment"],
    }));
  return [
    ...skillPhases,
    { id: "phase-projects", type: "project", title: "Build 2–3 Real-World Projects", weeks: 4, status: "Not Started",
      learnItems: ["Pick projects matching your gaps", "Apply new skills end-to-end", "Document your process"] },
    { id: "phase-prep", type: "prep", title: "Career Preparation", weeks: 2, status: "Not Started",
      learnItems: ["Resume polish", "Portfolio review", "Mock interview practice"] },
  ];
}

function extractSkillsFromText(text) {
  if (!text) return [];
  const lower = text.toLowerCase();
  return ALL_SKILLS.filter(skill => {
    const escaped = skill.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // word-boundary match; falls back to plain includes for skills containing
    // symbols where \b doesn't apply cleanly (e.g. "C++").
    const re = /^[a-z0-9\s]+$/.test(escaped) ? new RegExp(`\\b${escaped}\\b`) : new RegExp(escaped);
    return re.test(lower);
  });
}

const uid = () => Math.random().toString(36).slice(2, 9);

/* ============================================================
   SMALL UI ATOMS
============================================================ */
function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-100 text-slate-600",
    green: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-rose-50 text-rose-700",
    indigo: "bg-indigo-50 text-indigo-700",
  };
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

function ProgressBar({ value, tone = "indigo", height = "h-2" }) {
  const tones = { indigo: "bg-indigo-600", green: "bg-emerald-500", amber: "bg-amber-500", violet: "bg-violet-600" };
  return (
    <div className={`w-full ${height} bg-slate-100 rounded-full overflow-hidden`}>
      <div className={`${height} ${tones[tone]} rounded-full transition-all duration-500`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

function CircularScore({ value, size = 96, label }) {
  const r = (size - 12) / 2, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="flex flex-col items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="#EEF2FF" strokeWidth="10" fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke="url(#grad)" strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round" />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute flex flex-col items-center" style={{ marginTop: -size / 2 - 6 }}>
        <span className="font-head text-2xl font-bold text-slate-800">{value}%</span>
      </div>
      {label && <span className="text-xs text-slate-500 mt-1">{label}</span>}
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-2xl shadow-sm border border-slate-100 ${className}`}>{children}</div>;
}

function PrimaryButton({ children, onClick, className = "", disabled, icon: Icon }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-white
        bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
        disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm ${className}`}>
      {children}{Icon && <Icon size={16} />}
    </button>
  );
}

function SecondaryButton({ children, onClick, className = "", icon: Icon }) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
        text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition-colors ${className}`}>
      {children}{Icon && <Icon size={16} />}
    </button>
  );
}

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h1 className="font-head text-2xl font-bold text-slate-900">{title}</h1>
      {subtitle && <p className="text-slate-500 mt-1 text-sm max-w-xl">{subtitle}</p>}
    </div>
  );
}

/* ============================================================
   LAYOUT: SIDEBAR + TOPBAR
============================================================ */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "discovery-entry", label: "Career Discovery", icon: Compass },
  { id: "my-career", label: "My Career", icon: Target },
  { id: "skill-gap", label: "Skill Gap", icon: Search, needsCareer: true },
  { id: "roadmap", label: "My Roadmap", icon: MapIcon, needsCareer: true },
  { id: "projects", label: "Projects", icon: Rocket, needsCareer: true },
  { id: "resume", label: "Resume Analyzer", icon: FileText, needsCareer: true },
  { id: "job", label: "Job Analyzer", icon: Briefcase, needsCareer: true },
  { id: "progress", label: "Progress", icon: BarChart3, needsCareer: true },
  { id: "profile-settings", label: "Profile", icon: User },
];

function Sidebar({ page, setPage, targetCareer, theme, setTheme, resetAll, mobileOpen, setMobileOpen }) {
  return (
    <>
      {mobileOpen && <div className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed lg:static z-40 top-0 left-0 h-full w-64 bg-slate-900 text-slate-300 flex flex-col
        transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="flex items-center gap-2 px-6 py-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div className="min-w-0">
            <span className="font-head font-bold text-white text-base leading-tight block">Career Navigator</span>
            <span className="text-[11px] text-slate-400 leading-tight block truncate">Student Skill Roadmap</span>
          </div>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(item => {
            const disabled = item.needsCareer && !targetCareer;
            const active = page === item.id || (item.id === "discovery-entry" && ["discovery", "matches"].includes(page)) || (item.id === "my-career" && ["decision", "career-select"].includes(page));
            return (
              <button key={item.id} disabled={disabled}
                onClick={() => { setPage(item.id === "discovery-entry" ? "discovery" : item.id === "my-career" ? (targetCareer ? "my-career" : "decision") : item.id); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${active ? "bg-white/10 text-white" : disabled ? "text-slate-600 cursor-not-allowed" : "hover:bg-white/5 hover:text-white"}`}>
                <item.icon size={17} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="px-3 py-4 border-t border-white/10 space-y-1">
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">
            {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
          <button onClick={resetAll} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/5 hover:text-white transition-colors">
            <LogOut size={17} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ profile, readiness, targetCareer, setMobileOpen }) {
  return (
    <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-slate-100 bg-white/70 backdrop-blur sticky top-0 z-20">
      <button className="lg:hidden text-slate-600" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
      <div className="hidden lg:block text-sm text-slate-500">
        {targetCareer ? <>Target career: <span className="font-medium text-slate-700">{targetCareer.name}</span></> : "No target career selected yet"}
      </div>
      <div className="flex items-center gap-4">
        {targetCareer && (
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-slate-500">Readiness</span>
            <span className="font-head font-bold text-indigo-600">{readiness}%</span>
          </div>
        )}
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-sm font-semibold">
          {profile?.name ? profile.name.charAt(0).toUpperCase() : <User size={16} />}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   LANDING PAGE
============================================================ */
function Landing({ onStart, onExplore }) {
  const steps = [
    { icon: Compass, title: "Discover", text: "Answer a short questionnaire or pick a career you already have in mind." },
    { icon: Search, title: "Analyze", text: "See exactly which skills you already have — and which ones are missing." },
    { icon: TrendingUp, title: "Grow", text: "Follow a roadmap built around your current level, not a generic checklist." },
  ];
  const stats = [
    { value: `${CAREERS.length}+`, label: "Career Paths" },
    { value: "1:1", label: "Personalized Roadmaps" },
    { value: "AI", label: "Skill Gap Analysis" },
    { value: "Live", label: "Progress Tracking" },
  ];
  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        <div className="flex items-center gap-2 mb-16">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <span className="font-head font-bold text-slate-900 text-lg leading-tight block">Career Navigator</span>
            <span className="text-xs text-slate-400 leading-tight block">Student Skill Roadmap</span>
          </div>
        </div>

        <div className="max-w-3xl">
          <Badge tone="indigo">AI-guided career planning</Badge>
          <h1 className="font-head text-5xl font-bold text-slate-900 mt-5 leading-tight">
            Discover the right career.<br />Understand your skill gaps.<br />Follow a roadmap built for you.
          </h1>
          <p className="text-slate-500 mt-5 text-lg max-w-xl">
            Most platforms hand every student the same list of courses. This one looks at what you already
            know, what your target role actually needs, and builds the path between the two.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <PrimaryButton onClick={onStart} icon={ArrowRight}>Start My Career Journey</PrimaryButton>
            <SecondaryButton onClick={onExplore}>Explore Careers</SecondaryButton>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-20">
          {steps.map((s, i) => (
            <Card key={i} className="p-6">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center mb-4">
                <s.icon size={20} className="text-indigo-600" />
              </div>
              <h3 className="font-head font-bold text-slate-900">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{s.text}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-14">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-head text-3xl font-bold text-slate-900">{s.value}</div>
              <div className="text-sm text-slate-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE FORM
============================================================ */
function ProfileForm({ initial, onSave }) {
  const [form, setForm] = useState(initial || {
    name: "", age: "", college: "", degree: "", department: "", year: "",
    cgpa: "", semester: "", subjects: "",
  });
  const [skills, setSkills] = useState(initial?.skills || []);
  const [customSkill, setCustomSkill] = useState("");

  const toggleSkill = (name) => {
    setSkills(prev => prev.find(s => s.name === name)
      ? prev.filter(s => s.name !== name)
      : [...prev, { name, level: 50 }]);
  };
  const setLevel = (name, level) => setSkills(prev => prev.map(s => s.name === name ? { ...s, level } : s));
  const addCustom = () => {
    if (customSkill.trim() && !skills.find(s => s.name.toLowerCase() === customSkill.trim().toLowerCase())) {
      setSkills(prev => [...prev, { name: customSkill.trim(), level: 50 }]);
      setCustomSkill("");
    }
  };

  const field = (label, key, type = "text") => (
    <label className="block">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
        className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-body py-10 px-6">
      <div className="max-w-3xl mx-auto">
        <PageHeader title="Set Up Your Student Profile" subtitle="This helps us personalize career matches and your learning roadmap." />
        <Card className="p-6 space-y-8">
          <div>
            <h3 className="font-head font-bold text-slate-800 mb-3">Basic Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {field("Full Name", "name")}
              {field("Age", "age", "number")}
              {field("College", "college")}
              {field("Degree", "degree")}
              {field("Department", "department")}
              {field("Year of Study", "year")}
            </div>
          </div>
          <div>
            <h3 className="font-head font-bold text-slate-800 mb-3">Academic Details</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {field("CGPA", "cgpa")}
              {field("Current Semester", "semester")}
              {field("Relevant Subjects", "subjects")}
            </div>
          </div>
          <div>
            <h3 className="font-head font-bold text-slate-800 mb-3">Current Skills</h3>
            <p className="text-sm text-slate-500 mb-3">Select what you already know. Adjust the slider to your comfort level.</p>
            <div className="space-y-5">
              {Object.entries(SKILL_CATEGORIES).map(([cat, list]) => (
                <div key={cat}>
                  <div className="text-xs font-semibold uppercase text-slate-400 mb-2">{cat}</div>
                  <div className="flex flex-wrap gap-2">
                    {list.map(sk => {
                      const active = skills.find(s => s.name === sk);
                      return (
                        <button key={sk} onClick={() => toggleSkill(sk)}
                          className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${active
                            ? "bg-indigo-600 text-white border-indigo-600"
                            : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
                          {sk}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {skills.length > 0 && (
              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold uppercase text-slate-400">Set your comfort level</div>
                {skills.map(s => (
                  <div key={s.name} className="flex items-center gap-3">
                    <span className="text-sm text-slate-600 w-36 truncate">{s.name}</span>
                    <input type="range" min="0" max="100" value={s.level} onChange={e => setLevel(s.name, Number(e.target.value))} className="flex-1 accent-indigo-600" />
                    <span className="text-sm text-slate-500 w-10 text-right">{s.level}%</span>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 mt-4">
              <input value={customSkill} onChange={e => setCustomSkill(e.target.value)} placeholder="Add a custom skill"
                className="rounded-lg border border-slate-200 px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <SecondaryButton onClick={addCustom} icon={Plus}>Add</SecondaryButton>
            </div>
          </div>
          <PrimaryButton onClick={() => onSave({ ...form, skills })} icon={ArrowRight} className="w-full sm:w-auto justify-center">
            Save & Continue
          </PrimaryButton>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   CAREER DECISION
============================================================ */
function CareerDecision({ onKnow, onDiscover }) {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <PageHeader title="Do you already know your target career?" subtitle="Choose the path that fits you right now — you can always change this later." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6 flex flex-col">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl">🎯</div>
          <h3 className="font-head font-bold text-lg text-slate-900 mt-4">I Know My Career</h3>
          <p className="text-sm text-slate-500 mt-2 flex-1">I already have a career goal in mind.</p>
          <PrimaryButton onClick={onKnow} className="mt-5 justify-center">Choose My Career</PrimaryButton>
        </Card>
        <Card className="p-6 flex flex-col">
          <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center text-xl">🧭</div>
          <h3 className="font-head font-bold text-lg text-slate-900 mt-4">Help Me Discover</h3>
          <p className="text-sm text-slate-500 mt-2 flex-1">I'm not sure which career is right for me yet.</p>
          <PrimaryButton onClick={onDiscover} className="mt-5 justify-center">Discover My Career</PrimaryButton>
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   CAREER DISCOVERY QUESTIONNAIRE
============================================================ */
function CareerDiscovery({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ interestTags: [], enjoyTags: [], envTags: [], activityTags: [], codingLevel: 1 });
  const q = DISCOVERY_QUESTIONS[step];

  const toggleMulti = (field, val) => {
    setAnswers(prev => ({ ...prev, [field]: prev[field].includes(val) ? prev[field].filter(v => v !== val) : [...prev[field], val] }));
  };

  const canProceed = q.type === "slider" ? true : (answers[q.field] || []).length > 0;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <PageHeader title="Career Discovery" subtitle="Answer honestly — there are no wrong answers." />
      <div className="flex gap-1.5 mb-6">
        {DISCOVERY_QUESTIONS.map((_, i) => <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-indigo-600" : "bg-slate-100"}`} />)}
      </div>
      <Card className="p-6">
        <h3 className="font-head font-bold text-lg text-slate-900 mb-5">{q.question}</h3>
        {q.type === "multi" && (
          <div className="flex flex-wrap gap-2">
            {q.options.map(opt => {
              const active = answers[q.field].includes(opt);
              return (
                <button key={opt} onClick={() => toggleMulti(q.field, opt)}
                  className={`px-3.5 py-2 rounded-full text-sm border transition-colors ${active
                    ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        )}
        {q.type === "slider" && (
          <div>
            <input type="range" min="0" max="2" step="1" value={answers.codingLevel}
              onChange={e => setAnswers({ ...answers, codingLevel: Number(e.target.value) })}
              className="w-full accent-indigo-600" />
            <div className="flex justify-between text-sm text-slate-500 mt-2">
              {q.options.map((o, i) => <span key={i} className={answers.codingLevel === i ? "text-indigo-600 font-semibold" : ""}>{o}</span>)}
            </div>
          </div>
        )}
        <div className="flex justify-between mt-8">
          <SecondaryButton onClick={() => setStep(Math.max(0, step - 1))} className={step === 0 ? "invisible" : ""}>Back</SecondaryButton>
          {step < DISCOVERY_QUESTIONS.length - 1
            ? <PrimaryButton disabled={!canProceed} onClick={() => setStep(step + 1)} icon={ChevronRight}>Next</PrimaryButton>
            : <PrimaryButton disabled={!canProceed} onClick={() => onComplete(answers)} icon={Sparkles}>See My Matches</PrimaryButton>}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   CAREER MATCHES (RESULTS)
============================================================ */
function CareerMatches({ matches, onSelect, onRetake }) {
  const medals = ["🥇", "🥈", "🥉"];
  return (
    <div className="max-w-4xl mx-auto py-10">
      <PageHeader title="Your Career Matches" subtitle="These are recommendations based on your answers — not a guarantee. Explore any of them further." />
      <div className="space-y-4">
        {matches.slice(0, 3).map((m, i) => (
          <Card key={m.career.id} className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{medals[i]}</span>
                  <h3 className="font-head font-bold text-lg text-slate-900">{m.career.name}</h3>
                  <Badge tone="indigo">{m.pct}% Match</Badge>
                </div>
                <p className="text-sm text-slate-500 mt-1 max-w-md">{m.career.description}</p>
                <ul className="mt-3 space-y-1">
                  {m.reasons.map((r, j) => (
                    <li key={j} className="text-xs text-slate-500 flex items-center gap-1.5"><Check size={12} className="text-emerald-500" />{r}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {m.career.roadmap.slice(0, 4).map(r => <Badge key={r.skill}>{r.skill}</Badge>)}
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 sm:pl-4">
                <ProgressBar value={m.pct} />
                <PrimaryButton onClick={() => onSelect(m.career)} className="whitespace-nowrap">Explore Career</PrimaryButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-6"><SecondaryButton onClick={onRetake}>Retake Questionnaire</SecondaryButton></div>
    </div>
  );
}

/* ============================================================
   CAREER SELECTION (SEARCHABLE LIST)
============================================================ */
function CareerSelect({ onSelect }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(CAREERS.map(c => c.category))];
  const filtered = CAREERS.filter(c =>
    (category === "All" || c.category === category) &&
    c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="max-w-5xl mx-auto py-10">
      <PageHeader title="Choose Your Career" subtitle="Search or browse by category, then explore what it takes to get there." />
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search careers..."
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium ${category === c ? "bg-indigo-600 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map(c => (
          <Card key={c.id} className="p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="font-head font-bold text-slate-900">{c.name}</h3>
              <Badge tone={c.difficulty === "Beginner Friendly" ? "green" : c.difficulty === "Intermediate" ? "amber" : "red"}>{c.difficulty}</Badge>
            </div>
            <p className="text-sm text-slate-500 mt-2 flex-1">{c.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {c.tools.slice(0, 4).map(t => <Badge key={t}>{t}</Badge>)}
            </div>
            <div className="text-xs text-slate-400 mt-3">Suggested project: {c.sampleProjects[0]}</div>
            <PrimaryButton onClick={() => onSelect(c)} className="mt-4 justify-center">Analyze My Fit</PrimaryButton>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-slate-400 text-sm col-span-2">No careers match your search.</p>}
      </div>
    </div>
  );
}

/* ============================================================
   MY CAREER (overview once a career is set)
============================================================ */
function MyCareer({ career, readiness, onChange, goTo }) {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <PageHeader title="My Career" subtitle="Your current target career and quick access to next steps." />
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <Badge tone="indigo">{career.category}</Badge>
            <h2 className="font-head text-2xl font-bold text-slate-900 mt-3">{career.name}</h2>
            <p className="text-slate-500 mt-2 max-w-md">{career.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {career.tools.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <CircularScore value={readiness} label="Career Readiness" />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          <SecondaryButton onClick={() => goTo("skill-gap")} icon={Search}>View Skill Gap</SecondaryButton>
          <SecondaryButton onClick={() => goTo("roadmap")} icon={MapIcon}>View Roadmap</SecondaryButton>
          <SecondaryButton onClick={onChange} icon={Compass}>Change Career Goal</SecondaryButton>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   SKILL GAP ANALYSIS
============================================================ */
function SkillGapPage({ career, gap, readiness }) {
  const have = gap.filter(g => g.status === "have");
  const improve = gap.filter(g => g.status === "improve");
  const missing = gap.filter(g => g.status === "missing");
  return (
    <div className="max-w-4xl mx-auto py-10">
      <PageHeader title="Your Skill Gap" subtitle={`Career: ${career.name}`} />
      <div className="grid sm:grid-cols-3 gap-5 mb-8">
        <Card className="p-6 sm:col-span-1 flex flex-col items-center justify-center relative">
          <CircularScore value={readiness} label="Career Readiness" />
        </Card>
        <div className="sm:col-span-2 grid grid-cols-3 gap-3">
          {[["You Have", have, "green"], ["Improve", improve, "amber"], ["Missing", missing, "red"]].map(([label, list, tone]) => (
            <Card key={label} className="p-4">
              <div className="text-xs font-semibold text-slate-400 uppercase">{label}</div>
              <div className="font-head text-2xl font-bold text-slate-900 mt-1">{list.length}</div>
              <div className="mt-3 space-y-1">
                {list.slice(0, 4).map(g => (
                  <div key={g.skill} className="text-xs text-slate-600 flex items-center gap-1">
                    <span>{tone === "green" ? "✅" : tone === "amber" ? "🟡" : "🔴"}</span>{g.skill}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Card className="p-6">
        <h3 className="font-head font-bold text-slate-800 mb-4">Skill Comparison</h3>
        <div className="space-y-4">
          {gap.map(g => (
            <div key={g.skill}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-slate-700">{g.skill}</span>
                <span className="text-slate-400">{g.currentLevel}% / target {g.level}%</span>
              </div>
              <ProgressBar value={g.currentLevel} tone={g.status === "have" ? "green" : g.status === "improve" ? "amber" : "indigo"} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   ROADMAP + TASK MODAL
============================================================ */
function TaskModal({ item, onClose, onStatus }) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 bg-slate-900/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start">
          <h3 className="font-head text-xl font-bold text-slate-900">{item.title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <Badge tone={item.status === "Completed" ? "green" : item.status === "Learning" ? "amber" : "slate"}>{item.status}</Badge>
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">What you'll cover</div>
          <ul className="space-y-1.5">
            {item.learnItems.map((l, i) => <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><Check size={14} className="text-indigo-500" />{l}</li>)}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-5">
          <SecondaryButton icon={BookOpen} onClick={() => {}}>Learn</SecondaryButton>
          <SecondaryButton icon={Video} onClick={() => {}}>Tutorials</SecondaryButton>
          <SecondaryButton icon={Wrench} onClick={() => {}}>Practice</SecondaryButton>
          <SecondaryButton icon={Rocket} onClick={() => {}}>Build Project</SecondaryButton>
        </div>
        <div className="mt-5">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Update status</div>
          <div className="flex gap-2">
            {["Not Started", "Learning", "Completed"].map(s => (
              <button key={s} onClick={() => onStatus(item.id, s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium border ${item.status === s ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-200 text-slate-600 hover:border-indigo-300"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapPage({ roadmap, onStatus }) {
  const [openItem, setOpenItem] = useState(null);
  const icons = { skill: BookOpen, project: Rocket, prep: Award };
  return (
    <div className="max-w-3xl mx-auto py-10">
      <PageHeader title="Your Personalized Career Roadmap" subtitle="Ordered from your current skill level to career-ready — click any phase for details." />
      <div className="space-y-3">
        {roadmap.map((item, i) => {
          const Icon = icons[item.type];
          return (
            <div key={item.id}>
              <Card className="p-4 flex items-center gap-4 cursor-pointer hover:border-indigo-200" onClick={() => setOpenItem(item)}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
                  ${item.status === "Completed" ? "bg-emerald-50 text-emerald-600" : item.status === "Learning" ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600"}`}>
                  {item.status === "Completed" ? <Check size={18} /> : <Icon size={18} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">Phase {i + 1}</span>
                    <Badge tone={item.status === "Completed" ? "green" : item.status === "Learning" ? "amber" : "slate"}>{item.status}</Badge>
                  </div>
                  <h4 className="font-head font-bold text-slate-900 truncate">{item.title}</h4>
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-400 flex-shrink-0"><Clock size={14} />{item.weeks}w</div>
                <ChevronRight size={18} className="text-slate-300 flex-shrink-0" />
              </Card>
              {i < roadmap.length - 1 && <div className="w-px h-3 bg-slate-200 ml-9" />}
            </div>
          );
        })}
      </div>
      <TaskModal item={openItem} onClose={() => setOpenItem(null)} onStatus={(id, s) => { onStatus(id, s); setOpenItem(prev => prev ? { ...prev, status: s } : prev); }} />
    </div>
  );
}

/* ============================================================
   PROJECTS
============================================================ */
function ProjectsPage({ missingSkills, roadmapProjectIds, onAdd }) {
  const scored = PROJECTS_CATALOG.map(p => ({
    ...p, overlap: p.skills.filter(s => missingSkills.includes(s)).length,
  })).sort((a, b) => b.overlap - a.overlap);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <PageHeader title="Recommended Projects" subtitle="Chosen to help close your current skill gaps." />
      <div className="grid sm:grid-cols-2 gap-4">
        {scored.map(p => {
          const added = roadmapProjectIds.includes(p.id);
          return (
            <Card key={p.id} className="p-5 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="font-head font-bold text-slate-900">{p.title}</h3>
                <Badge tone={p.difficulty === "Beginner" ? "green" : p.difficulty === "Intermediate" ? "amber" : "red"}>{p.difficulty}</Badge>
              </div>
              <p className="text-sm text-slate-500 mt-2 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.skills.map(s => <Badge key={s} tone={missingSkills.includes(s) ? "indigo" : "slate"}>{s}</Badge>)}
              </div>
              {p.overlap > 0 && <div className="text-xs text-indigo-600 mt-2">Develops {p.overlap} skill{p.overlap > 1 ? "s" : ""} you're missing</div>}
              <PrimaryButton disabled={added} onClick={() => onAdd(p)} className="mt-4 justify-center">
                {added ? "Added to Roadmap" : "Add to My Roadmap"}
              </PrimaryButton>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   RESUME ANALYZER
============================================================ */
function ResumeAnalyzer({ career, onAddMissing }) {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result));
    reader.readAsText(file);
  };

  const analyze = () => {
    const found = extractSkillsFromText(text);
    const required = career.roadmap.map(r => r.skill);
    const strong = required.filter(s => found.includes(s));
    const missing = required.filter(s => !found.includes(s));
    const match = required.length ? Math.round((strong.length / required.length) * 100) : 0;
    setAnalysis({ found, strong, missing, match });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <PageHeader title="AI Resume Analyzer" subtitle={`Compared against ${career.name} requirements.`} />
      <Card className="p-6">
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl py-8 cursor-pointer hover:border-indigo-300 transition-colors">
          <Upload size={24} className="text-slate-400 mb-2" />
          <span className="text-sm text-slate-500">Upload a .txt resume, or paste your resume text below</span>
          <input type="file" accept=".txt" onChange={handleFile} className="hidden" />
        </label>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Paste resume text here..."
          className="w-full mt-4 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <PrimaryButton onClick={analyze} disabled={!text.trim()} className="mt-4">Analyze Resume</PrimaryButton>
      </Card>

      {analysis && (
        <Card className="p-6 mt-5">
          <div className="flex items-center gap-4">
            <CircularScore value={analysis.match} size={80} />
            <div>
              <h3 className="font-head font-bold text-slate-900">Resume Match</h3>
              <p className="text-sm text-slate-500">Against {career.name} requirements</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Strong Areas</div>
              {analysis.strong.map(s => <div key={s} className="text-sm text-slate-600 mb-1">✅ {s}</div>)}
              {analysis.strong.length === 0 && <div className="text-sm text-slate-400">None detected yet</div>}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Missing</div>
              {analysis.missing.map(s => <div key={s} className="text-sm text-slate-600 mb-1">❌ {s}</div>)}
              {analysis.missing.length === 0 && <div className="text-sm text-slate-400">Nothing missing — great fit!</div>}
            </div>
          </div>
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Suggestions</div>
            <ul className="text-sm text-slate-600 space-y-1 list-disc list-inside">
              <li>Add measurable outcomes to each project (e.g., "improved accuracy by 12%").</li>
              <li>List the specific tools and versions you used, not just skill categories.</li>
              <li>Include any certifications, even informal or in-progress ones.</li>
            </ul>
          </div>
          {analysis.missing.length > 0 && (
            <SecondaryButton className="mt-4" onClick={() => onAddMissing(analysis.missing)} icon={Plus}>Add Missing Skills to Roadmap</SecondaryButton>
          )}
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   JOB DESCRIPTION ANALYZER
============================================================ */
function JobAnalyzer({ profile, onAddMissing }) {
  const [jd, setJd] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const analyze = () => {
    const required = extractSkillsFromText(jd);
    const have = required.filter(s => skillLevel(profile.skills, s) > 0);
    const need = required.filter(s => skillLevel(profile.skills, s) === 0);
    const match = required.length ? Math.round((have.length / required.length) * 100) : 0;
    setAnalysis({ required, have, need, match });
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <PageHeader title="Analyze a Job" subtitle="Paste a real job description to see how well you currently match." />
      <Card className="p-6">
        <textarea value={jd} onChange={e => setJd(e.target.value)} rows={6}
          placeholder="Paste a job description here, e.g. “We are looking for a Data Analyst with SQL, Python, Excel, Power BI and Tableau...”"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        <PrimaryButton onClick={analyze} disabled={!jd.trim()} className="mt-4">Analyze Job</PrimaryButton>
      </Card>

      {analysis && (
        <Card className="p-6 mt-5">
          <div className="flex items-center gap-4">
            <CircularScore value={analysis.match} size={80} />
            <div>
              <h3 className="font-head font-bold text-slate-900">Job Skill Match</h3>
              <p className="text-sm text-slate-500">{analysis.required.length} skills detected in this posting</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mt-5">
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400 mb-2">You Have</div>
              {analysis.have.map(s => <div key={s} className="text-sm text-slate-600 mb-1">✅ {s}</div>)}
              {analysis.have.length === 0 && <div className="text-sm text-slate-400">None yet</div>}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase text-slate-400 mb-2">You Need</div>
              {analysis.need.map(s => <div key={s} className="text-sm text-slate-600 mb-1">❌ {s}</div>)}
              {analysis.need.length === 0 && <div className="text-sm text-slate-400">You meet every requirement!</div>}
            </div>
          </div>
          {analysis.need.length > 0 && (
            <SecondaryButton className="mt-5" onClick={() => onAddMissing(analysis.need)} icon={Plus}>Add Missing Skills to Roadmap</SecondaryButton>
          )}
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   PROGRESS DASHBOARD
============================================================ */
function ProgressPage({ career, readiness, roadmap }) {
  const completed = roadmap.filter(r => r.status === "Completed").length;
  const learning = roadmap.filter(r => r.status === "Learning").length;
  const remaining = roadmap.filter(r => r.status === "Not Started").length;
  const pctDone = Math.round((completed / roadmap.length) * 100);
  const projectsTotal = roadmap.filter(r => r.type === "project").length;
  const projectsDone = roadmap.filter(r => r.type === "project" && r.status === "Completed").length;
  const nextItem = roadmap.find(r => r.status !== "Completed");

  return (
    <div className="max-w-4xl mx-auto py-10">
      <PageHeader title="Progress Dashboard" subtitle={`Career: ${career.name}`} />
      <div className="grid sm:grid-cols-3 gap-5 mb-6">
        <Card className="p-6 flex flex-col items-center relative">
          <CircularScore value={readiness} label="Career Readiness" />
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-3">Skills</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-600">Completed</span><span className="font-semibold text-emerald-600">{completed}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Learning</span><span className="font-semibold text-amber-600">{learning}</span></div>
            <div className="flex justify-between"><span className="text-slate-600">Remaining</span><span className="font-semibold text-slate-500">{remaining}</span></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Roadmap Progress</div>
          <div className="font-head text-2xl font-bold text-slate-900 mb-2">{pctDone}%</div>
          <ProgressBar value={pctDone} />
        </Card>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Projects</div>
          <div className="font-head text-2xl font-bold text-slate-900">{projectsDone} / {Math.max(projectsTotal, 1)}</div>
          <p className="text-sm text-slate-500 mt-1">completed</p>
        </Card>
        <Card className="p-6">
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">This Week's Goal</div>
          <p className="text-sm text-slate-700 font-medium mt-1">{nextItem ? `Make progress on: ${nextItem.title}` : "All phases complete — great work!"}</p>
          {nextItem && <div className="mt-3"><ProgressBar value={nextItem.status === "Learning" ? 50 : 10} tone="amber" /></div>}
        </Card>
      </div>
    </div>
  );
}

/* ============================================================
   PROFILE / SETTINGS
============================================================ */
function ProfileSettings({ profile, onUpdate, onChangeCareer, theme, setTheme, onReset }) {
  return (
    <div className="max-w-2xl mx-auto py-10">
      <PageHeader title="Profile & Settings" />
      <Card className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-xl font-semibold">
            {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={20} />}
          </div>
          <div>
            <div className="font-head font-bold text-slate-900">{profile.name || "Student"}</div>
            <div className="text-sm text-slate-500">{profile.college || "—"} • {profile.department || "—"}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div><span className="text-slate-400">Degree:</span> <span className="text-slate-700">{profile.degree || "—"}</span></div>
          <div><span className="text-slate-400">Year:</span> <span className="text-slate-700">{profile.year || "—"}</span></div>
          <div><span className="text-slate-400">CGPA:</span> <span className="text-slate-700">{profile.cgpa || "—"}</span></div>
          <div><span className="text-slate-400">Semester:</span> <span className="text-slate-700">{profile.semester || "—"}</span></div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase text-slate-400 mb-2">Skills ({profile.skills.length})</div>
          <div className="flex flex-wrap gap-1.5">{profile.skills.map(s => <Badge key={s.name}>{s.name} · {s.level}%</Badge>)}</div>
        </div>
        <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
          <SecondaryButton onClick={() => onUpdate()} icon={User}>Edit Profile</SecondaryButton>
          <SecondaryButton onClick={onChangeCareer} icon={Compass}>Change Career Goal</SecondaryButton>
          <SecondaryButton onClick={() => setTheme(theme === "light" ? "dark" : "light")} icon={theme === "light" ? Moon : Sun}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </SecondaryButton>
          <SecondaryButton onClick={onReset} icon={LogOut}>Logout</SecondaryButton>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   APP ROOT
============================================================ */
export default function App() {
  const [page, setPage] = useState("landing");
  const [profile, setProfile] = useState(null);
  const [targetCareer, setTargetCareer] = useState(null);
  const [discoveryAnswers, setDiscoveryAnswers] = useState(null);
  const [matches, setMatches] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [pendingCareer, setPendingCareer] = useState(null);

  const gap = useMemo(() => targetCareer && profile ? computeSkillGap(profile.skills, targetCareer) : [], [targetCareer, profile]);
  const readiness = useMemo(() => gap.length ? computeReadiness(gap.map(g => {
    const rItem = roadmap.find(r => r.id === `skill-${g.skill}`);
    let effectiveLevel = g.currentLevel;
    if (rItem?.status === "Completed") effectiveLevel = Math.max(effectiveLevel, g.level);
    else if (rItem?.status === "Learning") effectiveLevel = Math.max(effectiveLevel, Math.round(g.level * 0.6));
    return { ...g, currentLevel: effectiveLevel };
  })) : 0, [gap, roadmap]);

  const selectCareer = (career) => {
    if (!profile) { setPendingCareer(career); setPage("profile"); return; }
    setTargetCareer(career);
    const g = computeSkillGap(profile.skills, career);
    setRoadmap(buildRoadmap(g));
    setPage("skill-gap");
  };

  const saveProfile = (form) => {
    setProfile(form);
    if (pendingCareer) { selectCareerWithProfile(form, pendingCareer); setPendingCareer(null); }
    else setPage("decision");
  };
  const selectCareerWithProfile = (prof, career) => {
    setTargetCareer(career);
    const g = computeSkillGap(prof.skills, career);
    setRoadmap(buildRoadmap(g));
    setPage("skill-gap");
  };

  const completeDiscovery = (answers) => {
    setDiscoveryAnswers(answers);
    setMatches(computeDiscoveryMatches(answers, profile?.skills || []));
    setPage("matches");
  };

  const setRoadmapStatus = (id, status) => setRoadmap(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  const addProjectToRoadmap = (project) => {
    setRoadmap(prev => [...prev, { id: `custom-project-${project.id}`, type: "project", title: project.title, weeks: 3, status: "Not Started",
      learnItems: [`Apply: ${project.skills.join(", ")}`, "Plan scope and milestones", "Ship and document the result"] }]);
  };

  const addMissingSkillsToRoadmap = (skills) => {
    setRoadmap(prev => {
      const existingIds = new Set(prev.map(r => r.id));
      const additions = skills.filter(s => !existingIds.has(`skill-${s}`) && !existingIds.has(`added-${s}`))
        .map(s => ({ id: `added-${s}`, type: "skill", title: s, weeks: 2, status: "Not Started",
          learnItems: ["Core concepts", "Hands-on practice", "Mini exercises", "Self-assessment"] }));
      const firstNonSkillIdx = prev.findIndex(r => r.type !== "skill");
      if (firstNonSkillIdx === -1) return [...prev, ...additions];
      return [...prev.slice(0, firstNonSkillIdx), ...additions, ...prev.slice(firstNonSkillIdx)];
    });
  };

  const resetAll = () => {
    setPage("landing"); setProfile(null); setTargetCareer(null); setDiscoveryAnswers(null);
    setMatches([]); setRoadmap([]); setPendingCareer(null);
  };

  const goToChangeCareer = () => { setTargetCareer(null); setRoadmap([]); setPage("decision"); };

  // ---- Pages without sidebar shell ----
  if (page === "landing") return <Landing onStart={() => setPage("profile")} onExplore={() => setPage("career-select")} />;
  if (page === "profile") return <ProfileForm initial={profile} onSave={saveProfile} />;

  // ---- Shell (sidebar + topbar) for everything else ----
  const missingSkills = gap.filter(g => g.status !== "have").map(g => g.skill);
  const roadmapProjectIds = roadmap.filter(r => r.type === "project" && r.id.startsWith("custom-project-")).map(r => r.id.replace("custom-project-", ""));

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return targetCareer
          ? <ProgressPage career={targetCareer} readiness={readiness} roadmap={roadmap} />
          : (
            <div className="max-w-2xl mx-auto py-10">
              <PageHeader title={`Welcome${profile?.name ? ", " + profile.name : ""}`} subtitle="Let's find the right career path for you." />
              <Card className="p-6 text-center">
                <Compass size={28} className="text-indigo-600 mx-auto mb-3" />
                <p className="text-slate-600 mb-4">You haven't set a target career yet.</p>
                <PrimaryButton onClick={() => setPage("decision")} icon={ArrowRight}>Get Started</PrimaryButton>
              </Card>
            </div>
          );
      case "decision": return <CareerDecision onKnow={() => setPage("career-select")} onDiscover={() => setPage("discovery")} />;
      case "discovery": return <CareerDiscovery onComplete={completeDiscovery} />;
      case "matches": return <CareerMatches matches={matches} onSelect={selectCareer} onRetake={() => setPage("discovery")} />;
      case "career-select": return <CareerSelect onSelect={selectCareer} />;
      case "my-career": return targetCareer
        ? <MyCareer career={targetCareer} readiness={readiness} onChange={goToChangeCareer} goTo={setPage} />
        : <CareerDecision onKnow={() => setPage("career-select")} onDiscover={() => setPage("discovery")} />;
      case "skill-gap": return targetCareer && <SkillGapPage career={targetCareer} gap={gap} readiness={readiness} />;
      case "roadmap": return targetCareer && <RoadmapPage roadmap={roadmap} onStatus={setRoadmapStatus} />;
      case "projects": return targetCareer && <ProjectsPage missingSkills={missingSkills} roadmapProjectIds={roadmapProjectIds} onAdd={addProjectToRoadmap} />;
      case "resume": return targetCareer && <ResumeAnalyzer career={targetCareer} onAddMissing={addMissingSkillsToRoadmap} />;
      case "job": return targetCareer && <JobAnalyzer profile={profile} onAddMissing={addMissingSkillsToRoadmap} />;
      case "progress": return targetCareer && <ProgressPage career={targetCareer} readiness={readiness} roadmap={roadmap} />;
      case "profile-settings": return <ProfileSettings profile={profile} onUpdate={() => setPage("profile")} onChangeCareer={goToChangeCareer} theme={theme} setTheme={setTheme} onReset={resetAll} />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen flex font-body ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
      <Sidebar page={page} setPage={setPage} targetCareer={targetCareer} theme={theme} setTheme={setTheme} resetAll={resetAll} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 min-w-0">
        <Topbar profile={profile} readiness={readiness} targetCareer={targetCareer} setMobileOpen={setMobileOpen} />
        <div className="px-6 lg:px-10 pb-16">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
