const Student = require('../models/studentModel');
const Course = require('../models/courseModel');
const express = require('express');
const auth = require('../middleware/auth');
const authTeacher = require('../middleware/authTeacher');
const moment = require('moment');
const router = new express.Router();

router.post('/students/add',async(req,res) => {
	const teacher = JSON.parse(req.body.teacher);
	try {
		for(let i = 0; i < req.body.studentList.length; i++) {
			const student = await new Student({
				...req.body.studentList[i],
				teacher: teacher._id,
				course: req.body.course,
				presences: [
					{
						presence: false,
						date: new Date()
					}
				]
			});
			try {
				await student.save();
			} catch(err) {
				console.log(err);
			}
		}
		res.status(201)
		   .send();
	} catch(e) {
		res.status(400)
		   .send(e);
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

router.get('/students/getAll',authTeacher,async(req,res) => {
	try {
		//looking for students
		const student = await Student.find({teacher: req.teacher._id})
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
	const updateStudents = req.body.weights.map(student => student);
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

		});
		res.status(200)
		   .send();

	} catch(e) {
		res.status(404)
		   .send();
	}
});

router.patch('/students/',async(req,res) => {
	const updateArray = req.body.updateUsers.map(student => student);
	const absents = req.body.absents.map(student => student);
	const date = new Date();
	//array of users which are not present on classes
	absents.map(async absentUser => {
		const student = await Student.find({email: absentUser.studentEmail});
		const checkDate = moment(absentUser.nextClasses)
			.isSame(date,'day');
		//Check if today are first classes so startingDate = nextClasses, then update today's presence, else push new presence  
		const checkClassDate = moment(absentUser.startingDate)
			.isSame(absentUser.nextClasses);
		if(absentUser.presence === false && checkDate === true) {
			if(checkClassDate === true) {
				await student[0].update({
					$set: {
						presences: [
							{
								presence: false,
								date: absentUser.nextClasses
							}
						]
					}
				})
			} else {
				await student[0].update({
					$push: {
						presences: [
							{
								presence: false,
								date: absentUser.nextClasses
							}
						]
					}
				});
			}
		}
	});
	//array of users present during classes
	updateArray.map(async user => {
		const student = await Student.find({email: user.studentEmail});
		const checkDate = moment(user.nextClasses)
			.isSame(date,'day');
		//Check if today are first classes so startingDate = nextClasses, then update today's presence, else push new presence
		const checkClassDate = moment(user.startingDate)
			.isSame(user.nextClasses);
		if(user.presence === true && checkDate === true) {
			if(checkClassDate === true) {
				await student[0].update({
					$set: {
						presences: [
							{
								presence: true,
								date: user.nextClasses
							}
						]
					}
				})
			} else {
				await student[0].update({
					$push: {
						presences: [
							{
								presence: true,
								date: user.nextClasses
							}
						]
					}
				});
			}
		}
	});
	res.status(200)
	   .send();
});

router.patch('/students/updateGrade',async(req,res) => {
		const studentId = req.body.updateGradeArray[0].studentId;
		const gradeId = req.body.updateGradeArray[0].gradeId;
		const newGrade = req.body.updateGradeArray[0].newGrade;
		try {
			const student = await Student.updateOne(
				// Find a document with _id matching the studentId
				{"_id": studentId},
				// Update the student grade
				{$set: {"grades.$[selectedGrade].grade": newGrade}},
				{arrayFilters: [{"selectedGrade._id": gradeId}]},
			)

		} catch(e) {
			console.log(e);
		}
	}
);

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