var port = process.env.PORT || 9000;
var environment = process.env.NODE_ENV || 'local';

var config = {
    port: port,
    environment: environment,
    mongodb: 'mongodb://admin:123456@ds041377.mongolab.com:41377/clock-dev'
};

module.exports = config;