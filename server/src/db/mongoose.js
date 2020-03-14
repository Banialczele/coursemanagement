const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@coursemanagement-vndhb.mongodb.net/test?retryWrites=true&w=majority',{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
	useCreateIndex: true
});