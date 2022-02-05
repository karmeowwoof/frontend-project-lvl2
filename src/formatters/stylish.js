const indent = (depth, tab = 4) => ' '.repeat(tab * depth - 2);

const stringify = (value, depth) => {
  if (typeof value !== 'object') {
    return `${value}`;
  }
  if (value === null) { return null; }
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return [
    '{',
    ...lines,
    `${indent(depth)}  }`,
  ].join('\n');
};

const doStylish = (diffObj) => {
  const iter = (data, depth) => data.map((statusObj) => {
    const getValue = (value, token) => `${indent(depth)}${token} ${statusObj.key}: ${stringify(value, depth)}\n`;
    if (statusObj.status === 'equal') {
      return getValue(statusObj.value, ' ');
    }
    if (statusObj.status === 'removed') {
      return getValue(statusObj.value, '-');
    }
    if (statusObj.status === 'added') {
      return getValue(statusObj.value, '+');
    }
    if (statusObj.status === 'notEqual') {
      return `${getValue(statusObj.value1, '-')}${getValue(statusObj.value2, '+')}`;
    }
    if (statusObj.status === 'nested') {
      return `${indent(depth)}  ${statusObj.key}: {\n${iter(statusObj.children, depth + 1).join('')}${indent(depth)}  }\n`;
    }
    return null;
  });
  return `{\n${iter(diffObj, 1).join('')}}`;
};
export default doStylish;
