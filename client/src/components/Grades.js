import React from 'react';
import axios from 'axios';
import moment from 'moment';
import PresenceDetail from "./PresenceDetail";
import Popup from "reactjs-popup";
import '../styles/Grades.css';
import GradesDetail from "./GradesDetail";

class Grades extends React.Component {
	state = {
		courses: [],
		students: [],
		finalGrade: '',
		isLogged: false
	};

	componentDidMount() {
		if(localStorage.length > 1) {
			this.setState({isLogged: true});
			axios.get('/students/getAll',{
				     headers: {
					     "Content-Type": "application/json",
					     "Authorization": `Bearer ${localStorage.getItem('mysecrettoken')}`,
				     }
			     })
			     .then(res => {this.setState({students: res.data})})
			     .catch(err => console.log(err));
		}
	}

	showDate = (date) => {
		const currentDate = new Date(date);
		return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`);
	};

	handleButtonClick = () => {
		axios.patch('http://localhost:3000/course/updateTime')
		     .then(res => res)
		     .catch(err => console.log(err));
	};

	showTableHeader = () => {
		return (
			<thead className="GridTableHeader">
				<tr className="GridTableHeaderChild">
					<th>Nazwa kursu</th>
					<th>Data rozpoczęcia zajęć</th>
					<th style={{display: 'inline'}}>Data kolejnych zajęć
						<button type="button" className="buttonStyle" onClick={this.handleButtonClick}>Aktualizuj date</button></th>
					<th>Student</th>
					<th>Obecność</th>
					<th>
						Ocena końcowa
					</th>
					<th>
						Oceny
					</th>
				</tr>
			</thead>
		);
	};

	showTableData = (students) => {
		return (
			students.map((student,i) => {
				return (
					<tbody key={i} className="GridTableBody">
						<tr key={i} className="GridTableChild">
							<td><b>{student.course.name}</b></td>
							<td>{moment(this.showDate(student.course.startingDate))
								.format('DD/MM/YYYY h:mm a')}</td>
							<td>
								{moment(this.showDate(student.course.nextClasses))
									.format('DD/MM/YYYY h:mm a')}
							</td>
							<td>
								<b>{student.name} {student.last}</b>
							</td>
							<td>
								<Popup modal trigger={<button className="buttonStyle">Pokaż obecność</button>}>
									<PresenceDetail presenceArray={student.presences} courseDate={student.nextClasses}/>
								</Popup>
							</td>
							<td>
								{this.calculateFinalGrade(student)}
							</td>
							<td>
								<Popup modal trigger={<button className="buttonStyle">Pokaż oceny</button>}>
									<GradesDetail gradesArr={student.grades} weightsArr={student.weights}/>
								</Popup>
							</td>
						</tr>
					</tbody>
				)
			})
		);
	};

	calculateFinalGrade = (students) => {
		if(students.grades !== undefined && students.weights !== undefined && students.grades.length > 0 && students.weights.length > 0) {
			const oceny = students.grades.map(grade => grade.grade);
			const wagi = students.weights.map(weight => weight.weight);
			let ocenaKoncowaLicznik = 0;
			let ocenaKoncowaMianownik = 0;
			let suma = 0;
			for(let i = 0; i < oceny.length; ++i) {
				ocenaKoncowaLicznik += oceny[i] * wagi[i];
				ocenaKoncowaMianownik += wagi[i];
				suma = ocenaKoncowaLicznik / ocenaKoncowaMianownik;
			}
			return Math.round(suma * 2) / 2;
		} else {
			return `${students.name} nie posiada ocen`;
		}
	};

	render() {
		if(this.state.isLogged === true) {
			if(this.state.students.length !== 0) {
				this.calculateFinalGrade(this.state.students)
			}
			return (
				<div className="background">
					<table className="GridTableParent">
						{this.showTableHeader()}
						{this.showTableData(this.state.students)}
					</table>
				</div>
			);
		} else {
			return (
				<div style={{color: 'red'}}>
					<span> Please login to continue!</span>
				</div>
			);
		}

	}
}

//
//


export default Grades;