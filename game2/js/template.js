var statusMoveHelp = false;
var item_active = 1;
var exit_page3 = false;
var guide_arm = {
	1:{
		start:{
			top:"31%",
			left:"77%"
		},
		end:{
			top:"16%",
			left:"52%"
		},
		mirror: 1
	},
	2:{
		start:{
			top:"78%",
			left:"81%"
		},
		end:{
			top:"31%",
			left:"77%"
		},
		mirror: 1
	},
	3:{
		start:{
			top:"80%",
			left:"57%"
		},
		end:{
			top:"77%",
			left:"94%"
		},
		mirror: -1
	},
	4:{
		start:{
			top:"82%",
			left:"9%"
		},
		end:{
			top:"80%",
			left:"57%"
		},
		mirror: -1
	},
	5:{
		start:{
			top:"47%",
			left:"16%"
		},
		end:{
			top:"82%",
			left:"-4%"
		},
		mirror: 1
	},
	6:{
		start:{
			top:"17%",
			left:"53%"
		},
		end:{
			top:"47%",
			left:"16%"
		},
		mirror: 1
	}
};
console.log(guide_arm);
$(function()
	{
		$(".action_view_page-2").click(func_action_view_page2);
		$(".action_view_page-3").click(func_action_view_page3);
		$(".action_view_page-4").click(func_action_view_page4);
		$(".action_view_helper").click(func_view_helper);
		$(".action_closed_result").click(func_result_window_closed);
		$(".action_view_helper2").click(func_view_helper2);
		$(".action_view_window_i").click(action_view_window_i);
		$(".action_closed_i").click(action_closed_i);
		$(".action_view_window_i2").click(action_view_window_i2);
		$(".action_closed_i2").click(action_closed_i2);
		//$(".page-3").on("tap",".item.vibro", func_smart_active_red);

		$(".action_view_helper3").click(func_view_helper3);
		//$(".action_reboot").click(action_reboot);
		//$(".content .page-3 .contic .item").click(func_smart_active_red);

		$( ".content .page-3 .contic .item" ).each(function( index ) {
			var id = $(this).attr("data-id");
			$(".content .page-3 .contic .item-" + id).on("touchstart mousedown", function (event) {
				$(".content .page-3 .contic .item-"+id).addClass("click");
				func_smart_active_red(this);
				//console.log(event);
				//if (event.which == 1)
					{$(document).on("touchmove mousemove", function (event) { moved(event, id) }); event.preventDefault();}
			});
		});
	});
function pf_animate(element,action)
	{
		if(action=="show")
			{
				$(element).css("opacity",0).show().animate({opacity:1},400);
			}
		else
			{
				$(element).animate({opacity:0},400,function(){$(element).hide();});
			}
	}
function action_reboot()
	{
		window.location.href = "/game2/";
	}
function func_smart_active_red(element)
	{
		if($(element).is(".vibro"))
			{
				$(element).addClass("active_red");
				if($(".item.active_red").length>=2)
					{
						//$(".content .page-3 .info-vibro2").show(300);
						pf_animate(".page-3 .info-vibro2","show");
						$(".page-3 .result-window-button").click(function(){
							//$(".page-3 .info-window2").show(300);
							$(".content .page-3 .contic .item.smart").addClass("active_red");
							setTimeout(function(){pf_animate(".page-3 .info-window2","show");},3000);
						});
					}
			}
		return false;
	}
function func_view_helper3()
	{
		func_start_vibro_smart3();
		$(".content .page-3 .guide-arm-number").show(300);
		//$(".content .page-3 .info-vibro2").hide(300);
		pf_animate(".page-3 .info-vibro2","hide");
	}
function func_action_view_page2()
	{
		//$(".content .page").hide(300);
		//$(".content .page-2").show(300);
		pf_animate(".content .page-1","hide");
		pf_animate(".content .page-2","show");
		return false;
	}
function func_action_view_page3()
	{
		//$(".content .page").hide(300);
		//$(".content .page-3").show(300);

		pf_animate(".content .page-2","hide");
		pf_animate(".content .page-3","show");
		setTimeout(func_info_window_view,1000,1);
		return false;
	}
function func_action_view_page4()
	{
		//$(".content .page").hide(300);
		//$(".content .page-4").show(300);

		pf_animate(".page-3","hide");
		pf_animate(".page-4","show");
		return false;
	}
function func_info_window_view(item)
	{
		if(item >= item_active && !exit_page3)
			{
				//$(".content .page-3 .info-window").show(300);
				pf_animate(".content .page-3 .info-window","show");
				$(".content .page-3 .guide-"+item).show(300);
			}
	}
function func_result_window_view()
	{
		//$(".content .page-3 .result-window").show(300);
		//$(".content .page-3 .result-window-button").show(300);

		pf_animate(".content .page-3 .result-window","show");
		pf_animate(".content .page-3 .result-window-button","show");
	}
