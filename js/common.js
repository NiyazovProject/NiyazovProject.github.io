//Sticky-header
/*  $(window).scroll(function(){
    if ($(window).scrollTop() >=91 ){
       $('.header-wr').addClass('header-wr _sticky');
        $('.header').css("min-height", "0"), ("border-bottom", "0px");
    }
    else {
       $('._sticky').addClass('header-wr').removeClass('_sticky');
    }
      if ($(window).scrollTop() >=91 ){
       $('.company-wr').addClass('-m');
    }
     else {
       $('.-m').addClass('company-wr').removeClass('-m');
    }
});*/




//open-maps-function

window.onload= function() {
    document.getElementById('js_maps_btn').onclick = function() {
        openbox('box', this);
        return false;
    };
};
function openbox(id, toggler) {
    var div = document.getElementById(id);
    var toggler =  document.getElementById('toggler');
    var iconDown =  document.getElementById('js-icon-down');
    var iconUp =  document.getElementById('js-icon-up');
  

    if(iconDown.style.display == 'none') {

        iconDown.style.display = 'inline';
        iconUp.style.display = 'none';

    }

    if(div.style.display == 'block') {
        div.style.display = 'none';
        toggler.innerHTML = 'Развернуть карту';
    }
    else {
        div.style.display = 'block';
        toggler.innerHTML = 'Свернуть карту';
        iconDown.style.display = 'none';

        iconUp.style.display = 'inline';
    }

};

/*(function(){
  var stHeader = $('.js-sticky-header');
  var content = $('.main-content');

  content.waypoint(function(direction) {
    if(direction==="down") {
      stHeader.addClass('visible');
    } else if(direction==="up") {
      stHeader.removeClass('visible');
    }
  });
})();
*/


$(".js-menu-btn").click(function () {
        $("body").toggleClass("m-open" );
    });



