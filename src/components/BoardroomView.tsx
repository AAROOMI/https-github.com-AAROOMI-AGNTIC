import React, { useState } from 'react';
import { useGrcState } from '../state';
import { Users, HelpCircle, Save, MessageSquareCode, Mic, Bot } from 'lucide-react';

interface BoardMember {
  role: string;
  name: string;
  avatarInitials: string;
  color: string;
  specialty: string;
}

export const BoardroomView: React.FC = () => {
  const { isRTL, t, localLlmChat, grantCeoApproval, approvals } = useGrcState();

  const [question, setQuestion] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState<string | null>(null);
  const [chatLog, setChatLog] = useState<{ sender: string; text: string; role: string }[]>([
    {
      sender: "Administrator",
      role: "System Admin",
      text: isRTL
        ? "أهلاً بكم في قاعة اجتماعات الحوكمة والامتثال السيبرانية. أطرح سؤالك وسأقوم بتوجيهه للخبير المختص."
        : "Welcome to the GRC Boardroom meeting. Fire a compliance or security question, and I will route it to the appropriate expert."
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [momCompiled, setMomCompiled] = useState(false);

  const boardMembers: BoardMember[] = [
    { role: "CISO", name: "Eng. Faisal bin Khalid", avatarInitials: "FK", color: "border-neutral-900 bg-neutral-900 text-white", specialty: "overall security postures" },
    { role: "CIO", name: "Mr. Sulaiman Al-Ghamdi", avatarInitials: "SG", color: "border-neutral-800 bg-neutral-100 text-neutral-800", specialty: "it coordinates architectures" },
    { role: "CTO", name: "Dr. Tariq bin Saud", avatarInitials: "TS", color: "border-neutral-800 bg-neutral-200 text-neutral-800", specialty: "technological infrastructures" },
    { role: "DPO", name: "Eng. Norah Al-Otaibi", avatarInitials: "NO", color: "border-neutral-800 bg-neutral-300 text-neutral-800", specialty: "gdpr & privacy compliance mandates" },
    { role: "Internal Auditor", name: "Mr. Abdulaziz bin Salem", avatarInitials: "AS", color: "border-neutral-800 bg-neutral-400 text-neutral-800", specialty: "audit gaps & findings life cycle" },
    { role: "Risk Officer", name: "Eng. Emeka Okafor", avatarInitials: "EO", color: "border-neutral-800 bg-neutral-500 text-neutral-800", specialty: "iso 31000 assessor & heatmap zone" },
    { role: "Security Officer", name: "Eng. Bandar Al-Harbi", avatarInitials: "BH", color: "border-neutral-800 bg-neutral-600 text-neutral-800", specialty: "siem monitor & firewalls alerts" },
    { role: "Compliance Officer", name: "Mrs. Nouf Al-Dossary", avatarInitials: "ND", color: "border-neutral-800 bg-neutral-700 text-neutral-800", specialty: "national controls nca ecc" },
    { role: "Administrator", name: "System Orchestrator", avatarInitials: "SO", color: "border-neutral-950 bg-neutral-950 text-white", specialty: "orchestration & moments generator" }
  ];

  // Route question to correct target
  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setIsProcessing(true);
    const userMsg = question;
    setChatLog(prev => [...prev, { sender: "You", role: "Operator", text: userMsg }]);
    setQuestion("");

    // Identify target advisor automatically based on keyword matching
    let targetIndex = 8; // Coordinator default
    const qLower = userMsg.toLowerCase();
    if (qLower.includes('risk') || qLower.includes('matrix') || qLower.includes('خطر') || qLower.includes('ارو')) {
      targetIndex = 5; // Risk Officer
    } else if (qLower.includes('nca') || qLower.includes('ecc') || qLower.includes('شروط') || qLower.includes('ضوابط')) {
      targetIndex = 7; // Compliance Officer
    } else if (qLower.includes('code') || qLower.includes('tech') || qLower.includes('برمج') || qLower.includes('تطوير')) {
      targetIndex = 2; // CTO
    } else if (qLower.includes('privacy') || qLower.includes('gdpr') || qLower.includes('خصوص') || qLower.includes('داتا')) {
      targetIndex = 3; // DPO
    } else if (qLower.includes('audit') || qLower.includes('gap') || qLower.includes('تدقيق') || qLower.includes('فحص')) {
      targetIndex = 4; // Auditor
    } else if (qLower.includes('alert') || qLower.includes('siem') || qLower.includes('جدار') || qLower.includes('تنبيه')) {
      targetIndex = 6; // Security Officer
    } else if (qLower.includes('infrastructure') || qLower.includes('cloud') || qLower.includes('شبكة')) {
      targetIndex = 0; // CISO
    }

    const speaker = boardMembers[targetIndex];
    setActiveSpeaker(speaker.role);

    // Call Local GRC Assistant LLM Fallback (providing 100% disconnect state safety)
    const reply = await localLlmChat(userMsg, speaker.role === "Risk Officer" ? "Risk Analyzer" : speaker.role === "Compliance Officer" ? "Compliance Auditor" : "Welcome/Onboarding");

    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: speaker.name, role: speaker.role, text: reply }]);
      setIsProcessing(false);

      // Synthesize answer locally inside browser (Local Speech guide)
      try {
        const synth = window.speechSynthesis;
        if (synth) {
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.lang = isRTL ? 'ar-SA' : 'en-US';
          utterance.rate = 1.05;
          synth.speak(utterance);
        }
      } catch (e) {}
    }, 1100);
  };

  // Compile Boardroom Minutes of Meeting (MOM)
  const handleSaveMom = () => {
    setMomCompiled(true);
    grantCeoApproval("mom-boardroom-session", "Boardroom Minutes of Meeting");
    setTimeout(() => setMomCompiled(false), 2400);
  };

  const quickTopicTemplates = [
    { label: "ISO 31000 Risk Assessors", value: "How do we compute Residual Risk conforming to ISO 31000?" },
    { label: "NCA ECC Compliance status", value: "What implementation audits are required for Saudi NCA ECC?" },
    { label: "CIA Triad Gaps", value: "What is our Disaster Recovery RTO policy on SQL assets?" }
  ];

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Boardroomoval physical layout visualization */}
      <div className="bg-white p-4 border border-neutral-100 relative">
        <div className="mb-4">
          <h3 className="text-xs font-medium text-neutral-800 uppercase tracking-widest">{t('boardroom')}</h3>
          <p className="text-[10px] text-neutral-400 lowercase">visual oval boardroom advisory layout & digital signators</p>
        </div>

        {/* Circular Board Table Grid */}
        <div className="relative h-64 border border-neutral-50 bg-neutral-50/20 flex items-center justify-center">
          {/* Virtual Board Meeting oval table */}
          <div className="absolute w-3/4 h-32 bg-neutral-900 border border-neutral-800 rounded-full flex flex-col items-center justify-center">
            <span className="text-[10px] text-neutral-400 font-mono tracking-widest uppercase">grc boardroom executive table</span>
            <span className="text-[9px] text-neutral-600 font-mono lowercase">9 interactive ai advisors active</span>
            {activeSpeaker && (
              <span className="text-[10px] text-emerald-500 font-mono uppercase animate-pulse mt-1">
                {activeSpeaker} talking...
              </span>
            )}
          </div>

          {/* Render 9 Board Members surrounding the oval table beautifully */}
          {boardMembers.map((member, idx) => {
            // Compute polar coordinate surrounding the oval
            const angle = (idx * 2 * Math.PI) / 9;
            const x = 50 + 38 * Math.cos(angle);
            const y = 50 + 34 * Math.sin(angle);

            const isSpeakingNow = activeSpeaker === member.role;

            return (
              <div
                key={member.role}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10"
              >
                <div
                  className={`w-9 h-9 items-center justify-center flex text-xs font-normal border transition-transform ${member.color} ${
                    isSpeakingNow ? 'scale-110 ring-2 ring-emerald-400 animate-pulse' : ''
                  }`}
                  title={`${member.name} (${member.role}) - Expert in ${member.specialty}`}
                >
                  {member.avatarInitials}
                </div>
                <span className="text-[8px] mt-1 bg-white px-1 shadow-xs border border-neutral-100 text-neutral-500 font-mono">
                  {member.role}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row: Interactive Speech panel & MOM compilation tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interaction transcript box */}
        <div className="lg:col-span-8 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div className="border-b border-neutral-50 pb-2 mb-3 flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">Active Board Conversation transcript</span>
            <span className="text-[9px] text-neutral-400 font-mono">speech synthesis output active</span>
          </div>

          {/* Render Chat Logs */}
          <div className="space-y-3 h-52 overflow-y-auto mb-4 p-2 bg-neutral-50/50 border border-neutral-50">
            {chatLog.map((log, idx) => (
              <div key={idx} className="text-xs leading-relaxed">
                <span className="font-mono text-neutral-400 lowercase">[{log.role}] </span>
                <span className="font-medium text-neutral-800">{log.sender}: </span>
                <span className="text-neutral-600 font-normal">{log.text}</span>
              </div>
            ))}
            {isProcessing && (
              <div className="text-xs font-mono text-neutral-400 lowercase animate-pulse">
                Orchestrator routing questions to expert...
              </div>
            )}
          </div>

          {/* Quick templates toolbar */}
          <div className="flex flex-wrap gap-2 mb-3">
            {quickTopicTemplates.map((template, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(template.value)}
                className="text-[9px] bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border border-neutral-100 px-2 py-1 flex items-center space-x-1 rtl:space-x-reverse transition-all font-mono"
              >
                <HelpCircle className="w-3 h-3 text-neutral-400 stroke-[1.25]" />
                <span>{template.label}</span>
              </button>
            ))}
          </div>

          {/* Mic input and ask question bar */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
              placeholder={isRTL ? "أطرح سؤالك الأمني أو اضغط على القوالب الجاهزة..." : "Type your cybersecurity mandate question..."}
              className="flex-1 bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
            />
            {/* Ask button */}
            <button
              onClick={handleAskQuestion}
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-1.5 rounded-none font-mono lowercase tracking-wide transition-colors"
            >
              ask board
            </button>
          </div>
        </div>

        {/* Minutes of Meeting automated compiler card */}
        <div className="lg:col-span-4 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">Board MOM Builder</span>
              <p className="text-[9px] text-neutral-400 lowercase">compile session transcript to corporate archives</p>
            </div>

            <div className="p-3 bg-neutral-50/50 border border-neutral-100 mb-4 text-[11px] font-mono leading-relaxed text-neutral-500">
              <p className="border-b border-neutral-100 pb-1 mb-2 uppercase text-neutral-800 tracking-wider">Minutes parameters:</p>
              <p>• Venue: Virtual Corporate GRC Board Room</p>
              <p>• Date: June 14, 2026</p>
              <p>• Transcripts Captured: {chatLog.length} nodes</p>
              <p>• CEO Signatory Status: {approvals.length > 0 ? 'Signatures Valid' : 'No Signature'}</p>
            </div>
          </div>

          <button
            onClick={handleSaveMom}
            disabled={momCompiled}
            className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs py-2 rounded-none transition-all flex items-center justify-center space-x-2 rtl:space-x-reverse font-mono uppercase tracking-wider"
          >
            <Save className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>{momCompiled ? "MOM Generated & Saved!" : "Compile Meeting Minutes"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
