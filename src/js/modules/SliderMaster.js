/*
--------------------------------------------
--------------------------------------------
		  	SLIDER MASTER
--------------------------------------------
--------------------------------------------
*/
function SliderMaster(vSwiper, prefix) {
	let getTemplate = function (className, pagination) {
		let slider = document.createElement('div');
			slider.classList.add(className);
			slider.classList.add(prefix + 'default-slider');

		let container = document.createElement('div');
			container.classList.add(prefix + 'swiper-container');
			container.classList.add(className + '__container');
			container.classList.add(prefix + 'default-slider__container');

		let wrapper = document.createElement('div');
			wrapper.classList.add(prefix + 'swiper-wrapper');

		container.appendChild(wrapper);
		slider.appendChild(container);

		if (pagination) {
			let paginationBlock = document.createElement('div');
				paginationBlock.classList.add(prefix + 'swiper-pagination');
				paginationBlock.classList.add(className + "__pagination");

			slider.appendChild(paginationBlock);
		}

		return slider;
	};

	this.init = function (sliderClass, itemsBlockSelector, itemsSelector, options, autoplay, preventClicks) {
		let slider = getTemplate(sliderClass, true);

		let items = document.querySelectorAll(itemsSelector);

		for (let i = 0; i < items.length; i++) {
			let slide = document.createElement('div');
				slide.classList.add(prefix + 'swiper-slide');
				slide.appendChild(items[i]);
				slider.querySelector('.' + prefix + 'swiper-wrapper').appendChild(slide);
		}

		if (!options) {
			options = {
				loop: true,
				slidesPerView: 1,
				autoplay: !!autoplay,
				preventClicks: !!preventClicks,
				autoHeight: true,
				spaceBetween: 25,
				pagination: {
					el: '.' + sliderClass + '__pagination',
					clickable: true,
					type: 'bullets',
				},
			};
		}

		document.querySelector(itemsBlockSelector).innerHTML = slider.outerHTML;

		return vSwiper.init('.' + sliderClass + '__container', options);
	};
}

export default SliderMaster;