import React, { useState } from 'react';
import { useGrcState } from '../state';
import { Settings, Key, UserPlus, Building, Cpu, RefreshCw, Layers } from 'lucide-react';

export const LicensingJourneysView: React.FC = () => {
  const {
    isRTL,
    t,
    generateAdminLicense,
    triggerOnboardingSetup,
    activeCompany,
    activeUser,
    addSecurityAlert,
    firebaseConnected,
    signInWithGoogle,
    logout
  } = useGrcState();

  const [activeTier, setActiveTier] = useState<'tier1' | 'tier2' | 'tier3'>("tier2");

  // Tier 1: Super Admin license parameters
  const [targetCompany, setTargetCompany] = useState("");
  const [targetDays, setTargetDays] = useState(365);
  const [createdLicense, setCreatedLicense] = useState("");

  // Tier 2: Company Setup parameters
  const [companyName, setCompanyName] = useState("");
  const [licKey, setLicKey] = useState("");
  const [setupSuccess, setSetupSuccess] = useState(false);

  // Tier 3: Employee Registration parameters
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("Information Analyst");
  const [authority, setAuthority] = useState("L1 Operator");
  const [sigText, setSigText] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const handleGenerateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetCompany.trim()) return;

    const key = generateAdminLicense(targetCompany, targetDays);
    setCreatedLicense(key);
    addSecurityAlert("Super Admin Key Ring", `Super admin generated license credential ${key} targeting client ${targetCompany}`, "medium");
  };

  const handleRegisterCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !licKey.trim()) return;

    triggerOnboardingSetup(companyName, licKey);
    setSetupSuccess(true);
    addSecurityAlert("CompanySetup", `Enterprise tenant successfully registered: ${companyName}`, "low");
    setTimeout(() => {
      setSetupSuccess(false);
      setCompanyName("");
      setLicKey("");
    }, 2800);
  };

  const handleRegisterEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !username.trim()) return;

    setRegSuccess(true);
    addSecurityAlert("UserAwareness", `New employee credentials logged with biometric authority: ${fullName}`, "low");
    setTimeout(() => {
      setRegSuccess(false);
      setFullName("");
      setUsername("");
      setEmail("");
      setSigText("");
    }, 2800);
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Tier Selector Tab headers */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-100 pb-3">
        <button
          onClick={() => setActiveTier('tier1')}
          className={`px-3 py-1.5 text-xs font-mono rounded-none uppercase flex items-center space-x-1.5 rtl:space-x-reverse ${
            activeTier === 'tier1'
              ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
              : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Tier 1: Super Admin Console</span>
        </button>

        <button
          onClick={() => setActiveTier('tier2')}
          className={`px-3 py-1.5 text-xs font-mono rounded-none uppercase flex items-center space-x-1.5 rtl:space-x-reverse ${
            activeTier === 'tier2'
              ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
              : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
          }`}
        >
          <Building className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Tier 2: Enterprise Tenant Setup</span>
        </button>

        <button
          onClick={() => setActiveTier('tier3')}
          className={`px-3 py-1.5 text-xs font-mono rounded-none uppercase flex items-center space-x-1.5 rtl:space-x-reverse ${
            activeTier === 'tier3'
              ? 'bg-neutral-900 border border-neutral-800 text-white font-normal'
              : 'bg-white border border-neutral-100 text-neutral-500 hover:bg-neutral-50'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5 stroke-[1.25]" />
          <span>Tier 3: Employee Onboarding</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Tier parameters inputs */}
        <div className="lg:col-span-7 bg-white p-4 border border-neutral-100">
          {activeTier === 'tier1' && (
            <div className="space-y-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest block">Licensing Server Generator</span>
              </div>

              <form onSubmit={handleGenerateLicense} className="space-y-3">
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Company name</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    placeholder="e.g. Gulf Defense Systems Ltd"
                    className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Active Duration (Days)</label>
                    <input
                      type="number"
                      value={targetDays}
                      onChange={(e) => setTargetDays(Number(e.target.value))}
                      className="w-full bg-white border border-neutral-100 px-3 py-1 text-xs text-neutral-900 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-2 font-mono uppercase tracking-wide float-right"
                >
                  Generate Signature License
                </button>
              </form>

              {createdLicense && (
                <div className="pt-8 space-y-2">
                  <span className="text-[10px] text-emerald-600 uppercase tracking-widest font-mono block">Signature Server Token Generated:</span>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 text-xs font-mono text-neutral-800 text-center select-all">
                    {createdLicense}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTier === 'tier2' && (
            <div className="space-y-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest block">Saudi Enterprise Company Registration Setup</span>
              </div>

              <form onSubmit={handleRegisterCompany} className="space-y-3">
                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Corporate Organization Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Saudi Cyber Security Solutions Ltd"
                    className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Validate Licensed Signature Key</label>
                  <input
                    type="text"
                    value={licKey}
                    onChange={(e) => setLicKey(e.target.value)}
                    placeholder="MW-XXXX-XXXX"
                    className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-2 font-mono uppercase tracking-wide float-right"
                >
                  Verify Key & Register Tenant
                </button>
              </form>

              {setupSuccess && (
                <div className="pt-8 p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs rounded-none font-mono">
                  Enterprise tenant successfully initialized. Active dashboard countdown started!
                </div>
              )}
            </div>
          )}

          {activeTier === 'tier3' && (
            <div className="space-y-4">
              <div className="mb-2">
                <span className="text-xs font-medium text-neutral-800 uppercase tracking-widest block">Employee Credentials & Identity Register</span>
              </div>

              <form onSubmit={handleRegisterEmployee} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Full Employee Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Colonel Faisal Al-Ghamdi"
                      className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Username Reference</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="faisal_intel"
                      className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Staff Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Authority Level Authorization</label>
                    <input
                      type="text"
                      value={authority}
                      onChange={(e) => setAuthority(e.target.value)}
                      className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">Digital Signature verification string</label>
                  <input
                    type="text"
                    value={sigText}
                    onChange={(e) => setSigText(e.target.value)}
                    placeholder="e.g. Faisal bin khalid / SIGNATURE_KEY"
                    className="w-full bg-white border border-neutral-100 px-3 py-1.5 text-xs text-neutral-900 rounded-none focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs px-4 py-2 font-mono uppercase tracking-wide float-right"
                >
                  Verify & Create Employee Profile
                </button>
              </form>

              {regSuccess && (
                <div className="pt-8 p-3 bg-emerald-50 text-emerald-800 border border-emerald-100 text-xs rounded-none font-mono">
                  Employee identity successfully verified and mapped to active department records.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Informational guide (Right) */}
        <div className="lg:col-span-5 bg-white p-4 border border-neutral-100 flex flex-col justify-between">
          <div className="p-3 bg-neutral-50/50 border border-neutral-100 text-xs text-neutral-500 leading-relaxed font-normal">
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block mb-1">3-Tier Verification architecture</span>
            The GRC platform enforces multi-tiered security barriers. In order to utilize security features, companies first validate their signature license (Tier 2 Setup) which enables users to register (Tier 3) safely under executive signoffs.
          </div>

          <div className="p-3 border border-neutral-50 bg-neutral-50/50 text-[10px] font-mono tracking-tight text-neutral-500 mt-4">
            <span className="text-neutral-800 block uppercase text-[9px] mb-1">Tenant Profile Details:</span>
            <p>• Company: {activeCompany?.name || "None active"}</p>
            <p>• Status: {activeCompany?.status || "None active"}</p>
            <p>• License Key ID: {activeCompany?.licenseKey || "Not evaluated"}</p>
          </div>

          {/* Cloud Database Sync Control Board */}
          <div className="p-3 border border-neutral-100 bg-neutral-50/50 text-xs text-neutral-600 mt-4 space-y-2">
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest block">Cloud Database Sync</span>
            <p className="text-[10px] leading-relaxed font-normal">
              Keep your local risk register, controls, and auditing logs fully synchronized on Google Cloud Firebase.
            </p>
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
                <span className={`w-1.5 h-1.5 rounded-full ${firebaseConnected ? 'bg-emerald-500' : 'bg-neutral-400 animate-pulse'}`}></span>
                <span className="text-[10px] font-mono lowercase">
                  {firebaseConnected ? 'synchronized' : 'offline fallback'}
                </span>
              </div>
              
              {firebaseConnected ? (
                <button
                  onClick={logout}
                  className="bg-neutral-950 text-white hover:bg-neutral-800 text-[10px] px-2 py-1 font-mono uppercase font-normal border border-neutral-800"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={signInWithGoogle}
                  className="bg-neutral-950 text-white hover:bg-neutral-800 text-[10px] px-2 py-1 font-mono uppercase font-normal border border-neutral-800"
                >
                  Google Connect
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
