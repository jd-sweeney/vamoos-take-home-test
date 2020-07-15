const { parseObjectValue } = require('./utils/index');
const { getImageSize } = require('./utils/image');

const forLoop = async (objects) => {
  const imagesDimensions = {};

  for (let objectIndex = 0; objectIndex < objects.length; ++objectIndex) {
    const obj = objects[objectIndex];
    const parsedObjectValue = parseObjectValue(obj);

    if (!parsedObjectValue || !parsedObjectValue.hasOwnProperty('img')) {
      continue;
    }

    if (!imagesDimensions[parsedObjectValue.img]) {
      const imageDims = await getImageSize(parsedObjectValue.img);
      imagesDimensions[parsedObjectValue.img] = imageDims;
    }
  }

  return imagesDimensions;
};

const forOfLoop = async (objects) => {
  const imagesDimensions = {};

  for (const obj of objects) {
    const parsedObjectValue = parseObjectValue(obj);

    if (!parsedObjectValue || !parsedObjectValue.hasOwnProperty('img')) {
      continue;
    }

    if (!imagesDimensions[parsedObjectValue.img]) {
      const imageDims = await getImageSize(parsedObjectValue.img);
      imagesDimensions[parsedObjectValue.img] = imageDims;
    }
  }

  return imagesDimensions;
};

const doWhileLoop = async (objects) => {
  const imagesDimensions = {};
  const iterator = objects[Symbol.iterator]();

  let obj = iterator.next();

  if (obj.done) {
    return;
  }

  do {
    const parsedObjectValue = parseObjectValue(obj.value);

    if (!parsedObjectValue || !parsedObjectValue.hasOwnProperty('img')) {
      continue;
    }

    if (!imagesDimensions[parsedObjectValue.img]) {
      const imageDims = await getImageSize(parsedObjectValue.img);
      imagesDimensions[parsedObjectValue.img] = imageDims;
    }

    obj = iterator.next();
  } while (!obj.done);

  return imagesDimensions;
};

const whileLoop = async (objects) => {
  const imagesDimensions = {};
  const iterator = objects[Symbol.iterator]();

  let obj = iterator.next();

  while (!obj.done) {
    const parsedObjectValue = parseObjectValue(obj.value);

    if (!parsedObjectValue || !parsedObjectValue.hasOwnProperty('img')) {
      continue;
    }

    if (!imagesDimensions[parsedObjectValue.img]) {
      const imageDims = await getImageSize(parsedObjectValue.img);
      imagesDimensions[parsedObjectValue.img] = imageDims;
    }

    obj = iterator.next();
  }

  return imagesDimensions;
};

module.exports = {
  forLoop,
  forOfLoop,
  whileLoop,
  doWhileLoop,
};
