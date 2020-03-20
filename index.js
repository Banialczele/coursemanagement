const express = require('express');
require('./db/mongoose.js');
const cors = require('cors');
const path = require('path');
const Course = require('./models/courseModel');
const studentRouter = require('./routers/student');
const courseRouter = require('./routers/course');
const teacherRouter = require('./routers/teacher');

const cron = require('node-cron');

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;

const addDays = (date,days) => {
	const result = new Date(date);
	result.setDate(result.getDate()+days);
	return result;
};

app.use(express.json());
app.use(studentRouter);
app.use(teacherRouter);
app.use(courseRouter);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));

	app.get('*',(req,res) => {
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	});
	cron.schedule("10 20 * * 5",async function() {
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
	});
}

app.listen(port,() => {
	console.log(`Successfully run server. it is running on port ${port}`);
});