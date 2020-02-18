import React from 'react';
import axios from 'axios';
import '../styles/ActivityPresence.css';

let updateUsers = [];

class ActivityPresence extends React.Component {
	state = {
		studentData: this.props.studentData,
		isChecked: false,
		studentEmail: String,
		presence: false
	};

	retrieveStudentData = (students => students.map(student => {
		return (
			<div className="student-Detail" key={student.email}>
				<div className="studentName">{student.name}</div>
				<div className="studentLast">{student.last}</div>
				<div className="studentPresence">
					<label htmlFor="obecny">Obecny
						<input type="checkbox" name="obecny" id={student.email} onChange={this.handleCheckboxChange}/>
					</label>
					<label htmlFor="nieobecny">Nieobecny
						<input type="checkbox" name="nieobecny" id={student.email} onChange={this.handleCheckboxChange}/>
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

	handleCheckboxChange = (e) => {
		if(e.target && e.target.name === 'obecny' && e.target.checked) {
			this.setState({isChecked: true,studentEmail: e.target.id,presence: true});
			updateUsers.push({studentEmail: e.target.id,presence: this.state.presence,"date": this.props.courseDate});
			console.log(updateUsers);
		} else if(e.target && e.target.name === 'nieobecny' && e.target.checked) {
			this.setState({studentEmail: e.target.id,presence: false});
			updateUsers.push({studentEmail: e.target.id,presence: this.state.presence,"date": this.props.courseDate});
			updateUsers.map( () => {
				const index = updateUsers.map(student => student.studentEmail).indexOf(e.target.id);
				updateUsers.splice(index,1);
				return updateUsers;
			});
			console.log(updateUsers);
		}
	};

	handleSubmit = (e) => {
		e.preventDefault();
		axios.patch('http://localhost:3001/students',{updateUsers})
		     .then(res => console.log(res))
		     .catch(err => console.log(err));
	};

	render() {
		this.handleCheckboxChange(this.state.studentData);
		return (
			<div className="ActivityPresence">
				{this.displayData()}
			</div>
		);
	}
}

export default ActivityPresence;