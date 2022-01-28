import * as fs from 'fs';
import * as path from 'path';
import parse from './parser.js';
import doDiff from './doDiff.js';

const createObj = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const presentData = fs.readFileSync(fullPath, 'utf-8');
  const fileExt = path.extname(filepath).substring(1);
  const result = parse(presentData, fileExt);
  return result;
};

const genDiff = (filepath1, filepath2) => {
  const data1 = createObj(filepath1);
  const data2 = createObj(filepath2);
  const diff = doDiff(data1, data2);
  return diff;
};

export default genDiff;
