import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import {
  describe, expect, test,
} from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const stylish = readFile('expected_stylish.txt');
const plain = readFile('expected_plain.txt');
const json = readFile('expected_json.txt');

const extensions = ['json', 'yml'];

describe('Check generate diff. Formatters: stylish, plain, json', () => {
  test.each(extensions)('comparison file format: %p', (extension) => {
    const firstFile = getFixturePath(`file1.${extension}`);
    const secondFile = getFixturePath(`file2.${extension}`);
    expect(genDiff(firstFile, secondFile)).toEqual(stylish);
    expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(stylish);
    expect(genDiff(firstFile, secondFile, 'plain')).toEqual(plain);
    expect(genDiff(firstFile, secondFile, 'json')).toEqual(json);
  });
});
