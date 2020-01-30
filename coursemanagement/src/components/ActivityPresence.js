import React from 'react';
import '../styles/ActivityPresence.css';
import Checkbox from "./Checkbox";

const OPTIONS = ['obecny','nieobecny'];

class ActivityPresence extends React.Component {
	state = {
		checkboxes: OPTIONS.reduce(
			(options,option) => ({
				...options,
				[option]: false
			}),
			{})
	};

	retrieveStudentData = (students => students.map(student => student.map(stu => {
		return (
			<div
				className="student-Detail"
				key={stu.name}>
				<div className="studentName">{stu.name}</div>
				<div className="studentLast">{stu.last}</div>
				<div className="studentPresence">
					{this.createCheckboxes()}
				</div>
			</div>
		)
	})));

	displayData = (() => {
		return (
			<div className="studentContainer">
				<div className="student-Data">
					<div className="data-name"><b>IMIE</b></div>
					<div className="data-last"><b>NAZWISKO</b></div>
					<div className="data-presence"><b>OBECNOŚĆ</b></div>
				</div>
				{this.retrieveStudentData(this.props.studentData)}
			</div>
		);
	});

	selectAllCheckboxes = isSelected => {
	    Object.keys(this.state.checkboxes).forEach(checkbox => {
	      // BONUS: Can you explain why we pass updater function to setState instead of an object?
	      this.setState(prevState => ({
	        checkboxes: {
	          ...prevState.checkboxes,
	          [checkbox]: isSelected
	        }
	      }));
	    });
	  };

	  selectAll = () => this.selectAllCheckboxes(true);

	  deselectAll = () => this.selectAllCheckboxes(false);

	  handleCheckboxChange = changeEvent => {
	    const { name } = changeEvent.target;

	    this.setState(prevState => ({
	      checkboxes: {
	        ...prevState.checkboxes,
	        [name]: !prevState.checkboxes[name]
	      }
	    }));
	  };

	  handleFormSubmit = formSubmitEvent => {
	    formSubmitEvent.preventDefault();

	    Object.keys(this.state.checkboxes)
	      .filter(checkbox => this.state.checkboxes[checkbox])
	      .forEach(checkbox => {
	        console.log(checkbox, "is selected.");
	      });
	  };

	  //TODO make checkboxes controlled so we know which user is present and which user is absent
	  createCheckbox = option => (
	    <Checkbox
	      label={option}
	      onCheckboxChange={this.handleCheckboxChange}
	      key={option}
	    />
	  );

	  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

	render() {
		return (
			<div className="ActivityPresence">
				{this.displayData()}
				<form onSubmit={this.handleFormSubmit}>
					<div className="buttons">
						<button
							type="button"
							onClick={this.selectAll}>Zaznacz wszystkich obecnych
						</button>
						<button
							type="button"
							onClick={this.deselectAll}>Zaznacz wszystkich nieobecnych
						</button>
						<button type="submit">Aktualizuj</button>
					</div>
				</form>
			</div>
		);
	}
}

export default ActivityPresence;