

function parse(data, fileExt) {
  if (fileExt === 'json') {
    return JSON.parse(data);
  }
}

export default parse;