const express = require('express')
const multer  = require('multer')
const fs = require('fs');
const path = require('path')

const routerPhoto = express.Router()
let filePath
let imageFiles = []

const storage = multer.diskStorage({
    storage: diskStorage,
  limits: {
     fileSize: 8000000 // Compliant: 8MB
  }
    destination: function (cb) {
      cb(null, path.join(__dirname, '../files/uploads/'))
    },
    filename: function (file, cb) {
      filePath = file.fieldname + '-' + Date.now()+Math.floor(Math.random() * (10 - 1 + 1)) + 1+'.jpeg'
      imageFiles.push(filePath)
      cb(null, filePath)
    }
  })

const upload = multer({
    storage: storage
})

routerPhoto.post('/', upload.array('avatar', 3) ,(req, res) => {
    console.log('headers',req.headers);
    console.log('req.body',req.body)
    console.log('files',req.files)
    res.send({"images": imageFiles}).status(200)
    console.log('sucSDSDDSdddess')
    imageFiles = []
})

routerPhoto.get('/image', function (req, res) {
  const pathImage = req.query.file;
  const src = fs.createReadStream(path.join(__dirname, '../files/uploads/') + pathImage);
  console.log('teste: /image')
  console.log(src)
  src.on('open', function () {
      src.pipe(res);
      console.info('down completed: ' + pathImage);
  });
  src.on('error', function (err) {
      console.error('' + err);
  });
});


routerPhoto.delete('/image', function (req, res) {
  const pathImage = req.query.file;
  const src = fs.createReadStream(path.join(__dirname, '../files/uploads/') + pathImage);
  fs.unlink(src.path, (err) => {
    if (err) throw err;
    console.log(req.query.file, 'deleted!');
  });
  res.status(200).send('')
})

module.exports = routerPhoto
