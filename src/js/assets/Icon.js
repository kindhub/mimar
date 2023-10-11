function icon(icon, className) {
	let el  = '<svg xmlns:xlink="http://www.w3.org/1999/xlink" class="' + className + '">';
		el += '<use xlink:href="#tmpl-hh__icon-' + icon + '" href="#tmpl-hh__icon-' + icon + '"></use>';
		el += '</svg>';

	return el;
}

export default icon;