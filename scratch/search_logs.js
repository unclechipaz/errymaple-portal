const fs = require('fs');
const readline = require('readline');
const path = require('path');

const logPath = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\3cfb9d43-c526-489a-bde9-3bb619d10e26\\.system_generated\\logs\\transcript.jsonl';

async function searchLogs() {
  if (!fs.existsSync(logPath)) {
    console.error('Log file does not exist:', logPath);
    return;
  }
  
  const fileStream = fs.createReadStream(logPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log('Searching logs for form/database context...');
  let index = 0;
  for await (const line of rl) {
    index++;
    if (line.includes('database') || line.includes('submit-form') || line.includes('submissions.json') || line.includes('firebase')) {
      // Print truncated line
      console.log(`[Line ${index}] ${line.substring(0, 300)}...`);
    }
  }
}

searchLogs();
