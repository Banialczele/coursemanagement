import React from 'react';
import axios from 'axios';
import GradesDetail from "./GradesDetail";
import Popup from 'reactjs-popup';
import moment from 'moment';

//component to display list of courses with their grades and presence

class Grades extends React.Component {
	state = {
		courses: [],
		studentList: []
	};

	componentDidMount() {
		axios('http://localhost:3000/course/get',{
			method: 'get',
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => this.setState({courses: res.data}))
			.catch(err => console.log(err));

	}

	getStudentDetail = ( studentList ) => {
		const list = studentList.map( student => {
			return student.students;
		});
		return list;
	};

	showTableHeader = () => {
		return (
			<thead>
				<tr>
					<th>Kurs</th>
					<th>Data rozpoczęcia zajęć</th>
					<th>Data kolejnych zajęć</th>
					<th>Informacje o studentach </th>
				</tr>
			</thead>
		);
	};

	showDate = (date) => {
		const currentDate = new Date(date);
		return (`${currentDate.getFullYear()}-${currentDate.getMonth()+1    }-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}`);
	};

	showMonday = () => {
		let d = new Date();
		d.setDate(d.getDate() + ( d.getDay() + 7 - d.getDay() ));
		console.log(d.toISOString());
	};

	showTableData = (courses) => {
		return (
			courses.map( (course, i ) => {
				return (
					<tbody key={i}>
						<tr>
							<td>{course.name}</td>
							<td>{moment(this.showDate(course.startingDate)).format('D/MM/YYYY h:mm')}</td>
							<td>{moment(this.showDate(course.nextClasses)).format('D/MM/YYYY h:mm')}</td>
							<td>
								<Popup modal trigger={<button>Zobacz więcej</button>}>
									<GradesDetail studentList={this.getStudentDetail(this.state.courses)}/>
								</Popup>
							</td>
						</tr>
					</tbody>
				)
			})
		);
	};
	render() {
		this.showMonday();
		return (
			<div>
				<table className="Grades table">
					{this.showTableHeader()}
					{this.showTableData(this.state.courses)}
				</table>
			</div>
		);
	}
}


export default Grades;