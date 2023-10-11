function VacancyBtn() {
	let goToVacancies = function () {
		document.querySelector('#tmpl-hh__vacancies-block').scrollIntoView({
			behavior: "smooth"
		});
	};
	let listenClick = function () {
		let vacanciesBtns = document.getElementsByClassName('tmpl-hh__vacancy-btn');

		for (let i = 0; i < vacanciesBtns.length; i++) {
			vacanciesBtns[i].addEventListener('click', function (event) {
				event.preventDefault();
				goToVacancies();
			});
		}
	};

	this.init = function () {
		listenClick();
	};
}

export default VacancyBtn;