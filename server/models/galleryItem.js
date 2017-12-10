var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    fileName:       {type: String, required: true, default:''},
    filePath:       {type: String,  required: true, default:''},
    isDeleted:      {type: Boolean,  required: true, default:false},
    size:           {type: String,  required: true, default:''},
    mimeType:       {type: String, required:true, default:''}
});

module.exports = mongoose.model('GalleryItem',schema); 