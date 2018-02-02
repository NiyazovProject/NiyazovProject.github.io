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

//progress-bar
$(function() {

        $(".dial").knob({
        	'cursor': 0,
        	'width' : '130',
        	'height' : '130',
        	'readOnly' : true,
        	'thickness' : 0.08,
          'font' : 'OpenSans',
        	'bgColor' : '#047378',
        	'fgColor' : '#19bd9a',
        	'format' : function (value) {
        		return value + '%';
        	}
        });

        $(".dia2").knob({
        	'cursor': 0,
        	'width' : '130',
        	'height' : '130',
        	'readOnly' : true,
        	'thickness' : 0.08,
          'font' : 'OpenSans',
        	'bgColor' : '#047378',
        	'fgColor' : '#19bd9a',
        	'format' : function (value) {
        		return value + '%';
        	}
        });

        $(".dia3").knob({
        	'cursor': 0,
        	'width' : '130',
        	'height' : '130',
        	'readOnly' : true,
        	'thickness' : 0.08,
          'font' : 'OpenSans',
        	'bgColor' : '#047378',
        	'fgColor' : '#19bd9a',
        	'format' : function (value) {
        		return value + '%';
        	}
        });

 });


$(window).scroll(
	function() {
		var start = $(".our-services").offset().top -400;


		if($(this).scrollTop() > start)
        if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
			var currentNumber = $(".dial").val();
			$({numberValue: currentNumber}).animate({numberValue: 60}, {
				duration: 3500,
				easing: "linear",
				step: function() {
					$(".dial").val(Math.ceil(this.numberValue)).trigger("change");
				}
			});
		}

         
        if($(this).scrollTop() > start)
        if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
            var currentNumber = $(".dia2").val();
            $({numberValue: currentNumber}).animate({numberValue: 75}, {
                duration: 3500,
                easing: "linear",
                step: function() {
                    $(".dia2").val(Math.ceil(this.numberValue)).trigger("change");
                }
            });
        }

		
        if($(this).scrollTop() > start)
        if ((($(this).scrollTop() > start)&($(this).scrollTop() < start+200))) {
            var currentNumber = $(".dia3").val();
            $({numberValue: currentNumber}).animate({numberValue: 80}, {
                duration: 3500,
                easing: "linear",
                step: function() {
                    $(".dia3").val(Math.ceil(this.numberValue)).trigger("change");
                }
            });
        }

	}
	);



// slick-slider 

 $(document).ready(function(){
  $('.slick-slider').slick({
     prevArrow: false,
     nextArrow: false,
     dots: true,
  });
});






$(document).ready(function(){
    $("#csc").on("click", function (event) {
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


  





