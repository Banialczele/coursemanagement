const mongoose = require('mongoose');

mongoose.connect('process.env.MONGODB_URI/teacher-course-app',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});