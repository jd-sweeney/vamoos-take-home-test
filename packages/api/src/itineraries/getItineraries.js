const {
  buildResourceConfig,
  validateApiConfig,
  validateApiConfigToken,
  handleRequest,
} = require('../utils/index');

const getItineraries = async (
  apiConfig,
  parameters
) => {
  validateApiConfig(apiConfig);
  validateApiConfigToken(apiConfig);

  const resourcePath = '/itinerary';
  const {
    resourceEndpoint,
    resourceConfig,
  } = buildResourceConfig(
    'GET',
    resourcePath,
    apiConfig,
    parameters
  );

  return await handleRequest(resourceEndpoint, resourceConfig);
}

module.exports = getItineraries;