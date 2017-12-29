$(document).ready(function() {


	 //Tabs-btn

		$("#tab-btn").click(function(e) {
	 	e.preventDefault();
	 	 $("#one").css('display', 'none');
	 	 $("#two").css('display', 'block');
	 	 $("#tab-btn").addClass('active');
	 	$("#tab-btns").removeClass('active');
	 });

		$("#tab-btns").click(function(e) {
	 	e.preventDefault();
	 	 $("#two").css('display', 'none');
	 	 $("#one").css('display', 'block');
	 	 $("#tab-btn").removeClass('active');
	 	$("#tab-btns").addClass('active');
	 });

	//Tabs-btn-end
	
});