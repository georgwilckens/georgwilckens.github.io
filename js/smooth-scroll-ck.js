(function(e,t){typeof define=="function"&&define.amd?define([],t(e)):typeof exports=="object"?module.exports=t(e):e.smoothScroll=t(e)})(typeof global!="undefined"?global:this.window||this.global,function(e){"use strict";var t={},n="querySelector"in document&&"addEventListener"in e,r,i,s,o,u={selector:"[data-scroll]",selectorHeader:"[data-scroll-header]",speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callback:function(){}},a=function(){var e={},t=!1,n=0,r=arguments.length;if(Object.prototype.toString.call(arguments[0])==="[object Boolean]"){t=arguments[0];n++}var i=function(n){for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t&&Object.prototype.toString.call(n[r])==="[object Object]"?e[r]=a(!0,e[r],n[r]):e[r]=n[r])};for(;n<r;n++){var s=arguments[n];i(s)}return e},f=function(e){return Math.max(e.scrollHeight,e.offsetHeight,e.clientHeight)},l=function(e,t){var n=t.charAt(0),r="classList"in document.documentElement,i,s;if(n==="["){t=t.substr(1,t.length-2);i=t.split("=");if(i.length>1){s=!0;i[1]=i[1].replace(/"/g,"").replace(/'/g,"")}}for(;e&&e!==document;e=e.parentNode){if(n===".")if(r){if(e.classList.contains(t.substr(1)))return e}else if((new RegExp("(^|\\s)"+t.substr(1)+"(\\s|$)")).test(e.className))return e;if(n==="#"&&e.id===t.substr(1))return e;if(n==="["&&e.hasAttribute(i[0])){if(!s)return e;if(e.getAttribute(i[0])===i[1])return e}if(e.tagName.toLowerCase()===t)return e}return null},c=function(e){var t=String(e),n=t.length,r=-1,i,s="",o=t.charCodeAt(0);while(++r<n){i=t.charCodeAt(r);if(i===0)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");if(i>=1&&i<=31||i==127||r===0&&i>=48&&i<=57||r===1&&i>=48&&i<=57&&o===45){s+="\\"+i.toString(16)+" ";continue}if(i>=128||i===45||i===95||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122){s+=t.charAt(r);continue}s+="\\"+t.charAt(r)}return s},h=function(e,t){var n;e==="easeInQuad"&&(n=t*t);e==="easeOutQuad"&&(n=t*(2-t));e==="easeInOutQuad"&&(n=t<.5?2*t*t:-1+(4-2*t)*t);e==="easeInCubic"&&(n=t*t*t);e==="easeOutCubic"&&(n=--t*t*t+1);e==="easeInOutCubic"&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1);e==="easeInQuart"&&(n=t*t*t*t);e==="easeOutQuart"&&(n=1- --t*t*t*t);e==="easeInOutQuart"&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t);e==="easeInQuint"&&(n=t*t*t*t*t);e==="easeOutQuint"&&(n=1+ --t*t*t*t*t);e==="easeInOutQuint"&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t);return n||t},p=function(e,t,n){var r=0;if(e.offsetParent)do{r+=e.offsetTop;e=e.offsetParent}while(e);r=r-t-n;return r>=0?r:0},d=function(){return Math.max(e.document.body.scrollHeight,e.document.documentElement.scrollHeight,e.document.body.offsetHeight,e.document.documentElement.offsetHeight,e.document.body.clientHeight,e.document.documentElement.clientHeight)},v=function(e){return!e||typeof JSON!="object"||typeof JSON.parse!="function"?{}:JSON.parse(e)},m=function(t,n){e.history.pushState&&(n||n==="true")&&e.history.pushState(null,null,[e.location.protocol,"//",e.location.host,e.location.pathname,e.location.search,t].join(""))},g=function(e){return e===null?0:f(e)+e.offsetTop};t.animateScroll=function(t,n,r){var i=v(t?t.getAttribute("data-options"):null),f=a(f||u,r||{},i);n="#"+c(n.substr(1));var l=n==="#"?e.document.documentElement:e.document.querySelector(n),y=e.pageYOffset;s||(s=e.document.querySelector(f.selectorHeader));o||(o=g(s));var b=p(l,o,parseInt(f.offset,10)),w,E=b-y,S=d(),x=0,T,N;m(n,f.updateURL);var C=function(r,i,s){var o=e.pageYOffset;if(r==i||o==i||e.innerHeight+o>=S){clearInterval(s);l.focus();f.callback(t,n)}},k=function(){x+=16;T=x/parseInt(f.speed,10);T=T>1?1:T;N=y+E*h(f.easing,T);e.scrollTo(0,Math.floor(N));C(N,b,w)},L=function(){w=setInterval(k,16)};e.pageYOffset===0&&e.scrollTo(0,0);L()};var y=function(e){var n=l(e.target,r.selector);if(n&&n.tagName.toLowerCase()==="a"){e.preventDefault();t.animateScroll(n,n.hash,r)}},b=function(e){i||(i=setTimeout(function(){i=null;o=g(s)},66))};t.destroy=function(){if(!r)return;e.document.removeEventListener("click",y,!1);e.removeEventListener("resize",b,!1);r=null;i=null;s=null;o=null};t.init=function(i){if(!n)return;t.destroy();r=a(u,i||{});s=e.document.querySelector(r.selectorHeader);o=g(s);e.document.addEventListener("click",y,!1);s&&e.addEventListener("resize",b,!1)};return t});