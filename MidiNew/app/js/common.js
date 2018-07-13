$(function() {

	$('.top-slider .slick-slider').slick({
		dots: false,
		autoPlay: true,
		arrows: false,
		speed: 500,
	});


//menu-btn
	$(".btn_mnu").click(function() {
		$(this).toggleClass("active");
	});
	$(".btn_mnu").click(function() {
		$(".nav").slideToggle(300, function(){
			if($(this).css('display') === 'none'){
				$(this).removeAttr('style');
			}

		});
	});

//v-slider
	$('.v-slider .slick-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		autoplaySpeed: 1800,
		touchMove: true,
		arrows: true,
		prevArrow: '<img src="img/icon/arrow-red.svg" class="arrow-prev" alt="/"> ',
		nextArrow: '<img src="img/icon/arrow-red.svg" class="arrow-next" alt="/">',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: true
				}
			}
			// You can unslick at a given breakpoint now by adding:
			// settings: "unslick"
			// instead of a settings object
		]
	});


});
