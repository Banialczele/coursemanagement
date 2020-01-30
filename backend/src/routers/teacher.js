const Teacher = require('../models/teacherModel');
const express = require('express');
const router = new express.Router();
const authTeacher = require('../middleware/authTeacher');

router.post('/teachers/add',async(req,res) => {
	const teacher = new Teacher(req.body);
	try {
		await teacher.save();
		res.status(201)
		   .send(teacher);
	} catch(error) {
		console.log(error);
	}
});

//login teacher
router.post('/teachers/login',async(req,res) => {
	try {
		const teacher = await Teacher.findByCredentials(req.body.email,req.body.password);
		const token = await teacher.generateAuthToken();
		res.status(200)
		   .send({
			   teacher,
			   token
		   });
	} catch(e) {
		console.log(e);
	}
});
//logout teacher
router.post('/teachers/logout',async(req,res) => {
	try {
		req.teacher.tokens = req.teacher.tokens.filter((token) => {
			return token.token !== req.token;
		});

		await req.teacher.save();
		res.status(200)
		   .send();
	} catch(e) {
		console.log(e);
	}


});

router.get('/teachers/obtainAll',async(req,res) => {
	try {
		const teachers = await Teacher.find({});
		if(!teachers) {
			res.status(404)
			   .send({message: 'None teacher found'});
		}
		res.status(200)
		   .send(teachers);
	} catch(error) {
		res.status()
		   .send();
	}
});

router.get('/teachers/:id',async(req,res) => {
	try {
		const teacher = await Teacher.findById(req.params.id);
		if(!teacher) {
			res.status(404)
			   .send({message: 'None teacher found'});
		}
		res.status(200)
		   .send(teacher);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.patch('/teachers/:id',async(req,res) => {
	const updates = ['email','password'];
	const allowedUpdates = Object.keys(req.body);
	const isValid = updates.every(update => allowedUpdates.includes(update));
	if(!isValid) {
		res.status(400)
		   .send({message: 'Unable to update'});
	}
	try {
		const teacher = await Teacher.findById(req.params.id);
		updates.forEach(update => teacher[update] = req.body[update]);
		await teacher.save();
		res.status(200)
		   .send(teacher);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.delete('/teachers/:id',async(req,res) => {
	try {
		const teacher = await Teacher.findByIdAndDelete(req.params.id);
		res.status(200)
		   .send();
	} catch(error) {
		res.status(404)
		   .send(error);
	}
});

module.exports = router;