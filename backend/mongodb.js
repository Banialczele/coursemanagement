const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'teacher-course-app';

MongoClient.connect(connectionUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (error, client) => {
	if(error){
		return console.log('Unable to connect with db');
	}
	const db = client.db(databaseName);
});