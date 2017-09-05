import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

var mobileMenu = new MobileMenu(); //object which uses this class as a blueprint; saved to a variable
new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");
/* arguments above: 1) jquery-selector, 2) offset */
var stickyHeader = new StickyHeader();
var modal = new Modal(); 