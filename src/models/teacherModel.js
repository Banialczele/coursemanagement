const mongoose = require('mongoose');
const validator = require('validator');

const teacherModel = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	last: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error('Provided email is invalid');
			}
		},
		unique: true,
		type: String,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 7,
		trim: true,
		lowercase: true,
		unique: true,
		validate(value) {
			if(value.includes('password')) {
				throw new Error('Password cannot contain word password');
			}
		}
	}
});

const Teacher = mongoose.model('Teacher', teacherModel);

module.exports = Teacher;