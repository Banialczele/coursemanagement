import React from 'react';

const StudentInputs = props => {
	return (
		props.studentList.map((val,idx) => {
			let studentId = `student${idx}`,studentLast = `last${idx}`,studentEmail = '';
			return (
				<div key={idx}>
					<label htmlFor={studentId}>{`Imie studenta #${idx+1}`}</label>
					<input
						type="text"
						name={studentId}
						data-id={idx}
						id={studentId}
						className="name"
					/> <br/>
					<label htmlFor={studentLast}>Nazwisko</label>
					<input
						type="text"
						name={studentLast}
						data-id={idx}
						id={studentLast}
						className="last"
					/> <br/>
					<label htmlFor={studentEmail}>Email</label>
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