var express = require('express');
var router = express.Router();
const multer  = require('multer')

const fileFilter = (req, file, cb) => {
    // Reject files with a mimetype other than 'image/png' or 'image/jpg'
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(new Error('Only PNG and JPG files are allowed'), false);
    }
  };

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.originalname.split('.')[0] + '-' + uniqueSuffix + '.'+file.originalname.split('.')[1] )
    }
  })
const upload = multer({ dest: 'uploads/', storage: storage,
    limits: {fileSize: 2000000}, fileFilter: fileFilter
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Zure izena: " + req.body.izena + ". Fitxategia: " + req.file.filename)
})


module.exports = router;
