var express = require("express");

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
console.log('Starting Gallery app in env = '+env)

var app = express();

var config = require('./server/config/config')[env];
require('./server/config/mongoose')(config);
require('./server/config/express')(app,config);

