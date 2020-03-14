const mongoose = require('mongoose');

mongoose.connect('mongodb://managingcourses.herokuapp.com:27017/teacher-course-app',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});