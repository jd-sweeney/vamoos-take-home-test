const getItineraries = require('../getItineraries');

const fetch = require('jest-fetch-mock');
jest.setMock('node-fetch', fetch);

const VAMOOS_API_DOMAIN = process.env.VAMOOS_API_DOMAIN;

const VAMOOS_API_USER_ACCESS_TOKEN = process.env.VAMOOS_API_USER_ACCESS_TOKEN;

const VAMOOS_API_OPERATOR_CODE = process.env.VAMOOS_API_OPERATOR_CODE;

describe('[getItineraries]', () => {
  const apiParameters = {
    domain: VAMOOS_API_DOMAIN,
    token: {
      userAccessToken: VAMOOS_API_USER_ACCESS_TOKEN,
      operatorCode: VAMOOS_API_OPERATOR_CODE,
    },
  };

  beforeEach(() => {
    fetchMock.doMock();
    fetchMock.resetMocks();
  });

  it('Should be called at least once', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({}));
    await getItineraries(apiParameters);

    expect(fetch.mock.calls.length).toStrictEqual(1);
  });
});