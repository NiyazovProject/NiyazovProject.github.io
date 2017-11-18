$(".open-panel").click(function(){
  
  $("html").addClass("openNav");
  $("nav").css("display", "block");
  
});
	
$(".close-panel, #content").click(function(){

$("html").removeClass("openNav");

  
});