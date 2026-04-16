const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'app/products/page.tsx');
const content = fs.readFileSync(srcFile, 'utf8');

// iPad Page
let ipadContent = content
    .replace("import { getProducts, getBrands } from '@/lib/firebase-services';", "import { getProductsByType, getBrands } from '@/lib/firebase-services';")
    .replace('getProducts()', "getProductsByType('ipad')")
    .replace("All <span className=\"bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent\">Laptops</span>", "All <span className=\"bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent\">iPads</span>")
    .replace('laptops available', 'iPads available')
    .replace('Discovering high-performance laptops...', 'Discovering premium iPads...')
    .replace('No laptops found', 'No iPads found')
    .replace("export default function ProductsPage() {", "export default function IpadPage() {");

fs.mkdirSync(path.join(__dirname, 'app/ipad'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'app/ipad/page.tsx'), ipadContent, 'utf8');

// Accessories Page
let accessoriesContent = content
    .replace("import { getProducts, getBrands } from '@/lib/firebase-services';", "import { getAccessories, getBrands } from '@/lib/firebase-services';\nimport { Accessory } from '@/lib/types';")
    .replace('import { Product, Brand } from', '// import { Product, Brand } from')
    .replace('const [products, setProducts] = useState<Product[]>([])', 'const [products, setProducts] = useState<Accessory[]>([])')
    .replace('getProducts()', 'getAccessories()')
    .replace("All <span className=\"bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent\">Laptops</span>", "All <span className=\"bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent\">Accessories</span>")
    .replace('laptops available', 'accessories available')
    .replace('Discovering high-performance laptops...', 'Discovering premium accessories...')
    .replace('No laptops found', 'No accessories found')
    .replace("export default function ProductsPage() {", "export default function AccessoriesPage() {");

fs.mkdirSync(path.join(__dirname, 'app/accessories'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'app/accessories/page.tsx'), accessoriesContent, 'utf8');

console.log("Pages generated successfully!");
