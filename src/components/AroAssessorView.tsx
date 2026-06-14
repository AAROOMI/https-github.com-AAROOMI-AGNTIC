import React, { useState } from 'react';
import { useGrcState } from '../state';
import { ClipboardList, Bot, Mic, CheckCircle, ArrowRight, ArrowLeft, Download, ShieldCheck } from 'lucide-react';

export const AroAssessorView: React.FC = () => {
  const { isRTL, t, addRisk } = useGrcState();

  const [assessmentMode, setAssessmentMode] = useState<'manual' | 'agentic'>("manual");
  const [currentStep, setCurrentStep] = useState(1);

  // Form Inputs representing the 12 steps
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cloud Infrastructure Systems");
  const [likelihood, setLikelihood] = useState<number>(3);
  const [impact, setImpact] = useState<number>(3);
  const [controlEffectiveness, setControlEffectiveness] = useState<'excellent' | 'satisfactory' | 'partial' | 'weak' | 'none'>("partial");
  const [treatmentStrategy, setTreatmentStrategy] = useState<'avoid' | 'mitigate' | 'transfer' | 'accept'>("mitigate");
  const [comments, setComments] = useState("");
  const [departmentComments, setDepartmentComments] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Multi-agent sign-offs simulation state
  const [signersStatus, setSignersStatus] = useState<Record<string, boolean>>({
    'CISO': false,
    'CIO': false,
    'CTO': false,
    'DPO': false
  });

  // Calculate inherent risk
  const inherentRiskScore = likelihood * impact;

  // Calculate residual risk using MCR formula: base inherent risk reduced by control efficacy factor
  const getControlEfficacyFactor = () => {
    switch (controlEffectiveness) {
      case 'excellent': return 0.15;
      case 'satisfactory': return 0.40;
      case 'partial': return 0.65;
      case 'weak': return 0.85;
      case 'none': return 1.0;
    }
  };
  const residualRiskScore = Math.max(1, Math.round(inherentRiskScore * getControlEfficacyFactor()));

  const handleNextStep = () => {
    if (currentStep < 12) setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCompleteAssessment = () => {
    addRisk({
      companyId: "comp-99",
      title: title || "Undefined Assessment Threat",
      category,
      likelihood,
      impact,
      inherentRiskScore,
      controlEffectiveness,
      residualRiskScore,
      treatmentStrategy,
      ownerId: "usr-admin",
      framework: "ISO31000",
      reviewStatus: "pending",
      comments: comments || "Assessment compiled manually via 12-step GRC compliance matrix.",
      evidenceUrl: "",
      assessmentMode,
      departmentComments
    });

    setIsCompleted(true);
    setTimeout(() => {
      setIsCompleted(false);
      setCurrentStep(1);
      setTitle("");
      setComments("");
      setDepartmentComments("");
    }, 3000);
  };

  // Mock voice interview dialogue
  const handleAroVoicePrompt = () => {
    // ARO Speech synthesis
    try {
      const synth = window.speechSynthesis;
      if (synth) {
        const textToSpeak = isRTL
          ? "أهلاً بك. أنا مقيم المخاطر الذكي التلقائي. هل تعاني البنية التحتية لديكم من أي مخاوف أمنية؟"
          : "Hello, GRC coordinator. I am Mr. Emeka Okafor. Name your corporate system threat, and I will catalogue it conforming to ISO 31000.";
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = isRTL ? 'ar-SA' : 'en-US';
        synth.speak(utterance);
      }
    } catch (e) {}

    // Simulated autofill of steps
    setTitle("External API Gateway Authentication Bypass Risk");
    setComments("Agentic voice session concluded, identifying external tokens validation gaps.");
    setLikelihood(4);
    setImpact(4);
    setControlEffectiveness("partial");
    setTreatmentStrategy("mitigate");
    setCurrentStep(10); // Auto-jump to final preview steps
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Mode selectors */}
      <div className="flex border-b border-neutral-100 pb-3 justify-between items-center flex-wrap gap-2">
        <div className="flex space-x-2 rtl:space-x-reverse">
          <button
            onClick={() => setAssessmentMode('manual')}
            className={`px-3 py-1.5 text-xs font-mono rounded-none uppercase ${
              assessmentMode === 'manual'
                ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
                : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            Manual 12-Step Mode
          </button>
          <button
            onClick={() => {
              setAssessmentMode('agentic');
              handleAroVoicePrompt();
            }}
            className={`px-3 py-1.5 text-xs font-mono rounded-none uppercase flex items-center space-x-1.5 rtl:space-x-reverse ${
              assessmentMode === 'agentic'
                ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
                : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
            }`}
          >
            <Bot className="w-3.5 h-3.5 stroke-[1.25]" />
            <span>Agentic Voice Interview Mode</span>
          </button>
        </div>

        <span className="text-[10px] text-neutral-400 font-mono">conforming with ISO 31000 risk register</span>
      </div>

      {/* Main Form Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Step-by-Step progress panel (Left) */}
        <div className="lg:col-span-8 bg-white p-4 border border-neutral-100 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex justify-between items-center border-b border-neutral-50 pb-2 mb-4">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">Step {currentStep} of 12</span>
              <span className="text-[10px] text-neutral-400 lowercase font-mono">
                {currentStep === 1 ? "Initialize Assessment" : currentStep <= 4 ? "Core Metrics Map" : currentStep <= 8 ? "Controls & Treatment" : "Board signoffs & finalize"}
              </span>
            </div>

            {/* Render Active Form Fields based on state steps */}
            <div className="space-y-4">
              {currentStep === 1 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">1. Describe GRC Risk / Threat Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Unlocked remote access logs, database breaches..."
                    className="w-full bg-white border border-neutral-100 px-3 py-2 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
                  />
                  <p className="text-[10px] text-neutral-400 leading-relaxed font-normal">Use literal, humble labels. Avoid overly dramatic terms.</p>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">2. Classification Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white border border-neutral-100 px-3 py-2 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
                  >
                    <option>Cloud Infrastructure Systems</option>
                    <option>Supply Chain Vendor Risks</option>
                    <option>Human Resources Credentials</option>
                    <option>Physical Facilities Access</option>
                  </select>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">3. Risk Likelihood Ratio (1: rare to 5: almost-certain)</label>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        onClick={() => setLikelihood(val)}
                        className={`w-9 h-9 border text-xs font-mono ${
                          likelihood === val
                            ? 'bg-neutral-900 border-neutral-800 text-white'
                            : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">4. Risk Severity Impact (1: low to 5: catastrophic)</label>
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    {[1, 2, 3, 4, 5].map(val => (
                      <button
                        key={val}
                        onClick={() => setImpact(val)}
                        className={`w-9 h-9 border text-xs font-mono ${
                          impact === val
                            ? 'bg-neutral-900 border-neutral-800 text-white'
                            : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-neutral-400 font-mono lowercase">Inherent Risk Score calculated as L × I: {inherentRiskScore}</p>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">5. Control Efficacy Level (MCR Reducer)</label>
                  <div className="flex flex-wrap gap-2">
                    {(['excellent', 'satisfactory', 'partial', 'weak', 'none'] as const).map(eff => (
                      <button
                        key={eff}
                        onClick={() => setControlEffectiveness(eff)}
                        className={`px-3 py-1.5 border text-xs font-mono capitalize ${
                          controlEffectiveness === eff
                            ? 'bg-neutral-900 border-neutral-800 text-white'
                            : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {eff}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 6 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">6. Residual Risk Calculation (MCR Formula)</label>
                  <div className="p-3 bg-neutral-50 border border-neutral-100">
                    <p className="text-xs text-neutral-600 leading-normal">
                      Based on our conformed MCR algorithms, the inherent risk score of <span className="font-mono text-neutral-900">{inherentRiskScore}</span> is mathematically mitigated by a <span className="font-mono text-neutral-900">{controlEffectiveness}</span> control efficacy score.
                    </p>
                    <p className="text-sm font-medium text-neutral-900 mt-2 font-mono">
                      Computed Residual Risk Score: {residualRiskScore}
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 7 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">7. Treatment Strategy Allocation</label>
                  <div className="flex flex-wrap gap-2">
                    {(['avoid', 'mitigate', 'transfer', 'accept'] as const).map(strat => (
                      <button
                        key={strat}
                        onClick={() => setTreatmentStrategy(strat)}
                        className={`px-3 py-1.5 border text-xs font-mono capitalize ${
                          treatmentStrategy === strat
                            ? 'bg-neutral-900 border-neutral-800 text-white'
                            : 'bg-white border-neutral-100 text-neutral-500 hover:bg-neutral-50'
                        }`}
                      >
                        {strat}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 8 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">8. Assessor Comments & Notes</label>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    rows={4}
                    placeholder="Add operational notes or mitigations comments..."
                    className="w-full bg-white border border-[#eaeaea] p-2 text-xs focus:outline-none focus:border-neutral-400 rounded-none leading-relaxed"
                  />
                </div>
              )}

              {currentStep === 9 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">9. Department Feedback Comments</label>
                  <textarea
                    value={departmentComments}
                    onChange={(e) => setDepartmentComments(e.target.value)}
                    rows={4}
                    placeholder="Enter secondary comments or departments exceptions..."
                    className="w-full bg-white border border-[#eaeaea] p-2 text-xs focus:outline-none focus:border-neutral-400 rounded-none leading-relaxed"
                  />
                </div>
              )}

              {currentStep === 10 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">10. Multi-Agent Signature Checks</label>
                  <p className="text-xs text-neutral-400 mb-3 lowercase">The boardroom advisors must approve values globally prior to final submission.</p>

                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(signersStatus).map(([signer, isSigned]) => (
                      <button
                        key={signer}
                        onClick={() => setSignersStatus(prev => ({ ...prev, [signer]: !prev[signer] }))}
                        className={`p-2 border text-xs flex items-center justify-between font-mono bg-neutral-50/50 ${
                          isSigned
                            ? 'border-emerald-200 text-emerald-700 bg-emerald-50/20'
                            : 'border-neutral-100 text-neutral-500'
                        }`}
                      >
                        <span>{signer} Reviewer Approved</span>
                        <div className={`w-2.5 h-2.5 rounded-full ${isSigned ? 'bg-emerald-500' : 'bg-neutral-200'}`}></div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 11 && (
                <div className="space-y-3">
                  <label className="text-[11px] text-neutral-400 uppercase tracking-wider block">11. Report Summary Preview</label>
                  <div className="p-3 bg-neutral-50 border border-neutral-150 text-[11px] font-mono leading-relaxed text-neutral-600">
                    <p className="font-medium text-neutral-800 uppercase tracking-wider mb-2">ISO 31000 Assessor Report Draft:</p>
                    <p>• Threat: {title || "Anonymous Cloud Bypass Vulnerability"}</p>
                    <p>• Category: {category}</p>
                    <p>• Inherent Danger score: {inherentRiskScore} (L{likelihood} × I{impact})</p>
                    <p>• Reducer factor is {controlEffectiveness}; Residual risk score: {residualRiskScore}</p>
                    <p>• Strategy: {treatmentStrategy}</p>
                  </div>
                </div>
              )}

              {currentStep === 12 && (
                <div className="space-y-3 text-center py-6">
                  {isCompleted ? (
                    <div className="space-y-2">
                      <div className="p-2 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs rounded-none font-mono">
                        Assessment Compiled and Dispatched to Active Blockchain Ledger Successfully!
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-xs text-neutral-600">Click submit to write risk assessment registries permanently.</p>
                      <button
                        onClick={handleCompleteAssessment}
                        className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono lowercase tracking-wide text-xs px-6 py-2 transition-all rounded-none"
                      >
                        complete and dispatch report
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Form navigation buttons */}
          <div className="border-t border-neutral-50 pt-3 flex items-center justify-between mt-6">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              className="px-3 py-1 bg-white border border-neutral-100 hover:bg-neutral-50 text-xs text-neutral-500 font-mono tracking-tight lowercase transition-colors disabled:opacity-50"
            >
              Back
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStep === 12}
              className="px-3 py-1 bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-xs text-white font-mono tracking-tight lowercase transition-colors disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* Visual guide and diagnostic tools (Right) */}
        <div className="lg:col-span-4 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">Cognitive Advisor</span>
              <p className="text-[9px] text-neutral-400 lowercase border-b border-neutral-50 pb-1">AI assessment guidance</p>
            </div>

            {/* Render Mr. Okafor's current advice dynamically */}
            <div className="p-3 bg-neutral-50/50 border border-neutral-100 rounded-none text-xs leading-relaxed text-neutral-500 mb-4 select-none">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <Bot className="w-4 h-4 text-neutral-400 stroke-[1.25]" />
                <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">Mr. Emeka Okafor (Risk Officer)</span>
              </div>
              <p>
                {currentStep <= 4
                  ? "We evaluate dangers objectively using standard ISO metrics on a 5x5 framework matrix. Higher scores reflect larger dangers."
                  : currentStep <= 8
                  ? "Control Effectiveness acts directly as our mathematical score reducer, driving residual scores down."
                  : "All boardroom executive signoffs must exist validated to authorize permanent blockchain ledger locks."}
              </p>
            </div>
          </div>

          <div className="p-3 border border-neutral-100 bg-neutral-50/50 text-[10px] font-mono tracking-tight text-neutral-500">
            <p className="uppercase text-neutral-800 tracking-wider mb-1">MCR Residual Logic Formula:</p>
            <p>Residual Risk = Inherent Risk × Efficacy</p>
            <p className="mt-1">Inherent = L{likelihood} × I{impact} = {inherentRiskScore}</p>
            <p>Efficacy = {controlEffectiveness} ({getControlEfficacyFactor()})</p>
            <p className="font-medium text-neutral-800 mt-1">Final Score = {residualRiskScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
