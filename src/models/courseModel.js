const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const courseModel = Schema({
	name: {
		type: String,
		trim: true,
		unique: true,
		required: true
	}
});

module.exports = courseModel;