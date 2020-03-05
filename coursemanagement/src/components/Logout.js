import React from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
	const history = useHistory();
	const loggedTeacher = JSON.parse(localStorage.getItem('loggedTeacher'));
	const redirectToEntry = () => {
		axios.post('http://localhost:3000/teachers/logout',{
			     teacher: loggedTeacher
		     })
		     .then(res => localStorage.clear())
		     .catch(err => console.log(err));
		history.push('/');
	};

	return (
		<div>
			{redirectToEntry()}
			<div>{alert('Successfully Logged out')}</div>
		</div>
	);
};

export default Logout;