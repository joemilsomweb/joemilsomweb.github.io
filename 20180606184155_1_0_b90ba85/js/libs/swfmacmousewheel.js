/**
 * SWFMacMouseWheel v1.0: Mac Mouse Wheel functionality in flash - http://blog.pixelbreaker.com/
 *
 * SWFMacMouseWheel is (c) 2006 Gabriel Bucknall and is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Dependencies: 
 * SWFObject v2.0 - (c) 2006 Geoff Stearns.
 * http://blog.deconcept.com/swfobject/
 */

function SWFMacMouseWheel(e){this.so=e;var t=-1!=navigator.appVersion.toLowerCase().indexOf("mac");t&&this.init()}SWFMacMouseWheel.prototype={init:function(){SWFMacMouseWheel.instance=this,window.addEventListener&&window.addEventListener("DOMMouseScroll",SWFMacMouseWheel.instance.wheel,!1),window.onmousewheel=document.onmousewheel=SWFMacMouseWheel.instance.wheel},handle:function(e){document[this.so.getAttribute("id")].externalMouseEvent(e)},wheel:function(e){var t=0;e.wheelDelta?(t=e.wheelDelta/120,window.opera&&(t=-t)):e.detail&&(t=-e.detail/3),/AppleWebKit/.test(navigator.userAgent)&&(t/=3),t&&SWFMacMouseWheel.instance.handle(t),e.preventDefault&&e.preventDefault(),e.returnValue=!1}};