import React from 'react';
import '../styles/MyCourses.css'
import axios from 'axios';
import PresenceDetail from "./PresenceDetail";
import Popup from "reactjs-popup";

class MyCourses extends React.Component {
	state = {
		students: [],
	};

	componentDidMount() {
		axios.get('http://localhost:3000/students/getAll')
		     .then(res => this.setState({students: res.data}))
		     .catch(err => console.log(err));
	}

	tableHeaders = () => {
		return (
			<thead>
				<tr>
					<th>Imie</th>
					<th>Nazwisko</th>
					<th>Kurs</th>
					<th>Obecność</th>
				</tr>
			</thead>
		);
	};

	getStudentPresences = (presenceArray) => {
		console.log(presenceArray.map(presence => presence.presence));
	};

	getCourseName = (courseArray) => {
		return courseArray.name;
	};

	tableData = (students) => {
		return students.map(student => {
			return (
				<tbody key={student._id}>
					<tr>
						<td>{student.name}</td>
						<td>{student.last}</td>
						<td>{this.getCourseName(student.course)}</td>
						<td><Popup modal trigger={<button>Pokaż obecność</button>}>
							<PresenceDetail presenceArray={student.presences} courseDate={student.course.nextClasses}/>
						</Popup></td>
					</tr>
				</tbody>
			);
		})
	};

	render() {
		return (
			<div>
				<table>
					{this.tableHeaders()}
					{this.tableData(this.state.students)}
				</table>
			</div>
		)
	}
}


export default MyCourses;