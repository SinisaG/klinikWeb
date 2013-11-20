/*! skrollr 0.6.17 (2013-10-19) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e,t,r){"use strict";function n(r){if(o=t.documentElement,a=t.body,K(),it=this,r=r||{},ut=r.constants||{},r.easing)for(var n in r.easing)U[n]=r.easing[n];yt=r.edgeStrategy||"set",ct={beforerender:r.beforerender,render:r.render},ft=r.forceHeight!==!1,ft&&(zt=r.scale||1),pt=r.mobileDeceleration||E,gt=r.smoothScrolling!==!1,dt=r.smoothScrollingDuration||x,vt={targetTop:it.getScrollTop()},Bt=(r.mobileCheck||function(){return/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent||navigator.vendor||e.opera)})(),Bt?(st=t.getElementById("skrollr-body"),st&&at(),X(),Ft(o,[y,S],[T])):Ft(o,[y,b],[T]),it.refresh(),St(e,"resize orientationchange",function(){var e=o.clientWidth,t=o.clientHeight;(t!==Lt||e!==It)&&(Lt=t,It=e,Mt=!0)});var i=Y();return function l(){Z(),bt=i(l)}(),it}var o,a,i=e.skrollr={get:function(){return it},init:function(e){return it||new n(e)},VERSION:"0.6.17"},l=Object.prototype.hasOwnProperty,s=e.Math,c=e.getComputedStyle,f="touchstart",u="touchmove",p="touchcancel",m="touchend",g="skrollable",d=g+"-before",v=g+"-between",h=g+"-after",y="skrollr",T="no-"+y,b=y+"-desktop",S=y+"-mobile",w="linear",k=1e3,E=.004,x=200,A="start",F="end",C="center",D="bottom",H="___skrollable_id",P=/^(?:input|textarea|button|select)$/i,V=/^\s+|\s+$/g,z=/^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,N=/\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,O=/^([a-z\-]+)\[(\w+)\]$/,q=/-([a-z])/g,I=function(e,t){return t.toUpperCase()},L=/[\-+]?[\d]*\.?[\d]+/g,M=/\{\?\}/g,$=/rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,B=/[a-z\-]+-gradient/g,_="",G="",K=function(){var e=/^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;if(c){var t=c(a,null);for(var n in t)if(_=n.match(e)||+n==n&&t[n].match(e))break;if(!_)return _=G="",r;_=_[0],"-"===_.slice(0,1)?(G=_,_={"-webkit-":"webkit","-moz-":"Moz","-ms-":"ms","-o-":"O"}[_]):G="-"+_.toLowerCase()+"-"}},Y=function(){var t=e.requestAnimationFrame||e[_.toLowerCase()+"RequestAnimationFrame"],r=Ht();return(Bt||!t)&&(t=function(t){var n=Ht()-r,o=s.max(0,1e3/60-n);return e.setTimeout(function(){r=Ht(),t()},o)}),t},R=function(){var t=e.cancelAnimationFrame||e[_.toLowerCase()+"CancelAnimationFrame"];return(Bt||!t)&&(t=function(t){return e.clearTimeout(t)}),t},U={begin:function(){return 0},end:function(){return 1},linear:function(e){return e},quadratic:function(e){return e*e},cubic:function(e){return e*e*e},swing:function(e){return-s.cos(e*s.PI)/2+.5},sqrt:function(e){return s.sqrt(e)},outCubic:function(e){return s.pow(e-1,3)+1},bounce:function(e){var t;if(.5083>=e)t=3;else if(.8489>=e)t=9;else if(.96208>=e)t=27;else{if(!(.99981>=e))return 1;t=91}return 1-s.abs(3*s.cos(1.028*e*t)/t)}};n.prototype.refresh=function(e){var n,o,a=!1;for(e===r?(a=!0,lt=[],$t=0,e=t.getElementsByTagName("*")):e=[].concat(e),n=0,o=e.length;o>n;n++){var i=e[n],l=i,s=[],c=gt,f=yt;if(i.attributes){for(var u=0,p=i.attributes.length;p>u;u++){var m=i.attributes[u];if("data-anchor-target"!==m.name)if("data-smooth-scrolling"!==m.name)if("data-edge-strategy"!==m.name){var d=m.name.match(z);if(null!==d){var v={props:m.value,element:i};s.push(v);var h=d[1];h=h&&ut[h.substr(1)]||0;var y=d[2];/p$/.test(y)?(v.isPercentage=!0,v.offset=((0|y.slice(0,-1))+h)/100):v.offset=(0|y)+h;var T=d[3],b=d[4]||T;T&&T!==A&&T!==F?(v.mode="relative",v.anchors=[T,b]):(v.mode="absolute",T===F?v.isEnd=!0:v.isPercentage||(v.frame=v.offset*zt,delete v.offset))}}else f=m.value;else c="off"!==m.value;else if(l=t.querySelector(m.value),null===l)throw'Unable to find anchor target "'+m.value+'"'}if(s.length){var S,w,k;!a&&H in i?(k=i[H],S=lt[k].styleAttr,w=lt[k].classAttr):(k=i[H]=$t++,S=i.style.cssText,w=At(i)),lt[k]={element:i,styleAttr:S,classAttr:w,anchorTarget:l,keyFrames:s,smoothScrolling:c,edgeStrategy:f},Ft(i,[g],[])}}}for(Et(),n=0,o=e.length;o>n;n++){var E=lt[e[n][H]];E!==r&&(J(E),et(E))}return it},n.prototype.relativeToAbsolute=function(e,t,r){var n=o.clientHeight,a=e.getBoundingClientRect(),i=a.top,l=a.bottom-a.top;return t===D?i-=n:t===C&&(i-=n/2),r===D?i+=l:r===C&&(i+=l/2),i+=it.getScrollTop(),0|i+.5},n.prototype.animateTo=function(e,t){t=t||{};var n=Ht(),o=it.getScrollTop();return mt={startTop:o,topDiff:e-o,targetTop:e,duration:t.duration||k,startTime:n,endTime:n+(t.duration||k),easing:U[t.easing||w],done:t.done},mt.topDiff||(mt.done&&mt.done.call(it,!1),mt=r),it},n.prototype.stopAnimateTo=function(){mt&&mt.done&&mt.done.call(it,!0),mt=r},n.prototype.isAnimatingTo=function(){return!!mt},n.prototype.setScrollTop=function(t,r){return ht=r===!0,Bt?_t=s.min(s.max(t,0),Vt):e.scrollTo(0,t),it},n.prototype.getScrollTop=function(){return Bt?_t:e.pageYOffset||o.scrollTop||a.scrollTop||0},n.prototype.getMaxScrollTop=function(){return Vt},n.prototype.on=function(e,t){return ct[e]=t,it},n.prototype.off=function(e){return delete ct[e],it},n.prototype.destroy=function(){var e=R();e(bt),kt(),Ft(o,[T],[y,b,S]);for(var t=0,n=lt.length;n>t;t++)ot(lt[t].element);o.style.overflow=a.style.overflow="auto",o.style.height=a.style.height="auto",st&&i.setStyle(st,"transform","none"),it=r,st=r,ct=r,ft=r,Vt=0,zt=1,ut=r,pt=r,Nt="down",Ot=-1,It=0,Lt=0,Mt=!1,mt=r,gt=r,dt=r,vt=r,ht=r,$t=0,yt=r,Bt=!1,_t=0,Tt=r};var X=function(){var n,i,l,c,g,d,v,h,y,T,b,S;St(o,[f,u,p,m].join(" "),function(e){var o=e.changedTouches[0];for(c=e.target;3===c.nodeType;)c=c.parentNode;switch(g=o.clientY,d=o.clientX,T=e.timeStamp,P.test(c.tagName)||e.preventDefault(),e.type){case f:n&&n.blur(),it.stopAnimateTo(),n=c,i=v=g,l=d,y=T;break;case u:h=g-v,S=T-b,it.setScrollTop(_t-h,!0),v=g,b=T;break;default:case p:case m:var a=i-g,w=l-d,k=w*w+a*a;if(49>k){if(!P.test(n.tagName)){n.focus();var E=t.createEvent("MouseEvents");E.initMouseEvent("click",!0,!0,e.view,1,o.screenX,o.screenY,o.clientX,o.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null),n.dispatchEvent(E)}return}n=r;var x=h/S;x=s.max(s.min(x,3),-3);var A=s.abs(x/pt),F=x*A+.5*pt*A*A,C=it.getScrollTop()-F,D=0;C>Vt?(D=(Vt-C)/F,C=Vt):0>C&&(D=-C/F,C=0),A*=1-D,it.animateTo(0|C+.5,{easing:"outCubic",duration:A})}}),e.scrollTo(0,0),o.style.overflow=a.style.overflow="hidden"},j=function(){var e,t,r,n,a,i,l,c,f;for(c=0,f=lt.length;f>c;c++)for(e=lt[c],t=e.element,r=e.anchorTarget,n=e.keyFrames,a=0,i=n.length;i>a;a++){l=n[a];var u=l.offset;l.isPercentage&&(u*=o.clientHeight,l.frame=u),"relative"===l.mode&&(ot(t),l.frame=it.relativeToAbsolute(r,l.anchors[0],l.anchors[1])-u,ot(t,!0)),ft&&!l.isEnd&&l.frame>Vt&&(Vt=l.frame)}for(Vt=s.max(Vt,xt()),c=0,f=lt.length;f>c;c++){for(e=lt[c],n=e.keyFrames,a=0,i=n.length;i>a;a++)l=n[a],l.isEnd&&(l.frame=Vt-l.offset);e.keyFrames.sort(Pt)}},W=function(e,t){for(var r=0,n=lt.length;n>r;r++){var o,a,s=lt[r],c=s.element,f=s.smoothScrolling?e:t,u=s.keyFrames,p=u[0].frame,m=u[u.length-1].frame,y=p>f,T=f>m,b=u[y?0:u.length-1];if(y||T){if(y&&-1===s.edge||T&&1===s.edge)continue;switch(Ft(c,[y?d:h],[d,v,h]),s.edge=y?-1:1,s.edgeStrategy){case"reset":ot(c);continue;case"ease":f=b.frame;break;default:case"set":var S=b.props;for(o in S)l.call(S,o)&&(a=nt(S[o].value),i.setStyle(c,o,a));continue}}else 0!==s.edge&&(Ft(c,[g,v],[d,h]),s.edge=0);for(var w=0,k=u.length-1;k>w;w++)if(f>=u[w].frame&&u[w+1].frame>=f){var E=u[w],x=u[w+1];for(o in E.props)if(l.call(E.props,o)){var A=(f-E.frame)/(x.frame-E.frame);A=E.props[o].easing(A),a=rt(E.props[o].value,x.props[o].value,A),a=nt(a),i.setStyle(c,o,a)}break}}},Z=function(){Mt&&(Mt=!1,Et());var e,t,n=it.getScrollTop(),o=Ht();if(mt)o>=mt.endTime?(n=mt.targetTop,e=mt.done,mt=r):(t=mt.easing((o-mt.startTime)/mt.duration),n=0|mt.startTop+t*mt.topDiff),it.setScrollTop(n,!0);else if(!ht){var a=vt.targetTop-n;a&&(vt={startTop:Ot,topDiff:n-Ot,targetTop:n,startTime:qt,endTime:qt+dt}),vt.endTime>=o&&(t=U.sqrt((o-vt.startTime)/dt),n=0|vt.startTop+t*vt.topDiff)}if(Bt&&st&&i.setStyle(st,"transform","translate(0, "+-_t+"px) "+Tt),ht||Ot!==n){Nt=n>Ot?"down":Ot>n?"up":Nt,ht=!1;var l={curTop:n,lastTop:Ot,maxTop:Vt,direction:Nt},s=ct.beforerender&&ct.beforerender.call(it,l);s!==!1&&(W(n,it.getScrollTop()),Ot=n,ct.render&&ct.render.call(it,l)),e&&e.call(it,!1)}qt=o},J=function(e){for(var t=0,r=e.keyFrames.length;r>t;t++){for(var n,o,a,i,l=e.keyFrames[t],s={};null!==(i=N.exec(l.props));)a=i[1],o=i[2],n=a.match(O),null!==n?(a=n[1],n=n[2]):n=w,o=o.indexOf("!")?Q(o):[o.slice(1)],s[a]={value:o,easing:U[n]};l.props=s}},Q=function(e){var t=[];return $.lastIndex=0,e=e.replace($,function(e){return e.replace(L,function(e){return 100*(e/255)+"%"})}),G&&(B.lastIndex=0,e=e.replace(B,function(e){return G+e})),e=e.replace(L,function(e){return t.push(+e),"{?}"}),t.unshift(e),t},et=function(e){var t,r,n={};for(t=0,r=e.keyFrames.length;r>t;t++)tt(e.keyFrames[t],n);for(n={},t=e.keyFrames.length-1;t>=0;t--)tt(e.keyFrames[t],n)},tt=function(e,t){var r;for(r in t)l.call(e.props,r)||(e.props[r]=t[r]);for(r in e.props)t[r]=e.props[r]},rt=function(e,t,r){var n,o=e.length;if(o!==t.length)throw"Can't interpolate between \""+e[0]+'" and "'+t[0]+'"';var a=[e[0]];for(n=1;o>n;n++)a[n]=e[n]+(t[n]-e[n])*r;return a},nt=function(e){var t=1;return M.lastIndex=0,e[0].replace(M,function(){return e[t++]})},ot=function(e,t){e=[].concat(e);for(var r,n,o=0,a=e.length;a>o;o++)n=e[o],r=lt[n[H]],r&&(t?(n.style.cssText=r.dirtyStyleAttr,Ft(n,r.dirtyClassAttr)):(r.dirtyStyleAttr=n.style.cssText,r.dirtyClassAttr=At(n),n.style.cssText=r.styleAttr,Ft(n,r.classAttr)))},at=function(){Tt="translateZ(0)",i.setStyle(st,"transform",Tt);var e=c(st),t=e.getPropertyValue("transform"),r=e.getPropertyValue(G+"transform"),n=t&&"none"!==t||r&&"none"!==r;n||(Tt="")};i.setStyle=function(e,t,r){var n=e.style;if(t=t.replace(q,I).replace("-",""),"zIndex"===t)n[t]=isNaN(r)?r:""+(0|r);else if("float"===t)n.styleFloat=n.cssFloat=r;else try{_&&(n[_+t.slice(0,1).toUpperCase()+t.slice(1)]=r),n[t]=r}catch(o){}};var it,lt,st,ct,ft,ut,pt,mt,gt,dt,vt,ht,yt,Tt,bt,St=i.addEvent=function(t,r,n){var o=function(t){return t=t||e.event,t.target||(t.target=t.srcElement),t.preventDefault||(t.preventDefault=function(){t.returnValue=!1}),n.call(this,t)};r=r.split(" ");for(var a,i=0,l=r.length;l>i;i++)a=r[i],t.addEventListener?t.addEventListener(a,n,!1):t.attachEvent("on"+a,o),Gt.push({element:t,name:a,listener:n})},wt=i.removeEvent=function(e,t,r){t=t.split(" ");for(var n=0,o=t.length;o>n;n++)e.removeEventListener?e.removeEventListener(t[n],r,!1):e.detachEvent("on"+t[n],r)},kt=function(){for(var e,t=0,r=Gt.length;r>t;t++)e=Gt[t],wt(e.element,e.name,e.listener);Gt=[]},Et=function(){var e=it.getScrollTop();Vt=0,ft&&!Bt&&(a.style.height="auto"),j(),ft&&!Bt&&(a.style.height=Vt+o.clientHeight+"px"),Bt?it.setScrollTop(s.min(it.getScrollTop(),Vt)):it.setScrollTop(e,!0),ht=!0},xt=function(){var e=st&&st.offsetHeight||0,t=s.max(e,a.scrollHeight,a.offsetHeight,o.scrollHeight,o.offsetHeight,o.clientHeight);return t-o.clientHeight},At=function(t){var r="className";return e.SVGElement&&t instanceof e.SVGElement&&(t=t[r],r="baseVal"),t[r]},Ft=function(t,n,o){var a="className";if(e.SVGElement&&t instanceof e.SVGElement&&(t=t[a],a="baseVal"),o===r)return t[a]=n,r;for(var i=t[a],l=0,s=o.length;s>l;l++)i=Dt(i).replace(Dt(o[l])," ");i=Ct(i);for(var c=0,f=n.length;f>c;c++)-1===Dt(i).indexOf(Dt(n[c]))&&(i+=" "+n[c]);t[a]=Ct(i)},Ct=function(e){return e.replace(V,"")},Dt=function(e){return" "+e+" "},Ht=Date.now||function(){return+new Date},Pt=function(e,t){return e.frame-t.frame},Vt=0,zt=1,Nt="down",Ot=-1,qt=Ht(),It=0,Lt=0,Mt=!1,$t=0,Bt=!1,_t=0,Gt=[]})(window,document);

(function($) {
	$.fn.blurjs = function(options){

		var canvas = document.createElement('canvas');
		var isCached = false;
		var selector = ($(this).selector).replace(/[^a-zA-Z0-9]/g,"");

		if (!canvas.getContext) { return; } // Canvas Not Supported

		// Extend our Options to Defaults
		options = $.extend({
	         source: 'body',
	         radius: 5,
	         overlay: '',
	         offset: {
	         	x: 0,
	         	y: 0
	         },
	         optClass: '',
	         cache:false,
	         cacheKeyPrefix:'blurjs-',
	         draggable: false,
	         debug: false
	    }, options);


	    // Stackblur, courtesy of Mario Klingemann: http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html
	    var mul_table=[512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];
	    var shg_table=[9,11,12,13,13,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,18,18,18,18,19,19,19,19,19,19,19,19,19,19,19,19,19,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,21,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24];
	    function stackBlurCanvasRGB(a,b,c,d,f,g){if(isNaN(g)||g<1)return;g|=0;var h=a.getContext("2d");var j;try{try{j=h.getImageData(b,c,d,f)}catch(e){try{netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");j=h.getImageData(b,c,d,f)}catch(e){alert("Cannot access local image");throw new Error("unable to access local image data: "+e);return}}}catch(e){alert("Cannot access image");throw new Error("unable to access image data: "+e);}var k=j.data;var x,y,i,p,yp,yi,yw,r_sum,g_sum,b_sum,r_out_sum,g_out_sum,b_out_sum,r_in_sum,g_in_sum,b_in_sum,pr,pg,pb,rbs;var l=g+g+1;var m=d<<2;var n=d-1;var o=f-1;var q=g+1;var r=q*(q+1)/2;var s=new BlurStack();var t=s;for(i=1;i<l;i++){t=t.next=new BlurStack();if(i==q)var u=t}t.next=s;var v=null;var w=null;yw=yi=0;var z=mul_table[g];var A=shg_table[g];for(y=0;y<f;y++){r_in_sum=g_in_sum=b_in_sum=r_sum=g_sum=b_sum=0;r_out_sum=q*(pr=k[yi]);g_out_sum=q*(pg=k[yi+1]);b_out_sum=q*(pb=k[yi+2]);r_sum+=r*pr;g_sum+=r*pg;b_sum+=r*pb;t=s;for(i=0;i<q;i++){t.r=pr;t.g=pg;t.b=pb;t=t.next}for(i=1;i<q;i++){p=yi+((n<i?n:i)<<2);r_sum+=(t.r=(pr=k[p]))*(rbs=q-i);g_sum+=(t.g=(pg=k[p+1]))*rbs;b_sum+=(t.b=(pb=k[p+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;t=t.next}v=s;w=u;for(x=0;x<d;x++){k[yi]=(r_sum*z)>>A;k[yi+1]=(g_sum*z)>>A;k[yi+2]=(b_sum*z)>>A;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=v.r;g_out_sum-=v.g;b_out_sum-=v.b;p=(yw+((p=x+g+1)<n?p:n))<<2;r_in_sum+=(v.r=k[p]);g_in_sum+=(v.g=k[p+1]);b_in_sum+=(v.b=k[p+2]);r_sum+=r_in_sum;g_sum+=g_in_sum;b_sum+=b_in_sum;v=v.next;r_out_sum+=(pr=w.r);g_out_sum+=(pg=w.g);b_out_sum+=(pb=w.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;w=w.next;yi+=4}yw+=d}for(x=0;x<d;x++){g_in_sum=b_in_sum=r_in_sum=g_sum=b_sum=r_sum=0;yi=x<<2;r_out_sum=q*(pr=k[yi]);g_out_sum=q*(pg=k[yi+1]);b_out_sum=q*(pb=k[yi+2]);r_sum+=r*pr;g_sum+=r*pg;b_sum+=r*pb;t=s;for(i=0;i<q;i++){t.r=pr;t.g=pg;t.b=pb;t=t.next}yp=d;for(i=1;i<=g;i++){yi=(yp+x)<<2;r_sum+=(t.r=(pr=k[yi]))*(rbs=q-i);g_sum+=(t.g=(pg=k[yi+1]))*rbs;b_sum+=(t.b=(pb=k[yi+2]))*rbs;r_in_sum+=pr;g_in_sum+=pg;b_in_sum+=pb;t=t.next;if(i<o){yp+=d}}yi=x;v=s;w=u;for(y=0;y<f;y++){p=yi<<2;k[p]=(r_sum*z)>>A;k[p+1]=(g_sum*z)>>A;k[p+2]=(b_sum*z)>>A;r_sum-=r_out_sum;g_sum-=g_out_sum;b_sum-=b_out_sum;r_out_sum-=v.r;g_out_sum-=v.g;b_out_sum-=v.b;p=(x+(((p=y+q)<o?p:o)*d))<<2;r_sum+=(r_in_sum+=(v.r=k[p]));g_sum+=(g_in_sum+=(v.g=k[p+1]));b_sum+=(b_in_sum+=(v.b=k[p+2]));v=v.next;r_out_sum+=(pr=w.r);g_out_sum+=(pg=w.g);b_out_sum+=(pb=w.b);r_in_sum-=pr;g_in_sum-=pg;b_in_sum-=pb;w=w.next;yi+=d}}h.putImageData(j,b,c)}
	    function BlurStack(){this.r=0;this.g=0;this.b=0;this.a=0;this.next=null}

	    // Here we go!
		return this.each(function() {
			var $glue = $(this);
			var $source = $(options.source);
			var formattedSource = ($source.css('backgroundImage')).replace(/"/g,"").replace(/url\(|\)$/ig, "");

			ctx = canvas.getContext('2d');

    		// Start with a new image and define its loaded callback
		    tempImg = new Image();
		    tempImg.onload = function() {

		        if(!isCached){ // That means we gotta do some blurrin.
		        	canvas.style.display="none";
		        	canvas.width = tempImg.width;
		        	canvas.height = tempImg.height;

		        	ctx.drawImage(tempImg, 0,0);

		        	// Magic
		        	stackBlurCanvasRGB( canvas, 0,0, canvas.width, canvas.height, options.radius );

		        	// Apply Overlay
		        	if(options.overlay!=false){
		        		ctx.beginPath();
		    			ctx.rect(0, 0, tempImg.width, tempImg.width);
		    			ctx.fillStyle = options.overlay;
		    			ctx.fill();
		        	}

		        	// To data URI
		        	var blurredData = canvas.toDataURL();


		        	if(options.cache){ // If caching is on (but cache isn't set)
		        		try{
		        			if(options.debug){console.log('Cache Set');}
		        			localStorage.setItem(options.cacheKeyPrefix+selector+'-'+formattedSource+'-data-image', blurredData); // Set Cache
		        		} catch(e){console.log(e);}
		        	}
		        } else {
		        	var blurredData = tempImg.src; // Use Data URI, no downloading! :D
		        }


		        // Lastly, we want to apply all of our positioning

		        var attachment = $source.css('backgroundAttachment');
		        var position = (attachment=='fixed') ? '' : '-'+(($glue.offset().left) - ($source.offset().left) - (options.offset.x)) +'px -'+(($glue.offset().top) - ($source.offset().top) - (options.offset.y)) +'px';

		        $glue.css({
		            'background-image': 'url("'+blurredData+'")',
		            'background-repeat': $source.css('backgroundRepeat'),
		            'background-position': position,
		            'background-attachment': attachment
		        });

		        if(options.optClass!=false){
		        	$glue.addClass(options.optClass);
		        }
		        if(options.draggable){
		        	$glue.css({
		        		'background-attachment': 'fixed',
		        		'background-position':'0 0'
		        	});
		        	$glue.draggable();
		        }

		    };



		    /* cacheCheckSum is a function I wrote to check whether or not the settings (options object)
		     * has changed at all since the last time the user loaded the page. */

		    Storage.prototype.cacheChecksum = function(opts){
        	    var newData = '';
        	    for (var key in opts) {
   					var obj = opts[key];

   					if(obj.toString() == '[object Object]'){

   						newData += ((obj.x).toString()+(obj.y).toString()+",").replace(/[^a-zA-Z0-9]/g,"");
 					} else {
 						newData += (obj+",").replace(/[^a-zA-Z0-9]/g,"");
 					}
				}

				var originalData = this.getItem(options.cacheKeyPrefix+selector+'-'+formattedSource+'-options-cache');

				if(originalData!=newData){
					this.removeItem(options.cacheKeyPrefix+selector+'-'+formattedSource+'-options-cache');
					this.setItem(options.cacheKeyPrefix+selector+'-'+formattedSource+'-options-cache', newData);

					if(options.debug){console.log('Settings Changed, Cache Emptied');}

				}
			};




		    /* Begin! */



		    // Check our options


		    var cachedData = null;

    		// Check if we have data cached before we decide whether or not we need to cache
    		if(options.cache){

    			// Check our settings to see if they have changed since last time
    			localStorage.cacheChecksum(options);

    			cachedData = localStorage.getItem(options.cacheKeyPrefix+selector+'-'+formattedSource+'-data-image');
    		}

    		// If there is cached data (and caching is turned on)
    		if(cachedData != null){
    			if(options.debug){console.log('Cache Used');}

    			isCached = true; // Used in our image loaded callback.

    			tempImg.src = (cachedData);
    		} else {
    			if(options.debug){console.log('Source Used');}
		    	tempImg.src = formattedSource; // otherwise, use source image
			}
		});
	};
})(jQuery);