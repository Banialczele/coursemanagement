import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Popup from 'reactjs-popup';
import ActivityPresence from "./ActivityPresence";
import AddGrade from "./AddGrade";

class Activity extends React.Component {
	state = {
		courses: []
	};

	componentDidMount() {
		axios.get('http://localhost:3000/course/get',{
			     headers: {
				     "Content-Type": "application/json"
			     }
		     })
		     .then(res => this.setState({courses: res.data}))
		     .catch(err => console.log(err));
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
		}))
	});

	showDailyClasses = (() => {
		const courses = this.getDailyClasses(this.state.courses);
		if(courses.length !== 0) {
			return courses.map((course,index) => {
				return (
					<div className="flex-item" key={index}>
						Nazwa kursu {course.name}
						<div className="flex-item">
							<Popup
								modal
								trigger={<button type="button" value="Sprawdź obecność">Sprawdź obecność</button>}>
								<ActivityPresence courseDate={course.nextClasses} studentData={course.students}/>
							</Popup>
						</div>
						<div>
							<Popup modal trigger={<button>Dodaj ocene</button>}>
								<AddGrade course={course}/>
							</Popup>
						</div>
						{/*<div className="flex-item">Dodaj ocene</div>*/}
					</div>
				)
			})
		} else {
			return (<div> There are no classes today!</div>)
		}
	});



	render() {
		return (
			<div className="Activity-container">
				<div className="Activity-child">
					<div className="flex-container">
						{this.showDailyClasses()}
					</div>
				</div>
			</div>
		);
	}
}

export default Activity;