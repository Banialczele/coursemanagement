import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Popup from 'reactjs-popup';
import ActivityPresence from "./ActivityPresence";
import AddGrade from "./AddGrade";
import EditGrade from './EditGrade';

import '../styles/Activity.css';
import NoClasses from "./NoClasses";
import Entry from "./Entry";
import {Redirect} from "react-router-dom";

class Activity extends React.Component {
	state = {
		courses: [],
		isLogged: false,
		teacher: ''
	};

	componentDidMount() {
		if(localStorage.length > 1) {
			const teacher = localStorage.getItem('loggedTeacher');
			this.setState({isLogged: true, teacher: teacher});
			axios.get('http://localhost:3001/course/getAll',{
				     headers: {
					     "Content-Type": "application/json",
					     "Authorization": `Bearer ${localStorage.getItem('mysecrettoken')}`
				     }
			     })
			     .then(res => this.setState({courses: res.data}))
			     .catch(err => console.log(err));
		}
	}

	getCurrentDay = () => {
		const today = new Date();
		today.getDate();
		return moment(today);
	};

	getDailyClasses = (courses => {
		return (courses.filter((course) => {
			if((moment(course.nextClasses)
				.isSame(this.getCurrentDay(),'day'))) {
				return course;
			}
		}));
	});

	showDailyClasses = (() => {
		if(localStorage.length > 1) {
			const courses = this.getDailyClasses(this.state.courses);
			if(courses.length !== 0) {
				return courses.map((course,index) => {
					return (
						<div className="gridContainer" key={index}>
							{course.name}
							<div>
								<Popup
									modal
									trigger={<button type="button" value="Sprawdź obecność" className="activityButton fixedWidth">Sprawdź
									                                                                                              obecność</button>}>
									<ActivityPresence startingClasses={course.startingDate}
									                  courseDate={course.nextClasses}
									                  studentData={course.students}/>
								</Popup>
							</div>
							<div className="fixedWidth">
								<Popup modal trigger={<button className="activityButton fixedWidth">Dodaj ocene</button>}>
									<AddGrade courseDate={course.nextClasses} course={course}/>
								</Popup>
							</div>
						</div>
					)
				})
			} else {
				return (<NoClasses/>)
			}
		} else if(localStorage.length === 0) {
			alert('Please login to continue');
			return (
				<Redirect to={'/'}/>
			)
		}
	});

	render() {
		return (
			<div className="Activity-container">
				<div className="Activity-child">
					<div className="grid">
						{this.showDailyClasses()}
					</div>
				</div>
			</div>
		);
		// } else {
		// 	alert('Please login to continue');
		// 	return (
		// 		<Redirect to={'/'}/>
		// 	)
		// }
	}
}

export default Activity;