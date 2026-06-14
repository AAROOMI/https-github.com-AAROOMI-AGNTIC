import React, { useState } from 'react';
import { useGrcState } from '../state';
import { GraduationCap, Award, CheckCircle, Play, Sparkles, BookOpen } from 'lucide-react';

export const AwarenessTrainingView: React.FC = () => {
  const { isRTL, t, modules, completedModules, completeModule, addSecurityAlert } = useGrcState();

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const activeMod = modules[activeModuleIndex] || modules[0];

  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!activeMod) return;

    // Check answers
    let correctNum = 0;
    activeMod.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answerIndex) correctNum++;
    });

    const score = Math.round((correctNum / activeMod.questions.length) * 100);
    setQuizScore(score);

    if (score === 100) {
      completeModule(activeMod.id);
      addSecurityAlert("Awareness Portal Logger", `Personnel successfully passed training credentials test: ${activeMod.title}`, "low");
    } else {
      addSecurityAlert("Awareness Portal Logger", `Personnel completed security training test: ${score}% (Needs 100% to qualify)`, "high");
    }
  };

  const handleNextModule = () => {
    setQuizScore(null);
    setSelectedAnswers({});
    if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
    } else {
      setActiveModuleIndex(0);
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Module Selector and Progress list */}
        <div className="lg:col-span-4 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest flex items-center space-x-1.5 rtl:space-x-reverse">
                <GraduationCap className="w-4 h-4 text-neutral-400 stroke-[1.25]" />
                <span>Personnel Training portal</span>
              </span>
              <p className="text-[9px] text-neutral-400 lowercase border-b border-neutral-50 pb-1">active cybersecurity awareness modules tracker</p>
            </div>

            <div className="space-y-2">
              {modules.map((mod, idx) => {
                const isCompleted = completedModules.includes(mod.id);
                const isActive = activeModuleIndex === idx;

                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setQuizScore(null);
                      setSelectedAnswers({});
                    }}
                    className={`w-full p-3 border transition-colors flex items-center justify-between text-left rtl:text-right ${
                      isActive
                        ? 'bg-neutral-900 border-neutral-800 text-white'
                        : 'bg-white border-neutral-100 text-neutral-600 hover:bg-neutral-50'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono opacity-80 block lowercase">Module {idx + 1}</span>
                      <span className="text-xs font-normal tracking-tight">
                        {isRTL ? mod.titleAr : mod.title}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="text-[8px] bg-emerald-500 text-white font-mono px-1 rounded-none uppercase">
                        PASSED
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-3 border border-neutral-100 bg-neutral-50/50 mt-6 flex justify-between items-center text-xs">
            <span className="text-neutral-500">Security Badges Gained:</span>
            <span className="font-mono text-neutral-900">{completedModules.length} / {modules.length}</span>
          </div>
        </div>

        {/* Right Side: Active Module content and Interactive Quiz */}
        <div className="lg:col-span-8 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          {activeMod ? (
            <div className="space-y-4">
              <div className="border-b border-neutral-50 pb-2 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-400 lowercase">active course • scenario story</span>
                  <h4 className="text-sm font-medium text-neutral-900">{isRTL ? activeMod.titleAr : activeMod.title}</h4>
                </div>
              </div>

              {/* Scenario story context */}
              <div className="p-3 bg-neutral-50 border border-neutral-100 text-[11px] leading-relaxed text-neutral-600">
                <span className="font-mono text-[9px] text-rose-600 uppercase tracking-widest block mb-1">Interactive Scenario Narrative:</span>
                {isRTL ? activeMod.scenarioAr : activeMod.scenario}
              </div>

              {/* Learning objectives pointers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-neutral-500">
                <div>
                  <span className="text-[9px] text-neutral-400 uppercase tracking-wider block mb-1">Key Learning Targets:</span>
                  <ul className="list-disc pl-4 space-y-1">
                    {(isRTL ? activeMod.pointsAr : activeMod.points).map((pt, index) => (
                      <li key={index}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Interactive MCQ quiz parameters */}
              <div className="pt-2 border-t border-neutral-50 space-y-3">
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Module Qualification Quiz:</span>

                {activeMod.questions.map((q, qIdx) => (
                  <div key={qIdx} className="space-y-2">
                    <p className="text-xs text-neutral-800 font-medium">Q1: {isRTL ? q.questionAr : q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(isRTL ? q.optionsAr : q.options).map((opt, oIdx) => {
                        const isSelected = selectedAnswers[qIdx] === oIdx;
                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleAnswerSelect(qIdx, oIdx)}
                            className={`p-2 border text-[11px] text-left rtl:text-right transition-colors rounded-none ${
                              isSelected
                                ? 'bg-neutral-900 border-neutral-800 text-white'
                                : 'bg-white border-neutral-100 text-neutral-600 hover:bg-neutral-50/50'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanations shown after submit */}
                    {quizScore !== null && (
                      <div className={`p-2.5 text-[10px] border leading-normal mt-2 ${
                        selectedAnswers[qIdx] === q.answerIndex
                          ? "bg-emerald-50 text-emerald-800 border-emerald-100"
                          : "bg-rose-50 text-rose-800 border-rose-100"
                      }`}>
                        <strong>{selectedAnswers[qIdx] === q.answerIndex ? "Correct! " : "Incorrect. "}</strong>
                        {isRTL ? q.explanationAr : q.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Qualification submit / Next buttons */}
              <div className="pt-3 border-t border-neutral-50 flex items-center justify-between">
                {quizScore !== null ? (
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <span className="text-xs font-mono text-neutral-700">Quiz score obtained: {quizScore}%</span>
                    <button
                      onClick={handleNextModule}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono lowercase tracking-wide text-xs px-4 py-1.5 transition-all"
                    >
                      continue course
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-mono lowercase tracking-wide text-xs px-4 py-2 transition-all"
                  >
                    submit answers for qualification
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-neutral-400 text-xs">
              Select an active training module to begin your qualification.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
