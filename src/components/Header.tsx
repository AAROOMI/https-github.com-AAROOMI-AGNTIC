import React, { useState } from 'react';
import { useGrcState } from '../state';
import { Bell, Globe, Search, Plus, Moon, Mail, ShieldAlert, BadgeInfo } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    lang,
    setLang,
    isRTL,
    t,
    firebaseConnected,
    daysLeft,
    licenseKey,
    alerts,
    activeCompany,
    activeUser
  } = useGrcState();

  const [showAlerts, setShowAlerts] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  return (
    <header className="border-b border-[#00d2ff]/15 bg-[#061129] px-6 py-2.5 sticky top-0 z-30 flex items-center justify-between select-none shadow-[0_4px_16px_rgba(2,6,18,0.7)] backdrop-blur-md">
      {/* 1. Left Search engine replicating glass box inside screenshot */}
      <div className="flex-1 max-w-sm flex items-center relative mr-4 rtl:mr-0 rtl:ml-4">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none stroke-[1.5]" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full bg-[#030a1a] text-xs text-slate-200 pl-9 pr-14 py-1.5 border border-[#00d2ff]/20 rounded-md focus:border-[#00d2ff] transition-all font-sans font-normal"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1 py-0.5 rounded uppercase">
          ⌘K
        </span>
      </div>

      {/* 2. Middle & Right elements */}
      <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
        {/* Shiny Circular Plus command button */}
        <button className="w-7 h-7 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white flex items-center justify-center shadow-[0_0_12px_rgba(0,210,255,0.4)] transition-transform active:scale-95">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Live sync connection badge */}
        <div className="hidden md:flex items-center space-x-1.5 rtl:space-x-reverse bg-slate-950/80 px-2.5 py-1 border border-[#00d2ff]/10 rounded">
          <span className={`w-1.5 h-1.5 rounded-full ${firebaseConnected ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]' : 'bg-neutral-500 animate-pulse'}`}></span>
          <span className="text-[9px] text-[#8fa1b8] font-mono tracking-tight lowercase">
            {firebaseConnected ? 'cloud-synced' : 'local-airgap'}
          </span>
        </div>

        {/* System days-left counter (license status) */}
        <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse bg-slate-950/85 px-3 py-1 border border-[#00d2ff]/10 rounded">
          <div className="flex flex-col text-right rtl:text-left">
            <span className="text-[8px] text-slate-500 font-mono tracking-wider">LICENSE STATUS</span>
            <span className="text-[10px] text-slate-300 font-mono font-medium">{licenseKey}</span>
          </div>
          <div className="px-2 py-0.5 border border-cyan-500/20 text-[9px] font-mono text-cyan-300 bg-[#0d1e3d]/45 rounded">
            {daysLeft} days remaining
          </div>
        </div>

        {/* 3. Utility Icons matching top-right of image */}
        
        {/* Quick Language switcher */}
        <button
          onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
          className="p-1.5 bg-[#030a1a] hover:bg-slate-900 text-slate-300 border border-[#00d2ff]/15 rounded transition-all flex items-center space-x-1"
          title="Switch Language"
        >
          <Globe className="w-3.5 h-3.5 text-cyan-400 stroke-[1.5]" />
          <span className="text-[9px] font-mono text-cyan-400/80 uppercase">{lang === 'en' ? 'ar' : 'en'}</span>
        </button>

        {/* Moon / Dim theme button */}
        <button className="p-1.5 bg-[#030a1a] hover:bg-slate-900 text-slate-300 border border-[#00d2ff]/15 rounded transition-all">
          <Moon className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
        </button>

        {/* Message Square indicator showing exactly "12" */}
        <div className="relative">
          <button className="p-1.5 bg-[#030a1a] hover:bg-slate-900 text-slate-300 border border-[#00d2ff]/15 rounded transition-all">
            <Mail className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
            <span className="absolute -top-1 -right-1 bg-[#2563eb] text-white text-[8px] font-mono w-3.5 h-3.5 flex items-center justify-center rounded-full border border-slate-950 shadow-[0_0_8px_rgba(0,196,255,0.4)]">
              12
            </span>
          </button>
        </div>

        {/* Notification Bell alarm dropdown system */}
        <div className="relative">
          <button
            onClick={() => setShowAlerts(!showAlerts)}
            className="p-1.5 bg-[#030a1a] hover:bg-slate-900 text-slate-300 border border-[#00d2ff]/15 rounded transition-all relative"
          >
            <Bell className="w-3.5 h-3.5 text-slate-400 stroke-[1.5]" />
            {alerts.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 animate-pulse text-white text-[8px] font-mono w-3.5 h-3.5 flex items-center justify-center rounded-full border border-slate-950">
                {alerts.length}
              </span>
            )}
          </button>

          {showAlerts && (
            <div className={`absolute right-0 rtl:left-0 rtl:right-auto mt-2.5 w-80 bg-[#040d1f] border border-[#00d2ff]/20 z-50 text-slate-100 rounded shadow-2xl ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="p-2 border-b border-[#00d2ff]/15 bg-[#061129] flex items-center justify-between">
                <span className="text-[9px] uppercase font-mono tracking-wider text-cyan-300">Live Security Feed</span>
                <span className="text-[9px] text-[#8fa1b8] font-mono">realtime siem monitor</span>
              </div>
              <div className="max-h-60 overflow-y-auto divide-y divide-[#00d2ff]/10">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-2.5 hover:bg-slate-900/60">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[8px] font-mono text-slate-400">{alert.timestamp} • {alert.source}</span>
                      <span className={`text-[8px] uppercase px-1 border font-mono tracking-tight ${
                        alert.severity === 'critical' || alert.severity === 'high'
                          ? 'text-red-400 bg-red-950/40 border-red-900'
                          : 'text-amber-400 bg-amber-950/40 border-amber-900'
                      }`}>
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#cbd5e1] font-normal font-sans leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-[#00d2ff]/15 bg-[#061129] text-center">
                <button
                  onClick={() => setShowAlerts(false)}
                  className="text-[9px] text-slate-400 hover:text-white uppercase font-mono tracking-widest decoration-dashed"
                >
                  dismiss notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Active Executive User Portrait Profile details */}
        <div className="flex items-center space-x-2.5 rtl:space-x-reverse pl-2.5 border-l border-[#00d2ff]/15 rtl:border-l-0 rtl:pr-2.5 rtl:border-r">
          <div className="flex flex-col text-right rtl:text-left select-none">
            <span className="text-[11px] text-slate-200 font-sans font-medium hover:text-[#00d2ff] transition-all leading-tight">
              {activeUser?.fullName || "Admin User"}
            </span>
            <span className="text-[9px] text-slate-400 font-mono tracking-tighter block leading-tight">
              Chief Executive
            </span>
          </div>
          <div className="w-8 h-8 rounded-full border border-cyan-400/50 p-0.5 shadow-[0_0_8px_rgba(0,196,255,0.25)] relative overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
              alt="Admin Profile"
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
