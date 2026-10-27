import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateProjectEstimate, SCOPE_OPTIONS, DATA_OPTIONS, DEPLOY_OPTIONS, VELOCITY_OPTIONS } from './calculator';

test('calculator defaults calculate base custom_ai estimate accurately', () => {
  const result = calculateProjectEstimate({
    scope: 'custom_ai',
    data: 'clean_data',
    deploy: 'cloud_mt',
    velocity: 'standard'
  });

  // Base: 36000 + 0 + 0 = 36000
  assert.equal(result.minCost, 36000);
  assert.equal(result.maxCost, Math.round(36000 * 1.35));
  assert.equal(result.formattedMinCost, '$36,000');
  assert.equal(result.totalWeeksMin, 6);
  assert.equal(result.totalWeeksMax, 8);
  assert.match(result.squadText, /Principal AI Researcher/);
});

test('calculator applies velocity multiplier and time multiplier correctly', () => {
  const result = calculateProjectEstimate({
    scope: 'custom_ai', // 36000, 6 wks
    data: 'unstructured', // 9000, 1 wk
    deploy: 'dedicated_vpc', // 7500, 1 wk
    velocity: 'expedited' // 1.25x mult, 0.65x time
  });

  // Base: 36000 + 9000 + 7500 = 52500
  // minCost: 52500 * 1.25 = 65625
  assert.equal(result.minCost, 65625);
  assert.equal(result.maxCost, Math.round(65625 * 1.35));

  // Weeks: (6 + 1 + 1) * 0.65 = 5.2 -> round to 5
  assert.equal(result.totalWeeksMin, 5);
  assert.equal(result.totalWeeksMax, 7);
});

test('calculator handles enterprise transformation scale with air gapped deployment', () => {
  const result = calculateProjectEstimate({
    scope: 'enterprise_trans', // 58000, 9 wks
    data: 'legacy_sync', // 14000, 2 wks
    deploy: 'air_gapped', // 16000, 2 wks
    velocity: 'rapid_sprint' // 1.45x mult, 0.45x time
  });

  // Base: 58000 + 14000 + 16000 = 88000
  // minCost: 88000 * 1.45 = 127600
  assert.equal(result.minCost, 127600);
  assert.equal(result.maxCost, Math.round(127600 * 1.35));
  assert.match(result.squadText, /Solutions Director/);
});
