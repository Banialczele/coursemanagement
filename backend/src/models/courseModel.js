const mongoose = require('mongoose');
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
	students: [
		{
			type: mongoose.Schema.Types.Object,
			ref: 'Student'
		}
	]

});

const Course = mongoose.model('Course',courseSchema);

module.exports = Course;