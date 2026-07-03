import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.resolve(__dirname, '../src/data/products.ts');
let productsContent = fs.readFileSync(productsPath, 'utf8');

const seoFiles = ['seoData1.json', 'seoData2.json', 'seoData3.json'];

let allSeoData = {};

seoFiles.forEach(file => {
  const filePath = `C:\\Users\\Rachit Sikka\\.gemini\\antigravity\\brain\\d7dc6c94-ee28-4e77-b0f2-547dcd3148fa\\scratch\\${file}`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    allSeoData = { ...allSeoData, ...data };
  } else {
    console.warn(`Could not find ${filePath}`);
  }
});

for (const [slug, data] of Object.entries(allSeoData)) {
  console.log(`Injecting SEO for: ${slug}`);
  
  // Create a regex to find the block for this slug
  // It looks for `slug: "slug-name",` and matches everything until the next `  },`
  const slugRegex = new RegExp(`(slug:\\s*"${slug}",[\\s\\S]*?)(  },)`, 'g');
  
  productsContent = productsContent.replace(slugRegex, (match, beforeClosing, closing) => {
    
    // Remove existing tagline and valueProp to avoid duplicates
    let cleanBlock = beforeClosing
      .replace(/tagline:\s*".*?",\n/g, '')
      .replace(/valueProp:\s*".*?",\n/g, '')
      .replace(/seoTitle:\s*".*?",\n/g, '')
      .replace(/seoDescription:\s*".*?",\n/g, '')
      .replace(/benefits:\s*\[[\s\S]*?\],\n/g, '')
      .replace(/howItWorks:\s*\[[\s\S]*?\],\n/g, '')
      .replace(/faqs:\s*\[[\s\S]*?\],\n/g, '');

    // Format new data
    let injection = '';
    if (data.tagline) injection += `    tagline: ${JSON.stringify(data.tagline)},\n`;
    if (data.valueProp) injection += `    valueProp: ${JSON.stringify(data.valueProp)},\n`;
    if (data.seoTitle) injection += `    seoTitle: ${JSON.stringify(data.seoTitle)},\n`;
    if (data.seoDescription) injection += `    seoDescription: ${JSON.stringify(data.seoDescription)},\n`;
    if (data.benefits) injection += `    benefits: ${JSON.stringify(data.benefits, null, 2).replace(/\n/g, '\n    ')},\n`;
    if (data.howItWorks) injection += `    howItWorks: ${JSON.stringify(data.howItWorks, null, 2).replace(/\n/g, '\n    ')},\n`;
    if (data.faqs) injection += `    faqs: ${JSON.stringify(data.faqs, null, 2).replace(/\n/g, '\n    ')},\n`;

    return cleanBlock + injection + closing;
  });
}

fs.writeFileSync(productsPath, productsContent);
console.log('Successfully injected all SEO data into products.ts');
