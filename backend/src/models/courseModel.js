const mongoose = require('mongoose');
const moment = require('moment');
const Teacher = require('./teacherModel');

const courseSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	// owner: {
	//
	// 		name: String,
	// 		email: String 
	// },
	startingDate: {
		type: Date
	},
	nextClasses: {
		type: Date
	},
	students: [{
		type: mongoose.Schema.Types.Object,
		required: true
	}]

});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;