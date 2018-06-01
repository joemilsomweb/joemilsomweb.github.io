/*
* ColorMatrixFilter
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

this.createjs=this.createjs||{},function(){var t=function(t){this.initialize(t)},i=t.prototype=new createjs.Filter;i.matrix=null,i.initialize=function(t){this.matrix=t},i.applyFilter=function(t,i,r,a,e,n,l,o){n=n||t,null==l&&(l=i),null==o&&(o=r);try{var u=t.getImageData(i,r,a,e)}catch(c){return!1}for(var s,h,f,m,x=u.data,g=x.length,p=this.matrix,j=p[0],F=p[1],v=p[2],y=p[3],d=p[4],w=p[5],z=p[6],C=p[7],D=p[8],I=p[9],M=p[10],S=p[11],b=p[12],k=p[13],q=p[14],A=p[15],B=p[16],E=p[17],G=p[18],H=p[19],J=0;g>J;J+=4)s=x[J],h=x[J+1],f=x[J+2],m=x[J+3],x[J]=s*j+h*F+f*v+m*y+d,x[J+1]=s*w+h*z+f*C+m*D+I,x[J+2]=s*M+h*S+f*b+m*k+q,x[J+3]=s*A+h*B+f*E+m*G+H;return u.data=x,n.putImageData(u,l,o),!0},i.toString=function(){return"[ColorMatrixFilter]"},i.clone=function(){return new t(this.matrix)},createjs.ColorMatrixFilter=t}();