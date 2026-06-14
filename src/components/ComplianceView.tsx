import React, { useState } from 'react';
import { useGrcState } from '../state';
import { ComplianceControl } from '../types';
import { ShieldCheck, ShieldAlert, Award, FileText, CheckCircle2, ChevronRight, Ban, Eye } from 'lucide-react';

export const ComplianceView: React.FC = () => {
  const { isRTL, t, controls, updateControl, grantCeoApproval } = useGrcState();

  const [activeFramework, setActiveFramework] = useState<ComplianceControl['framework']>("NCA_ECC_2018");
  const [selectedControl, setSelectedControl] = useState<ComplianceControl | null>(controls[0] || null);

  const [editedTextEn, setEditedTextEn] = useState("");
  const [editedTextAr, setEditedTextAr] = useState("");

  const filteredControls = controls.filter(c => c.framework === activeFramework);

  // Calculate metrics for active framework
  const totalNum = filteredControls.length;
  const implementedNum = filteredControls.filter(c => c.implementationStatus === 'implemented').length;
  const inProgressNum = filteredControls.filter(c => c.implementationStatus === 'in_progress').length;
  const frameworkScore = totalNum > 0
    ? Math.round(((implementedNum + inProgressNum * 0.5) / totalNum) * 100)
    : 0;

  const handleSelectControl = (c: ComplianceControl) => {
    setSelectedControl(c);
    setEditedTextEn(c.policyTemplateEn || "");
    setEditedTextAr(c.policyTemplateAr || "");
  };

  const handleUpdateStatus = (status: ComplianceControl['implementationStatus']) => {
    if (!selectedControl) return;
    const scoreVal = status === 'implemented' ? 100 : status === 'in_progress' ? 50 : 0;
    updateControl(selectedControl.id, status, scoreVal);

    // Update locally displayed item
    setSelectedControl({
      ...selectedControl,
      implementationStatus: status,
      score: scoreVal
    });
  };

  const handleSignPolicy = () => {
    if (!selectedControl) return;
    grantCeoApproval(selectedControl.id, `Policy: ${selectedControl.title}`);
  };

  // Build simulated CODE128 vector barcode representing CEO signatories
  const renderVectorBarcode = (id: string) => {
    return (
      <svg className="w-48 h-8" viewBox="0 0 100 20" preserveAspectRatio="none">
        <rect x="0" y="0" width="100" height="20" fill="#f5f5f5" />
        {/* Draw arbitrary barcodes bars */}
        <rect x="5" y="2" width="2" height="16" fill="#171717" />
        <rect x="9" y="2" width="3" height="16" fill="#171717" />
        <rect x="14" y="2" width="1" height="16" fill="#171717" />
        <rect x="17" y="2" width="4" height="16" fill="#171717" />
        <rect x="23" y="2" width="2" height="16" fill="#171717" />
        <rect x="27" y="2" width="1" height="16" fill="#171717" />
        <rect x="30" y="2" width="3" height="16" fill="#171717" />
        <rect x="35" y="2" width="5" height="16" fill="#171717" />
        <rect x="42" y="2" width="1" height="16" fill="#171717" />
        <rect x="45" y="2" width="2" height="16" fill="#171717" />
        <rect x="49" y="2" width="4" height="16" fill="#171717" />
        <rect x="55" y="2" width="1" height="16" fill="#171717" />
        <rect x="58" y="2" width="3" height="16" fill="#171717" />
        <rect x="63" y="2" width="2" height="16" fill="#171717" />
        <rect x="67" y="2" width="5" height="16" fill="#171717" />
        <rect x="74" y="2" width="1" height="16" fill="#171717" />
        <rect x="77" y="2" width="3" height="16" fill="#171717" />
        <rect x="82" y="2" width="2" height="16" fill="#171717" />
        <rect x="86" y="2" width="4" height="16" fill="#171717" />
        <rect x="92" y="2" width="1" height="16" fill="#171717" />
      </svg>
    );
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Framework Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-3">
        {(["NCA_ECC_2018", "NCA_ECC_2024", "ISO27001", "GDPR"] as const).map(fw => (
          <button
            key={fw}
            onClick={() => {
              setActiveFramework(fw);
              const list = controls.filter(c => c.framework === fw);
              if (list.length > 0) handleSelectControl(list[0]);
            }}
            className={`px-3 py-1.5 text-xs transition-colors font-mono uppercase rounded-none ${
              activeFramework === fw
                ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
                : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            {fw.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Row: Active score coverage & Gap assessment overview */}
      <div className="bg-white p-4 border border-neutral-100 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-normal">framework audit target</span>
          <h4 className="text-sm font-medium text-neutral-800 mt-1">{activeFramework.replace('_', ' ')} Checklist</h4>
        </div>

        <div>
          <div className="flex justify-between text-xs text-neutral-500 mb-1.5 lowercase">
            <span>gap assessment coverage</span>
            <span className="font-mono text-neutral-900">{frameworkScore}%</span>
          </div>
          <div className="w-full h-1.5 bg-neutral-100 border border-neutral-100">
            <div className="h-full bg-neutral-900 transition-all duration-350" style={{ width: `${frameworkScore}%` }}></div>
          </div>
        </div>

        <div className="flex justify-around text-center text-xs">
          <div>
            <span className="text-neutral-400 block uppercase text-[9px]">compliant</span>
            <span className="text-sm text-neutral-900 font-mono tracking-tight font-normal">{implementedNum}</span>
          </div>
          <div>
            <span className="text-neutral-400 block uppercase text-[9px]">remediating</span>
            <span className="text-sm text-neutral-900 font-mono tracking-tight font-normal">{inProgressNum}</span>
          </div>
        </div>
      </div>

      {/* Main interaction panels grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Controls listings */}
        <div className="lg:col-span-5 bg-white p-4 border border-neutral-100">
          <div className="border-b border-neutral-50 pb-2 mb-3">
            <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">regulatory checkpoints</span>
          </div>

          <div className="space-y-2 h-[340px] overflow-y-auto pr-1">
            {filteredControls.map((c) => {
              const isSelected = selectedControl?.id === c.id;
              const isCompliant = c.implementationStatus === 'implemented';
              const isInProgress = c.implementationStatus === 'in_progress';

              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectControl(c)}
                  className={`w-full p-2.5 text-left rtl:text-right border transition-all duration-150 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 border-neutral-800 text-white'
                      : 'bg-white border-neutral-100 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <span className="text-[10px] font-mono opacity-80">{c.controlCode}</span>
                    <span className={`text-[8px] uppercase px-1 border font-mono tracking-tight ${
                      isCompliant
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        : isInProgress
                        ? 'text-amber-700 bg-amber-50 border-amber-100'
                        : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                    }`}>
                      {c.implementationStatus.replace('_', ' ')}
                    </span>
                  </div>
                  <h5 className="text-xs font-normal mt-1 leading-snug line-clamp-2">
                    {isRTL && c.titleAr ? c.titleAr : c.title}
                  </h5>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected control inspector & Bilingual Policy Editor */}
        <div className="lg:col-span-7 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          {selectedControl ? (
            <div className="space-y-4">
              <div className="border-b border-neutral-50 pb-2 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-400 lowercase">{selectedControl.framework} • {selectedControl.controlCode}</span>
                  <h4 className="text-sm font-medium text-neutral-900">{isRTL && selectedControl.titleAr ? selectedControl.titleAr : selectedControl.title}</h4>
                </div>
              </div>

              {/* Status toggles */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest">Audit State:</span>
                {(["implemented", "in_progress", "not_implemented"] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => handleUpdateStatus(st)}
                    className={`px-2 py-1 text-[10px] font-mono border transition-all capitalize ${
                      selectedControl.implementationStatus === st
                        ? 'bg-neutral-900 border-neutral-800 text-white'
                        : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Remediation instructions path */}
              <div className="p-2.5 bg-neutral-50 border border-neutral-100 text-xs leading-relaxed text-neutral-600">
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-wider block">Remediation Path / Audit Gap Instructions:</span>
                {selectedControl.remediationPath}
              </div>

              {/* Bilingual Policy Documentation Preview Editor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* English Module */}
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider mb-1">Policy Template (English)</span>
                  <textarea
                    value={editedTextEn}
                    onChange={(e) => setEditedTextEn(e.target.value)}
                    rows={4}
                    className="w-full bg-white border border-neutral-100 text-neutral-700 p-2 text-[11px] focus:outline-none focus:border-neutral-400 rounded-none leading-relaxed"
                  />
                </div>

                {/* Arabic Module */}
                <div className="flex flex-col">
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider mb-1 text-right">وثيقة السياسة (العربية)</span>
                  <textarea
                    value={editedTextAr}
                    onChange={(e) => setEditedTextAr(e.target.value)}
                    rows={4}
                    dir="rtl"
                    className="w-full bg-white border border-neutral-100 text-neutral-700 p-2 text-[11px] focus:outline-none focus:border-neutral-400 rounded-none leading-relaxed text-right"
                  />
                </div>
              </div>

              {/* Signatures credentials representation */}
              <div className="border-t border-neutral-50 pt-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider block">Cryptographic CEO / CIO Signatory Verification:</span>
                  {renderVectorBarcode(selectedControl.id)}
                </div>

                <button
                  onClick={handleSignPolicy}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-2 font-mono lowercase tracking-wide transition-all"
                >
                  sign and publish policy
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-neutral-400 text-xs">
              Select a control block from left checklist to run gap audit diagnostics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
