const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/teacher-course-app',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});