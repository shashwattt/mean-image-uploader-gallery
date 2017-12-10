// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var mongoose = require("mongoose");
var GalleryItem = require('./server/models/galleryItem');

mongoose.connect('mongodb://admin:admin@ds161505.mlab.com:61505/rgrjs-data');
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
       console.log('Sussessfully connected !!!');
    });
///////////////Start
var multer = require('multer');
var fs = require('fs');
var DIR = './uploads/';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var filter =function(req, file, cb){
  const extension = file.mimetype.split('/')[0];
  if(extension !== 'image'){
      return cb(new Error('Invalid file format'), false);
  }
  cb(null, true);
};

const upload = multer({storage: storage, fileFilter: filter})
// var upload = multer({dest: DIR});
//////////////End
// Get our API routes
const api = require('./server/routes/api');

const app = express();

// // Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/download/:filen/', function(req,res,next){
    console.log(req.params.filen);
    res.setHeader('content-type', 'image/jpeg');
    // res.setHeader('Transfer-Encoding', 'chunked');
    res.download('./uploads/'+req.params.filen);
})
//Uploader 
app.post('/upload', upload.single('file'), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log('uploader -originalname-- ', req.file.originalname); 
  console.log('uploader -mimetype-- ', req.file.mimetype); 
  console.log('uploader -path-- ', req.file.path); 
  console.log('uploader -fieldname-- ', req.file.fieldname); 
  console.log('uploader -size-- ', req.file.size); 

  var galleryItem = new GalleryItem({
    fileName:       req.file.originalname,
    filePath:       req.file.path,
    isDeleted:      false,
    size:           req.file.size,
    mimeType:       req.file.mimetype
  });


  galleryItem.save(function(err, result){
    if(err){
        return res.status(500).json({
            title : 'An error occurred',
            error: err
        });
        
    }
    console.log('Save successful')
    });
  res.end('success');
  next()
})

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3030';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));