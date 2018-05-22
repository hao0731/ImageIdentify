const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const imagesIdentify = require('../imageIdentify/main');
const response = require('../lib/response');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

router.get('/author', (req, res, next) => {
  res.json({
    name: 'HAO',
    age: 20
  });
});
const upload = multer({storage: storage});

router.route('/images/identify')
.post(upload.any(), (req, res, next) => {
  imagesIdentify(req.files[0].path).then(result => {
    response(res, 200, {data: result});
  }).catch(response => {
    response(res, 500, {data: response});
  });
})

module.exports = router;
