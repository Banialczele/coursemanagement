import React from 'react';
//import GetAll from './dboperations/GetAll';
// import DoLogin from "./dboperations/DoLogin";
import NavBar from './NavBar';
// import AddCourse from "./dboperations/AddCourse";
import '../styles/App.css';

class App extends React.Component {
	// state = {
	// 	data: [],
	// 	id: 0,
	// 	message: null,
	// 	intervalIsSet: false,
	// 	idToDelete: null,
	// 	idToUpdate: null,
	// 	objectToUpdate: null
	// };
	//
	// componentDidMount() {
	// 	if(!this.state.intervalIsSet) {
	// 		let interval = setInterval(this.getDataFromDb,1000);
	// 		this.setState({intervalIsSet: interval});
	// 	}
	// }

	render() {
		return (
			<div className="App-container">
				<div className="container">
					<NavBar />
				</div>
				{/*<div><DoLogin email="tomskik@gmail.com" password="thomas123" /></div>*/}

			</div>
		);
	}
}

export default App;