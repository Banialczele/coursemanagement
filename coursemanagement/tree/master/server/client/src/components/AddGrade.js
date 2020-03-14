import React from 'react';
import axios from 'axios';

import '../styles/AddGrade.css';

let grades = [];
let weights = [];

class AddGrade extends React.Component {
	state = {
		course: this.props.course,
		date: this.props.courseDate,
		grade: '',
		weight: '',
		email: '',
		weightValue: '',
		status: ''
	};

	getStudentData = (course) => {
		return course.students.map(student => {
			return student;
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		for(let i = 0; i < weights.length; i++) {
			for(let k = 0; k < grades.length; k++) {
				if(weights[i].owner === grades[i].owner) {
					weights[i].ocena = grades[i].ocena;
				}
			}
		}
		axios.patch('http://localhost:5005/students/addGrade',{weights})
		     .then(res => alert('successfully updated student data'))
		     .catch(err => console.log(err));
		weights = [];
		grades = [];
	};

	handleWeightChange = (student,e) => {
		if(e.target.value) {
			this.setState({weight: e.target.value});
			weights.push({waga: e.target.value,owner: student.email,date: this.state.date});
		}
		console.log(weights);
	};

	handleGradeChange = (student,e) => {
		if(e.target.value) {
			this.setState({grade: e.target.value});
			grades.push({ocena: e.target.value,owner: student.email});
		}
		console.log(grades);
	};

	renderStudentList = () => {
		return (
			<div>
				<form onSubmit={this.handleFormSubmit} className="addGradeForm">
					{this.getStudentData(this.state.course)
					     .map((student,i) => {
						     return (
							     <div className="addGradeGridContainer">
								     <div className="addGradeGridHeader">
									     <div>Imie Nazwisko</div>
									     <div>Forma wiedzy</div>
									     <div>Ocena</div>
								     </div>
								     <div key={i} className="studentGridContainer">{student.name} {student.last}<br/>
									     <label htmlFor="weight" >
										     <select name="weight"
										             onChange={(e) => this.handleWeightChange(student,e)}
										     >
											     <option value=""></option>
											     <option value="ustna">Odpowiedź</option>
											     <option value="wejsciowka">Wejściówka</option>
											     <option value="kolokwium">Kolokwium</option>
										     </select>
									     </label>
									     <label htmlFor="grade">
										     <select name="grade" onChange={(e) => this.handleGradeChange(student,e)}>
											     <option value=""></option>
											     <option value="2">2</option>
											     <option value="3">3</option>
											     <option value="3.5">3.5</option>
											     <option value="4">4</option>
											     <option value="4.5">4.5</option>
											     <option value="5">5</option>
										     </select>
									     </label>
								     </div>
							     </div>
						     )
					     })}
					<input type="submit" value="Zapisz" className="addGradeButton"/>
				</form>
			</div>
		);
	};

	render() {
		return (
			<div className="addGradeContainer">
				{this.renderStudentList()}
			</div>
		);
	}
}

export default AddGrade;
