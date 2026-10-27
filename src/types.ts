import { CalculatorState, CalculationResult } from './utils/calculator';

export type PageId = 'overview' | 'services' | 'case-studies' | 'ai-cost-estimator' | 'contact';

export interface ServiceItem {
  id: string;
  category: 'ai-core' | 'engineering' | 'creative';
  categoryLabel: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  deliverables: string[];
  timeline: string;
}

export interface CaseStudy {
  id: string;
  category: 'rag' | 'webapp' | 'media';
  categoryLabel: string;
  badge: string;
  title: string;
  bottleneck: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
    sublabel?: string;
    highlight?: boolean;
    color?: string;
  }[];
  tags: string[];
  imageUrl: string;
  imageAlt: string;
  isFeatured?: boolean;
  clientName?: string;
  clientRole?: string;
  fullDescription?: string;
}

export interface EstimatorProposalSubmission {
  id: string;
  submittedAt: string;
  email: string;
  company: string;
  targetLaunch?: string;
  techContext?: string;
  calculatorState: CalculatorState;
  calculationResult: CalculationResult;
}

export interface BookedStrategySession {
  id: string;
  bookedAt: string;
  fullName: string;
  corporateEmail: string;
  companyOrg: string;
  projectType: string;
  budgetTier: string;
  projectDetails: string;
  selectedDate: string;
  selectedTime: string;
  selectedTimezone: string;
  ndaAccepted: boolean;
}
