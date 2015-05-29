var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alarmSchema = new Schema({
    hours: {type: Number, default: 0},
    minutes: {type: Number, default: 0},
    label: {type: String, default: 'Alarm'},
    snooze: {type: Boolean, default: true},
    active: {type: Boolean, default: true},
    createdOn: {type: Date, default: Date.now}
});

// Build a model from the alarm schema
module.exports = mongoose.model('Alarm', alarmSchema);
