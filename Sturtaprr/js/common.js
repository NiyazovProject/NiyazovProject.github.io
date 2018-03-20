$(function() {

//btm-mnu-click-animate
	$(".btn_mnu").click(function() {
		$(this).toggleClass("active");
	});

//btn-mnu-navbar-function
	$(".btn_mnu").click(function() {
		$(".nav__list").slideToggle(300, function(){
			if($(this).css('display') === 'none'){
				$(this).removeAttr('style');
			}
		});
	});

//navbar-sticky-function
var navPos, winPos, navHeight;

function refreshVar() {
	navPos = $('.header__navbar').offset().top;
	navHeight = $('.header__navbar').outerHeight(true);
}

refreshVar();
$(window).resize(refreshVar);

$('<div class="clone-nav"></div>').insertBefore('.header__navbar').css('height', navHeight).hide();

$(window).scroll(function() {
	winPos = $(window).scrollTop();

	if (winPos >= navPos) {
		$('.header__navbar').addClass('fixed shadow');  
		$('.clone-nav').show();
	}  
	else {
		$('.header__navbar').removeClass('fixed shadow');
		$('.clone-nav').hide();
	}
});

//procent-dia-animation
$(".dia3, .dia1, .dia2").knob({
	'cursor': 0,
	'width' : '130',
	'height' : '130',
	'readOnly' : true,
	'thickness' : 0.08,
	'font' : 'OpenSans',
	'bgColor' : ' #ebebeb',
	'fgColor' : '#00a99d',
	'format' : function (value) {
		return value + '%';
	}
});

//Masonry-Gallery
var $container = $(".masonry-container");
$container.imagesLoaded(function () {
	$container.masonry({
		columnWidth: ".item",
		itemSelector: ".item"
	});
	$(".item").imagefill();
});

//slick-slider

$('.slick-slider').slick({
  centerMode: true,
  centerPadding: '60px',
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        autoplay: true
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});


});


//animate-wow-js

window.onload = function() {
  wow = new WOW(
{
  boxClass:     'wow',      // default
  animateClass: 'animated', // default
  offset:       0,          // default
  mobile:       true,       // default
  live:         true        // default
}
)
	wow.init();
	$('.offer-item').addClass('wow fadeInUp'); 
	$('.img-block').addClass('wow fadeInUp'); 
	$('.offer-item .h3').addClass('wow fadeInLeft'); 
	$('.offer-item .p').addClass('wow fadeInRight'); 
	$('.offer-item__btn').addClass('wow fadeInDown'); 
	$('.features-item').addClass('wow fadeInDown'); 
	$('.features-img-block').addClass('wow fadeInRight'); 
	$('.facts-item').addClass('wow fadeInUp'); 

};

onload();

$(window).scroll(
	function() {
		var start = $(".skills").offset().top -700;


		if($(this).scrollTop() > start)
			if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
				var currentNumber = $(".dia1").val();
				$({numberValue: currentNumber}).animate({numberValue: 72}, {
					duration: 3500,
					easing: "linear",
					step: function() {
						$(".dia1").val(Math.ceil(this.numberValue)).trigger("change");
					}
				});
			}
			if($(this).scrollTop() > start)
				if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
					var currentNumber = $(".dia2").val();
					$({numberValue: currentNumber}).animate({numberValue: 98}, {
						duration: 3500,
						easing: "linear",
						step: function() {
							$(".dia2").val(Math.ceil(this.numberValue)).trigger("change");
						}
					});
				}

				if($(this).scrollTop() > start)
					if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
						var currentNumber = $(".dia3").val();
						$({numberValue: currentNumber}).animate({numberValue: 63}, {
							duration: 3500,
							easing: "linear",
							step: function() {
								$(".dia3").val(Math.ceil(this.numberValue)).trigger("change");
							}
						});
					}

				});