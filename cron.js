const Course = require('./models/courseModel.js');
require('./db/mongoose');
const cron = require('node-cron');

const addDays = (date,days) => {
	const result = new Date(date);
	result.setDate(result.getDate()+days);
	return result;
};

const updateDate = async() => {
	const courses = await Course.find({});
	courses.forEach(async(course) => {
		await course.update(
			{
				$set: {
					nextClasses: addDays(course.nextClasses,7),
				}
			}
		);
	});
};

updateDate();
process.exit();
