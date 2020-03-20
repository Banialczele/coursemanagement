import React from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import PresenceDetail from "./PresenceDetail";
import Popup from "reactjs-popup";
import '../styles/Grades.css';
import GradesDetail from "./GradesDetail";
import Entry from "./Entry";
import EditGrade from "./EditGrade";

class Grades extends React.Component {
	state = {
		courses: [],
		students: [],
		finalGrade: '',
		isLogged: false,
		courseDate: ''
	};

	componentDidMount() {
		if(localStorage.length > 1) {
			this.setState({isLogged: true});
			this.apiCall();                                                         
		}
	}

	apiCall = () => {
		axios.get('/students/getAll',{
			     headers: {
				     "Content-Type": "application/json",
				     "Authorization": `Bearer ${localStorage.getItem('mysecrettoken')}`,
			     }
		     })
		     .then(res => {this.setState({students: res.data})})
		     .catch(err => console.log(err));
	};

	showDate = (date) => {
		const currentDate = new Date(date);
		return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`);
	};

	showTableHeader = () => {
		return (
			<div className="GridTableHeader">
				<div className="GridTableHeaderChild">
					<div>Nazwa kursu</div>
					<div>Rozpoczęcie zajęć</div>
					<div>Kolejne zajęcia</div>
					<div>Student</div>
					<div>Obecność</div>
					<div>Ocena końcowa</div>
					<div>Oceny</div>
					<div>Edytuj Ocene</div>
				</div>
			</div>
		);
	};
	
	showTableData = (students) => {
		return (
			students.map((student,i) => {
				return (
					<div key={i} className="GridTableBody">
						<div key={i} className="GridTableChild">
							<div><b>{student.course.name}</b></div>
							<div>{moment(this.showDate(student.course.startingDate),'YYYY-MM-DDTh:mm a')
								.format('DD-MM-YYYY h:mm a')}</div>
							<div>
								{moment(this.showDate(student.course.nextClasses),'YYYY-MM-DDTh:mm a')
									.format('DD-MM-YYYY h:mm a')}
							</div>
							<div>
								<b>{student.name} {student.last}</b>
							</div>
							<div>
								<Popup modal trigger={<button className="buttonStyle">Pokaż obecność</button>}>
									<PresenceDetail presenceArray={student.presences} courseDate={student.nextClasses}/>
								</Popup>
							</div>
							<div>

								{this.calculateFinalGrade(student)}
							</div>
							<div>
								<Popup modal trigger={<button className="buttonStyle">Pokaż oceny</button>}>
									<GradesDetail gradesArr={student.grades} weightsArr={student.weights}/>
								</Popup>
							</div>
							<div>
								<Popup modal trigger={<button className="activityButton fixedWidth">Edytuj ocene</button>}>
									<EditGrade student={student}/>
								</Popup>
							</div>
						</div>
					</div>
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
		if(this.state.students.length !== 0) {
			this.calculateFinalGrade(this.state.students)
		}
		if(localStorage.length > 1) {
			return (
				<div className="background">
					<div className="GridTableParent">
						{this.showTableHeader()}
						{this.showTableData(this.state.students)}
					</div>
				</div>
			);
		} else {
			if(localStorage.length === 0) {
				alert('Please login to continue');
				return (
					<Redirect to={'/'}/>
				)
			}
		}

	}
}

export default Grades;