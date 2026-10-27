import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidEmail, validateEstimatorForm, validateStrategyBookingForm } from './validation';

test('isValidEmail detects valid and invalid emails', () => {
  assert.equal(isValidEmail('alex@enterprise.com'), true);
  assert.equal(isValidEmail('cto@meridian.ai'), true);
  assert.equal(isValidEmail('plainaddress'), false);
  assert.equal(isValidEmail('@missingusername.com'), false);
  assert.equal(isValidEmail('user@.com'), false);
  assert.equal(isValidEmail(''), false);
});

test('validateEstimatorForm flags empty or invalid inputs', () => {
  const invalid = validateEstimatorForm({ email: '', company: '' });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.company);

  const valid = validateEstimatorForm({ email: 'elena@synthetix.ai', company: 'Synthetix' });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('validateStrategyBookingForm verifies required fields and NDA agreement', () => {
  const missingNDA = validateStrategyBookingForm({
    fullName: 'Elena Rostova',
    corporateEmail: 'elena@enterprise.ai',
    companyOrg: 'Vanguard Health',
    projectType: 'autonomous-agents',
    budgetTier: '$50k - $100k',
    projectDetails: 'We are deploying multi-agent LLMs with RAG and need low-latency micro-routing.',
    ndaAccepted: false,
    selectedDate: 'Tuesday, May 20',
    selectedTime: '1:30 PM',
    selectedTimezone: 'EST'
  });

  assert.equal(missingNDA.isValid, false);
  assert.ok(missingNDA.errors.ndaAccepted);

  const valid = validateStrategyBookingForm({
    fullName: 'Elena Rostova',
    corporateEmail: 'elena@enterprise.ai',
    companyOrg: 'Vanguard Health',
    projectType: 'autonomous-agents',
    budgetTier: '$50k - $100k',
    projectDetails: 'We are deploying multi-agent LLMs with RAG and need low-latency micro-routing.',
    ndaAccepted: true,
    selectedDate: 'Tuesday, May 20',
    selectedTime: '1:30 PM',
    selectedTimezone: 'EST'
  });

  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});
