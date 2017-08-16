// wersja przed resuable

/* 
w app.js było var revealOnScroll = new RevealOnScroll();
*/

import $ from 'jquery';
import waypoins from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
	constructor() {
		this.itemsToReveal = $(".feature-item, .testimonial"); //select the element to reveal once it is scrolled to
		this.hideInitially(); //as soon as the page loads we want to run 'hideInitially'
		this.createWaypoints();
	}
	
	hideInitially() { 
		this.itemsToReveal.addClass("reveal-item");	 //before reveal you need to hide
	}
	
/* 'itemsToReveal' is a collection of elements, method 'each' for each item -> there are 4 */
	createWaypoints() {
		this.itemsToReveal.each(function() {
			var currentItem = this;
			new Waypoint({
				element: currentItem,	/* 'element' stands for DOM-element we want to watch for as we scroll down the page */
				handler: function() { /* what we want to happen when that element is scrolled to */
					$(currentItem).addClass("reveal-item--is-visible"); /* add css modifier class */
				},
				offset: "85%"
			});
		});
	}
}

export default RevealOnScroll;