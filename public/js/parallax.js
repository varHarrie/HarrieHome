; (function ($) {
	var _prefix = (function (ele) {
		var prefixs = ["webkit", "Moz", "o", "ms"];
		var prop = "";
		for (var i = 0; i < prefixs.length; i++) {
			prop = prefixs[i] + "Transition";
			if (ele.style[prop] !== undefined)
				return "-" + prefixs[i].toLowerCase() + "-";
		}
		return "";
	})(document.createElement("div"));

	var defaults = {
		factor: 0.1,
	}
	$.fn.parallax = function (options) {
		var that=this;
		var opts=$.extend(defaults,options||{});
		$(document).on("mousemove",function (e) {
			var w = document.body.clientWidth, h = document.body.clientHeight,
				x = e.clientX, y = e.clientY;
				dx=~~(x-w/2),dy=~~(y-h/2);
			that.each(function(){
				var factor=+$(this).attr("data-factor")||opts.factor;
				$(this).css(_prefix+"transform","translate("+dx*factor+"px,"+dy*factor+"px)");
			});
		});
		return this;
	}
	$("[data-role='parallax']").parallax()
})(jQuery);