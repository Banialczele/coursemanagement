const cron = require('node-cron');
const Course = require('./models/courseModel');

const addDays = (date,days) => {
	const result = new Date(date);
	result.setDate(result.getDate()+days);
	return result;
};

const updateDate = cron.schedule("* * * * *",async() => {
	console.log('running a crone on Heroku');
	const courses = await Course.find({});
	console.log(courses);
	return (await courses.forEach(async(course) => {
		await course.update(
			{
				$set: {
					nextClasses: addDays(course.nextClasses,7),
				}
			}
		);
	}));
});

updateDate;
process.exit();
