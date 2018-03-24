$(function() {
	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });
	
});

/* Popup */


$('.close-popup').click(function() {
	$('.popup-body').fadeOut(200);
	$('.popup-body').removeClass('popup-visible');
	$('body').removeClass('is-popup');
})


$('.sign-up_button').click(function() {
	$('.postal-code-popup').fadeIn(200);
	$('.postal-code-popup').addClass('popup-visible');
	$('body').addClass('is-popup');
});

$('.submit-property-btn').click(function() {
	$('.last-step-popup').fadeIn(200);
	$('.last-step-popup-window').fadeIn(200);
	$('.last-step-popup').addClass('popup-visible');
	$('body').addClass('is-popup');
	$('.submitted-window').hide();
});

$('.submit-last-step').click(function() {
	$('.last-step-popup-window').fadeOut(200);
	$('.submitted-window').fadeIn(200);
});



/* Select Styles*/
$(function() {

  $('.profile-country').styler();

});

$('.db-sb_toggle').click(function() {
	$('.db-sb').toggleClass('nav-open');
	$('.db-sb_nav').slideToggle(200);

});

/* Messages */

$('.open-conv').click(function(){
	$(this).toggleClass('open');
	$('.db_messages-users_body').slideToggle(200);
});

/*mobile nav*/


var widthIndex = 0;

if ($(window).width() < 992) {
	$('.mobile-tgl').click(function(){
		$('.header_nav').fadeToggle(200);
	});

	$(document).click(function(event) {
	    if (!$(event.target).is(".mobile-tgl, .header_nav-item, span")) {
	        $('.header_nav').fadeOut(200);
	    }
	});
} else {
	widthIndex = 1;
}

$(window).on('resize', function() {
    if (!widthIndex) {
        if ($(window).width() < 992) {
            $('.mobile-tgl').click(function(){
				$('.header_nav').fadeToggle(200);
			});

			$(document).click(function(event) {
			    if (!$(event.target).is(".mobile-tgl, .header_nav-item, span")) {
			        $('.header_nav').fadeOut(200);
			    }
			});
        }
    }
});
