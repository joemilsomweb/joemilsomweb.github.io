define(["jquery","config","underscore","util/facebook"],function(e,o,t,n){return{tweet:function(e,o,t){e=e,t=t;var n=encodeURIComponent(o),i="http://twitter.com/intent/tweet?text="+encodeURIComponent(e)+"&url="+n;t&&t.length>0&&(i+="&related="+encodeURIComponent(t)),window.open(i,"tweetFollow","width=550,height=420,toolbar=no")||(window.location.href=i)},fbpost:function(e,o){var i={};i.method="feed",i=t.extend(i,e),n.SDK.ui(i,o)},gplusshare:function(e){window.open("https://plus.google.com/share?url="+e,"","menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")},inviteFacebookFriends:function(e){n.SDK.ui({method:"apprequests",message:e})},shareSiteFacebook:function(e){window.open("https://www.facebook.com/sharer.php?u="+encodeURIComponent(e),"fbShare","width=550,height=420,toolbar=no")},followTwitter:function(e){window.open("https://twitter.com/intent/user?screen_name="+e,"tweetFollow","width=550,height=420,toolbar=no")},getUrl:function(e){return e?o.SITE_URL+"?url=features/"+e:o.SITE_URL}}});