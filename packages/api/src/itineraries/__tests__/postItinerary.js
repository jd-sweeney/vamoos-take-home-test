const postItinerary = require('../postItinerary');

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const VAMOOS_API_DOMAIN = process.env.VAMOOS_API_DOMAIN;

const VAMOOS_API_USER_ACCESS_TOKEN = process.env.VAMOOS_API_USER_ACCESS_TOKEN;

const VAMOOS_API_OPERATOR_CODE = process.env.VAMOOS_API_OPERATOR_CODE;

const VAMOOS_API_PASS_CODE =  process.env.VAMOOS_API_PASS_CODE;

describe('[postItinerary]', () => {
  const apiConfig = {
    domain: VAMOOS_API_DOMAIN,
    token: {
      userAccessToken: VAMOOS_API_USER_ACCESS_TOKEN,
      operatorCode: VAMOOS_API_OPERATOR_CODE,
    },
  };

  const apiParameters = {
    operatorCode: VAMOOS_API_OPERATOR_CODE,
    passCode: VAMOOS_API_PASS_CODE
  };

  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.resetMocks();
  });

  it('Should be called at least once', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await postItinerary(apiConfig, apiParameters);

    expect(fetch.mock.calls.length).toStrictEqual(1);
  });

  it('Should fail if provided an invalid operator code', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const apiParametersInvalidOperatorCode = JSON.parse(JSON.stringify(apiParameters));
    delete apiParametersInvalidOperatorCode.operatorCode;

    expect(postItinerary(apiConfig, apiParametersInvalidOperatorCode)).rejects
    .toThrow();
  });

  it('Should fail if provided an invalid pass code', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));

    const apiParametersInvalidPassCode = JSON.parse(JSON.stringify(apiParameters));
    delete apiParametersInvalidPassCode.passCode;

    expect(postItinerary(apiConfig, apiParametersInvalidPassCode)).rejects
    .toThrow();
  });
});
