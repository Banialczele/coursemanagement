const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/teacher-course-app',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});