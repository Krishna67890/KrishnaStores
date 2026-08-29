import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
// Try both possible names for the logo to be safe
const srcLogos = [
  path.resolve(rootDir, 'assets/KrishnaStoreslogo.png'),
  path.resolve(rootDir, 'assets/KrishnaStores logo.png')
];
const destDir = path.resolve(rootDir, 'public/important');
const destLogo = path.resolve(destDir, 'KrishnaStoreslogo.png');

try {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  let found = false;
  for (const src of srcLogos) {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destLogo);
      console.log(`✓ Copied ${path.basename(src)} to public/important/`);
      found = true;
      break;
    }
  }

  if (!found) {
    console.warn('⚠️ Warning: Logo not found in assets/ folder.');
  }

  // Copy assets and assets/Games to public/assets and public/assets/Games
  const assetsDir = path.resolve(rootDir, 'assets');
  const gamesAssetsDir = path.resolve(rootDir, 'assets/Games');
  const publicAssetsDir = path.resolve(rootDir, 'public/assets');
  const publicGamesAssetsDir = path.resolve(rootDir, 'public/assets/Games');

  function copyFolderFiles(srcDir, destDir) {
    if (!fs.existsSync(srcDir)) return;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    const files = fs.readdirSync(srcDir);
    for (const file of files) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      if (!fs.lstatSync(srcPath).isDirectory()) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyFolderFiles(assetsDir, publicAssetsDir);
  copyFolderFiles(gamesAssetsDir, publicAssetsDir);
  copyFolderFiles(gamesAssetsDir, publicGamesAssetsDir);
  console.log('✓ Copied Games assets to public/assets/Games/');
} catch (error) {
  console.error('❌ Error in copy-logo script:', error.message);
}
