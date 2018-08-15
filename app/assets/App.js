import MobileMenu from './scripts/modules/MobileMenu';
import RevealOnScroll from './scripts/modules/RevealOnScroll';
import StickyHeader from './scripts/modules/StickyHeader';
import Modal from './scripts/modules/Modal';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"),"85%");
new RevealOnScroll($(".testimonial"),"60%");
var stickyHeader = new StickyHeader();
var modal = new Modal();

