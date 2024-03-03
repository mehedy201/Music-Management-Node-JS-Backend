require('dotenv').config();
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


const app = express();


// Configure AWS SDK
const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });


// // Upload User Profile Image________________________
module.exports.uploadUserProfileImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const folderName = 'user-image';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = uniqueSuffix + '-' + file.originalname;
        const fullPath = folderName + '/' + fileName;
        cb(null, fullPath);
      },
    }),

  });