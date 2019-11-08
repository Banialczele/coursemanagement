const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String,
		trim: true
	},
	last: {
		required: true,
		type: String,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error('Provided email is invalid');
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		lowercase: true,
		validate(value) {
			if(value.includes('password')) {
				throw new Error('Password cannot contain word password');
			}
		}
	},
	// grades: {
	// 	type: Number
	// },
	// presence: {
	// 	type: Boolean,
	// 	required: true
	// }
});

const Student =  mongoose.model('Student', studentSchema);
module.exports = Student;