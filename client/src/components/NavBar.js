import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

import '../styles/NavBar.css';
import Login from "./Login";
import Activity from "./Activity";
import Grades from "./Grades";
import Logout from "./Logout";
import AddCourse from "./AddCourse";
import Entry from './Entry';
import NewTeacher from './NewTeacher';

function dropDownMenu() {
	const x = document.getElementById("dropdownClick");
	if(x.className === 'container') {
		x.className += " responsive";
	}else {
		x.className = "container";
	}
}

function NavBar() {
	return (
		<Router>
			<div className="wrapper" style={{color: "white"}}>
				<nav className="flex-nav NavBar">
					<ul className="container" id="dropdownClick">
						<li className="nav item"><Link to="/addCourse">Dodaj kurs</Link></li>
						<li className="nav item"><Link to="/activity">Zajęcia</Link></li>
						<li className="nav item"><Link to="/grades">Informacje</Link></li>
						<li className="nav item"><Link to="/Login">Zaloguj</Link></li>
						<li className="nav item"><Link to="/Logout">Wyloguj</Link></li>
						<li className="nav item"><a className="material-icons" onClick={dropDownMenu}>menu</a></li>
					</ul>
				</nav>
				<Route exact path="/" component={Entry}/>
				<Route path="/Login" component={Login}/>
				<Route path="/addCourse" component={AddCourse}/>
				<Route path="/grades" component={Grades}/>
				<Route path="/activity" component={Activity}/>
				<Route path="/NewTeacher" component={NewTeacher}/>
				<Route path="/Logout" component={Logout}/>
			</div>
		</Router>
	);
}

export default NavBar;