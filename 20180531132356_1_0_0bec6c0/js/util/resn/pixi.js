define(["util/resn/color","pixi"],function(t,e){"use strict";function r(){this.pointToBitmapDetection=function(t,e){var r=t.generateTexture(),i=r.getCanvas().getContext("2d"),o=i.getImageData(e.x,e.y,1,1),n=o.data;r.destroy(!0);var a=0===n[3],l=0===n[0]&&0===n[1]&&0===n[2]&&255===n[3],c=window.navigator.userAgent.toLowerCase().indexOf("firefox")>-1,s=!(a||c&&l);return{result:s,data:n}},this.setBitmapTextColor=function(r,i){for(var o=0;o<r.children.length;o++){var n=r.children[o];n._r_colorFilter||(n._r_colorFilter=new e.ColorMatrixFilter),n._r_colorFilter.matrix=t.hexToMatrix(i,1),n.filters=[n._r_colorFilter],n.cacheAsBitmap=!0}}}return new r});