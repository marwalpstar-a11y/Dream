/**
 * Hostinger Build Script
 * Validates project structure and prepares deployment assets
 */
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting DREAMEXCH24 deployment build for Hostinger...');

const requiredFiles = [
  'index.html',
  'services.html',
  'shop.html',
  'cricket-id.html',
  't20-id.html',
  'football-id.html',
  'product-detail.html',
  'about.html',
  'contact.html',
  'responsible-gaming.html',
  'assets/css/main.css',
  'assets/js/app.js',
  'assets/js/config.js'
];

let allValid = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file} is present`);
  } else {
    console.error(`  ✗ Missing file: ${file}`);
    allValid = false;
  }
});

if (!allValid) {
  console.error('❌ Build validation failed: Missing required files.');
  process.exit(1);
}

console.log('✅ DREAMEXCH24 build successfully verified for Hostinger deployment!');
process.exit(0);
