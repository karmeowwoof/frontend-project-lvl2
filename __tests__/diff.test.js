import * as fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { describe, expect, it } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('check for correct diff', () => {
  it('compare files json and yml', () => {
    expect(genDiff('file3.json', 'file4.json')).toEqual(readFile('expected_file1.txt'));
    expect(genDiff('file3.yml', 'file4.yml')).toEqual(readFile('expected_file1.txt'));
    expect(genDiff('file3.json', 'file4.json', 'plain')).toEqual(readFile('expected_file_plain.txt'));
    expect(genDiff('file3.yml', 'file4.yml', 'plain')).toEqual(readFile('expected_file_plain.txt'));
    expect(genDiff('file3.json', 'file4.json', 'json')).toEqual(readFile('expected_jsonformat.txt'));
    expect(genDiff('file3.yml', 'file4.yml', 'json')).toEqual(readFile('expected_jsonformat.txt'));
  });
});
