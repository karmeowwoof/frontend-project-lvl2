import doStylish from './stylish.js';
import doPlain from './plain.js';
import doJson from './json.js';

const format = (diffObj, formatName) => {
  if (formatName === 'plain') {
    return doPlain(diffObj);
  }
  if (formatName === 'json') {
    return doJson(diffObj);
  }
  return doStylish(diffObj);
};

export default format;
