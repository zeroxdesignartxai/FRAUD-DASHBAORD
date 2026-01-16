
import { 
  Case, CaseStatus, CasePriority, Entity, EntityType, 
  Evidence, CaseEvent, Alert, User, UserRole, EntityLink 
} from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Rivera',
  role: UserRole.ADMIN,
  avatar: 'https://picsum.photos/seed/alex/100/100'
};

export const MOCK_CASES: Case[] = [
  {
    id: 'CF-2024-001',
    title: 'Project Aurora: Procurement Fraud',
    description: 'Suspicious vendor patterns identified in the North Division procurement cycle.',
    category: 'Procurement',
    status: CaseStatus.INVESTIGATION,
    priority: CasePriority.CRITICAL,
    jurisdiction: 'United States',
    createdBy: 'user-1',
    assignedTo: 'user-1',
    tags: ['Fraud', 'Vendor', 'Internal'],
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-15T14:30:00Z'
  },
  {
    id: 'CF-2024-002',
    title: 'Identity Verification: Alpha Logistics',
    description: 'Verifying the legitimacy of a new logistics partner with high-value contracts.',
    category: 'Identity',
    status: CaseStatus.TRIAGE,
    priority: CasePriority.HIGH,
    jurisdiction: 'European Union',
    createdBy: 'user-1',
    assignedTo: 'user-2',
    tags: ['KYC', 'Logistics', 'Entity-Match'],
    createdAt: '2024-03-10T09:15:00Z',
    updatedAt: '2024-03-18T11:00:00Z'
  },
  {
    id: 'CF-2024-003',
    title: 'Cyber Threat Intelligence: Phish-Net',
    description: 'Monitoring domain registrations impersonating corporate payroll portals.',
    category: 'Cyber',
    status: CaseStatus.INTAKE,
    priority: CasePriority.MEDIUM,
    jurisdiction: 'Global',
    createdBy: 'user-1',
    assignedTo: 'user-3',
    tags: ['Phishing', 'Intel', 'Domain'],
    createdAt: '2024-03-20T16:45:00Z',
    updatedAt: '2024-03-20T16:45:00Z'
  }
];

export const MOCK_ENTITIES: Entity[] = [
  { id: 'e1', type: EntityType.ORGANIZATION, name: 'Stellar Solutions LLC', value: 'REG-123456', confidence: 0.95, pii: false, tags: ['Vendor'] },
  { id: 'e2', type: EntityType.PERSON, name: 'James Moriarty', value: 'JM-778899', confidence: 0.8, pii: true, tags: ['Subject'] },
  { id: 'e3', type: EntityType.EMAIL, name: 'Contact Email', value: 'admin@stellar-sol.com', confidence: 1.0, pii: true, tags: ['Primary'] },
  { id: 'e4', type: EntityType.DOMAIN, name: 'Web Presence', value: 'stellar-sol.com', confidence: 1.0, pii: false, tags: ['Digital'] },
  { id: 'e5', type: EntityType.BANK_ACCOUNT, name: 'Operating Account', value: 'XXXX-XXXX-9012', confidence: 0.7, pii: true, tags: ['Financial'] }
];

export const MOCK_LINKS: EntityLink[] = [
  { id: 'l1', sourceId: 'e2', targetId: 'e1', relationship: 'Managing Director', confidence: 0.9 },
  { id: 'l2', sourceId: 'e3', targetId: 'e1', relationship: 'Corporate Contact', confidence: 1.0 },
  { id: 'l3', sourceId: 'e4', targetId: 'e1', relationship: 'Main Domain', confidence: 1.0 },
  { id: 'l4', sourceId: 'e1', targetId: 'e5', relationship: 'Payment Destination', confidence: 0.8 }
];

export const MOCK_EVIDENCE: Evidence[] = [
  { 
    id: 'ev1', 
    caseId: 'CF-2024-001', 
    title: 'Incorporation Document', 
    description: 'Scanned copy of LLC filing from state registry.', 
    sourceUrl: 'https://registry.state.gov/filing/123456', 
    fileType: 'PDF', 
    uploadedBy: 'user-1', 
    timestamp: '2024-02-05T11:00:00Z' 
  },
  { 
    id: 'ev2', 
    caseId: 'CF-2024-001', 
    title: 'Bank Statement - Feb 2024', 
    description: 'Transaction log showing anomalous payment transfers.', 
    fileType: 'XLSX', 
    uploadedBy: 'user-1', 
    timestamp: '2024-02-10T15:20:00Z' 
  }
];

export const MOCK_EVENTS: CaseEvent[] = [
  { 
    id: 'evt1', 
    caseId: 'CF-2024-001', 
    timestamp: '2024-02-01T10:00:00Z', 
    summary: 'Case Intake initiated via automated detection rule.', 
    source: 'System', 
    type: 'discovery', 
    linkedEntities: [], 
    linkedEvidence: [] 
  },
  { 
    id: 'evt2', 
    caseId: 'CF-2024-001', 
    timestamp: '2024-02-05T11:30:00Z', 
    summary: 'Evidence #ev1 added by Alex Rivera.', 
    source: 'Alex Rivera', 
    type: 'update', 
    linkedEntities: ['e1'], 
    linkedEvidence: ['ev1'] 
  }
];

export const MOCK_ALERTS: Alert[] = [
  { id: 'a1', caseId: 'CF-2024-001', ruleName: 'Duplicate Vendor Address', severity: 'high', message: 'Stellar Solutions LLC shares an address with an internal employee.', timestamp: '2024-02-02T08:00:00Z', status: 'new' },
  { id: 'a2', caseId: 'CF-2024-002', ruleName: 'Velocity Flag', severity: 'medium', message: 'Three new domains registered by same entity in 24 hours.', timestamp: '2024-03-12T14:10:00Z', status: 'new' }
];
