const jwt = require('jsonwebtoken');
const Teacher = require('../models/teacherModel');

const authTeacher = async(req,res,next) => {
	try {
		const token = req.headers.authorization.replace('Bearer ','');
		const decoded = jwt.verify(token,'supertoken');
		const teacher = await Teacher.findOne({_id: decoded._id,'tokens.token': token});
		if(!teacher || !token) {
			throw new Error();
		}
		req.token = token;
		req.teacher = teacher;
		next();

	} catch(error) {
		res.status(401)
		   .send({error: 'Your session has expired'});
	}

};

module.exports = authTeacher;