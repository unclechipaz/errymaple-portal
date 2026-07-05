const fs = require('fs');
const path = require('path');

const artifactsDir = 'C:\\Users\\dell\\.gemini\\antigravity\\brain\\3cfb9d43-c526-489a-bde9-3bb619d10e26';
const destDir = path.join(__dirname, '..', 'public', 'images', 'accreditations');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Get all files in the directory
  const files = fs.readdirSync(artifactsDir)
    .map(name => {
      const filePath = path.join(artifactsDir, name);
      const stat = fs.statSync(filePath);
      return { name, filePath, isFile: stat.isFile(), mtime: stat.mtimeMs };
    })
    .filter(f => f.isFile && f.name.startsWith('media__'))
    .sort((a, b) => b.mtime - a.mtime); // Sort by modified time descending

  console.log('Recent media files:');
  files.slice(0, 8).forEach((f, i) => {
    console.log(`[${i}] ${f.name} - ${new Date(f.mtime).toLocaleString()} - ${f.filePath}`);
  });

  // The top 4 files will be the 4 logos
  const logos = files.slice(0, 4);

  // We should identify which is which or just name them:
  // logo_0, logo_1, logo_2, logo_3
  // Let's copy them as:
  // zimsec.png/jpg, vid.png/jpg, hexco.png/jpg, delf.png/jpg
  // Wait, let's copy them with generic names first, and we can check their order
  // or we can copy them and name them dynamically:
  // Let's name them:
  // logo_0.png, logo_1.png, logo_2.png, logo_3.png (preserving their original extensions)
  
  logos.forEach((logo, index) => {
    const ext = path.extname(logo.name);
    const destName = `accreditation_${index}${ext}`;
    const destPath = path.join(destDir, destName);
    fs.copyFileSync(logo.filePath, destPath);
    console.log(`Copied ${logo.name} to ${destPath}`);
  });

} catch (err) {
  console.error('Error listing/copying files:', err.message);
}
