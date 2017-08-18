import $ from 'jquery';

class Modal {
	constructor() {
		this.openModalButton = $(".open-modal"); /* 'Get in touch'-button lives here; use of $ requires import of jquery on top */
		this.modal = $(".modal"); /* property which selects modal-div that we want to reveal */
		this.closeModalButton = $(".modal__close"); /* selects modal top right X close button */
		this.events();
	}
	
/* method to handle all of our events */	
	events() {
		// clicking the open modal button
		this.openModalButton.click(this.openModal.bind(this)); /* bind because of 'this'-reference */
		
		// clicking the x close modal button
		this.closeModalButton.click(this.closeModal.bind(this));
		
		// user pushes any key to escape
		$(document).keyup(this.keyPressHandler.bind(this)); /* press anything -> overall document *//* with .bind we control 'this' and let it keep it current value */
	
	}
	
/* method to check esc-key -> keyCode is here 27 */	
	keyPressHandler(e) {
		if (e.keyCode == 27) {
			this.closeModal();
/* with 'this' is not set to our main object or class, but set to the element that called the 'keyup'-method wich will be overall document or page */
		}
	}
	
/* method to open the modal */	
	openModal() {
		this.modal.addClass("modal--is-visible");
		return false; /* it's a link element; prevents default behavior of scrolling up */
	}
	
/* method to close the modal */
	closeModal() {
		this.modal.removeClass("modal--is-visible");
		return false; /* don't forget to add --is-visible rule in _modal.css */
	}
}

export default Modal;