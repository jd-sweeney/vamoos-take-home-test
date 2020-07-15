const parseObjectValue = (obj) => {
  try {
    return obj && JSON.parse(obj.value);
  } catch (ex) {
    console.error(`Failed to parse obj.value with value: `, {
      ex,
    });
  }
};

module.exports = {
  parseObjectValue,
};
