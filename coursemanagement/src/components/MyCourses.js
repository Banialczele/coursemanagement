import React from 'react';
import '../styles/MyCourses.css'
import axios from 'axios';

class MyCourses extends React.Component {
	state = {
		courses: [],
	};

	componentDidMount() {
		axios('http://localhost:3000/course/get',{
			method: 'get',
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${localStorage.getItem("mysecrettoken")}`
			}
		}).then(res => this.setState({courses:res}))
		  .catch(err => err)
	}

	renderTableData() {
			console.log(this.state.courses.data.map( student => console.log(student)));
		// return this.state.courses.map((course,index) => {
		// 				return (
		// 					<tr key={course._id}>
		// 						<td>{index}</td>
		// 						<td>{course.name}</td>
		// 						{/*<td>{course.owner.name}</td>*/}
		// 						{/*<td>{course.owner.last}</td>*/}
		// 					</tr>
		// 				)
		// });
	}

	// renderTableName() {
	// 	return this.state.courses.map(course => {
	// 		return (
	// 			<tr key={course._id}>
	// 				<td>{course.name}</td>
	// 				<td>{course.owner.name} {course.owner.last}</td>
	// 			</tr>
	// 		)
	// 	});
	// }

	renderTableHeader() {
		if(this.state.courses[0] !== undefined) {
			let headers = Object.keys(this.state.courses[0]);
			headers.pop();
			return headers.map((header,index) => <td key={index}>{header}</td>)
		}
	}

	render() {
		if(this.state.courses.data !== undefined ) {
			this.renderTableData();
		}
		return (
			<div className="My-Courses">
				<h1 className="title">Courses table</h1>
				<table className="table-data">
					<thead className="table-header">
						<tr>
							{this.renderTableHeader()}
							{/*<td>id</td>*/}
							{/*<td>name</td>*/}
							{/*<td>courses</td>*/}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>0</td>
							<td>My First Course</td>
							<td>
								<table className="table-student-data">
									<tbody>
										<tr>
											<td>Marcin</td>
										</tr>
										<tr>
											<td>Tomek</td>
										</tr>
										<tr>
											<td>Paweł</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}


export default MyCourses;