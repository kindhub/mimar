function CreateEvent(eventName, bubbles, cancelable) {
	let event;

	bubbles    = bubbles    || false;
	cancelable = cancelable || false;

	if(typeof Event === "function"){
		event = new Event(eventName, {
			bubbles: bubbles,
			cancelable: cancelable
		});
	}else{
		event = document.createEvent('CustomEvent');
		event.initEvent(eventName, bubbles, cancelable);
	}

	return event;
}

export default CreateEvent;