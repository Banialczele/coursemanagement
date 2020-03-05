import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import StudentInputs from './StudentInputs';
import '../styles/AddCourse.css';

class AddCourse extends React.Component {
	state = {
		courseName: '',
		startDate: new Date(),
		studentList: [
			{
				name: '',
				last: '',
				email: '',
			}
		],
		error: {
			occurs: false,
			message: ''
		},
		isLogged: false,
		loggedTeacher: ''
	};

	componentDidMount() {
		if(localStorage.length > 1) {
			const teacher = localStorage.getItem('loggedTeacher');
			this.setState({isLogged: true,loggedTeacher: teacher});
		}
	};

	onNameChange = (e) => {
		e.preventDefault();
		this.setState({courseName: e.target.value});
	};

	onFormSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3000/course/add',{
			     name: this.state.courseName,
			     startingDate: this.state.startDate,
			     students: this.state.studentList
		     },{
			     headers: {
				     "Content-Type": "application/json",
				     'Authorization': `Bearer ${localStorage.getItem("mysecrettoken")}`
			     }
		     })
		     .then(res => {
			     this.state.studentList.map(student => {
				     return axios.post('http://localhost:3000/students/add',{
					                 name: student.name,
					                 last: student.last,
					                 email: student.email,
					                 course: res.data._id,
					                 teacher: JSON.parse(this.state.loggedTeacher)._id
				                 },{
					                 headers: {
						                 "Content-Type": "application/json"
					                 }
				                 })
				                 .then(res => alert('successfully added course and students!'))
				                 .catch(err => {
					                 alert(`${student.email} is already taken, please use another one.`);
				                 });
			     })
		     })
		     .catch(err => console.log(err));
	};

	//adding student, spreading all courses already added to array and adding new object after last student
	addStudent = () => {
		this.setState(prevState => ({
			studentList: [...prevState.studentList,{name: '',last: '',email: ''}]
		}));
	};

	//checking if user passed necessary data
	handleChange = e => {
		//checking if passing values with names of "name" and "last" and "email"
		if(["name","last","email"].includes(e.target.className)) {
			//making copy of our studentList array
			let students = [...this.state.studentList];
			//looking for pairs like courses[0][name] = 'whatever was passed' courses[0][last] = 'whatever was passed'
			students[e.target.dataset.id][e.target.className] = e.target.value;
			//setting student name and last as a object to a state.
			this.setState({students});
		} else {
			this.setState({[e.target.name]: e.target.value})
		}
	};

	addingCourseForm = () => {
		return (
			<div className="addCourse container">
				<div className="addCourseFormContainer">
					<form onSubmit={this.onFormSubmit} onChange={this.handleChange}>
						<label className="labelStyles">Nazwa kursu</label><br/>
						<input type="text" onChange={this.onNameChange}/><br/>
						<label className="labelStyles">Data</label> <br/>
						<DatePicker
							className="datePickerStyle"
							selected={this.state.startDate}
							onChange={date => this.setState({startDate: date})}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="dd-MM-yyyy h:mm aa"
						/>
						<br/>
						<div className="studentList">
							<label className="studentListColor">Lista studentów </label>
						</div>
						<br/>
						<div className="studentListColor">
							<StudentInputs studentList={this.state.studentList}/>
						</div>
						<div className="buttons">
							<button type="button" onClick={this.addStudent}>Dodaj Studenta</button>
							<input type="submit" value="Wyślij"/>
						</div>
					</form>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.isLogged === true) {
			console.log(JSON.parse(this.state.loggedTeacher));
			return this.addingCourseForm();
		} else {
			return (
				<div style={{color: 'red'}}>Please login to continue!</div>
			);
		}
	}
}

export default AddCourse;