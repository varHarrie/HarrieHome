; (function ($) {
	var radian = Math.PI / 180;
	var defaults = {
		color: "#666666",//#dae3e7
		minSize: 30,
		maxSize: 80,
		count: 20,
		speed: 1,
		rotateRate: 0.3,
	};

	var Animator = (function () {
		var Animator = function ($element, options) {
			var that = this;
			var opts = $.extend(defaults, options || {});
			that.color = opts.color;
			that.bgColor = opts.bgColor;
			that.count = opts.count;
			that.speed = opts.speed;
			that.rotateRate = opts.rotateRate;
			that.maxSize = opts.maxSize;
			that.minSize = opts.minSize;
			that.range = opts.maxSize - opts.minSize;
			var $ele = that.$ele = $element.css("position", "relative").css("z-index", 0);
			var width = that.width = $ele.width();
			var height = that.height = $ele.height();
			var $canvas = that.$canvas = $("<canvas></canvas>")
				.css({ position: "absolute", top: 0, left: 0, "z-index": "-1" })
				.prependTo($ele);
			var canvas = $canvas[0];
			if (!canvas.getContext) {
				console.log("您的浏览器不支持HTML5 canvas");
				return;
			}
			canvas.width = width;
			canvas.height = height;
			that.ctx = canvas.getContext('2d');
			that.squares = [];

			for (var i = 0; i < that.count; i++) {
				var size = that.range * Math.random() + that.minSize;
				that.squares.push({
					x: width * Math.random(),
					y: height + height * Math.random() * 2,
					w: size,
					h: size,
					sp: opts.speed * (0.8 * Math.random() + 0.6),
					angle: 360 * Math.random()
				});
			}
		};
		Animator.prototype = {
			start: function () {
				window.requestAnimationFrame = window.requestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.msRequestAnimationFrame;
				if (!window.requestAnimationFrame) {
					console.log("您的浏览器不支持requestAnimationFrame");
					return;
				}
				var that = this;
				that.ctx.fillStyle = that.color;
				that.run();
			},
			run: function () {
				var that = this;
				that.move();
				that.paint();
				that.timer = requestAnimationFrame(that.run.bind(this));
			},
			move: function () {
				var that = this;
				var squares = that.squares;
				for (var i = 0; i < squares.length; i++) {
					var sq = squares[i];
					sq.y -= sq.sp;
					sq.angle = (sq.angle + that.rotateRate) % 360;
					if (sq.y < -sq.h * 2) {
						var size = that.range * Math.random() + that.minSize;
						sq.x = that.width * Math.random(),
						sq.y = that.height + that.height * Math.random(),
						sq.w = squares[i].h = size;
					}
				}
			},
			paint: function () {
				var that = this;
				var ctx = that.ctx;
				var squares = that.squares;
				ctx.clearRect(0, 0, that.width, that.height);
				for (var i = 0; i < squares.length; i++) {
					ctx.save();
					var sq = squares[i];
					ctx.translate(sq.x + sq.w / 2, sq.y + sq.h / 2);
					ctx.rotate(sq.angle * radian);
					ctx.fillRect(-sq.w / 2, -sq.h / 2, sq.w, sq.h);
					ctx.restore();
				}
			}
		};
		return Animator;
	})();

	$.fn.bgSquare = function (options) {
		return this.each(function () {
			var that = $(this);
			var animator = that.data("animator");
			if (!animator) {
				animator = new Animator(that, options);
				that.data("animator", animator);
			}
			animator.start();
		});
	}
	$("[data-role='bgSquare']").bgSquare();
})(jQuery);