function func_result_window_closed()
	{
		pf_animate(".content .page-3 .result-window","hide");
		//$(".content .page-3 .result-window").hide(300);
		$(".content .page-3 .result-window-button").css("transform","scale(0.4)").animate({top:"1%",left:"76%"},500);
		$(".content .page-3 .result-window").remove();
		setTimeout(func_start_vibro_smart,2000);
		setTimeout(func_start_vibro_smart2,3000);
	}
function func_start_vibro_smart()
	{
		$(".page-3 .contic .item-2").addClass("vibro");
	}
function func_start_vibro_smart2()
	{
		pf_animate(".page-3 .info-vibro","show");
		//$(".page-3 .info-vibro").show(300);
	}
function func_view_helper()
	{

		pf_animate(".content .page-3 .info-window","hide");
		//$(".content .page-3 .info-window").hide(300);
		$(".content .page-3 .guide").hide(300);
		$(".content .page-3 .guide-arm").show(300);
		statusMoveHelp = true;
		func_move_guidearm();
	}
function func_view_helper2()
	{
		//$(".content .page-3 .info-vibro").hide(300);
		pf_animate(".content .page-3 .info-vibro","hide");
		$(".content .page-3 .guide-arm").removeClass("vibro").addClass("move").css({"top":"31%","left":"73%","opacity":1,"transform":"scaleX(1)"}).show(300);
		$(".content .page-3 .info-vibro").remove();
		setTimeout(func_start_vibro_smart3,2000);
	}
function func_start_vibro_smart3()
	{
		$(".content .page-3 .guide-arm").hide();
		$(".page-3 .contic .item-2").removeClass("active_red").addClass("vibro");
		$(".page-3 .contic .item-4").removeClass("active_red").addClass("vibro");
		$(".page-3 .contic .item-6").removeClass("active_red").addClass("vibro");
	}
function action_view_window_i()
	{
		//$(".page-3 .info-window-i").show(300);
		pf_animate(".page-3 .info-window-i","show");
		return false;
	}
function action_closed_i()
	{
		//$(".page-3 .info-window-i").hide(300);
		pf_animate(".page-3 .info-window-i","hide");
		return false;
	}
function action_view_window_i2()
	{
		//$(".page-4 .info-window-i2").show(300);
		pf_animate(".page-4 .info-window-i2","show");
		return false;
	}
function action_closed_i2()
	{
		//$(".page-4 .info-window-i2").hide(300);
		pf_animate(".page-4 .info-window-i2","hide");
		return false;
	}
function func_move_guidearm()
	{

		if(statusMoveHelp)
			{
				var element = $(".content .page-3 .guide-arm");
				element.css({"opacity":"1","transform":"scaleX("+guide_arm[item_active].mirror+")","top":guide_arm[item_active].end.top,"left":guide_arm[item_active].end.left}).animate({top:guide_arm[item_active].start.top,left:guide_arm[item_active].start.left},1000,function(){
					element.animate({opacity:0},300,function(){
						setTimeout(function(){
							element.css({"top":guide_arm[item_active].end.top,"left":guide_arm[item_active].end.left})
						},400);
					});
				});

				setTimeout(func_move_guidearm,2500);
			}
	}

function moved(event,item)
	{
		//console.log(event);
		//if (event.which != 1)
			{
			//	console.log("mouse up");
			//	removeEventListener("touchmove", moved);
			}
		//else
			{
				if(item_active==item)
					{
						item = item*1;
						var i_next = item+1;
						if(i_next == 7){
							i_next = 1;
							exit_page3=true;
							$(".content .page-3 .info-window").remove();
							$(".content .page-3 .guide").remove();
						}
						var position_next = $(".content .page-3 .contic .item-"+i_next).offset();
						var i_active = $(".content .page-3 .contic .item-"+item);
						//console.log(".content .page-3 .contic .item-"+i_next);
						//console.log("next",position_next.top,position_next.left);
						//console.log("active",event.changedTouches[0].pageY,event.changedTouches[0].pageX);
						//var touch = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0] || event.changedTouches[0];
						var touch = event.changedTouches && event.changedTouches[0] || event;
						console.log(touch.pageY, event.target);
						if(
							touch.pageY > position_next.top &&
							touch.pageY < position_next.top+102 &&
							touch.pageX > position_next.left &&
							touch.pageX < position_next.left+102
						  )
							{
								$(".content .page-3 .guide-arm").css({"opacity":"0"});
								$(".content .page-3 .contic .line-"+item).animate({opacity:1},400);
								statusMoveHelp = false;
								$(".content .page-3 .contic .item").removeClass("click");
								item_active = i_next;
								if(exit_page3)
									setTimeout(func_result_window_view,1000);
								else
									setTimeout(func_info_window_view,5000,i_next);
							}
					}
			}
	}
