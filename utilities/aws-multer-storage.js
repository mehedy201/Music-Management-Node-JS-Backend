require('dotenv').config();
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');


// Configure AWS SDK
const s3 = new aws.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.REGION
  });


// User Profile Image Upload___________________________________________________
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


// Artist Image Upload___________________________________________________________
module.exports.uploadArtistImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const folderName = 'artist-image';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = uniqueSuffix + '-' + file.originalname;
        const fullPath = folderName + '/' + fileName;
        cb(null, fullPath);
      },
    }),
});

module.exports.deleteArtistImage = async (i) => {
  await s3.deleteObject({ Bucket: process.env.BUCKET, Key: i }).promise();
}


// Label Image Upload___________________________________________________________
module.exports.uploadLabelImage = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.BUCKET,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const folderName = 'label-image';
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const fileName = uniqueSuffix + '-' + file.originalname;
        const fullPath = folderName + '/' + fileName;
        cb(null, fullPath);
      },
    }),
});