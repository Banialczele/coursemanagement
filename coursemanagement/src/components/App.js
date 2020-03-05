import React from 'react';
//import GetAll from './dboperations/GetAll';
// import DoLogin from "./dboperations/DoLogin";
import NavBar from './NavBar';
// import AddCourse from "./dboperations/AddCourse";
import '../styles/App.css';

class App extends React.Component {
	render() {
		return (
			<div className="App-container">
				<div className="container">
					<NavBar />
				</div>
			</div>
		);
	}
}

export default App;