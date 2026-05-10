$(document).ready(function(){

    // 1. Mobile Dropdown Fix
    $('.dropdown > a').off('click').on('click', function(e) {
        e.preventDefault();
        // Only run the click animation on mobile/tablet screens (1000px or smaller)
        if ($(window).width() <= 1000) {
            $(this).next('.dropdown-menu').stop().slideToggle(300);
        }
    });

    // 2. Mobile Menu Toggle
     $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // 3. Close mobile menu when a standard navigation link is clicked
    $('.navbar ul li a:not(.dropdown > a)').on('click', function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');
    });

    // 4. Header Scroll Logic (Fixed for Mobile Stuttering)
   $(window).on('load scroll',function(){
        /* (Optional: keep or remove the lines that close the menu on scroll) */
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        /* NEW CODE: Use a CSS class instead of injecting styles to stop stuttering */
        if($(window).scrollTop() > 35) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
        }
    });

    // --- Counters ---
    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = count + inc;
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
          updateCount();
   });

   // --- Carousels ---
   (function ($) {
    "use strict";
    
    $(".clients-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 2}, 768: {items: 4}, 900: {items: 6} }
    });

    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: { 0: {items: 1}, 576: {items: 2}, 768: {items: 3}, 992: {items: 4} }
    });
    
    })(jQuery);

    // --- Back to Top Button ---
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // --- FAQ Accordion ---
    $('.accordion-header').click(function(){
        $('.accordion .accordion-body').slideUp(500);
        $(this).next('.accordion-body').slideDown(500);
        $('.accordion .accordion-header span').text('+');
        $(this).children('span').text('-');
    });

});