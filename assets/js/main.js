(function ($) {
    "use strict";
    var windowOn = $(window);

    /* Windows Load */
    $(window).on('load', function () {
        preLoader();
        wowAnimation();
    });
    /* Preloader activation */
    function preLoader() {
        $('#loading').delay(500).fadeOut(500);
    };

    /* Wow Active */
    function wowAnimation() {
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 0,
            mobile: false,
            live: true
        });
        wow.init();
    }

    /* footer year */
    var yearElement = document.getElementById("year");
    if (yearElement) { yearElement.innerHTML = new Date().getFullYear(); }
    /* footer year */

    /* Menu nav activation */
    document.addEventListener('DOMContentLoaded', function () {
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        const navLinks = document.querySelectorAll('.main-menu ul li a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === pgurl || link.getAttribute('href') === '') {
                link.classList.add('active');
                let parent = link.closest('li');
                while (parent) {
                    const parentLink = parent.querySelector('a');
                    if (parentLink && !parentLink.classList.contains('active')) {
                        parentLink.classList.add('active');
                    }
                    parent = parent.closest('ul')?.closest('li');
                }
            }
        });
    });

    /* Mobile Menu Js */
    $(document).ready(function () {
        var bdMenuWrap = $('.bd-mobile-menu-active > ul').clone();
        var bdSideMenu = $('.bd-offcanvas-menu nav');
        bdSideMenu.append(bdMenuWrap);
        if ($(bdSideMenu).find('.submenu, .mega-menu').length != 0) {
            $(bdSideMenu).find('.submenu, .mega-menu').parent().append('<button class="bd-menu-close"><i class="fa fa-chevron-right"></i></button>');
        }
        var sideMenuList = $('.bd-offcanvas-menu nav > ul > li button.bd-menu-close, .bd-offcanvas-menu nav > ul li.has-dropdown > a');
        $(sideMenuList).on('click', function (e) {
            e.preventDefault();
            var $this = $(this).parent();
            var $siblings = $this.siblings('li');
            if (!$this.hasClass('active')) {
                /* Close all active submenus */
                $('.bd-offcanvas-menu nav > ul > li> ul > li.active').removeClass('active').children('.submenu, .mega-menu').slideUp();
                /* Open the clicked submenu */
                $this.addClass('active').children('.submenu, .mega-menu').slideDown();
                /* Close the sibling submenus */
                $siblings.removeClass('active').children('.submenu, .mega-menu').slideUp();
            } else {
                /* Close the clicked submenu */
                $this.removeClass('active').children('.submenu, .mega-menu').slideUp();
            }
        });
        /* Sidebar toggle */
        $('.sidebar-toggle .bar-icon').on('click', function () {
            $('.bd-offcanvas-menu').toggleClass('active');
        });
    });

    /* Sidebar Toggle */
    $(".bd-offcanvas-close,.bd-offcanvas-overlay").on("click", function () {
        $(".bd-offcanvas-area").removeClass("info-open");
        $(".bd-offcanvas-overlay").removeClass("overlay-open");
    });
    $(".sidebar-toggle").on("click", function () {
        $(".bd-offcanvas-area").addClass("info-open");
        $(".bd-offcanvas-overlay").addClass("overlay-open");
    });

    /* Body overlay Js */
    $(".body-overlay").on("click", function () {
        $(".bd-offcanvas-area").removeClass("opened");
        $(".body-overlay").removeClass("opened");
    });

    /* Sticky Header Js */
    windowOn.on('scroll', function () {
        var scroll = $(window).scrollTop();
        if (scroll < 250) {
            $("#header-sticky").removeClass("bd-sticky");
        } else {
            $("#header-sticky").addClass("bd-sticky");
        }
    });

    /* Data Css js */
    $("[data-background").each(function () {
        $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
        );
    });
    $("[data-width]").each(function () {
        $(this).css("width", $(this).attr("data-width"));
    });
    $("[data-bg-color]").each(function () {
        $(this).css("background-color", $(this).attr("data-bg-color"));
    });

    /* MagnificPopup image view */
    $(".popup-image").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });

    /* process activation Js */
    $(document).on('mouseover', '.chooseActive', function () {
        $(this).addClass('active');
        $('.chooseActive').removeClass('active');
        $(this).addClass('active');
    });

    /* MagnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /* Nice Select Js */
    $(".bd-sorting-select, .form-select-option, .country-list, .course-level, .course-name, .course-lessons, .course-intro, .input-box-select").niceSelect();

    /* Button scroll up js */
    $(document).ready(function () {
        var progressPath = document.querySelector(".backtotop-wrap path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 150;
        var duration = 550;
        jQuery(window).on("scroll", function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(".backtotop-wrap").addClass("active-progress");
            } else {
                jQuery(".backtotop-wrap").removeClass("active-progress");
            }
        });
        jQuery(".backtotop-wrap").on("click", function (event) {
            event.preventDefault();
            jQuery("html, body").animate({
                scrollTop: 0
            }, parseInt(duration, 10));
            return false;
        });
    });

    /* PureCounter Js */
    new PureCounter();
    new PureCounter({
        filesizing: true,
        selector: ".filesizecount",
        pulse: 2,
    });

    /* radial-progress activation */
    $(document).ready(function () {
        $(window).scroll(function () {
            $('.radial-progress').each(function (i) {
                var bottom_of_object = $(this).offset().top + $(this).outerHeight();
                var bottom_of_window = $(window).scrollTop() + $(window).height();
                if (bottom_of_window > bottom_of_object) {
                    $(this).easyPieChart({
                        lineWidth: 10,
                        scaleLength: 0,
                        rotate: 0,
                        trackColor: false,
                        lineCap: 'round',
                        size: 180,
                        onStep: function (from, to, percent) {
                            $(this.el).find('.count').text(Math.round(percent));
                        }
                    });
                }
            });
        });
        $(window).scroll();
    });

    /*  category slider active 01 */
    var commonCarousel = new Swiper(".categorySliderActive", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: false,
        roundLengths: true,
        pagination: {
            el: ".bd-dots-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".category-nav-next",
            prevEl: ".category-nav-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });

    /*  category slider active 02 */
    var categorySliderActiveTwo = new Swiper(".categorySliderActiveTwo", {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: false,
        roundLengths: true,
        speed: 1000,
        autoplay: false,
        navigation: {
            nextEl: ".category-nav-next",
            prevEl: ".category-nav-prev",
        },
        pagination: {
            el: ".bd-dots-pagination",
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 3,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });

    /*  category slider active 01 */
    var commonCarousel = new Swiper(".categorySliderActiveThree", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        pagination: {
            el: ".bd-dots-pagination",
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /*  category slider active 02 */
    var commonCarousel = new Swiper(".categorySliderActiveFour", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        roundLengths: true,
        pagination: {
            el: ".bd-dots-pagination",
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
        },
    });

    /* countdown activation start */
    $(document).ready(function () {
        function makeTimer(endTime, countdownElementId) {
            var now = new Date();
            now = (Date.parse(now) / 1000);
            var timeLeft = endTime - now;
            if (timeLeft <= 0) {
                clearInterval(timerInterval); // Stop the timer
                $("#" + countdownElementId + " [data-unit='days']").html("00<span>Days</span>");
                $("#" + countdownElementId + " [data-unit='hours']").html("00<span>Hours</span>");
                $("#" + countdownElementId + " [data-unit='minutes']").html("00<span>Minutes</span>");
                $("#" + countdownElementId + " [data-unit='seconds']").html("00<span>Seconds</span>");
                return;
            }
            var days = Math.floor(timeLeft / 86400);
            var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
            var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
            var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
            if (hours < "10") { hours = "0" + hours; }
            if (minutes < "10") { minutes = "0" + minutes; }
            if (seconds < "10") { seconds = "0" + seconds; }
            $("#" + countdownElementId + " [data-unit='days']").html(days + "<span>Days</span>");
            $("#" + countdownElementId + " [data-unit='hours']").html(hours + "<span>Hours</span>");
            $("#" + countdownElementId + " [data-unit='minutes']").html(minutes + "<span>Minutes</span>");
            $("#" + countdownElementId + " [data-unit='seconds']").html(seconds + "<span>Seconds</span>");
        }
        var endTime = new Date("5 August 2025 14:00:00 GMT+06:00");
        endTime = (Date.parse(endTime) / 1000);
        var timerInterval = setInterval(function () {
            makeTimer(endTime, "countdown1");
            makeTimer(endTime, "countdown2");
            makeTimer(endTime, "countdown3");
            makeTimer(endTime, "countdown4");
            makeTimer(endTime, "countdown5");
        }, 1000);
    });
    /* countdown activation end */

    /* Brand Active  start*/
    var brandActivation = new Swiper(".brandActivation", {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        breakpoints: {
            1400: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 3,
            },
            0: {
                slidesPerView: 3,
            },
        },
    });
    /* Brand Active end */

    /* course active start */
    var courseActive = new Swiper(".courseActive", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        pagination: {
            el: '.bd-course-pagination',
            clickable: true,
        },
    });
    /* course active end */

    /* course active start */
    var languageCourseActive = new Swiper(".languageCourseActive", {
        slidesPerView: 4,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: false,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        navigation: {
            nextEl: ".course-navigation-next",
            prevEl: ".course-navigation-prev",
        },
    });
    /* course active end */

    /* testimonial Active 01  start*/
    var testimonialActive = new Swiper(".testimonialActive", {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
        pagination: {
            el: '.bd-testimonial-pagination',
            clickable: true,
        },
    });
    /* testimonial Active 01  end*/

    /* testimonial Active 02  start*/
    var testimonialActiveTwo = new Swiper(".testimonialActiveTwo", {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* testimonial Active 02  end*/

    /* testimonial Active 03  start*/
    $(document).ready(function () {
        const testimonialActiveThree = new Swiper(".testimonialActiveThree", {
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            },
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            navigation: {
                nextEl: ".testimonial-button-next",
                prevEl: ".testimonial-button-prev"
            },
            effect: "slide"
        });
    });
    /* testimonial Active 03  end*/

    /* testimonial Active 04  start*/
    var testimonialSlider = new Swiper('.testimonialActiveFour', {
        slidesPerView: 1,
        spaceBetween: 30,
        observeParents: true,
        observer: true,
        loop: true,
        speed: 1200,
        autoplay: {
            delay: 9500,
        },
        pagination: {
            el: '.bd-testimonial-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: ".testimonial-navigation-next",
            prevEl: ".testimonial-navigation-prev",
        },
        breakpoints: {
            '1200': {
                slidesPerView: 1,
            },
            '992': {
                slidesPerView: 1,
            },
            '768': {
                slidesPerView: 1,
            },
            '576': {
                slidesPerView: 1,
            },
        },
    });
    /* testimonial Active 04  end*/

    /* testimonial Active 05  start*/
    var testimonialActive = new Swiper(".testimonialActiveFive", {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        roundLengths: true,
        autoplay: true,
        speed: 1200,
        pagination: {
            el: '.bd-testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });
    /* testimonial Active 05 end */

    var bdSliderActive = new Swiper('.bdSliderActive', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        autoplay: {
            delay: 5000,
        },
        navigation: {
            nextEl: ".banner-navigation-next",
            prevEl: ".banner-navigation-prev",
        },
    });


    var bookCategorySlider = new Swiper('.bookCategorySlider', {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        navigation: {
            nextEl: ".book-category-next",
            prevEl: ".book-category-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    var bookTradingSlider = new Swiper('.bookTradingSlider', {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        navigation: {
            nextEl: ".book-trading-next",
            prevEl: ".book-trading-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });

    var offerCardActive = new Swiper('.offerCardActive', {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        navigation: {
            nextEl: ".book-book-combo-next",
            prevEl: ".book-book-combo-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            480: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    var preOrderSlider = new Swiper('.preOrderSlider', {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        navigation: {
            nextEl: ".book-pre-order-next",
            prevEl: ".book-pre-order-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });

    var authorActivation = new Swiper('.authorActivation', {
        slidesPerView: 6,
        spaceBetween: 30,
        loop: false,
        centeredSlides: false,
        navigation: {
            nextEl: ".author-next",
            prevEl: ".author-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 6,
            },
            1200: {
                slidesPerView: 6,
            },
            992: {
                slidesPerView: 5,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /* featured js for feature properties */
    if ($('.course-item-load-more').length > 0) {
        $('.grid').imagesLoaded(function () {
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item',
                }
            });
            $('.course-item').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
            $('.course-item button').on('click', function (event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });
            var show_item = $('.course-item-load-more').attr('data-show');
            var count_item = show_item;
            var isotop_call = $grid.data('isotope');
            loadMore(show_item);
            function loadMore(showing) {
                $grid.find(".hidden").removeClass("hidden");
                var hidden = isotop_call.filteredItems.slice(showing, isotop_call.filteredItems.length).map(function (item) {
                    return item.element;
                });
                $(hidden).addClass('hidden');
                $grid.isotope('layout');
                if (hidden.length == 0) {
                    jQuery("#course-load-more").hide();
                } else {
                    jQuery("#course-load-more").show();
                };
            }
            $("#course-load-more").on('click', function () {
                if ($('.course-item').data('clicked')) {
                    count_item = show_item;
                    $('.course-item').data('clicked', false);
                } else {
                    count_item = count_item;
                };
                count_item = count_item + show_item;
                loadMore(count_item);
            });
            $(".course-item").on('click', function () {
                $(this).data('clicked', true);
                loadMore(show_item);
            });
        });
    } else {
        $('.grid').imagesLoaded(function () {
            var $grid = $('.grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item',
                }
            });
            $('.course-item').on('click', 'button', function () {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
            $('.course-item button').on('click', function (event) {
                $(this).siblings('.active').removeClass('active');
                $(this).addClass('active');
                event.preventDefault();
            });
        });
        var show_item_2 = $('.course-load-item-count').attr('data-show');
        $(".featured-load-item").hide();
        $(".featured-load-item").slice(0, show_item_2).show();
        $("body").on('click touchstart', '.load-more', function (e) {
            e.preventDefault();
            $(".course-load-item:hidden").slice(0, show_item_2).slideDown();
            if ($(".course-load-item:hidden").length == 0) {
                $(".load-more").css('display', 'none');
            }
        });
    }

    document.addEventListener('mousemove', function (event) {
        let x = event.clientX;
        let y = event.clientY;
        let xPercent = (x / window.innerWidth) - 0.5;
        let yPercent = (y / window.innerHeight) - 0.5;
        let shapes = document.querySelectorAll('.shape-move img');
        shapes.forEach(function (shape, index) {
            let multiplierX = 40 + index * 2;
            let multiplierY = 40 + index * 2;
            let translateX = xPercent * multiplierX;
            let translateY = yPercent * multiplierY;
            shape.style.transform = `translate(${translateX}px, ${translateY}px)`;
        });
    });

    /* popup search activation */
    $(".bd-search-open-btn").on("click", function () {
        $(".bd-search-popup-area").addClass("bd-search-opened");
        $(".bd-search-overlay").addClass("bd-search-opened");
    });
    $(".bd-search-close-btn").on("click", function () {
        $(".bd-search-popup-area").removeClass("bd-search-opened");
        $(".bd-search-overlay").removeClass("bd-search-opened");
    });
    $(".bd-search-overlay").on("click", function () {
        $(".bd-search-popup-area").removeClass("bd-search-opened");
        $(".bd-search-overlay").removeClass("bd-search-opened");
    });

    /* cart mini Js */
    $(".cartmini-open-btn").on("click", function () {
        $(".bd-sidebar-cart-area").addClass("bd-sidebar-cart-opened");
        $(".body-overlay").addClass("opened");
    });
    $(".cartmini-close-btn").on("click", function () {
        $(".bd-sidebar-cart-area").removeClass("bd-sidebar-cart-opened");
        $(".body-overlay").removeClass("opened");
    });

    /* Body overlay Js  */
    $(".body-overlay").on("click", function () {
        $(".bd-sidebar-cart-area").removeClass("bd-sidebar-cart-opened");
        $(".body-overlay").removeClass("opened");
    });
    document.addEventListener('DOMContentLoaded', function () {
        const gridTrigger = document.querySelector('.bd-grid-filter-trigger');
        const listTrigger = document.querySelector('.bd-list-filter-trigger');
        const gridView = document.querySelector('.display-layout-grid');
        const listView = document.querySelector('.display-layout-list');
        const gridText = document.querySelector('.bd-grid-filter-text');
        const listText = document.querySelector('.bd-list-filter-text');
        if (gridTrigger && listTrigger && gridView && listView && gridText && listText) {
            gridTrigger.addEventListener('click', function () {
                gridView.classList.add('active');
                listView.classList.remove('active');
                gridTrigger.classList.add('active');
                listTrigger.classList.remove('active');
                gridText.classList.add('active');
                listText.classList.remove('active');
            });
            listTrigger.addEventListener('click', function () {
                listView.classList.add('active');
                gridView.classList.remove('active');
                listTrigger.classList.add('active');
                gridTrigger.classList.remove('active');
                listText.classList.add('active');
                gridText.classList.remove('active');
            });
        }
    });

    /*  Show Login Toggle Js */
    $('.bd-filter-btn').on('click', function () {
        $('#filterContent').slideToggle(400);
    });

    $("#show-review-box").on("click", function () {
        $("#review-box").slideToggle(700);
    });

    /* star ratings js */
    let reviewStarElm = $(".bd-ratings-wrapper");
    if (reviewStarElm.length) {
        reviewStarElm.find('i').on('mouseover', function () {
            var onStar = parseInt($(this).data('value'), 10);
            $(this).parent().children('i').each(function (e) {
                if (e < onStar) {
                    $(this).addClass('hover');
                } else {
                    $(this).removeClass('hover');
                }
            });
        }).on('mouseout', function () {
            $(this).parent().children('i').each(function (e) {
                $(this).removeClass('hover');
            });
        });
        reviewStarElm.find('i').on('click', function () {
            var onStar = parseInt($(this).data('value'), 10);
            var stars = $(this).parent().children('i');
            for (let i = 0; i < stars.length; i++) {
                $(stars[i]).removeClass('active');
            }
            for (let i = 0; i < onStar; i++) {
                $(stars[i]).addClass('active');
            }
            var ratingValue = parseInt(reviewStarElm.find('i.active').last().data('value'), 10);
            var msg = 0;
            if (ratingValue > 1) {
                msg = ratingValue;
            } else {
                msg = ratingValue;
            }
            reviewStarElm.find('input[name=rating]').val(msg);
        });
    }

    /* course details sticky menu activation */
    $(document).ready(function () {
        function updateActiveMenu() {
            var scrollPosition = $(window).scrollTop();
            var targetOffset = 325;
            $('.bd-course-menu nav ul li').each(function () {
                var sectionId = $(this).find('a').attr('href');
                var section = $(sectionId);
                if (section.length) {
                    var sectionTop = section.offset().top - targetOffset;
                    var sectionBottom = sectionTop + section.outerHeight();
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        $('.bd-course-menu nav ul li').removeClass('active');
                        $(this).addClass('active');
                    }
                }
            });
        }
        /* Smooth scroll on click */
        $('.bd-course-menu nav ul li a').on('click', function (event) {
            var target = $(this.getAttribute('href'));
            var targetOffset = 325;
            if (target.length) {
                event.preventDefault();
                $('html, body').stop().animate({
                    scrollTop: target.offset().top - targetOffset
                }, 800);
            }
        });
        /* Update active menu on scroll */
        $(window).on('scroll', function () {
            updateActiveMenu();
        });

        /* Initial call to set the active class on page load */
        updateActiveMenu();
    });

    /* Quantity Incases */
    $(document).ready(function () {
        $(".increase").on("click", function () {
            if ($(this).prev().val() < 999) {
                $(this)
                    .prev()
                    .val(+$(this).prev().val() + 1);
            }
        });
        $(".decrease").on("click", function () {
            if ($(this).next().val() > 0) {
                if ($(this).next().val() > 0)
                    $(this)
                        .next()
                        .val(+$(this).next().val() - 1);
            }
        });
    });

    /* custom progress counter */
    document.addEventListener("DOMContentLoaded", function () {
        const progressItems = document.querySelectorAll(".progress-item");
        progressItems.forEach(item => {
            const progressBar = item.querySelector(".progress");
            const percentageElement = item.querySelector(".percentage");
            const targetPercentage = parseInt(progressBar.getAttribute("data-percentage"), 10);
            progressBar.style.width = targetPercentage + "%";
            let count = 0;
            const counter = setInterval(function () {
                if (count <= targetPercentage) {
                    percentageElement.textContent = count + "%";
                    count++;
                } else {
                    clearInterval(counter);
                }
            }, 20);
        });
    });

    $(document).ready(function () {
        $(window).scrollTop(0);
        var navListItems = $('div.bd-form-setup-panel div a'),
            allWells = $('.bd-form-setup-content'),
            allNextBtn = $('.nextBtn'),
            allPrevBtn = $('.prevBtn');
        allWells.hide();
        navListItems.click(function (e) {
            e.preventDefault();
            var $target = $($(this).attr('href')),
                $item = $(this);
            if (!$item.hasClass('disabled')) {
                navListItems.removeClass('bd-step-active');
                $item.addClass('bd-step-active');
                allWells.hide();
                $target.show();
            }
        });
        allPrevBtn.click(function () {
            var curStep = $(this).closest(".bd-form-setup-content"),
                curStepBtn = curStep.attr("id"),
                prevStepSteps = $('div.bd-form-setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

            prevStepSteps.removeAttr('disabled').trigger('click');
        });
        allNextBtn.click(function () {
            var curStep = $(this).closest(".bd-form-setup-content"),
                curStepBtn = curStep.attr("id"),
                nextStepSteps = $('div.bd-form-setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
                curInputs = curStep.find("input[type='text'],input[type='url'],input[type='email'],input[type='password']"),
                isValid = true;
            $(".form-group").removeClass("has-error");
            for (var i = 0; i < curInputs.length; i++) {
                if (!curInputs[i].validity.valid) {
                    isValid = false;
                    $(curInputs[i]).closest(".form-group").addClass("has-error");
                }
            }
            if (isValid) {
                nextStepSteps.removeAttr('').trigger('click');
            }
        });
        $('div.bd-form-setup-panel div a.bd-step-active').trigger('click');
    });

    /* image change activation */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').bdFadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        readURL(this);
    });
    $(document).ready(function () {
        $('a.bd-campus-gallery-thumb').on('click', function (event) {
            event.preventDefault();
            var gallery = $(this).attr('href');
            $(gallery).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                }
            }).magnificPopup('open');
        });
    });

    /* image change activation end */
    var postSliderActivation = new Swiper(".postSliderActivation", {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        allowTouchMove: true,
        observer: true,
        pagination: {
            el: ".bd-post-slider-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".post-navigation-next",
            prevEl: ".post-navigation-prev",
        },
    });

    /* Blog Similar Post Slider */
    var similarArticlesActivation = new Swiper(".similarArticlesActivation", {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        allowTouchMove: true,
        observer: true,
        navigation: {
            nextEl: ".blog-navigation-next",
            prevEl: ".blog-navigation-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    var blogSlideActivation = new Swiper(".blogSlideActivation", {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        loop: false,
        allowTouchMove: true,
        observer: true,
        pagination: {
            el: ".bd-dots-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".blog-navigation-next",
            prevEl: ".blog-navigation-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    var similarProductActivation = new Swiper(".similarProductActivation", {
        slidesPerView: 4,
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        allowTouchMove: true,
        observer: true,
        navigation: {
            nextEl: ".blog-navigation-next",
            prevEl: ".blog-navigation-prev",
        },
        breakpoints: {
            1400: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        },
    });

    /* product active */
    var productDetails = new Swiper(".bd-product-details-nav", {
        spaceBetween: -20,
        slidesPerView: 4,
        centeredSlides: false,
        navigation: {
            nextEl: ".product-details-button-next",
            prevEl: ".product-details-button-prev",
        },
    });

    /* product small thumb active */
    var productDetailsActive = new Swiper(".bd-product-details-active", {
        spaceBetween: 0,
        thumbs: {
            swiper: productDetails,
        },
        navigation: {
            nextEl: ".product-details-button-next",
            prevEl: ".product-details-button-prev",
        },
    });

    /* kindergarten program activation */
    var kindergartenProgramActive = new Swiper(".kindergartenProgramActive", {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: false,
        loop: true,
        allowTouchMove: true,
        observer: true,
        pagination: {
            el: '.bd-testimonial-pagination',
            clickable: true,
        },
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            576: {
                slidesPerView: 1,
            },
            0: {
                slidesPerView: 1,
            },
        },
    });

    /* slider-rang js */
    var slider1 = document.getElementById('slider-range');
    var minValue = 0;
    var maxValue = 2500;
    if ($("#slider-range").length) {
        noUiSlider.create(slider1, {
            start: [0, 1100],
            connect: true,
            range: {
                'min': minValue,
                'max': maxValue
            }
        });

        var amount1 = document.getElementById('amount');
        slider1.noUiSlider.on('update', function (values, handle) {
            amount1.value = "$" + values[0] + " - $" + values[1];
        });

        $('#filter-btn').on('click', function () {
            $('.filter-widget').slideToggle(1000);
        });
    }

    /* row remove activation */
    $(document).ready(function () {
        $('.removeRow').click(function () {
            $(this).closest('tr').remove();
        });
    });

    /* Show Login Toggle Js */
    $('#showlogin').on('click', function () {
        $('#checkout-login').slideToggle(900);
    });

    /* Show Coupon Toggle Js */
    $('#showcoupon').on('click', function () {
        $('#checkout_coupon').slideToggle(900);
    });
    /* checkout-payment-item */
    $('.checkout-payment-item label').on('click', function () {
        $(this).siblings('.checkout-payment-desc').slideToggle(400);

    });

    /* Show Login Toggle Js */
    $('.checkout-login-form-reveal-btn').on('click', function () {
        $('#returnCustomerLoginForm').slideToggle(400);
    });

    /* Show Coupon Toggle Js */
    $('.checkout-coupon-form-reveal-btn').on('click', function () {
        $('#checkoutCouponForm').slideToggle(400);
    });

    /* Create An Account Toggle Js */
    $('#cbox').on('click', function () {
        $('#cbox_info').slideToggle(900);
    });

    /* Shipping Box Toggle Js */
    $('#ship-box').on('click', function () {
        $('#ship-box-info').slideToggle(1000);
    });

    /* Dashboard Sidebar nav activation */
    document.addEventListener('DOMContentLoaded', function () {
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
        const navLinks = document.querySelectorAll('.bd-dashboard-menu ul li a');
        navLinks.forEach(link => {
            if (link.getAttribute('href') === pgurl || link.getAttribute('href') === '') {
                link.classList.add('active');
            }
        });
    });

    /* Student Enroll Chart  */
    if (jQuery("#studentEnrollChart").length > 0) {
        var options = {
            series: [{
                name: 'Student Batch 1',
                data: [31, 60, 50, 71, 55, 90, 100]
            }, {
                name: 'Student Batch 2',
                data: [30, 65, 40, 60, 45, 100, 90]
            }],
            chart: {
                height: 350,
                type: 'area'
            },
            colors: ["#07A169", "#FFB800"],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
                offsetY: 0,
                offsetX: 5,
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 400,
                        cssClass: 'apexcharts-xaxis-label',
                    },
                },
                axisBorder: {
                    show: false
                },
            },
            yaxis: {
                labels: {
                    style: {
                        fontSize: '14px',
                        fontWeight: 100,
                    },
                    formatter: function (y) {
                        return y.toFixed(0) + "k";
                    }
                },
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            },
        };
        var chart = new ApexCharts(document.querySelector("#studentEnrollChart"), options);
        chart.render();
    }

    /* Earnings Graph Chart */
    if (jQuery("#earningsGraphChart").length > 0) {

        var options = {
            series: [{
                name: 'Net Profit',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'Revenue',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            }, {
                name: 'Free Cash Flow',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            chart: {
                type: 'bar',
                height: 350
            },
            colors: ["#07A169", "#FFB800", "#0dcaf0"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$ (thousands)',
                    style: {
                        color: undefined,
                        fontSize: '14px',
                        fontWeight: 600,
                    },
                },
                labels: {
                    style: {
                        fontSize: '12px',
                    },
                },
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return "$ " + val + " thousands"
                    }
                }
            },
        };

        var chart = new ApexCharts(document.querySelector("#earningsGraphChart"), options);
        chart.render();
    }

    /* Courses Analytics Chart */
    if (jQuery("#coursesAnalyticsChart").length > 0) {
        var options = {
            series: [25, 30, 50,],
            chart: {
                type: 'donut',
                width: 320,
            },
            stroke: {
                show: true,
                width: 0,
            },
            dataLabels: {
                style: {
                    colors: ["#fff"],
                    fontSize: '12px',
                    fontWeight: 600,
                },
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle: 360,
                    expandOnClick: true,
                    customScale: 1,
                    donut: {
                        size: '55%',
                        background: '#f7f7f7',
                    },
                }
            },
            labels: ["Pending", "Processing", "Complete"],
            colors: ["#0dcaf0", "#FFB800", "#07A169"],
            legend: {
                show: true,
                position: 'bottom',
                verticalAlign: 'bottom',
                align: 'center',
                fontSize: '14px',
                colors: ["#F7B84B"],
                fontWeight: 400,
                labels: {
                    colors: ["#7C7C7C"],
                },
                markers: {
                    width: 8,
                    height: 8,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    offsetX: -2,
                    offsetY: 0,
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 0
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
        };
        var chart = new ApexCharts(document.querySelector("#coursesAnalyticsChart"), options);
        chart.render();
    }

    /* Quiz Mark Chart */
    if (jQuery("#quizMarkChart").length > 0) {
        var options = {
            series: [30, 30],
            chart: {
                type: 'donut',
                width: 320,
            },
            stroke: {
                show: true,
                width: 0,
            },
            dataLabels: {
                style: {
                    colors: ["#fff"],
                    fontSize: '12px',
                    fontWeight: 600,
                },
            },
            plotOptions: {
                pie: {
                    startAngle: 0,
                    endAngle: 360,
                    expandOnClick: true,
                    customScale: 1,
                    donut: {
                        size: '55%',
                        background: '#f7f7f7',
                    },
                }
            },
            labels: ["Complete Quiz", "Incomplete Quiz"],
            colors: ["#07A169", "#FFB800"],
            legend: {
                show: true,
                position: 'bottom',
                verticalAlign: 'bottom',
                align: 'center',
                fontSize: '14px',
                colors: ["#F7B84B"],
                fontWeight: 400,
                labels: {
                    colors: ["#7C7C7C"],
                },
                markers: {
                    width: 8,
                    height: 8,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    radius: 12,
                    offsetX: -2,
                    offsetY: 0,
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 0
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
        };
        var chart = new ApexCharts(document.querySelector("#quizMarkChart"), options);
        chart.render();
    }

    /* image change activation */
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').bdFadeIn(650); /* corrected from bdFadeIn to fadeIn */
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        readURL(this);
    });

    /* Sidebar js */
    $("#sidebarActive").on("click", function () {
        if (window.innerWidth > 0 && window.innerWidth <= 1199) {
            $(".bd-lesson-content, .bd-lesson-player").toggleClass("open");
        } else {
            $(".bd-lesson-content, .bd-lesson-player").toggleClass("collapsed");
        }
        $(".app-offcanvas-overlay").toggleClass("overlay-open");
    });
    $(".app-offcanvas-overlay").on("click", function () {
        $(".bd-lesson-content, .bd-lesson-player").removeClass("collapsed");
        $(".bd-lesson-content, .bd-lesson-player").removeClass("open");
        $(".app-offcanvas-overlay").removeClass("overlay-open");
    });

    /* Flashlight Effect  */
    document.querySelectorAll(".bg-flashlight").forEach((element) => {
        element.addEventListener("mousemove", (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            element.style.setProperty("--x", `${x}px`);
            element.style.setProperty("--y", `${y}px`);
        });
    });

    /* pricing plan change js */
    document.addEventListener("DOMContentLoaded", function () {
        const yearlyBtn = document.querySelector('.yearly-plan-btn');
        const monthlyBtn = document.querySelector('.monthly-plan-btn');
        const yearlyPricing = document.querySelectorAll('.yearly-pricing');
        const monthlyPricing = document.querySelectorAll('.monthly-pricing');
        if (yearlyBtn && monthlyBtn) {
            /* Show Yearly Pricing */
            yearlyBtn.addEventListener('click', function () {
                yearlyBtn.classList.add('active');
                monthlyBtn.classList.remove('active');
                yearlyPricing.forEach(el => (el.style.display = 'none'));
                monthlyPricing.forEach(el => (el.style.display = 'block'));
            });

            /* Show Monthly Pricing */
            monthlyBtn.addEventListener('click', function () {
                monthlyBtn.classList.add('active');
                yearlyBtn.classList.remove('active');
                yearlyPricing.forEach(el => (el.style.display = 'block'));
                monthlyPricing.forEach(el => (el.style.display = 'none'));
            });
        }
    });

    /* bd-program-details-active Slider Js */
    var programDetails = new Swiper('.bd-program-details-active', {
        slidesPerView: 1,
        spaceBetween: 24,
        observeParents: true,
        observer: true,
        loop: true,
        navigation: {
            nextEl: ".bd-program-details-next",
            prevEl: ".bd-program-details-prev",
        },
    });

    var bookSlider = new Swiper(".bookSlider", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true,
        },
        keyboard: {
            enabled: true
        },
        mousewheel: {
            thresholdDelta: 70
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        autoplay: true,
        breakpoints: {
            1400: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 4,
            },
            768: {
                slidesPerView: 3,
            },
            576: {
                slidesPerView: 2,
            },
            480: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 2,
            },
        }
    });

})(jQuery);