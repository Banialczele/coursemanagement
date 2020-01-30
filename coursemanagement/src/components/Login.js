import React from 'react';
import axios from "axios";
const DoLogin = async(email,password) => {
	const loginTeacher = await axios.post('http://localhost:3000/teachers/login',{
		email,
		password
	});

	return loginTeacher;
};

class Login extends React.Component {
	state = {
		email: '',
		password: '',
		logged: false
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
				return this.setState({teacher: res.data, logged: true})
			})
			.catch(err => console.log(err));
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
		// console.log(`${this.state.email} ${this.state.password}`);
		return (
			this.loginForm()
		);
	}
}

export default Login;