const Course = require('./models/courseModel.js');
require('./db/mongoose');

const addDays = (date,days) => {
	const result = new Date(date);
	result.setDate(result.getDate()+days);
	return result;
};

const updateDate = async() => {
	try {
		const courses = await Course.find({});
		courses.forEach(async(course) => {
			await course.update({
					$set: {
						nextClasses: addDays(course.nextClasses,7),
					}
				}
			);
		});
	} catch (e){
		throw new Error(e);
	}
};
updateDate();
