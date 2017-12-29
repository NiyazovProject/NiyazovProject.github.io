/** Валидация **/

$(document).ready(function(){
	
	$ajax_submit_1 = false;
	$ajax_submit_2 = false;
	$ajax_submit_3 = false;
	$ajax_submit_4 = false;
	
	$(".ajax_form_1").validate({
		submitHandler: function(form) {
			$ajax_submit_1 = true;
		},
		rules:{
			'name1':{
				required: true
			},
			'phone1':{
				required: true
			}
		},
		messages:{
			'name1':{
				required: "<div class='error'>Не введено значение</div>"
			},
			'phone1':{
				required: "<div class='error'>Не введено значение</div>"
			}
		}

	});
	
	var ajax_submit_1 = {
		target: "",
		url: "./send1.php",
		success: function() { 
			$('#form1').trigger("reset");
			$('.block_7 .success').removeClass('hidden');
			setTimeout (function(){
				$('.block_7 .success').addClass('hidden');
			}, 2000);
		}
	};
	
	$('.ajax_form_1').submit(function(){
		if($ajax_submit_1){ 
			$(".ajax_form_1").ajaxSubmit(ajax_submit_1);
		}	
		return false;
	}); 
	
	//
	
	$(".ajax_form_2").validate({
		submitHandler: function(form) {
			$ajax_submit_2 = true;
		},
		rules:{
			'name2':{
				required: true
			},
			'phone2':{
				required: true
			}
		},
		messages:{
			'name2':{
				required: "<div class='error'>Не введено значение</div>"
			},
			'phone2':{
				required: "<div class='error'>Не введено значение</div>"
			}
		}

	});
	
	var ajax_submit_2 = {
		target: "",
		url: "./send2.php",
		success: function() { 
			$('#form2').trigger("reset");
			$('.contact_txt .success').removeClass('hidden');
			setTimeout (function(){
				$('.contact_txt .success').addClass('hidden');
			}, 2000);
		}
	};
	
	$('.ajax_form_2').submit(function(){
		if($ajax_submit_2){ 
			$(".ajax_form_2").ajaxSubmit(ajax_submit_2);
		}	
		return false;
	}); 
	
	//
	
	$(".ajax_form_3").validate({
		submitHandler: function(form) {
			$ajax_submit_3 = true;
		},
		rules:{
			'name3':{
				required: true
			},
			'phone3':{
				required: true
			}
		},
		messages:{
			'name3':{
				required: "<div class='error'>Не введено значение</div>"
			},
			'phone3':{
				required: "<div class='error'>Не введено значение</div>"
			}
		}

	});
	
	var ajax_submit_3 = {
		target: "",
		url: "./send3.php",
		success: function() { 
			$('#form3').trigger("reset");
			$('.modal .success').removeClass('hidden');
			setTimeout (function(){
				$('#form_order').modal('hide');
				$('.modal-backdrop').removeClass('in');
				$('.modal .success').addClass('hidden');
			}, 3000);
		}
	};
	
	$('.ajax_form_3').submit(function(){
		if($ajax_submit_3){ 
			$(".ajax_form_3").ajaxSubmit(ajax_submit_3);
		}	
		return false;
	}); 
	
	//
	
	$(".ajax_form_4").validate({
		submitHandler: function(form) {
			$ajax_submit_4 = true;
		},
		rules:{
			'name4':{
				required: true
			},
			'phone4':{
				required: true
			}
		},
		messages:{
			'name4':{
				required: "<div class='error'>Не введено значение</div>"
			},
			'phone4':{
				required: "<div class='error'>Не введено значение</div>"
			}
		}

	});
	
	var ajax_submit_4 = {
		target: "",
		url: "./send4.php",
		success: function() { 
			$('#form4').trigger("reset");
			$('.modal .success').removeClass('hidden');
			setTimeout (function(){
				$('#form_order2').modal('hide');
				$('.modal-backdrop').removeClass('in');
				$('.modal .success').addClass('hidden');
			}, 3000);
		}
	};
	
	$('.ajax_form_4').submit(function(){
		if($ajax_submit_4){ 
			$(".ajax_form_4").ajaxSubmit(ajax_submit_4);
		}	
		return false;
	}); 
	
});