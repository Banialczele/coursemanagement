import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import StudentInputs from './StudentInputs';
import "react-datepicker/dist/react-datepicker.css"
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
		axios.post('/course/add',{
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
		     	console.log(this.state.studentList);
			     this.state.studentList.map(student => {
				     return axios.post('/students/add',{
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
		console.log(e.target.className);
		console.log(e.target.name);
		console.log(e.target.value);
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
			<div className="addCourseContainer">
				<div className="addCourseForm">
					<form onSubmit={this.onFormSubmit} onChange={this.handleChange}>
						<div className="labelContainer">
							<label className="labelStyles">Nazwa kursu</label><br/>
							<input type="text" onChange={this.onNameChange}/><br/>
						</div>
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
							<label className="labelStyles">Lista studentów </label>
							<div className="studentListComponent">
								<StudentInputs studentList={this.state.studentList}/>
							</div>
						</div>
						<div className="elo">
							<button type="button" onClick={this.addStudent} className="addStudentButton">Dodaj Studenta</button>
							<input type="submit" value="Wyślij" className="addStudentButton"/>
						</div>
					</form>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.isLogged === true) {
			return this.addingCourseForm();
		} else if(this.state.isLogged === false){
			return (
				<div style={{color: 'red'}}>Please login to continue!</div>
			);
		}
	}
}

export default AddCourse;
