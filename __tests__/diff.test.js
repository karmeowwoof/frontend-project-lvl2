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
    const firstFileJson = getFixturePath(`file1.json`);
    const secondFileJson = getFixturePath(`file2.json`);
    const firstFileYml = getFixturePath(`file1.yml`);
    const secondFileYml = getFixturePath(`file2.yml`);
    expect(genDiff(firstFileJson, secondFileJson)).toEqual(readFile('expected_file1.txt'));
    expect(genDiff(firstFileYml, secondFileYml)).toEqual(readFile('expected_file1.txt'));
    expect(genDiff(firstFileJson, secondFileJson, 'plain')).toEqual(readFile('expected_file_plain.txt'));
    expect(genDiff(firstFileYml, secondFileYml, 'plain')).toEqual(readFile('expected_file_plain.txt'));
    expect(genDiff(firstFileJson, secondFileJson, 'json')).toEqual(readFile('expected_jsonformat.txt'));
    expect(genDiff(firstFileYml, secondFileYml, 'json')).toEqual(readFile('expected_jsonformat.txt'));
  });
});
