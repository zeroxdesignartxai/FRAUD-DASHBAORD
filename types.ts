
export enum CaseStatus {
  INTAKE = 'Intake',
  TRIAGE = 'Triage',
  INVESTIGATION = 'Investigation',
  REFERRAL = 'Referral',
  CLOSED = 'Closed'
}

export enum CasePriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum EntityType {
  PERSON = 'Person',
  ORGANIZATION = 'Organization',
  EMAIL = 'Email',
  PHONE = 'Phone',
  DOMAIN = 'Domain',
  IP = 'IP',
  ADDRESS = 'Address',
  BANK_ACCOUNT = 'Bank Account',
  CRYPTO_WALLET = 'Crypto Wallet'
}

export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  value: string;
  confidence: number; // 0 to 1
  pii: boolean;
  tags: string[];
}

export interface EntityLink {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  confidence: number;
}

export interface Evidence {
  id: string;
  caseId: string;
  title: string;
  description: string;
  sourceUrl?: string;
  fileType: string;
  uploadedBy: string;
  timestamp: string;
  hash?: string;
}

export interface CaseEvent {
  id: string;
  caseId: string;
  timestamp: string;
  summary: string;
  source: string;
  type: 'discovery' | 'milestone' | 'update';
  linkedEntities: string[];
  linkedEvidence: string[];
}

export interface Case {
  id: string;
  title: string;
  description: string;
  category: string;
  status: CaseStatus;
  priority: CasePriority;
  jurisdiction: string;
  createdBy: string;
  assignedTo: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Alert {
  id: string;
  caseId: string;
  ruleName: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  status: 'new' | 'investigated' | 'dismissed';
}

export interface AuditLogEntry {
  id: string;
  userId: string;
  action: string;
  module: string;
  timestamp: string;
  details: string;
}

export enum UserRole {
  ADMIN = 'Admin',
  INVESTIGATOR = 'Investigator',
  VIEWER = 'Viewer'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
}
