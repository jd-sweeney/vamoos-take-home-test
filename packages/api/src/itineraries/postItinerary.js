const {
  buildResourceConfig,
  validateApiConfig,
  validateApiConfigToken,
  handleRequest,
} = require('../utils/index');

const postItinerary = async (
  apiConfig,
  parameters = {}
) => {
  validateApiConfig(apiConfig);
  validateApiConfigToken(apiConfig);

  const operatorCode = parameters.operatorCode;
  const passCode = parameters.passCode;

  if (!operatorCode || !passCode) {
    throw new Error('[api/postItinerary] Invalid parameters');
  }

  const resourcePath = `/itinerary/${operatorCode}/${passCode}`;
  const {
    resourceEndpoint,
    resourceConfig,
  } = buildResourceConfig(
    'POST',
    resourcePath,
    apiConfig,
    parameters
  );

  return await handleRequest(resourceEndpoint, resourceConfig);
}

module.exports = postItinerary;