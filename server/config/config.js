var path = require("path");
var rootPath = path.normalize(__dirname+'/../../');
module.exports = {
    development : {
        rootPath: rootPath,
        dburl:'mongodb://admin:admin@ds161505.mlab.com:61505/rgrjs-data',
        port:process.env.PORT || 3030,
        host:process.env.IP || 'localhost'
    },
    production : {
        rootPath: rootPath,
        dburl:'mongodb://admin:admin@ds161505.mlab.com:61505/rgrjs-data',
        port:process.env.PORT || 80,
        host:process.env.IP
    }
}