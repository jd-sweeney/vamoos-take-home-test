require('jest-extended');

const VAMOOS_API_DOMAIN = process.env.VAMOOS_API_DOMAIN;

const VAMOOS_API_USER_ACCESS_TOKEN = process.env.VAMOOS_API_USER_ACCESS_TOKEN;

const VAMOOS_API_OPERATOR_CODE = process.env.VAMOOS_API_OPERATOR_CODE;

const {
  validateApiConfig,
  validateApiConfigToken,
  applyAuthTokenToHeader,
  buildApiQueryHeaders,
} = require('../index');

describe('[utils] Tests', () => {
  const apiConfig = {
    domain: VAMOOS_API_DOMAIN,
    token: {
      userAccessToken: VAMOOS_API_USER_ACCESS_TOKEN,
      operatorCode: VAMOOS_API_OPERATOR_CODE,
    },
  };

  describe('[utils/validateApiConfig]', () => {
    it('Should validate the api config', () => {
      validateApiConfig(apiConfig);
    });

    it('Should fail if provided an invalid domain', () => {
      const apiConfigInvalidDomain = JSON.parse(JSON.stringify(apiConfig));
      delete apiConfigInvalidDomain.domain;

      expect(() => {
        validateApiConfig(apiConfigInvalidDomain)
      }).toThrow();
    });
  });

  describe('[utils/validateApiConfigToken]', () => {
    it('Should validate the api config token', () => {
      validateApiConfigToken(apiConfig);
    });

    it('Should fail if provided an invalid token object', () => {
      const apiConfigInvalidTokenValue = JSON.parse(JSON.stringify(apiConfig));
      delete apiConfigInvalidTokenValue.token;

      expect
      (() => {
        validateApiConfigToken(apiConfigInvalidTokenValue);
      }).toThrow();
    });

    it('Should fail if provided an invalid user access token', () => {
      const apiConfigInvalidUserAccessToken = JSON.parse(JSON.stringify(apiConfig));
      delete apiConfigInvalidUserAccessToken.token.userAccessToken;

      expect
      (() => {
        validateApiConfigToken(apiConfigInvalidUserAccessToken);
      }).toThrow();
    });

    it('Should fail if provided an invalid operator code', () => {
      const apiConfigInvalidOperatorToken = JSON.parse(JSON.stringify(apiConfig));
      delete apiConfigInvalidOperatorToken.token.operatorCode;

      expect
      (() => {
        validateApiConfigToken(apiConfigInvalidOperatorToken);
      }).toThrow();
    });
  });

  describe('[utils/applyAuthTokenToHeader]', () => {
    it('Should return a token as a header object', () => {
      const headerParameters = applyAuthTokenToHeader(apiConfig);

      expect(headerParameters).toBeObject();

      const userAccessToken = headerParameters['x-user-access-token'];
      const operatorCode = headerParameters['x-operator-code'];

      expect(userAccessToken).toBeString();
      expect(userAccessToken).not.toBeEmpty();
      expect(userAccessToken).toStrictEqual(apiConfig.token.userAccessToken);

      expect(operatorCode).toBeString();
      expect(operatorCode).not.toBeEmpty();
      expect(operatorCode).toStrictEqual(apiConfig.token.operatorCode);
    });
  });

  describe('[utils/buildApiQueryHeaders]', () => {
    const apiParameters = {
      filter: {
        count: 25,
        page: 1,
      },
      headers: {
        origin: 'http://localhost:3000',
      },
    };

    it('Should return a valid query/header object', () => {
      const apiQueryHeaders = buildApiQueryHeaders(apiConfig, apiParameters);

      expect(apiQueryHeaders).toBeObject();

      const query = apiQueryHeaders.query;
      const headers = apiQueryHeaders.headers;

      expect(query).toBeObject();
      expect(query.count).toStrictEqual(apiParameters.filter.count);
      expect(query.page).toStrictEqual(apiParameters.filter.page);

      expect(headers).toBeObject();
      expect(headers.origin).toStrictEqual(apiParameters.headers.origin);
    });
  });
});
