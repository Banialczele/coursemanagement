import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import StudentInputs from './StudentInputs';
import "react-datepicker/dist/react-datepicker.css"
import '../styles/AddCourse.css';
import Entry from "./Entry";

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
			     if(res.status === 201) {
				     axios.post('http://localhost:3001/students/add',{
					          studentList: this.state.studentList,
					          course: res.data._id,
					          teacher: this.state.loggedTeacher
				          },{
					          headers: {
						          "Content-Type": "application/json",
						          'Authorization': `Bearer ${localStorage.getItem("mysecrettoken")}`
					          }
				          })
				          .then(res => {
					          alert('Successfully added course and student.');
				          })
				          .catch(err => {
					          alert('Unable to add students and course.');
				          })
			     } else {
				     alert('Unable to add students and course.');
			     }
		     })
		     .catch(err => alert('Unable to add course'))
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

	addingCourseForm = (state) => {
		if(localStorage.length > 1) {
			return (
				<div className="addCourseContainer">
					<div className="addCourseFormContainer">
						<form onSubmit={this.onFormSubmit} onChange={this.handleChange} className="addCourseForm">
							<div className="displayData">
								<label className="labelStyles">Nazwa kursu</label><br/>
								<input className="AddCourseInputStyle" type="text" onChange={this.onNameChange} minLength="1" required/><br/>
								<label className="DataLabelStyles  labelStyles">Data</label> <br/>
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

								<label className="labelStyles">Lista studentów </label>
								<div className="studentListComponent">
									<StudentInputs studentList={this.state.studentList}/>
								</div>
								<div className="addCourseButtons">
									<button type="button" onClick={this.addStudent} className="addStudentButton">Dodaj Studenta</button>
									<input type="submit" value="Wyślij" className="addStudentButton"/>
								</div>
							</div>
						</form>
					</div>
				</div>
			);
		} else if(localStorage.length === 0) {
			alert('Please login to continue');
			return (
				<Redirect to={'/'}/>
			);
		}
	};

	render() {
		return this.addingCourseForm(this.state.isLogged);
	}
}

export default AddCourse;
