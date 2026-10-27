export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  // Basic RFC 5322 regex matching corporate / modern emails
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

export interface EstimatorFormData {
  email: string;
  company: string;
  targetLaunch?: string;
  techContext?: string;
}

export interface EstimatorFormErrors {
  email?: string;
  company?: string;
}

export function validateEstimatorForm(data: EstimatorFormData): {
  isValid: boolean;
  errors: EstimatorFormErrors;
} {
  const errors: EstimatorFormErrors = {};

  if (!data.email || !data.email.trim()) {
    errors.email = 'Corporate email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please provide a valid corporate email address (e.g. name@company.com)';
  }

  if (!data.company || data.company.trim().length < 2) {
    errors.company = 'Company entity name is required (min 2 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export interface StrategyBookingFormData {
  fullName: string;
  corporateEmail: string;
  companyOrg: string;
  projectType: string;
  budgetTier: string;
  projectDetails: string;
  ndaAccepted: boolean;
  selectedDate: string;
  selectedTime: string;
  selectedTimezone: string;
}

export interface StrategyBookingErrors {
  fullName?: string;
  corporateEmail?: string;
  projectType?: string;
  projectDetails?: string;
  ndaAccepted?: string;
}

export function validateStrategyBookingForm(data: StrategyBookingFormData): {
  isValid: boolean;
  errors: StrategyBookingErrors;
} {
  const errors: StrategyBookingErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required (min 2 characters)';
  }

  if (!data.corporateEmail || !data.corporateEmail.trim()) {
    errors.corporateEmail = 'Corporate email is required';
  } else if (!isValidEmail(data.corporateEmail)) {
    errors.corporateEmail = 'Please provide a valid corporate email address';
  }

  if (!data.projectType || data.projectType.trim() === '') {
    errors.projectType = 'Please select a project type architecture';
  }

  if (!data.projectDetails || data.projectDetails.trim().length < 10) {
    errors.projectDetails = 'Please provide technical specifications or current blockers (min 10 characters)';
  }

  if (!data.ndaAccepted) {
    errors.ndaAccepted = 'You must confirm the confidentiality agreement';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
