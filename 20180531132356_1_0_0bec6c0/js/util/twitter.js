define(["config","underscore","backbone"],function(t,e,i){var n={twttr:null,ready:!1,onReady:function(t){this.twttr=t,t.events.bind("click",e.bind(function(t){this.trigger("click",t)},this)),t.events.bind("tweet",e.bind(function(t){this.trigger("tweet",t)},this)),t.events.bind("retweet",e.bind(function(t){this.trigger("retweet",t)},this)),t.events.bind("favorite",e.bind(function(t){this.trigger("favorite",t)},this)),t.events.bind("follow",e.bind(function(t){this.trigger("follow",t)},this)),this.ready=!0,this.trigger("ready")},renderAllTweetButtons:function(){this.twttr.widgets.load()}};return e.extend(n,i.Events),window.twttr=function(t,e,i){var n,r,d=t.getElementsByTagName(e)[0];if(!t.getElementById(i))return r=t.createElement(e),r.id=i,r.src="//platform.twitter.com/widgets.js",d.parentNode.insertBefore(r,d),window.twttr||(n={_e:[],ready:function(t){n._e.push(t)}})}(document,"script","twitter-wjs"),window.twttr.ready(e.bind(n.onReady,n)),n});