import $ from 'jquery';

class Modal{
	constructor(){
		this.openModalButton = $(".modal__open");
		this.closeModalButton = $(".modal__close");
		this.modal = $(".modal");
		this.events();	
	}
	
	events(){
		this.openModalButton.click(this.openModal.bind(this));
		this.closeModalButton.click(this.closeModal.bind(this));
		$(document).keyup(this.keyHandler.bind(this));
	}
	keyHandler(e){
		if (e.keyCode == 27){
			this.closeModal();
		}
	}
	openModal(){
		this.modal.addClass("modal--is-visible");
		return false;
	}
	closeModal(){
		this.modal.removeClass("modal--is-visible");
	}
}
export default Modal;