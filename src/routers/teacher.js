const Teacher = require('../models/teacherModel');
const express = require('express');
const router = new express.Router();

router.post('/teachers/add',async(req,res) => {
	const teacher = new Teacher(req.body);
	try {
		await teacher.save();
		res.status(201)
		   .send(teacher);
	} catch(error) {
		res.status(500)
		   .send(error);
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
		res.status(200).send(teacher);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.delete('/teachers/:id',async(req,res) => {
	try {
		const teacher = await Teacher.findByIdAndDelete(req.params.id);
		res.status(200).send();
	} catch(error) {
		res.status(404)
		   .send(error);
	}
});

module.exports = router;