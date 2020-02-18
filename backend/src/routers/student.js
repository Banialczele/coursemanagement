const Student = require('../models/studentModel');
const express = require('express');
const auth = require('../middleware/auth');
const authTeacher = require('../middleware/authTeacher');
const moment = require('moment');
const router = new express.Router();

router.post('/students/add',async(req,res) => {
	const student = new Student({
		...req.body,
		presences: [
			{
				presence: false,
				date: new Date()
			}
		]
	});
	try {
		await student.save();
		res.status(201)
		   .send(student);
	} catch(error) {
		res.status(400)
		   .send(error);
	}
});

router.post('/students/login',async(req,res) => {
	try {
		const student = await Student.findByCredentials(req.body.email,req.body.password);
		const token = await student.generateAuthToken();
		res.status(200)
		   .send({
			   student,
			   token
		   });
	} catch(error) {
		res.status(400)
		   .send(error);
	}
});

router.post('/students/logout',auth,async(req,res) => {
	try {
		req.user.tokens = req.user.tokens.filter((token) => {
			return token.token !== req.token;
		});

		await req.user.save();
		res.status(200)
		   .send();
	} catch(e) {
		res.status(500)
		   .send();

	}
});

router.get('/students/getAll',async(req,res) => {
	try {
		const student = await Student.find({})
		                             .populate('course');
		res.status(200)
		   .send(student);
	} catch(error) {
		res.status(500)
		   .send(error);
	}
});

router.get('/students/:id',auth,async(req,res) => {
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
		   .send(error)
	}
});

router.patch('/students/addGrade',async(req,res) => {
	const updateStudents = req.body.grades.map(student => student);

	try {
		updateStudents.map(async user => {
			const student = await Student.find({email: user.owner});
			const getWeigth = (knowledge) => {
				return knowledge === 'ustna' ? 1 : knowledge === 'wejsciowka' ? 2 : knowledge === 'kolokwium' ? 3 : '';
			};
			if(student) {
				await student[0].update({
					                $push: {
						                grades: [
							                {
								                grade: user.ocena,
								                date: user.date
							                }
						                ],
						                weights: [
							                {
								                weight: getWeigth(user.waga),
								                name: user.waga,
								                date: user.date
							                }
						                ]
					                }
				                })
				                .catch(err => res.status(400)
				                                 .send(err))
			}
			res.status(200)
			   .send(user);
		});

	} catch(e) {
		res.status(404)
		   .send();
	}
});

router.patch('/students/',async(req,res) => {
	const updateArray = req.body.updateUsers.map(student => student);
	const date = new Date();
	updateArray.map(async user => {
		const student = await Student.find({email: user.studentEmail});
		const checkDate = moment(user.nextClasses)
			.isSame(date,'day');
		if(user.presence === true && student[0].presences.length === 1 && checkDate === true) {
			await student[0].updateOne({
				$set: {
					presences: [
						{
							presence: true,
							date: user.date
						}
					]
				}
			});
		} else if(user.presence === true && student[0].presences.length > 1 && checkDate === true) {
			await student[0].update({
				$push: {
					presences: [
						{
							presence: true,
							date: user.date
						}
					]
				}
			},err => console.log(err));
		}
	})
});

router.delete('/students/:id',auth,async(req,res) => {
	try {
		const student = await Student.findByIdAndDelete(req.params.id);
		res.status(200)
		   .send({student,message: 'User has been deleted!'});
	} catch(error) {
		res.status(404)
		   .send({message: 'User not found'});
	}
});

module.exports = router;