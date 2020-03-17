const mongoose = require('mongoose');
// when run on herokku server use that link instead mongodb+srv://admin:admin@coursemanagement-vndhb.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost:27017/teacher-course-app',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});