import React from 'react';

import '../styles/Students.css';

const StudentInputs = props => {
	return (
		props.studentList.map((val,idx) => {
			let studentId = `student${idx}`,studentLast = `last${idx}`,studentEmail = '';
			return (
				<div className="students" key={idx}>
					<div>
						<label className="studentLabel" htmlFor={studentId}>Imie</label>
						<div className="studentInput">
							<input
								type="text"
								name={studentId}
								data-id={idx}
								id={studentId}
								className="name"
							/>
						</div>
					</div>
					<br/>
					<div>
						<label className="studentLabel" htmlFor={studentLast}>Nazwisko</label>
						<div className="studentInput">
							<input
								type="text"
								name={studentLast}
								data-id={idx}
								id={studentLast}
								className="last"
							/>
						</div>
					</div>
					<br/>
					<div><label className="studentLabel" htmlFor={studentEmail}>Email</label>
						<div className="studentInput">
							<input
								type="text"
								name={studentEmail}
								data-id={idx}
								id={studentEmail}
								className="email"
							/>
						</div>
					</div>
					<br/><br/>
				</div>
			);
		})
	);
};

export default StudentInputs;