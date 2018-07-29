

function addCLassForm() {
	let formBtn = document.querySelector('.form-btn');
	let searchForm = document.querySelector('.search-form');

	formBtn.addEventListener('click', function () {
		searchForm.classList.toggle('open');

	});

	let headerWr =  document.querySelector('.main');
	headerWr.addEventListener('click', function () {
		searchForm.classList.remove('open');
	})
}

function addCLassHubs() {
	let hubsBtn = document.querySelector('.hubs-show-btn');
	let hubsAllBLock = document.querySelector('.all-hubs');

	hubsBtn.addEventListener('click', function () {
		hubsAllBLock.classList.toggle('hidden');

	});

}

addCLassHubs();
addCLassForm();


