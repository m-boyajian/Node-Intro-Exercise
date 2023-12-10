const fs = require('fs').promises; 
const axios = require('axios');

async function cat(path, outFile) {
  try {
    const data = await fs.readFile(path, 'utf8');
    if (outFile) {
      await fs.writeFile(outFile, data);
      console.log(`Content written to ${outFile}`);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error reading ${path}: ${err}`);
    process.exit(1);
  }
}

async function webCat(url, outFile) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    if (outFile) {
      await fs.writeFile(outFile, data);
      console.log(`Content written to ${outFile}`);
    } else {
      console.log(data);
    }
  } catch (err) {
    console.error(`Error fetching ${url}: ${err.message}`);
    process.exit(1);
  }
}

const arg = process.argv[2];

if (!arg) {
  console.error('Please provide a file path or URL.');
  process.exit(1);
}

const outFileIndex = process.argv.indexOf('--out');
const outFile = outFileIndex !== -1 ? process.argv[outFileIndex + 1] : null;

if (arg.slice(0, 4) === 'http') {
  webCat(arg, outFile);
} else {
  cat(arg, outFile);
}
