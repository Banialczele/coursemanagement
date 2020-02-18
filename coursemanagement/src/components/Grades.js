import React from 'react';
import axios from 'axios';
import moment from 'moment';

//component to display list of courses with their grades and presence

class Grades extends React.Component {
	state = {
		courses: [],
		students: []
	};

	componentDidMount() {
		// axios('http://localhost:3000/course/get',{
		// 	method: 'get',
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// })
		// 	.then(res => this.setState({courses: res.data}))
		// 	.catch(err => console.log(err));
		axios.get('http://localhost:3000/students/getAll')
		     .then(res => this.setState({students: res.data}))
		     .catch(err => console.log(err));
	}
	showTableHeader = () => {
		return (
			<thead className="GradeTableHeader">
				<tr className="GradeTableHeaderRow">
					<th>Nazwa kursu</th>
					<th>Data rozpoczęcia zajęć</th>
					<th>Data kolejnych zajęć</th>
					<th>Lista studentów</th>
					<th>Wyświetl ocenę końcową</th>
				</tr>
			</thead>
		);
	};

	showDate = (date) => {
		const currentDate = new Date(date);
		return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`);
	};

	showTableData = (students) => {
		console.log(students);
		return (
			students.map((student,i) => {
				console.log(student);
				return (
					<tbody key={i}>
						<tr key={i}>
							<td>{student.course.name}</td>
							<td>{moment(this.showDate(student.course.startingDate))
								.format('D/MM/YYYY h:mm')}</td>
							<td>{moment(this.showDate(student.course.nextClasses))
								.format('D/MM/YYYY h:mm')}</td>
							<td>
								{student.name} {student.last}
							</td>
							<td>Ocena końcowa: button</td>
						</tr>
					</tbody>
				)
			})
		);
	};

	render() {
		return (
			<div>
				<table className="Grades table">
					{this.showTableHeader()}
					{this.showTableData(this.state.students)}
				</table>
			</div>
		);
	}
}

//
//


export default Grades;