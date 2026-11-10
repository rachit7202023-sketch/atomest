import fs from 'node:fs';
import path from 'node:path';

const workflowPath = path.resolve('templates/speed-to-lead-v1/workflow.json');
const testSuitePath = path.resolve('templates/speed-to-lead-v1/test-suite.json');

const workflow = JSON.parse(fs.readFileSync(workflowPath, 'utf8'));
const testSuite = JSON.parse(fs.readFileSync(testSuitePath, 'utf8'));

const validatorNode = workflow.nodes.find((n: any) => n.name === 'Validate & Sanitize Lead');
const validatorCode = validatorNode.parameters.jsCode;

console.log('--- EXECUTING SPEED-TO-LEAD V1 TEST SUITE ---');

let passed = 0;
let failed = 0;

testSuite.cases.forEach((tc: any) => {
  const mockInput = {
    first: () => ({ json: tc.input })
  };

  try {
    // Wrap code cleanly
    const runner = new Function('$input', `
      ${validatorCode}
    `);
    const output = runner(mockInput);
    const result = output.json;

    const expectedValid = tc.expectedResult.isValid;
    const actualValid = result.isValid;
    const pass = expectedValid === actualValid;

    console.log(`[${tc.id}] ${tc.name}: ${pass ? 'PASS' : 'FAIL'}`);
    console.log(`  -> isValid: expected=${expectedValid}, got=${actualValid}`);
    console.log(`  -> consent: ${result.sanitized.consent}`);
    if (result.errors && result.errors.length > 0) {
      console.log(`  -> errors: ${result.errors.join(', ')}`);
    }

    if (pass) passed++; else failed++;
  } catch (err: any) {
    console.error(`[${tc.id}] RUNTIME ERROR:`, err.message);
    failed++;
  }
});

console.log(`\nFinal Test Results: ${passed} passed, ${failed} failed out of ${testSuite.cases.length} cases.`);

