const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');

const authTeacher = async(req,res,next) => {
	try {
		const token = req.header('Authorization')
		                 .replace('Bearer ','');
		const decoded = jwt.verify(token,'supertoken');
		const teacher = await Teacher.findOne({_id: decoded._id,'tokens.token': token});

		if(!teacher) {
			throw new Error();
		}
		req.token = token;
		req.teacher = teacher;
		next();

	} catch(error) {
		res.status(401)
		   .send({error: 'Please authenticate'});
	}

};

module.exports = authTeacher;