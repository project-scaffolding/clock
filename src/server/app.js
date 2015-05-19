var app = require('./config/express');
var config = require('./config/config');
require('./config/mongoose')();
require('./config/routes')(app);

app.listen(config.port, function() {
    console.log('Express server listening on port ' + config.port);
    console.log('env = ' + config.environment +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
