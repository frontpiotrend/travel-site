import $ from 'jquery';

class MobileMenu {
/* 'constructor'-function will be run immediately when the new object is created with 'MobileMenu'-class */
	constructor() {
		this.siteHeader = $('.site-header');	//select entire site-header-element from the DOM
		this.menuIcon = $(".site-header__menu-icon");			//property/shortcut that's stores DOM selection for the menu-icon-element
		this.menuContent = $(".site-header__menu-content");	//shortcut to that current hidden div
		this.events();														//we have to manually call this method as soon as our object is created
	}
	
	events() {														//if we want the browser to be listening for this event as soon as the page loads
		this.menuIcon.click(this.toggleTheMenu.bind(this));		//here list events we want to watch for; when its clicked than we want to do...
//bind(this) -> instance of 'this' will be the same as in 'this.manuIcon'
	}
	
	toggleTheMenu() {
//when icon is clicked -> use js to add a new class to a hidden div and then use css to make that class visible
		this.menuContent.toggleClass("site-header__menu-content--is-visible");	//its not called directly, but roundabout via events()
		this.siteHeader.toggleClass("site-header--is-expanded"); //let's add a modifier class
		this.menuIcon.toggleClass("site-header__menu-icon--close-x");
	}
	
}

//which will be imported in app.js
export default MobileMenu;


