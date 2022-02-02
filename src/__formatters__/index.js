import doStylish from './stylish.js';
import doPlain from './plain.js';

const format = (diffObj, formatName) => {
  if (formatName === 'plain') {
    return doPlain(diffObj);
  }
  return doStylish(diffObj);
};

export default format;
