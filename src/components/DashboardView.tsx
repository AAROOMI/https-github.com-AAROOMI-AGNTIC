import React, { useState } from 'react';
import { useGrcState } from '../state';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Boxes, 
  Sliders, 
  FileCheck2, 
  Lock, 
  BarChart3, 
  TrendingUp, 
  Volume2, 
  Mic, 
  CheckSquare, 
  Plus, 
  UploadCloud, 
  BookOpen, 
  Printer, 
  Sparkles,
  Play,
  Calendar,
  AlertTriangle
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    t,
    isRTL,
    addSecurityAlert
  } = useGrcState();

  const [activeTaskCount, setActiveTaskCount] = useState(12);
  const [listeningMic, setListeningMic] = useState(true);

  // Quick Action Handler to add a security dynamic alert feedback
  const handleQuickAction = (actionTitle: string) => {
    addSecurityAlert("GRC Command Desk", `Triggered quick action: ${actionTitle}`, "low");
  };

  // Heatmap layout: Exactly replicating the numbers from the screenshot
  // Coordinates are represented as { likelihood, impact, count, score }
  const heatPoints = [
    { likelihood: 5, impact: 2, num: 2, severity: 'critical' },
    { likelihood: 4, impact: 3, num: 3, severity: 'critical' },
    { likelihood: 4, impact: 4, num: 4, severity: 'critical' },
    { likelihood: 3, impact: 1, num: 7, severity: 'medium' },
    { likelihood: 3, impact: 2, num: 7, severity: 'medium' },
    { likelihood: 3, impact: 5, num: 8, severity: 'critical' },
    { likelihood: 2, impact: 3, num: 1, severity: 'medium' }
  ];

  const getHeatPoint = (l: number, i: number) => {
    return heatPoints.find(p => p.likelihood === l && p.impact === i);
  };

  return (
    <div id="main-dashboard-container" className="space-y-5 select-none text-slate-200">
      
      {/* SECTION 1: 5-Metric Score Panels Header Grid */}
      <div id="kpi-score-panels-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        {/* Metric Card 1: GRC Score */}
        <div id="metric-grc-score" className="bg-white p-3.5 border border-[#00d2ff]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Overall GRC Score</span>
            <span className="text-[10px] text-emerald-400 font-mono">↑ 6% vs last month</span>
          </div>
          <div>
            <span className="text-xl font-normal text-emerald-400 tracking-tight font-sans">86%</span>
            <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: '86%' }}></div>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Compliance Score */}
        <div id="metric-compliance-score" className="bg-white p-3.5 border border-[#00d2ff]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Compliance Score</span>
            <span className="text-[10px] text-emerald-400 font-mono">↑ 7% vs last month</span>
          </div>
          <div>
            <span className="text-xl font-normal text-cyan-400 tracking-tight font-sans">88%</span>
            <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full" style={{ width: '88%' }}></div>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Risk Score */}
        <div id="metric-risk-score" className="bg-white p-3.5 border border-[#00d2ff]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Risk Score</span>
            <span className="text-[10px] text-yellow-400 font-mono">↑ 4% vs last month</span>
          </div>
          <div>
            <span className="text-xl font-normal text-yellow-400 tracking-tight font-sans">72%</span>
            <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>
        </div>

        {/* Metric Card 4: Audit Readiness */}
        <div id="metric-audit-readiness" className="bg-white p-3.5 border border-[#00d2ff]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Audit Readiness</span>
            <span className="text-[10px] text-emerald-400 font-mono">↑ 8% vs last month</span>
          </div>
          <div>
            <span className="text-xl font-normal text-emerald-400 tracking-tight font-sans">90%</span>
            <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>

        {/* Metric Card 5: Safety Score */}
        <div id="metric-safety-score" className="bg-white p-3.5 border border-[#00d2ff]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider font-mono">Safety Score</span>
            <span className="text-[10px] text-emerald-400 font-mono">↑ 5% vs last month</span>
          </div>
          <div>
            <span className="text-xl font-normal text-sky-400 tracking-tight font-sans">91%</span>
            <div className="w-full h-1 bg-slate-950 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-sky-600 to-sky-400 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* Grid wrapper around Left details and Right sidebar profile columns */}
      <div id="dashboard-two-column-layout" className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* LEFT COLUMN: PRIMARY MODULE VIEWS AND CHARTS */}
        <div id="left-workspace-column" className="lg:col-span-9 space-y-5">
          
          {/* MODULE A: GRC COMMAND CENTER ACTION PALETTE */}
          <div id="grc-command-center-widget" className="bg-white p-4 border border-[#00d2ff]/15">
            <h3 className="text-xs font-medium text-slate-300 uppercase tracking-wider mb-3.5 font-mono">
              GRC Command Center
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
              
              {/* Button 1: Governance */}
              <button 
                onClick={() => handleQuickAction("Governance Hub")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-purple-500/25 hover:border-purple-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform mb-2">
                  <Boxes className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Governance</span>
              </button>

              {/* Button 2: Risk */}
              <button 
                onClick={() => handleQuickAction("Risk Matrix")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-amber-500/25 hover:border-amber-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform mb-2">
                  <ShieldAlert className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Risk</span>
              </button>

              {/* Button 3: Compliance */}
              <button 
                onClick={() => handleQuickAction("Compliance Registry")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-emerald-500/25 hover:border-emerald-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-2">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Compliance</span>
              </button>

              {/* Button 4: Controls */}
              <button 
                onClick={() => handleQuickAction("Controls Inspector")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-cyan-500/25 hover:border-cyan-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-cyan-400/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-2">
                  <Sliders className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Controls</span>
              </button>

              {/* Button 5: Audit */}
              <button 
                onClick={() => handleQuickAction("Assistance audits")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-pink-500/25 hover:border-pink-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform mb-2">
                  <FileCheck2 className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Audit</span>
              </button>

              {/* Button 6: Safety */}
              <button 
                onClick={() => handleQuickAction("Operations Desk")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-yellow-500/25 hover:border-yellow-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform mb-2">
                  <AlertTriangle className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Safety</span>
              </button>

              {/* Button 7: Privacy */}
              <button 
                onClick={() => handleQuickAction("Privacy Guardian")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-sky-500/25 hover:border-sky-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-sky-500/10 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform mb-2">
                  <Lock className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">Privacy</span>
              </button>

              {/* Button 8: PMO */}
              <button 
                onClick={() => handleQuickAction("PMO Ledger")}
                className="flex flex-col items-center justify-center p-3.5 bg-gradient-to-b from-[#0c1e3d]/70 to-[#020613]/90 rounded border border-blue-500/25 hover:border-blue-400 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4)] group"
              >
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform mb-2">
                  <BarChart3 className="w-5 h-5 stroke-[1.5]" />
                </div>
                <span className="text-[10px] text-slate-300 font-sans tracking-tight">PMO</span>
              </button>

            </div>
          </div>

          {/* MODULE B: THERMAL MAP, TOP THREATS AND COMPLIANCE DONUT SPIT */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            
            {/* 1. Heat Matrix block panel (5 columns grid) */}
            <div id="risk-heatmap-block" className="md:col-span-5 bg-white p-4 border border-[#00d2ff]/15 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300 mb-1">
                  Risk Heat Map
                </h4>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] text-[#8fa1b8] lowercase font-normal">likelihood vs impact matrix distribution</span>
                </div>
              </div>
              
              {/* Exact 5x5 thermal scale layout */}
              <div className="grid grid-cols-6 gap-1 w-full text-center relative select-none">
                
                {/* Empty corner block */}
                <div className="text-[9px] font-mono text-slate-500 flex items-center justify-center h-7 font-normal">
                  L / I
                </div>
                
                {/* Impact horizontal labels */}
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="text-[9px] font-mono text-slate-500 flex items-center justify-center font-normal">
                    {i}
                  </div>
                ))}

                {/* Likelihood vertical + grid tiles from 5 down to 1 */}
                {[5, 4, 3, 2, 1].map(l => (
                  <React.Fragment key={l}>
                    {/* Likelihood left labels */}
                    <div className="text-[9px] font-mono text-slate-500 flex items-center justify-center h-8 font-normal">
                      {l}
                    </div>

                    {[1, 2, 3, 4, 5].map(i => {
                      const value = l * i;
                      const hasPoint = getHeatPoint(l, i);

                      // Design zone colors matching image
                      let cellClass = "bg-emerald-500/20 text-emerald-400/80 border-emerald-500/10";
                      if (value >= 15) {
                        cellClass = "bg-red-500/20 text-red-400 border-red-500/20";
                      } else if (value >= 9) {
                        cellClass = "bg-orange-500/20 text-orange-400 border-orange-500/20";
                      } else if (value >= 4) {
                        cellClass = "bg-yellow-500/15 text-yellow-400 border-yellow-500/15";
                      }

                      return (
                        <div 
                          key={`${l}-${i}`}
                          className={`border rounded-sm flex items-center justify-center h-8 relative transition-all ${cellClass}`}
                          title={`Likelihood ${l} × Impact ${i} = Score ${value}`}
                        >
                          {/* Inner circle counts precisely matching photograph */}
                          {hasPoint ? (
                            <div className="w-5.5 h-5.5 rounded-full bg-orange-500/90 hover:scale-115 text-white flex items-center justify-center text-[10px] font-mono shadow-[0_0_8px_rgba(251,146,60,0.8)] transition-transform font-normal">
                              {hasPoint.num}
                            </div>
                          ) : (
                            <span className="text-[8px] opacity-25 font-mono font-normal">{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-center mt-3 text-[10px] font-mono text-slate-500 font-normal">
                Impact Score &rsaquo;
              </div>
            </div>

            {/* 2. Top Risks tracker table */}
            <div id="top-risks-registry-card" className="md:col-span-4 bg-white p-4 border border-[#00d2ff]/15 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-0.5">
                  <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300">
                    Top Risks
                  </h4>
                  <span className="text-[9px] text-[#8fa1b8] font-mono">Risk Score</span>
                </div>
                <div className="h-0.5 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-transparent mb-3"></div>

                <div className="space-y-2.5">
                  {[
                    { id: 'R1', label: 'Cybersecurity Threats', score: 24, badge: 'High', color: 'text-red-400 border-red-500/30 bg-red-950/20' },
                    { id: 'R2', label: 'Non-Compliance with PDPL', score: 20, badge: 'High', color: 'text-red-400 border-red-500/30 bg-red-950/20' },
                    { id: 'R3', label: 'Third Party / Vendor Risk', score: 16, badge: 'Medium', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-950/10' },
                    { id: 'R4', label: 'Business Continuity Failure', score: 14, badge: 'Medium', color: 'text-yellow-400 border-yellow-500/20 bg-yellow-950/10' },
                    { id: 'R5', label: 'Data Breach Exposure', score: 12, badge: 'High', color: 'text-orange-400 border-orange-500/30 bg-orange-950/20' }
                  ].map((risk) => (
                    <div key={risk.id} className="p-2 bg-[#020712] border border-[#00d2ff]/10 rounded flex items-center justify-between hover:border-[#00d2ff]/30 transition-colors">
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5 rtl:space-x-reverse mb-0.5">
                          <span className="font-mono text-[9px] text-[#00d2ff]">{risk.id}</span>
                          <span className={`text-[8px] font-mono px-1 rounded border ${risk.color}`}>{risk.badge}</span>
                        </div>
                        <p className="text-[10px] text-slate-300 truncate font-normal leading-tight">{risk.label}</p>
                      </div>
                      <span className="font-mono text-xs font-medium text-red-400 text-right pr-1">
                        {risk.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Donut status ratio diagram */}
            <div id="compliance-domains-donut" className="md:col-span-3 bg-white p-4 border border-[#00d2ff]/15 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300 mb-3">
                  Compliance Status
                </h4>

                {/* SVG solid ring representation */}
                <div className="flex justify-center my-3 relative">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2a3b56" strokeWidth="2.5" />
                    {/* Ring pieces */}
                    {/* Compliant: 68% (offset 0) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="68 100" strokeDashoffset="0" />
                    {/* Partially: 22% (offset -68) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="22 100" strokeDashoffset="-68" />
                    {/* Non: 7% (offset -90) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f87171" strokeWidth="15.91" strokeDasharray="7 100" strokeDashoffset="-90" fillOpacity="0" />
                    {/* Not Assessed: 3% (offset -97) */}
                    <circle cx="18" cy="18" r="15.91" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 100" strokeDashoffset="-97" />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-base font-normal font-sans leading-none text-slate-200">88%</p>
                    <span className="text-[8px] text-[#8fa1b8] uppercase font-mono tracking-tighter">Avg Score</span>
                  </div>
                </div>
              </div>

              {/* Colorful status metrics table column */}
              <div className="space-y-1.5 pt-2 border-t border-[#00d2ff]/10">
                <div className="flex items-center justify-between text-[10px] font-normal leading-tight font-sans">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <span className="w-2 h-2 rounded bg-[#10b981]"></span>
                    <span className="text-[#cbd5e1] font-normal">Compliant</span>
                  </div>
                  <span className="font-mono text-slate-400">68%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-normal leading-tight font-sans">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <span className="w-2 h-2 rounded bg-[#fbbf24]"></span>
                    <span className="text-[#cbd5e1] font-normal">Partially Compliant</span>
                  </div>
                  <span className="font-mono text-slate-400">22%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-normal leading-tight font-sans">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <span className="w-2 h-2 rounded bg-[#f87171]"></span>
                    <span className="text-[#cbd5e1] font-normal">Non-Compliant</span>
                  </div>
                  <span className="font-mono text-slate-400">7%</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-normal leading-tight font-sans">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                    <span className="w-2 h-2 rounded bg-[#38bdf8]"></span>
                    <span className="text-[#cbd5e1] font-normal">Not Assessed</span>
                  </div>
                  <span className="font-mono text-slate-400">3%</span>
                </div>
              </div>

            </div>

          </div>

          {/* MODULE C: INTERMEDIATE TRI-GAUGE DONUTS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Donut Block 1: Assessments Overview */}
            <div className="bg-white p-4 border border-[#00d2ff]/15 flex items-center space-x-4">
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#202c44" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="43 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#2563eb" strokeWidth="4" strokeDasharray="29 100" strokeDashoffset="-43" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="19 100" strokeDashoffset="-72" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-200">42</span>
                  <span className="text-[7px] text-slate-500 uppercase font-mono">Total</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-mono text-[#cbd5e1] uppercase tracking-wider mb-2">Assessments Overview</h5>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-normal text-slate-400">
                  <p><span className="text-slate-300">● Comp:</span> 18 (43%)</p>
                  <p><span className="text-blue-400">● InProg:</span> 12 (29%)</p>
                  <p><span className="text-slate-300">● NotSt:</span> 8 (19%)</p>
                  <p><span className="text-red-400">● Overd:</span> 4 (9%)</p>
                </div>
              </div>
            </div>

            {/* Donut Block 2: Projects & Initiatives */}
            <div className="bg-white p-4 border border-[#00d2ff]/15 flex items-center space-x-4">
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#202c44" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-50" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="14 100" strokeDashoffset="-75" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-200">28</span>
                  <span className="text-[7px] text-slate-500 uppercase font-mono">Total</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-mono text-[#cbd5e1] uppercase tracking-wider mb-2">Projects & Initiatives</h5>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-normal text-slate-400">
                  <p><span className="text-emerald-400">● OnTrk:</span> 14 (50%)</p>
                  <p><span className="text-amber-400">● AtRisk:</span> 7 (25%)</p>
                  <p><span className="text-red-400">● Del:</span> 4 (14%)</p>
                  <p><span className="text-slate-300">● Done:</span> 3 (11%)</p>
                </div>
              </div>
            </div>

            {/* Donut Block 3: Training Progress */}
            <div className="bg-white p-4 border border-[#00d2ff]/15 flex items-center space-x-4">
              <div className="relative">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#202c44" strokeWidth="3.5" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="50 100" strokeDashoffset="0" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-50" />
                  <circle cx="18" cy="18" r="15.91" fill="none" stroke="#a855f7" strokeWidth="4" strokeDasharray="16 100" strokeDashoffset="-75" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-xs text-slate-200">256</span>
                  <span className="text-[7px] text-slate-500 uppercase font-mono">Users</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="text-[11px] font-mono text-[#cbd5e1] uppercase tracking-wider mb-2">Training Progress</h5>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] font-normal text-slate-400">
                  <p><span className="text-emerald-400">● Pass:</span> 128 (50%)</p>
                  <p><span className="text-blue-400">● Active:</span> 64 (25%)</p>
                  <p><span className="text-purple-400">● NotSt:</span> 40 (16%)</p>
                  <p><span className="text-red-400">● Fail:</span> 24 (9%)</p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: EXECUTIVE VOICE DESK SIDEBAR */}
        <div id="right-desk-column" className="lg:col-span-3 space-y-5">
          
          {/* PROFILE CARD A: TRAINING & ACOUSTIC VOICE */}
          <div className="bg-white p-4 border border-[#00d2ff]/15 text-center relative overflow-hidden flex flex-col justify-between h-[230px]">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-slate-400 uppercase font-mono tracking-widest leading-none">Training Status</span>
              <span className="text-xs text-slate-300 font-mono">78%</span>
            </div>
            
            {/* Female GRC Manager portrait matching layout exactly */}
            <div className="my-2.5 flex justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-cyan-400/50 p-1 relative shadow-[0_0_12px_rgba(0,196,255,0.35)] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300"
                  alt="Training Desk portrait"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Audio Voice listening indicator */}
            <div className="flex items-center justify-around px-8 mt-1.5 select-none text-slate-400">
              <button className="p-1 hover:text-[#00d2ff]">
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              
              {/* Telemetry wave bars wrapper */}
              <div className="flex items-center space-x-1 h-5">
                {[2, 4, 3, 5, 2, 4, 3].map((val, idx) => (
                  <span 
                    key={idx} 
                    className="w-0.5 bg-[#00d2ff]/80 animate-pulse rounded-full" 
                    style={{ 
                      height: `${val * 3.5}px`, 
                      animationDelay: `${idx * 150}ms`,
                      animationDuration: '0.8s'
                    }}
                  ></span>
                ))}
              </div>

              <button className="p-1 hover:text-red-400">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
            <p className="text-[9px] text-cyan-300 font-mono mt-1.5 lowercase tracking-wider">
              {listeningMic ? 'Listening...' : 'voice standby'}
            </p>
          </div>

          {/* ACTIVE MISSION TARGET PROGRESS */}
          <div className="bg-white p-3.5 border border-[#00d2ff]/15 flex flex-col justify-between">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#8fa1b8] block leading-none mb-1">Your Active Mission</span>
            <div>
              <p className="text-xs text-slate-200 font-sans font-medium hover:text-[#00d2ff] transition-colors leading-relaxed">
                ISO 27001 Certification
              </p>
              <div className="flex items-center justify-between text-[10px] mt-1 text-slate-400">
                <span className="font-normal font-sans">65% Complete</span>
                <span className="font-mono text-cyan-400">Phase 3</span>
              </div>
              <div className="w-full h-1 bg-slate-950 mt-1.5 overflow-hidden rounded">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded" style={{ width: '65%' }}></div>
              </div>
              <span className="text-[8px] text-slate-500 font-mono mt-1 block">Due: 30 Sep 2026 • Lead Assessor</span>
            </div>
          </div>

          {/* ALERTS AND COMMUNICATIONS CONTAINER */}
          <div id="alerts-ticker-panel" className="bg-white p-3.5 border border-[#00d2ff]/15">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#8fa1b8] leading-none">Alerts & Notifications</span>
              <button onClick={() => addSecurityAlert("SIEM Desk", "Refreshed event monitoring queues.", "low")} className="text-[8px] uppercase tracking-wider font-mono text-cyan-400 hover:underline">View All</button>
            </div>
            <div className="space-y-2 mt-2">
              {[
                { label: "High Risk: Data Breach Detected", time: "2m ago", color: "text-red-400" },
                { label: "Compliance Gap: PDPL Article 30", time: "15m ago", color: "text-yellow-400" },
                { label: "Audit: Required Evidence Missing", time: "1h ago", color: "text-yellow-400" },
                { label: "Policy Review Due: GRC-A.5.1", time: "2h ago", color: "text-cyan-400" },
              ].map((al, idx) => (
                <div key={idx} className="flex items-start justify-between text-[10px] py-1 border-b border-white/5 last:border-none">
                  <div className="flex items-center space-x-1.5 rtl:space-x-reverse min-w-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 animate-ping"></span>
                    <p className="text-slate-300 truncate font-normal leading-normal">{al.label}</p>
                  </div>
                  <span className="text-[8px] text-slate-500 font-mono ml-2 flex-shrink-0">{al.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK COMMANDS LAUNCHER ACTIONS */}
          <div id="quick-launcher-cell" className="bg-white p-3.5 border border-[#00d2ff]/15">
            <span className="text-[9px] uppercase font-mono tracking-widest text-[#8fa1b8] block leading-none mb-3">Quick Actions</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "New Assessment", icon: CheckSquare },
                { name: "Add Risk", icon: Plus },
                { name: "Upload Evidence", icon: UploadCloud },
                { name: "Generate Report", icon: Printer },
                { name: "Create Policy", icon: BookOpen },
                { name: "Start Audit", icon: Calendar },
                { name: "Task Manager", icon: CheckSquare },
                { name: "AI Ask GRCOS", icon: Sparkles },
              ].map((qa, index) => {
                const Icon = qa.icon;
                return (
                  <button 
                    key={index} 
                    onClick={() => handleQuickAction(qa.name)} 
                    className="flex flex-col items-center justify-center p-2 rounded bg-slate-950/40 border border-[#00d2ff]/10 hover:border-cyan-400/50 hover:bg-slate-900 transition-all group"
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 mb-1" />
                    <span className="text-[8px] text-slate-300 leading-tight text-center font-sans tracking-tighter">{qa.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* SECTION 3: TREND TIMELINE SPLIT GRAPH OVERVIEW (LAST 6 MONTHS) */}
      <div id="trend-analysis-card" className="bg-white p-4 border border-[#00d2ff]/15">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-300 leading-none">
              Trend Analysis (Last 6 Months)
            </h4>
            <p className="text-[9px] text-[#8fa1b8] lowercase font-normal mt-1">Multi-vector metric tracking timeline development</p>
          </div>
          
          {/* Custom micro legends matching screenshot perfectly */}
          <div className="flex flex-wrap gap-2.5 text-[8px] font-mono select-none">
            <span className="flex items-center space-x-1"><span className="w-2 h-0.5 bg-emerald-400 block"></span><span className="text-slate-400 font-normal">Compliance Score</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-0.5 bg-orange-400 block"></span><span className="text-slate-400 font-normal">Risk Score</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-0.5 bg-blue-400 block"></span><span className="text-slate-400 font-normal">Audit Readiness</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-0.5 bg-yellow-400 block"></span><span className="text-slate-400 font-normal">Safety Score</span></span>
            <span className="flex items-center space-x-1"><span className="w-2 h-0.5 bg-purple-400 block"></span><span className="text-slate-400 font-normal">Training Status</span></span>
          </div>
        </div>

        {/* High quality high fidelity grid and SVG timelines */}
        <div className="relative h-44 w-full px-1 flex flex-col justify-between">
          
          {/* Splicing grid layout references */}
          <div className="absolute inset-x-0 top-0 h-full flex flex-col justify-between pointer-events-none text-[8px] font-mono text-slate-600">
            <div className="w-full border-b border-white/5 pb-0.5">100%</div>
            <div className="w-full border-b border-white/5 pb-0.5">75%</div>
            <div className="w-full border-b border-white/5 pb-0.5">50%</div>
            <div className="w-full border-b border-white/5 pb-0.5">25%</div>
            <div className="w-full border-b border-white/5 pb-0.5">0%</div>
          </div>

          {/* SVG line canvas curves mapping exactly like screenshot */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 176" preserveAspectRatio="none">
            {/* 1. Compliance Score Line (Green) */}
            <path d="M 0,132 Q 200,110 400,90 T 800,75 T 1000,68" fill="none" stroke="#34d399" strokeWidth="1.5" />
            <circle cx="200" cy="115" r="2.5" fill="#34d399" />
            <circle cx="400" cy="90" r="2.5" fill="#34d399" />
            <circle cx="600" cy="80" r="2.5" fill="#34d399" />
            <circle cx="800" cy="75" r="2.5" fill="#34d399" />
            
            {/* 2. Risk Score Line (Orange) */}
            <path d="M 0,110 Q 200,120 400,100 T 800,92 T 1000,85" fill="none" stroke="#fb923c" strokeWidth="1.5" />
            <circle cx="200" cy="114" r="2.5" fill="#fb923c" />
            <circle cx="400" cy="100" r="2.5" fill="#fb923c" />
            <circle cx="600" cy="95" r="2.5" fill="#fb923c" />
            <circle cx="800" cy="92" r="2.5" fill="#fb923c" />

            {/* 3. Audit Readiness Score Line (Blue) */}
            <path d="M 0,150 Q 200,125 400,110 T 800,85 T 1000,74" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
            <circle cx="200" cy="133" r="2.5" fill="#60a5fa" />
            <circle cx="400" cy="110" r="2.5" fill="#60a5fa" />
            <circle cx="800" cy="85" r="2.5" fill="#60a5fa" />

            {/* 4. Safety Score Line (Yellow) */}
            <path d="M 0,105 Q 200,90 400,85 T 800,72 T 1000,60" fill="none" stroke="#facc15" strokeWidth="1.5" />
            <circle cx="200" cy="98" r="2.5" fill="#facc15" />
            <circle cx="400" cy="85" r="2.5" fill="#facc15" />
            <circle cx="800" cy="72" r="2.5" fill="#facc15" />

            {/* 5. Training Status Line (Purple) */}
            <path d="M 0,165 Q 200,140 400,128 T 800,105 T 1000,90" fill="none" stroke="#c084fc" strokeWidth="1.5" />
            <circle cx="200" cy="151" r="2.5" fill="#c084fc" />
            <circle cx="400" cy="128" r="2.5" fill="#c084fc" />
            <circle cx="800" cy="105" r="2.5" fill="#c084fc" />
          </svg>

          {/* Empty spacer spacer to hold bottom labels */}
          <div className="h-full"></div>
          
          {/* Horizontal Months Labels */}
          <div className="w-full flex justify-between px-16 text-[9px] font-mono text-slate-400 z-10 pt-2 border-t border-slate-900 font-normal uppercase">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

        </div>
      </div>

    </div>
  );
};
