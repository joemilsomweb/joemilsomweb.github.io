define(["jquery","underscore","backbone","model/loader_collection","view/common/base_view","config","util/anim_frame"],function(t,e,s,i,n,o,h){"use strict";var l=n.extend({initialize:function(t){var e=["#ff0000","#00ff00","#0000ff"];this.squares=[{color:e[0],scale:.15},{color:e[1],scale:.3},{color:e[2],scale:.45},{color:e[0],scale:.6},{color:e[1],scale:.75},{color:e[2],scale:.9}],this.context=this.el.getContext("2d"),this.addEvents()},addEvents:function(){t(this.el).parent().on("mouseover",e.bind(this.onMouseOver,this)),t(this.el).parent().on("mouseout",e.bind(this.onMouseOut,this)),t(this.el).parent().on("touchstart",e.bind(this.onMouseOver,this)),t(this.el).parent().on("touchend",e.bind(this.onMouseOut,this))},onMouseOver:function(){t(this.el).parent().addClass("hover"),this.el.width=t(this.el).parent().innerWidth()+20,this.el.height=t(this.el).parent().innerHeight()+20,h.on("anim_frame",this.onAnimFrame,this)},onMouseOut:function(){t(this.el).parent().removeClass("hover"),h.off(null,null,this),this.context.clearRect(0,0,this.el.width,this.el.height)},onAnimFrame:function(){this.squares.sort(this.sortFunc),this.context.clearRect(0,0,this.el.width,this.el.height);for(var t=0;t<this.squares.length;t++)this.context.save(),this.context.translate(this.el.width/2,this.el.height/2),this.context.scale(this.squares[t].scale,this.squares[t].scale),this.context.translate(-this.el.width/2,-this.el.height/2),this.context.fillStyle=this.squares[t].color,this.context.fillRect(0,0,this.el.width,this.el.height),this.squares[t].scale+=.05,this.squares[t].scale>1&&(this.squares[t].scale=0),this.context.restore()},sortFunc:function(t,e){return t.scale<e.scale?1:t.scale>e.scale?-1:0},destroy:function(){n.prototype.destroy.apply(this,arguments)}});return l});