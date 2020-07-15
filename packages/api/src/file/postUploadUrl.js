const {
  buildResourceConfig,
  validateApiConfig,
  validateApiConfigToken,
  handleRequest,
} = require('../utils/index');

const postUploadUrl = async (
  apiConfig,
  parameters = {}
) => {
  validateApiConfig(apiConfig);
  validateApiConfigToken(apiConfig);

  const resourcePath = '/file/upload_url';
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

module.exports = postUploadUrl;
