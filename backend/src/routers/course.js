const Course = require('../models/courseModel');
const express = require('express');
const router = new express.Router();
const authTeacher = require('../middleware/authTeacher');
const cron = require('node-cron');
const moment = require('moment');

//adding course
router.post('/course/add',async(req,res) => {
	const course = new Course({
		...req.body,
		startingDate: req.body.startingDate,
		nextClasses: req.body.startingDate,
		// owner: {
		// 	name: req.teacher.name,
		// 	email: req.teacher.email
		// }
	});
	try {
		course.save();
		res.status(201)
		   .send(course);
	} catch(e) {
		res.status(500)
		   .send();
	}
});

//getting all courses add authTeacher
router.get('/course/get',async(req,res) => {
	try {
		const course = await Course.find({})
		                           .populate('_id');
		res.status(200)
		   .send(course);
	} catch(e) {
		res.status(400)
		   .send();
	}
});

//get course by id
router.get('/course/:id',async(req,res) => {
	try {
		const course = await Course.findById(req.params.id);
		res.status(200)
		   .send(course);
	} catch(e) {
		res.status(400)
		   .send();
	}
});

//delete course
router.delete('/course/delete/:id',async(req,res) => {
	try {
		const course = await Course.findById(req.params.id);
		course.delete();
		res.status(200)
		   .send(course);
	} catch(e) {
		res.status(500)
		   .send();
	}
});


router.patch('/course/updateTime',async(req,res) => {
	try {
		const addDays = (date,days) => {
			const result = new Date(date);
			result.setDate(result.getDate()+days);
			return result;
		};

		cron.schedule("* * * * *",async function() {
			const courses = await Course.find({});
			courses.forEach(async(course) => {
				await course.update(
					{
						$set: {
							nextClasses: addDays(course.nextClasses,7)
						}
					}
				);
			});
		});
	} catch
		(e) {
		console.log(e);
	}
})
;

module.exports = router;