import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import {
  describe, expect, beforeEach, test,
} from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let expectedStylish;
let expectedPlain;
let expectedJson;

beforeEach(() => {
  expectedStylish = readFile('expected_stylish.txt');
  expectedPlain = readFile('expected_plain.txt');
  expectedJson = readFile('expected_json.txt');
});

const extensions = ['json', 'yml'];

describe('Check generate diff. Formatters: stylish, plain, json', () => {
  test.each(extensions)('comparison file format: %p', (extension) => {
    const firstFile = getFixturePath(`file1.${extension}`);
    const secondFile = getFixturePath(`file2.${extension}`);
    expect(genDiff(firstFile, secondFile)).toEqual(expectedStylish);
    expect(genDiff(firstFile, secondFile, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(firstFile, secondFile, 'plain')).toEqual(expectedPlain);
    expect(genDiff(firstFile, secondFile, 'json')).toEqual(expectedJson);
  });
});
