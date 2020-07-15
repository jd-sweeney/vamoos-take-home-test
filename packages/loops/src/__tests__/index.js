require('jest-extended');

const { forLoop, forOfLoop, whileLoop, doWhileLoop } = require('../index');
const image = require('../utils/image');

describe('[index]', () => {
  const objects = [{ value: '{"img": "http://via.placeholder.com/400x200/"}' }];

  const testRunner = (imagesDimensions) => {
    expect(imagesDimensions).toBeObject();
    expect(imagesDimensions).not.toBeEmpty();

    for (const obj of objects) {
      const objValue = JSON.parse(obj.value);

      const imgDims = imagesDimensions[objValue.img];
      expect(imgDims).toBeObject();
      expect(imgDims.width).toBeNumber();
      expect(imgDims.height).toBeNumber();
      expect(imgDims.type).toBeString();
    }
  };

  describe('[forLoop]', () => {
    it('Should work', async () => {
      const imagesDimensions = await forLoop(objects);

      expect(imagesDimensions).toBeObject();

      testRunner(imagesDimensions);
    });
  });

  describe('[forOfLoop]', () => {
    it('Should work', async () => {
      const imagesDimensions = await forOfLoop(objects);

      expect(imagesDimensions).toBeObject();

      testRunner(imagesDimensions);
    });
  });

  describe('[whileLoop]', () => {
    it('Should work', async () => {
      const imagesDimensions = await whileLoop(objects);

      expect(imagesDimensions).toBeObject();

      testRunner(imagesDimensions);
    });
  });

  describe('[doWhileLoop]', () => {
    it('Should work', async () => {
      const imagesDimensions = await doWhileLoop(objects);

      expect(imagesDimensions).toBeObject();

      testRunner(imagesDimensions);
    });
  });
});
