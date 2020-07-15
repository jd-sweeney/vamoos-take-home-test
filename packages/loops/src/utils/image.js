const http = require('http');
const https = require('https');
const imageSize = require('image-size');

const REGEX_HTTPS = /^https:\/\//i;
const REGEX_HTTP = /^http:\/\//i;

const onResponseData = (request, onCallback) => {
  const buffer = [];

  return (data) => {
    buffer.push(data);

    try {
      const imageDims = imageSize(Buffer.concat(buffer));

      request.abort();
      onCallback(imageDims);
    } catch (ex) {}
  };
};

const onResponseError = (onError) => {
  return (err) => {
    onError(err);
  };
};

const onResponseEnd = (onError) => {
  return () => {
    onError(new Error('Failed to retrieve image dimensions'));
  };
};

const onResponse = (req, resp, onSuccess, onError) => {
  resp.on('data', onResponseData(req, onSuccess));
  resp.on('error', onResponseError(onError));
  resp.on('end', onResponseEnd(onError));
};

const getImageSize = async (resourceUri) => {
  const apiClient = resourceUri.match(REGEX_HTTPS)
    ? https
    : REGEX_HTTP
    ? http
    : null;

  return new Promise((resolve, reject) => {
    if (!apiClient) {
      return reject(new Error('Invalid external resource'));
    }

    const request = apiClient.get(resourceUri, (response) => {
      onResponse(request, response, resolve, reject);
    });

    request.on('error', onResponseError(reject));
  });
};

module.exports = { getImageSize };
