const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\3cfb9d43-c526-489a-bde9-3bb619d10e26';
const destDir = path.join(__dirname, '..', 'public', 'images', 'accreditations');

const mappings = [
  { src: 'media__1783230517610.png', dest: 'vid.png' },
  { src: 'media__1783230370566.png', dest: 'hexco.png' },
  { src: 'media__1783230315415.jpg', dest: 'zimsec.jpg' },
  { src: 'media__1783229181173.png', dest: 'delf.png' }
];

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  mappings.forEach(m => {
    const srcPath = path.join(srcDir, m.src);
    const destPath = path.join(destDir, m.dest);
    
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Successfully copied ${m.src} to ${destPath}`);
    } else {
      console.error(`Source file not found: ${srcPath}`);
    }
  });

} catch (err) {
  console.error('Error copying files:', err.message);
}
