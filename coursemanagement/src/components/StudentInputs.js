import React from 'react';
import '../styles/Students.css';

const StudentInputs = props => {
	return (
		props.studentList.map((val,idx) => {
			let studentId = `student${idx}`,studentLast = `last${idx}`,studentEmail = '';
			return (
				<div className="students" key={idx}>
					<label className="labelStyle" htmlFor={studentId}>{`Imie studenta #${idx+1}`}</label>
					<input
						type="text"
						name={studentId}
						data-id={idx}
						id={studentId}
						className="name"
					/> <br/>
					<label className="labelStyle" htmlFor={studentLast}>Nazwisko</label>
					<input
						type="text"
						name={studentLast}
						data-id={idx}
						id={studentLast}
						className="last"
					/> <br/>
					<label className="labelStyle" htmlFor={studentEmail}>Email</label>
					<input
						type="text"
						name={studentEmail}
						data-id={idx}
						id={studentEmail}
						className="email"
					/>
					<br/><br/>
				</div>
			);
		})
	);
};

export default StudentInputs;