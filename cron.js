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
		for(const course of courses) {
			await course.update({
					$set: {
						nextClasses: addDays(course.nextClasses,7),
					}
				}, { multi: true}
			);
		}
	} catch (e){
		throw new Error(e);
	}
};
updateDate().then(r=> process.exit());
