import React from 'react';
import NavBar from './NavBar';
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