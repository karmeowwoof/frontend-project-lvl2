import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  return value;
};

const doPlain = (diffObj) => {
  const plain = (statusObj, parent) => statusObj
    .filter((node) => node.status !== 'equal')
    .map((node) => {
      const property = parent ? `${parent}.${node.key}` : node.key;
      switch (node.status) {
        case 'added':
          return `Property '${property}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${property}' was removed`;
        case 'notEqual':
          return `Property '${property}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested':
          return `${plain(node.children, property)}`;
        default:
          return null;
      }
    }).join('\n');
  return plain(diffObj, 0);
};

export default doPlain;
