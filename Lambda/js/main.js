//btn-adaptive-menu
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

	//btn-adaptive-menu end

	$(document).ready(function() {
		new WOW().init();
		$('.header-content .h1').addClass('wow fadeInUp'); 
		$('.about__left').addClass('wow fadeInLeft'); 
		$('.about__right').addClass('wow fadeInRight'); 
		$('.main-block').addClass('wow fadeInLeft'); 
		$('.menu-block').addClass('wow fadeInUp'); 
		$('.reviews__main-block').addClass('wow fadeInUp'); 
		$('.reserve__img-block').addClass('wow fadeInLeft'); 
		$('.reserve__content-block').addClass('wow fadeInRight'); 

  
})




