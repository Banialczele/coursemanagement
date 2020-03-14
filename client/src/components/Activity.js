import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Popup from 'reactjs-popup';
import ActivityPresence from "./ActivityPresence";
import AddGrade from "./AddGrade";
import '../styles/Activity.css';
import NoClasses from "./NoClasses";

class Activity extends React.Component {
	state = {
		courses: [],
		isLogged: false
	};

	componentDidMount() {
		// if(localStorage.length > 1) {
			this.setState({isLogged: true});
			axios.get('/course/getAll',{
				     headers: {
					     "Content-Type": "application/json",
					     "Authorization": `Bearer ${localStorage.getItem('mysecrettoken')}`
				     }
			     })
			     .then(res => this.setState({courses: res.data}))
			     .catch(err => console.log(err));
		// }
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
		const courses = this.getDailyClasses(this.state.courses);
		if(courses.length !== 0) {
			return courses.map((course,index) => {
				return (
					<div className="gridContainer" key={index}>
						Kurs: {course.name}
						<div className="grid-item">
							<Popup
								modal
								trigger={<button type="button" value="Sprawdź obecność" className="activityButton">Sprawdź obecność</button>}>
								<ActivityPresence startingClasses={course.startingDate} courseDate={course.nextClasses} studentData={course.students}/>
							</Popup>
						</div>
						<div>
							<Popup modal trigger={<button className="activityButton">Dodaj ocene</button>}>
								<AddGrade courseDate={course.nextClasses} course={course}/>
							</Popup>
						</div>
					</div>
				)
			})
		} else {
			return (<NoClasses/>)
		}
	});



	render() {
		if(this.state.isLogged === true) {
			return (
				<div className="Activity-container">
					<div className="Activity-child">
						<div className="grid">
							{this.showDailyClasses()}
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div style={{color: 'red'}}>Please login to continue!</div>
			)
		}
	}
}

export default Activity;