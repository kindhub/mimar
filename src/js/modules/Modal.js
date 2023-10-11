/*
--------------------------------------------
--------------------------------------------
		  		MODAL
--------------------------------------------
--------------------------------------------
*/
function Modal(closest) {
	let classes = {
		pageWrapper: 'tmpl-hh__wrapper',
		modal: 'tmpl-hh__modal',
		modalShow: 'tmpl-hh__modal--show',
		window: 'tmpl-hh__modal__window'
	};
	let modal = document.querySelector('.' + classes.modal);

	let hide = function(){
		if(modal.classList.contains(classes.modalShow)){
			modal.classList.remove(classes.modalShow);
			setTimeout(setContent, 400, "");
		}
	};
	let show = function(){
		modal.classList.add(classes.modalShow);
	};
	let onOutClick = function (target) {
		if (!target.classList.contains(classes.window) && !closest(target, '.' + classes.window)) {
			hide();
		}
	};
	let center = function () {
		let wrapperPos = document.querySelector('.tmpl-hh__wrapper').offsetTop,
			modalWindow = document.querySelector('.' + classes.window),
			modalWindowHeight = parseInt(getComputedStyle(modalWindow)['height']);

		modalWindow.style.top = (window.pageYOffset - wrapperPos + (window.innerHeight / 2 - modalWindowHeight / 2)) + "px";
	};
	let setContent = function(content){
		let modalWindow = document.querySelector('.' + classes.window);
			modalWindow.innerHTML = content;
	};

	document.addEventListener('mousedown', function (event) {
		if (!event.target) {
			return false;
		}

		onOutClick(event.target);
	});

	this.hideModal = hide();
	this.showModal = function(content){
		setContent(content);
		setTimeout(function () {
			center();
			show();
		}, 150);
	};
}

export default Modal;