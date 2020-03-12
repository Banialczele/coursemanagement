import React from 'react';
import axios from 'axios';

import '../styles/NewTeacher.css';

class NewTeacher extends React.Component {
	state = {
		name: '',
		last: '',
		email: '',
		password: '',
		message: false
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3001/teachers/add',{
			     name: this.state.name,
			     last: this.state.last,
			     email: this.state.email,
			     password: this.state.password
		     },{
			     headers: {
				     "Content-Type": "application/json",
			     }
		     })
		     .then(res => {
			     alert("Successfully added teacher");
			     this.setState({message: true});
		     })
		     .catch(err => alert("Something went wrong"));
	};

	addingNewTeacherForm = () => {
		return (
			<div className="teacherContainer">
				<div className="teacherForm">
					<form onSubmit={this.handleFormSubmit}>
						<div className="labelInput">
							<label htmlFor="teacherName" className="labelElement">Imie:</label>
							<input type="text" name="teacherName" onChange={e => this.setState({name: e.target.value})} className="inputElement"/>

						</div>
						<br/>
						<div className="labelInput">
							<label htmlFor="teacherLast" className="labelElement"> Nazwisko:</label>
							<input type="text"
							       name="teacherLast"
							       value={this.state.last}
							       onChange={e => this.setState({last: e.target.value})}
							       className="inputElement"/>
						</div>
						<br/>
						<div className="labelInput">
							<label htmlFor="teacherEmail" className="labelElement">Email:</label>
							<input type="text"
							       name="teacherEmail"
							       value={this.state.email}
							       onChange={e => this.setState({email: e.target.value})}
							       className="inputElement"/>
						</div>
						<br/>
						<div className="labelInput">
							<label htmlFor="teacherPassword" className="labelElement">Hasło </label>
							<input type="password"
							       minLength="7"
							       name="teacherPassword"
							       value={this.state.password}
							       onChange={e => this.setState({password: e.target.value})} className="inputElement"
							/>
						</div>
						<br/>
						<div style={{clear: "both"}}></div>
						<input type="submit" className="button" value="Wyślij"/>
					</form>
				</div>
			</div>
		);
	};

	render() {
		if(this.state.message === false) {
			return (<div>{this.addingNewTeacherForm()}</div>)
		}else {
			return ( <div> Now you can login</div>)

		}
	}
}



export default NewTeacher;