import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import StudentInputs from './StudentInputs';

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
		]
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
					                 course: res.data._id       
				                 },{
					                 headers: {
						                 "Content-Type": "application/json"
					                 }
				                 })
				                 .then(res => console.log(res))
				                 .catch(err => console.log(err));
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

	render() {
		return (
			<div>
				<form onSubmit={this.onFormSubmit} onChange={this.handleChange}>
					<label>Nazwa kursu</label><br/>
					<input type="text" onChange={this.onNameChange}/><br/><br/>
					<DatePicker
						selected={this.state.startDate}
						onChange={date => this.setState({startDate: date})}
						showTimeSelect
						timeFormat="HH:mm"
						timeIntervals={15}
						timeCaption="time"
						dateFormat="dd-MM-yyyy h:mm aa"
					/><br/>
					<label>Lista studentów </label>
					<br/><br/>
					<StudentInputs studentList={this.state.studentList}/>
					<button type="button" onClick={this.addStudent}>Dodaj Studenta</button>
					<input type="submit" value="Wyślij"/>
				</form>
			</div>
		);
	}
}

export default AddCourse;