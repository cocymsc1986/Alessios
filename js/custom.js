$(document).ready(function() {         
    
    // header
    var stickyHeader = function() {
        
        var headerPos = $('header').offset();
        headerPosTop = headerPos.top;
        
        if ($(window).scrollTop() > 70) {
            $('header').addClass('sticky');
            $('nav:not(.mobile-menu-control)').addClass('sticky');
            $('body').addClass('fixed');
        } else {
            $('header').removeClass('sticky');
            $('nav:not(.mobile-menu-control)').removeClass('sticky');
            $('body').removeClass('fixed');
        }
        
        if ($(window).scrollTop() > 20) {
           $('nav.mobile-menu-control').addClass('sticky');
        } else {
           $('nav.mobile-menu-control').removeClass('sticky'); 
        }
    }
    
    $(window).scroll(function() {
        stickyHeader();  
    });
    
    //mobile menu
    var mobileMenuReveal = function() {
        if($('.mobile-menu-control').hasClass('open')) {
            $('.mobile-menu-control').removeClass('open');
            $('body').removeClass('no-overflow');
        } else {
            $('.mobile-menu-control').addClass('open');
            $('body').addClass('no-overflow');
        }
    }
    
    $('.mobile-menu-button').click(function() {
        mobileMenuReveal();    
    })
    
    // teatime special lightbox
    var setLightboxPos = function() {
        if ($('.meal-deal').hasClass('open')) {
            var boxHeight = $('.meal-deal-content').height();
            var boxWidth = $('.meal-deal-content').width();
            var view_x = $(window).width();
            var view_y = $(window).height();

            var posLeft = (view_x/2) - (boxWidth/2);
            var posTop = (view_y/2) - (boxHeight/2);

            $('.meal-deal-content').css({
                'left' : posLeft,
                'top' : posTop
            });
        } else {
            $('.meal-deal-content').css({
                'left' : '-100%'
            })
        }
    }
    
    var toggleLightbox = function() {
        if($('.meal-deal').hasClass('open')) {
            $('.meal-deal').removeClass('open');
            setLightboxPos();
        } else {
            $('.meal-deal').addClass('open');
            setLightboxPos();
        }
    }
    
    $('a.meal-deal-tab').click(function(event) {
        event.preventDefault();
        toggleLightbox();
    });
    
    $('.meal-deal-bg, .close').click(function() {
        toggleLightbox();
    })
    
    $(document).keyup(function(e) {
        if (e.keyCode == 27 && $('.meal-deal').hasClass('open')) {
           toggleLightbox(); 
        }
    });
    
    // menu page
    var initMenu = function() {
        $('.menu-option-content').slideUp();
    }
    
    var menuReveal = function(header) {
        var content = $(header).siblings('.menu-option-content');
        var icon = $(header).find('i');
        
        if(content.is(':visible')) {
            content.slideUp();
            $(header).find('i').removeClass('icon-minus-text');
            $(header).find('i').addClass('icon-plus-text');
        } else {
            content.slideDown();
            $(header).find('i').removeClass('icon-plus-text');
            $(header).find('i').addClass('icon-minus-text');
        }   
    };
    
    $('.menu-option h2').click(function() {
         menuReveal(this);
    });
    
    initMenu();
});