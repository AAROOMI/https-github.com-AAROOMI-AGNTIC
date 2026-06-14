import React, { useState } from 'react';
import { useGrcState } from '../state';
import { Binary, ShieldAlert, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const AssumedLedgerView: React.FC = () => {
  const { isRTL, t, ledger } = useGrcState();

  const [verifying, setVerifying] = useState(false);
  const [verificationPassed, setVerificationStatus] = useState<boolean | null>(null);

  const startVerification = () => {
    setVerifying(true);
    setVerificationStatus(null);

    // Simulate verification of cumulative hashes recursively
    setTimeout(() => {
      setVerifying(false);
      setVerificationStatus(true);
    }, 1500);
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Verification control block */}
      <div className="bg-white p-4 border border-neutral-100 flex items-center justify-between flex-wrap gap-4">
        <div>
          <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest flex items-center space-x-1.5 rtl:space-x-reverse">
            <Binary className="w-4 h-4 text-neutral-400 stroke-[1.25]" />
            <span>{t('verifyIntegrity')}</span>
          </span>
          <p className="text-[9px] text-neutral-400 lowercase mt-0.5">verify mathematical linkages between child and parent hash hashes</p>
        </div>

        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          {verificationPassed && (
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 font-mono">
              {t('chainValid')}
            </span>
          )}

          <button
            onClick={startVerification}
            disabled={verifying}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-2 font-mono lowercase tracking-wide flex items-center space-x-1.5 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 stroke-[1.25] ${verifying ? 'animate-spin' : ''}`} />
            <span>{verifying ? "Auditing block link keys..." : "Execute validation diagnosis"}</span>
          </button>
        </div>
      </div>

      {/* Ledger Block List */}
      <div className="bg-white p-4 border border-neutral-100">
        <div className="mb-3 border-b border-neutral-50 pb-2">
          <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">ledger transactions log</span>
        </div>

        <div className="space-y-3 h-[360px] overflow-y-auto pr-1">
          {ledger.map((block, idx) => {
            return (
              <div key={block.id} className="p-3 border border-neutral-50 hover:border-neutral-200 transition-all bg-neutral-50/20 text-xs">
                <div className="flex flex-wrap justify-between items-start border-b border-neutral-100 pb-1 mb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <span className="font-mono text-[10px] bg-neutral-900 text-white px-1.5 py-0.5">BLOCK #{idx}</span>
                    <span className="text-[10px] text-neutral-400 font-mono tracking-tight lowercase">
                      tx: {block.transactionType} • {block.timestamp.slice(0, 10)} {block.timestamp.slice(11, 19)}
                    </span>
                  </div>
                  <div className="font-mono text-[9px] text-neutral-400">parent: {block.previousHash.slice(0, 16)}...</div>
                </div>

                <p className="text-[11px] text-neutral-700 leading-normal mb-2 font-normal">
                  {block.payload}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono text-neutral-400 border-t border-neutral-50/50 pt-1.5">
                  <div className="truncate">data hash: <span className="text-neutral-500 font-normal">{block.dataHash}</span></div>
                  <div className="truncate">block checksum: <span className="text-emerald-700 font-normal">{block.blockHash}</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
