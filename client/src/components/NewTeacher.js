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
		axios.post('/teachers/add',{
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
		     .catch(err => {
		     	    console.log(err.json());
			        alert("Something went wrong")
		     });
	};

	addingNewTeacherForm = () => {
		return (
			<div className="teacherContainer">
				<div className="newTeacherFormContainer">
					<form onSubmit={this.handleFormSubmit} className="teacherForm">
						<div className="teacherLabelInput">
							<label htmlFor="teacherName" className="teacherLabelElement">Imie:</label>
							<input type="text"
							       name="teacherName"
							       onChange={e => this.setState({name: e.target.value})}
							       className="teacherInputElement"/>

						</div>
						<br/>
						<div className="teacherLabelInput">
							<label htmlFor="teacherLast" className="teacherLabelElement"> Nazwisko:</label>
							<input type="text"
							       name="teacherLast"
							       value={this.state.last}
							       onChange={e => this.setState({last: e.target.value})}
							       className="teacherInputElement"/>
						</div>
						<br/>
						<div className="teacherLabelInput">
							<label htmlFor="teacherEmail" className="teacherLabelElement">Email:</label>
							<input type="text"
							       name="teacherEmail"
							       value={this.state.email}
							       onChange={e => this.setState({email: e.target.value})}
							       className="teacherInputElement"/>
						</div>
						<br/>
						<div className="teacherLabelInput">
							<label htmlFor="teacherPassword" className="teacherLabelElement">Hasło </label>
							<input type="password"
							       minLength="7"
							       name="teacherPassword"
							       value={this.state.password}
							       onChange={e => this.setState({password: e.target.value})} className="teacherInputElement"
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
		} else {
			return (<div> Now you can login</div>)

		}
	}
}



export default NewTeacher;