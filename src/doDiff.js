import _ from 'lodash';

const doDiff = (data1, data2) => {
  const allKeys = _.sortBy(_.uniq(Object.keys(data1).concat(Object.keys(data2))));
  const result = allKeys.flatMap((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.has(data1, key) && _.has(data2, key)) {
      if (value1 === value2) {
        return `    ${key}: ${value1}`;
      }
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return `  - ${key}: ${value1}`;
    }
    if (_.has(data2, key) && !_.has(data1, key)) {
      return `  + ${key}: ${value2}`;
    }
    return [`  - ${key}: ${value1}`, `  + ${key}: ${value2}`];
  });
  const formatResult = `{\n${result.join('\n')}\n}`;
  return formatResult;
};
export default doDiff;
