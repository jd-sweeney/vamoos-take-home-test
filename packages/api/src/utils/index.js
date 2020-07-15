const fetch = require('node-fetch');

const FormData = require('form-data');

const Qs = require('qs');

const validateApiConfig = (apiConfig) => {
  const apiDomain = apiConfig.domain;

  if (!apiDomain) {
    throw new Error('[utils/validateApiConfig]');
  }
}

const validateApiConfigToken = (
  apiConfig
) => {
  const apiToken = apiConfig.token;

  if (!apiToken || !apiToken.userAccessToken || !apiToken.operatorCode) {
    throw new Error('[utils/validateApiConfigToken]');
  }
}

const applyAuthTokenToHeader = (
  apiConfig
) => {
  const headerParameters = {};

  const accessToken = apiConfig.token.userAccessToken;
  const operatorCode = apiConfig.token.operatorCode;

  headerParameters['x-user-access-token'] = accessToken;
  headerParameters['x-operator-code'] = operatorCode;

  return headerParameters;
}

const buildApiQueryHeaders = (
  apiConfig,
  parameters = {}
) => {
  const filterParameters = parameters.filter || {};
  const headerParameters = parameters.headers || {};

  const authHeaderParameters = applyAuthTokenToHeader(apiConfig);

  const apiQueryParameters = Object.assign({}, filterParameters);
  const apiHeaderParameters = Object.assign({} , headerParameters, authHeaderParameters);

  return {
    query: apiQueryParameters,
    headers: apiHeaderParameters,
  };
}

const buildResourceConfig = (
  resourceMethod,
  resourcePath,
  apiConfig,
  parameters = {}
) => {
  const {
    query: apiQueryParameters,
    headers: apiHeaderParameters,
  } = buildApiQueryHeaders(apiConfig, parameters);

  const resourceConfig = {
    method: resourceMethod,
  };
  const resourceQuery = Qs.stringify(apiQueryParameters);
  const resourceEndpoint = apiConfig.domain + resourcePath + '?' + resourceQuery;

  const bodyData = parameters.body;
  const headersData = {};

  if (bodyData) {
    if (bodyData instanceof FormData) {
      resourceConfig.body = bodyData;
    }
    else {
      // Force to become json, for now
      headersData['Content-Type'] = 'application/json';
      resourceConfig.body = JSON.stringify(bodyData);
    }
  }

  resourceConfig.headers = Object.assign({}, apiHeaderParameters, headersData);

  return {
    resourceEndpoint,
    resourceConfig,
  };
}

const handleRequest = async(
  resourceEndpoint,
  resourceConfig
) => {
  const apiResp = await fetch(resourceEndpoint, resourceConfig);
  const respJson = await apiResp.json().catch(() => null);

  if (!apiResp.ok) {
    return respJson;
  }

  return respJson || null;
}

module.exports = {
  validateApiConfig,
  validateApiConfigToken,
  applyAuthTokenToHeader,
  buildApiQueryHeaders,
  buildResourceConfig,
  handleRequest,
};
