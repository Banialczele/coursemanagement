import React from 'react';
import axios from 'axios';
import '../styles/EditGrade.css';

const updateGradeArray = [];

class EditGrade extends React.Component {
	state = {
		student: this.props.student
	};

	handleGradeChange = (student,grade,e) => {
		updateGradeArray.push({studentId: student._id,gradeId: grade._id,newGrade: e.target.value});
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log(updateGradeArray);
		axios.patch('http://localhost:3001/students/updateGrade',{
			     updateGradeArray
		     })
		     .then(res => console.log(res))
		     .catch(err => console.log(err));
	};

	getStudentForCourse = (student) => {
		return (
			<div className="gradesContainer">
				<div className="headerGriddity">
					<div className="studentName">Imie Nazwisko</div>
					<div className="weightHeader">Forma wiedzy</div>
					<div className="gradeHeader">
						<div>Ocena</div>
						<div>Nowa ocena</div>
					</div>
				</div>
				<div className="gradeContFlex">
					<form onSubmit={this.handleFormSubmit}>
						<div className="gradesGriddity">
							<div className="studentName">{student.name} {student.last}</div>
							<div className="gradesWeight">
								{student.weights.map((weight,i) => {
									return (
										<div className="weight" key={i}>{weight.name}</div>
									);
								})}
							</div>
							<div className="gradesGrade">
								{student.grades.map((grade,k) => {
									return (
										<div className="newGridContainer" key={k}>
											<div className="newGridOnGrade" key={k}>
												<div>{grade.grade}</div>
												<label htmlFor="grade">
													<select name="grade" onChange={(e) => this.handleGradeChange(student,grade,e)}>
														<option value=""></option>
														<option value="2">2</option>
														<option value="3">3</option>
														<option value="3.5">3.5</option>
														<option value="4">4</option>
														<option value="4.5">4.5</option>
														<option value="5">5</option>
													</select>
												</label>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<input className="editGradeButton" type="submit" value="Zapisz"/>
					</form>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.student !== undefined) {
			return (
				<div className="EditGradeContainer">
					<div>
						{this.getStudentForCourse(this.state.student)}
					</div>
				</div>
			);
		}
	}
}

export default EditGrade;
