//menu-slide-toogle//
$(document).ready(function() {
  $('.menu-link').click(function() {
    $('.nav').slideToggle(300);
  });//end slide toggle
  
  $(window).resize(function() {		
    if (  $(window).width() > 300 ) {			
     $('.nav').removeAttr('style');
   }
 });

});


$(document).ready(function() {
  $('.maps__btn').click(function() {
    $('.maps__full').slideToggle(500);
  });//end slide toggle
  
  $(window).resize(function() {    
    if (  $(window).width() > 500 ) {     
      $('.maps__full').removeAttr('style');
    }
  });

});




//menu-hamburg-toogle//
$(document).ready(function() {
	var link = $('.menu-link');
	var link_active = $('.menu-link__active');

	link.click(function(){
    link.toggleClass('menu-link__active');
    
  });

  link_active.click(function(){
  	link.remoClass(menu-link_active);
  })
});


//fixed-menu//
var options = {
  offset: 0
}
var header = new Headhesive('.header-wr',options);
//fixed-menu-end//



//дожидаемся полной загрузки страницы
window.onload = function () {

    //получаем идентификатор элемента
    var a = document.getElementById('btn-text');
    
    //вешаем на него событие
    a.onclick = function() {
        //производим какие-то действия
        if (this.innerHTML=='Развернуть карту') this.innerHTML = 'Свернуть карту';
        else this.innerHTML = 'Развернуть карту';
        //предотвращаем переход по ссылке href
        return false;
      }
    }

