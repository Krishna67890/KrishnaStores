import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.resolve(rootDir, 'assets');
const gamesAssetsDir = path.resolve(assetsDir, 'Games');
const publicAssetsDir = path.resolve(rootDir, 'public/assets');

function copyFiles(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) {
    console.warn(`Source directory ${srcDir} does not exist.`);
    return;
  }

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(srcDir);
  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(destDir, file);

    if (fs.lstatSync(srcPath).isDirectory()) {
      // For now only copying files from top level and Games subfolder
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ Copied ${file} to ${destDir}`);
  }
}

try {
  console.log('Starting asset copy...');
  copyFiles(assetsDir, publicAssetsDir);
  copyFiles(gamesAssetsDir, publicAssetsDir);
  console.log('Asset copy complete.');
} catch (error) {
  console.error('❌ Error copying assets:', error.message);
}
