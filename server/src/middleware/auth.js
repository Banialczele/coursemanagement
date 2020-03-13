const jwt = require('jsonwebtoken');
const Student = require('../models/studentModel');

const auth = async (req,res,next) => {
	try {
		const token = req.header('Authorization')
		                 .replace('Bearer ','');
		const decoded = jwt.verify(token,'superkeytoken');
		const user = await Student.findOne({ _id: decoded._id, 'tokens.token': token});

		console.log(`${token}`);
		if(!user){
			throw new Error();
		}
		req.token = token;
		req.user = user;
		next();
		
	} catch (error) {
		res.status(401).send({error: 'Please authenticate'});
	}

};

module.exports = auth;