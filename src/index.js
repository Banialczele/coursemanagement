const express = require('express');
require('./db/mongoose.js');

const studentRouter = require('./routers/student');
const teacherRouter = require('./routers/teacher');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);
app.use(teacherRouter);

app.listen(port, () =>{
	console.log(`Server is running on port ${port}`);
});