import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

console.log('Starting static build...');

// Clean and create dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Helper to copy files/directories
const copySync = (src, dest) => {
  if (!fs.existsSync(src)) {
    console.log(`Skipping copy for non-existent source: ${src}`);
    return;
  }
  fs.cpSync(src, dest, { recursive: true, force: true });
  console.log(`Copied directory: ${src} -> ${dest}`);
};

// List of folders to copy
const assets = ['css', 'js', 'images', 'public'];
assets.forEach(asset => copySync(asset, path.join(distDir, asset)));

// Copy all HTML files in root
const files = fs.readdirSync(process.cwd());
let htmlCount = 0;
files.forEach(file => {
  if (file.endsWith('.html')) {
    fs.copyFileSync(file, path.join(distDir, file));
    htmlCount++;
  }
});

console.log(`Copied ${htmlCount} HTML files.`);
console.log('Build completed successfully: Static site copied to dist/');
