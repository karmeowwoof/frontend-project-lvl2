import _ from 'lodash';

const doDiff = (object1, object2) => {
  const unitedKeys = _.sortBy(_.union(Object.keys(object1), Object.keys(object2)));
  return unitedKeys.map((key) => {
    const value1 = object1[key];
    const value2 = object2[key];

    switch (true) {
      case !_.has(object1, key):
        return {
          key, status: 'added', value: value2,
        };

      case !_.has(object2, key):
        return {
          key, status: 'removed', value: value1,
        };

      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return {
          key, status: 'nested', children: doDiff(value1, value2),
        };

      case !_.isEqual(value1, value2):
        return {
          key, status: 'notEqual', value1, value2,
        };
      default:
        return {
          key, status: 'equal', value: value1,
        };
    }
  });
};

export default doDiff;
