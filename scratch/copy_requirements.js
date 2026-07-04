const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\dell\\Downloads\\Documents\\Errymaple List of requirements.pdf';
const destDir = path.join(__dirname, '..', 'public', 'documents');
const dest = path.join(destDir, 'errymaple_requirements.pdf');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.copyFileSync(src, dest);
  console.log('Successfully copied list of requirements to public directory:', dest);
} catch (err) {
  console.error('Error copying file:', err.message);
}
