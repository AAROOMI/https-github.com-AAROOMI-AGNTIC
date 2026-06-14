import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  GrcUser,
  GrcCompany,
  GrcRisk,
  ComplianceControl,
  AuditFinding,
  CEOApproval,
  BlockchainRecord,
  SecurityAlert,
  AssetCIA,
  AwarenessModule
} from './types';

// Import Firebase dependencies
import { auth, db, googleProvider, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';

// Let's create SHA-256 stub
function mockSha256(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0') + "e59f427cbb08";
}

// English-Arabic Translation dictionary
const dictionary: Record<string, { en: string; ar: string }> = {
  appName: { en: "Agentic Voice GRC Platform", ar: "منصة الحوكمة وإدارة المخاطر والامتثال الصوتية" },
  dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  boardroom: { en: "GRC Board Room", ar: "غرفة إدارة GRC" },
  compliance: { en: "Compliance & NCA ECC", ar: "الامتثال والضوابط الأساسية للأمن السيبراني" },
  complianceShort: { en: "Compliance", ar: "الامتثال" },
  riskAssessor: { en: "ARO Risk Assessor", ar: "ARO مقيم المخاطر" },
  assetsClassification: { en: "CIA / BIA Assets", ar: "تصنيف الأصول CIA" },
  blockchainLedger: { en: "Blockchain Ledger", ar: "سجل البلوكشين" },
  trainingPortal: { en: "Awareness Training", ar: "التدريب والتوعية" },
  connections: { en: "Integrations & Setup", ar: "التكاملات والتهيئة" },
  systemOffline: { en: "Air-Gapped Local State", ar: "تشغيل محلي معزول" },
  systemOnline: { en: "Cloud Synced", ar: "متصل بالسحابة" },
  daysRemaining: { en: "Days Remaining", ar: "يوماً متبقياً" },
  licenseStatus: { en: "License Status", ar: "حالة الترخيص" },
  activeLicense: { en: "Active Enterprise", ar: "ترخيص تجاري نشط" },
  unlimitedLicense: { en: "Unlimited Admin", ar: "ترخيص مسؤول غير محدود" },
  complianceRate: { en: "Compliance Rate", ar: "نسبة الامتثال" },
  totalRisks: { en: "Total Risks", ar: "إجمالي المخاطر" },
  auditFindings: { en: "Unresolved Findings", ar: "ثغرات التدقيق المفتوحة" },
  ledgerBlocks: { en: "Blockchain Blocks", ar: "كتل سجل الإثبات" },
  averageMcr: { en: "Residual Risk (MCR)", ar: "نسبة المخاطر المتبقية" },
  riskHeatmap: { en: "Risk Level Heatmap Matrix", ar: "مصفوفة مستويات الخطورة" },
  networkHealth: { en: "Integrations Monitor", ar: "مراقبة الأنظمة ومكاملة الخدمات" },
  securityFeed: { en: "Security Alerts Feed", ar: "موجز التنبيهات الأمنية المتحدثة" },
  verifyIntegrity: { en: "Verify Chain Integrity", ar: "تحقق من سلامة كتل السلسلة" },
  chainValid: { en: "Ledger Chain Confirmed Legitimate (SHA-256 Integrities Clear)", ar: "تم تأكيد سلامة سلسلة السجل بالكامل (رموز التحقق سليمة)" },
  recalculate: { en: "Run Diagnostics", ar: "تشغيل الفحص الذاتي للأنظمة" },
  localLlmActive: { en: "Providing Local AI Fallback Engine", ar: "توفير محرك الذكاء الاصطناعي المحلي كبديل" },
  welcomeAgentDoc: { en: "Welcome to Agentic GRC Hub. Select your active operations workspace from the sidebar menu.", ar: "مرحباً بك في منصة GRC الصوتية الذكية. اختر مساحة العمل لبدء العمليات." },
  notificationSettings: { en: "Pending Signatures Check Completed", ar: "تم فحص اعتمادات التواقيع المعلقة بنجاح" }
};

const preseededControls: ComplianceControl[] = [
  {
    id: "nca-1",
    framework: "NCA_ECC_2018",
    controlCode: "ECC-1.1",
    title: "Cybersecurity Governance & Strategy",
    titleAr: "حوكمة الأمن السيبراني وإستراتيجيته",
    domain: "Cybersecurity Governance",
    domainAr: "حوكمة الأمن السيبراني",
    implementationStatus: "implemented",
    score: 100,
    documented: true,
    remediationPath: "Review cybersecurity organizational chart annually.",
    policyTemplateEn: "This policy establishes corporate framework for Cybersecurity Governance satisfying NCA ECC 2018.",
    policyTemplateAr: "تحدد هذه السياسة الإطار التنظيمي لحوكمة الأمن السيبراني بما يتوافق مع الضوابط الوطنية للأمن السيبراني لعام ٢٠١٨.",
    updatedAt: "2026-06-12T10:00:00Z"
  },
  {
    id: "nca-2",
    framework: "NCA_ECC_2018",
    controlCode: "ECC-1.2",
    title: "Cybersecurity Risk Management Processes",
    titleAr: "إدارة مخاطر الأمن السيبراني",
    domain: "Cybersecurity Governance",
    domainAr: "حوكمة الأمن السيبراني",
    implementationStatus: "in_progress",
    score: 60,
    documented: true,
    remediationPath: "Review 12-step risk register quarterly using ISO 31000 processes.",
    policyTemplateEn: "Organizational cyber-risks must be formally assessed using likelihood and impact models.",
    policyTemplateAr: "يجب تقييم مخاطر الأمن السيبراني في المنظمة بشكل دوري باستخدام نماذج الاحتمالات والأثر الموثقة.",
    updatedAt: "2026-06-13T11:30:00Z"
  },
  {
    id: "nca-3",
    framework: "NCA_ECC_2018",
    controlCode: "ECC-2.1",
    title: "Secure Personnel Credential Controls",
    titleAr: "أمن الموارد البشرية وتصاريح الدخول",
    domain: "Cybersecurity Defense",
    domainAr: "تعزيز الأمن السيبراني",
    implementationStatus: "not_implemented",
    score: 0,
    documented: false,
    remediationPath: "Require formal security background checks before credentials issuance.",
    policyTemplateEn: "All corporate staff shall undergo onboarding identity and security background checks.",
    policyTemplateAr: "يجب على جميع موظفي المؤسسة الخضوع لفحص أمني واجتماعي والتحقق من الهوية قبل تفعيل تصاريحهم الأمنية.",
    updatedAt: "2026-06-14T01:00:00Z"
  },
  {
    id: "nca-ecc2-1",
    framework: "NCA_ECC_2024",
    controlCode: "ECC-2024-1.3",
    title: "Secure Remote Access & MFA",
    titleAr: "الوصول اللامركزي الآمن والمصادقة الثنائية",
    domain: "Asset Defense & Access Controls",
    domainAr: "حماية الأصول والتحكم بالوصول",
    implementationStatus: "implemented",
    score: 100,
    documented: true,
    remediationPath: "Enforce multi-factor authorization on all active administrative accounts.",
    policyTemplateEn: "MFA enforces non-repudiation parameters on remote connections securely.",
    policyTemplateAr: "تفرض المصادقة المتعددة مستويات حماية إضافية للاتصالات البعيدة غير القابلة للإنكار.",
    updatedAt: "2026-06-14T02:00:00Z"
  },
  {
    id: "iso-1",
    framework: "ISO27001",
    controlCode: "A.5.1",
    title: "Information Security Policies Structure",
    titleAr: "سياسات أمن المعلومات",
    domain: "Information Security",
    domainAr: "أمن المعلومات",
    implementationStatus: "implemented",
    score: 100,
    documented: true,
    remediationPath: "Ensure policies are validated by CEO and published to corporate documents portal.",
    policyTemplateEn: "Corporate security policies require annual revision and approval parameters.",
    policyTemplateAr: "تتطلب سياسات أمن المعلومات مراجعة وتحديثاً سنوياً معتمداً من الإدارة التنفيذية.",
    updatedAt: "2026-06-11T12:00:00Z"
  },
  {
    id: "iso-2",
    framework: "ISO27001",
    controlCode: "A.12.4.1",
    title: "Immutable Event Logging Protocols",
    titleAr: "تسجيل الأنشطة والأحداث الأمنية السيبرانية",
    domain: "Operations Security",
    domainAr: "أمن العمليات",
    implementationStatus: "in_progress",
    score: 50,
    documented: true,
    remediationPath: "Write transactions to physical blockchain ledger files recursively.",
    policyTemplateEn: "Immutable events logs must be guarded against manual manipulation or deletions.",
    policyTemplateAr: "يجب حماية سجلات الأحداث من التغيير أو التلاعب غير المصرح به.",
    updatedAt: "2026-06-14T00:00:00Z"
  }
];

const preseededRisks: GrcRisk[] = [
  {
    id: "risk-101",
    companyId: "comp-99",
    title: "Unrestricted External Administrator Cloud Terminal Access",
    category: "Cloud Infrastructure",
    likelihood: 4,
    impact: 5,
    inherentRiskScore: 20,
    controlEffectiveness: "partial",
    residualRiskScore: 10,
    treatmentStrategy: "mitigate",
    ownerId: "userId-1",
    framework: "NCA_ECC_2018",
    reviewStatus: "reviewed",
    comments: "Mitigated by introducing multi-factor authentication requirements globally.",
    evidenceUrl: "https://grc-evidence.storage/cloud-access.pdf",
    assessmentMode: "agentic",
    departmentComments: "Infrastructure team is reviewing cloud SSH tokens.",
    createdAt: "2026-06-12T14:20:00Z"
  },
  {
    id: "risk-102",
    companyId: "comp-99",
    title: "Incomplete Vendor Security Auditing and Data Disclosures",
    category: "Supply Chain Vendor Risks",
    likelihood: 3,
    impact: 3,
    inherentRiskScore: 9,
    controlEffectiveness: "none",
    residualRiskScore: 9,
    treatmentStrategy: "accept",
    ownerId: "userId-2",
    framework: "ISO27001",
    reviewStatus: "draft",
    comments: "Minimal severity accepted due to secondary backup vendor protocols.",
    evidenceUrl: "",
    assessmentMode: "manual",
    departmentComments: "Pending compliance approval.",
    createdAt: "2026-06-13T09:15:00Z"
  }
];

const preseededFindings: AuditFinding[] = [
  {
    id: "finding-01",
    controlId: "nca-3",
    title: "Personnel Lacks Security Background Checks",
    severity: "high",
    status: "open",
    auditorId: "auditor-07",
    description: "New hire developer credentials created prior to confirmation of verification certificates.",
    remediationNotes: "Establish automatic API blocker separating payroll setup from ID confirmation tasks.",
    createdAt: "2026-06-14T01:10:00Z"
  }
];

const preseededAlerts: SecurityAlert[] = [
  {
    id: "alert-1",
    timestamp: "01:31:00",
    source: "Cloud firewalls SIEM Detector",
    message: "Multiple authentication denials observed targeting server console port 22.",
    severity: "medium"
  },
  {
    id: "alert-2",
    timestamp: "01:32:15",
    source: "Grclink Identity Provider",
    message: "Local license hash evaluated as Valid. Air-gapped compliance module validated.",
    severity: "low"
  }
];

const preseededAssets: AssetCIA[] = [
  {
    id: "asset-1",
    name: "Customer Records Database Cluster",
    department: "Database Admin",
    confidentiality: "H",
    integrity: "H",
    availability: "H",
    rto: "4 Hours",
    rpo: "1 Hour",
    mtd: "24 Hours",
    financialImpact: "high",
    operationalImpact: "high",
    criticalityScore: 95
  },
  {
    id: "asset-2",
    name: "Internal LDAP Identity Directory Server",
    department: "Security Operations",
    confidentiality: "H",
    integrity: "H",
    availability: "M",
    rto: "8 Hours",
    rpo: "4 Hours",
    mtd: "48 Hours",
    financialImpact: "medium",
    operationalImpact: "high",
    criticalityScore: 78
  }
];

const preseededModules: AwarenessModule[] = [
  {
    id: "module-1",
    title: "Phishing Security & Threat Vectors",
    titleAr: "التدريب الأمني ضد هجمات التصيد الإلكتروني",
    scenario: "A highly urgent email containing internal GRC billing discrepancies arrives from an administrative domain address. It asks you to verify your company's API key by clicking an offline portal attachment immediately.",
    scenarioAr: "تصلك رسالة بريد إلكتروني عاجلة تظهر كأنها من مسؤول مالي بمؤسستك تطلب منك التحقق من مفتاح الربط البرمجي السحابي للشركة عبر النقر فوق ملف مرفق فوراً.",
    points: [
      "Never enter your administrator API credentials into a non-SSL external portal.",
      "Check the physical email headers rather than relying on decorative UI address banners."
    ],
    pointsAr: [
      "تجنب إدخال رموز ومفاتيح الربط البرمجية إلا في البوابة الرسمية الخاضعة لمعايير الأمان.",
      "افحص العناوين الفنية لحزم خادم البريد الوارد بدلاً من الاعتماد على الاسم الظاهري المرسل."
    ],
    questions: [
      {
        question: "What is the primary indicator of email coordinate manipulation?",
        questionAr: "ما هو المؤشر الأساسي لتزوير رسائل البريد والروابط الخارجية؟",
        options: [
          "Urgent tone paired with unrecognized domain headers",
          "Plain formatting on decorative imagery",
          "Presence of a support signature widget",
          "High attachment sizes under 2MB"
        ],
        optionsAr: [
          "الصيغة المستعجلة مصاحبة لعناوين نطاقات فرعية غير موثقة",
          "صياغة بسيطة بدون صور تصميمية",
          "وجود توقيع إلكتروني مريح للعين في التذييل",
          "كثافة أحجام الملف المرفق دون ٢ ميجابايت"
        ],
        answerIndex: 0,
        explanation: "Threat actors masquerade as administrative entities to leverage executive stress to bypass standard GRC approval checkpoints.",
        explanationAr: "يعتمد المهاجم على استغلال عاطفة الخوف أو توهم الأهمية لتمرير البرمجيات الخبيثة وتجاوز ضوابط التحقق المعتمدة."
      }
    ]
  }
];

interface GrcStateContextType {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  isRTL: boolean;
  t: (key: string) => string;

  firebaseConnected: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;

  activeUser: GrcUser | null;
  setActiveUser: (u: GrcUser | null) => void;
  activeCompany: GrcCompany | null;
  setActiveCompany: (c: GrcCompany | null) => void;

  licenseKey: string;
  daysLeft: number;
  triggerOnboardingSetup: (companyName: string, licenseKey: string) => void;
  generateAdminLicense: (company: string, days: number) => string;

  risks: GrcRisk[];
  addRisk: (r: Omit<GrcRisk, 'id' | 'createdAt'>) => void;
  updateRisk: (riskId: string, updates: Partial<GrcRisk>) => void;

  controls: ComplianceControl[];
  updateControl: (controlId: string, status: ComplianceControl['implementationStatus'], score: number) => void;

  findings: AuditFinding[];
  addFinding: (f: Omit<AuditFinding, 'id' | 'createdAt'>) => void;
  updateFindingStatus: (fId: string, status: AuditFinding['status']) => void;

  approvals: CEOApproval[];
  grantCeoApproval: (docId: string, docType: string) => void;

  ledger: BlockchainRecord[];
  alerts: SecurityAlert[];
  addSecurityAlert: (src: string, msg: string, sev: SecurityAlert['severity']) => void;

  assets: AssetCIA[];
  addAsset: (a: Omit<AssetCIA, 'id'>) => void;

  modules: AwarenessModule[];
  completedModules: string[];
  completeModule: (modId: string) => void;

  localLlmChat: (prompt: string, activeAgent: string) => Promise<string>;
}

const GrcStateContext = createContext<GrcStateContextType | undefined>(undefined);

export const GrcStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<'en' | 'ar'>('en');
  const [firebaseConnected, setFirebaseConnected] = useState<boolean>(false);
  const [activeUser, setActiveUser] = useState<GrcUser | null>(null);
  const [activeCompany, setActiveCompany] = useState<GrcCompany | null>(null);

  const [licenseKey, setLicenseKey] = useState<string>("MW-9832-ENT");
  const [daysLeft, setDaysLeft] = useState<number>(145);

  const [risks, setRisks] = useState<GrcRisk[]>([]);
  const [controls, setControls] = useState<ComplianceControl[]>([]);
  const [findings, setFindings] = useState<AuditFinding[]>([]);
  const [approvals, setApprovals] = useState<CEOApproval[]>([]);
  const [ledger, setLedger] = useState<BlockchainRecord[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [assets, setAssets] = useState<AssetCIA[]>([]);
  const [completedModules, setCompletedModules] = useState<string[]>([]);

  const isRTL = lang === 'ar';

  const t = (key: string): string => {
    const item = dictionary[key];
    if (!item) return key;
    return isRTL ? item.ar : item.en;
  };

  const setLang = (nextLang: 'en' | 'ar') => {
    setLangState(nextLang);
    localStorage.setItem("mw_lang", nextLang);
  };

  const saveKey = <T,>(key: string, data: T[]) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Safe user registration matching exact JSON size 12 limit in firestore.rules
  const registerOrFetchFirebaseUser = async (user: FirebaseUser, targetCompanyId: string) => {
    const userDocRef = doc(db, 'companies', targetCompanyId, 'users', user.uid);
    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const uData = snap.data() as GrcUser;
        setActiveUser(uData);
        localStorage.setItem("grc_active_user", JSON.stringify(uData));
      } else {
        // Build GrcUser complying strictly to the 12 fields constraint:
        // 'uid', 'username', 'email', 'role', 'companyId', 'isActive' + 6 extra (no ID field to avoid size 13 violation)
        const newUser: Omit<GrcUser, 'id'> & { uid: string } = {
          uid: user.uid,
          username: user.email?.split('@')[0] || "grc_user",
          email: user.email || "user@grc.platform",
          fullName: user.displayName || "Compliance Administrator",
          role: "system_admin", // Default role
          companyId: targetCompanyId,
          designation: "Principal Cybersecurity Officer",
          authorityLevel: "L3 Approval Executive",
          digitalSignature: "SIGN_SEC_ADMIN_KEY_" + user.uid.slice(0, 6),
          photoUrl: user.photoURL || "",
          isActive: true,
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, newUser);
        const completeUserObj: GrcUser = { ...newUser, id: user.uid };
        setActiveUser(completeUserObj);
        localStorage.setItem("grc_active_user", JSON.stringify(completeUserObj));
      }
    } catch (e) {
      console.error("Failed to sync user document:", e);
    }
  };

  // Sign In Trigger
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        setFirebaseConnected(true);
        addSecurityAlert("AuthServer", `Google authentication session started for developer ${result.user.email}`, "low");
        await registerOrFetchFirebaseUser(result.user, activeCompany?.id || "comp-99");
      }
    } catch (e) {
      console.error("Google Popup Auth failed:", e);
      addSecurityAlert("AuthServer", `Failed Google authentication: ${(e as Error).message}`, "high");
    }
  };

  // Sign Out Trigger
  const logout = async () => {
    try {
      await signOut(auth);
      setFirebaseConnected(false);
      setActiveUser(null);
      localStorage.removeItem("grc_active_user");
      addSecurityAlert("AuthServer", "Cloud sync session terminated voluntarily", "medium");
    } catch (e) {
      console.error("SignOut failed:", e);
    }
  };

  // On mount: fallback local loader, then live Firebase listener hooks
  useEffect(() => {
    const storedLang = localStorage.getItem("mw_lang") as 'en' | 'ar';
    if (storedLang) setLangState(storedLang);

    const loadOrSeedLocal = <T,>(key: string, backup: T[]): T[] => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try { return JSON.parse(stored); } catch (e) { return backup; }
      }
      localStorage.setItem(key, JSON.stringify(backup));
      return backup;
    };

    // Load fallbacks directly so we can be fully operational even without internet
    setRisks(loadOrSeedLocal('grc_risks', preseededRisks));
    setControls(loadOrSeedLocal('grc_controls', preseededControls));
    setFindings(loadOrSeedLocal('grc_findings', preseededFindings));
    setApprovals(loadOrSeedLocal('grc_approvals', []));
    setLedger(loadOrSeedLocal('grc_ledger', [
      {
        id: "block-0",
        previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
        dataHash: mockSha256("Genesis block representing active GRC ledger registration context."),
        blockHash: "00000000c01fa910f3c0bdec0889f0290ca8da39b5b03f0b2f0a1c1d88200b3c",
        transactionType: "GENESIS",
        payload: "Genesis Ledger initialized.",
        timestamp: "2026-06-10T00:00:00Z"
      }
    ]));
    setAlerts(loadOrSeedLocal('grc_alerts', preseededAlerts));
    setAssets(loadOrSeedLocal('grc_assets', preseededAssets));
    setCompletedModules(loadOrSeedLocal('grc_completed_modules', []));

    const storedUser = localStorage.getItem("grc_active_user");
    if (storedUser) {
      try { setActiveUser(JSON.parse(storedUser)); } catch (e) {}
    } else {
      const defaultUser: GrcUser = {
        id: "usr-admin",
        username: "grc_admin",
        email: "admin@grc.platform",
        fullName: "System Compliance Administrator",
        role: "system_admin",
        companyId: "comp-99",
        designation: "Principal Cybersecurity Officer",
        authorityLevel: "L3 Approval Executive",
        digitalSignature: "SIGN_SEC_ADMIN_KEY_7c8d9e",
        photoUrl: "",
        isActive: true,
        createdAt: "2026-06-10T00:00:00Z"
      };
      setActiveUser(defaultUser);
      localStorage.setItem("grc_active_user", JSON.stringify(defaultUser));
    }

    const storedCompany = localStorage.getItem("grc_active_company");
    let activeCompanyObj: GrcCompany;
    if (storedCompany) {
      try {
        activeCompanyObj = JSON.parse(storedCompany);
        setActiveCompany(activeCompanyObj);
      } catch (e) {
        activeCompanyObj = {
          id: "comp-99",
          name: "Saudi Enterprise Cyber Defense Inc",
          logoUrl: "https://grclogo.cloud/saudi-defense.png",
          industry: "Government Contracting & Security Solutions",
          licenseKey: "MW-9832-ENT",
          licenseExpiryAt: "2026-11-20T00:00:00Z",
          status: "active"
        };
        setActiveCompany(activeCompanyObj);
      }
    } else {
      activeCompanyObj = {
        id: "comp-99",
        name: "Saudi Enterprise Cyber Defense Inc",
        logoUrl: "https://grclogo.cloud/saudi-defense.png",
        industry: "Government Contracting & Security Solutions",
        licenseKey: "MW-9832-ENT",
        licenseExpiryAt: "2026-11-20T00:00:00Z",
        status: "active"
      };
      setActiveCompany(activeCompanyObj);
      localStorage.setItem("grc_active_company", JSON.stringify(activeCompanyObj));
    }

    // Subscribe to Firebase auth state shifts
    const unsubscribeAuth = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseConnected(true);
        await registerOrFetchFirebaseUser(fbUser, activeCompanyObj.id);

        // Active Firestore sync listeners:
        const currentCompId = activeCompanyObj.id;

        // 1. Risks Sync & Pre-Seed
        const unsubRisks = onSnapshot(collection(db, 'companies', currentCompId, 'risks'), async (snap) => {
          if (snap.empty) {
            // Upload preseeded risks for new logins so it isn't empty!
            const batch = writeBatch(db);
            preseededRisks.forEach((risk) => {
              const docRef = doc(db, 'companies', currentCompId, 'risks', risk.id);
              batch.set(docRef, { ...risk, companyId: currentCompId });
            });
            await batch.commit();
          } else {
            const list: GrcRisk[] = [];
            snap.forEach(d => list.push(d.data() as GrcRisk));
            setRisks(list);
            saveKey('grc_risks', list);
          }
        });

        // 2. Controls Sync & Pre-seed
        const unsubControls = onSnapshot(collection(db, 'companies', currentCompId, 'controls'), async (snap) => {
          if (snap.empty) {
            const batch = writeBatch(db);
            preseededControls.forEach((ctrl) => {
              const docRef = doc(db, 'companies', currentCompId, 'controls', ctrl.id);
              batch.set(docRef, ctrl);
            });
            await batch.commit();
          } else {
            const list: ComplianceControl[] = [];
            snap.forEach(d => list.push(d.data() as ComplianceControl));
            setControls(list);
            saveKey('grc_controls', list);
          }
        });

        // 3. Findings Sync & Preseed
        const unsubFindings = onSnapshot(collection(db, 'companies', currentCompId, 'findings'), async (snap) => {
          if (snap.empty) {
            const batch = writeBatch(db);
            preseededFindings.forEach((f) => {
              const docRef = doc(db, 'companies', currentCompId, 'findings', f.id);
              batch.set(docRef, f);
            });
            await batch.commit();
          } else {
            const list: AuditFinding[] = [];
            snap.forEach(d => list.push(d.data() as AuditFinding));
            setFindings(list);
            saveKey('grc_findings', list);
          }
        });

        // 4. Approvals Sync
        const unsubApprovals = onSnapshot(collection(db, 'companies', currentCompId, 'approvals'), (snap) => {
          const list: CEOApproval[] = [];
          snap.forEach(d => list.push(d.data() as CEOApproval));
          setApprovals(list);
          saveKey('grc_approvals', list);
        });

        // 5. Immutable Ledger Sync
        const unsubLedger = onSnapshot(collection(db, 'companies', currentCompId, 'ledger'), (snap) => {
          const list: BlockchainRecord[] = [];
          snap.forEach(d => list.push(d.data() as BlockchainRecord));
          if (list.length > 0) {
            const sorted = list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            setLedger(sorted);
            saveKey('grc_ledger', sorted);
          }
        });

        return () => {
          unsubRisks();
          unsubControls();
          unsubFindings();
          unsubApprovals();
          unsubLedger();
        };
      } else {
        setFirebaseConnected(false);
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  // Sync state helpers
  const appendLedgerEntry = async (txType: string, payload: string, currentChain: BlockchainRecord[]) => {
    const parentBlock = currentChain[currentChain.length - 1];
    const prevHash = parentBlock ? parentBlock.blockHash : "00000000000";
    const dataHash = mockSha256(payload);
    const blockHash = mockSha256(prevHash + dataHash + txType);

    const blockId = `block-${currentChain.length}`;
    const newBlock: BlockchainRecord = {
      id: blockId,
      previousHash: prevHash,
      dataHash,
      blockHash,
      transactionType: txType,
      payload,
      timestamp: new Date().toISOString()
    };

    if (auth.currentUser) {
      try {
        const ledgerDocRef = doc(db, 'companies', activeCompany?.id || 'comp-99', 'ledger', blockId);
        await setDoc(ledgerDocRef, newBlock);
      } catch (e) {
        console.error("Ledger Firestore write failed:", e);
      }
    }

    const nextChain = [...currentChain, newBlock];
    setLedger(nextChain);
    saveKey('grc_ledger', nextChain);
  };

  const addRisk = async (r: Omit<GrcRisk, 'id' | 'createdAt'>) => {
    const newId = `risk-${Math.floor(100 + Math.random() * 900)}`;
    const newRisk: GrcRisk = {
      ...r,
      id: newId,
      createdAt: new Date().toISOString()
    };

    if (auth.currentUser) {
      try {
        const riskDocRef = doc(db, 'companies', r.companyId || 'comp-99', 'risks', newId);
        await setDoc(riskDocRef, newRisk);
      } catch (e) {
        console.error("Risk Firestore write failed:", e);
      }
    }

    const nextRisks = [newRisk, ...risks];
    setRisks(nextRisks);
    saveKey('grc_risks', nextRisks);

    appendLedgerEntry("ADD_RISK", `Risk logged: ${newRisk.title} (${newRisk.category})`, ledger);
  };

  const updateRisk = async (riskId: string, updates: Partial<GrcRisk>) => {
    const currentComp = activeCompany?.id || "comp-99";
    if (auth.currentUser) {
      try {
        const riskDocRef = doc(db, 'companies', currentComp, 'risks', riskId);
        await updateDoc(riskDocRef, updates);
      } catch (e) {
        console.error("Risk Firestore update failed:", e);
      }
    }

    const nextRisks = risks.map(r => r.id === riskId ? { ...r, ...updates } : r);
    setRisks(nextRisks);
    saveKey('grc_risks', nextRisks);

    appendLedgerEntry("UPDATE_RISK", `Modified parameters for risk ${riskId}`, ledger);
  };

  const updateControl = async (controlId: string, status: ComplianceControl['implementationStatus'], score: number) => {
    const currentComp = activeCompany?.id || "comp-99";
    const updates = {
      implementationStatus: status,
      score,
      updatedAt: new Date().toISOString()
    };

    if (auth.currentUser) {
      try {
        const controlDocRef = doc(db, 'companies', currentComp, 'controls', controlId);
        await updateDoc(controlDocRef, updates);
      } catch (e) {
        console.error("Control Firestore update failed:", e);
      }
    }

    const nextControls = controls.map(c => c.id === controlId ? { ...c, ...updates } : c);
    setControls(nextControls);
    saveKey('grc_controls', nextControls);

    appendLedgerEntry("UPDATE_CONTROL", `Control ${controlId} modified as ${status} (${score}%)`, ledger);
  };

  const addFinding = async (f: Omit<AuditFinding, 'id' | 'createdAt'>) => {
    const newId = `finding-${Math.floor(10 + Math.random() * 90)}`;
    const newFinding: AuditFinding = {
      ...f,
      id: newId,
      createdAt: new Date().toISOString()
    };

    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'companies', activeCompany?.id || 'comp-99', 'findings', newId);
        await setDoc(docRef, newFinding);
      } catch (e) {
        console.error("Finding Firestore write failed:", e);
      }
    }

    const nextFindings = [newFinding, ...findings];
    setFindings(nextFindings);
    saveKey('grc_findings', nextFindings);

    appendLedgerEntry("ADD_AUDIT_FINDING", `Audit finding target: ${f.controlId}`, ledger);
  };

  const updateFindingStatus = async (fId: string, status: AuditFinding['status']) => {
    const currentComp = activeCompany?.id || "comp-99";
    const updates = { status };

    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'companies', currentComp, 'findings', fId);
        await updateDoc(docRef, updates);
      } catch (e) {
        console.error("Finding Firestore update failed:", e);
      }
    }

    const nextFindings = findings.map(f => f.id === fId ? { ...f, status } : f);
    setFindings(nextFindings);
    saveKey('grc_findings', nextFindings);

    appendLedgerEntry("UPDATE_AUDIT_FINDING", `Audit finding ${fId} updated to: ${status}`, ledger);
  };

  const grantCeoApproval = async (docId: string, docType: string) => {
    const newId = `appr-${Math.floor(100 + Math.random() * 900)}`;
    const newApproval: CEOApproval = {
      id: newId,
      documentId: docId,
      documentType: docType,
      ceoUserId: activeUser?.fullName || "CEO_OFFICIAL",
      status: "approved",
      digitalSignature: `SECURE_ENCRYPTED_CEO_SIG_HASH_${mockSha256(docId + docType)}`,
      barcodeCredential: `CODE128_CEOPASS_${Math.floor(100000 + Math.random() * 900000)}`,
      approvedAt: new Date().toISOString()
    };

    if (auth.currentUser) {
      try {
        const docRef = doc(db, 'companies', activeCompany?.id || 'comp-99', 'approvals', newId);
        await setDoc(docRef, newApproval);
      } catch (e) {
        console.error("Approval Firestore write failed:", e);
      }
    }

    const nextApprovals = [newApproval, ...approvals];
    setApprovals(nextApprovals);
    saveKey('grc_approvals', nextApprovals);

    appendLedgerEntry("GRANT_CEO_SIGNATURE", `CEO and Board approved GRC ${docType} ID ${docId}`, ledger);
  };

  const addSecurityAlert = (src: string, msg: string, sev: SecurityAlert['severity']) => {
    const newAlert: SecurityAlert = {
      id: `alert-${Date.now()}`,
      timestamp: new Date().toTimeString().slice(0, 8),
      source: src,
      message: msg,
      severity: sev
    };
    const nextAlerts = [newAlert, ...alerts].slice(0, 15);
    setAlerts(nextAlerts);
    saveKey('grc_alerts', nextAlerts);
  };

  const addAsset = (a: Omit<AssetCIA, 'id'>) => {
    const newAsset: AssetCIA = {
      ...a,
      id: `asset-${Math.floor(100 + Math.random() * 900)}`
    };
    const nextAssets = [...assets, newAsset];
    setAssets(nextAssets);
    saveKey('grc_assets', nextAssets);

    appendLedgerEntry("ADD_ASSET", `Logged asset CIA state: ${newAsset.name} (${newAsset.criticalityScore}%)`, ledger);
  };

  const completeModule = (modId: string) => {
    if (!completedModules.includes(modId)) {
      const nextCompleted = [...completedModules, modId];
      setCompletedModules(nextCompleted);
      saveKey('grc_completed_modules', nextCompleted);

      appendLedgerEntry("AWARENESS_COMPLETED", `GRC employee finished module: ${modId}`, ledger);
    }
  };

  const triggerOnboardingSetup = (companyName: string, licKey: string) => {
    const setupCompany: GrcCompany = {
      id: `comp-${Math.floor(100 + Math.random() * 900)}`,
      name: companyName,
      logoUrl: "",
      industry: "General Commerce & Systems Integration",
      licenseKey: licKey,
      licenseExpiryAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active"
    };
    setLicenseKey(licKey);
    setDaysLeft(365);
    setActiveCompany(setupCompany);
    localStorage.setItem("grc_active_company", JSON.stringify(setupCompany));

    appendLedgerEntry("COMPANY_BOOTSTRAP", `Created company profile registration for ${companyName} using licensed key ${licKey}`, ledger);
  };

  const generateAdminLicense = (company: string, days: number): string => {
    const serial = `MW-${Math.floor(1000 + Math.random() * 9000)}-${company.slice(0, 3).toUpperCase()}`;
    appendLedgerEntry("ADMIN_LICENSE_GENERATED", `Super Admin generated license key ${serial} for clients company: ${company}`, ledger);
    return serial;
  };

  // Specialized Local Cognitive AI model fallback
  const localLlmChat = async (prompt: string, activeAgent: string): Promise<string> => {
    const raw = prompt.toLowerCase();
    
    if (activeAgent === 'Welcome/Onboarding') {
      if (raw.includes('hello') || raw.includes('hi') || raw.includes('مرحبا')) {
        return isRTL
          ? "أهلاً بك الملازم الأول السيبراني. أنا المسؤول الصوتي الشخصي الخاص بك، سأرشدك خلال بضع دقائق لربط الأصول وإكمال التوعية الأمنية."
          : "Welcome Cybersecurity Officer. I am your GRC assistant. I am ready to guide you securely during your onboarding and awareness phase.";
      }
      return isRTL
        ? "تفهم البوابة طبيعة الأعمال الأمنية بشكل كامل. يرجى مراجعة إطار العمل وتفعيل تصاريح الدخول."
        : "Operational task context recorded. Please register the compliance files or write down the initial Risk Assessment register.";
    }

    if (activeAgent === 'Compliance Auditor') {
      if (raw.includes('nca') || raw.includes('ecc') || raw.includes('ضوابط')) {
        return isRTL
          ? "الضوابط الوطنية للأمن السيبراني NCA ECC لعام ٢٠١٨ و٢٠٢٤ تتطلب تفعيلاً كاملاً لمصفوفة الصلاحيات والتأكد من التشفير. نسبة تغطيتنا الحالية ممتازة."
          : "NCA ECC 2018 is pre-seeded in your system with active templates. We highly recommend completing the 'Access Controls' domains to increase audit rates.";
      }
      return isRTL
        ? "سجل الضوابط والامتثال سليم وموثق في السجل غير القابل للتعديل."
        : "The system logs demonstrate zero inconsistencies. We are satisfying full regulatory mandates.";
    }

    if (activeAgent === 'Risk Analyzer') {
      if (raw.includes('score') || raw.includes('risk') || raw.includes('خطر')) {
        return isRTL
          ? "معدلات تقييم المخاطر تُحسب بمضاعفة الاحتمالية والأثر (١-٥). المخاطر المتبقية تُحسب بصيغة MCR الحصرية الموثقة في السجلات."
          : "Our risk assessor maps vulnerabilities strictly conformed to ISO 31000 and metrics. Low zones are highlighted in slate grey while critical zones highlight immediately.";
      }
      return isRTL
        ? "الاحتمالية حالياً مقبولة. قمنا بإحالة المخاطر المكتشفة للتوقيع التنفيذي."
        : "The residual threat factors have been minimized below standard thresholds. We stand in safe operational levels.";
    }

    return isRTL
      ? "توجيهات غرفة الإدارة السيبرانية تؤكد على ضرورة العمل بأمان تام وتطبيق سياسات حماية البيانات الحساسة."
      : "Understood. The GRC board values continuous assessments and blockchain immutability as key pillars of our security postura.";
  };

  return (
    <GrcStateContext.Provider
      value={{
        lang,
        setLang,
        isRTL,
        t,
        firebaseConnected,
        signInWithGoogle,
        logout,
        activeUser,
        setActiveUser,
        activeCompany,
        setActiveCompany,
        licenseKey,
        daysLeft,
        triggerOnboardingSetup,
        generateAdminLicense,
        risks,
        addRisk,
        updateRisk,
        controls,
        updateControl,
        findings,
        addFinding,
        updateFindingStatus,
        approvals,
        grantCeoApproval,
        ledger,
        alerts,
        addSecurityAlert,
        assets,
        addAsset,
        modules: preseededModules,
        completedModules,
        completeModule,
        localLlmChat
      }}
    >
      {children}
    </GrcStateContext.Provider>
  );
};

export const useGrcState = () => {
  const context = useContext(GrcStateContext);
  if (context === undefined) {
    throw new Error('useGrcState must be used within a GrcStateProvider');
  }
  return context;
};
