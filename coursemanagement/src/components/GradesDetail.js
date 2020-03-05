import React from 'react';
import moment from "moment";

class GradesDetail extends React.Component {
	state = {
		grades: this.props.gradesArr,
		weights: []
	};

	componentDidMount() {
	   	for(let i=0;i<this.props.weightsArr.length; i++){
	   		this.props.weightsArr[i].grade = this.state.grades[i].grade;
	   		this.setState({weights: this.props.weightsArr})
	    }
	}

	showTableHeader = () => {
		return (
			<thead>
				<tr>
					<th>Forma sprawdzenia wiedzy</th>
					<th>Waga oceny</th>
					<th>Data otrzymania oceny</th>
					<th>Ocena</th>
				</tr>
			</thead>
		);
	};

	showTableData = (grades) => {
		return grades.map((grade,i) => {
			return (
				<tbody key={i}>
					<tr key={i}>
						<td>
							{grade.name}
						</td>
						<td>
							{grade.weight}
						</td>
						<td>
							{moment(grade.date).format('DD/MM/YYYY h:mm a')}
						</td>
						<td>
							{grade.grade}
						</td>

					</tr>
				</tbody>
			);
		})
	};



	render() {
		return (
			<div>
				<table>
					{this.showTableHeader()}
					{this.showTableData(this.state.weights)}
				</table>
			</div>
		);
	}
}

export default GradesDetail;