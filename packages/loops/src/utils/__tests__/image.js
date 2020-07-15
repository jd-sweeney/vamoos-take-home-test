require('jest-extended');

const { getImageSize } = require('../image');

describe('[utils/image]', () => {
  describe('fetchResource', () => {
    beforeAll(() => {
      jest.setTimeout(10000);
    });

    it('Should return image dims of 400 x 200 jpg for unsecure resource', async () => {
      const imageDims = await getImageSize(
        'http://via.placeholder.com/400x200.jpg'
      );

      expect(imageDims).toBeObject();
      expect(imageDims.width).toStrictEqual(400);
      expect(imageDims.height).toStrictEqual(200);
      expect(imageDims.type).toStrictEqual('jpg');
    });

    it('Should return image dims of 400 x 200 jpg for secure resource', async () => {
      const imageDims = await getImageSize(
        'https://via.placeholder.com/400x200.jpg'
      );

      expect(imageDims).toBeObject();
      expect(imageDims.width).toStrictEqual(400);
      expect(imageDims.height).toStrictEqual(200);
      expect(imageDims.type).toStrictEqual('jpg');
    });

    it('Should return image dims of 200 x 1000 png for unsecure resource', async () => {
      const imageDims = await getImageSize(
        'http://via.placeholder.com/200x1000.png'
      );

      expect(imageDims).toBeObject();
      expect(imageDims.width).toStrictEqual(200);
      expect(imageDims.height).toStrictEqual(1000);
      expect(imageDims.type).toStrictEqual('png');
    });

    it('Should return image dims of 200 x 1000 png for secure resource', async () => {
      const imageDims = await getImageSize(
        'https://via.placeholder.com/200x1000.png'
      );

      expect(imageDims).toBeObject();
      expect(imageDims.width).toStrictEqual(200);
      expect(imageDims.height).toStrictEqual(1000);
      expect(imageDims.type).toStrictEqual('png');
    });

    it('Should fail to retrieve image meta for invalid image resource', async () => {
      const imageDims = await expect(
        getImageSize('https://via.placeholder.com')
      ).rejects.toThrowError();
    });

    it('Should fail to retrieve image meta for invalid uri', async () => {
      const imageDims = await expect(
        getImageSize('http://urlthatshouldnotexist.com')
      ).rejects.toThrowError();
    });

    it('Should fail to retrieve image meta for invalid non http requests', async () => {
      const imageDims = await expect(
        getImageSize('ftp://via.placeholder.com')
      ).rejects.toThrowError();
    });

    it('Should fail to retrieve image meta for empty uri', async () => {
      const imageDims = await expect(getImageSize('')).rejects.toThrowError();
    });
  });
});
