import React from 'react';
import moment from 'moment';

const showSomething = (obecnosc) => {
	return obecnosc === false ? 'Nieobecny' : 'Obecny';
};

class PresenceDetail extends React.Component {

	studentTableDetail = (presenceArray) => {
		return presenceArray.map((presence,i) => {
				return (
					<table key={i}>
						<thead>
							<tr>
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
			<div>{this.studentTableDetail(this.props.presenceArray)}</div>
		)
	}
}

export default PresenceDetail;