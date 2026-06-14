import React, { useState } from 'react';
import { useGrcState } from '../state';
import { AssetCIA } from '../types';
import { Database, ShieldAlert, Award, FileSpreadsheet, Plus, HelpCircle } from 'lucide-react';

export const CiaBiaClassificationView: React.FC = () => {
  const { isRTL, t, assets, addAsset } = useGrcState();

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("IT Operations");
  const [confidentiality, setConfidentiality] = useState<'H' | 'M' | 'L'>("H");
  const [integrity, setIntegrity] = useState<'H' | 'M' | 'L'>("H");
  const [availability, setAvailability] = useState<'H' | 'M' | 'L'>("M");
  const [rto, setRto] = useState("4 Hours");
  const [rpo, setRpo] = useState("1 Hour");
  const [mtd, setMtd] = useState("24 Hours");
  const [financialImpact, setFinancialImpact] = useState<'high' | 'medium' | 'low'>("medium");
  const [operationalImpact, setOperationalImpact] = useState<'high' | 'medium' | 'low'>("high");

  // Calculate criticality value
  const getRatingScalar = (v: 'H' | 'M' | 'L') => (v === 'H' ? 33 : v === 'M' ? 20 : 8);
  const criticalityScore = getRatingScalar(confidentiality) + getRatingScalar(integrity) + getRatingScalar(availability);

  const handleCreateAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addAsset({
      name,
      department,
      confidentiality,
      integrity,
      availability,
      rto,
      rpo,
      mtd,
      financialImpact,
      operationalImpact,
      criticalityScore
    });

    setName("");
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Row: Overview explanation & Add Asset form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 animate-fade-in">
        {/* Asset Register Creation form */}
        <div className="lg:col-span-5 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest flex items-center space-x-1.5 rtl:space-x-reverse">
                <Database className="w-4 h-4 text-neutral-400 stroke-[1.25]" />
                <span>Classify Enterprise Asset</span>
              </span>
              <p className="text-[9px] text-neutral-400 lowercase border-b border-neutral-50 pb-1">register asset-level cia & bia recovery objective ratings</p>
            </div>

            <form onSubmit={handleCreateAsset} className="space-y-3">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Asset Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Employee HR Active Directory Server"
                  className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Confidentiality</label>
                  <select
                    value={confidentiality}
                    onChange={(e) => setConfidentiality(e.target.value as 'H' | 'M' | 'L')}
                    className="w-full bg-white border border-neutral-100 px-3 py-1 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
                  >
                    <option value="H">High (H)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Low (L)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Availability</label>
                  <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value as 'H' | 'M' | 'L')}
                    className="w-full bg-white border border-neutral-100 px-3 py-1 text-xs text-neutral-900 rounded-none focus:outline-none focus:border-neutral-400"
                  >
                    <option value="H">High (H)</option>
                    <option value="M">Medium (M)</option>
                    <option value="L">Low (L)</option>
                  </select>
                </div>
              </div>

              {/* RTO / RPO */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">RTO Goal</label>
                  <input
                    type="text"
                    value={rto}
                    onChange={(e) => setRto(e.target.value)}
                    placeholder="e.g. 4 Hours"
                    className="w-full bg-white border border-neutral-100 px-3 py-1 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">RPO Goal</label>
                  <input
                    type="text"
                    value={rpo}
                    onChange={(e) => setRpo(e.target.value)}
                    placeholder="e.g. 1 Hour"
                    className="w-full bg-white border border-neutral-100 px-3 py-1 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2 border border-neutral-100 bg-neutral-50/50 text-[10px] font-mono tracking-tight text-neutral-500">
                Estimated Criticality Score: {criticalityScore}%
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs py-2 font-mono uppercase tracking-wider transition-all"
              >
                Add Asset to Register
              </button>
            </form>
          </div>
        </div>

        {/* Existing Assets register table */}
        <div className="lg:col-span-7 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div>
            <div className="mb-3">
              <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest">Enterprise Assets Registry</span>
              <p className="text-[9px] text-neutral-400 lowercase">active classified corporate records with CIA vectors</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left rtl:text-right divide-y divide-neutral-100 border border-neutral-100">
                <thead className="bg-neutral-50 text-neutral-500 font-mono tracking-tight uppercase text-[9px]">
                  <tr>
                    <th className="p-2 font-normal">Asset Name</th>
                    <th className="p-2 font-normal">Triad (C-I-A)</th>
                    <th className="p-2 font-normal">RTO / RPO</th>
                    <th className="p-2 font-normal text-right">Criticality</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-50 text-neutral-600">
                  {assets.map((asset) => (
                    <tr key={asset.id} className="hover:bg-neutral-50/50 transition-colors">
                      <td className="p-2 font-normal truncate max-w-[140px]" title={asset.name}>
                        {asset.name}
                      </td>
                      <td className="p-2 font-mono tracking-widest text-neutral-800 uppercase">
                        {asset.confidentiality}{asset.integrity}{asset.availability}
                      </td>
                      <td className="p-2 font-mono text-[10px]">
                        {asset.rto} / {asset.rpo}
                      </td>
                      <td className="p-2 text-right">
                        <span className={`px-2 py-0.5 font-mono text-[10px] border ${
                          asset.criticalityScore >= 80
                            ? 'text-rose-600 bg-rose-50/50 border-rose-100'
                            : asset.criticalityScore >= 50
                            ? 'text-amber-600 bg-amber-50/50 border-amber-100'
                            : 'text-neutral-500 bg-neutral-50 border-neutral-100'
                        }`}>
                          {asset.criticalityScore}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
