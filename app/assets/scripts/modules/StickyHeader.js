import $ from 'jquery';
import waypoins from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
	constructor() {
/* select all elements with .lazyload */		
		this.lazyImages = $(".lazyload");
/* points out to site-header-element */		
		this.siteHeader = $(".site-header");
/* which point on the page we want to be the trigger? when trigger hits the top of our viewport then header-background darker */			
		this.headerTriggerElement = $(".large-hero__title");
/* waypoint created as soon as the page loads */
		this.createHeaderWaypoint();
		this.pageSections = $(".page-section");
		this.headerLinks = $(".primary-nav a"); /* stores all of the header-links */
		this.createPageSectio nWaypoints();
		this.addSmoothScrolling();
		this.refreshWaypoints();
	}

/* lazy loading may cause custom waypoints events to fire at wrong times; solution: refresh waypoints measurements everytime a new image is lazy loaded*/	
	refreshWaypoints() {
		this.lazyImages.on('load', function() {
			Waypoint.refreshAll();
		});
	}

/* to scroll smoothly after clicking internal links to sections */	
	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
	}
	
	createHeaderWaypoint() {
		var that = this;
		new Waypoint({		
/* waypoints is expecting a js-native-DOM-element, but currently we're passing jQuery-object thats why [0] <- first item in array is always pointer to native DOM-element */
			element: this.headerTriggerElement[0],
/* add modifier class to header */			
			handler: function(direction) { 
				if(direction == "down") {
/* runs only if scrolling down */					
					that.siteHeader.addClass("site-header--dark");
				} else {
					that.siteHeader.removeClass("site-header--dark");
				}
			} 
		});
	}

/* to highlight current page section */	
	createPageSectionWaypoints() {
		var that = this;
/* .each() to loop through this sections */		
		this.pageSections.each(function() {
			var currentPageSection = this;
			new Waypoint({
				element: currentPageSection,
/* we want to use data-custom-attribute as a jQuery-selector to target the matching header-link, so we can give it a yellow modifier class */				
				handler: function(direction) {
					if (direction == "down") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
/* before highlighted class, we want reset things by removin this class for any and all header-links */
					that.headerLinks.removeClass("is-current-link");
					$(matchingHeaderLink).addClass("is-current-link");
					}
				},
/* to customize how early or late in the scroll a waypoint is triggered; by default offset is 0 */
				offset: "18%"
			});
			
			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == "up") {
						var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
					that.headerLinks.removeClass("is-current-link");
					$(matchingHeaderLink).addClass("is-current-link");
					}
				},
				offset: "-40%"
			});
		});
	}
}

export default StickyHeader;