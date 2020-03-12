import React from 'react';
import moment from "moment";
import '../styles/GradesDetail.css';

class GradesDetail extends React.Component {
	state = {
		grades: this.props.gradesArr,
		weights: []
	};

	componentDidMount() {
		for(let i = 0; i < this.props.weightsArr.length; i++) {
			this.props.weightsArr[i].grade = this.state.grades[i].grade;
			this.setState({weights: this.props.weightsArr})
		}
	}


	showTableData = (grades) => {
		return grades.map((grade,i) => {
			return (
				<table className="gradeTableContainer">
					<thead className="headerWidth">
						<tr className="headerGradeContainer">
							<th>Forma sprawdzenia wiedzy</th>
							<th>Waga oceny</th>
							<th>Data otrzymania oceny</th>
							<th>Ocena</th>
						</tr>
					</thead>
					<tbody key={i}>
						<tr key={i} className="showAsGrid">
							<td>
								{grade.name}
							</td>
							<td>
								{grade.weight}
							</td>
							<td>
								{moment(grade.date)
									.format('DD/MM/YYYY h:mm a')}
							</td>
							<td>
								{grade.grade}
							</td>

						</tr>
					</tbody>
				</table>
			);
		})
	};



	render() {
		return (
			<div className="gradeDetailContainer">
				{this.showTableData(this.state.weights)}
			</div>
		);
	}
}

export default GradesDetail;