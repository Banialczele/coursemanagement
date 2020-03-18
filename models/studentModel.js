const Course = require('./courseModel');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
		validate(value) {
			if(!validator.isEmail(value)) {
				throw new Error('Provided email is invalid');
			}
		}
	},
	presences: [
		{
			presence: {
				type: Boolean,
				required: true
			},
			date: {
				type: Date
			}
		}
	],
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Course'
	},
	grades: [
		{
			grade: {
				type: Number
			},
			date: Date
		}
	],
	weights: [
		{
			weight: {
				type: Number
			},
			name: String,
			date: Date
		}
	],
	teacher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Teacher'
	}
});

studentSchema.methods.toJSON = function() {
	const userObject = this.toObject();
	delete userObject.password;
	return userObject;
};

studentSchema.methods.generateAuthToken = async function() {
	const authToken = jwt.sign({
		_id: this._id.toString()
	},'superkeytoken');
	this.tokens = this.tokens.concat({token: authToken});
	await this.save();
	return authToken;
};

studentSchema.statics.findByCredentials = async(email,password) => {
	//now we are looking for user by it's email, then we compare found user with provided password
	const student = await Student.findOne({email});
	console.log(student);
	if(!student) {
		throw new Error('Student not found');
	}
	const isMatch = await bcrypt.compare(password,student.password);
	if(!isMatch) {
		throw new Error('Unable to login');
	}

	return student;
};

//hash the plain text password before saving
studentSchema.pre('save',async function(next) {
	if(this.isModified('password')) {
		this.password = await bcrypt.hash(this.password,10);
	}
	next();
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;