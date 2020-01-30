import React from 'react';


class GradesDetail extends React.Component {
	state = {
		studentDetail: this.props.studentList
	};

	//fetching data for students associated with course
	componentDidMount() {

	}

	renderStudentList = (studentList) => {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th>Lista studentów</th>
							<th>Obecność</th>
							<th>Oceny</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{studentList.map(students => students.map(student => {
									return (<td>{student.name} {student.last}</td>);
								}))}
							</td>
							<td>tabelka z obecnościami dla danego studenta - </td>
							<td>Tabelka dabli jako oceny + button do aktualizacji oceny</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	render() {
		
		return (
			<div>{this.renderStudentList(this.state.studentDetail)}</div>
		);
	}
}

export default GradesDetail;
