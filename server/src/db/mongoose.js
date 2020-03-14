const mongoose = require('mongoose');

const databasestring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb:127.0.0.1/teacher-course-app';
mongoose.connect(databasestring,{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});