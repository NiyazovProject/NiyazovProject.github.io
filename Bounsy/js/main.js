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
        	'width' : '140',
        	'height' : '140',
        	'readOnly' : true,
        	'thickness' : 0.06,
          'font' : 'OpenSans',
        	'bgColor' : '#047378',
        	'fgColor' : '#19bd9a',
        	'format' : function (value) {
        		return value + '%';
        	}
        });
 });


$(".dial").knob();
  $({animatedVal: 0}).animate({animatedVal: 70}, {
    duration: 2000,
    easing: "swing",
  step: function() {
    $(".dial").val(Math.ceil(this.animatedVal)).trigger("change");
  }
  });


