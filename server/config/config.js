var path = require('path');

var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/cybea',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://cybeagestion:EsPeLuzNanTe7@ds037581.mongolab.com:37581/cybea',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};