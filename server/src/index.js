const express = require('express');
require('./db/mongoose.js');
const cors = require('cors');

const studentRouter = require('./routers/student');
const courseRouter = require('./routers/course');           
const teacherRouter = require('./routers/teacher');

const app = express();
app.use(cors());
const port = 3000;


app.use(express.json());
app.use(studentRouter);
app.use(teacherRouter);
app.use(courseRouter);

app.listen(port,() => {
	console.log(`Server is running on port ${port}`);
});