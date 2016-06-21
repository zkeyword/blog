let mongoose = require('mongoose');
let Schema   = mongoose.Schema;

var postSchema = new Schema({
	name: Date
})

module.exports = postSchema;