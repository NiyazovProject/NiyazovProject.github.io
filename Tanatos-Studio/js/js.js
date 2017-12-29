$(document).ready(function(){
 var link = $('.menu-link');
 var link_active = $('.menu-link_active');
 var menu = $('.menu');



  link.click(function(){
    link.toggleClass('menu-link__active');
    menu.toggleClass('menu_active');
  });

  link_active.click(function(){
  	link.remoClass(menu-link_active);
  })

 });


$(document).ready(function(){
  $('.slick-slider').slick({
     prevArrow: $('.prev'),
     nextArrow: $('.next'),
  });
});


$(document).ready(function() {

  $("#form").submit(function() {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
      $("#form").trigger("reset");
    });
    return false;
  });
  
});






$('.center').slick({
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
        slidesToShow: 3
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



$(document).ready(function(){
    $("#csc").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
 
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop:top}, 1500);
 });
});
