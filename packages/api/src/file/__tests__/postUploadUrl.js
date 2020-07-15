const postUploadUrl = require('../postUploadUrl');

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const VAMOOS_API_DOMAIN = process.env.VAMOOS_API_DOMAIN;

const VAMOOS_API_USER_ACCESS_TOKEN = process.env.VAMOOS_API_USER_ACCESS_TOKEN;

const VAMOOS_API_OPERATOR_CODE = process.env.VAMOOS_API_OPERATOR_CODE;

const VAMOOS_API_PASS_CODE =  process.env.VAMOOS_API_PASS_CODE;

describe('[postUploadUrl]', () => {
  const apiConfig = {
    domain: VAMOOS_API_DOMAIN,
    token: {
      userAccessToken: VAMOOS_API_USER_ACCESS_TOKEN,
      operatorCode: VAMOOS_API_OPERATOR_CODE,
    },
  };

  const apiParameters = {
    operatorCode: VAMOOS_API_OPERATOR_CODE,
    passCode: VAMOOS_API_PASS_CODE,
    body: {
      content_type: 'application/pdf',
      filename: 'document.pdf',
    },
  };

  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.resetMocks();
  });

  it('Should be called at least once', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await postUploadUrl(apiConfig, apiParameters);

    expect(fetch.mock.calls.length).toStrictEqual(1);
  });
});
