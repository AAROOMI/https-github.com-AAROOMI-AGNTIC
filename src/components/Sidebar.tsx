import React from 'react';
import { useGrcState } from '../state';
import {
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  ClipboardList,
  Binary,
  Database,
  GraduationCap,
  Settings,
  HelpCircle,
  FolderLock,
  Boxes,
  Users,
  Activity,
  UserCheck,
  FileCheck2,
  LineChart,
  Volume2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, isRTL, firebaseConnected } = useGrcState();

  // Menu items matched directly to the uploaded GRC Command Center & Sidebar schema
  const menuItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
    { id: 'boardroom', label: 'GRC Command Center / Board', icon: Users },
    { id: 'governance', label: 'Governance', icon: Boxes },
    { id: 'aro', label: 'Risk Management', icon: ClipboardList },
    { id: 'compliance', label: 'Compliance & NCA ECC', icon: ShieldCheck },
    { id: 'controls', label: 'Internal Controls', icon: FolderLock },
    { id: 'audit', label: 'Audit & Assurance', icon: FileCheck2 },
    { id: 'safety', label: 'Operations & Safety', icon: ShieldAlert },
    { id: 'assets', label: 'Privacy & Data', icon: Database },
    { id: 'thirdparty', label: 'Third Party Risk', icon: UserCheck },
    { id: 'training', label: 'Training Academy', icon: GraduationCap },
    { id: 'blockchain', label: 'Evidence Center (Ledger)', icon: Binary },
    { id: 'reports', label: 'Reports & Analytics', icon: LineChart },
    { id: 'setup', label: 'Settings & Integrations', icon: Settings }
  ];

  return (
    <aside className="w-64 bg-[#040d1f] border-r border-[#00d2ff]/15 flex flex-col h-screen sticky top-0 overflow-y-auto shrink-0 select-none">
      {/* Brand Header with GRC OS AI */}
      <div className="p-4 border-b border-[#00d2ff]/15 flex items-center space-x-3 rtl:space-x-reverse bg-gradient-to-r from-[#061129] to-[#020712]">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0284c7] to-[#00d2ff] flex items-center justify-center p-1 shadow-[0_0_15px_rgba(0,210,255,0.4)]">
          <ShieldCheck className="w-6 h-6 text-white stroke-[1.5]" />
        </div>
        <div>
          <h2 className="text-sm font-medium tracking-wider text-white font-sans uppercase">
            GRCOS AI
          </h2>
          <span className="text-[10px] text-[#00d2ff] font-mono lowercase block">
            AI-Powered GRC Platform
          </span>
        </div>
      </div>

      {/* Main Navigation Segment */}
      <div className="px-3 pt-4 text-[9px] font-mono text-[#8fa1b8] uppercase tracking-widest block opacity-75">
        MAIN NAVIGATION
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || 
            (item.id === 'aro' && activeTab === 'aro') || 
            (item.id === 'assets' && activeTab === 'assets') ||
            (item.id === 'blockchain' && activeTab === 'blockchain') ||
            (item.id === 'training' && activeTab === 'training') ||
            (item.id === 'setup' && activeTab === 'setup');
            
          // Map visual helper to state tab logic
          const handleTabClick = () => {
            if (item.id === 'aro') setActiveTab('aro');
            else if (item.id === 'assets') setActiveTab('assets');
            else if (item.id === 'blockchain') setActiveTab('blockchain');
            else if (item.id === 'training') setActiveTab('training');
            else if (item.id === 'setup') setActiveTab('setup');
            else if (item.id === 'boardroom') setActiveTab('boardroom');
            else if (item.id === 'compliance') setActiveTab('compliance');
            else setActiveTab('dashboard');
          };

          return (
            <button
              key={item.id}
              onClick={handleTabClick}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded transition-all duration-200 ${
                activeTab === item.id || (item.id === 'boardroom' && activeTab === 'boardroom') || (item.id === 'aro' && activeTab === 'aro') || (item.id === 'compliance' && activeTab === 'compliance') || (item.id === 'assets' && activeTab === 'assets') || (item.id === 'training' && activeTab === 'training') || (item.id === 'blockchain' && activeTab === 'blockchain') || (item.id === 'setup' && activeTab === 'setup') && activeTab === item.id
                  ? 'bg-gradient-to-r from-sky-950/80 to-blue-900/40 text-cyan-300 border border-cyan-500/30 shadow-[0_0_12px_rgba(0,196,255,0.08)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-2.5 rtl:space-x-reverse">
                <Icon className={`w-3.5 h-3.5 stroke-[1.25] ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-[11px] font-sans font-normal antialiased">
                  {item.label}
                </span>
              </div>
              
              {/* Optional neon arrow indicators matching image sidebar caret details */}
              <span className="text-[9px] text-[#00d2ff]/45 select-none font-mono">
                &rsaquo;
              </span>
            </button>
          );
        })}
      </nav>

      {/* Decorative AI Assistant Bubble at the bottom of the navigation rail */}
      <div className="p-3 border-t border-[#00d2ff]/10 bg-black/25">
        <div className="relative group overflow-hidden rounded bg-[#010a1a] border border-[#00d2ff]/20 p-2.5 flex items-center space-x-2.5 rtl:space-x-reverse shadow-[inset_0_1px_4px_rgba(0,0,0,0.6)]">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-white opacity-80 animate-ping"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-cyan-300 uppercase font-mono tracking-wider font-normal">
              AI Assistant
            </p>
            <p className="text-[9px] text-[#8fa1b8] truncate font-normal leading-tight">
              Ready for voice telemetry
            </p>
          </div>
        </div>
        
        {/* Fine subtext copyright label */}
        <div className="text-[8px] text-center text-[#556982] font-mono mt-3 uppercase tracking-wider">
          © 2026 GRCOS AI. Saudi Ready
        </div>
      </div>
    </aside>
  );
};

