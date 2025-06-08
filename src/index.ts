import path from 'path';
import { loadFile } from './load';

const filePath = path.join(__dirname, '..', process.argv[2]);
const rovers = loadFile(filePath);

console.log(rovers);