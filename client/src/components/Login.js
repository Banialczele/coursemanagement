import React from 'react';
import axios from "axios";

import '../styles/Login.css';

const DoLogin = async(email,password) => {
	const loginTeacher = await axios.post(
		'http://localhost:5005/teachers/login',{
			email,
			password
		});
	return loginTeacher;
};

class Login extends React.Component {
	state = {
		email: '',
		teacher: '',
		password: '',
		logged: false,
		status: '',
		showingMessage: ''
	};

	onEmailChange = (e) => {
		this.setState({
			email: e.target.value
		})
	};

	onPassChange = (e) => {
		this.setState({
			password: e.target.value
		})
	};

	onSubmit = (e) => {
		e.preventDefault();
		DoLogin(this.state.email,this.state.password)
			.then(res => {
				localStorage.setItem('mysecrettoken',res.data.token);
				this.setState({teacher: res.data.teacher,logged: true,status: res.status,showingMessage: true});
				setTimeout(() => {
					this.setState({showingMessage: false});
				},2000);
				alert('Successfully logged in');
			})
			.catch(err => {
				alert('Unable to login, user not found');
			});
	};

	loginForm() {
		return (
			<div className="loginContainer">
				<div className="loginForm">
					<form onSubmit={this.onSubmit}>
						<div className="labelInput">
							<label htmlFor="email" className="labelElement">
								Email:
							</label>
							<input
								type="text"
								name="email"
								value={this.state.email}
								onChange={this.onEmailChange}
								className="inputElement"
							/>
						</div>
						<br/>
						<div className="labelInput">
							<label htmlFor="password" className="labelElement">
							Hasło:
						</label>
							<input
								type="password"
								name="password"
								value={this.state.password}
								onChange={this.onPassChange}
								className="inputElement"
							/>
						</div>
						<br/>
						<div style={{ clear: "both"}}></div>
						<input type="submit" className="button" value="Zaloguj"/>
					</form>
				</div>
			</div>
		);
	}

	render() {
		localStorage.setItem('loggedTeacher',JSON.stringify(this.state.teacher));
		if(this.state.logged) {
			return (<div className="loginContainer"> You're logged in as {this.state.teacher.name} {this.state.teacher.last}</div>)
		} else {
			return this.loginForm()
		}
	}
}

export default (Login);