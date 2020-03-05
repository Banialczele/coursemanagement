const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Course = require('./courseModel');

const teacherSchema = new mongoose.Schema({
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
		validate(value) {
			if(value.includes('password')) {
				throw new Error('Password cannot contain word password');
			}
		}
	},
	course: {
		type: mongoose.Schema.Types.Object,
		ref: 'Course'
	},
	tokens: [
		{
			token: {
				type: String,
			}
		}
	]
});

teacherSchema.methods.toJSON = function() {
	const teacherObject = this.toObject();
	delete teacherObject.password;
	return teacherObject;
};

teacherSchema.methods.generateAuthToken = async function() {
	const authToken = jwt.sign({
		_id: this._id.toString(),
		exp: Math.floor(Date.now() / 1000)+(60 * 60)
	},'supertoken');
	this.tokens = this.tokens.concat({token: authToken});
	await this.save();
	return authToken;
};

teacherSchema.statics.findByCredentials = async(email,password) => {
	//now we are looking for user by it's email, then we compare found user with provided password
	const teacher = await Teacher.findOne({email});
	if(!teacher) {
		throw new Error('Teacher not found');
	}
	const isMatch = await bcrypt.compare(password,teacher.password);
	if(!isMatch) {
		throw new Error('Unable to login');
	}

	return teacher;
};

teacherSchema.pre('save',async function(next) {
	if(this.isModified('password')) {
		this.password = await bcrypt.hash(this.password,8);
	}
	next();
});


// Deleting all courses when teacher is removed
// teacherSchema.pre('remove', async function(next) {
// 	const del = Course.findOneAndDelete({ owner: this._id});
// 	next();
// });


const Teacher = mongoose.model('Teacher',teacherSchema);

module.exports = Teacher;