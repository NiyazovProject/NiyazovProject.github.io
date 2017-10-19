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

 var slideout = new Slideout({
    'panel': document.getElementById('panel'),
    'menu': document.getElementById('menu'),
    'padding': 256,
    'tolerance': 70
  });
    

    $(document).ready(function(){
 
        var $menu = $(".header-wr");
 
        $(window).scroll(function(){
            if ( $(this).scrollTop() > 100 && $menu.hasClass("header-wr_sticky") ){
                $menu.removeClass("header-wr_sticky").addClass("fixed");
            } else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed").addClass("header-wr_sticky");
            }
        });//scroll
    });