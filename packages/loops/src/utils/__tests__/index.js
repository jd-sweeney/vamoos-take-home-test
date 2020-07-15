require('jest-extended');

const { parseObjectValue } = require('../index');

describe('[utils/index]', () => {
  describe('[parseObjectValue]', () => {
    it('Should parse object.value into json', () => {
      const parsedValue = parseObjectValue({
        value: '[]',
      });

      expect(parsedValue).toBeArray();
      expect(parsedValue).toBeArrayOfSize(0);
    });

    it('Should return undefined for invalid object', () => {
      const parsedValue = parseObjectValue();

      expect(parsedValue).toBeUndefined();
    });

    it('Should return falsy for invalid object.value', () => {
      const parsedValue = parseObjectValue({
        value: null,
      });

      expect(parsedValue).toBeFalsy();
    });
  });
});
