const express = require('express');
require('./db/mongoose.js');
const cors = require('cors');
const cron = require('node-cron');

const studentRouter = require('./routers/student');
const courseRouter = require('./routers/course');           
const teacherRouter = require('./routers/teacher');
cron.schedule("00 21 13 * * *",function() {
	console.log('Siemanko z tej strony cron co minute');
});

const app = express();
app.use(cors());
const port = process.env.PORT || 3001;


app.use(express.json());
app.use(studentRouter);
app.use(teacherRouter);
app.use(courseRouter);

app.listen(port,() => {
	console.log(`Server is running on port ${port}`);
});