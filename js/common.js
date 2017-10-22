/*

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

    */ 

 // var slideout = new Slideout({
 //    'panel': document.getElementById('panel'),
 //    'menu': document.getElementById('menu'),
 //    'padding': 256,
 //    'tolerance': 70
 //  });
    

  $(window).scroll(function(){
    if ($(window).scrollTop() >=91 ){
       $('.header-wr').addClass('header-wr_sticky').removeClass('header-wr');
    }
    else {
       $('.header-wr_sticky').addClass('header-wr').removeClass('header-wr_sticky');
    }
});

/*
$(".menu-link").click(function(){
  
  $("html").addClass("openNav");
  
});
  
$(".close-panel, section").click(function(){
  
$("html").removeClass("openNav");
  
});*/


$(document).ready(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open-sidebar");
  });
});