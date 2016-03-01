;(function($){
	var defaults={
		text:"",//可以是数组，循环
		speed:80,
		interval:1800,
		loop:true,
		lineBreak:"&",
		newRow:"#",
		halt:"/"
	}
	var Typer=(function(){
		var Typer=function($element,options){
			var that=this;
			that.opts=$.extend(defaults,options||{});
			that.$ele=$element;
			that.texts=(function(text){
				var texts=[];
				if($.type(text)=="string"){
					text=text.split(that.opts.newRow);
				}
				if($.type(text)=="number"){
					texts.push(text+"");
				}else if($.type(text)=="array"){
					$.each(text,function(i,v){
						var type=$.type(v)
						switch(type){
							case "string":texts.push(v);break;
							case "number":texts.push(v+"");break;
						}
					});
				}
				if(texts.length==0){
					texts.push("");
				}
				return texts;
			})(that.opts.text||that.$ele.attr("data-text")||that.$ele.text()||"");
			that.rows=that.texts.length;
		};
		Typer.prototype={
			start:function(){
				var that=this;
				that.pause=false;
				that.increase=true;
				that.$ele.text("");
				that.index=0;
				that.row=-1;
				that.text=that._nextText();
				window.setInterval(function(){
					that.nextStep();
				},this.opts.speed);
			},
			nextStep:function(){
				var that=this;
				if(that.pause)return;
				if(that.index>=that.text.length&&that.increase){
					that._pause();
					that.increase=false;
					that.text=that.text.replace(new RegExp(this.opts.halt,"g"),"");//去除停顿
				}else if(that.index<=0&&!that.increase){
					that._pause();
					that.text=that._nextText();
					that.increase=true;
				}else if(that.increase){
					that.index++;
				}else{
					that.index--;
				}
				that._refresh();
			},
			_nextText:function(){
				this.row++;
				if(this.row>=this.rows)
					this.row=0;
				return this.texts[this.row];
			},
			_pause:function(){
				var that=this;
				that.pause=true;
				window.setTimeout(function(){
					that.pause=false;
				},that.opts.interval);
			},
			_refresh:function(){
				var t=this.text
					.substr(0,this.index)
					.replace(this.opts.lineBreak,"<br/>")
					.replace(new RegExp(this.opts.halt,"g"),"");
				this.$ele.html(t);
			}
		}
		return Typer;
	})();
	$.fn.typing=function(options){
		return this.each(function(){
			var that=$(this);
			var typer=that.data("typer");
			if(!typer){
				typer=new Typer(that,options);
				that.data("typer",typer);
			}
			if($.type(options)=="string")
				typer[options]();
			typer.start();
		});
	};
	$("[data-role='typer']").typing();
})(jQuery);