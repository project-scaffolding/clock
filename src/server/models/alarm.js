var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var alarmSchema = new Schema({
    hours: Number,
    minutes: Number,
    label: String,
    snooze: Boolean,
    active: Boolean,
    createdOn: {type: Date, default: Date.now}
});

// Build a model from the alarm schema
module.exports = mongoose.model('Alarm', alarmSchema);
