import closest from './assets/Closest';
import Video from './modules/Video';
import VSwiper from './assets/VSwiper';
import Content from './modules/Content';
import Nav from './modules/Nav';
/*
	--------------------------------------------
	--------------------------------------------
					SLIDERS
	--------------------------------------------
	--------------------------------------------
 */
	function initOurValuesSlider() {
		swiper.init(".tmpl-hh__our-values-slider", {
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			centeredSlides: true,
			bulletActiveClass: '.tmpl-hh__our-values-slider-pagination-active',
			navigation: {
				prevEl: ".tmpl-hh__our-values-slider-arrow-prev",
				nextEl: ".tmpl-hh__our-values-slider-arrow-next",
			},
			breakpoints: {
				529: {
					spaceBetween: 10,
				}
			},
		});
	}
/*
	--------------------------------------------
	--------------------------------------------
						COMMON
	--------------------------------------------
	--------------------------------------------
 */

const video = new Video(),
swiper = new VSwiper("tmpl-hh__"),
content = new Content(),
nav = new Nav(closest);

video.init();
initOurValuesSlider();
content.init();
nav.init();

window.addEventListener('mousedown', function (event){
	if(!event.target){
		return false;
	}
	nav.onOutClick(event.target);
});