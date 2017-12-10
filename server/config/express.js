const express = require('express');
const path = require('path');
const http = require('http');
const multer = require('multer');
const bodyParser = require('body-parser');
const GalleryItem = require('../models/galleryItem');
const api = require('../routes/api');
const UPLOAD_DIR ='./uploads/';

module.exports = function(app,config) {
    
	// Parsers for POST data
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	// Point static path to dist
	app.use(express.static(path.join(__dirname, '../../dist')));
	app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

	app.get('/download/:filename/', function(req,res,next){
		console.log(req.params.filen);
		res.setHeader('content-type', 'image/jpeg');
		res.download(UPLOAD_DIR+req.params.filename);
	})
	
	//Uploader 
	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, UPLOAD_DIR)
		},
		filename: function (req, file, cb) {
			cb(null, file.originalname)
		}
	})
		
	const filter =function(req, file, cb){
		const extension = file.mimetype.split('/')[0];
		if(extension !== 'image'){
				return cb(new Error('Invalid file format'), false);
		}
		cb(null, true);
	};
		
	const upload = multer({storage: storage, fileFilter: filter});
	app.post('/upload', upload.single('file'), function (req, res, next) {
	
		console.log('Uploaded file ', req.file.path); 
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
		next();
	})

	// Set our api routes
	app.use('/api', api);

	// Catch all other routes and return the index file
	app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../../dist/index.html'));
	});

	/**
	 * Get port from environment and store in Express.
	 */
	const port = config.port;
	app.set('port', port);

	/**
	 * Create HTTP server.
	 */
	const server = http.createServer(app);

	/**
	 * Listen on provided port, on all network interfaces.
	 */
	server.listen(port, () => console.log(`API running on localhost:${port}`));
}