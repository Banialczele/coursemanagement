import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

import '../styles/NavBar.css';
import Login from "./Login";
import Activity from "./Activity";
import Presences from "./Presences";
import Grades from "./Grades";
import Logout from "./Logout";
import AddCourse from "./AddCourse";

function NavBar() {
	return (
		<Router>
			<div className="wrapper">
				<nav className="flex-nav NavBar">
					<ul className="container">
						<li className="nav item"><Link to="/addCourse">Dodaj kurs</Link></li>
						<li className="nav item"><Link to="/activity">Zajęcia</Link></li>
						<li className="nav item"><Link to="/grades">Informacje</Link></li>
						<li className="nav item"><Link to="/presences">Obecność</Link></li>
						<li className="nav item"><Link to="/">Zaloguj</Link></li>
						<li className="nav item"><Link to="/Logout">Wyloguj</Link></li>
					</ul>
				</nav>
				<Route exact path="/" component={Login}/>
				<Route path="/addCourse" component={AddCourse}/>
				<Route path="/grades" component={Grades}/>
				<Route exact path="/activity" component={Activity}/>
				<Route path="/presences" component={Presences}/>
				<Route path="/Logout" component={Logout}/>
			</div>
		</Router>
	);
}

export default NavBar;