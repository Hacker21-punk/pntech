import fs from "fs";
import path from "path";

const distDir = path.join(process.cwd(), "dist");

console.log("Starting static build...");

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
const assets = ["css", "js", "images", "public", ".well-known"];
assets.forEach((asset) => copySync(asset, path.join(distDir, asset)));

// Copy all HTML files in root and other critical root files (robots.txt, favicons, manifests)
const files = fs.readdirSync(process.cwd());
let htmlCount = 0;
const rootFilesToCopy = [
  "robots.txt",
  "site.webmanifest",
  "favicon.ico",
  "favicon-96x96.png",
  "apple-touch-icon.png",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
];

files.forEach((file) => {
  if (file.endsWith(".html")) {
    fs.copyFileSync(file, path.join(distDir, file));
    htmlCount++;
  } else if (rootFilesToCopy.includes(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
    console.log(`Copied: ${file}`);
  }
});

console.log(`Copied ${htmlCount} HTML files.`);
console.log("Build completed successfully: Static site copied to dist/");
