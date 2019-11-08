const Student = require('../models/studentModel');
const express = require('express');
const router = new express.Router();

router.post('/students/add',async(req,res) => {
	const student = new Student(req.body);
	try {
		await student.save();
		res.status(201)
		   .send(student);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.get('/students/obtainAll',async(req,res) => {
	try {
		const student = await Student.find({});
		res.status(200)
		   .send(student);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.get('/students/:id',async(req,res) => {
	const _id = req.params.id;
	try {
		const student = await Student.findById(_id);
		if(!student) {
			res.status(404)
			   .send();
		}
		res.send(student);
	} catch(error) {
		res.status(404)
		   .send()
	}
});

router.patch('/students/:id',async(req,res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ['email','password'];
	const isValid = updates.every(update => allowedUpdates.includes(update));
	if(!isValid) {
		return res.status(400)
		   .send({message: 'Unable to perform operation with given parameters'});
	}
	try {
		const student = await Student.findById(req.params.id);

		updates.forEach( update => student[update] = req.body[update]);
		await student.save();

		if(!student){
			res.status(400).send({message: 'User not found'});
		}
		res.status(200)
		   .send(student);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.delete('/students/:id',async(req,res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.id);
		res.status(200).send({student, message: 'User has been deleted!'});
	} catch(error){
		res.status(404).send({message: 'User not found'});
	}
});

module.exports = router;