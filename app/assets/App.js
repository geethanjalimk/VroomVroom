import MobileMenu from './scripts/modules/MobileMenu';
import RevealOnScroll from './scripts/modules/RevealOnScroll';
import $ from 'jquery';

var mobileMenu = new MobileMenu();
new RevealOnScroll($(".feature-item"),"85%");
new RevealOnScroll($(".testimonial"),"60%");

