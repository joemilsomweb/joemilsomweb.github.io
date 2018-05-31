/*
* ColorMatrix
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

this.createjs=this.createjs||{},function(){ColorMatrix=function(t,i,r,a){this.initialize(t,i,r,a)};var t=ColorMatrix.prototype=[];ColorMatrix.DELTA_INDEX=[0,.01,.02,.04,.05,.06,.07,.08,.1,.11,.12,.14,.15,.16,.17,.18,.2,.21,.22,.24,.25,.27,.28,.3,.32,.34,.36,.38,.4,.42,.44,.46,.48,.5,.53,.56,.59,.62,.65,.68,.71,.74,.77,.8,.83,.86,.89,.92,.95,.98,1,1.06,1.12,1.18,1.24,1.3,1.36,1.42,1.48,1.54,1.6,1.66,1.72,1.78,1.84,1.9,1.96,2,2.12,2.25,2.37,2.5,2.62,2.75,2.87,3,3.2,3.4,3.6,3.8,4,4.3,4.7,4.9,5,5.5,6,6.5,6.8,7,7.3,7.5,7.8,8,8.4,8.7,9,9.4,9.6,9.8,10],ColorMatrix.IDENTITY_MATRIX=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],ColorMatrix.LENGTH=ColorMatrix.IDENTITY_MATRIX.length,t.initialize=function(t,i,r,a){return this.reset(),this.adjustColor(t,i,r,a),this},t.reset=function(){return this.copyMatrix(ColorMatrix.IDENTITY_MATRIX)},t.adjustColor=function(t,i,r,a){return this.adjustHue(a),this.adjustContrast(i),this.adjustBrightness(t),this.adjustSaturation(r)},t.adjustBrightness=function(t){return 0==t||isNaN(t)?this:(t=this._cleanValue(t,255),this._multiplyMatrix([1,0,0,0,t,0,1,0,0,t,0,0,1,0,t,0,0,0,1,0,0,0,0,0,1]),this)},t.adjustContrast=function(t){if(0==t||isNaN(t))return this;t=this._cleanValue(t,100);var i;return 0>t?i=127+t/100*127:(i=t%1,i=0==i?ColorMatrix.DELTA_INDEX[t]:ColorMatrix.DELTA_INDEX[t<<0]*(1-i)+ColorMatrix.DELTA_INDEX[(t<<0)+1]*i,i=127*i+127),this._multiplyMatrix([i/127,0,0,0,.5*(127-i),0,i/127,0,0,.5*(127-i),0,0,i/127,0,.5*(127-i),0,0,0,1,0,0,0,0,0,1]),this},t.adjustSaturation=function(t){if(0==t||isNaN(t))return this;t=this._cleanValue(t,100);var i=1+(t>0?3*t/100:t/100),r=.3086,a=.6094,o=.082;return this._multiplyMatrix([r*(1-i)+i,a*(1-i),o*(1-i),0,0,r*(1-i),a*(1-i)+i,o*(1-i),0,0,r*(1-i),a*(1-i),o*(1-i)+i,0,0,0,0,0,1,0,0,0,0,0,1]),this},t.adjustHue=function(t){if(0==t||isNaN(t))return this;t=this._cleanValue(t,180)/180*Math.PI;var i=Math.cos(t),r=Math.sin(t),a=.213,o=.715,n=.072;return this._multiplyMatrix([a+i*(1-a)+r*-a,o+i*-o+r*-o,n+i*-n+r*(1-n),0,0,a+i*-a+.143*r,o+i*(1-o)+.14*r,n+i*-n+r*-.283,0,0,a+i*-a+r*-(1-a),o+i*-o+r*o,n+i*(1-n)+r*n,0,0,0,0,0,1,0,0,0,0,0,1]),this},t.concat=function(t){return t=this._fixMatrix(t),t.length!=ColorMatrix.LENGTH?this:(this._multiplyMatrix(t),this)},t.clone=function(){return new ColorMatrix(this)},t.toArray=function(){return this.slice(0,ColorMatrix.LENGTH)},t.copyMatrix=function(t){for(var i=ColorMatrix.LENGTH,r=0;i>r;r++)this[r]=t[r];return this},t._multiplyMatrix=function(t){for(var i=[],r=0;5>r;r++){for(var a=0;5>a;a++)i[a]=this[a+5*r];for(var a=0;5>a;a++){for(var o=0,n=0;5>n;n++)o+=t[a+5*n]*i[n];this[a+5*r]=o}}},t._cleanValue=function(t,i){return Math.min(i,Math.max(-i,t))},t._fixMatrix=function(t){return t instanceof ColorMatrix&&(t=t.slice(0)),t.length<ColorMatrix.LENGTH?t=t.slice(0,t.length).concat(ColorMatrix.IDENTITY_MATRIX.slice(t.length,ColorMatrix.LENGTH)):t.length>ColorMatrix.LENGTH&&(t=t.slice(0,ColorMatrix.LENGTH)),t},createjs.ColorMatrix=ColorMatrix}();