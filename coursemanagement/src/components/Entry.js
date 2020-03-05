import React from 'react';
import {useHistory} from 'react-router-dom';

const Entry = () => {
	const history = useHistory();

	const handleLoginRedirect = () => {
		history.push("/Login");
	};

	const handleNewTeacher = () => {
		history.push('/NewTeacher');
	};

	return (
		<div>
			<div className="EntryPoint">
				<div className="EntryPointAbout">
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ante leo, elementum vitae iaculis at, lacinia eu velit. Nulla
					   nec magna luctus, posuere justo in, tempus odio. Suspendisse molestie in arcu nec dignissim. Suspendisse potenti. Nullam eget
					   convallis justo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur varius sed urna rutrum accumsan. Donec
					   magna dui, eleifend eleifend dolor vel, dapibus rutrum lacus. Sed fringilla maximus semper. Fusce lacinia accumsan leo, dapibus
					   pellentesque ex. Duis a justo non tellus dignissim tempus at id tellus. In tempus ultricies elit eu tempor.
					</p>
					<p>Praesent aliquet a nibh sit amet efficitur. Vestibulum quis dignissim ligula. Proin ut dui ac enim venenatis eleifend nec sed
					   est. Vestibulum at ultricies ipsum. Donec id pellentesque justo, id sodales mi. Nullam lacus diam, porta in tortor sed, dapibus
					   pellentesque ipsum. Ut id est nec lacus fermentum tempus eu at lectus. Integer porta quam ex, eget eleifend ligula sodales id.
					   Nulla sit amet convallis arcu. Aliquam erat volutpat. Aenean placerat orci ac dolor lobortis, id dictum est maximus. Proin
					   viverra nibh eget dolor posuere, iaculis iaculis arcu maximus. Etiam quis mi nec nunc finibus efficitur sed luctus neque.
					   Quisque laoreet interdum nunc, et blandit turpis mattis sit amet. Ut vestibulum eget ex et maximus. Sed mattis ipsum vel ipsum
					   accumsan, eget maximus nibh tincidunt.
					</p>
				</div>
			</div>
			<button onClick={handleLoginRedirect} type="button">Zaloguj</button>
			<button onClick={handleNewTeacher} type="button">Dodaj nauczyciela</button>
		</div>
	);
};

export default Entry;