import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, '..');
const srcLogo = path.resolve(rootDir, 'assets/KrishnaStoreslogo.png');
const destDir = path.resolve(rootDir, 'public/important');
const destLogo = path.resolve(destDir, 'KrishnaStores logo.png');

if (fs.existsSync(srcLogo)) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(srcLogo, destLogo);
  console.log('✓ Copied KrishnaStores logo.png to public/important/KrishnaStores logo.png');
} else if (fs.existsSync(destLogo)) {
  console.log('✓ Verified KrishnaStores logo.png at public/important/KrishnaStores logo.png');
} else {
  console.warn('Warning: KrishnaStores logo.png not found');
}
