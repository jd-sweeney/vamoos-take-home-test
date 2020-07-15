const fs = require('fs');

const { join } = require('path');

const { promisify } = require('util');

const fetch = require('node-fetch');

const mime = require('mime-types');

const postUploadUrl = require('../../src/file/postUploadUrl');

const postItinerary = require('../../src/itineraries/postItinerary');

const VAMOOS_API_DOMAIN = process.env.VAMOOS_API_DOMAIN;

const VAMOOS_API_USER_ACCESS_TOKEN = process.env.VAMOOS_API_USER_ACCESS_TOKEN;

const VAMOOS_API_OPERATOR_CODE = process.env.VAMOOS_API_OPERATOR_CODE;

const VAMOOS_API_PASS_CODE =  process.env.VAMOOS_API_PASS_CODE;

const API_CONFIG = {
  domain: VAMOOS_API_DOMAIN,
  token: {
    userAccessToken: VAMOOS_API_USER_ACCESS_TOKEN,
    operatorCode: VAMOOS_API_OPERATOR_CODE,
  },
};

const uploadFileToS3 = async (
  filePath,
  uploadPath,
  uploadParams = {}
) => {
  await promisify(fs.access.bind(fs))(filePath, fs.constants.F_OK);

  uploadParams.mimeType = uploadParams.mimeType || mime.lookup(filePath);

  await fetch(uploadPath, {
    method: 'PUT',
    headers: {
      'Content-Type': uploadParams.mimeType,
    },
    body: fs.readFileSync(filePath)
  });
};

const uploadFile = async (
  fileName
) => {
  const filePath = join(__dirname, 'assets', fileName);
  const fileMimeType = mime.lookup(filePath);

  const uploadUrl = await postUploadUrl(API_CONFIG, {
    body: {
      content_type: fileMimeType,
      filename: fileName,
    },
  });

  await uploadFileToS3(filePath, uploadUrl.url, {
    mimeType: fileMimeType,
  });

  return uploadUrl;
}

(async () => {
  console.log('start: creating itinerary');

  console.log('// 1. Upload background');
  const backgroundFileName = 'background.jpg';
  const backgroundUploadUrl = await uploadFile(backgroundFileName);

  console.log('// 2. Upload document');
  const documentFileName = 'document.pdf';
  const documentUploadUrl = await uploadFile(documentFileName);

  console.log('// 3. Create Itinerary');
  await postItinerary(API_CONFIG, {
    operatorCode: VAMOOS_API_OPERATOR_CODE,
    passCode: VAMOOS_API_PASS_CODE,
    body: {
      background: {
        file_url: backgroundUploadUrl.s3url,
        name: backgroundFileName,
      },
      documents: {
        destination: [],
        travel: [
          {
            file_url: documentUploadUrl.s3url,
            name: documentFileName,
          },
        ],
      },
      departure_date: '2020-07-15',
      return_date: '2020-07-15',
      field1: 'Destination',
      field2: 'Holiday',
      field3: 'Location First Name',
      field4: 'Location Last Name',
    },
  });

  console.log('finished: creating itinerary');
})();