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
		validate(value) {
			if(value.includes('password')) {
				throw new Error('Password cannot contain word password');
			}
		}
	},
	tokens: [{
			token: {
				type: String,
				required: true
			}
		}
	],
	// grades: {
	// 	type: Number
	// },
	// presence: {
	// 	type: Boolean,
	// 	required: true
	// }
});

studentSchema.methods.generateAuthToken = async function() {
	const authToken = jwt.sign({_id: this._id.toString()},'superkeytoken',{expiresIn: '2 hours'});
	this.tokens = this.tokens.concat({token: authToken});
	await this.save();
	return authToken;
};

studentSchema.statics.findByCredentials = async(email,password) => {
	//now we are looking for user by it's email, then we compare found user with provided password
	const student = await Student.findOne({email});

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
		this.password = await bcrypt.hash(this.password,8);
	}
	next();
});

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;