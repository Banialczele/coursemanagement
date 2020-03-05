import React from 'react';
import axios from "axios";

const DoLogin = async(email,password) => {
	const loginTeacher = await axios.post(
		'http://localhost:3000/teachers/login',{
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
			<div className="Login form">
				<form onSubmit={this.onSubmit}>
					<label htmlFor="email">
						Email:
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.onEmailChange}
						/>
					</label><br/>
					<label htmlFor="password">
						Hasło:
						<input
							type="password"
							name="password"
							value={this.state.password}
							onChange={this.onPassChange}
						/>
					</label><br/>
					<input type="submit" value="Zaloguj"/>
				</form>
			</div>
		);
	}

	render() {
		localStorage.setItem('loggedTeacher', JSON.stringify(this.state.teacher));
		if(this.state.logged) {
			return(<div> You're logged in as {this.state.teacher.name} {this.state.teacher.last}</div>)
		}else {
			return this.loginForm()
		}
	}
}

export default (Login);