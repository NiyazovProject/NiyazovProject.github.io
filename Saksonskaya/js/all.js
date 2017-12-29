$(document).ready(function(){
	
	$(".phone1").mask("+7 (999) 999-99-99");
	$(".phone2").mask("+7 (999) 999-99-99");
	$(".phone3").mask("+7 (999) 999-99-99");
	
	Shadowbox.init({
		handleOversize: "resize",
		modal: false,
		continuous: true,
		enableKeys: true  
	});
	
	$('.select_block span').click(function(){
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		return false;
	});
	
	$('.checks_block span').click(function(){
		$(this).toggleClass('active');
		return false;
	});

});