import React from 'react';
import axios from 'axios';

let grades = [];

class AddGrade extends React.Component {
	state = {
		course: this.props.course,
		grade: '',
		weight: 'ustna',
		email: ''
	};

	getStudentData = (course) => {
		return course.students.map(student => {
			return student;
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		grades.push({ 'owner': this.state.email, 'ocena': this.state.grade, 'waga': this.state.weight, 'date': this.state.course.nextClasses});
		axios.patch('http://localhost:3000/students/addGrade',{grades})
		     .then(res => console.log(res))
		     .catch(err => console.log(err));
		grades = [];
	};

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value, email: e.target.id});
	};

	renderStudentList = () => {
		return (
			<div>
				<table>
					<thead>
						<tr>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{this.getStudentData(this.state.course)
								     .map((student,i) => {
									     return (
										     <div key={i}>{student.name} {student.last}
											     <form onSubmit={this.handleFormSubmit}>
												     <label htmlFor="weight">
													     Forma sprawdzenia wiedzy:
													     <select id={student.email} name="weight" onChange={this.handleChange}>
														     <option value="ustna">Odpowiedź</option>
														     <option value="wejsciowka">Wejściówka</option>
														     <option value="kolokwium">Kolokwium</option>
													     </select>
												     </label>
												     <label htmlFor="grade">
													     Ocena:
													     <input type="number"
													            step="0.1"
													            min="2"
													            max="5"
													            name="grade"
													            id={student.email}
													            onChange={this.handleChange}/>
												     </label>
												     <input type="submit" value="Zapisz"/>
											     </form>
										     </div>
									     )
								     })}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	};

	render() {
		return (
			<div>
				{this.renderStudentList()}
			</div>
		);
	}
}

export default AddGrade;
