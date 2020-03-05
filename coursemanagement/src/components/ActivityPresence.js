import React from 'react';
import axios from 'axios';
import '../styles/ActivityPresence.css';

let updateUsers = [];
let absents = [];

class ActivityPresence extends React.Component {
	state = {
		studentData: this.props.studentData,
		isChecked: false,
		studentEmail: String,
		presence: false,
		date: this.props.courseDate,
		startingDate: this.props.startingClasses
	};

	retrieveStudentData = (students => students.map((student,i) => {
		return (
			<div className="student-Detail" key={student.email}>
				<div className="studentName">{student.name}</div>
				<div className="studentLast">{student.last}</div>
				<div className="studentPresence">
					<label htmlFor="obecny">Obecny
						<input type="checkbox" value="obecny" name="obecny" onChange={(e) => this.handleChange(student,e)}/>
					</label>
					<label htmlFor="nieobecny">Nieobecny
						<input type="checkbox" value="nieobecny" name="nieobecny" onChange={(e) => this.handleAbsentChange(student,e)}/>
					</label>
				</div>
			</div>
		)
	}));

	displayData = (() => {
		return (
			<div className="studentContainer">
				<div className="student-Data">
					<div className="data-name"><b>IMIE</b></div>
					<div className="data-last"><b>NAZWISKO</b></div>
					<div className="data-presence"><b>OBECNOŚĆ</b></div>
				</div>
				<form onSubmit={this.handleSubmit}>
					{this.retrieveStudentData(this.props.studentData)}
					<input type="submit" value="Zapisz"/>
				</form>
			</div>
		);
	});

	handleAbsentChange = (student,e) => {
		if(e.target.checked === true) {
			this.setState({studentEmail: student.email,presence: false});
			absents.push({studentEmail: student.email,presence: false,nextClasses: this.state.date, startingDate: this.state.startingDate});
		} else if(e.target.checked === false) {
			for(let i = 0; i < absents.length; i++) {
				if(absents[i].studentEmail === student.email) {
					absents.splice(absents[i],1);
				}
			}
		}
	};

	handleChange = (student,e) => {
		if(e.target.checked === true) {
			this.setState({studentEmail: student.email,presence: true});
			updateUsers.push({studentEmail: student.email,presence: true,nextClasses: this.state.date, startingDate: this.state.startingDate});
		} else if(e.target.checked === false) {
			for(let i = 0; i < updateUsers.length; i++) {
				if(updateUsers[i].studentEmail === student.email) {
					updateUsers.splice(updateUsers[i],1);
				}
			}
		}
	};


	handleSubmit = (e) => {
		e.preventDefault();
		axios.patch('http://localhost:3001/students',{updateUsers, absents})
		     .then(res => alert('Successfully updated student data'))
		     .catch(err => console.log(err));
	};

	render() {
		return (
			<div className="ActivityPresence">
				{this.displayData()}
			</div>
		);
	}
}

export default ActivityPresence;