export type GrcRole =
  | 'system_admin'
  | 'compliance_mgr'
  | 'risk_analyst'
  | 'auditor'
  | 'executive'
  | 'employee';

export interface GrcUser {
  id: string;
  uid?: string;
  username: string;
  email: string;
  fullName: string;
  role: GrcRole;
  companyId: string;
  designation: string;
  authorityLevel: string;
  digitalSignature: string;
  photoUrl: string;
  isActive: boolean;
  createdAt: string;
}

export interface GrcCompany {
  id: string;
  name: string;
  logoUrl: string;
  industry: string;
  licenseKey: string;
  licenseExpiryAt: string;
  status: 'active' | 'suspended' | 'expired';
}

export interface GrcRisk {
  id: string;
  companyId: string;
  title: string;
  category: string;
  likelihood: number; // 1-5
  impact: number;      // 1-5
  inherentRiskScore: number; // likelihood * impact
  controlEffectiveness: 'excellent' | 'satisfactory' | 'partial' | 'weak' | 'none';
  residualRiskScore: number;
  treatmentStrategy: 'avoid' | 'mitigate' | 'transfer' | 'accept';
  ownerId: string;
  framework: string;
  reviewStatus: 'draft' | 'pending' | 'reviewed' | 'approved';
  comments: string;
  evidenceUrl: string;
  assessmentMode: 'manual' | 'agentic';
  departmentComments: string;
  createdAt: string;
}

export interface ComplianceControl {
  id: string;
  framework: 'ISO27001' | 'NIST_CSF' | 'GDPR' | 'SOC2' | 'NCA_ECC_2018' | 'NCA_ECC_2024';
  controlCode: string;
  title: string;
  titleAr?: string;
  domain: string;
  domainAr?: string;
  implementationStatus: 'implemented' | 'in_progress' | 'not_applicable' | 'not_implemented';
  score: number; // 0 - 100
  documented: boolean;
  remediationPath: string;
  policyTemplateEn?: string;
  policyTemplateAr?: string;
  updatedAt: string;
}

export interface AuditFinding {
  id: string;
  controlId: string;
  title: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved';
  auditorId: string;
  description: string;
  remediationNotes: string;
  createdAt: string;
}

export interface CEOApproval {
  id: string;
  documentId: string;
  documentType: string; // e.g. "Risk Report", "Security Policy"
  ceoUserId: string;
  status: 'pending' | 'approved' | 'rejected';
  digitalSignature: string;
  barcodeCredential: string;
  approvedAt: string;
}

export interface BlockchainRecord {
  id: string;
  previousHash: string;
  dataHash: string;
  blockHash: string;
  transactionType: string;
  payload: string;
  timestamp: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  source: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface AssetCIA {
  id: string;
  name: string;
  department: string;
  confidentiality: 'H' | 'M' | 'L';
  integrity: 'H' | 'M' | 'L';
  availability: 'H' | 'M' | 'L';
  rto: string; // e.g. "2 hours"
  rpo: string; // e.g. "1 hour"
  mtd: string; // e.g. "24 hours"
  financialImpact: 'high' | 'medium' | 'low';
  operationalImpact: 'high' | 'medium' | 'low';
  criticalityScore: number; // 0-100
}

export interface AwarenessModule {
  id: string;
  title: string;
  titleAr: string;
  scenario: string;
  scenarioAr: string;
  points: string[];
  pointsAr: string[];
  questions: {
    question: string;
    questionAr: string;
    options: string[];
    optionsAr: string[];
    answerIndex: number;
    explanation: string;
    explanationAr: string;
  }[];
}
