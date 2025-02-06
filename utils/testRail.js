const TestRail = require('testrail-api');

const testrail = new TestRail({
  host: 'https://yourdomain.testrail.io',
  user: 'your.email@example.com',
  password: 'your_api_key'
});

async function createTestRun() {
  const testRun = await testrail.addRun(1, { // '1' is the project ID in TestRail
    name: 'Automated Test Run - Playwright',
    include_all: false, // Set to true if you want to include all test cases
    case_ids: [12345, 12346, 12347] // Array of TestRail case IDs mapped in your tests
  });
  
  return testRun.id; // Return the test run ID for later use
}