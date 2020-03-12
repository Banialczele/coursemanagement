import React from 'react';
import moment from 'moment';
import '../styles/PresenceDetail.css';

const showSomething = (obecnosc) => {
	return obecnosc === false ? 'Nieobecny' : 'Obecny';
};

class PresenceDetail extends React.Component {

	studentTableDetail = (presenceArray) => {
		return presenceArray.map((presence,i) => {
			return (
				<table key={i} className="tableContainer">
					<thead>
						<tr className="headerGridContainer">
							<td>Data</td>
							<td>Obecność</td>
						</tr>
					</thead>
					<tbody key={i}>
						<tr>
							<td>{moment(presence.date)
								.format('D/MM/YYYY h:mm')}</td>
							<td>
								{showSomething(presence.presence)}
							</td>
						</tr>
					</tbody>
				</table>
			)
		});
	};

	render() {
		return (
			<div className="PresenceDetailContainer">
				{this.studentTableDetail(this.props.presenceArray)}
			</div>
		)
	}
}

export default PresenceDetail;