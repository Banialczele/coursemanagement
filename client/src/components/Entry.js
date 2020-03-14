import React from 'react';
import {useHistory} from 'react-router-dom';

import '../styles/Entry.css';

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
					<section>
						<h1>
							<p>Aplikacja do zarządzania kursami dla nauczycieli.</p>
						</h1>
						<h2>
							O aplikacji
						</h2>
						<p>Aplikacja jest przeznaczona dla osób prowadzących jakiekolwiek kursy. Aplikacja ma na celu ułatwić nauczycielowi
						   zarządzanie kursami oraz studentami zapisanych do danego kursu. Każdy nauczyciel ma możliwość rejestracji i/lub zalogowania
						   się ( jeśli posiada konto ). Po zalogowaniu nauczyciel może dodać nowy kurs razem z listą studentów, którzy mają na dany
						   kurs być zapisani, dodać datę rozpoczynających się zajęć. Zajęcia odbywają się cyklicznie, raz w tygodniu tego samego dnia
						   o tej samej godzinie.
						</p>
						<h4>Zakładka: zajęcia</h4>
						<p>W zakładce zajęcia zostały wyświetlone zajęcia, które odbywają się tylko i wyłącznie danego dnia. Jeśli nauczyciel doda
						   zajęcia, które odbywają się każdego dnia tygodnia to każdego dnia tygodnia wyświetlone zostaną tylko te zajęcia,
						   których dzień tygodnia odpowiada dniu rozpoczęcia zajęć. Dzięki temu, każdy nauczyciel ma możliwość <b>sprawdzenia
						                                                                                                          obecności</b> oraz <b>dodania
						                                                                                                                                oceny</b> razem
						   z <b>formą sprawdzenia wiedzy</b>.</p> Możliwe opcje wyboru formy sprawdzenia wiedzy: <ul>
								<li>Odpowiedź ustna z wagą 1</li>
								<li>Wejściówka z wagą 2</li>
								<li>Kolokwium z wagą 3</li>
							</ul>
						<p>   Wyświetlana jest lista wszystkich kursów razem z listą wszystkich zapisanych studentów do danego kursu, każdemu studentowi
						   możemy sprawdzić obecność oraz dodać nowe oceny. Nie musimy dodawać ocen wszystkim studentom, jeśli któryś student jest
						   nieobecny na zajęciach to może zostać pominięty w dodawaniu ocen.
						</p>
						<h4>Zakładka: informacje</h4>
						<p>Zakładka do sprawdzenia aktywności oraz ocen studenta na zajęciach, które już się odbyły. Wyliczana średnia jest średnią
						   ważoną wyliczaną zgodnie ze wzoru: <b><i>suma iloczynu ocen * waga / suma wszystkich wag.</i></b>
						   Nauczyciel ma możliwość sprawdzenia <b>ocen</b> oraz <b>obecności</b>, obie wartości wyświetlane są razem z datą.
						</p>
						<h3>WAŻNE!</h3>
						<p>W zakładce informacje został dodany przycisk aktualizujący datę kolejnych zajęć. Aktualnie na potrzeby kursu aktualizacja
						   daty została wprowadzona jako przycisk, po naciśnięciu przycisku zostanie wywołana funkcja, która o każdej pełnej minucie
						   zaaktualizuje datę na następny tydzień. Czyli jeśli kurs został dodany 1 Stycznia i nauczyciel nacisnął przycisk o godzinie
						   np 16:45:25 to o godzinie 16:46:00 data zostanie zaaktualizowana automatycznie na 8 Stycznia. Docelowo funkcja ta ma
						   działać nieprzerwanie po stronie serwera z odpowiednią konfiguracją ( do uzyskania obecnego wyniku skorzystałem z
						   biblioteki <b>cron</b>, na stronie <a style={{
								textDecorationLine: "none",
								padding: 0,
								backgroundColor: 'rgba(0,0,0,0)',
								width: 'auto'
							}} href="https://crontab.guru/#*_*_*_*_*" target="_blank">link</a> możemy sprawdzić
						   kiedy dana data zostanie zaktualizowana. Przy podaniu parametru " * * * * * " będzie ona aktualizowana co minutę, jednak
						   jeśli wprowadzimy parametr " 0 0 * * 0 " oraz aplikacja będzie działać nieprzerwanie to każdej niedzieli o godzinie 24:00
						   data zostanie zaktualizowana automatycznie.)
						</p>
					</section>
				</div>

				<button onClick={handleLoginRedirect} type="button">Zaloguj</button>
				<button onClick={handleNewTeacher} type="button">Dodaj nauczyciela</button>
			</div>
		</div>
	);
};

export default Entry;