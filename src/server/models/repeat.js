var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var repeatSchema = new Schema({
    name: {type: String},
    weekDay: {type: Number},
    createdOn: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Repeat', repeatSchema);
