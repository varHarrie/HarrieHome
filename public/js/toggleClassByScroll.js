; (function ($) {
	var defaults = {
		top: 0,
		clazz: "",
		callback: null,
	}
	$.fn.toggleClassByScroll = function (options) {
		var that=this;
		var opts = $.extend(true, defaults, options||{});
		$(window).on("scroll", function (e) {
			that.each(function () {
				var clazz=opts.clazz||$(this).attr("data-clazz")||"";
				if(window.scrollY > opts.top) {
					$(this).addClass(clazz)
					if (opts.callbakc && $.type(opts.callback) == "function")
						opts.callback();
				} else {
					$(this).removeClass(clazz);
				}
			});
		});
		return that;
	};
	$("[data-role='toggleClass']").toggleClassByScroll();
})(jQuery);