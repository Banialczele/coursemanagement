import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import '../styles/NavBar.css';
import Login from "./Login";
import Activity from "./Activity";
import MyCourses from "./MyCourses";
import Grades from "./Grades";
import Logout from "./Logout";
import AddCourse from "./AddCourse";

function NavBar() {
	return (
		<Router>
			<div className="wrapper">
				<nav className="flex-nav NavBar">
					<ul className="container">
						<li className="nav item"><Link to ="/courses">Moje kursy</Link></li>
						<li className="nav item"><Link to ="/addCourse">Dodaj kurs</Link></li>
						<li className="nav item"><Link to ="/activity">Zajęcia</Link></li>
						<li className="nav item"><Link to ="/grades">Informacje</Link></li>
						<li className="nav item"><Link to ="/">Zaloguj</Link></li>
						<li className="nav item"><Link to ="/Logout">Wyloguj</Link></li>
					</ul>
				</nav>
				<Route exact path="/" component={Login}/>
				<Route path="/courses" component={MyCourses}/>
				<Route path="/addCourse" component={AddCourse}/>
				<Route path="/grades" component={Grades}/>
				<Route exact path="/activity" component={Activity}/>
				<Route path="/Logout" component={Logout}/>
			</div>
		</Router>
	);
}

export default NavBar;