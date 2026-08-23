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
const destLogo = path.resolve(destDir, 'KrishnaStores logo.png');

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
} catch (error) {
  console.error('❌ Error in copy-logo script:', error.message);
}
