(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();function Wg(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var qg={exports:{}},Oc={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bx=Symbol.for("react.transitional.element"),Fx=Symbol.for("react.fragment");function jg(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:Bx,type:e,key:i,ref:t!==void 0?t:null,props:n}}Oc.Fragment=Fx;Oc.jsx=jg;Oc.jsxs=jg;qg.exports=Oc;var U=qg.exports,Yg={exports:{}},Ut={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qd=Symbol.for("react.transitional.element"),Hx=Symbol.for("react.portal"),Gx=Symbol.for("react.fragment"),Vx=Symbol.for("react.strict_mode"),kx=Symbol.for("react.profiler"),Xx=Symbol.for("react.consumer"),Wx=Symbol.for("react.context"),qx=Symbol.for("react.forward_ref"),jx=Symbol.for("react.suspense"),Yx=Symbol.for("react.memo"),Zg=Symbol.for("react.lazy"),Zx=Symbol.for("react.activity"),gp=Symbol.iterator;function Kx(e){return e===null||typeof e!="object"?null:(e=gp&&e[gp]||e["@@iterator"],typeof e=="function"?e:null)}var Kg={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Qg=Object.assign,Jg={};function xs(e,t,n){this.props=e,this.context=t,this.refs=Jg,this.updater=n||Kg}xs.prototype.isReactComponent={};xs.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};xs.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function $g(){}$g.prototype=xs.prototype;function Jd(e,t,n){this.props=e,this.context=t,this.refs=Jg,this.updater=n||Kg}var $d=Jd.prototype=new $g;$d.constructor=Jd;Qg($d,xs.prototype);$d.isPureReactComponent=!0;var vp=Array.isArray;function Sf(){}var me={H:null,A:null,T:null,S:null},tv=Object.prototype.hasOwnProperty;function th(e,t,n){var i=n.ref;return{$$typeof:Qd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function Qx(e,t){return th(e.type,t,e.props)}function eh(e){return typeof e=="object"&&e!==null&&e.$$typeof===Qd}function Jx(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var _p=/\/+/g;function ou(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Jx(""+e.key):t.toString(36)}function $x(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Sf,Sf):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Ur(e,t,n,i,a){var r=typeof e;(r==="undefined"||r==="boolean")&&(e=null);var s=!1;if(e===null)s=!0;else switch(r){case"bigint":case"string":case"number":s=!0;break;case"object":switch(e.$$typeof){case Qd:case Hx:s=!0;break;case Zg:return s=e._init,Ur(s(e._payload),t,n,i,a)}}if(s)return a=a(e),s=i===""?"."+ou(e,0):i,vp(a)?(n="",s!=null&&(n=s.replace(_p,"$&/")+"/"),Ur(a,t,n,"",function(c){return c})):a!=null&&(eh(a)&&(a=Qx(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(_p,"$&/")+"/")+s)),t.push(a)),1;s=0;var o=i===""?".":i+":";if(vp(e))for(var l=0;l<e.length;l++)i=e[l],r=o+ou(i,l),s+=Ur(i,t,n,r,a);else if(l=Kx(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,r=o+ou(i,l++),s+=Ur(i,t,n,r,a);else if(r==="object"){if(typeof e.then=="function")return Ur($x(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return s}function qo(e,t,n){if(e==null)return e;var i=[],a=0;return Ur(e,i,"","",function(r){return t.call(n,r,a++)}),i}function ty(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var xp=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},ey={map:qo,forEach:function(e,t,n){qo(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return qo(e,function(){t++}),t},toArray:function(e){return qo(e,function(t){return t})||[]},only:function(e){if(!eh(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Ut.Activity=Zx;Ut.Children=ey;Ut.Component=xs;Ut.Fragment=Gx;Ut.Profiler=kx;Ut.PureComponent=Jd;Ut.StrictMode=Vx;Ut.Suspense=jx;Ut.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=me;Ut.__COMPILER_RUNTIME={__proto__:null,c:function(e){return me.H.useMemoCache(e)}};Ut.cache=function(e){return function(){return e.apply(null,arguments)}};Ut.cacheSignal=function(){return null};Ut.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Qg({},e.props),a=e.key;if(t!=null)for(r in t.key!==void 0&&(a=""+t.key),t)!tv.call(t,r)||r==="key"||r==="__self"||r==="__source"||r==="ref"&&t.ref===void 0||(i[r]=t[r]);var r=arguments.length-2;if(r===1)i.children=n;else if(1<r){for(var s=Array(r),o=0;o<r;o++)s[o]=arguments[o+2];i.children=s}return th(e.type,a,i)};Ut.createContext=function(e){return e={$$typeof:Wx,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Xx,_context:e},e};Ut.createElement=function(e,t,n){var i,a={},r=null;if(t!=null)for(i in t.key!==void 0&&(r=""+t.key),t)tv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var s=arguments.length-2;if(s===1)a.children=n;else if(1<s){for(var o=Array(s),l=0;l<s;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in s=e.defaultProps,s)a[i]===void 0&&(a[i]=s[i]);return th(e,r,a)};Ut.createRef=function(){return{current:null}};Ut.forwardRef=function(e){return{$$typeof:qx,render:e}};Ut.isValidElement=eh;Ut.lazy=function(e){return{$$typeof:Zg,_payload:{_status:-1,_result:e},_init:ty}};Ut.memo=function(e,t){return{$$typeof:Yx,type:e,compare:t===void 0?null:t}};Ut.startTransition=function(e){var t=me.T,n={};me.T=n;try{var i=e(),a=me.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Sf,xp)}catch(r){xp(r)}finally{t!==null&&n.types!==null&&(t.types=n.types),me.T=t}};Ut.unstable_useCacheRefresh=function(){return me.H.useCacheRefresh()};Ut.use=function(e){return me.H.use(e)};Ut.useActionState=function(e,t,n){return me.H.useActionState(e,t,n)};Ut.useCallback=function(e,t){return me.H.useCallback(e,t)};Ut.useContext=function(e){return me.H.useContext(e)};Ut.useDebugValue=function(){};Ut.useDeferredValue=function(e,t){return me.H.useDeferredValue(e,t)};Ut.useEffect=function(e,t){return me.H.useEffect(e,t)};Ut.useEffectEvent=function(e){return me.H.useEffectEvent(e)};Ut.useId=function(){return me.H.useId()};Ut.useImperativeHandle=function(e,t,n){return me.H.useImperativeHandle(e,t,n)};Ut.useInsertionEffect=function(e,t){return me.H.useInsertionEffect(e,t)};Ut.useLayoutEffect=function(e,t){return me.H.useLayoutEffect(e,t)};Ut.useMemo=function(e,t){return me.H.useMemo(e,t)};Ut.useOptimistic=function(e,t){return me.H.useOptimistic(e,t)};Ut.useReducer=function(e,t,n){return me.H.useReducer(e,t,n)};Ut.useRef=function(e){return me.H.useRef(e)};Ut.useState=function(e){return me.H.useState(e)};Ut.useSyncExternalStore=function(e,t,n){return me.H.useSyncExternalStore(e,t,n)};Ut.useTransition=function(){return me.H.useTransition()};Ut.version="19.2.4";Yg.exports=Ut;var Bt=Yg.exports;const co=Wg(Bt);var ev={exports:{}},Pc={},nv={exports:{}},iv={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(N,H){var I=N.length;N.push(H);t:for(;0<I;){var tt=I-1>>>1,nt=N[tt];if(0<a(nt,H))N[tt]=H,N[I]=nt,I=tt;else break t}}function n(N){return N.length===0?null:N[0]}function i(N){if(N.length===0)return null;var H=N[0],I=N.pop();if(I!==H){N[0]=I;t:for(var tt=0,nt=N.length,dt=nt>>>1;tt<dt;){var Lt=2*(tt+1)-1,Xt=N[Lt],X=Lt+1,$=N[X];if(0>a(Xt,I))X<nt&&0>a($,Xt)?(N[tt]=$,N[X]=I,tt=X):(N[tt]=Xt,N[Lt]=I,tt=Lt);else if(X<nt&&0>a($,I))N[tt]=$,N[X]=I,tt=X;else break t}}return H}function a(N,H){var I=N.sortIndex-H.sortIndex;return I!==0?I:N.id-H.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var r=performance;e.unstable_now=function(){return r.now()}}else{var s=Date,o=s.now();e.unstable_now=function(){return s.now()-o}}var l=[],c=[],d=1,h=null,f=3,p=!1,_=!1,x=!1,m=!1,u=typeof setTimeout=="function"?setTimeout:null,g=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;function y(N){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=N)i(c),H.sortIndex=H.expirationTime,t(l,H);else break;H=n(c)}}function w(N){if(x=!1,y(N),!_)if(n(l)!==null)_=!0,R||(R=!0,W());else{var H=n(c);H!==null&&j(w,H.startTime-N)}}var R=!1,T=-1,L=5,b=-1;function S(){return m?!0:!(e.unstable_now()-b<L)}function D(){if(m=!1,R){var N=e.unstable_now();b=N;var H=!0;try{t:{_=!1,x&&(x=!1,g(T),T=-1),p=!0;var I=f;try{e:{for(y(N),h=n(l);h!==null&&!(h.expirationTime>N&&S());){var tt=h.callback;if(typeof tt=="function"){h.callback=null,f=h.priorityLevel;var nt=tt(h.expirationTime<=N);if(N=e.unstable_now(),typeof nt=="function"){h.callback=nt,y(N),H=!0;break e}h===n(l)&&i(l),y(N)}else i(l);h=n(l)}if(h!==null)H=!0;else{var dt=n(c);dt!==null&&j(w,dt.startTime-N),H=!1}}break t}finally{h=null,f=I,p=!1}H=void 0}}finally{H?W():R=!1}}}var W;if(typeof v=="function")W=function(){v(D)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,Z=k.port2;k.port1.onmessage=D,W=function(){Z.postMessage(null)}}else W=function(){u(D,0)};function j(N,H){T=u(function(){N(e.unstable_now())},H)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(N){N.callback=null},e.unstable_forceFrameRate=function(N){0>N||125<N?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<N?Math.floor(1e3/N):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(N){switch(f){case 1:case 2:case 3:var H=3;break;default:H=f}var I=f;f=H;try{return N()}finally{f=I}},e.unstable_requestPaint=function(){m=!0},e.unstable_runWithPriority=function(N,H){switch(N){case 1:case 2:case 3:case 4:case 5:break;default:N=3}var I=f;f=N;try{return H()}finally{f=I}},e.unstable_scheduleCallback=function(N,H,I){var tt=e.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?tt+I:tt):I=tt,N){case 1:var nt=-1;break;case 2:nt=250;break;case 5:nt=1073741823;break;case 4:nt=1e4;break;default:nt=5e3}return nt=I+nt,N={id:d++,callback:H,priorityLevel:N,startTime:I,expirationTime:nt,sortIndex:-1},I>tt?(N.sortIndex=I,t(c,N),n(l)===null&&N===n(c)&&(x?(g(T),T=-1):x=!0,j(w,I-tt))):(N.sortIndex=nt,t(l,N),_||p||(_=!0,R||(R=!0,W()))),N},e.unstable_shouldYield=S,e.unstable_wrapCallback=function(N){var H=f;return function(){var I=f;f=H;try{return N.apply(this,arguments)}finally{f=I}}}})(iv);nv.exports=iv;var ny=nv.exports,av={exports:{}},nn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var iy=Bt;function rv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Xi(){}var en={d:{f:Xi,r:function(){throw Error(rv(522))},D:Xi,C:Xi,L:Xi,m:Xi,X:Xi,S:Xi,M:Xi},p:0,findDOMNode:null},ay=Symbol.for("react.portal");function ry(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ay,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var Ys=iy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function zc(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}nn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=en;nn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(rv(299));return ry(e,t,null,n)};nn.flushSync=function(e){var t=Ys.T,n=en.p;try{if(Ys.T=null,en.p=2,e)return e()}finally{Ys.T=t,en.p=n,en.d.f()}};nn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,en.d.C(e,t))};nn.prefetchDNS=function(e){typeof e=="string"&&en.d.D(e)};nn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=zc(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,r=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?en.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:r}):n==="script"&&en.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:r,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};nn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=zc(t.as,t.crossOrigin);en.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&en.d.M(e)};nn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=zc(n,t.crossOrigin);en.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};nn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=zc(t.as,t.crossOrigin);en.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else en.d.m(e)};nn.requestFormReset=function(e){en.d.r(e)};nn.unstable_batchedUpdates=function(e,t){return e(t)};nn.useFormState=function(e,t,n){return Ys.H.useFormState(e,t,n)};nn.useFormStatus=function(){return Ys.H.useHostTransitionStatus()};nn.version="19.2.4";function sv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sv)}catch(e){console.error(e)}}sv(),av.exports=nn;var sy=av.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ze=ny,ov=Bt,oy=sy;function q(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function lv(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ao(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function cv(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function uv(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function yp(e){if(Ao(e)!==e)throw Error(q(188))}function ly(e){var t=e.alternate;if(!t){if(t=Ao(e),t===null)throw Error(q(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var r=a.alternate;if(r===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===r.child){for(r=a.child;r;){if(r===n)return yp(a),e;if(r===i)return yp(a),t;r=r.sibling}throw Error(q(188))}if(n.return!==i.return)n=a,i=r;else{for(var s=!1,o=a.child;o;){if(o===n){s=!0,n=a,i=r;break}if(o===i){s=!0,i=a,n=r;break}o=o.sibling}if(!s){for(o=r.child;o;){if(o===n){s=!0,n=r,i=a;break}if(o===i){s=!0,i=r,n=a;break}o=o.sibling}if(!s)throw Error(q(189))}}if(n.alternate!==i)throw Error(q(190))}if(n.tag!==3)throw Error(q(188));return n.stateNode.current===n?e:t}function fv(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=fv(e),t!==null)return t;e=e.sibling}return null}var ge=Object.assign,cy=Symbol.for("react.element"),jo=Symbol.for("react.transitional.element"),Vs=Symbol.for("react.portal"),Or=Symbol.for("react.fragment"),dv=Symbol.for("react.strict_mode"),Mf=Symbol.for("react.profiler"),hv=Symbol.for("react.consumer"),Ai=Symbol.for("react.context"),nh=Symbol.for("react.forward_ref"),Ef=Symbol.for("react.suspense"),bf=Symbol.for("react.suspense_list"),ih=Symbol.for("react.memo"),Qi=Symbol.for("react.lazy"),Tf=Symbol.for("react.activity"),uy=Symbol.for("react.memo_cache_sentinel"),Sp=Symbol.iterator;function ws(e){return e===null||typeof e!="object"?null:(e=Sp&&e[Sp]||e["@@iterator"],typeof e=="function"?e:null)}var fy=Symbol.for("react.client.reference");function Af(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===fy?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Or:return"Fragment";case Mf:return"Profiler";case dv:return"StrictMode";case Ef:return"Suspense";case bf:return"SuspenseList";case Tf:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Vs:return"Portal";case Ai:return e.displayName||"Context";case hv:return(e._context.displayName||"Context")+".Consumer";case nh:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ih:return t=e.displayName||null,t!==null?t:Af(e.type)||"Memo";case Qi:t=e._payload,e=e._init;try{return Af(e(t))}catch{}}return null}var ks=Array.isArray,Et=ov.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Qt=oy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,qa={pending:!1,data:null,method:null,action:null},Rf=[],Pr=-1;function ci(e){return{current:e}}function ke(e){0>Pr||(e.current=Rf[Pr],Rf[Pr]=null,Pr--)}function fe(e,t){Pr++,Rf[Pr]=e.current,e.current=t}var oi=ci(null),uo=ci(null),ca=ci(null),$l=ci(null);function tc(e,t){switch(fe(ca,t),fe(uo,e),fe(oi,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?Rm(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=Rm(t),e=N0(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}ke(oi),fe(oi,e)}function is(){ke(oi),ke(uo),ke(ca)}function Cf(e){e.memoizedState!==null&&fe($l,e);var t=oi.current,n=N0(t,e.type);t!==n&&(fe(uo,e),fe(oi,n))}function ec(e){uo.current===e&&(ke(oi),ke(uo)),$l.current===e&&(ke($l),Mo._currentValue=qa)}var lu,Mp;function za(e){if(lu===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);lu=t&&t[1]||"",Mp=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+lu+e+Mp}var cu=!1;function uu(e,t){if(!e||cu)return"";cu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var f=p}Reflect.construct(e,[],h)}else{try{h.call()}catch(p){f=p}e.call(h.prototype)}}else{try{throw Error()}catch(p){f=p}(h=e())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&f&&typeof p.stack=="string")return[p.stack,f.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var r=i.DetermineComponentFrameRoot(),s=r[0],o=r[1];if(s&&o){var l=s.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=a);break}}}finally{cu=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?za(n):""}function dy(e,t){switch(e.tag){case 26:case 27:case 5:return za(e.type);case 16:return za("Lazy");case 13:return e.child!==t&&t!==null?za("Suspense Fallback"):za("Suspense");case 19:return za("SuspenseList");case 0:case 15:return uu(e.type,!1);case 11:return uu(e.type.render,!1);case 1:return uu(e.type,!0);case 31:return za("Activity");default:return""}}function Ep(e){try{var t="",n=null;do t+=dy(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var wf=Object.prototype.hasOwnProperty,ah=ze.unstable_scheduleCallback,fu=ze.unstable_cancelCallback,hy=ze.unstable_shouldYield,py=ze.unstable_requestPaint,En=ze.unstable_now,my=ze.unstable_getCurrentPriorityLevel,pv=ze.unstable_ImmediatePriority,mv=ze.unstable_UserBlockingPriority,nc=ze.unstable_NormalPriority,gy=ze.unstable_LowPriority,gv=ze.unstable_IdlePriority,vy=ze.log,_y=ze.unstable_setDisableYieldValue,Ro=null,bn=null;function aa(e){if(typeof vy=="function"&&_y(e),bn&&typeof bn.setStrictMode=="function")try{bn.setStrictMode(Ro,e)}catch{}}var Tn=Math.clz32?Math.clz32:Sy,xy=Math.log,yy=Math.LN2;function Sy(e){return e>>>=0,e===0?32:31-(xy(e)/yy|0)|0}var Yo=256,Zo=262144,Ko=4194304;function Ia(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Ic(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,r=e.suspendedLanes,s=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~r,i!==0?a=Ia(i):(s&=o,s!==0?a=Ia(s):n||(n=o&~e,n!==0&&(a=Ia(n))))):(o=i&~r,o!==0?a=Ia(o):s!==0?a=Ia(s):n||(n=i&~e,n!==0&&(a=Ia(n)))),a===0?0:t!==0&&t!==a&&!(t&r)&&(r=a&-a,n=t&-t,r>=n||r===32&&(n&4194048)!==0)?t:a}function Co(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function My(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vv(){var e=Ko;return Ko<<=1,!(Ko&62914560)&&(Ko=4194304),e}function du(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function wo(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function Ey(e,t,n,i,a,r){var s=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=s&~n;0<n;){var d=31-Tn(n),h=1<<d;o[d]=0,l[d]=-1;var f=c[d];if(f!==null)for(c[d]=null,d=0;d<f.length;d++){var p=f[d];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&_v(e,i,0),r!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=r&~(s&~t))}function _v(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Tn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function xv(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Tn(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function yv(e,t){var n=t&-t;return n=n&42?1:rh(n),n&(e.suspendedLanes|t)?0:n}function rh(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function sh(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Sv(){var e=Qt.p;return e!==0?e:(e=window.event,e===void 0?32:X0(e.type))}function bp(e,t){var n=Qt.p;try{return Qt.p=e,t()}finally{Qt.p=n}}var Ta=Math.random().toString(36).slice(2),je="__reactFiber$"+Ta,hn="__reactProps$"+Ta,ys="__reactContainer$"+Ta,Df="__reactEvents$"+Ta,by="__reactListeners$"+Ta,Ty="__reactHandles$"+Ta,Tp="__reactResources$"+Ta,Do="__reactMarker$"+Ta;function oh(e){delete e[je],delete e[hn],delete e[Df],delete e[by],delete e[Ty]}function zr(e){var t=e[je];if(t)return t;for(var n=e.parentNode;n;){if(t=n[ys]||n[je]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Lm(e);e!==null;){if(n=e[je])return n;e=Lm(e)}return t}e=n,n=e.parentNode}return null}function Ss(e){if(e=e[je]||e[ys]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Xs(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(q(33))}function jr(e){var t=e[Tp];return t||(t=e[Tp]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Ge(e){e[Do]=!0}var Mv=new Set,Ev={};function rr(e,t){as(e,t),as(e+"Capture",t)}function as(e,t){for(Ev[e]=t,e=0;e<t.length;e++)Mv.add(t[e])}var Ay=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Ap={},Rp={};function Ry(e){return wf.call(Rp,e)?!0:wf.call(Ap,e)?!1:Ay.test(e)?Rp[e]=!0:(Ap[e]=!0,!1)}function Ll(e,t,n){if(Ry(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Qo(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function di(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Nn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function bv(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Cy(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,r=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(s){n=""+s,r.call(this,s)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(s){n=""+s},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Uf(e){if(!e._valueTracker){var t=bv(e)?"checked":"value";e._valueTracker=Cy(e,t,""+e[t])}}function Tv(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=bv(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function ic(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var wy=/[\n"\\]/g;function zn(e){return e.replace(wy,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Lf(e,t,n,i,a,r,s,o){e.name="",s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"?e.type=s:e.removeAttribute("type"),t!=null?s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Nn(t)):e.value!==""+Nn(t)&&(e.value=""+Nn(t)):s!=="submit"&&s!=="reset"||e.removeAttribute("value"),t!=null?Nf(e,s,Nn(t)):n!=null?Nf(e,s,Nn(n)):i!=null&&e.removeAttribute("value"),a==null&&r!=null&&(e.defaultChecked=!!r),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Nn(o):e.removeAttribute("name")}function Av(e,t,n,i,a,r,s,o){if(r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.type=r),t!=null||n!=null){if(!(r!=="submit"&&r!=="reset"||t!=null)){Uf(e);return}n=n!=null?""+Nn(n):"",t=t!=null?""+Nn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.name=s),Uf(e)}function Nf(e,t,n){t==="number"&&ic(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Yr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Nn(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Rv(e,t,n){if(t!=null&&(t=""+Nn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Nn(n):""}function Cv(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(q(92));if(ks(i)){if(1<i.length)throw Error(q(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Nn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Uf(e)}function rs(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Dy=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Cp(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||Dy.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function wv(e,t,n){if(t!=null&&typeof t!="object")throw Error(q(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&Cp(e,a,i)}else for(var r in t)t.hasOwnProperty(r)&&Cp(e,r,t[r])}function lh(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Uy=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ly=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Nl(e){return Ly.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Ri(){}var Of=null;function ch(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ir=null,Zr=null;function wp(e){var t=Ss(e);if(t&&(e=t.stateNode)){var n=e[hn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Lf(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+zn(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[hn]||null;if(!a)throw Error(q(90));Lf(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&Tv(i)}break t;case"textarea":Rv(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Yr(e,!!n.multiple,t,!1)}}}var hu=!1;function Dv(e,t,n){if(hu)return e(t,n);hu=!0;try{var i=e(t);return i}finally{if(hu=!1,(Ir!==null||Zr!==null)&&(Zc(),Ir&&(t=Ir,e=Zr,Zr=Ir=null,wp(t),e)))for(t=0;t<e.length;t++)wp(e[t])}}function fo(e,t){var n=e.stateNode;if(n===null)return null;var i=n[hn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(q(231,t,typeof n));return n}var Oi=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Pf=!1;if(Oi)try{var Ds={};Object.defineProperty(Ds,"passive",{get:function(){Pf=!0}}),window.addEventListener("test",Ds,Ds),window.removeEventListener("test",Ds,Ds)}catch{Pf=!1}var ra=null,uh=null,Ol=null;function Uv(){if(Ol)return Ol;var e,t=uh,n=t.length,i,a="value"in ra?ra.value:ra.textContent,r=a.length;for(e=0;e<n&&t[e]===a[e];e++);var s=n-e;for(i=1;i<=s&&t[n-i]===a[r-i];i++);return Ol=a.slice(e,1<i?1-i:void 0)}function Pl(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Jo(){return!0}function Dp(){return!1}function pn(e){function t(n,i,a,r,s){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=r,this.target=s,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(r):r[o]);return this.isDefaultPrevented=(r.defaultPrevented!=null?r.defaultPrevented:r.returnValue===!1)?Jo:Dp,this.isPropagationStopped=Dp,this}return ge(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Jo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Jo)},persist:function(){},isPersistent:Jo}),t}var sr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bc=pn(sr),Uo=ge({},sr,{view:0,detail:0}),Ny=pn(Uo),pu,mu,Us,Fc=ge({},Uo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:fh,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Us&&(Us&&e.type==="mousemove"?(pu=e.screenX-Us.screenX,mu=e.screenY-Us.screenY):mu=pu=0,Us=e),pu)},movementY:function(e){return"movementY"in e?e.movementY:mu}}),Up=pn(Fc),Oy=ge({},Fc,{dataTransfer:0}),Py=pn(Oy),zy=ge({},Uo,{relatedTarget:0}),gu=pn(zy),Iy=ge({},sr,{animationName:0,elapsedTime:0,pseudoElement:0}),By=pn(Iy),Fy=ge({},sr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Hy=pn(Fy),Gy=ge({},sr,{data:0}),Lp=pn(Gy),Vy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ky={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Xy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Wy(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Xy[e])?!!t[e]:!1}function fh(){return Wy}var qy=ge({},Uo,{key:function(e){if(e.key){var t=Vy[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Pl(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ky[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:fh,charCode:function(e){return e.type==="keypress"?Pl(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pl(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jy=pn(qy),Yy=ge({},Fc,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Np=pn(Yy),Zy=ge({},Uo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:fh}),Ky=pn(Zy),Qy=ge({},sr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Jy=pn(Qy),$y=ge({},Fc,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),tS=pn($y),eS=ge({},sr,{newState:0,oldState:0}),nS=pn(eS),iS=[9,13,27,32],dh=Oi&&"CompositionEvent"in window,Zs=null;Oi&&"documentMode"in document&&(Zs=document.documentMode);var aS=Oi&&"TextEvent"in window&&!Zs,Lv=Oi&&(!dh||Zs&&8<Zs&&11>=Zs),Op=" ",Pp=!1;function Nv(e,t){switch(e){case"keyup":return iS.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Ov(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Br=!1;function rS(e,t){switch(e){case"compositionend":return Ov(t);case"keypress":return t.which!==32?null:(Pp=!0,Op);case"textInput":return e=t.data,e===Op&&Pp?null:e;default:return null}}function sS(e,t){if(Br)return e==="compositionend"||!dh&&Nv(e,t)?(e=Uv(),Ol=uh=ra=null,Br=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Lv&&t.locale!=="ko"?null:t.data;default:return null}}var oS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function zp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!oS[e.type]:t==="textarea"}function Pv(e,t,n,i){Ir?Zr?Zr.push(i):Zr=[i]:Ir=i,t=Sc(t,"onChange"),0<t.length&&(n=new Bc("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ks=null,ho=null;function lS(e){D0(e,0)}function Hc(e){var t=Xs(e);if(Tv(t))return e}function Ip(e,t){if(e==="change")return t}var zv=!1;if(Oi){var vu;if(Oi){var _u="oninput"in document;if(!_u){var Bp=document.createElement("div");Bp.setAttribute("oninput","return;"),_u=typeof Bp.oninput=="function"}vu=_u}else vu=!1;zv=vu&&(!document.documentMode||9<document.documentMode)}function Fp(){Ks&&(Ks.detachEvent("onpropertychange",Iv),ho=Ks=null)}function Iv(e){if(e.propertyName==="value"&&Hc(ho)){var t=[];Pv(t,ho,e,ch(e)),Dv(lS,t)}}function cS(e,t,n){e==="focusin"?(Fp(),Ks=t,ho=n,Ks.attachEvent("onpropertychange",Iv)):e==="focusout"&&Fp()}function uS(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Hc(ho)}function fS(e,t){if(e==="click")return Hc(t)}function dS(e,t){if(e==="input"||e==="change")return Hc(t)}function hS(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Cn=typeof Object.is=="function"?Object.is:hS;function po(e,t){if(Cn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!wf.call(t,a)||!Cn(e[a],t[a]))return!1}return!0}function Hp(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Gp(e,t){var n=Hp(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Hp(n)}}function Bv(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Bv(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Fv(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=ic(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=ic(e.document)}return t}function hh(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var pS=Oi&&"documentMode"in document&&11>=document.documentMode,Fr=null,zf=null,Qs=null,If=!1;function Vp(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;If||Fr==null||Fr!==ic(i)||(i=Fr,"selectionStart"in i&&hh(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Qs&&po(Qs,i)||(Qs=i,i=Sc(zf,"onSelect"),0<i.length&&(t=new Bc("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Fr)))}function wa(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Hr={animationend:wa("Animation","AnimationEnd"),animationiteration:wa("Animation","AnimationIteration"),animationstart:wa("Animation","AnimationStart"),transitionrun:wa("Transition","TransitionRun"),transitionstart:wa("Transition","TransitionStart"),transitioncancel:wa("Transition","TransitionCancel"),transitionend:wa("Transition","TransitionEnd")},xu={},Hv={};Oi&&(Hv=document.createElement("div").style,"AnimationEvent"in window||(delete Hr.animationend.animation,delete Hr.animationiteration.animation,delete Hr.animationstart.animation),"TransitionEvent"in window||delete Hr.transitionend.transition);function or(e){if(xu[e])return xu[e];if(!Hr[e])return e;var t=Hr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Hv)return xu[e]=t[n];return e}var Gv=or("animationend"),Vv=or("animationiteration"),kv=or("animationstart"),mS=or("transitionrun"),gS=or("transitionstart"),vS=or("transitioncancel"),Xv=or("transitionend"),Wv=new Map,Bf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Bf.push("scrollEnd");function Jn(e,t){Wv.set(e,t),rr(t,[e])}var ac=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ln=[],Gr=0,ph=0;function Gc(){for(var e=Gr,t=ph=Gr=0;t<e;){var n=Ln[t];Ln[t++]=null;var i=Ln[t];Ln[t++]=null;var a=Ln[t];Ln[t++]=null;var r=Ln[t];if(Ln[t++]=null,i!==null&&a!==null){var s=i.pending;s===null?a.next=a:(a.next=s.next,s.next=a),i.pending=a}r!==0&&qv(n,a,r)}}function Vc(e,t,n,i){Ln[Gr++]=e,Ln[Gr++]=t,Ln[Gr++]=n,Ln[Gr++]=i,ph|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function mh(e,t,n,i){return Vc(e,t,n,i),rc(e)}function lr(e,t){return Vc(e,null,null,t),rc(e)}function qv(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,r=e.return;r!==null;)r.childLanes|=n,i=r.alternate,i!==null&&(i.childLanes|=n),r.tag===22&&(e=r.stateNode,e===null||e._visibility&1||(a=!0)),e=r,r=r.return;return e.tag===3?(r=e.stateNode,a&&t!==null&&(a=31-Tn(n),e=r.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),r):null}function rc(e){if(50<so)throw so=0,rd=null,Error(q(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Vr={};function _S(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Sn(e,t,n,i){return new _S(e,t,n,i)}function gh(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ui(e,t){var n=e.alternate;return n===null?(n=Sn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function jv(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function zl(e,t,n,i,a,r){var s=0;if(i=e,typeof e=="function")gh(e)&&(s=1);else if(typeof e=="string")s=EM(e,n,oi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Tf:return e=Sn(31,n,t,a),e.elementType=Tf,e.lanes=r,e;case Or:return ja(n.children,a,r,t);case dv:s=8,a|=24;break;case Mf:return e=Sn(12,n,t,a|2),e.elementType=Mf,e.lanes=r,e;case Ef:return e=Sn(13,n,t,a),e.elementType=Ef,e.lanes=r,e;case bf:return e=Sn(19,n,t,a),e.elementType=bf,e.lanes=r,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ai:s=10;break t;case hv:s=9;break t;case nh:s=11;break t;case ih:s=14;break t;case Qi:s=16,i=null;break t}s=29,n=Error(q(130,e===null?"null":typeof e,"")),i=null}return t=Sn(s,n,t,a),t.elementType=e,t.type=i,t.lanes=r,t}function ja(e,t,n,i){return e=Sn(7,e,i,t),e.lanes=n,e}function yu(e,t,n){return e=Sn(6,e,null,t),e.lanes=n,e}function Yv(e){var t=Sn(18,null,null,0);return t.stateNode=e,t}function Su(e,t,n){return t=Sn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var kp=new WeakMap;function In(e,t){if(typeof e=="object"&&e!==null){var n=kp.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Ep(t)},kp.set(e,t),t)}return{value:e,source:t,stack:Ep(t)}}var kr=[],Xr=0,sc=null,mo=0,On=[],Pn=0,ya=null,ii=1,ai="";function Ei(e,t){kr[Xr++]=mo,kr[Xr++]=sc,sc=e,mo=t}function Zv(e,t,n){On[Pn++]=ii,On[Pn++]=ai,On[Pn++]=ya,ya=e;var i=ii;e=ai;var a=32-Tn(i)-1;i&=~(1<<a),n+=1;var r=32-Tn(t)+a;if(30<r){var s=a-a%5;r=(i&(1<<s)-1).toString(32),i>>=s,a-=s,ii=1<<32-Tn(t)+a|n<<a|i,ai=r+e}else ii=1<<r|n<<a|i,ai=e}function vh(e){e.return!==null&&(Ei(e,1),Zv(e,1,0))}function _h(e){for(;e===sc;)sc=kr[--Xr],kr[Xr]=null,mo=kr[--Xr],kr[Xr]=null;for(;e===ya;)ya=On[--Pn],On[Pn]=null,ai=On[--Pn],On[Pn]=null,ii=On[--Pn],On[Pn]=null}function Kv(e,t){On[Pn++]=ii,On[Pn++]=ai,On[Pn++]=ya,ii=t.id,ai=t.overflow,ya=e}var Ye=null,pe=null,Wt=!1,ua=null,Bn=!1,Ff=Error(q(519));function Sa(e){var t=Error(q(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw go(In(t,e)),Ff}function Xp(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[je]=e,t[hn]=i,n){case"dialog":Gt("cancel",t),Gt("close",t);break;case"iframe":case"object":case"embed":Gt("load",t);break;case"video":case"audio":for(n=0;n<yo.length;n++)Gt(yo[n],t);break;case"source":Gt("error",t);break;case"img":case"image":case"link":Gt("error",t),Gt("load",t);break;case"details":Gt("toggle",t);break;case"input":Gt("invalid",t),Av(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Gt("invalid",t);break;case"textarea":Gt("invalid",t),Cv(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||L0(t.textContent,n)?(i.popover!=null&&(Gt("beforetoggle",t),Gt("toggle",t)),i.onScroll!=null&&Gt("scroll",t),i.onScrollEnd!=null&&Gt("scrollend",t),i.onClick!=null&&(t.onclick=Ri),t=!0):t=!1,t||Sa(e,!0)}function Wp(e){for(Ye=e.return;Ye;)switch(Ye.tag){case 5:case 31:case 13:Bn=!1;return;case 27:case 3:Bn=!0;return;default:Ye=Ye.return}}function dr(e){if(e!==Ye)return!1;if(!Wt)return Wp(e),Wt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||ud(e.type,e.memoizedProps)),n=!n),n&&pe&&Sa(e),Wp(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(q(317));pe=Um(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(q(317));pe=Um(e)}else t===27?(t=pe,Aa(e.type)?(e=pd,pd=null,pe=e):pe=t):pe=Ye?Gn(e.stateNode.nextSibling):null;return!0}function Ja(){pe=Ye=null,Wt=!1}function Mu(){var e=ua;return e!==null&&(ln===null?ln=e:ln.push.apply(ln,e),ua=null),e}function go(e){ua===null?ua=[e]:ua.push(e)}var Hf=ci(null),cr=null,Ci=null;function $i(e,t,n){fe(Hf,t._currentValue),t._currentValue=n}function Li(e){e._currentValue=Hf.current,ke(Hf)}function Gf(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Vf(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var r=a.dependencies;if(r!==null){var s=a.child;r=r.firstContext;t:for(;r!==null;){var o=r;r=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){r.lanes|=n,o=r.alternate,o!==null&&(o.lanes|=n),Gf(r.return,n,e),i||(s=null);break t}r=o.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(q(341));s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Gf(s,n,e),s=null}else s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ms(e,t,n,i){e=null;for(var a=t,r=!1;a!==null;){if(!r){if(a.flags&524288)r=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(q(387));if(s=s.memoizedProps,s!==null){var o=a.type;Cn(a.pendingProps.value,s.value)||(e!==null?e.push(o):e=[o])}}else if(a===$l.current){if(s=a.alternate,s===null)throw Error(q(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(Mo):e=[Mo])}a=a.return}e!==null&&Vf(t,e,n,i),t.flags|=262144}function oc(e){for(e=e.firstContext;e!==null;){if(!Cn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function $a(e){cr=e,Ci=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ze(e){return Qv(cr,e)}function $o(e,t){return cr===null&&$a(e),Qv(e,t)}function Qv(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ci===null){if(e===null)throw Error(q(308));Ci=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ci=Ci.next=t;return n}var xS=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},yS=ze.unstable_scheduleCallback,SS=ze.unstable_NormalPriority,Le={$$typeof:Ai,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function xh(){return{controller:new xS,data:new Map,refCount:0}}function Lo(e){e.refCount--,e.refCount===0&&yS(SS,function(){e.controller.abort()})}var Js=null,kf=0,ss=0,Kr=null;function MS(e,t){if(Js===null){var n=Js=[];kf=0,ss=Xh(),Kr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return kf++,t.then(qp,qp),t}function qp(){if(--kf===0&&Js!==null){Kr!==null&&(Kr.status="fulfilled");var e=Js;Js=null,ss=0,Kr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function ES(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var jp=Et.S;Et.S=function(e,t){f0=En(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&MS(e,t),jp!==null&&jp(e,t)};var Ya=ci(null);function yh(){var e=Ya.current;return e!==null?e:ce.pooledCache}function Il(e,t){t===null?fe(Ya,Ya.current):fe(Ya,t.pool)}function Jv(){var e=yh();return e===null?null:{parent:Le._currentValue,pool:e}}var Es=Error(q(460)),Sh=Error(q(474)),kc=Error(q(542)),lc={then:function(){}};function Yp(e){return e=e.status,e==="fulfilled"||e==="rejected"}function $v(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Ri,Ri),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Kp(e),e;default:if(typeof t.status=="string")t.then(Ri,Ri);else{if(e=ce,e!==null&&100<e.shellSuspendCounter)throw Error(q(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Kp(e),e}throw Za=t,Es}}function Ba(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Za=n,Es):n}}var Za=null;function Zp(){if(Za===null)throw Error(q(459));var e=Za;return Za=null,e}function Kp(e){if(e===Es||e===kc)throw Error(q(483))}var Qr=null,vo=0;function tl(e){var t=vo;return vo+=1,Qr===null&&(Qr=[]),$v(Qr,e,t)}function Ls(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function el(e,t){throw t.$$typeof===cy?Error(q(525)):(e=Object.prototype.toString.call(t),Error(q(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function t_(e){function t(u,g){if(e){var v=u.deletions;v===null?(u.deletions=[g],u.flags|=16):v.push(g)}}function n(u,g){if(!e)return null;for(;g!==null;)t(u,g),g=g.sibling;return null}function i(u){for(var g=new Map;u!==null;)u.key!==null?g.set(u.key,u):g.set(u.index,u),u=u.sibling;return g}function a(u,g){return u=Ui(u,g),u.index=0,u.sibling=null,u}function r(u,g,v){return u.index=v,e?(v=u.alternate,v!==null?(v=v.index,v<g?(u.flags|=67108866,g):v):(u.flags|=67108866,g)):(u.flags|=1048576,g)}function s(u){return e&&u.alternate===null&&(u.flags|=67108866),u}function o(u,g,v,y){return g===null||g.tag!==6?(g=yu(v,u.mode,y),g.return=u,g):(g=a(g,v),g.return=u,g)}function l(u,g,v,y){var w=v.type;return w===Or?d(u,g,v.props.children,y,v.key):g!==null&&(g.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Qi&&Ba(w)===g.type)?(g=a(g,v.props),Ls(g,v),g.return=u,g):(g=zl(v.type,v.key,v.props,null,u.mode,y),Ls(g,v),g.return=u,g)}function c(u,g,v,y){return g===null||g.tag!==4||g.stateNode.containerInfo!==v.containerInfo||g.stateNode.implementation!==v.implementation?(g=Su(v,u.mode,y),g.return=u,g):(g=a(g,v.children||[]),g.return=u,g)}function d(u,g,v,y,w){return g===null||g.tag!==7?(g=ja(v,u.mode,y,w),g.return=u,g):(g=a(g,v),g.return=u,g)}function h(u,g,v){if(typeof g=="string"&&g!==""||typeof g=="number"||typeof g=="bigint")return g=yu(""+g,u.mode,v),g.return=u,g;if(typeof g=="object"&&g!==null){switch(g.$$typeof){case jo:return v=zl(g.type,g.key,g.props,null,u.mode,v),Ls(v,g),v.return=u,v;case Vs:return g=Su(g,u.mode,v),g.return=u,g;case Qi:return g=Ba(g),h(u,g,v)}if(ks(g)||ws(g))return g=ja(g,u.mode,v,null),g.return=u,g;if(typeof g.then=="function")return h(u,tl(g),v);if(g.$$typeof===Ai)return h(u,$o(u,g),v);el(u,g)}return null}function f(u,g,v,y){var w=g!==null?g.key:null;if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return w!==null?null:o(u,g,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case jo:return v.key===w?l(u,g,v,y):null;case Vs:return v.key===w?c(u,g,v,y):null;case Qi:return v=Ba(v),f(u,g,v,y)}if(ks(v)||ws(v))return w!==null?null:d(u,g,v,y,null);if(typeof v.then=="function")return f(u,g,tl(v),y);if(v.$$typeof===Ai)return f(u,g,$o(u,v),y);el(u,v)}return null}function p(u,g,v,y,w){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return u=u.get(v)||null,o(g,u,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case jo:return u=u.get(y.key===null?v:y.key)||null,l(g,u,y,w);case Vs:return u=u.get(y.key===null?v:y.key)||null,c(g,u,y,w);case Qi:return y=Ba(y),p(u,g,v,y,w)}if(ks(y)||ws(y))return u=u.get(v)||null,d(g,u,y,w,null);if(typeof y.then=="function")return p(u,g,v,tl(y),w);if(y.$$typeof===Ai)return p(u,g,v,$o(g,y),w);el(g,y)}return null}function _(u,g,v,y){for(var w=null,R=null,T=g,L=g=0,b=null;T!==null&&L<v.length;L++){T.index>L?(b=T,T=null):b=T.sibling;var S=f(u,T,v[L],y);if(S===null){T===null&&(T=b);break}e&&T&&S.alternate===null&&t(u,T),g=r(S,g,L),R===null?w=S:R.sibling=S,R=S,T=b}if(L===v.length)return n(u,T),Wt&&Ei(u,L),w;if(T===null){for(;L<v.length;L++)T=h(u,v[L],y),T!==null&&(g=r(T,g,L),R===null?w=T:R.sibling=T,R=T);return Wt&&Ei(u,L),w}for(T=i(T);L<v.length;L++)b=p(T,u,L,v[L],y),b!==null&&(e&&b.alternate!==null&&T.delete(b.key===null?L:b.key),g=r(b,g,L),R===null?w=b:R.sibling=b,R=b);return e&&T.forEach(function(D){return t(u,D)}),Wt&&Ei(u,L),w}function x(u,g,v,y){if(v==null)throw Error(q(151));for(var w=null,R=null,T=g,L=g=0,b=null,S=v.next();T!==null&&!S.done;L++,S=v.next()){T.index>L?(b=T,T=null):b=T.sibling;var D=f(u,T,S.value,y);if(D===null){T===null&&(T=b);break}e&&T&&D.alternate===null&&t(u,T),g=r(D,g,L),R===null?w=D:R.sibling=D,R=D,T=b}if(S.done)return n(u,T),Wt&&Ei(u,L),w;if(T===null){for(;!S.done;L++,S=v.next())S=h(u,S.value,y),S!==null&&(g=r(S,g,L),R===null?w=S:R.sibling=S,R=S);return Wt&&Ei(u,L),w}for(T=i(T);!S.done;L++,S=v.next())S=p(T,u,L,S.value,y),S!==null&&(e&&S.alternate!==null&&T.delete(S.key===null?L:S.key),g=r(S,g,L),R===null?w=S:R.sibling=S,R=S);return e&&T.forEach(function(W){return t(u,W)}),Wt&&Ei(u,L),w}function m(u,g,v,y){if(typeof v=="object"&&v!==null&&v.type===Or&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case jo:t:{for(var w=v.key;g!==null;){if(g.key===w){if(w=v.type,w===Or){if(g.tag===7){n(u,g.sibling),y=a(g,v.props.children),y.return=u,u=y;break t}}else if(g.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Qi&&Ba(w)===g.type){n(u,g.sibling),y=a(g,v.props),Ls(y,v),y.return=u,u=y;break t}n(u,g);break}else t(u,g);g=g.sibling}v.type===Or?(y=ja(v.props.children,u.mode,y,v.key),y.return=u,u=y):(y=zl(v.type,v.key,v.props,null,u.mode,y),Ls(y,v),y.return=u,u=y)}return s(u);case Vs:t:{for(w=v.key;g!==null;){if(g.key===w)if(g.tag===4&&g.stateNode.containerInfo===v.containerInfo&&g.stateNode.implementation===v.implementation){n(u,g.sibling),y=a(g,v.children||[]),y.return=u,u=y;break t}else{n(u,g);break}else t(u,g);g=g.sibling}y=Su(v,u.mode,y),y.return=u,u=y}return s(u);case Qi:return v=Ba(v),m(u,g,v,y)}if(ks(v))return _(u,g,v,y);if(ws(v)){if(w=ws(v),typeof w!="function")throw Error(q(150));return v=w.call(v),x(u,g,v,y)}if(typeof v.then=="function")return m(u,g,tl(v),y);if(v.$$typeof===Ai)return m(u,g,$o(u,v),y);el(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint"?(v=""+v,g!==null&&g.tag===6?(n(u,g.sibling),y=a(g,v),y.return=u,u=y):(n(u,g),y=yu(v,u.mode,y),y.return=u,u=y),s(u)):n(u,g)}return function(u,g,v,y){try{vo=0;var w=m(u,g,v,y);return Qr=null,w}catch(T){if(T===Es||T===kc)throw T;var R=Sn(29,T,null,u.mode);return R.lanes=y,R.return=u,R}finally{}}}var tr=t_(!0),e_=t_(!1),Ji=!1;function Mh(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Xf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function fa(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function da(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,Kt&2){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=rc(e),qv(e,null,n),t}return Vc(e,i,t,n),rc(e)}function $s(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,xv(e,n)}}function Eu(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,r=null;if(n=n.firstBaseUpdate,n!==null){do{var s={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};r===null?a=r=s:r=r.next=s,n=n.next}while(n!==null);r===null?a=r=t:r=r.next=t}else a=r=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:r,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Wf=!1;function to(){if(Wf){var e=Kr;if(e!==null)throw e}}function eo(e,t,n,i){Wf=!1;var a=e.updateQueue;Ji=!1;var r=a.firstBaseUpdate,s=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,s===null?r=c:s.next=c,s=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==s&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(r!==null){var h=a.baseState;s=0,d=c=l=null,o=r;do{var f=o.lane&-536870913,p=f!==o.lane;if(p?(kt&f)===f:(i&f)===f){f!==0&&f===ss&&(Wf=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var _=e,x=o;f=t;var m=n;switch(x.tag){case 1:if(_=x.payload,typeof _=="function"){h=_.call(m,h,f);break t}h=_;break t;case 3:_.flags=_.flags&-65537|128;case 0:if(_=x.payload,f=typeof _=="function"?_.call(m,h,f):_,f==null)break t;h=ge({},h,f);break t;case 2:Ji=!0}}f=o.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[f]:p.push(f))}else p={lane:f,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,s|=f;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);d===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,r===null&&(a.shared.lanes=0),Ea|=s,e.lanes=s,e.memoizedState=h}}function n_(e,t){if(typeof e!="function")throw Error(q(191,e));e.call(t)}function i_(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)n_(n[e],t)}var os=ci(null),cc=ci(0);function Qp(e,t){e=Bi,fe(cc,e),fe(os,t),Bi=e|t.baseLanes}function qf(){fe(cc,Bi),fe(os,os.current)}function Eh(){Bi=cc.current,ke(os),ke(cc)}var wn=ci(null),Hn=null;function ta(e){var t=e.alternate;fe(Te,Te.current&1),fe(wn,e),Hn===null&&(t===null||os.current!==null||t.memoizedState!==null)&&(Hn=e)}function jf(e){fe(Te,Te.current),fe(wn,e),Hn===null&&(Hn=e)}function a_(e){e.tag===22?(fe(Te,Te.current),fe(wn,e),Hn===null&&(Hn=e)):ea()}function ea(){fe(Te,Te.current),fe(wn,wn.current)}function yn(e){ke(wn),Hn===e&&(Hn=null),ke(Te)}var Te=ci(0);function uc(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||dd(n)||hd(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Pi=0,Nt=null,le=null,De=null,fc=!1,Jr=!1,er=!1,dc=0,_o=0,$r=null,bS=0;function Ee(){throw Error(q(321))}function bh(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Cn(e[n],t[n]))return!1;return!0}function Th(e,t,n,i,a,r){return Pi=r,Nt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Et.H=e===null||e.memoizedState===null?P_:zh,er=!1,r=n(i,a),er=!1,Jr&&(r=s_(t,n,i,a)),r_(e),r}function r_(e){Et.H=xo;var t=le!==null&&le.next!==null;if(Pi=0,De=le=Nt=null,fc=!1,_o=0,$r=null,t)throw Error(q(300));e===null||Ne||(e=e.dependencies,e!==null&&oc(e)&&(Ne=!0))}function s_(e,t,n,i){Nt=e;var a=0;do{if(Jr&&($r=null),_o=0,Jr=!1,25<=a)throw Error(q(301));if(a+=1,De=le=null,e.updateQueue!=null){var r=e.updateQueue;r.lastEffect=null,r.events=null,r.stores=null,r.memoCache!=null&&(r.memoCache.index=0)}Et.H=z_,r=t(n,i)}while(Jr);return r}function TS(){var e=Et.H,t=e.useState()[0];return t=typeof t.then=="function"?No(t):t,e=e.useState()[0],(le!==null?le.memoizedState:null)!==e&&(Nt.flags|=1024),t}function Ah(){var e=dc!==0;return dc=0,e}function Rh(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Ch(e){if(fc){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}fc=!1}Pi=0,De=le=Nt=null,Jr=!1,_o=dc=0,$r=null}function tn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return De===null?Nt.memoizedState=De=e:De=De.next=e,De}function Ae(){if(le===null){var e=Nt.alternate;e=e!==null?e.memoizedState:null}else e=le.next;var t=De===null?Nt.memoizedState:De.next;if(t!==null)De=t,le=e;else{if(e===null)throw Nt.alternate===null?Error(q(467)):Error(q(310));le=e,e={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},De===null?Nt.memoizedState=De=e:De=De.next=e}return De}function Xc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function No(e){var t=_o;return _o+=1,$r===null&&($r=[]),e=$v($r,e,t),t=Nt,(De===null?t.memoizedState:De.next)===null&&(t=t.alternate,Et.H=t===null||t.memoizedState===null?P_:zh),e}function Wc(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return No(e);if(e.$$typeof===Ai)return Ze(e)}throw Error(q(438,String(e)))}function wh(e){var t=null,n=Nt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Nt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Xc(),Nt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=uy;return t.index++,n}function zi(e,t){return typeof t=="function"?t(e):t}function Bl(e){var t=Ae();return Dh(t,le,e)}function Dh(e,t,n){var i=e.queue;if(i===null)throw Error(q(311));i.lastRenderedReducer=n;var a=e.baseQueue,r=i.pending;if(r!==null){if(a!==null){var s=a.next;a.next=r.next,r.next=s}t.baseQueue=a=r,i.pending=null}if(r=e.baseState,a===null)e.memoizedState=r;else{t=a.next;var o=s=null,l=null,c=t,d=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(kt&h)===h:(Pi&h)===h){var f=c.revertLane;if(f===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===ss&&(d=!0);else if((Pi&f)===f){c=c.next,f===ss&&(d=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,s=r):l=l.next=h,Nt.lanes|=f,Ea|=f;h=c.action,er&&n(r,h),r=c.hasEagerState?c.eagerState:n(r,h)}else f={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,s=r):l=l.next=f,Nt.lanes|=h,Ea|=h;c=c.next}while(c!==null&&c!==t);if(l===null?s=r:l.next=o,!Cn(r,e.memoizedState)&&(Ne=!0,d&&(n=Kr,n!==null)))throw n;e.memoizedState=r,e.baseState=s,e.baseQueue=l,i.lastRenderedState=r}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function bu(e){var t=Ae(),n=t.queue;if(n===null)throw Error(q(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,r=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do r=e(r,s.action),s=s.next;while(s!==a);Cn(r,t.memoizedState)||(Ne=!0),t.memoizedState=r,t.baseQueue===null&&(t.baseState=r),n.lastRenderedState=r}return[r,i]}function o_(e,t,n){var i=Nt,a=Ae(),r=Wt;if(r){if(n===void 0)throw Error(q(407));n=n()}else n=t();var s=!Cn((le||a).memoizedState,n);if(s&&(a.memoizedState=n,Ne=!0),a=a.queue,Uh(u_.bind(null,i,a,e),[e]),a.getSnapshot!==t||s||De!==null&&De.memoizedState.tag&1){if(i.flags|=2048,ls(9,{destroy:void 0},c_.bind(null,i,a,n,t),null),ce===null)throw Error(q(349));r||Pi&127||l_(i,t,n)}return n}function l_(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Nt.updateQueue,t===null?(t=Xc(),Nt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function c_(e,t,n,i){t.value=n,t.getSnapshot=i,f_(t)&&d_(e)}function u_(e,t,n){return n(function(){f_(t)&&d_(e)})}function f_(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Cn(e,n)}catch{return!0}}function d_(e){var t=lr(e,2);t!==null&&un(t,e,2)}function Yf(e){var t=tn();if(typeof e=="function"){var n=e;if(e=n(),er){aa(!0);try{n()}finally{aa(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:zi,lastRenderedState:e},t}function h_(e,t,n,i){return e.baseState=n,Dh(e,le,typeof i=="function"?i:zi)}function AS(e,t,n,i,a){if(jc(e))throw Error(q(485));if(e=t.action,e!==null){var r={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(s){r.listeners.push(s)}};Et.T!==null?n(!0):r.isTransition=!1,i(r),n=t.pending,n===null?(r.next=t.pending=r,p_(t,r)):(r.next=n.next,t.pending=n.next=r)}}function p_(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var r=Et.T,s={};Et.T=s;try{var o=n(a,i),l=Et.S;l!==null&&l(s,o),Jp(e,t,o)}catch(c){Zf(e,t,c)}finally{r!==null&&s.types!==null&&(r.types=s.types),Et.T=r}}else try{r=n(a,i),Jp(e,t,r)}catch(c){Zf(e,t,c)}}function Jp(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){$p(e,t,i)},function(i){return Zf(e,t,i)}):$p(e,t,n)}function $p(e,t,n){t.status="fulfilled",t.value=n,m_(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,p_(e,n)))}function Zf(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,m_(t),t=t.next;while(t!==i)}e.action=null}function m_(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function g_(e,t){return t}function tm(e,t){if(Wt){var n=ce.formState;if(n!==null){t:{var i=Nt;if(Wt){if(pe){e:{for(var a=pe,r=Bn;a.nodeType!==8;){if(!r){a=null;break e}if(a=Gn(a.nextSibling),a===null){a=null;break e}}r=a.data,a=r==="F!"||r==="F"?a:null}if(a){pe=Gn(a.nextSibling),i=a.data==="F!";break t}}Sa(i)}i=!1}i&&(t=n[0])}}return n=tn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:g_,lastRenderedState:t},n.queue=i,n=L_.bind(null,Nt,i),i.dispatch=n,i=Yf(!1),r=Ph.bind(null,Nt,!1,i.queue),i=tn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=AS.bind(null,Nt,a,r,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function em(e){var t=Ae();return v_(t,le,e)}function v_(e,t,n){if(t=Dh(e,t,g_)[0],e=Bl(zi)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=No(t)}catch(s){throw s===Es?kc:s}else i=t;t=Ae();var a=t.queue,r=a.dispatch;return n!==t.memoizedState&&(Nt.flags|=2048,ls(9,{destroy:void 0},RS.bind(null,a,n),null)),[i,r,e]}function RS(e,t){e.action=t}function nm(e){var t=Ae(),n=le;if(n!==null)return v_(t,n,e);Ae(),t=t.memoizedState,n=Ae();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function ls(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Nt.updateQueue,t===null&&(t=Xc(),Nt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function __(){return Ae().memoizedState}function Fl(e,t,n,i){var a=tn();Nt.flags|=e,a.memoizedState=ls(1|t,{destroy:void 0},n,i===void 0?null:i)}function qc(e,t,n,i){var a=Ae();i=i===void 0?null:i;var r=a.memoizedState.inst;le!==null&&i!==null&&bh(i,le.memoizedState.deps)?a.memoizedState=ls(t,r,n,i):(Nt.flags|=e,a.memoizedState=ls(1|t,r,n,i))}function im(e,t){Fl(8390656,8,e,t)}function Uh(e,t){qc(2048,8,e,t)}function CS(e){Nt.flags|=4;var t=Nt.updateQueue;if(t===null)t=Xc(),Nt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function x_(e){var t=Ae().memoizedState;return CS({ref:t,nextImpl:e}),function(){if(Kt&2)throw Error(q(440));return t.impl.apply(void 0,arguments)}}function y_(e,t){return qc(4,2,e,t)}function S_(e,t){return qc(4,4,e,t)}function M_(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function E_(e,t,n){n=n!=null?n.concat([e]):null,qc(4,4,M_.bind(null,t,e),n)}function Lh(){}function b_(e,t){var n=Ae();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&bh(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function T_(e,t){var n=Ae();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&bh(t,i[1]))return i[0];if(i=e(),er){aa(!0);try{e()}finally{aa(!1)}}return n.memoizedState=[i,t],i}function Nh(e,t,n){return n===void 0||Pi&1073741824&&!(kt&261930)?e.memoizedState=t:(e.memoizedState=n,e=h0(),Nt.lanes|=e,Ea|=e,n)}function A_(e,t,n,i){return Cn(n,t)?n:os.current!==null?(e=Nh(e,n,i),Cn(e,t)||(Ne=!0),e):!(Pi&42)||Pi&1073741824&&!(kt&261930)?(Ne=!0,e.memoizedState=n):(e=h0(),Nt.lanes|=e,Ea|=e,t)}function R_(e,t,n,i,a){var r=Qt.p;Qt.p=r!==0&&8>r?r:8;var s=Et.T,o={};Et.T=o,Ph(e,!1,t,n);try{var l=a(),c=Et.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=ES(l,i);no(e,t,d,An(e))}else no(e,t,i,An(e))}catch(h){no(e,t,{then:function(){},status:"rejected",reason:h},An())}finally{Qt.p=r,s!==null&&o.types!==null&&(s.types=o.types),Et.T=s}}function wS(){}function Kf(e,t,n,i){if(e.tag!==5)throw Error(q(476));var a=C_(e).queue;R_(e,a,t,qa,n===null?wS:function(){return w_(e),n(i)})}function C_(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:qa,baseState:qa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zi,lastRenderedState:qa},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:zi,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function w_(e){var t=C_(e);t.next===null&&(t=e.alternate.memoizedState),no(e,t.next.queue,{},An())}function Oh(){return Ze(Mo)}function D_(){return Ae().memoizedState}function U_(){return Ae().memoizedState}function DS(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=An();e=fa(n);var i=da(t,e,n);i!==null&&(un(i,t,n),$s(i,t,n)),t={cache:xh()},e.payload=t;return}t=t.return}}function US(e,t,n){var i=An();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},jc(e)?N_(t,n):(n=mh(e,t,n,i),n!==null&&(un(n,e,i),O_(n,t,i)))}function L_(e,t,n){var i=An();no(e,t,n,i)}function no(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(jc(e))N_(t,a);else{var r=e.alternate;if(e.lanes===0&&(r===null||r.lanes===0)&&(r=t.lastRenderedReducer,r!==null))try{var s=t.lastRenderedState,o=r(s,n);if(a.hasEagerState=!0,a.eagerState=o,Cn(o,s))return Vc(e,t,a,0),ce===null&&Gc(),!1}catch{}finally{}if(n=mh(e,t,a,i),n!==null)return un(n,e,i),O_(n,t,i),!0}return!1}function Ph(e,t,n,i){if(i={lane:2,revertLane:Xh(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},jc(e)){if(t)throw Error(q(479))}else t=mh(e,n,i,2),t!==null&&un(t,e,2)}function jc(e){var t=e.alternate;return e===Nt||t!==null&&t===Nt}function N_(e,t){Jr=fc=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function O_(e,t,n){if(n&4194048){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,xv(e,n)}}var xo={readContext:Ze,use:Wc,useCallback:Ee,useContext:Ee,useEffect:Ee,useImperativeHandle:Ee,useLayoutEffect:Ee,useInsertionEffect:Ee,useMemo:Ee,useReducer:Ee,useRef:Ee,useState:Ee,useDebugValue:Ee,useDeferredValue:Ee,useTransition:Ee,useSyncExternalStore:Ee,useId:Ee,useHostTransitionStatus:Ee,useFormState:Ee,useActionState:Ee,useOptimistic:Ee,useMemoCache:Ee,useCacheRefresh:Ee};xo.useEffectEvent=Ee;var P_={readContext:Ze,use:Wc,useCallback:function(e,t){return tn().memoizedState=[e,t===void 0?null:t],e},useContext:Ze,useEffect:im,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Fl(4194308,4,M_.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fl(4194308,4,e,t)},useInsertionEffect:function(e,t){Fl(4,2,e,t)},useMemo:function(e,t){var n=tn();t=t===void 0?null:t;var i=e();if(er){aa(!0);try{e()}finally{aa(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=tn();if(n!==void 0){var a=n(t);if(er){aa(!0);try{n(t)}finally{aa(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=US.bind(null,Nt,e),[i.memoizedState,e]},useRef:function(e){var t=tn();return e={current:e},t.memoizedState=e},useState:function(e){e=Yf(e);var t=e.queue,n=L_.bind(null,Nt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Lh,useDeferredValue:function(e,t){var n=tn();return Nh(n,e,t)},useTransition:function(){var e=Yf(!1);return e=R_.bind(null,Nt,e.queue,!0,!1),tn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Nt,a=tn();if(Wt){if(n===void 0)throw Error(q(407));n=n()}else{if(n=t(),ce===null)throw Error(q(349));kt&127||l_(i,t,n)}a.memoizedState=n;var r={value:n,getSnapshot:t};return a.queue=r,im(u_.bind(null,i,r,e),[e]),i.flags|=2048,ls(9,{destroy:void 0},c_.bind(null,i,r,n,t),null),n},useId:function(){var e=tn(),t=ce.identifierPrefix;if(Wt){var n=ai,i=ii;n=(i&~(1<<32-Tn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=dc++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=bS++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Oh,useFormState:tm,useActionState:tm,useOptimistic:function(e){var t=tn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Ph.bind(null,Nt,!0,n),n.dispatch=t,[e,t]},useMemoCache:wh,useCacheRefresh:function(){return tn().memoizedState=DS.bind(null,Nt)},useEffectEvent:function(e){var t=tn(),n={impl:e};return t.memoizedState=n,function(){if(Kt&2)throw Error(q(440));return n.impl.apply(void 0,arguments)}}},zh={readContext:Ze,use:Wc,useCallback:b_,useContext:Ze,useEffect:Uh,useImperativeHandle:E_,useInsertionEffect:y_,useLayoutEffect:S_,useMemo:T_,useReducer:Bl,useRef:__,useState:function(){return Bl(zi)},useDebugValue:Lh,useDeferredValue:function(e,t){var n=Ae();return A_(n,le.memoizedState,e,t)},useTransition:function(){var e=Bl(zi)[0],t=Ae().memoizedState;return[typeof e=="boolean"?e:No(e),t]},useSyncExternalStore:o_,useId:D_,useHostTransitionStatus:Oh,useFormState:em,useActionState:em,useOptimistic:function(e,t){var n=Ae();return h_(n,le,e,t)},useMemoCache:wh,useCacheRefresh:U_};zh.useEffectEvent=x_;var z_={readContext:Ze,use:Wc,useCallback:b_,useContext:Ze,useEffect:Uh,useImperativeHandle:E_,useInsertionEffect:y_,useLayoutEffect:S_,useMemo:T_,useReducer:bu,useRef:__,useState:function(){return bu(zi)},useDebugValue:Lh,useDeferredValue:function(e,t){var n=Ae();return le===null?Nh(n,e,t):A_(n,le.memoizedState,e,t)},useTransition:function(){var e=bu(zi)[0],t=Ae().memoizedState;return[typeof e=="boolean"?e:No(e),t]},useSyncExternalStore:o_,useId:D_,useHostTransitionStatus:Oh,useFormState:nm,useActionState:nm,useOptimistic:function(e,t){var n=Ae();return le!==null?h_(n,le,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:wh,useCacheRefresh:U_};z_.useEffectEvent=x_;function Tu(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:ge({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Qf={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=An(),a=fa(i);a.payload=t,n!=null&&(a.callback=n),t=da(e,a,i),t!==null&&(un(t,e,i),$s(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=An(),a=fa(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=da(e,a,i),t!==null&&(un(t,e,i),$s(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=An(),i=fa(n);i.tag=2,t!=null&&(i.callback=t),t=da(e,i,n),t!==null&&(un(t,e,n),$s(t,e,n))}};function am(e,t,n,i,a,r,s){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,r,s):t.prototype&&t.prototype.isPureReactComponent?!po(n,i)||!po(a,r):!0}function rm(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Qf.enqueueReplaceState(t,t.state,null)}function nr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=ge({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function I_(e){ac(e)}function B_(e){console.error(e)}function F_(e){ac(e)}function hc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function sm(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Jf(e,t,n){return n=fa(n),n.tag=3,n.payload={element:null},n.callback=function(){hc(e,t)},n}function H_(e){return e=fa(e),e.tag=3,e}function G_(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var r=i.value;e.payload=function(){return a(r)},e.callback=function(){sm(t,n,i)}}var s=n.stateNode;s!==null&&typeof s.componentDidCatch=="function"&&(e.callback=function(){sm(t,n,i),typeof a!="function"&&(ha===null?ha=new Set([this]):ha.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function LS(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ms(t,n,a,!0),n=wn.current,n!==null){switch(n.tag){case 31:case 13:return Hn===null?_c():n.alternate===null&&be===0&&(be=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===lc?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),zu(e,i,a)),!1;case 22:return n.flags|=65536,i===lc?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),zu(e,i,a)),!1}throw Error(q(435,n.tag))}return zu(e,i,a),_c(),!1}if(Wt)return t=wn.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==Ff&&(e=Error(q(422),{cause:i}),go(In(e,n)))):(i!==Ff&&(t=Error(q(423),{cause:i}),go(In(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=In(i,n),a=Jf(e.stateNode,i,a),Eu(e,a),be!==4&&(be=2)),!1;var r=Error(q(520),{cause:i});if(r=In(r,n),ro===null?ro=[r]:ro.push(r),be!==4&&(be=2),t===null)return!0;i=In(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Jf(n.stateNode,i,e),Eu(n,e),!1;case 1:if(t=n.type,r=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||r!==null&&typeof r.componentDidCatch=="function"&&(ha===null||!ha.has(r))))return n.flags|=65536,a&=-a,n.lanes|=a,a=H_(a),G_(a,e,n,i),Eu(n,a),!1}n=n.return}while(n!==null);return!1}var Ih=Error(q(461)),Ne=!1;function qe(e,t,n,i){t.child=e===null?e_(t,null,n,i):tr(t,e.child,n,i)}function om(e,t,n,i,a){n=n.render;var r=t.ref;if("ref"in i){var s={};for(var o in i)o!=="ref"&&(s[o]=i[o])}else s=i;return $a(t),i=Th(e,t,n,s,r,a),o=Ah(),e!==null&&!Ne?(Rh(e,t,a),Ii(e,t,a)):(Wt&&o&&vh(t),t.flags|=1,qe(e,t,i,a),t.child)}function lm(e,t,n,i,a){if(e===null){var r=n.type;return typeof r=="function"&&!gh(r)&&r.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=r,V_(e,t,r,i,a)):(e=zl(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(r=e.child,!Bh(e,a)){var s=r.memoizedProps;if(n=n.compare,n=n!==null?n:po,n(s,i)&&e.ref===t.ref)return Ii(e,t,a)}return t.flags|=1,e=Ui(r,i),e.ref=t.ref,e.return=t,t.child=e}function V_(e,t,n,i,a){if(e!==null){var r=e.memoizedProps;if(po(r,i)&&e.ref===t.ref)if(Ne=!1,t.pendingProps=i=r,Bh(e,a))e.flags&131072&&(Ne=!0);else return t.lanes=e.lanes,Ii(e,t,a)}return $f(e,t,n,i,a)}function k_(e,t,n,i){var a=i.children,r=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(t.flags&128){if(r=r!==null?r.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~r}else i=0,t.child=null;return cm(e,t,r,n,i)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Il(t,r!==null?r.cachePool:null),r!==null?Qp(t,r):qf(),a_(t);else return i=t.lanes=536870912,cm(e,t,r!==null?r.baseLanes|n:n,n,i)}else r!==null?(Il(t,r.cachePool),Qp(t,r),ea(),t.memoizedState=null):(e!==null&&Il(t,null),qf(),ea());return qe(e,t,a,n),t.child}function Ws(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function cm(e,t,n,i,a){var r=yh();return r=r===null?null:{parent:Le._currentValue,pool:r},t.memoizedState={baseLanes:n,cachePool:r},e!==null&&Il(t,null),qf(),a_(t),e!==null&&Ms(e,t,i,!0),t.childLanes=a,null}function Hl(e,t){return t=pc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function um(e,t,n){return tr(t,e.child,null,n),e=Hl(t,t.pendingProps),e.flags|=2,yn(t),t.memoizedState=null,e}function NS(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Wt){if(i.mode==="hidden")return e=Hl(t,i),t.lanes=536870912,Ws(null,e);if(jf(t),(e=pe)?(e=P0(e,Bn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ya!==null?{id:ii,overflow:ai}:null,retryLane:536870912,hydrationErrors:null},n=Yv(e),n.return=t,t.child=n,Ye=t,pe=null)):e=null,e===null)throw Sa(t);return t.lanes=536870912,null}return Hl(t,i)}var r=e.memoizedState;if(r!==null){var s=r.dehydrated;if(jf(t),a)if(t.flags&256)t.flags&=-257,t=um(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(q(558));else if(Ne||Ms(e,t,n,!1),a=(n&e.childLanes)!==0,Ne||a){if(i=ce,i!==null&&(s=yv(i,n),s!==0&&s!==r.retryLane))throw r.retryLane=s,lr(e,s),un(i,e,s),Ih;_c(),t=um(e,t,n)}else e=r.treeContext,pe=Gn(s.nextSibling),Ye=t,Wt=!0,ua=null,Bn=!1,e!==null&&Kv(t,e),t=Hl(t,i),t.flags|=4096;return t}return e=Ui(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Gl(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(q(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function $f(e,t,n,i,a){return $a(t),n=Th(e,t,n,i,void 0,a),i=Ah(),e!==null&&!Ne?(Rh(e,t,a),Ii(e,t,a)):(Wt&&i&&vh(t),t.flags|=1,qe(e,t,n,a),t.child)}function fm(e,t,n,i,a,r){return $a(t),t.updateQueue=null,n=s_(t,i,n,a),r_(e),i=Ah(),e!==null&&!Ne?(Rh(e,t,r),Ii(e,t,r)):(Wt&&i&&vh(t),t.flags|=1,qe(e,t,n,r),t.child)}function dm(e,t,n,i,a){if($a(t),t.stateNode===null){var r=Vr,s=n.contextType;typeof s=="object"&&s!==null&&(r=Ze(s)),r=new n(i,r),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=Qf,t.stateNode=r,r._reactInternals=t,r=t.stateNode,r.props=i,r.state=t.memoizedState,r.refs={},Mh(t),s=n.contextType,r.context=typeof s=="object"&&s!==null?Ze(s):Vr,r.state=t.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(Tu(t,n,s,i),r.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(s=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),s!==r.state&&Qf.enqueueReplaceState(r,r.state,null),eo(t,i,r,a),to(),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){r=t.stateNode;var o=t.memoizedProps,l=nr(n,o);r.props=l;var c=r.context,d=n.contextType;s=Vr,typeof d=="object"&&d!==null&&(s=Ze(d));var h=n.getDerivedStateFromProps;d=typeof h=="function"||typeof r.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(o||c!==s)&&rm(t,r,i,s),Ji=!1;var f=t.memoizedState;r.state=f,eo(t,i,r,a),to(),c=t.memoizedState,o||f!==c||Ji?(typeof h=="function"&&(Tu(t,n,h,i),c=t.memoizedState),(l=Ji||am(t,n,l,i,f,c,s))?(d||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount()),typeof r.componentDidMount=="function"&&(t.flags|=4194308)):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),r.props=i,r.state=c,r.context=s,i=l):(typeof r.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{r=t.stateNode,Xf(e,t),s=t.memoizedProps,d=nr(n,s),r.props=d,h=t.pendingProps,f=r.context,c=n.contextType,l=Vr,typeof c=="object"&&c!==null&&(l=Ze(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof r.getSnapshotBeforeUpdate=="function")||typeof r.UNSAFE_componentWillReceiveProps!="function"&&typeof r.componentWillReceiveProps!="function"||(s!==h||f!==l)&&rm(t,r,i,l),Ji=!1,f=t.memoizedState,r.state=f,eo(t,i,r,a),to();var p=t.memoizedState;s!==h||f!==p||Ji||e!==null&&e.dependencies!==null&&oc(e.dependencies)?(typeof o=="function"&&(Tu(t,n,o,i),p=t.memoizedState),(d=Ji||am(t,n,d,i,f,p,l)||e!==null&&e.dependencies!==null&&oc(e.dependencies))?(c||typeof r.UNSAFE_componentWillUpdate!="function"&&typeof r.componentWillUpdate!="function"||(typeof r.componentWillUpdate=="function"&&r.componentWillUpdate(i,p,l),typeof r.UNSAFE_componentWillUpdate=="function"&&r.UNSAFE_componentWillUpdate(i,p,l)),typeof r.componentDidUpdate=="function"&&(t.flags|=4),typeof r.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),r.props=i,r.state=p,r.context=l,i=d):(typeof r.componentDidUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof r.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),i=!1)}return r=i,Gl(e,t),i=(t.flags&128)!==0,r||i?(r=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:r.render(),t.flags|=1,e!==null&&i?(t.child=tr(t,e.child,null,a),t.child=tr(t,null,n,a)):qe(e,t,n,a),t.memoizedState=r.state,e=t.child):e=Ii(e,t,a),e}function hm(e,t,n,i){return Ja(),t.flags|=256,qe(e,t,n,i),t.child}var Au={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Ru(e){return{baseLanes:e,cachePool:Jv()}}function Cu(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Mn),e}function X_(e,t,n){var i=t.pendingProps,a=!1,r=(t.flags&128)!==0,s;if((s=r)||(s=e!==null&&e.memoizedState===null?!1:(Te.current&2)!==0),s&&(a=!0,t.flags&=-129),s=(t.flags&32)!==0,t.flags&=-33,e===null){if(Wt){if(a?ta(t):ea(),(e=pe)?(e=P0(e,Bn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:ya!==null?{id:ii,overflow:ai}:null,retryLane:536870912,hydrationErrors:null},n=Yv(e),n.return=t,t.child=n,Ye=t,pe=null)):e=null,e===null)throw Sa(t);return hd(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(ea(),a=t.mode,o=pc({mode:"hidden",children:o},a),i=ja(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=Ru(n),i.childLanes=Cu(e,s,n),t.memoizedState=Au,Ws(null,i)):(ta(t),td(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(r)t.flags&256?(ta(t),t.flags&=-257,t=wu(e,t,n)):t.memoizedState!==null?(ea(),t.child=e.child,t.flags|=128,t=null):(ea(),o=i.fallback,a=t.mode,i=pc({mode:"visible",children:i.children},a),o=ja(o,a,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,tr(t,e.child,null,n),i=t.child,i.memoizedState=Ru(n),i.childLanes=Cu(e,s,n),t.memoizedState=Au,t=Ws(null,i));else if(ta(t),hd(o)){if(s=o.nextSibling&&o.nextSibling.dataset,s)var c=s.dgst;s=c,i=Error(q(419)),i.stack="",i.digest=s,go({value:i,source:null,stack:null}),t=wu(e,t,n)}else if(Ne||Ms(e,t,n,!1),s=(n&e.childLanes)!==0,Ne||s){if(s=ce,s!==null&&(i=yv(s,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,lr(e,i),un(s,e,i),Ih;dd(o)||_c(),t=wu(e,t,n)}else dd(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,pe=Gn(o.nextSibling),Ye=t,Wt=!0,ua=null,Bn=!1,e!==null&&Kv(t,e),t=td(t,i.children),t.flags|=4096);return t}return a?(ea(),o=i.fallback,a=t.mode,l=e.child,c=l.sibling,i=Ui(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=Ui(c,o):(o=ja(o,a,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,Ws(null,i),i=t.child,o=e.child.memoizedState,o===null?o=Ru(n):(a=o.cachePool,a!==null?(l=Le._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=Jv(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Cu(e,s,n),t.memoizedState=Au,Ws(e.child,i)):(ta(t),n=e.child,e=n.sibling,n=Ui(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(s=t.deletions,s===null?(t.deletions=[e],t.flags|=16):s.push(e)),t.child=n,t.memoizedState=null,n)}function td(e,t){return t=pc({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function pc(e,t){return e=Sn(22,e,null,t),e.lanes=0,e}function wu(e,t,n){return tr(t,e.child,null,n),e=td(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function pm(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Gf(e.return,t,n)}function Du(e,t,n,i,a,r){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:r}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=a,s.treeForkCount=r)}function W_(e,t,n){var i=t.pendingProps,a=i.revealOrder,r=i.tail;i=i.children;var s=Te.current,o=(s&2)!==0;if(o?(s=s&1|2,t.flags|=128):s&=1,fe(Te,s),qe(e,t,i,n),i=Wt?mo:0,!o&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&pm(e,n,t);else if(e.tag===19)pm(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&uc(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Du(t,!1,a,n,r,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&uc(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Du(t,!0,n,null,r,i);break;case"together":Du(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Ii(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ea|=t.lanes,!(n&t.childLanes))if(e!==null){if(Ms(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(q(153));if(t.child!==null){for(e=t.child,n=Ui(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ui(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Bh(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&oc(e)))}function OS(e,t,n){switch(t.tag){case 3:tc(t,t.stateNode.containerInfo),$i(t,Le,e.memoizedState.cache),Ja();break;case 27:case 5:Cf(t);break;case 4:tc(t,t.stateNode.containerInfo);break;case 10:$i(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,jf(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(ta(t),t.flags|=128,null):n&t.child.childLanes?X_(e,t,n):(ta(t),e=Ii(e,t,n),e!==null?e.sibling:null);ta(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Ms(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return W_(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),fe(Te,Te.current),i)break;return null;case 22:return t.lanes=0,k_(e,t,n,t.pendingProps);case 24:$i(t,Le,e.memoizedState.cache)}return Ii(e,t,n)}function q_(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ne=!0;else{if(!Bh(e,n)&&!(t.flags&128))return Ne=!1,OS(e,t,n);Ne=!!(e.flags&131072)}else Ne=!1,Wt&&t.flags&1048576&&Zv(t,mo,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Ba(t.elementType),t.type=e,typeof e=="function")gh(e)?(i=nr(e,i),t.tag=1,t=dm(null,t,e,i,n)):(t.tag=0,t=$f(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===nh){t.tag=11,t=om(null,t,e,i,n);break t}else if(a===ih){t.tag=14,t=lm(null,t,e,i,n);break t}}throw t=Af(e)||e,Error(q(306,t,""))}}return t;case 0:return $f(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=nr(i,t.pendingProps),dm(e,t,i,a,n);case 3:t:{if(tc(t,t.stateNode.containerInfo),e===null)throw Error(q(387));i=t.pendingProps;var r=t.memoizedState;a=r.element,Xf(e,t),eo(t,i,null,n);var s=t.memoizedState;if(i=s.cache,$i(t,Le,i),i!==r.cache&&Vf(t,[Le],n,!0),to(),i=s.element,r.isDehydrated)if(r={element:i,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=r,t.memoizedState=r,t.flags&256){t=hm(e,t,i,n);break t}else if(i!==a){a=In(Error(q(424)),t),go(a),t=hm(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(pe=Gn(e.firstChild),Ye=t,Wt=!0,ua=null,Bn=!0,n=e_(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ja(),i===a){t=Ii(e,t,n);break t}qe(e,t,i,n)}t=t.child}return t;case 26:return Gl(e,t),e===null?(n=Om(t.type,null,t.pendingProps,null))?t.memoizedState=n:Wt||(n=t.type,e=t.pendingProps,i=Mc(ca.current).createElement(n),i[je]=t,i[hn]=e,Ke(i,n,e),Ge(i),t.stateNode=i):t.memoizedState=Om(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Cf(t),e===null&&Wt&&(i=t.stateNode=z0(t.type,t.pendingProps,ca.current),Ye=t,Bn=!0,a=pe,Aa(t.type)?(pd=a,pe=Gn(i.firstChild)):pe=a),qe(e,t,t.pendingProps.children,n),Gl(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Wt&&((a=i=pe)&&(i=uM(i,t.type,t.pendingProps,Bn),i!==null?(t.stateNode=i,Ye=t,pe=Gn(i.firstChild),Bn=!1,a=!0):a=!1),a||Sa(t)),Cf(t),a=t.type,r=t.pendingProps,s=e!==null?e.memoizedProps:null,i=r.children,ud(a,r)?i=null:s!==null&&ud(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Th(e,t,TS,null,null,n),Mo._currentValue=a),Gl(e,t),qe(e,t,i,n),t.child;case 6:return e===null&&Wt&&((e=n=pe)&&(n=fM(n,t.pendingProps,Bn),n!==null?(t.stateNode=n,Ye=t,pe=null,e=!0):e=!1),e||Sa(t)),null;case 13:return X_(e,t,n);case 4:return tc(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=tr(t,null,i,n):qe(e,t,i,n),t.child;case 11:return om(e,t,t.type,t.pendingProps,n);case 7:return qe(e,t,t.pendingProps,n),t.child;case 8:return qe(e,t,t.pendingProps.children,n),t.child;case 12:return qe(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,$i(t,t.type,i.value),qe(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,$a(t),a=Ze(a),i=i(a),t.flags|=1,qe(e,t,i,n),t.child;case 14:return lm(e,t,t.type,t.pendingProps,n);case 15:return V_(e,t,t.type,t.pendingProps,n);case 19:return W_(e,t,n);case 31:return NS(e,t,n);case 22:return k_(e,t,n,t.pendingProps);case 24:return $a(t),i=Ze(Le),e===null?(a=yh(),a===null&&(a=ce,r=xh(),a.pooledCache=r,r.refCount++,r!==null&&(a.pooledCacheLanes|=n),a=r),t.memoizedState={parent:i,cache:a},Mh(t),$i(t,Le,a)):(e.lanes&n&&(Xf(e,t),eo(t,null,null,n),to()),a=e.memoizedState,r=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),$i(t,Le,i)):(i=r.cache,$i(t,Le,i),i!==a.cache&&Vf(t,[Le],n,!0))),qe(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(q(156,t.tag))}function hi(e){e.flags|=4}function Uu(e,t,n,i,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(g0())e.flags|=8192;else throw Za=lc,Sh}else e.flags&=-16777217}function mm(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!F0(t))if(g0())e.flags|=8192;else throw Za=lc,Sh}function nl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?vv():536870912,e.lanes|=t,cs|=t)}function Ns(e,t){if(!Wt)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function de(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function PS(e,t,n){var i=t.pendingProps;switch(_h(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return de(t),null;case 1:return de(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Li(Le),is(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(dr(t)?hi(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Mu())),de(t),null;case 26:var a=t.type,r=t.memoizedState;return e===null?(hi(t),r!==null?(de(t),mm(t,r)):(de(t),Uu(t,a,null,i,n))):r?r!==e.memoizedState?(hi(t),de(t),mm(t,r)):(de(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&hi(t),de(t),Uu(t,a,e,i,n)),null;case 27:if(ec(t),n=ca.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&hi(t);else{if(!i){if(t.stateNode===null)throw Error(q(166));return de(t),null}e=oi.current,dr(t)?Xp(t):(e=z0(a,i,n),t.stateNode=e,hi(t))}return de(t),null;case 5:if(ec(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&hi(t);else{if(!i){if(t.stateNode===null)throw Error(q(166));return de(t),null}if(r=oi.current,dr(t))Xp(t);else{var s=Mc(ca.current);switch(r){case 1:r=s.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:r=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":r=s.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":r=s.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":r=s.createElement("div"),r.innerHTML="<script><\/script>",r=r.removeChild(r.firstChild);break;case"select":r=typeof i.is=="string"?s.createElement("select",{is:i.is}):s.createElement("select"),i.multiple?r.multiple=!0:i.size&&(r.size=i.size);break;default:r=typeof i.is=="string"?s.createElement(a,{is:i.is}):s.createElement(a)}}r[je]=t,r[hn]=i;t:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)r.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break t;for(;s.sibling===null;){if(s.return===null||s.return===t)break t;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=r;t:switch(Ke(r,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&hi(t)}}return de(t),Uu(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&hi(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(q(166));if(e=ca.current,dr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=Ye,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[je]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||L0(e.nodeValue,n)),e||Sa(t,!0)}else e=Mc(e).createTextNode(i),e[je]=t,t.stateNode=e}return de(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=dr(t),n!==null){if(e===null){if(!i)throw Error(q(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(q(557));e[je]=t}else Ja(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),e=!1}else n=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(yn(t),t):(yn(t),null);if(t.flags&128)throw Error(q(558))}return de(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=dr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(q(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(q(317));a[je]=t}else Ja(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;de(t),a=!1}else a=Mu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(yn(t),t):(yn(t),null)}return yn(t),t.flags&128?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),r=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(r=i.memoizedState.cachePool.pool),r!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),nl(t,t.updateQueue),de(t),null);case 4:return is(),e===null&&Wh(t.stateNode.containerInfo),de(t),null;case 10:return Li(t.type),de(t),null;case 19:if(ke(Te),i=t.memoizedState,i===null)return de(t),null;if(a=(t.flags&128)!==0,r=i.rendering,r===null)if(a)Ns(i,!1);else{if(be!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(r=uc(e),r!==null){for(t.flags|=128,Ns(i,!1),e=r.updateQueue,t.updateQueue=e,nl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)jv(n,e),n=n.sibling;return fe(Te,Te.current&1|2),Wt&&Ei(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&En()>gc&&(t.flags|=128,a=!0,Ns(i,!1),t.lanes=4194304)}else{if(!a)if(e=uc(r),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,nl(t,e),Ns(i,!0),i.tail===null&&i.tailMode==="hidden"&&!r.alternate&&!Wt)return de(t),null}else 2*En()-i.renderingStartTime>gc&&n!==536870912&&(t.flags|=128,a=!0,Ns(i,!1),t.lanes=4194304);i.isBackwards?(r.sibling=t.child,t.child=r):(e=i.last,e!==null?e.sibling=r:t.child=r,i.last=r)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=En(),e.sibling=null,n=Te.current,fe(Te,a?n&1|2:n&1),Wt&&Ei(t,i.treeForkCount),e):(de(t),null);case 22:case 23:return yn(t),Eh(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(de(t),t.subtreeFlags&6&&(t.flags|=8192)):de(t),n=t.updateQueue,n!==null&&nl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&ke(Ya),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Li(Le),de(t),null;case 25:return null;case 30:return null}throw Error(q(156,t.tag))}function zS(e,t){switch(_h(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Li(Le),is(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ec(t),null;case 31:if(t.memoizedState!==null){if(yn(t),t.alternate===null)throw Error(q(340));Ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(yn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(q(340));Ja()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ke(Te),null;case 4:return is(),null;case 10:return Li(t.type),null;case 22:case 23:return yn(t),Eh(),e!==null&&ke(Ya),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Li(Le),null;case 25:return null;default:return null}}function j_(e,t){switch(_h(t),t.tag){case 3:Li(Le),is();break;case 26:case 27:case 5:ec(t);break;case 4:is();break;case 31:t.memoizedState!==null&&yn(t);break;case 13:yn(t);break;case 19:ke(Te);break;case 10:Li(t.type);break;case 22:case 23:yn(t),Eh(),e!==null&&ke(Ya);break;case 24:Li(Le)}}function Oo(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var r=n.create,s=n.inst;i=r(),s.destroy=i}n=n.next}while(n!==a)}}catch(o){re(t,t.return,o)}}function Ma(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var r=a.next;i=r;do{if((i.tag&e)===e){var s=i.inst,o=s.destroy;if(o!==void 0){s.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(d){re(a,l,d)}}}i=i.next}while(i!==r)}}catch(d){re(t,t.return,d)}}function Y_(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{i_(t,n)}catch(i){re(e,e.return,i)}}}function Z_(e,t,n){n.props=nr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){re(e,t,i)}}function io(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(a){re(e,t,a)}}function ri(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){re(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){re(e,t,a)}else n.current=null}function K_(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){re(e,e.return,a)}}function Lu(e,t,n){try{var i=e.stateNode;aM(i,e.type,n,t),i[hn]=t}catch(a){re(e,e.return,a)}}function Q_(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Aa(e.type)||e.tag===4}function Nu(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Q_(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Aa(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ed(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ri));else if(i!==4&&(i===27&&Aa(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(ed(e,t,n),e=e.sibling;e!==null;)ed(e,t,n),e=e.sibling}function mc(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&Aa(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(mc(e,t,n),e=e.sibling;e!==null;)mc(e,t,n),e=e.sibling}function J_(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);Ke(t,i,n),t[je]=e,t[hn]=n}catch(r){re(e,e.return,r)}}var bi=!1,Ue=!1,Ou=!1,gm=typeof WeakSet=="function"?WeakSet:Set,He=null;function IS(e,t){if(e=e.containerInfo,ld=Ac,e=Fv(e),hh(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,r=i.focusNode;i=i.focusOffset;try{n.nodeType,r.nodeType}catch{n=null;break t}var s=0,o=-1,l=-1,c=0,d=0,h=e,f=null;e:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=s+a),h!==r||i!==0&&h.nodeType!==3||(l=s+i),h.nodeType===3&&(s+=h.nodeValue.length),(p=h.firstChild)!==null;)f=h,h=p;for(;;){if(h===e)break e;if(f===n&&++c===a&&(o=s),f===r&&++d===i&&(l=s),(p=h.nextSibling)!==null)break;h=f,f=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(cd={focusedElem:e,selectionRange:n},Ac=!1,He=t;He!==null;)if(t=He,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,He=e;else for(;He!==null;){switch(t=He,r=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&r!==null){e=void 0,n=t,a=r.memoizedProps,r=r.memoizedState,i=n.stateNode;try{var _=nr(n.type,a);e=i.getSnapshotBeforeUpdate(_,r),i.__reactInternalSnapshotBeforeUpdate=e}catch(x){re(n,n.return,x)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)fd(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":fd(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(q(163))}if(e=t.sibling,e!==null){e.return=t.return,He=e;break}He=t.return}}function $_(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:mi(e,n),i&4&&Oo(5,n);break;case 1:if(mi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(s){re(n,n.return,s)}else{var a=nr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(s){re(n,n.return,s)}}i&64&&Y_(n),i&512&&io(n,n.return);break;case 3:if(mi(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{i_(e,t)}catch(s){re(n,n.return,s)}}break;case 27:t===null&&i&4&&J_(n);case 26:case 5:mi(e,n),t===null&&i&4&&K_(n),i&512&&io(n,n.return);break;case 12:mi(e,n);break;case 31:mi(e,n),i&4&&n0(e,n);break;case 13:mi(e,n),i&4&&i0(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=qS.bind(null,n),dM(e,n))));break;case 22:if(i=n.memoizedState!==null||bi,!i){t=t!==null&&t.memoizedState!==null||Ue,a=bi;var r=Ue;bi=i,(Ue=t)&&!r?Si(e,n,(n.subtreeFlags&8772)!==0):mi(e,n),bi=a,Ue=r}break;case 30:break;default:mi(e,n)}}function t0(e){var t=e.alternate;t!==null&&(e.alternate=null,t0(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&oh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var _e=null,on=!1;function pi(e,t,n){for(n=n.child;n!==null;)e0(e,t,n),n=n.sibling}function e0(e,t,n){if(bn&&typeof bn.onCommitFiberUnmount=="function")try{bn.onCommitFiberUnmount(Ro,n)}catch{}switch(n.tag){case 26:Ue||ri(n,t),pi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Ue||ri(n,t);var i=_e,a=on;Aa(n.type)&&(_e=n.stateNode,on=!1),pi(e,t,n),oo(n.stateNode),_e=i,on=a;break;case 5:Ue||ri(n,t);case 6:if(i=_e,a=on,_e=null,pi(e,t,n),_e=i,on=a,_e!==null)if(on)try{(_e.nodeType===9?_e.body:_e.nodeName==="HTML"?_e.ownerDocument.body:_e).removeChild(n.stateNode)}catch(r){re(n,t,r)}else try{_e.removeChild(n.stateNode)}catch(r){re(n,t,r)}break;case 18:_e!==null&&(on?(e=_e,wm(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),hs(e)):wm(_e,n.stateNode));break;case 4:i=_e,a=on,_e=n.stateNode.containerInfo,on=!0,pi(e,t,n),_e=i,on=a;break;case 0:case 11:case 14:case 15:Ma(2,n,t),Ue||Ma(4,n,t),pi(e,t,n);break;case 1:Ue||(ri(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&Z_(n,t,i)),pi(e,t,n);break;case 21:pi(e,t,n);break;case 22:Ue=(i=Ue)||n.memoizedState!==null,pi(e,t,n),Ue=i;break;default:pi(e,t,n)}}function n0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{hs(e)}catch(n){re(t,t.return,n)}}}function i0(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{hs(e)}catch(n){re(t,t.return,n)}}function BS(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new gm),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new gm),t;default:throw Error(q(435,e.tag))}}function il(e,t){var n=BS(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=jS.bind(null,e,i);i.then(a,a)}})}function an(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],r=e,s=t,o=s;t:for(;o!==null;){switch(o.tag){case 27:if(Aa(o.type)){_e=o.stateNode,on=!1;break t}break;case 5:_e=o.stateNode,on=!1;break t;case 3:case 4:_e=o.stateNode.containerInfo,on=!0;break t}o=o.return}if(_e===null)throw Error(q(160));e0(r,s,a),_e=null,on=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)a0(t,e),t=t.sibling}var Yn=null;function a0(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:an(t,e),rn(e),i&4&&(Ma(3,e,e.return),Oo(3,e),Ma(5,e,e.return));break;case 1:an(t,e),rn(e),i&512&&(Ue||n===null||ri(n,n.return)),i&64&&bi&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Yn;if(an(t,e),rn(e),i&512&&(Ue||n===null||ri(n,n.return)),i&4){var r=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":r=a.getElementsByTagName("title")[0],(!r||r[Do]||r[je]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=a.createElement(i),a.head.insertBefore(r,a.querySelector("head > title"))),Ke(r,i,n),r[je]=e,Ge(r),i=r;break t;case"link":var s=zm("link","href",a).get(i+(n.href||""));if(s){for(var o=0;o<s.length;o++)if(r=s[o],r.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&r.getAttribute("rel")===(n.rel==null?null:n.rel)&&r.getAttribute("title")===(n.title==null?null:n.title)&&r.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){s.splice(o,1);break e}}r=a.createElement(i),Ke(r,i,n),a.head.appendChild(r);break;case"meta":if(s=zm("meta","content",a).get(i+(n.content||""))){for(o=0;o<s.length;o++)if(r=s[o],r.getAttribute("content")===(n.content==null?null:""+n.content)&&r.getAttribute("name")===(n.name==null?null:n.name)&&r.getAttribute("property")===(n.property==null?null:n.property)&&r.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute("charset")===(n.charSet==null?null:n.charSet)){s.splice(o,1);break e}}r=a.createElement(i),Ke(r,i,n),a.head.appendChild(r);break;default:throw Error(q(468,i))}r[je]=e,Ge(r),i=r}e.stateNode=i}else Im(a,e.type,e.stateNode);else e.stateNode=Pm(a,i,e.memoizedProps);else r!==i?(r===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):r.count--,i===null?Im(a,e.type,e.stateNode):Pm(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Lu(e,e.memoizedProps,n.memoizedProps)}break;case 27:an(t,e),rn(e),i&512&&(Ue||n===null||ri(n,n.return)),n!==null&&i&4&&Lu(e,e.memoizedProps,n.memoizedProps);break;case 5:if(an(t,e),rn(e),i&512&&(Ue||n===null||ri(n,n.return)),e.flags&32){a=e.stateNode;try{rs(a,"")}catch(_){re(e,e.return,_)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,Lu(e,a,n!==null?n.memoizedProps:a)),i&1024&&(Ou=!0);break;case 6:if(an(t,e),rn(e),i&4){if(e.stateNode===null)throw Error(q(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(_){re(e,e.return,_)}}break;case 3:if(Xl=null,a=Yn,Yn=Ec(t.containerInfo),an(t,e),Yn=a,rn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{hs(t.containerInfo)}catch(_){re(e,e.return,_)}Ou&&(Ou=!1,r0(e));break;case 4:i=Yn,Yn=Ec(e.stateNode.containerInfo),an(t,e),rn(e),Yn=i;break;case 12:an(t,e),rn(e);break;case 31:an(t,e),rn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,il(e,i)));break;case 13:an(t,e),rn(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Yc=En()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,il(e,i)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=bi,d=Ue;if(bi=c||a,Ue=d||l,an(t,e),Ue=d,bi=c,rn(e),i&8192)t:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||bi||Ue||Fa(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(r=l.stateNode,a)s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,f=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=f==null||typeof f=="boolean"?"":(""+f).trim()}}catch(_){re(l,l.return,_)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(_){re(l,l.return,_)}}}else if(t.tag===18){if(n===null){l=t;try{var p=l.stateNode;a?Dm(p,!0):Dm(l.stateNode,!1)}catch(_){re(l,l.return,_)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,il(e,n))));break;case 19:an(t,e),rn(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,il(e,i)));break;case 30:break;case 21:break;default:an(t,e),rn(e)}}function rn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Q_(i)){n=i;break}i=i.return}if(n==null)throw Error(q(160));switch(n.tag){case 27:var a=n.stateNode,r=Nu(e);mc(e,r,a);break;case 5:var s=n.stateNode;n.flags&32&&(rs(s,""),n.flags&=-33);var o=Nu(e);mc(e,o,s);break;case 3:case 4:var l=n.stateNode.containerInfo,c=Nu(e);ed(e,c,l);break;default:throw Error(q(161))}}catch(d){re(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function r0(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;r0(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function mi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)$_(e,t.alternate,t),t=t.sibling}function Fa(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ma(4,t,t.return),Fa(t);break;case 1:ri(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Z_(t,t.return,n),Fa(t);break;case 27:oo(t.stateNode);case 26:case 5:ri(t,t.return),Fa(t);break;case 22:t.memoizedState===null&&Fa(t);break;case 30:Fa(t);break;default:Fa(t)}e=e.sibling}}function Si(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,r=t,s=r.flags;switch(r.tag){case 0:case 11:case 15:Si(a,r,n),Oo(4,r);break;case 1:if(Si(a,r,n),i=r,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){re(i,i.return,c)}if(i=r,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)n_(l[a],o)}catch(c){re(i,i.return,c)}}n&&s&64&&Y_(r),io(r,r.return);break;case 27:J_(r);case 26:case 5:Si(a,r,n),n&&i===null&&s&4&&K_(r),io(r,r.return);break;case 12:Si(a,r,n);break;case 31:Si(a,r,n),n&&s&4&&n0(a,r);break;case 13:Si(a,r,n),n&&s&4&&i0(a,r);break;case 22:r.memoizedState===null&&Si(a,r,n),io(r,r.return);break;case 30:break;default:Si(a,r,n)}t=t.sibling}}function Fh(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Lo(n))}function Hh(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Lo(e))}function Xn(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)s0(e,t,n,i),t=t.sibling}function s0(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:Xn(e,t,n,i),a&2048&&Oo(9,t);break;case 1:Xn(e,t,n,i);break;case 3:Xn(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Lo(e)));break;case 12:if(a&2048){Xn(e,t,n,i),e=t.stateNode;try{var r=t.memoizedProps,s=r.id,o=r.onPostCommit;typeof o=="function"&&o(s,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){re(t,t.return,l)}}else Xn(e,t,n,i);break;case 31:Xn(e,t,n,i);break;case 13:Xn(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,s=t.alternate,t.memoizedState!==null?r._visibility&2?Xn(e,t,n,i):ao(e,t):r._visibility&2?Xn(e,t,n,i):(r._visibility|=2,Lr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),a&2048&&Fh(s,t);break;case 24:Xn(e,t,n,i),a&2048&&Hh(t.alternate,t);break;default:Xn(e,t,n,i)}}function Lr(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var r=e,s=t,o=n,l=i,c=s.flags;switch(s.tag){case 0:case 11:case 15:Lr(r,s,o,l,a),Oo(8,s);break;case 23:break;case 22:var d=s.stateNode;s.memoizedState!==null?d._visibility&2?Lr(r,s,o,l,a):ao(r,s):(d._visibility|=2,Lr(r,s,o,l,a)),a&&c&2048&&Fh(s.alternate,s);break;case 24:Lr(r,s,o,l,a),a&&c&2048&&Hh(s.alternate,s);break;default:Lr(r,s,o,l,a)}t=t.sibling}}function ao(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:ao(n,i),a&2048&&Fh(i.alternate,i);break;case 24:ao(n,i),a&2048&&Hh(i.alternate,i);break;default:ao(n,i)}t=t.sibling}}var qs=8192;function hr(e,t,n){if(e.subtreeFlags&qs)for(e=e.child;e!==null;)o0(e,t,n),e=e.sibling}function o0(e,t,n){switch(e.tag){case 26:hr(e,t,n),e.flags&qs&&e.memoizedState!==null&&bM(n,Yn,e.memoizedState,e.memoizedProps);break;case 5:hr(e,t,n);break;case 3:case 4:var i=Yn;Yn=Ec(e.stateNode.containerInfo),hr(e,t,n),Yn=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=qs,qs=16777216,hr(e,t,n),qs=i):hr(e,t,n));break;default:hr(e,t,n)}}function l0(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Os(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];He=i,u0(i,e)}l0(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)c0(e),e=e.sibling}function c0(e){switch(e.tag){case 0:case 11:case 15:Os(e),e.flags&2048&&Ma(9,e,e.return);break;case 3:Os(e);break;case 12:Os(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Vl(e)):Os(e);break;default:Os(e)}}function Vl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];He=i,u0(i,e)}l0(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ma(8,t,t.return),Vl(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Vl(t));break;default:Vl(t)}e=e.sibling}}function u0(e,t){for(;He!==null;){var n=He;switch(n.tag){case 0:case 11:case 15:Ma(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Lo(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,He=i;else t:for(n=e;He!==null;){i=He;var a=i.sibling,r=i.return;if(t0(i),i===n){He=null;break t}if(a!==null){a.return=r,He=a;break t}He=r}}}var FS={getCacheForType:function(e){var t=Ze(Le),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ze(Le).controller.signal}},HS=typeof WeakMap=="function"?WeakMap:Map,Kt=0,ce=null,Vt=null,kt=0,ae=0,xn=null,sa=!1,bs=!1,Gh=!1,Bi=0,be=0,Ea=0,Ka=0,Vh=0,Mn=0,cs=0,ro=null,ln=null,nd=!1,Yc=0,f0=0,gc=1/0,vc=null,ha=null,Oe=0,pa=null,us=null,Ni=0,id=0,ad=null,d0=null,so=0,rd=null;function An(){return Kt&2&&kt!==0?kt&-kt:Et.T!==null?Xh():Sv()}function h0(){if(Mn===0)if(!(kt&536870912)||Wt){var e=Zo;Zo<<=1,!(Zo&3932160)&&(Zo=262144),Mn=e}else Mn=536870912;return e=wn.current,e!==null&&(e.flags|=32),Mn}function un(e,t,n){(e===ce&&(ae===2||ae===9)||e.cancelPendingCommit!==null)&&(fs(e,0),oa(e,kt,Mn,!1)),wo(e,n),(!(Kt&2)||e!==ce)&&(e===ce&&(!(Kt&2)&&(Ka|=n),be===4&&oa(e,kt,Mn,!1)),ui(e))}function p0(e,t,n){if(Kt&6)throw Error(q(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Co(e,t),a=i?kS(e,t):Pu(e,t,!0),r=i;do{if(a===0){bs&&!i&&oa(e,t,0,!1);break}else{if(n=e.current.alternate,r&&!GS(n)){a=Pu(e,t,!1),r=!1;continue}if(a===2){if(r=t,e.errorRecoveryDisabledLanes&r)var s=0;else s=e.pendingLanes&-536870913,s=s!==0?s:s&536870912?536870912:0;if(s!==0){t=s;t:{var o=e;a=ro;var l=o.current.memoizedState.isDehydrated;if(l&&(fs(o,s).flags|=256),s=Pu(o,s,!1),s!==2){if(Gh&&!l){o.errorRecoveryDisabledLanes|=r,Ka|=r,a=4;break t}r=ln,ln=a,r!==null&&(ln===null?ln=r:ln.push.apply(ln,r))}a=s}if(r=!1,a!==2)continue}}if(a===1){fs(e,0),oa(e,t,0,!0);break}t:{switch(i=e,r=a,r){case 0:case 1:throw Error(q(345));case 4:if((t&4194048)!==t)break;case 6:oa(i,t,Mn,!sa);break t;case 2:ln=null;break;case 3:case 5:break;default:throw Error(q(329))}if((t&62914560)===t&&(a=Yc+300-En(),10<a)){if(oa(i,t,Mn,!sa),Ic(i,0,!0)!==0)break t;Ni=t,i.timeoutHandle=O0(vm.bind(null,i,n,ln,vc,nd,t,Mn,Ka,cs,sa,r,"Throttled",-0,0),a);break t}vm(i,n,ln,vc,nd,t,Mn,Ka,cs,sa,r,null,-0,0)}}break}while(!0);ui(e)}function vm(e,t,n,i,a,r,s,o,l,c,d,h,f,p){if(e.timeoutHandle=-1,h=t.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ri},o0(t,r,h);var _=(r&62914560)===r?Yc-En():(r&4194048)===r?f0-En():0;if(_=TM(h,_),_!==null){Ni=r,e.cancelPendingCommit=_(xm.bind(null,e,t,r,n,i,a,s,o,l,d,h,null,f,p)),oa(e,r,s,!c);return}}xm(e,t,r,n,i,a,s,o,l)}function GS(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],r=a.getSnapshot;a=a.value;try{if(!Cn(r(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function oa(e,t,n,i){t&=~Vh,t&=~Ka,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var r=31-Tn(a),s=1<<r;i[r]=-1,a&=~s}n!==0&&_v(e,n,t)}function Zc(){return Kt&6?!0:(Po(0),!1)}function kh(){if(Vt!==null){if(ae===0)var e=Vt.return;else e=Vt,Ci=cr=null,Ch(e),Qr=null,vo=0,e=Vt;for(;e!==null;)j_(e.alternate,e),e=e.return;Vt=null}}function fs(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,oM(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Ni=0,kh(),ce=e,Vt=n=Ui(e.current,null),kt=t,ae=0,xn=null,sa=!1,bs=Co(e,t),Gh=!1,cs=Mn=Vh=Ka=Ea=be=0,ln=ro=null,nd=!1,t&8&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-Tn(i),r=1<<a;t|=e[a],i&=~r}return Bi=t,Gc(),n}function m0(e,t){Nt=null,Et.H=xo,t===Es||t===kc?(t=Zp(),ae=3):t===Sh?(t=Zp(),ae=4):ae=t===Ih?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,xn=t,Vt===null&&(be=1,hc(e,In(t,e.current)))}function g0(){var e=wn.current;return e===null?!0:(kt&4194048)===kt?Hn===null:(kt&62914560)===kt||kt&536870912?e===Hn:!1}function v0(){var e=Et.H;return Et.H=xo,e===null?xo:e}function _0(){var e=Et.A;return Et.A=FS,e}function _c(){be=4,sa||(kt&4194048)!==kt&&wn.current!==null||(bs=!0),!(Ea&134217727)&&!(Ka&134217727)||ce===null||oa(ce,kt,Mn,!1)}function Pu(e,t,n){var i=Kt;Kt|=2;var a=v0(),r=_0();(ce!==e||kt!==t)&&(vc=null,fs(e,t)),t=!1;var s=be;t:do try{if(ae!==0&&Vt!==null){var o=Vt,l=xn;switch(ae){case 8:kh(),s=6;break t;case 3:case 2:case 9:case 6:wn.current===null&&(t=!0);var c=ae;if(ae=0,xn=null,Wr(e,o,l,c),n&&bs){s=0;break t}break;default:c=ae,ae=0,xn=null,Wr(e,o,l,c)}}VS(),s=be;break}catch(d){m0(e,d)}while(!0);return t&&e.shellSuspendCounter++,Ci=cr=null,Kt=i,Et.H=a,Et.A=r,Vt===null&&(ce=null,kt=0,Gc()),s}function VS(){for(;Vt!==null;)x0(Vt)}function kS(e,t){var n=Kt;Kt|=2;var i=v0(),a=_0();ce!==e||kt!==t?(vc=null,gc=En()+500,fs(e,t)):bs=Co(e,t);t:do try{if(ae!==0&&Vt!==null){t=Vt;var r=xn;e:switch(ae){case 1:ae=0,xn=null,Wr(e,t,r,1);break;case 2:case 9:if(Yp(r)){ae=0,xn=null,_m(t);break}t=function(){ae!==2&&ae!==9||ce!==e||(ae=7),ui(e)},r.then(t,t);break t;case 3:ae=7;break t;case 4:ae=5;break t;case 7:Yp(r)?(ae=0,xn=null,_m(t)):(ae=0,xn=null,Wr(e,t,r,7));break;case 5:var s=null;switch(Vt.tag){case 26:s=Vt.memoizedState;case 5:case 27:var o=Vt;if(s?F0(s):o.stateNode.complete){ae=0,xn=null;var l=o.sibling;if(l!==null)Vt=l;else{var c=o.return;c!==null?(Vt=c,Kc(c)):Vt=null}break e}}ae=0,xn=null,Wr(e,t,r,5);break;case 6:ae=0,xn=null,Wr(e,t,r,6);break;case 8:kh(),be=6;break t;default:throw Error(q(462))}}XS();break}catch(d){m0(e,d)}while(!0);return Ci=cr=null,Et.H=i,Et.A=a,Kt=n,Vt!==null?0:(ce=null,kt=0,Gc(),be)}function XS(){for(;Vt!==null&&!hy();)x0(Vt)}function x0(e){var t=q_(e.alternate,e,Bi);e.memoizedProps=e.pendingProps,t===null?Kc(e):Vt=t}function _m(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=fm(n,t,t.pendingProps,t.type,void 0,kt);break;case 11:t=fm(n,t,t.pendingProps,t.type.render,t.ref,kt);break;case 5:Ch(t);default:j_(n,t),t=Vt=jv(t,Bi),t=q_(n,t,Bi)}e.memoizedProps=e.pendingProps,t===null?Kc(e):Vt=t}function Wr(e,t,n,i){Ci=cr=null,Ch(t),Qr=null,vo=0;var a=t.return;try{if(LS(e,a,t,n,kt)){be=1,hc(e,In(n,e.current)),Vt=null;return}}catch(r){if(a!==null)throw Vt=a,r;be=1,hc(e,In(n,e.current)),Vt=null;return}t.flags&32768?(Wt||i===1?e=!0:bs||kt&536870912?e=!1:(sa=e=!0,(i===2||i===9||i===3||i===6)&&(i=wn.current,i!==null&&i.tag===13&&(i.flags|=16384))),y0(t,e)):Kc(t)}function Kc(e){var t=e;do{if(t.flags&32768){y0(t,sa);return}e=t.return;var n=PS(t.alternate,t,Bi);if(n!==null){Vt=n;return}if(t=t.sibling,t!==null){Vt=t;return}Vt=t=e}while(t!==null);be===0&&(be=5)}function y0(e,t){do{var n=zS(e.alternate,e);if(n!==null){n.flags&=32767,Vt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Vt=e;return}Vt=e=n}while(e!==null);be=6,Vt=null}function xm(e,t,n,i,a,r,s,o,l){e.cancelPendingCommit=null;do Qc();while(Oe!==0);if(Kt&6)throw Error(q(327));if(t!==null){if(t===e.current)throw Error(q(177));if(r=t.lanes|t.childLanes,r|=ph,Ey(e,n,r,s,o,l),e===ce&&(Vt=ce=null,kt=0),us=t,pa=e,Ni=n,id=r,ad=a,d0=i,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,YS(nc,function(){return T0(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,t.subtreeFlags&13878||i){i=Et.T,Et.T=null,a=Qt.p,Qt.p=2,s=Kt,Kt|=4;try{IS(e,t,n)}finally{Kt=s,Qt.p=a,Et.T=i}}Oe=1,S0(),M0(),E0()}}function S0(){if(Oe===1){Oe=0;var e=pa,t=us,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=Et.T,Et.T=null;var i=Qt.p;Qt.p=2;var a=Kt;Kt|=4;try{a0(t,e);var r=cd,s=Fv(e.containerInfo),o=r.focusedElem,l=r.selectionRange;if(s!==o&&o&&o.ownerDocument&&Bv(o.ownerDocument.documentElement,o)){if(l!==null&&hh(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var h=o.ownerDocument||document,f=h&&h.defaultView||window;if(f.getSelection){var p=f.getSelection(),_=o.textContent.length,x=Math.min(l.start,_),m=l.end===void 0?x:Math.min(l.end,_);!p.extend&&x>m&&(s=m,m=x,x=s);var u=Gp(o,x),g=Gp(o,m);if(u&&g&&(p.rangeCount!==1||p.anchorNode!==u.node||p.anchorOffset!==u.offset||p.focusNode!==g.node||p.focusOffset!==g.offset)){var v=h.createRange();v.setStart(u.node,u.offset),p.removeAllRanges(),x>m?(p.addRange(v),p.extend(g.node,g.offset)):(v.setEnd(g.node,g.offset),p.addRange(v))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var y=h[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Ac=!!ld,cd=ld=null}finally{Kt=a,Qt.p=i,Et.T=n}}e.current=t,Oe=2}}function M0(){if(Oe===2){Oe=0;var e=pa,t=us,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=Et.T,Et.T=null;var i=Qt.p;Qt.p=2;var a=Kt;Kt|=4;try{$_(e,t.alternate,t)}finally{Kt=a,Qt.p=i,Et.T=n}}Oe=3}}function E0(){if(Oe===4||Oe===3){Oe=0,py();var e=pa,t=us,n=Ni,i=d0;t.subtreeFlags&10256||t.flags&10256?Oe=5:(Oe=0,us=pa=null,b0(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(ha=null),sh(n),t=t.stateNode,bn&&typeof bn.onCommitFiberRoot=="function")try{bn.onCommitFiberRoot(Ro,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=Et.T,a=Qt.p,Qt.p=2,Et.T=null;try{for(var r=e.onRecoverableError,s=0;s<i.length;s++){var o=i[s];r(o.value,{componentStack:o.stack})}}finally{Et.T=t,Qt.p=a}}Ni&3&&Qc(),ui(e),a=e.pendingLanes,n&261930&&a&42?e===rd?so++:(so=0,rd=e):so=0,Po(0)}}function b0(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Lo(t)))}function Qc(){return S0(),M0(),E0(),T0()}function T0(){if(Oe!==5)return!1;var e=pa,t=id;id=0;var n=sh(Ni),i=Et.T,a=Qt.p;try{Qt.p=32>n?32:n,Et.T=null,n=ad,ad=null;var r=pa,s=Ni;if(Oe=0,us=pa=null,Ni=0,Kt&6)throw Error(q(331));var o=Kt;if(Kt|=4,c0(r.current),s0(r,r.current,s,n),Kt=o,Po(0,!1),bn&&typeof bn.onPostCommitFiberRoot=="function")try{bn.onPostCommitFiberRoot(Ro,r)}catch{}return!0}finally{Qt.p=a,Et.T=i,b0(e,t)}}function ym(e,t,n){t=In(n,t),t=Jf(e.stateNode,t,2),e=da(e,t,2),e!==null&&(wo(e,2),ui(e))}function re(e,t,n){if(e.tag===3)ym(e,e,n);else for(;t!==null;){if(t.tag===3){ym(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ha===null||!ha.has(i))){e=In(n,e),n=H_(2),i=da(t,n,2),i!==null&&(G_(n,i,t,e),wo(i,2),ui(i));break}}t=t.return}}function zu(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new HS;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Gh=!0,a.add(n),e=WS.bind(null,e,t,n),t.then(e,e))}function WS(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ce===e&&(kt&n)===n&&(be===4||be===3&&(kt&62914560)===kt&&300>En()-Yc?!(Kt&2)&&fs(e,0):Vh|=n,cs===kt&&(cs=0)),ui(e)}function A0(e,t){t===0&&(t=vv()),e=lr(e,t),e!==null&&(wo(e,t),ui(e))}function qS(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),A0(e,n)}function jS(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(q(314))}i!==null&&i.delete(t),A0(e,n)}function YS(e,t){return ah(e,t)}var xc=null,Nr=null,sd=!1,yc=!1,Iu=!1,la=0;function ui(e){e!==Nr&&e.next===null&&(Nr===null?xc=Nr=e:Nr=Nr.next=e),yc=!0,sd||(sd=!0,KS())}function Po(e,t){if(!Iu&&yc){Iu=!0;do for(var n=!1,i=xc;i!==null;){if(e!==0){var a=i.pendingLanes;if(a===0)var r=0;else{var s=i.suspendedLanes,o=i.pingedLanes;r=(1<<31-Tn(42|e)+1)-1,r&=a&~(s&~o),r=r&201326741?r&201326741|1:r?r|2:0}r!==0&&(n=!0,Sm(i,r))}else r=kt,r=Ic(i,i===ce?r:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(r&3)||Co(i,r)||(n=!0,Sm(i,r));i=i.next}while(n);Iu=!1}}function ZS(){R0()}function R0(){yc=sd=!1;var e=0;la!==0&&sM()&&(e=la);for(var t=En(),n=null,i=xc;i!==null;){var a=i.next,r=C0(i,t);r===0?(i.next=null,n===null?xc=a:n.next=a,a===null&&(Nr=n)):(n=i,(e!==0||r&3)&&(yc=!0)),i=a}Oe!==0&&Oe!==5||Po(e),la!==0&&(la=0)}function C0(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,r=e.pendingLanes&-62914561;0<r;){var s=31-Tn(r),o=1<<s,l=a[s];l===-1?(!(o&n)||o&i)&&(a[s]=My(o,t)):l<=t&&(e.expiredLanes|=o),r&=~o}if(t=ce,n=kt,n=Ic(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(ae===2||ae===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&fu(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Co(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&fu(i),sh(n)){case 2:case 8:n=mv;break;case 32:n=nc;break;case 268435456:n=gv;break;default:n=nc}return i=w0.bind(null,e),n=ah(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&fu(i),e.callbackPriority=2,e.callbackNode=null,2}function w0(e,t){if(Oe!==0&&Oe!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Qc()&&e.callbackNode!==n)return null;var i=kt;return i=Ic(e,e===ce?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(p0(e,i,t),C0(e,En()),e.callbackNode!=null&&e.callbackNode===n?w0.bind(null,e):null)}function Sm(e,t){if(Qc())return null;p0(e,t,!0)}function KS(){lM(function(){Kt&6?ah(pv,ZS):R0()})}function Xh(){if(la===0){var e=ss;e===0&&(e=Yo,Yo<<=1,!(Yo&261888)&&(Yo=256)),la=e}return la}function Mm(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Nl(""+e)}function Em(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function QS(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var r=Mm((a[hn]||null).action),s=i.submitter;s&&(t=(t=s[hn]||null)?Mm(t.formAction):s.getAttribute("formAction"),t!==null&&(r=t,s=null));var o=new Bc("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(la!==0){var l=s?Em(a,s):new FormData(a);Kf(n,{pending:!0,data:l,method:a.method,action:r},null,l)}}else typeof r=="function"&&(o.preventDefault(),l=s?Em(a,s):new FormData(a),Kf(n,{pending:!0,data:l,method:a.method,action:r},r,l))},currentTarget:a}]})}}for(var Bu=0;Bu<Bf.length;Bu++){var Fu=Bf[Bu],JS=Fu.toLowerCase(),$S=Fu[0].toUpperCase()+Fu.slice(1);Jn(JS,"on"+$S)}Jn(Gv,"onAnimationEnd");Jn(Vv,"onAnimationIteration");Jn(kv,"onAnimationStart");Jn("dblclick","onDoubleClick");Jn("focusin","onFocus");Jn("focusout","onBlur");Jn(mS,"onTransitionRun");Jn(gS,"onTransitionStart");Jn(vS,"onTransitionCancel");Jn(Xv,"onTransitionEnd");as("onMouseEnter",["mouseout","mouseover"]);as("onMouseLeave",["mouseout","mouseover"]);as("onPointerEnter",["pointerout","pointerover"]);as("onPointerLeave",["pointerout","pointerover"]);rr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));rr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));rr("onBeforeInput",["compositionend","keypress","textInput","paste"]);rr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));rr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));rr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),tM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(yo));function D0(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var r=void 0;if(t)for(var s=i.length-1;0<=s;s--){var o=i[s],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==r&&a.isPropagationStopped())break t;r=o,a.currentTarget=c;try{r(a)}catch(d){ac(d)}a.currentTarget=null,r=l}else for(s=0;s<i.length;s++){if(o=i[s],l=o.instance,c=o.currentTarget,o=o.listener,l!==r&&a.isPropagationStopped())break t;r=o,a.currentTarget=c;try{r(a)}catch(d){ac(d)}a.currentTarget=null,r=l}}}}function Gt(e,t){var n=t[Df];n===void 0&&(n=t[Df]=new Set);var i=e+"__bubble";n.has(i)||(U0(t,e,2,!1),n.add(i))}function Hu(e,t,n){var i=0;t&&(i|=4),U0(n,e,i,t)}var al="_reactListening"+Math.random().toString(36).slice(2);function Wh(e){if(!e[al]){e[al]=!0,Mv.forEach(function(n){n!=="selectionchange"&&(tM.has(n)||Hu(n,!1,e),Hu(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[al]||(t[al]=!0,Hu("selectionchange",!1,t))}}function U0(e,t,n,i){switch(X0(t)){case 2:var a=CM;break;case 8:a=wM;break;default:a=Zh}n=a.bind(null,t,n,e),a=void 0,!Pf||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function Gu(e,t,n,i,a){var r=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var s=i.tag;if(s===3||s===4){var o=i.stateNode.containerInfo;if(o===a)break;if(s===4)for(s=i.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===a)return;s=s.return}for(;o!==null;){if(s=zr(o),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){i=r=s;continue t}o=o.parentNode}}i=i.return}Dv(function(){var c=r,d=ch(n),h=[];t:{var f=Wv.get(e);if(f!==void 0){var p=Bc,_=e;switch(e){case"keypress":if(Pl(n)===0)break t;case"keydown":case"keyup":p=jy;break;case"focusin":_="focus",p=gu;break;case"focusout":_="blur",p=gu;break;case"beforeblur":case"afterblur":p=gu;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Up;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=Py;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=Ky;break;case Gv:case Vv:case kv:p=By;break;case Xv:p=Jy;break;case"scroll":case"scrollend":p=Ny;break;case"wheel":p=tS;break;case"copy":case"cut":case"paste":p=Hy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Np;break;case"toggle":case"beforetoggle":p=nS}var x=(t&4)!==0,m=!x&&(e==="scroll"||e==="scrollend"),u=x?f!==null?f+"Capture":null:f;x=[];for(var g=c,v;g!==null;){var y=g;if(v=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||v===null||u===null||(y=fo(g,u),y!=null&&x.push(So(g,y,v))),m)break;g=g.return}0<x.length&&(f=new p(f,_,null,n,d),h.push({event:f,listeners:x}))}}if(!(t&7)){t:{if(f=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",f&&n!==Of&&(_=n.relatedTarget||n.fromElement)&&(zr(_)||_[ys]))break t;if((p||f)&&(f=d.window===d?d:(f=d.ownerDocument)?f.defaultView||f.parentWindow:window,p?(_=n.relatedTarget||n.toElement,p=c,_=_?zr(_):null,_!==null&&(m=Ao(_),x=_.tag,_!==m||x!==5&&x!==27&&x!==6)&&(_=null)):(p=null,_=c),p!==_)){if(x=Up,y="onMouseLeave",u="onMouseEnter",g="mouse",(e==="pointerout"||e==="pointerover")&&(x=Np,y="onPointerLeave",u="onPointerEnter",g="pointer"),m=p==null?f:Xs(p),v=_==null?f:Xs(_),f=new x(y,g+"leave",p,n,d),f.target=m,f.relatedTarget=v,y=null,zr(d)===c&&(x=new x(u,g+"enter",_,n,d),x.target=v,x.relatedTarget=m,y=x),m=y,p&&_)e:{for(x=eM,u=p,g=_,v=0,y=u;y;y=x(y))v++;y=0;for(var w=g;w;w=x(w))y++;for(;0<v-y;)u=x(u),v--;for(;0<y-v;)g=x(g),y--;for(;v--;){if(u===g||g!==null&&u===g.alternate){x=u;break e}u=x(u),g=x(g)}x=null}else x=null;p!==null&&bm(h,f,p,x,!1),_!==null&&m!==null&&bm(h,m,_,x,!0)}}t:{if(f=c?Xs(c):window,p=f.nodeName&&f.nodeName.toLowerCase(),p==="select"||p==="input"&&f.type==="file")var R=Ip;else if(zp(f))if(zv)R=dS;else{R=uS;var T=cS}else p=f.nodeName,!p||p.toLowerCase()!=="input"||f.type!=="checkbox"&&f.type!=="radio"?c&&lh(c.elementType)&&(R=Ip):R=fS;if(R&&(R=R(e,c))){Pv(h,R,n,d);break t}T&&T(e,f,c),e==="focusout"&&c&&f.type==="number"&&c.memoizedProps.value!=null&&Nf(f,"number",f.value)}switch(T=c?Xs(c):window,e){case"focusin":(zp(T)||T.contentEditable==="true")&&(Fr=T,zf=c,Qs=null);break;case"focusout":Qs=zf=Fr=null;break;case"mousedown":If=!0;break;case"contextmenu":case"mouseup":case"dragend":If=!1,Vp(h,n,d);break;case"selectionchange":if(pS)break;case"keydown":case"keyup":Vp(h,n,d)}var L;if(dh)t:{switch(e){case"compositionstart":var b="onCompositionStart";break t;case"compositionend":b="onCompositionEnd";break t;case"compositionupdate":b="onCompositionUpdate";break t}b=void 0}else Br?Nv(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Lv&&n.locale!=="ko"&&(Br||b!=="onCompositionStart"?b==="onCompositionEnd"&&Br&&(L=Uv()):(ra=d,uh="value"in ra?ra.value:ra.textContent,Br=!0)),T=Sc(c,b),0<T.length&&(b=new Lp(b,e,null,n,d),h.push({event:b,listeners:T}),L?b.data=L:(L=Ov(n),L!==null&&(b.data=L)))),(L=aS?rS(e,n):sS(e,n))&&(b=Sc(c,"onBeforeInput"),0<b.length&&(T=new Lp("onBeforeInput","beforeinput",null,n,d),h.push({event:T,listeners:b}),T.data=L)),QS(h,e,c,n,d)}D0(h,t)})}function So(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Sc(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,r=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||r===null||(a=fo(e,n),a!=null&&i.unshift(So(e,a,r)),a=fo(e,t),a!=null&&i.push(So(e,a,r))),e.tag===3)return i;e=e.return}return[]}function eM(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function bm(e,t,n,i,a){for(var r=t._reactName,s=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=fo(n,r),c!=null&&s.unshift(So(n,c,l))):a||(c=fo(n,r),c!=null&&s.push(So(n,c,l)))),n=n.return}s.length!==0&&e.push({event:t,listeners:s})}var nM=/\r\n?/g,iM=/\u0000|\uFFFD/g;function Tm(e){return(typeof e=="string"?e:""+e).replace(nM,`
`).replace(iM,"")}function L0(e,t){return t=Tm(t),Tm(e)===t}function oe(e,t,n,i,a,r){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||rs(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&rs(e,""+i);break;case"className":Qo(e,"class",i);break;case"tabIndex":Qo(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Qo(e,n,i);break;case"style":wv(e,i,r);break;case"data":if(t!=="object"){Qo(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Nl(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof r=="function"&&(n==="formAction"?(t!=="input"&&oe(e,t,"name",a.name,a,null),oe(e,t,"formEncType",a.formEncType,a,null),oe(e,t,"formMethod",a.formMethod,a,null),oe(e,t,"formTarget",a.formTarget,a,null)):(oe(e,t,"encType",a.encType,a,null),oe(e,t,"method",a.method,a,null),oe(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Nl(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Ri);break;case"onScroll":i!=null&&Gt("scroll",e);break;case"onScrollEnd":i!=null&&Gt("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(q(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(q(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Nl(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Gt("beforetoggle",e),Gt("toggle",e),Ll(e,"popover",i);break;case"xlinkActuate":di(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":di(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":di(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":di(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":di(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":di(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":di(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":di(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":di(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Ll(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=Uy.get(n)||n,Ll(e,n,i))}}function od(e,t,n,i,a,r){switch(n){case"style":wv(e,i,r);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(q(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(q(60));e.innerHTML=n}}break;case"children":typeof i=="string"?rs(e,i):(typeof i=="number"||typeof i=="bigint")&&rs(e,""+i);break;case"onScroll":i!=null&&Gt("scroll",e);break;case"onScrollEnd":i!=null&&Gt("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Ri);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Ev.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),r=e[hn]||null,r=r!=null?r[n]:null,typeof r=="function"&&e.removeEventListener(t,r,a),typeof i=="function")){typeof r!="function"&&r!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Ll(e,n,i)}}}function Ke(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Gt("error",e),Gt("load",e);var i=!1,a=!1,r;for(r in n)if(n.hasOwnProperty(r)){var s=n[r];if(s!=null)switch(r){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(q(137,t));default:oe(e,t,r,s,n,null)}}a&&oe(e,t,"srcSet",n.srcSet,n,null),i&&oe(e,t,"src",n.src,n,null);return;case"input":Gt("invalid",e);var o=r=s=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":s=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":r=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(q(137,t));break;default:oe(e,t,i,d,n,null)}}Av(e,r,o,l,c,s,a,!1);return;case"select":Gt("invalid",e),i=s=r=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":r=o;break;case"defaultValue":s=o;break;case"multiple":i=o;default:oe(e,t,a,o,n,null)}t=r,n=s,e.multiple=!!i,t!=null?Yr(e,!!i,t,!1):n!=null&&Yr(e,!!i,n,!0);return;case"textarea":Gt("invalid",e),r=a=i=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":i=o;break;case"defaultValue":a=o;break;case"children":r=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(q(91));break;default:oe(e,t,s,o,n,null)}Cv(e,i,a,r);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:oe(e,t,l,i,n,null)}return;case"dialog":Gt("beforetoggle",e),Gt("toggle",e),Gt("cancel",e),Gt("close",e);break;case"iframe":case"object":Gt("load",e);break;case"video":case"audio":for(i=0;i<yo.length;i++)Gt(yo[i],e);break;case"image":Gt("error",e),Gt("load",e);break;case"details":Gt("toggle",e);break;case"embed":case"source":case"link":Gt("error",e),Gt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(q(137,t));default:oe(e,t,c,i,n,null)}return;default:if(lh(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&od(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&oe(e,t,o,i,n,null))}function aM(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,r=null,s=null,o=null,l=null,c=null,d=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||oe(e,t,p,null,i,h)}}for(var f in i){var p=i[f];if(h=n[f],i.hasOwnProperty(f)&&(p!=null||h!=null))switch(f){case"type":r=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":s=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(q(137,t));break;default:p!==h&&oe(e,t,f,p,i,h)}}Lf(e,s,o,l,c,d,r,a);return;case"select":p=s=o=f=null;for(r in n)if(l=n[r],n.hasOwnProperty(r)&&l!=null)switch(r){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(r)||oe(e,t,r,null,i,l)}for(a in i)if(r=i[a],l=n[a],i.hasOwnProperty(a)&&(r!=null||l!=null))switch(a){case"value":f=r;break;case"defaultValue":o=r;break;case"multiple":s=r;default:r!==l&&oe(e,t,a,r,i,l)}t=o,n=s,i=p,f!=null?Yr(e,!!n,f,!1):!!i!=!!n&&(t!=null?Yr(e,!!n,t,!0):Yr(e,!!n,n?[]:"",!1));return;case"textarea":p=f=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:oe(e,t,o,null,i,a)}for(s in i)if(a=i[s],r=n[s],i.hasOwnProperty(s)&&(a!=null||r!=null))switch(s){case"value":f=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(q(91));break;default:a!==r&&oe(e,t,s,a,i,r)}Rv(e,f,p);return;case"option":for(var _ in n)if(f=n[_],n.hasOwnProperty(_)&&f!=null&&!i.hasOwnProperty(_))switch(_){case"selected":e.selected=!1;break;default:oe(e,t,_,null,i,f)}for(l in i)if(f=i[l],p=n[l],i.hasOwnProperty(l)&&f!==p&&(f!=null||p!=null))switch(l){case"selected":e.selected=f&&typeof f!="function"&&typeof f!="symbol";break;default:oe(e,t,l,f,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)f=n[x],n.hasOwnProperty(x)&&f!=null&&!i.hasOwnProperty(x)&&oe(e,t,x,null,i,f);for(c in i)if(f=i[c],p=n[c],i.hasOwnProperty(c)&&f!==p&&(f!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(q(137,t));break;default:oe(e,t,c,f,i,p)}return;default:if(lh(t)){for(var m in n)f=n[m],n.hasOwnProperty(m)&&f!==void 0&&!i.hasOwnProperty(m)&&od(e,t,m,void 0,i,f);for(d in i)f=i[d],p=n[d],!i.hasOwnProperty(d)||f===p||f===void 0&&p===void 0||od(e,t,d,f,i,p);return}}for(var u in n)f=n[u],n.hasOwnProperty(u)&&f!=null&&!i.hasOwnProperty(u)&&oe(e,t,u,null,i,f);for(h in i)f=i[h],p=n[h],!i.hasOwnProperty(h)||f===p||f==null&&p==null||oe(e,t,h,f,i,p)}function Am(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function rM(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],r=a.transferSize,s=a.initiatorType,o=a.duration;if(r&&o&&Am(s)){for(s=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,h=l.initiatorType;d&&Am(h)&&(l=l.responseEnd,s+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(r+s)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var ld=null,cd=null;function Mc(e){return e.nodeType===9?e:e.ownerDocument}function Rm(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function N0(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function ud(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Vu=null;function sM(){var e=window.event;return e&&e.type==="popstate"?e===Vu?!1:(Vu=e,!0):(Vu=null,!1)}var O0=typeof setTimeout=="function"?setTimeout:void 0,oM=typeof clearTimeout=="function"?clearTimeout:void 0,Cm=typeof Promise=="function"?Promise:void 0,lM=typeof queueMicrotask=="function"?queueMicrotask:typeof Cm<"u"?function(e){return Cm.resolve(null).then(e).catch(cM)}:O0;function cM(e){setTimeout(function(){throw e})}function Aa(e){return e==="head"}function wm(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),hs(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")oo(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,oo(n);for(var r=n.firstChild;r;){var s=r.nextSibling,o=r.nodeName;r[Do]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&r.rel.toLowerCase()==="stylesheet"||n.removeChild(r),r=s}}else n==="body"&&oo(e.ownerDocument.body);n=a}while(n);hs(t)}function Dm(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function fd(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":fd(n),oh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function uM(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[Do])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(r=e.getAttribute("rel"),r==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(r!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(r=e.getAttribute("src"),(r!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&r&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var r=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===r)return e}else return e;if(e=Gn(e.nextSibling),e===null)break}return null}function fM(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Gn(e.nextSibling),e===null))return null;return e}function P0(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Gn(e.nextSibling),e===null))return null;return e}function dd(e){return e.data==="$?"||e.data==="$~"}function hd(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function dM(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Gn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var pd=null;function Um(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Gn(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Lm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function z0(e,t,n){switch(t=Mc(n),e){case"html":if(e=t.documentElement,!e)throw Error(q(452));return e;case"head":if(e=t.head,!e)throw Error(q(453));return e;case"body":if(e=t.body,!e)throw Error(q(454));return e;default:throw Error(q(451))}}function oo(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);oh(e)}var Vn=new Map,Nm=new Set;function Ec(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Vi=Qt.d;Qt.d={f:hM,r:pM,D:mM,C:gM,L:vM,m:_M,X:yM,S:xM,M:SM};function hM(){var e=Vi.f(),t=Zc();return e||t}function pM(e){var t=Ss(e);t!==null&&t.tag===5&&t.type==="form"?w_(t):Vi.r(e)}var Ts=typeof document>"u"?null:document;function I0(e,t,n){var i=Ts;if(i&&typeof t=="string"&&t){var a=zn(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),Nm.has(a)||(Nm.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),Ke(t,"link",e),Ge(t),i.head.appendChild(t)))}}function mM(e){Vi.D(e),I0("dns-prefetch",e,null)}function gM(e,t){Vi.C(e,t),I0("preconnect",e,t)}function vM(e,t,n){Vi.L(e,t,n);var i=Ts;if(i&&e&&t){var a='link[rel="preload"][as="'+zn(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+zn(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+zn(n.imageSizes)+'"]')):a+='[href="'+zn(e)+'"]';var r=a;switch(t){case"style":r=ds(e);break;case"script":r=As(e)}Vn.has(r)||(e=ge({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Vn.set(r,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(zo(r))||t==="script"&&i.querySelector(Io(r))||(t=i.createElement("link"),Ke(t,"link",e),Ge(t),i.head.appendChild(t)))}}function _M(e,t){Vi.m(e,t);var n=Ts;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+zn(i)+'"][href="'+zn(e)+'"]',r=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":r=As(e)}if(!Vn.has(r)&&(e=ge({rel:"modulepreload",href:e},t),Vn.set(r,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Io(r)))return}i=n.createElement("link"),Ke(i,"link",e),Ge(i),n.head.appendChild(i)}}}function xM(e,t,n){Vi.S(e,t,n);var i=Ts;if(i&&e){var a=jr(i).hoistableStyles,r=ds(e);t=t||"default";var s=a.get(r);if(!s){var o={loading:0,preload:null};if(s=i.querySelector(zo(r)))o.loading=5;else{e=ge({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Vn.get(r))&&qh(e,n);var l=s=i.createElement("link");Ge(l),Ke(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,kl(s,t,i)}s={type:"stylesheet",instance:s,count:1,state:o},a.set(r,s)}}}function yM(e,t){Vi.X(e,t);var n=Ts;if(n&&e){var i=jr(n).hoistableScripts,a=As(e),r=i.get(a);r||(r=n.querySelector(Io(a)),r||(e=ge({src:e,async:!0},t),(t=Vn.get(a))&&jh(e,t),r=n.createElement("script"),Ge(r),Ke(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(a,r))}}function SM(e,t){Vi.M(e,t);var n=Ts;if(n&&e){var i=jr(n).hoistableScripts,a=As(e),r=i.get(a);r||(r=n.querySelector(Io(a)),r||(e=ge({src:e,async:!0,type:"module"},t),(t=Vn.get(a))&&jh(e,t),r=n.createElement("script"),Ge(r),Ke(r,"link",e),n.head.appendChild(r)),r={type:"script",instance:r,count:1,state:null},i.set(a,r))}}function Om(e,t,n,i){var a=(a=ca.current)?Ec(a):null;if(!a)throw Error(q(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=ds(n.href),n=jr(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=ds(n.href);var r=jr(a).hoistableStyles,s=r.get(e);if(s||(a=a.ownerDocument||a,s={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},r.set(e,s),(r=a.querySelector(zo(e)))&&!r._p&&(s.instance=r,s.state.loading=5),Vn.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Vn.set(e,n),r||MM(a,e,n,s.state))),t&&i===null)throw Error(q(528,""));return s}if(t&&i!==null)throw Error(q(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=As(n),n=jr(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(q(444,e))}}function ds(e){return'href="'+zn(e)+'"'}function zo(e){return'link[rel="stylesheet"]['+e+"]"}function B0(e){return ge({},e,{"data-precedence":e.precedence,precedence:null})}function MM(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),Ke(t,"link",n),Ge(t),e.head.appendChild(t))}function As(e){return'[src="'+zn(e)+'"]'}function Io(e){return"script[async]"+e}function Pm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+zn(n.href)+'"]');if(i)return t.instance=i,Ge(i),i;var a=ge({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Ge(i),Ke(i,"style",a),kl(i,n.precedence,e),t.instance=i;case"stylesheet":a=ds(n.href);var r=e.querySelector(zo(a));if(r)return t.state.loading|=4,t.instance=r,Ge(r),r;i=B0(n),(a=Vn.get(a))&&qh(i,a),r=(e.ownerDocument||e).createElement("link"),Ge(r);var s=r;return s._p=new Promise(function(o,l){s.onload=o,s.onerror=l}),Ke(r,"link",i),t.state.loading|=4,kl(r,n.precedence,e),t.instance=r;case"script":return r=As(n.src),(a=e.querySelector(Io(r)))?(t.instance=a,Ge(a),a):(i=n,(a=Vn.get(r))&&(i=ge({},n),jh(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Ge(a),Ke(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(q(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,kl(i,n.precedence,e));return t.instance}function kl(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,r=a,s=0;s<i.length;s++){var o=i[s];if(o.dataset.precedence===t)r=o;else if(r!==a)break}r?r.parentNode.insertBefore(e,r.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function qh(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function jh(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Xl=null;function zm(e,t,n){if(Xl===null){var i=new Map,a=Xl=new Map;a.set(n,i)}else a=Xl,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var r=n[a];if(!(r[Do]||r[je]||e==="link"&&r.getAttribute("rel")==="stylesheet")&&r.namespaceURI!=="http://www.w3.org/2000/svg"){var s=r.getAttribute(t)||"";s=e+s;var o=i.get(s);o?o.push(r):i.set(s,[r])}}return i}function Im(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function EM(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function F0(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function bM(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=ds(i.href),r=t.querySelector(zo(a));if(r){t=r._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=bc.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=r,Ge(r);return}r=t.ownerDocument||t,i=B0(i),(a=Vn.get(a))&&qh(i,a),r=r.createElement("link"),Ge(r);var s=r;s._p=new Promise(function(o,l){s.onload=o,s.onerror=l}),Ke(r,"link",i),n.instance=r}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=bc.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var ku=0;function TM(e,t){return e.stylesheets&&e.count===0&&Wl(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&Wl(e,e.stylesheets),e.unsuspend){var r=e.unsuspend;e.unsuspend=null,r()}},6e4+t);0<e.imgBytes&&ku===0&&(ku=62500*rM());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Wl(e,e.stylesheets),e.unsuspend)){var r=e.unsuspend;e.unsuspend=null,r()}},(e.imgBytes>ku?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function bc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Wl(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Tc=null;function Wl(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Tc=new Map,t.forEach(AM,e),Tc=null,bc.call(e))}function AM(e,t){if(!(t.state.loading&4)){var n=Tc.get(e);if(n)var i=n.get(null);else{n=new Map,Tc.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),r=0;r<a.length;r++){var s=a[r];(s.nodeName==="LINK"||s.getAttribute("media")!=="not all")&&(n.set(s.dataset.precedence,s),i=s)}i&&n.set(null,i)}a=t.instance,s=a.getAttribute("data-precedence"),r=n.get(s)||i,r===i&&n.set(null,a),n.set(s,a),this.count++,i=bc.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),r?r.parentNode.insertBefore(a,r.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var Mo={$$typeof:Ai,Provider:null,Consumer:null,_currentValue:qa,_currentValue2:qa,_threadCount:0};function RM(e,t,n,i,a,r,s,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=du(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=du(0),this.hiddenUpdates=du(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=r,this.onRecoverableError=s,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function H0(e,t,n,i,a,r,s,o,l,c,d,h){return e=new RM(e,t,n,s,l,c,d,h,o),t=1,r===!0&&(t|=24),r=Sn(3,null,null,t),e.current=r,r.stateNode=e,t=xh(),t.refCount++,e.pooledCache=t,t.refCount++,r.memoizedState={element:i,isDehydrated:n,cache:t},Mh(r),e}function G0(e){return e?(e=Vr,e):Vr}function V0(e,t,n,i,a,r){a=G0(a),i.context===null?i.context=a:i.pendingContext=a,i=fa(t),i.payload={element:n},r=r===void 0?null:r,r!==null&&(i.callback=r),n=da(e,i,t),n!==null&&(un(n,e,t),$s(n,e,t))}function Bm(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Yh(e,t){Bm(e,t),(e=e.alternate)&&Bm(e,t)}function k0(e){if(e.tag===13||e.tag===31){var t=lr(e,67108864);t!==null&&un(t,e,67108864),Yh(e,67108864)}}function Fm(e){if(e.tag===13||e.tag===31){var t=An();t=rh(t);var n=lr(e,t);n!==null&&un(n,e,t),Yh(e,t)}}var Ac=!0;function CM(e,t,n,i){var a=Et.T;Et.T=null;var r=Qt.p;try{Qt.p=2,Zh(e,t,n,i)}finally{Qt.p=r,Et.T=a}}function wM(e,t,n,i){var a=Et.T;Et.T=null;var r=Qt.p;try{Qt.p=8,Zh(e,t,n,i)}finally{Qt.p=r,Et.T=a}}function Zh(e,t,n,i){if(Ac){var a=md(i);if(a===null)Gu(e,t,i,Rc,n),Hm(e,i);else if(UM(a,e,t,n,i))i.stopPropagation();else if(Hm(e,i),t&4&&-1<DM.indexOf(e)){for(;a!==null;){var r=Ss(a);if(r!==null)switch(r.tag){case 3:if(r=r.stateNode,r.current.memoizedState.isDehydrated){var s=Ia(r.pendingLanes);if(s!==0){var o=r;for(o.pendingLanes|=2,o.entangledLanes|=2;s;){var l=1<<31-Tn(s);o.entanglements[1]|=l,s&=~l}ui(r),!(Kt&6)&&(gc=En()+500,Po(0))}}break;case 31:case 13:o=lr(r,2),o!==null&&un(o,r,2),Zc(),Yh(r,2)}if(r=md(i),r===null&&Gu(e,t,i,Rc,n),r===a)break;a=r}a!==null&&i.stopPropagation()}else Gu(e,t,i,null,n)}}function md(e){return e=ch(e),Kh(e)}var Rc=null;function Kh(e){if(Rc=null,e=zr(e),e!==null){var t=Ao(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=cv(t),e!==null)return e;e=null}else if(n===31){if(e=uv(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Rc=e,null}function X0(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(my()){case pv:return 2;case mv:return 8;case nc:case gy:return 32;case gv:return 268435456;default:return 32}default:return 32}}var gd=!1,ma=null,ga=null,va=null,Eo=new Map,bo=new Map,na=[],DM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Hm(e,t){switch(e){case"focusin":case"focusout":ma=null;break;case"dragenter":case"dragleave":ga=null;break;case"mouseover":case"mouseout":va=null;break;case"pointerover":case"pointerout":Eo.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":bo.delete(t.pointerId)}}function Ps(e,t,n,i,a,r){return e===null||e.nativeEvent!==r?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:r,targetContainers:[a]},t!==null&&(t=Ss(t),t!==null&&k0(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function UM(e,t,n,i,a){switch(t){case"focusin":return ma=Ps(ma,e,t,n,i,a),!0;case"dragenter":return ga=Ps(ga,e,t,n,i,a),!0;case"mouseover":return va=Ps(va,e,t,n,i,a),!0;case"pointerover":var r=a.pointerId;return Eo.set(r,Ps(Eo.get(r)||null,e,t,n,i,a)),!0;case"gotpointercapture":return r=a.pointerId,bo.set(r,Ps(bo.get(r)||null,e,t,n,i,a)),!0}return!1}function W0(e){var t=zr(e.target);if(t!==null){var n=Ao(t);if(n!==null){if(t=n.tag,t===13){if(t=cv(n),t!==null){e.blockedOn=t,bp(e.priority,function(){Fm(n)});return}}else if(t===31){if(t=uv(n),t!==null){e.blockedOn=t,bp(e.priority,function(){Fm(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ql(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=md(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Of=i,n.target.dispatchEvent(i),Of=null}else return t=Ss(n),t!==null&&k0(t),e.blockedOn=n,!1;t.shift()}return!0}function Gm(e,t,n){ql(e)&&n.delete(t)}function LM(){gd=!1,ma!==null&&ql(ma)&&(ma=null),ga!==null&&ql(ga)&&(ga=null),va!==null&&ql(va)&&(va=null),Eo.forEach(Gm),bo.forEach(Gm)}function rl(e,t){e.blockedOn===t&&(e.blockedOn=null,gd||(gd=!0,ze.unstable_scheduleCallback(ze.unstable_NormalPriority,LM)))}var sl=null;function Vm(e){sl!==e&&(sl=e,ze.unstable_scheduleCallback(ze.unstable_NormalPriority,function(){sl===e&&(sl=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Kh(i||n)===null)continue;break}var r=Ss(n);r!==null&&(e.splice(t,3),t-=3,Kf(r,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function hs(e){function t(l){return rl(l,e)}ma!==null&&rl(ma,e),ga!==null&&rl(ga,e),va!==null&&rl(va,e),Eo.forEach(t),bo.forEach(t);for(var n=0;n<na.length;n++){var i=na[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<na.length&&(n=na[0],n.blockedOn===null);)W0(n),n.blockedOn===null&&na.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],r=n[i+1],s=a[hn]||null;if(typeof r=="function")s||Vm(n);else if(s){var o=null;if(r&&r.hasAttribute("formAction")){if(a=r,s=r[hn]||null)o=s.formAction;else if(Kh(a)!==null)continue}else o=s.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Vm(n)}}}function q0(){function e(r){r.canIntercept&&r.info==="react-transition"&&r.intercept({handler:function(){return new Promise(function(s){return a=s})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var r=navigation.currentEntry;r&&r.url!=null&&navigation.navigate(r.url,{state:r.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function Qh(e){this._internalRoot=e}Jc.prototype.render=Qh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(q(409));var n=t.current,i=An();V0(n,i,e,t,null,null)};Jc.prototype.unmount=Qh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;V0(e.current,2,null,e,null,null),Zc(),t[ys]=null}};function Jc(e){this._internalRoot=e}Jc.prototype.unstable_scheduleHydration=function(e){if(e){var t=Sv();e={blockedOn:null,target:e,priority:t};for(var n=0;n<na.length&&t!==0&&t<na[n].priority;n++);na.splice(n,0,e),n===0&&W0(e)}};var km=ov.version;if(km!=="19.2.4")throw Error(q(527,km,"19.2.4"));Qt.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(q(188)):(e=Object.keys(e).join(","),Error(q(268,e)));return e=ly(t),e=e!==null?fv(e):null,e=e===null?null:e.stateNode,e};var NM={bundleType:0,version:"19.2.4",rendererPackageName:"react-dom",currentDispatcherRef:Et,reconcilerVersion:"19.2.4"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var ol=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!ol.isDisabled&&ol.supportsFiber)try{Ro=ol.inject(NM),bn=ol}catch{}}Pc.createRoot=function(e,t){if(!lv(e))throw Error(q(299));var n=!1,i="",a=I_,r=B_,s=F_;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(r=t.onCaughtError),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),t=H0(e,1,!1,null,null,n,i,null,a,r,s,q0),e[ys]=t.current,Wh(e),new Qh(t)};Pc.hydrateRoot=function(e,t,n){if(!lv(e))throw Error(q(299));var i=!1,a="",r=I_,s=B_,o=F_,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(r=n.onUncaughtError),n.onCaughtError!==void 0&&(s=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=H0(e,1,!0,t,n??null,i,a,l,r,s,o,q0),t.context=G0(null),n=t.current,i=An(),i=rh(i),a=fa(i),a.callback=null,da(n,a,i),n=i,t.current.lanes=n,wo(t,n),ui(t),e[ys]=t.current,Wh(e),new Jc(t)};Pc.version="19.2.4";function j0(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(j0)}catch(e){console.error(e)}}j0(),ev.exports=Pc;var OM=ev.exports;const PM=Wg(OM);function zM(e={}){const{enableIntersectionObserver:t=!0,threshold:n=.1}=e,[i,a]=Bt.useState(!1),[r,s]=Bt.useState(!t),[o,l]=Bt.useState(!1),c=Bt.useRef(null);return Bt.useEffect(()=>{if(!t||!c.current)return;const f=new IntersectionObserver(([p])=>{p.isIntersecting&&(s(!0),f.disconnect())},{threshold:n});return f.observe(c.current),()=>f.disconnect()},[t,n]),{isLoaded:i,isInView:r,hasError:o,ref:c,handleLoad:()=>{a(!0),l(!1)},handleError:()=>{l(!0),a(!1)}}}function Jh(e,t=!1){return{src:e,loading:t?"eager":"lazy",decoding:"async"}}const IM=e=>{switch(e){case"active":return"text-emerald-400 bg-emerald-500/10 border-emerald-500/20";case"draft":return"text-amber-400 bg-amber-500/10 border-amber-500/20";case"prototype":return"text-rose-400 bg-rose-500/10 border-rose-500/20";default:return"text-gray-500 bg-gray-500/10 border-gray-500/20"}},BM=e=>{switch(e){case"active":return"Active";case"draft":return"Draft";case"prototype":return"Prototype";default:return"Unknown"}},Xm=({project:e,onClick:t})=>{const n=Bt.useRef(null),i=zM({enableIntersectionObserver:!0,threshold:.1}),{isLoaded:a,isInView:r,handleLoad:s,handleError:o,ref:l}=i,c=Jh(e.img,!1),d=h=>{const f=h.currentTarget.getBoundingClientRect(),p=h.clientX-f.left;h.currentTarget.style.setProperty("--mouse-x",`${p}px`)};return e.orientation==="square"?U.jsxs("div",{ref:n,className:"project-card group","data-type":e.type,"data-orientation":"square",style:{"--accent-color":e.theme.primary},onMouseMove:d,onClick:h=>{h.stopPropagation(),t(e)},children:[U.jsxs("div",{className:"project-card__media relative",ref:l,children:[!r&&U.jsx("div",{className:"absolute inset-0 bg-zinc-800 animate-pulse"}),r&&U.jsx("img",{src:c.src,srcSet:c.srcSet,sizes:c.sizes,alt:e.alt,className:"project-card__img",loading:c.loading,decoding:c.decoding,onLoad:s,onError:o})]}),U.jsxs("div",{className:"project-card__content",children:[U.jsxs("div",{className:"project-card__meta",children:[U.jsx("span",{className:"project-card__tag",children:e.tag}),U.jsxs("div",{className:`flex items-center gap-2 px-2 py-1 rounded-sm border ${IM(e.status)}`,children:[U.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]"}),U.jsx("span",{className:"text-[10px] font-mono uppercase tracking-wider font-bold",children:BM(e.status)})]})]}),U.jsx("h4",{className:"project-card__title",children:e.title}),U.jsx("p",{className:"project-card__desc",children:e.desc}),U.jsxs("div",{className:"project-card__cta",children:[U.jsx("span",{className:"mr-2",children:"View Details"}),U.jsx("span",{className:"material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1",children:"arrow_forward"})]})]})]}):U.jsxs("div",{ref:l,className:"group relative w-full aspect-[16/9] overflow-hidden rounded-xl border border-white/10 bg-zinc-900 cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-white/20",onClick:h=>{h.stopPropagation(),t(e)},children:[U.jsxs("div",{className:"absolute inset-0 w-full h-full",children:[!a&&U.jsx("div",{className:"absolute inset-0 bg-zinc-800 overflow-hidden",children:U.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent animate-[shimmer_2s_infinite]"})}),r&&U.jsx("img",{src:c.src,srcSet:c.srcSet,sizes:c.sizes,alt:e.alt,className:`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${a?"opacity-100 blur-0":"opacity-0 blur-sm"}`,loading:c.loading,decoding:c.decoding,onLoad:s,onError:o})]}),U.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60"}),U.jsxs("div",{className:"absolute bottom-0 left-0 w-full p-6 flex flex-col items-start justify-end translate-y-2 transition-transform duration-500 group-hover:translate-y-0",children:[U.jsx("span",{className:"text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-2 border-l-2 pl-2 transition-colors duration-300 group-hover:text-white group-hover:border-[var(--accent-color)]",style:{"--accent-color":e.theme.primary},children:e.tag}),U.jsx("h3",{className:"font-display text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-lg",children:e.title})]}),U.jsx("div",{className:"absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none mix-blend-overlay",style:{boxShadow:`inset 0 0 100px ${e.theme.primary}40`}})]})},Xu=({id:e,title:t,subtitle:n,bgImage:i,baseColor:a,throughline:r,heading:s,description:o,titleClassName:l,headingClassName:c,className:d,projects:h,isActive:f,isInactive:p,onActivate:_,onProjectClick:x})=>{let m=`pillar group border-r border-white/5 relative overflow-hidden ${d||""}`;f&&(m+=" active"),p&&(m+=" inactive");const u=h.some(w=>w.orientation==="square"),g=h.some(w=>w.status==="prototype")?"prototype":"draft",v=g==="prototype"?"Prototype":"Draft",y=u?"flex-1 overflow-y-auto overflow-x-hidden no-scrollbar grid grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 pb-8 w-full pr-6 items-start content-start auto-rows-max":"flex-1 overflow-y-auto overflow-x-hidden no-scrollbar grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8 w-full pr-6 items-start content-start auto-rows-max";return U.jsxs("section",{id:`pillar-${e}`,className:m,onClick:()=>_(e),tabIndex:0,children:[U.jsxs("div",{className:"absolute inset-0 pointer-events-none",children:[U.jsx("img",{className:"w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700",src:i,alt:`Abstract ${t}`}),U.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"})]}),U.jsxs("div",{className:"pillar-title text-center z-10 pointer-events-none",children:[U.jsx("h2",{className:l,style:{color:a},children:t}),U.jsx("span",{className:"font-display text-xs uppercase tracking-[0.3em] text-white/70",children:n})]}),U.jsx("div",{className:"track-content absolute inset-0 flex flex-col z-20 pt-24 pb-10 px-4 md:px-12 bg-black/90 backdrop-blur-md",children:U.jsxs("div",{className:"max-w-7xl mx-auto w-full h-full flex flex-col",children:[U.jsxs("header",{className:"mb-8 shrink-0 animate-fade-in-up",children:[U.jsx("div",{className:"text-sm font-mono uppercase tracking-widest mb-2",style:{color:a},children:r}),U.jsx("h3",{className:c,children:s}),U.jsx("p",{className:"mt-4 max-w-xl text-white/60 font-light leading-relaxed",children:o})]}),U.jsx("div",{className:y,children:(()=>{const w=h.filter(T=>T.status==="active"),R=h.filter(T=>T.status===g);return U.jsxs(U.Fragment,{children:[w.length>0&&U.jsxs(U.Fragment,{children:[U.jsx("div",{className:"col-span-full",children:U.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[U.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"}),U.jsx("span",{className:"text-xs font-mono uppercase tracking-wider font-bold text-emerald-400",children:"Active"})]})}),w.map(T=>U.jsx(Xm,{project:T,onClick:x},T.title))]}),R.length>0&&U.jsxs(U.Fragment,{children:[U.jsx("div",{className:"col-span-full",children:U.jsxs("div",{className:`flex items-center gap-2 mb-3 ${w.length?"mt-4":""}`,children:[U.jsx("div",{className:`w-1.5 h-1.5 rounded-full ${g==="prototype"?"bg-amber-600":"bg-amber-500"}`}),U.jsx("span",{className:`text-xs font-mono uppercase tracking-wider font-bold ${g==="prototype"?"text-amber-500":"text-amber-400"}`,children:v})]})}),R.map(T=>U.jsx(Xm,{project:T,onClick:x},T.title))]})]})})()})]})})]})},FM=e=>{Bt.useEffect(()=>{const t=window.getComputedStyle(document.body).overflow;return e&&(document.body.style.overflow="hidden"),()=>{document.body.style.overflow=t}},[e])},Y0=e=>{switch(e){case"active":return"bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]";case"draft":return"bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]";case"prototype":return"bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]";default:return"bg-gray-500"}},Z0=e=>{switch(e){case"active":return"text-emerald-400";case"draft":return"text-amber-400";case"prototype":return"text-rose-400";default:return"text-gray-400"}},Wm={HTML:{short:"HTML",color:"#f97316"},CSS:{short:"CSS",color:"#38bdf8"},JavaScript:{short:"JS",color:"#facc15"},"Web Audio Engine":{short:"AUD",color:"#ec4899"},"Prompt-Driven Flow":{short:"PDF",color:"#a855f7"},"Static Narrative Site":{short:"SNS",color:"#22d3ee"},"Long-form Layout":{short:"LFL",color:"#94a3b8"},"Multimedia Scaffolding":{short:"MMS",color:"#f59e0b"},"Interactive Guide":{short:"IG",color:"#10b981"},"Live HTML Experiences":{short:"LHE",color:"#06b6d4"},"Research Synthesis":{short:"RS",color:"#8b5cf6"},"Narrative Research":{short:"NR",color:"#dc2626"},"Cross-Cultural Analysis":{short:"CCA",color:"#d4af37"},"Mythic Structure":{short:"MS",color:"#2d2520"},"Data Analysis Tool":{short:"DAT",color:"#8B5CF6"},pandas:{short:"PD",color:"#150458"},Streamlit:{short:"ST",color:"#ff4b4b"},"Plotly Visualization":{short:"PV",color:"#3f4f75"},"Audio Feature Extraction":{short:"AFE",color:"#ec4899"},"Offline-First PWA":{short:"PWA",color:"#3b82f6"},IndexedDB:{short:"IDB",color:"#1c1c21"},"Service Worker":{short:"SW",color:"#0b0b0f"},"Local-Only Privacy":{short:"LOP",color:"#09090b"},"Client-Side Dashboard":{short:"CSD",color:"#d4956d"},React:{short:"RE",color:"#22d3ee"},TypeScript:{short:"TS",color:"#60a5fa"},Tailwind:{short:"TW",color:"#38bdf8"},"Data Visualization":{short:"DV",color:"#b06a3a"},"Framer Motion":{short:"FM",color:"#8b5c3c"},JSON:{short:"JSON",color:"#3d2a1f"},"Local Persistence":{short:"LP",color:"#d4956d"},"Spaced Repetition Logic":{short:"SRL",color:"#b06a3a"},"Instant Game PWA":{short:"IGP",color:"#3b82f6"},Vite:{short:"VT",color:"#a855f7"},"Zero-Latency UI":{short:"ZLU",color:"#1f2937"},Installable:{short:"INS",color:"#374151"},"Offline Capable":{short:"OC",color:"#111827"},"Real-Time Sync App":{short:"RTSA",color:"#aa6c4b"},Firebase:{short:"FB",color:"#f59e0b"},"Firestore Realtime":{short:"FSR",color:"#be185d"},"3D Elements (Three.js)":{short:"3D",color:"#831843"},"Community Tracker":{short:"CT",color:"#ef4444"},"Live Leaderboard":{short:"LL",color:"#b91c1c"},"PWA Installable":{short:"PWA",color:"#7f1d1d"},"Chart.js Analytics":{short:"CJA",color:"#d4956d"},"Local-First Utility":{short:"LFU",color:"#84cc16"},"File System Access API":{short:"FSAA",color:"#65a30d"},"Privacy-Centric":{short:"PC",color:"#4b5320"},"Private Journaling PWA":{short:"PJP",color:"#8b5cf6"},"Encrypted Local Storage":{short:"ELS",color:"#6d28d9"},"Export to JSON/Zip":{short:"EJZ",color:"#4c1d95"},"Interactive Visualization":{short:"IV",color:"#06b6d4"},"WebGL (OGL)":{short:"WGL",color:"#0891b2"},"Dynamic Modeling":{short:"DM",color:"#164e63"},Python:{short:"PY",color:"#3776ab"},Markdown:{short:"MD",color:"#083fa1"}},HM=e=>Wm[e]?Wm[e]:{short:e.substring(0,2).toUpperCase(),color:"#94a3b8"},K0=({techSpecs:e})=>e?U.jsxs("div",{className:"mt-auto pt-4 border-t border-white/5",children:[U.jsx("div",{className:"text-[9px] font-mono uppercase tracking-widest text-zinc-500 mb-3",children:"System Architecture"}),U.jsxs("div",{className:"mb-4",children:[U.jsx("div",{className:"text-[10px] font-medium text-zinc-400 mb-2 uppercase tracking-wide",children:"Model"}),U.jsx("div",{className:"px-3 py-2 rounded-lg border border-white/20 bg-transparent hover:border-white/30 transition-colors",children:U.jsx("span",{className:"text-[13px] font-medium text-white/90",children:e.model})})]}),U.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[U.jsxs("div",{children:[U.jsx("div",{className:"text-[10px] font-medium text-zinc-400 mb-2 uppercase tracking-wide",children:"Stack"}),U.jsx("div",{className:"space-y-2",children:e.stack.map(t=>{const n=HM(t);return U.jsxs("div",{className:"group flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all hover:scale-102 hover:-translate-y-0.5",style:{borderColor:`${n.color}60`,backgroundColor:"transparent",boxShadow:`inset 0 0 12px ${n.color}15, 0 0 8px ${n.color}20`},children:[U.jsx("span",{className:"w-1.5 h-1.5 rounded-full flex-shrink-0",style:{backgroundColor:n.color,boxShadow:`0 0 4px ${n.color}`}}),U.jsx("span",{className:"text-[11px] font-medium text-zinc-300 group-hover:text-zinc-100 transition-colors",children:t})]},t)})})]}),U.jsxs("div",{children:[U.jsx("div",{className:"text-[10px] font-medium text-zinc-400 mb-2 uppercase tracking-wide",children:"Features"}),U.jsx("div",{className:"space-y-2",children:e.features.map(t=>U.jsx("div",{className:"px-2.5 py-1.5 rounded-lg border border-white/10 bg-transparent text-zinc-300 text-[11px] font-medium transition-all hover:-translate-y-0.5",children:t},t))})]})]})]}):null,Q0=({text:e})=>{const t=e.split(`

`).filter(Boolean);return U.jsx("div",{className:"space-y-3 text-zinc-300 text-[14px] leading-[1.6] font-light",children:t.map((n,i)=>U.jsx("p",{children:n},i))})},GM=({project:e,onClose:t})=>{const[n,i]=co.useState(!1),a=e.type==="app"?"Open App":"Open Narrative",r=Jh(e.img,!0);return U.jsxs(U.Fragment,{children:[U.jsxs("div",{className:"relative w-full h-[300px] md:h-full overflow-hidden bg-black group",children:[!n&&U.jsx("div",{className:"absolute inset-0 bg-zinc-900 overflow-hidden",children:U.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent animate-[shimmer_2s_infinite]"})}),U.jsx("img",{className:`w-full h-full object-cover transition-all duration-[2s] ease-out group-hover:scale-[1.02] ${n?"opacity-100":"opacity-0"}`,src:r.src,srcSet:r.srcSet,sizes:r.sizes,alt:e.alt,loading:r.loading,decoding:r.decoding,onLoad:()=>i(!0)})]}),U.jsxs("div",{className:"w-full min-h-0 p-6 md:p-8 flex flex-col overflow-y-auto overflow-x-hidden",children:[U.jsxs("div",{className:"mb-4",children:[U.jsx("h2",{className:"font-display text-xl md:text-2xl font-bold text-white mb-2 tracking-tight",children:e.title}),U.jsxs("div",{className:"flex items-center flex-wrap gap-3",children:[U.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border bg-white/[0.02]",style:{borderColor:`${e.theme.primary}40`,color:e.theme.primary},children:e.tag}),U.jsxs("div",{className:"flex items-center gap-1.5",children:[U.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${Y0(e.status)}`}),U.jsx("span",{className:`text-[10px] font-bold tracking-wider uppercase ${Z0(e.status)}`,children:e.status})]})]})]}),U.jsx("div",{className:"mb-5",children:U.jsx(Q0,{text:e.fullDesc||e.desc})}),U.jsx(K0,{techSpecs:e.techSpecs}),e.href?U.jsx("div",{className:"mt-6 pt-4 border-t border-white/10 flex justify-end",children:U.jsxs("a",{href:e.href,target:"_blank",rel:"noopener noreferrer",className:"inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-emerald-400 transition-colors group",children:[a,U.jsx("span",{className:"material-symbols-outlined text-lg group-hover:translate-x-0.5 transition-transform",children:"arrow_outward"})]})}):U.jsx("div",{className:"mt-6 pt-4 border-t border-white/10 flex justify-end",children:U.jsxs("button",{disabled:!0,className:"inline-flex items-center gap-2 text-sm font-semibold text-white/50 cursor-not-allowed",children:["Coming Soon",U.jsx("span",{className:"material-symbols-outlined text-lg",children:"schedule"})]})})]})]})},VM=({project:e,onClose:t})=>{const[n,i]=co.useState(!1),a="Open App",r=Jh(e.img,!0);return U.jsxs(U.Fragment,{children:[U.jsxs("div",{className:"w-full md:w-[45%] bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center p-12 relative overflow-hidden",children:[U.jsx("div",{className:"absolute inset-0 opacity-20",style:{background:`radial-gradient(circle at center, ${e.theme.primary}20 0%, transparent 70%)`}}),!n&&U.jsx("div",{className:"w-full h-auto max-w-[280px] aspect-square relative z-10 bg-zinc-800 rounded-lg overflow-hidden",children:U.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent animate-[shimmer_2s_infinite]"})}),U.jsx("img",{className:`w-full h-auto max-w-[280px] relative z-10 drop-shadow-2xl transform transition-all duration-500 hover:scale-105 ${n?"opacity-100":"opacity-0"}`,src:r.src,srcSet:r.srcSet,sizes:r.sizes,alt:e.alt,loading:r.loading,decoding:r.decoding,onLoad:()=>i(!0)})]}),U.jsxs("div",{className:"flex-1 p-8 md:p-10 overflow-y-auto flex flex-col",children:[U.jsxs("div",{className:"mb-6",children:[U.jsx("h2",{className:"font-display text-3xl font-bold text-white mb-3",children:e.title}),U.jsxs("div",{className:"flex items-center gap-3",children:[U.jsx("span",{className:"text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border bg-white/[0.02]",style:{borderColor:`${e.theme.primary}40`,color:e.theme.primary},children:e.tag}),U.jsxs("div",{className:"flex items-center gap-1.5",children:[U.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${Y0(e.status)}`}),U.jsx("span",{className:`text-[10px] font-bold tracking-wider uppercase ${Z0(e.status)}`,children:e.status})]})]})]}),U.jsx("div",{className:"mb-8",children:U.jsx(Q0,{text:e.fullDesc||e.desc})}),U.jsx(K0,{techSpecs:e.techSpecs}),e.href?U.jsx("div",{className:"mt-8 pt-6 border-t border-white/10 flex justify-end",children:U.jsxs("a",{className:"inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-semibold text-sm rounded-lg hover:bg-zinc-200 transition-colors",href:e.href,target:"_blank",rel:"noopener noreferrer",children:[U.jsx("span",{children:a}),U.jsx("span",{className:"material-symbols-outlined text-base",children:"arrow_outward"})]})}):U.jsx("div",{className:"mt-8 pt-6 border-t border-white/10 flex justify-end",children:U.jsxs("button",{disabled:!0,className:"inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white font-semibold text-sm rounded-lg cursor-not-allowed opacity-50",children:[U.jsx("span",{children:"Coming Soon"}),U.jsx("span",{className:"material-symbols-outlined text-base",children:"schedule"})]})})]})]})},kM=({project:e,isOpen:t,onClose:n})=>{const i=Bt.useRef(null);if(FM(t),Bt.useEffect(()=>{var s;const r=o=>{o.key==="Escape"&&n()};return t&&(window.addEventListener("keydown",r),(s=i.current)==null||s.focus()),()=>window.removeEventListener("keydown",r)},[t,n]),!e)return null;const a=e.orientation==="landscape";return U.jsxs("div",{className:`fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 transition-opacity duration-300 ${t?"opacity-100 pointer-events-auto":"opacity-0 pointer-events-none"}`,role:"dialog","aria-modal":"true",children:[U.jsx("div",{className:"absolute inset-0 bg-black/95 backdrop-blur-md",onClick:n}),U.jsxs("div",{ref:i,id:"modal-content",className:`
            relative w-full bg-[#121212] border border-white/10 shadow-2xl
            transform transition-all duration-500 ease-out
            ${t?"scale-100 translate-y-0 opacity-100":"scale-95 translate-y-8 opacity-0"}
            ${a?"max-w-7xl h-full md:h-auto md:max-h-[85vh] flex flex-col md:grid md:grid-cols-[1.6fr_1fr] rounded-none md:rounded-2xl md:overflow-hidden":"max-w-7xl h-full md:h-auto md:max-h-[85vh] flex flex-col md:flex-row rounded-none md:rounded-2xl overflow-hidden"}
        `,children:[U.jsx("button",{className:"absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-sm",onClick:n,children:U.jsx("span",{className:"material-symbols-outlined text-xl",children:"close"})}),a?U.jsx(GM,{project:e,onClose:n}):U.jsx(VM,{project:e,onClose:n})]})]})},XM=[{title:"Skywalker",tag:"Movie-Narrative Guide",desc:"An immersive mythic companion using Luke Skywalker's journey as a mirror for personal growth.",href:"https://benwassa.github.io/Skywalker/",img:"assets/projects/Skywalker.png",alt:"Skywalker - Narrative System",theme:{primary:"#3B82F6",secondary:"#1F2937",tertiary:"#151720",bg:"#0A0B14"},status:"active",type:"narrative",orientation:"landscape",techSpecs:{model:"Single-Page Narrative",stack:["HTML","CSS","JavaScript"],features:["Web Audio Engine","Prompt-Driven Flow"]}},{title:"Sankofa",tag:"Scientific-Narrative Guide",desc:"A unified framework addressing the Modern Meaning Crisis through mythic storytelling.",href:"https://benwassa.github.io/sankofa/",img:"assets/projects/Sankofa.png",alt:"Sankofa - Narrative System",theme:{primary:"#d4af37",secondary:"#2d2520",tertiary:"#1a1a1a",bg:"#0a0a0a"},status:"active",type:"narrative",orientation:"landscape",techSpecs:{model:"Static Narrative Site",stack:["HTML","CSS","JavaScript"],features:["Long-form Layout","Multimedia Scaffolding"]}},{title:"Dukkha",tag:"Scientific-Narrative Guide",desc:"A field guide on dopamine as a cultural force and tool for digital autonomy.",href:"https://benwassa.github.io/dukkha/",img:"assets/projects/Dukkha.png",alt:"Dukkha - Digital well-being",theme:{primary:"#10b981",secondary:"#1f2937",tertiary:"#111827",bg:"#0f172a"},status:"draft",type:"psychology",orientation:"landscape",techSpecs:{model:"Interactive Guide",stack:["Python","HTML","CSS"],features:["Live HTML Experiences","Research Synthesis"]}},{title:"Agoge",tag:"Scientific-Narrative Guide",desc:"A cross-cultural study of rites of passage reimagined for modern resilience.",href:"https://benwassa.github.io/agoge/",img:"assets/projects/Agoge.png",alt:"Agoge - Rites of passage",theme:{primary:"#dc2626",secondary:"#7f1d1d",tertiary:"#1c1917",bg:"#0c0a09"},status:"draft",type:"narrative",orientation:"landscape",techSpecs:{model:"Narrative Research",stack:["Python","Markdown"],features:["Cross-Cultural Analysis","Mythic Structure"]}},{title:"Orpheus",tag:"Music Research Tool",desc:"A lyrical lantern decoding the themes in your listening patterns.",href:null,img:"assets/projects/Orpheus.png",alt:"Orpheus - Audio Analysis",theme:{primary:"#8B5CF6",secondary:"#1e1b4b",tertiary:"#1e293b",bg:"#0f0f23"},status:"draft",type:"psychology",orientation:"landscape",techSpecs:{model:"Data Analysis Tool",stack:["Python","pandas","Streamlit"],features:["Plotly Visualization","Audio Feature Extraction"]}},{title:"drop",tag:"Daily Domain Tracker",desc:"Setting, tracking, and reviewing habit consistency.",href:"https://benwassa.github.io/drop/",img:"assets/projects/drop.png",alt:"drop - Tracker",theme:{primary:"#3b82f6",secondary:"#1c1c21",tertiary:"#0b0b0f",bg:"#09090b"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Offline-First PWA",stack:["JavaScript","HTML","CSS"],features:["IndexedDB","Service Worker","Local-Only Privacy"]}},{title:"STARK",tag:"Fitness Intelligence",desc:"Fitness intelligence dashboard for strength, endurance, recovery.",href:"https://benwassa.github.io/STARK/",img:"assets/projects/stark.png",alt:"STARK - Fitness PWA",theme:{primary:"#d4956d",secondary:"#b06a3a",tertiary:"#8b5c3c",bg:"#3d2a1f"},status:"prototype",type:"app",orientation:"square",techSpecs:{model:"Client-Side Dashboard",stack:["React","TypeScript","Tailwind"],features:["Data Visualization","IndexedDB","Framer Motion"]}},{title:"Vox",tag:"Language Learning Tracker",desc:"Vocabulary and grammar studying tool.",href:"https://benwassa.github.io/Vox_Showcase/",img:"assets/projects/vox.png",alt:"Vox - Language Tool",theme:{primary:"#d4956d",secondary:"#b06a3a",tertiary:"#8b5c3c",bg:"#3d2a1f"},status:"prototype",type:"app",orientation:"square",techSpecs:{model:"Offline-First App",stack:["JavaScript","JSON"],features:["Local Persistence","Spaced Repetition Logic"]}},{title:"Punchbuggy",tag:"Game",desc:"Minimalist punchbuggy game with instant feedback.",href:"https://benwassa.github.io/punchbuggy/",img:"assets/projects/punchbuggy.png",alt:"Punchbuggy - Game",theme:{primary:"#3b82f6",secondary:"#1f2937",tertiary:"#374151",bg:"#111827"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Instant Game PWA",stack:["JavaScript","Vite"],features:["Zero-Latency UI","Installable","Offline Capable"]}},{title:"Hearth",tag:"Shared Watchlist",desc:"Shared watchlist to decide what to watch together.",href:"https://benwassa.github.io/template-hearth/",img:"assets/projects/hearth.png",alt:"Hearth - Watchlist",theme:{primary:"#aa6c4b",secondary:"#be185d",tertiary:"#831843",bg:"#3f0f4d"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Real-Time Sync App",stack:["React","Firebase"],features:["Firestore Realtime","3D Elements (Three.js)"]}},{title:"PushUp Challenge",tag:"Fitness Challenge App",desc:"Pushup challenge tracker with community accountability.",href:"https://benwassa.github.io/template-pushup/",img:"assets/projects/pushup.png",alt:"PushUp - Fitness App",theme:{primary:"#ef4444",secondary:"#b91c1c",tertiary:"#7f1d1d",bg:"#4c0519"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Community Tracker",stack:["React","Firebase"],features:["Live Leaderboard","PWA Installable"]}},{title:"Wrestle",tag:"Grappling Training Log",desc:"Offline-first training log for wrestlers.",href:"https://benwassa.github.io/wrestlePWA/",img:"assets/projects/wrestle.png",alt:"Wrestle - Log",theme:{primary:"#d4956d",secondary:"#b06a3a",tertiary:"#8b5c3c",bg:"#3d2a1f"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Offline-First PWA",stack:["JavaScript","Tailwind"],features:["IndexedDB","Chart.js Analytics","Local-Only"]}},{title:"Narrative",tag:"Travel Photo Organizer",desc:"Organize travel photos and videos by story role.",href:"https://benwassa.github.io/Narrative/",img:"assets/projects/narrative.png",alt:"Narrative - Photo Tool",theme:{primary:"#84cc16",secondary:"#65a30d",tertiary:"#4b5320",bg:"#202601"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Local-First Utility",stack:["React","TypeScript"],features:["File System Access API","IndexedDB","Privacy-Centric"]}},{title:"Morpheus",tag:"Dream Journal",desc:"A dream journal designed for serious reflection.",href:"https://benwassa.github.io/template-morpheus/",img:"assets/projects/morpheus.png",alt:"Morpheus - Journal",theme:{primary:"#8b5cf6",secondary:"#6d28d9",tertiary:"#4c1d95",bg:"#2e1065"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Private Journaling PWA",stack:["React","Tailwind"],features:["Encrypted Local Storage","Export to JSON/Zip"]}},{title:"Ecological Constellation",tag:"Personality Framework",desc:"A personality framework mapping Big Five traits to ecological strategies.",href:"https://benwassa.github.io/ecological-constellation/",img:"assets/projects/ecological.png",alt:"Ecological Constellation",theme:{primary:"#06b6d4",secondary:"#0891b2",tertiary:"#164e63",bg:"#082f4f"},status:"active",type:"app",orientation:"square",techSpecs:{model:"Interactive Visualization",stack:["React","TypeScript"],features:["WebGL (OGL)","Dynamic Modeling"]}}],WM={skywalker:{portfolio:"A comprehensive UX playground for personal systems and compounding routines with advanced interaction patterns.",full:"The Skywalker Quest Map is an immersive mythic companion for personal reflection and philosophical growth, using Luke Skywalker's journey as a timeless mirror for your own. It transforms passive listening into active self-discovery through structured prompts, symbolic insight, and guided questions - weaving classic mythic stages into modern psychological reflection. Thoughtfully designed for slow, deliberate use, it invites you to map your inner conflicts, inheritances, shadows, and redemptions, all within a poetic, soul-centered framework that honors myth not as fantasy but as a living guide for becoming."},sankofa:{portfolio:"An immersive mythic psychology narrative experience with podcast scaffolding in a living document environment.",full:"Project Sankofa is an overarching narrative framework to tackle the Modern Meaning Crisis. It weaves mythic storytelling, cultural critique, and deep research into a unified exploration of how contemporary life lost cohesive meaning - and how people might find soul, purpose, and moral compass again. Sankofa ties together dopamine work, rites of passage concepts, and narrative design into a podcast or multimedia experience that blends rigorous insight with emotionally resonant mythic arcs."},dukkha:{portfolio:"A comprehensive field guide for digital discipline - featuring live HTML experiences & systematic UX patterns.",full:"Project Dukkha is a field guide and manifesto for understanding dopamine not just as a neurotransmitter but as a living, mythic force shaping human culture, motivation, habits, and collective drift. It aims to reveal misconceptions, chart how dopamine-driven systems fuel modern temptations and crises, and offer practical tools to navigate daily life with more clarity and autonomy."},vox:{portfolio:"Advanced language-learning dashboard with progress tracking, analytics, and adaptive learning algorithms (in development).",full:"Project Vox is a pilot framework for building a rigorous, self-directed language learning system. It emphasizes grammar mastery, transparent vocab tracking, and real-world sentence production - eschewing gamified fluff in favor of deliberate, adaptive practice. Designed to function fully offline with clean JSON architecture, Vox visualizes progress like a growing reservoir of knowledge, where vocabulary adds volume, grammar shapes the container, and output waters the fields of fluency. It serves as both prototype and proof-of-concept for a learner-first, data-transparent alternative to mainstream apps."},orpheus:{portfolio:"Experimental audio interfaces and sonic interaction patterns - exploring the intersection of sound and digital experience.",full:"Project Orpheus is a lyrical lantern into the underworld of memory and emotion. By tracing the songs you play on repeat - the fixations, the phases, the sudden crescendos - it reveals the hidden narratives shaping your life. Like Orpheus descending with music as his guide, this framework transforms passive listening into active self-discovery through structured analysis, mythic symbolism, and reflective prompts. Thoughtfully designed for slow, deliberate exploration, it lets you chart emotional currents, pivotal transitions, and unmet needs inside a poetic, soul-centered map where every refrain becomes a clue to becoming more wholly yourself."},agoge:{portfolio:"A narrative research project exploring traditional rites of passage and authentic initiation for the modern world.",full:"Project Agoge is a narrative research project exploring how traditional rites transformed boys into grounded, resilient men. It blends cross-cultural history, mythic symbolism, and modern psychology to uncover timeless insights on confidence, moral strength, and belonging - laying the groundwork for a podcast and supporting framework that reimagines authentic initiation for today's world."},stark:{portfolio:"A data visualization PWA that unifies strength, endurance, mobility, and recovery into one elegant Fitness Index, complete with VO2 max and trend insights.",full:"Project STARK is a static Progressive Web App built with React and TailwindCSS, designed to turn physiological data into a clear visual story of fitness and recovery. It blends performance metrics, VO2 max estimation, and normative comparisons into an elegant offline dashboard that values transparency, simplicity, and privacy. All calculations are client-side, data is stored in IndexedDB, and users can install it as a PWA - no logins, no servers, just insight."},drop:{portfolio:"A mindful daily tracker for Sleep, Fitness, Mind, and Spirit - built as a pure vanilla JavaScript PWA that values quality, reflection, and sustained growth over streaks or perfection.",full:"Project drop is a minimalist, framework-free Progressive Web App designed for reflective self-tracking across four life domains: Sleep, Fitness, Mind, and Spirit. It integrates a philosophically grounded scoring model based on weighted trends and intrinsic motivation, emphasizing balance, consistency, and self-awareness. The app runs fully offline, includes IndexedDB auto-backups, and features an elegant interface optimized for touch and accessibility. It's a digital companion for maintaining mindful engagement with your growth - not a habit tracker, but a quality tracker."},punchbuggy:{portfolio:"A minimalist game PWA—no punchbacks, just instant feedback and genuine enjoyment.",full:"Project Punchbuggy is a game designed for pure play. It strips away gamification, accounts, and complexity to deliver immediate, honest fun. Built for quick sessions and infinite replayability, it proves that elegance and engagement don't require addiction mechanics."},hearth:{portfolio:"A calm, shared watchlist PWA that helps couples decide what to watch together without algorithmic noise.",full:"Project Hearth is a two-player watchlist designed for couples who want to decide what to watch without endless scrolling or recommendations. It's about shared intent, simple browsing, and actual human decision-making. Clean, focused, and built with intimacy in mind."},pushupchallenge:{portfolio:"A time-bound fitness app supporting the Pushup Challenge with tracking and community accountability.",full:"Project PushUp Challenge is a specialized app built for the annual Pushup Challenge. It provides clean tracking of daily progress, community leaderboards, and sustainable progression without gamification. Designed for participants who take the challenge seriously and want transparent data."},wrestle:{portfolio:"An offline-first training log for wrestlers—honest tracking without accounts or gamification.",full:"Project Wrestle is built for grapplers. It strips away social features and focuses on what matters: honest, structured tracking of techniques, matches, and improvements. No accounts, no notifications, no algorithms—just a reliable record of your training and progress."},narrative:{portfolio:"A fast, offline-first travel photo organizer that sorts images by story role instead of time.",full:"Project Narrative transforms how you organize travel photos. Instead of chronological sorting, it categorizes images by their role in your story: opening moments, key scenes, unexpected details, climax, reflection. It turns a photo library into a narrative arc, making memories more vivid and meaningful."},morpheus:{portfolio:"A personal archive for recording and reflecting on dreams, treating the unconscious as meaningful signal.",full:"Project Morpheus is a dream journal designed for serious reflection. It provides structure for recording dreams, tracking patterns, and exploring emotional resonance without interpretation. Built on the belief that dreams are psychological signal worth listening to—not for divination, but for self-understanding."},ecologicalconstellation:{portfolio:"A personality framework mapping Big Five traits to ecological strategies rather than fixed types.",full:"Project Ecological Constellation reimagines personality through an ecological lens. Instead of fixed types, it maps how Big Five traits function as adaptive strategies in different contexts. It reveals how your personality serves you and where it might limit you—emphasizing flexibility, context, and growth."}},qM=e=>e.toLowerCase().replace(/[^a-z0-9]+/g,""),jM=XM.map(e=>{var i;const t=qM(e.title),n=(i=WM[t])==null?void 0:i.full;return n?{...e,fullDesc:n}:e}),qm={active:1,draft:2,prototype:3},Wu=e=>jM.filter(t=>t.type===e).sort((t,n)=>{const i=qm[t.status]-qm[n.status];return i!==0?i:t.title.localeCompare(n.title)}),YM=()=>Bt.useMemo(()=>({narrative:Wu("narrative"),app:Wu("app"),psychology:Wu("psychology")}),[]),J0=()=>{const[e,t]=Bt.useState(null),[n,i]=Bt.useState(null),[a,r]=Bt.useState(!1),s=Bt.useRef(null),o=YM(),l=f=>{e!==f&&t(f)},c=()=>{t(null)},d=f=>{s.current&&window.clearTimeout(s.current),i(f),r(!0)},h=()=>{r(!1),s.current&&window.clearTimeout(s.current),s.current=window.setTimeout(()=>{i(null),s.current=null},500)};return Bt.useEffect(()=>{const f=p=>{if(p.key==="Escape"){if(a){h();return}e&&t(null)}};return window.addEventListener("keydown",f),()=>window.removeEventListener("keydown",f)},[e,a]),Bt.useEffect(()=>()=>{s.current&&window.clearTimeout(s.current)},[]),U.jsxs("div",{className:"antialiased h-screen w-screen flex flex-col font-sans selection:bg-white/20",children:[U.jsxs("nav",{className:"fixed top-0 left-0 w-full z-50 px-6 py-4 flex justify-between items-center mix-blend-difference text-white pointer-events-none",children:[U.jsxs("div",{className:"flex items-center gap-3 pointer-events-auto",children:[U.jsx("div",{className:"font-display font-bold tracking-tight text-lg",children:"BENJAMIN P. HADDON"}),U.jsx("div",{className:"hidden md:block h-4 w-[1px] bg-white/40"}),U.jsx("div",{className:"hidden md:block text-xs font-mono opacity-80",children:"PORTFOLIO"})]}),U.jsxs("div",{className:"flex items-center gap-6 text-sm font-medium pointer-events-auto",children:[U.jsxs("a",{href:"?onboarding=true",className:"transition-all duration-300 flex items-center gap-2 hover:text-cyan-400 uppercase tracking-widest text-xs opacity-70 hover:opacity-100",title:"Replay onboarding",children:[U.jsx("span",{className:"material-symbols-outlined text-sm",children:"refresh"}),U.jsx("span",{className:"hidden md:inline",children:"Replay Intro"})]}),U.jsxs("button",{onClick:c,className:`transition-all duration-300 flex items-center gap-2 hover:text-red-400 uppercase tracking-widest text-xs ${e?"opacity-100 visible":"opacity-0 invisible"}`,children:[U.jsx("span",{className:"material-symbols-outlined text-sm",children:"close"})," Close View"]})]})]}),U.jsxs("main",{className:`pillar-container flex-1 flex flex-col md:flex-row h-full w-full relative ${e?"has-active":""}`,children:[U.jsx(Xu,{id:"narrative",title:"Narrative",subtitle:"As Interface",bgImage:"https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop",baseColor:"#d4af37",throughline:"Throughline 01",heading:"Narrative as Interface",description:"Prototyping mythic frameworks. These projects explore how ancient storytelling structures can solve modern meaning crises by becoming the very interface through which we engage with reality.",titleClassName:"font-serif text-4xl md:text-6xl italic mb-2",headingClassName:"text-4xl md:text-5xl font-serif text-white italic",className:"bg-[#0c0a09]",projects:o.narrative,isActive:e==="narrative",isInactive:e!==null&&e!=="narrative",onActivate:l,onProjectClick:d}),U.jsx(Xu,{id:"pwa",title:"Systems",subtitle:"Progressive Web Apps",bgImage:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",baseColor:"#3b82f6",throughline:"Throughline 02",heading:"Progressive Systems",description:"Building digital companions that respect attention. These PWAs emphasize progress over perfection and tools over traps.",titleClassName:"font-display text-4xl md:text-6xl font-bold mb-2",headingClassName:"text-4xl md:text-5xl font-display font-bold text-white",className:"bg-[#0f172a]",projects:o.app,isActive:e==="pwa",isInactive:e!==null&&e!=="pwa",onActivate:l,onProjectClick:d}),U.jsx(Xu,{id:"psych",title:"Psyche",subtitle:"Into Experience",bgImage:"https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop",baseColor:"#8b5cf6",throughline:"Throughline 03",heading:"Psychology into Experience",description:"Translating abstract psychological concepts—dopamine, grief, memory—into tangible, navigable digital landscapes. Making the invisible visible.",titleClassName:"font-display text-4xl md:text-6xl font-light mb-2",headingClassName:"text-4xl md:text-5xl font-display font-light text-white",className:"bg-[#0f0f23] border-r-0",projects:o.psychology,isActive:e==="psych",isInactive:e!==null&&e!=="psych",onActivate:l,onProjectClick:d})]}),U.jsx(kM,{project:n,isOpen:a,onClose:h})]})};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $0=(...e)=>e.filter((t,n,i)=>!!t&&t.trim()!==""&&i.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ZM=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const KM=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,i)=>i?i.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jm=e=>{const t=KM(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var QM={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const JM=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $M=Bt.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:i,className:a="",children:r,iconNode:s,...o},l)=>Bt.createElement("svg",{ref:l,...QM,width:t,height:t,stroke:e,strokeWidth:i?Number(n)*24/Number(t):n,className:$0("lucide",a),...!r&&!JM(o)&&{"aria-hidden":"true"},...o},[...s.map(([c,d])=>Bt.createElement(c,d)),...Array.isArray(r)?r:[r]]));/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tE=(e,t)=>{const n=Bt.forwardRef(({className:i,...a},r)=>Bt.createElement($M,{ref:r,iconNode:t,className:$0(`lucide-${ZM(jm(e))}`,`lucide-${e}`,i),...a}));return n.displayName=jm(e),n};/**
 * @license lucide-react v0.563.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eE=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],nE=tE("arrow-right",eE);/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const $h="167",iE=0,Ym=1,aE=2,tx=1,rE=2,Mi=3,ba=0,fn=1,Ti=2,_a=0,ts=1,Zm=2,Km=3,Qm=4,sE=5,Va=100,oE=101,lE=102,cE=103,uE=104,fE=200,dE=201,hE=202,pE=203,vd=204,_d=205,mE=206,gE=207,vE=208,_E=209,xE=210,yE=211,SE=212,ME=213,EE=214,bE=0,TE=1,AE=2,Cc=3,RE=4,CE=5,wE=6,DE=7,ex=0,UE=1,LE=2,xa=0,NE=1,OE=2,PE=3,zE=4,IE=5,BE=6,FE=7,nx=300,ps=301,ms=302,xd=303,yd=304,$c=306,Sd=1e3,Xa=1001,Md=1002,Fn=1003,HE=1004,ll=1005,Kn=1006,qu=1007,Wa=1008,Fi=1009,ix=1010,ax=1011,To=1012,tp=1013,ir=1014,wi=1015,Bo=1016,ep=1017,np=1018,gs=1020,rx=35902,sx=1021,ox=1022,Qn=1023,lx=1024,cx=1025,es=1026,vs=1027,ux=1028,ip=1029,fx=1030,ap=1031,rp=1033,jl=33776,Yl=33777,Zl=33778,Kl=33779,Ed=35840,bd=35841,Td=35842,Ad=35843,Rd=36196,Cd=37492,wd=37496,Dd=37808,Ud=37809,Ld=37810,Nd=37811,Od=37812,Pd=37813,zd=37814,Id=37815,Bd=37816,Fd=37817,Hd=37818,Gd=37819,Vd=37820,kd=37821,Ql=36492,Xd=36494,Wd=36495,dx=36283,qd=36284,jd=36285,Yd=36286,GE=3200,VE=3201,kE=0,XE=1,ia="",ti="srgb",Ra="srgb-linear",sp="display-p3",tu="display-p3-linear",wc="linear",he="srgb",Dc="rec709",Uc="p3",pr=7680,Jm=519,WE=512,qE=513,jE=514,hx=515,YE=516,ZE=517,KE=518,QE=519,$m=35044,tg="300 es",Di=2e3,Lc=2001;class Rs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){if(this._listeners===void 0)return!1;const i=this._listeners;return i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){if(this._listeners===void 0)return;const a=this._listeners[t];if(a!==void 0){const r=a.indexOf(n);r!==-1&&a.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const i=this._listeners[t.type];if(i!==void 0){t.target=this;const a=i.slice(0);for(let r=0,s=a.length;r<s;r++)a[r].call(this,t);t.target=null}}}const Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ju=Math.PI/180,Zd=180/Math.PI;function Fo(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qe[e&255]+Qe[e>>8&255]+Qe[e>>16&255]+Qe[e>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[n&63|128]+Qe[n>>8&255]+"-"+Qe[n>>16&255]+Qe[n>>24&255]+Qe[i&255]+Qe[i>>8&255]+Qe[i>>16&255]+Qe[i>>24&255]).toLowerCase()}function cn(e,t,n){return Math.max(t,Math.min(n,e))}function JE(e,t){return(e%t+t)%t}function Yu(e,t,n){return(1-n)*e+n*t}function zs(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function sn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class Yt{constructor(t=0,n=0){Yt.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(cn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),a=Math.sin(n),r=this.x-t.x,s=this.y-t.y;return this.x=r*i-s*a+t.x,this.y=r*a+s*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class It{constructor(t,n,i,a,r,s,o,l,c){It.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,r,s,o,l,c)}set(t,n,i,a,r,s,o,l,c){const d=this.elements;return d[0]=t,d[1]=a,d[2]=o,d[3]=n,d[4]=r,d[5]=l,d[6]=i,d[7]=s,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,r=this.elements,s=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],f=i[2],p=i[5],_=i[8],x=a[0],m=a[3],u=a[6],g=a[1],v=a[4],y=a[7],w=a[2],R=a[5],T=a[8];return r[0]=s*x+o*g+l*w,r[3]=s*m+o*v+l*R,r[6]=s*u+o*y+l*T,r[1]=c*x+d*g+h*w,r[4]=c*m+d*v+h*R,r[7]=c*u+d*y+h*T,r[2]=f*x+p*g+_*w,r[5]=f*m+p*v+_*R,r[8]=f*u+p*y+_*T,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*s*d-n*o*c-i*r*d+i*o*l+a*r*c-a*s*l}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=d*s-o*c,f=o*l-d*r,p=c*r-s*l,_=n*h+i*f+a*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/_;return t[0]=h*x,t[1]=(a*c-d*i)*x,t[2]=(o*i-a*s)*x,t[3]=f*x,t[4]=(d*n-a*l)*x,t[5]=(a*r-o*n)*x,t[6]=p*x,t[7]=(i*l-c*n)*x,t[8]=(s*n-i*r)*x,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,r,s,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*s+c*o)+s+t,-a*c,a*l,-a*(-c*s+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Zu.makeScale(t,n)),this}rotate(t){return this.premultiply(Zu.makeRotation(-t)),this}translate(t,n){return this.premultiply(Zu.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Zu=new It;function px(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Nc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function $E(){const e=Nc("canvas");return e.style.display="block",e}const eg={};function lo(e){e in eg||(eg[e]=!0,console.warn(e))}function tb(e,t,n){return new Promise(function(i,a){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const ng=new It().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ig=new It().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Is={[Ra]:{transfer:wc,primaries:Dc,luminanceCoefficients:[.2126,.7152,.0722],toReference:e=>e,fromReference:e=>e},[ti]:{transfer:he,primaries:Dc,luminanceCoefficients:[.2126,.7152,.0722],toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[tu]:{transfer:wc,primaries:Uc,luminanceCoefficients:[.2289,.6917,.0793],toReference:e=>e.applyMatrix3(ig),fromReference:e=>e.applyMatrix3(ng)},[sp]:{transfer:he,primaries:Uc,luminanceCoefficients:[.2289,.6917,.0793],toReference:e=>e.convertSRGBToLinear().applyMatrix3(ig),fromReference:e=>e.applyMatrix3(ng).convertLinearToSRGB()}},eb=new Set([Ra,tu]),ie={enabled:!0,_workingColorSpace:Ra,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(e){if(!eb.has(e))throw new Error(`Unsupported working color space, "${e}".`);this._workingColorSpace=e},convert:function(e,t,n){if(this.enabled===!1||t===n||!t||!n)return e;const i=Is[t].toReference,a=Is[n].fromReference;return a(i(e))},fromWorkingColorSpace:function(e,t){return this.convert(e,this._workingColorSpace,t)},toWorkingColorSpace:function(e,t){return this.convert(e,t,this._workingColorSpace)},getPrimaries:function(e){return Is[e].primaries},getTransfer:function(e){return e===ia?wc:Is[e].transfer},getLuminanceCoefficients:function(e,t=this._workingColorSpace){return e.fromArray(Is[t].luminanceCoefficients)}};function ns(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ku(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let mr;class nb{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{mr===void 0&&(mr=Nc("canvas")),mr.width=t.width,mr.height=t.height;const i=mr.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=mr}return n.width>2048||n.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),n.toDataURL("image/jpeg",.6)):n.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Nc("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const a=i.getImageData(0,0,t.width,t.height),r=a.data;for(let s=0;s<r.length;s++)r[s]=ns(r[s]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(ns(n[i]/255)*255):n[i]=ns(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ib=0;class mx{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ib++}),this.uuid=Fo(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let r;if(Array.isArray(a)){r=[];for(let s=0,o=a.length;s<o;s++)a[s].isDataTexture?r.push(Qu(a[s].image)):r.push(Qu(a[s]))}else r=Qu(a);i.url=r}return n||(t.images[this.uuid]=i),i}}function Qu(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?nb.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ab=0;class dn extends Rs{constructor(t=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Xa,a=Xa,r=Kn,s=Wa,o=Qn,l=Fi,c=dn.DEFAULT_ANISOTROPY,d=ia){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ab++}),this.uuid=Fo(),this.name="",this.source=new mx(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=r,this.minFilter=s,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new It,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nx)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Sd:t.x=t.x-Math.floor(t.x);break;case Xa:t.x=t.x<0?0:1;break;case Md:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Sd:t.y=t.y-Math.floor(t.y);break;case Xa:t.y=t.y<0?0:1;break;case Md:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=nx;dn.DEFAULT_ANISOTROPY=1;class Ve{constructor(t=0,n=0,i=0,a=1){Ve.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,r=this.w,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a+s[12]*r,this.y=s[1]*n+s[5]*i+s[9]*a+s[13]*r,this.z=s[2]*n+s[6]*i+s[10]*a+s[14]*r,this.w=s[3]*n+s[7]*i+s[11]*a+s[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,r;const l=t.elements,c=l[0],d=l[4],h=l[8],f=l[1],p=l[5],_=l[9],x=l[2],m=l[6],u=l[10];if(Math.abs(d-f)<.01&&Math.abs(h-x)<.01&&Math.abs(_-m)<.01){if(Math.abs(d+f)<.1&&Math.abs(h+x)<.1&&Math.abs(_+m)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(c+1)/2,y=(p+1)/2,w=(u+1)/2,R=(d+f)/4,T=(h+x)/4,L=(_+m)/4;return v>y&&v>w?v<.01?(i=0,a=.707106781,r=.707106781):(i=Math.sqrt(v),a=R/i,r=T/i):y>w?y<.01?(i=.707106781,a=0,r=.707106781):(a=Math.sqrt(y),i=R/a,r=L/a):w<.01?(i=.707106781,a=.707106781,r=0):(r=Math.sqrt(w),i=T/r,a=L/r),this.set(i,a,r,n),this}let g=Math.sqrt((m-_)*(m-_)+(h-x)*(h-x)+(f-d)*(f-d));return Math.abs(g)<.001&&(g=1),this.x=(m-_)/g,this.y=(h-x)/g,this.z=(f-d)/g,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this.w=Math.max(t.w,Math.min(n.w,this.w)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this.w=Math.max(t,Math.min(n,this.w)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rb extends Rs{constructor(t=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=1,this.scissor=new Ve(0,0,t,n),this.scissorTest=!1,this.viewport=new Ve(0,0,t,n);const a={width:t,height:n,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new dn(a,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const s=i.count;for(let o=0;o<s;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,r=this.textures.length;a<r;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,a=t.textures.length;i<a;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const n=Object.assign({},t.texture.image);return this.texture.source=new mx(n),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ar extends rb{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class gx extends dn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Xa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sb extends dn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=Fn,this.minFilter=Fn,this.wrapR=Xa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ho{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,r,s,o){let l=i[a+0],c=i[a+1],d=i[a+2],h=i[a+3];const f=r[s+0],p=r[s+1],_=r[s+2],x=r[s+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=d,t[n+3]=h;return}if(o===1){t[n+0]=f,t[n+1]=p,t[n+2]=_,t[n+3]=x;return}if(h!==x||l!==f||c!==p||d!==_){let m=1-o;const u=l*f+c*p+d*_+h*x,g=u>=0?1:-1,v=1-u*u;if(v>Number.EPSILON){const w=Math.sqrt(v),R=Math.atan2(w,u*g);m=Math.sin(m*R)/w,o=Math.sin(o*R)/w}const y=o*g;if(l=l*m+f*y,c=c*m+p*y,d=d*m+_*y,h=h*m+x*y,m===1-o){const w=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=w,c*=w,d*=w,h*=w}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,a,r,s){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],h=r[s],f=r[s+1],p=r[s+2],_=r[s+3];return t[n]=o*_+d*h+l*p-c*f,t[n+1]=l*_+d*f+c*h-o*p,t[n+2]=c*_+d*p+o*f-l*h,t[n+3]=d*_-o*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,a=t._y,r=t._z,s=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),h=o(r/2),f=l(i/2),p=l(a/2),_=l(r/2);switch(s){case"XYZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"YXZ":this._x=f*d*h+c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"ZXY":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h-f*p*_;break;case"ZYX":this._x=f*d*h-c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h+f*p*_;break;case"YZX":this._x=f*d*h+c*p*_,this._y=c*p*h+f*d*_,this._z=c*d*_-f*p*h,this._w=c*d*h-f*p*_;break;case"XZY":this._x=f*d*h-c*p*_,this._y=c*p*h-f*d*_,this._z=c*d*_+f*p*h,this._w=c*d*h+f*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],a=n[4],r=n[8],s=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],f=i+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(s-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(a+s)/p,this._z=(r+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(r-c)/p,this._x=(a+s)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(s-a)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(cn(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,a=t._y,r=t._z,s=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+s*o+a*c-r*l,this._y=a*d+s*l+r*o-i*c,this._z=r*d+s*c+i*l-a*o,this._w=s*d-i*o-a*l-r*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);const i=this._x,a=this._y,r=this._z,s=this._w;let o=s*t._w+i*t._x+a*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=s,this._x=i,this._y=a,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const p=1-n;return this._w=p*s+n*this._w,this._x=p*i+n*this._x,this._y=p*a+n*this._y,this._z=p*r+n*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,o),h=Math.sin((1-n)*d)/c,f=Math.sin(n*d)/c;return this._w=s*h+this._w*f,this._x=i*h+this._x*f,this._y=a*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(t=0,n=0,i=0){V.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(ag.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(ag.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*a,this.y=r[1]*n+r[4]*i+r[7]*a,this.z=r[2]*n+r[5]*i+r[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,r=t.elements,s=1/(r[3]*n+r[7]*i+r[11]*a+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*a+r[12])*s,this.y=(r[1]*n+r[5]*i+r[9]*a+r[13])*s,this.z=(r[2]*n+r[6]*i+r[10]*a+r[14])*s,this}applyQuaternion(t){const n=this.x,i=this.y,a=this.z,r=t.x,s=t.y,o=t.z,l=t.w,c=2*(s*a-o*i),d=2*(o*n-r*a),h=2*(r*i-s*n);return this.x=n+l*c+s*h-o*d,this.y=i+l*d+o*c-r*h,this.z=a+l*h+r*d-s*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,a=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a,this.y=r[1]*n+r[5]*i+r[9]*a,this.z=r[2]*n+r[6]*i+r[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Math.max(t.x,Math.min(n.x,this.x)),this.y=Math.max(t.y,Math.min(n.y,this.y)),this.z=Math.max(t.z,Math.min(n.z,this.z)),this}clampScalar(t,n){return this.x=Math.max(t,Math.min(n,this.x)),this.y=Math.max(t,Math.min(n,this.y)),this.z=Math.max(t,Math.min(n,this.z)),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(n,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,a=t.y,r=t.z,s=n.x,o=n.y,l=n.z;return this.x=a*l-r*o,this.y=r*s-i*l,this.z=i*o-a*s,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Ju.copy(this).projectOnVector(t),this.sub(Ju)}reflect(t){return this.sub(Ju.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(cn(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ju=new V,ag=new Ho;class Go{constructor(t=new V(1/0,1/0,1/0),n=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Wn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Wn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=Wn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let s=0,o=r.count;s<o;s++)t.isMesh===!0?t.getVertexPosition(s,Wn):Wn.fromBufferAttribute(r,s),Wn.applyMatrix4(t.matrixWorld),this.expandByPoint(Wn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),cl.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),cl.copy(i.boundingBox)),cl.applyMatrix4(t.matrixWorld),this.union(cl)}const a=t.children;for(let r=0,s=a.length;r<s;r++)this.expandByObject(a[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Wn),Wn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),ul.subVectors(this.max,Bs),gr.subVectors(t.a,Bs),vr.subVectors(t.b,Bs),_r.subVectors(t.c,Bs),Wi.subVectors(vr,gr),qi.subVectors(_r,vr),Da.subVectors(gr,_r);let n=[0,-Wi.z,Wi.y,0,-qi.z,qi.y,0,-Da.z,Da.y,Wi.z,0,-Wi.x,qi.z,0,-qi.x,Da.z,0,-Da.x,-Wi.y,Wi.x,0,-qi.y,qi.x,0,-Da.y,Da.x,0];return!$u(n,gr,vr,_r,ul)||(n=[1,0,0,0,1,0,0,0,1],!$u(n,gr,vr,_r,ul))?!1:(fl.crossVectors(Wi,qi),n=[fl.x,fl.y,fl.z],$u(n,gr,vr,_r,ul))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Wn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Wn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const gi=[new V,new V,new V,new V,new V,new V,new V,new V],Wn=new V,cl=new Go,gr=new V,vr=new V,_r=new V,Wi=new V,qi=new V,Da=new V,Bs=new V,ul=new V,fl=new V,Ua=new V;function $u(e,t,n,i,a){for(let r=0,s=e.length-3;r<=s;r+=3){Ua.fromArray(e,r);const o=a.x*Math.abs(Ua.x)+a.y*Math.abs(Ua.y)+a.z*Math.abs(Ua.z),l=t.dot(Ua),c=n.dot(Ua),d=i.dot(Ua);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const ob=new Go,Fs=new V,tf=new V;class op{constructor(t=new V,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):ob.setFromPoints(t).getCenter(i);let a=0;for(let r=0,s=t.length;r<s;r++)a=Math.max(a,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Fs.subVectors(t,this.center);const n=Fs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Fs,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(tf.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Fs.copy(t.center).add(tf)),this.expandByPoint(Fs.copy(t.center).sub(tf))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vi=new V,ef=new V,dl=new V,ji=new V,nf=new V,hl=new V,af=new V;class lb{constructor(t=new V,n=new V(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,vi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=vi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(vi.copy(this.origin).addScaledVector(this.direction,n),vi.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){ef.copy(t).add(n).multiplyScalar(.5),dl.copy(n).sub(t).normalize(),ji.copy(this.origin).sub(ef);const r=t.distanceTo(n)*.5,s=-this.direction.dot(dl),o=ji.dot(this.direction),l=-ji.dot(dl),c=ji.lengthSq(),d=Math.abs(1-s*s);let h,f,p,_;if(d>0)if(h=s*l-o,f=s*o-l,_=r*d,h>=0)if(f>=-_)if(f<=_){const x=1/d;h*=x,f*=x,p=h*(h+s*f+2*o)+f*(s*h+f+2*l)+c}else f=r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;else f<=-_?(h=Math.max(0,-(-s*r+o)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=_?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(s*r+o)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=s>0?-r:r,h=Math.max(0,-(s*f+o)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(ef).addScaledVector(dl,f),p}intersectSphere(t,n){vi.subVectors(t.center,this.origin);const i=vi.dot(this.direction),a=vi.dot(vi)-i*i,r=t.radius*t.radius;if(a>r)return null;const s=Math.sqrt(r-a),o=i-s,l=i+s;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,r,s,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,a=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,a=(t.min.x-f.x)*c),d>=0?(r=(t.min.y-f.y)*d,s=(t.max.y-f.y)*d):(r=(t.max.y-f.y)*d,s=(t.min.y-f.y)*d),i>s||r>a||((r>i||isNaN(i))&&(i=r),(s<a||isNaN(a))&&(a=s),h>=0?(o=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,vi)!==null}intersectTriangle(t,n,i,a,r){nf.subVectors(n,t),hl.subVectors(i,t),af.crossVectors(nf,hl);let s=this.direction.dot(af),o;if(s>0){if(a)return null;o=1}else if(s<0)o=-1,s=-s;else return null;ji.subVectors(this.origin,t);const l=o*this.direction.dot(hl.crossVectors(ji,hl));if(l<0)return null;const c=o*this.direction.dot(nf.cross(ji));if(c<0||l+c>s)return null;const d=-o*ji.dot(af);return d<0?null:this.at(d/s,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(t,n,i,a,r,s,o,l,c,d,h,f,p,_,x,m){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,r,s,o,l,c,d,h,f,p,_,x,m)}set(t,n,i,a,r,s,o,l,c,d,h,f,p,_,x,m){const u=this.elements;return u[0]=t,u[4]=n,u[8]=i,u[12]=a,u[1]=r,u[5]=s,u[9]=o,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=f,u[3]=p,u[7]=_,u[11]=x,u[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){const n=this.elements,i=t.elements,a=1/xr.setFromMatrixColumn(t,0).length(),r=1/xr.setFromMatrixColumn(t,1).length(),s=1/xr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*s,n[9]=i[9]*s,n[10]=i[10]*s,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,a=t.y,r=t.z,s=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=s*d,p=s*h,_=o*d,x=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+_*c,n[5]=f-x*c,n[9]=-o*l,n[2]=x-f*c,n[6]=_+p*c,n[10]=s*l}else if(t.order==="YXZ"){const f=l*d,p=l*h,_=c*d,x=c*h;n[0]=f+x*o,n[4]=_*o-p,n[8]=s*c,n[1]=s*h,n[5]=s*d,n[9]=-o,n[2]=p*o-_,n[6]=x+f*o,n[10]=s*l}else if(t.order==="ZXY"){const f=l*d,p=l*h,_=c*d,x=c*h;n[0]=f-x*o,n[4]=-s*h,n[8]=_+p*o,n[1]=p+_*o,n[5]=s*d,n[9]=x-f*o,n[2]=-s*c,n[6]=o,n[10]=s*l}else if(t.order==="ZYX"){const f=s*d,p=s*h,_=o*d,x=o*h;n[0]=l*d,n[4]=_*c-p,n[8]=f*c+x,n[1]=l*h,n[5]=x*c+f,n[9]=p*c-_,n[2]=-c,n[6]=o*l,n[10]=s*l}else if(t.order==="YZX"){const f=s*l,p=s*c,_=o*l,x=o*c;n[0]=l*d,n[4]=x-f*h,n[8]=_*h+p,n[1]=h,n[5]=s*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+_,n[10]=f-x*h}else if(t.order==="XZY"){const f=s*l,p=s*c,_=o*l,x=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=f*h+x,n[5]=s*d,n[9]=p*h-_,n[2]=_*h-p,n[6]=o*d,n[10]=x*h+f}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(cb,t,ub)}lookAt(t,n,i){const a=this.elements;return vn.subVectors(t,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Yi.crossVectors(i,vn),Yi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Yi.crossVectors(i,vn)),Yi.normalize(),pl.crossVectors(vn,Yi),a[0]=Yi.x,a[4]=pl.x,a[8]=vn.x,a[1]=Yi.y,a[5]=pl.y,a[9]=vn.y,a[2]=Yi.z,a[6]=pl.z,a[10]=vn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,r=this.elements,s=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],f=i[9],p=i[13],_=i[2],x=i[6],m=i[10],u=i[14],g=i[3],v=i[7],y=i[11],w=i[15],R=a[0],T=a[4],L=a[8],b=a[12],S=a[1],D=a[5],W=a[9],k=a[13],Z=a[2],j=a[6],N=a[10],H=a[14],I=a[3],tt=a[7],nt=a[11],dt=a[15];return r[0]=s*R+o*S+l*Z+c*I,r[4]=s*T+o*D+l*j+c*tt,r[8]=s*L+o*W+l*N+c*nt,r[12]=s*b+o*k+l*H+c*dt,r[1]=d*R+h*S+f*Z+p*I,r[5]=d*T+h*D+f*j+p*tt,r[9]=d*L+h*W+f*N+p*nt,r[13]=d*b+h*k+f*H+p*dt,r[2]=_*R+x*S+m*Z+u*I,r[6]=_*T+x*D+m*j+u*tt,r[10]=_*L+x*W+m*N+u*nt,r[14]=_*b+x*k+m*H+u*dt,r[3]=g*R+v*S+y*Z+w*I,r[7]=g*T+v*D+y*j+w*tt,r[11]=g*L+v*W+y*N+w*nt,r[15]=g*b+v*k+y*H+w*dt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],a=t[8],r=t[12],s=t[1],o=t[5],l=t[9],c=t[13],d=t[2],h=t[6],f=t[10],p=t[14],_=t[3],x=t[7],m=t[11],u=t[15];return _*(+r*l*h-a*c*h-r*o*f+i*c*f+a*o*p-i*l*p)+x*(+n*l*p-n*c*f+r*s*f-a*s*p+a*c*d-r*l*d)+m*(+n*c*h-n*o*p-r*s*h+i*s*p+r*o*d-i*c*d)+u*(-a*o*d-n*l*h+n*o*f+a*s*h-i*s*f+i*l*d)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],r=t[3],s=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=t[9],f=t[10],p=t[11],_=t[12],x=t[13],m=t[14],u=t[15],g=h*m*c-x*f*c+x*l*p-o*m*p-h*l*u+o*f*u,v=_*f*c-d*m*c-_*l*p+s*m*p+d*l*u-s*f*u,y=d*x*c-_*h*c+_*o*p-s*x*p-d*o*u+s*h*u,w=_*h*l-d*x*l-_*o*f+s*x*f+d*o*m-s*h*m,R=n*g+i*v+a*y+r*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return t[0]=g*T,t[1]=(x*f*r-h*m*r-x*a*p+i*m*p+h*a*u-i*f*u)*T,t[2]=(o*m*r-x*l*r+x*a*c-i*m*c-o*a*u+i*l*u)*T,t[3]=(h*l*r-o*f*r-h*a*c+i*f*c+o*a*p-i*l*p)*T,t[4]=v*T,t[5]=(d*m*r-_*f*r+_*a*p-n*m*p-d*a*u+n*f*u)*T,t[6]=(_*l*r-s*m*r-_*a*c+n*m*c+s*a*u-n*l*u)*T,t[7]=(s*f*r-d*l*r+d*a*c-n*f*c-s*a*p+n*l*p)*T,t[8]=y*T,t[9]=(_*h*r-d*x*r-_*i*p+n*x*p+d*i*u-n*h*u)*T,t[10]=(s*x*r-_*o*r+_*i*c-n*x*c-s*i*u+n*o*u)*T,t[11]=(d*o*r-s*h*r-d*i*c+n*h*c+s*i*p-n*o*p)*T,t[12]=w*T,t[13]=(d*x*a-_*h*a+_*i*f-n*x*f-d*i*m+n*h*m)*T,t[14]=(_*o*a-s*x*a-_*i*l+n*x*l+s*i*m-n*o*m)*T,t[15]=(s*h*a-d*o*a+d*i*l-n*h*l-s*i*f+n*o*f)*T,this}scale(t){const n=this.elements,i=t.x,a=t.y,r=t.z;return n[0]*=i,n[4]*=a,n[8]*=r,n[1]*=i,n[5]*=a,n[9]*=r,n[2]*=i,n[6]*=a,n[10]*=r,n[3]*=i,n[7]*=a,n[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),a=Math.sin(n),r=1-i,s=t.x,o=t.y,l=t.z,c=r*s,d=r*o;return this.set(c*s+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*s,0,c*l-a*o,d*l+a*s,r*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,r,s){return this.set(1,i,r,0,t,1,s,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){const a=this.elements,r=n._x,s=n._y,o=n._z,l=n._w,c=r+r,d=s+s,h=o+o,f=r*c,p=r*d,_=r*h,x=s*d,m=s*h,u=o*h,g=l*c,v=l*d,y=l*h,w=i.x,R=i.y,T=i.z;return a[0]=(1-(x+u))*w,a[1]=(p+y)*w,a[2]=(_-v)*w,a[3]=0,a[4]=(p-y)*R,a[5]=(1-(f+u))*R,a[6]=(m+g)*R,a[7]=0,a[8]=(_+v)*T,a[9]=(m-g)*T,a[10]=(1-(f+x))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){const a=this.elements;let r=xr.set(a[0],a[1],a[2]).length();const s=xr.set(a[4],a[5],a[6]).length(),o=xr.set(a[8],a[9],a[10]).length();this.determinant()<0&&(r=-r),t.x=a[12],t.y=a[13],t.z=a[14],qn.copy(this);const c=1/r,d=1/s,h=1/o;return qn.elements[0]*=c,qn.elements[1]*=c,qn.elements[2]*=c,qn.elements[4]*=d,qn.elements[5]*=d,qn.elements[6]*=d,qn.elements[8]*=h,qn.elements[9]*=h,qn.elements[10]*=h,n.setFromRotationMatrix(qn),i.x=r,i.y=s,i.z=o,this}makePerspective(t,n,i,a,r,s,o=Di){const l=this.elements,c=2*r/(n-t),d=2*r/(i-a),h=(n+t)/(n-t),f=(i+a)/(i-a);let p,_;if(o===Di)p=-(s+r)/(s-r),_=-2*s*r/(s-r);else if(o===Lc)p=-s/(s-r),_=-s*r/(s-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,a,r,s,o=Di){const l=this.elements,c=1/(n-t),d=1/(i-a),h=1/(s-r),f=(n+t)*c,p=(i+a)*d;let _,x;if(o===Di)_=(s+r)*h,x=-2*h;else if(o===Lc)_=r*h,x=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const xr=new V,qn=new Pe,cb=new V(0,0,0),ub=new V(1,1,1),Yi=new V,pl=new V,vn=new V,rg=new Pe,sg=new Ho;class Hi{constructor(t=0,n=0,i=0,a=Hi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const a=t.elements,r=a[0],s=a[4],o=a[8],l=a[1],c=a[5],d=a[9],h=a[2],f=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(cn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-s,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-cn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(cn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-s,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-cn(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-s,c));break;case"YZX":this._z=Math.asin(cn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-cn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return rg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rg,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return sg.setFromEuler(this),this.setFromQuaternion(sg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Hi.DEFAULT_ORDER="XYZ";class vx{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let fb=0;const og=new V,yr=new Ho,_i=new Pe,ml=new V,Hs=new V,db=new V,hb=new Ho,lg=new V(1,0,0),cg=new V(0,1,0),ug=new V(0,0,1),fg={type:"added"},pb={type:"removed"},Sr={type:"childadded",child:null},rf={type:"childremoved",child:null};class Rn extends Rs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fb++}),this.uuid=Fo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rn.DEFAULT_UP.clone();const t=new V,n=new Hi,i=new Ho,a=new V(1,1,1);function r(){i.setFromEuler(n,!1)}function s(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Pe},normalMatrix:{value:new It}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=Rn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vx,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return yr.setFromAxisAngle(t,n),this.quaternion.multiply(yr),this}rotateOnWorldAxis(t,n){return yr.setFromAxisAngle(t,n),this.quaternion.premultiply(yr),this}rotateX(t){return this.rotateOnAxis(lg,t)}rotateY(t){return this.rotateOnAxis(cg,t)}rotateZ(t){return this.rotateOnAxis(ug,t)}translateOnAxis(t,n){return og.copy(t).applyQuaternion(this.quaternion),this.position.add(og.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(lg,t)}translateY(t){return this.translateOnAxis(cg,t)}translateZ(t){return this.translateOnAxis(ug,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(_i.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?ml.copy(t):ml.set(t,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?_i.lookAt(Hs,ml,this.up):_i.lookAt(ml,Hs,this.up),this.quaternion.setFromRotationMatrix(_i),a&&(_i.extractRotation(a.matrixWorld),yr.setFromRotationMatrix(_i),this.quaternion.premultiply(yr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(fg),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(pb),rf.child=t,this.dispatchEvent(rf),rf.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),_i.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),_i.multiply(t.parent.matrixWorld)),t.applyMatrix4(_i),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(fg),Sr.child=t,this.dispatchEvent(Sr),Sr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const s=this.children[i].getObjectByProperty(t,n);if(s!==void 0)return s}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,t,db),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,hb,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const a=this.children;for(let r=0,s=a.length;r<s;r++)a[r].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.visibility=this._visibility,a.active=this._active,a.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.geometryCount=this._geometryCount,a.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere={center:a.boundingSphere.center.toArray(),radius:a.boundingSphere.radius}),this.boundingBox!==null&&(a.boundingBox={min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));a.material=o}else a.material=r(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(r(t.animations,l))}}if(n){const o=s(t.geometries),l=s(t.materials),c=s(t.textures),d=s(t.images),h=s(t.shapes),f=s(t.skeletons),p=s(t.animations),_=s(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=a,i;function s(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const a=t.children[i];this.add(a.clone())}return this}}Rn.DEFAULT_UP=new V(0,1,0);Rn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jn=new V,xi=new V,sf=new V,yi=new V,Mr=new V,Er=new V,dg=new V,of=new V,lf=new V,cf=new V;class ni{constructor(t=new V,n=new V,i=new V){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),jn.subVectors(t,n),a.cross(jn);const r=a.lengthSq();return r>0?a.multiplyScalar(1/Math.sqrt(r)):a.set(0,0,0)}static getBarycoord(t,n,i,a,r){jn.subVectors(a,n),xi.subVectors(i,n),sf.subVectors(t,n);const s=jn.dot(jn),o=jn.dot(xi),l=jn.dot(sf),c=xi.dot(xi),d=xi.dot(sf),h=s*c-o*o;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-o*d)*f,_=(s*d-o*l)*f;return r.set(1-p-_,_,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(t,n,i,a,r,s,o,l){return this.getBarycoord(t,n,i,a,yi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,yi.x),l.addScaledVector(s,yi.y),l.addScaledVector(o,yi.z),l)}static isFrontFacing(t,n,i,a){return jn.subVectors(i,n),xi.subVectors(t,n),jn.cross(xi).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return jn.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),jn.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ni.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ni.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,r){return ni.getInterpolation(t,this.a,this.b,this.c,n,i,a,r)}containsPoint(t){return ni.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ni.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,a=this.b,r=this.c;let s,o;Mr.subVectors(a,i),Er.subVectors(r,i),of.subVectors(t,i);const l=Mr.dot(of),c=Er.dot(of);if(l<=0&&c<=0)return n.copy(i);lf.subVectors(t,a);const d=Mr.dot(lf),h=Er.dot(lf);if(d>=0&&h<=d)return n.copy(a);const f=l*h-d*c;if(f<=0&&l>=0&&d<=0)return s=l/(l-d),n.copy(i).addScaledVector(Mr,s);cf.subVectors(t,r);const p=Mr.dot(cf),_=Er.dot(cf);if(_>=0&&p<=_)return n.copy(r);const x=p*c-l*_;if(x<=0&&c>=0&&_<=0)return o=c/(c-_),n.copy(i).addScaledVector(Er,o);const m=d*_-p*h;if(m<=0&&h-d>=0&&p-_>=0)return dg.subVectors(r,a),o=(h-d)/(h-d+(p-_)),n.copy(a).addScaledVector(dg,o);const u=1/(m+x+f);return s=x*u,o=f*u,n.copy(i).addScaledVector(Mr,s).addScaledVector(Er,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _x={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zi={h:0,s:0,l:0},gl={h:0,s:0,l:0};function uf(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class se{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ie.toWorkingColorSpace(this,n),this}setRGB(t,n,i,a=ie.workingColorSpace){return this.r=t,this.g=n,this.b=i,ie.toWorkingColorSpace(this,a),this}setHSL(t,n,i,a=ie.workingColorSpace){if(t=JE(t,1),n=cn(n,0,1),i=cn(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,s=2*i-r;this.r=uf(s,r,t+1/3),this.g=uf(s,r,t),this.b=uf(s,r,t-1/3)}return ie.toWorkingColorSpace(this,a),this}setStyle(t,n=ti){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const s=a[1],o=a[2];switch(s){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=a[1],s=r.length;if(s===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(s===6)return this.setHex(parseInt(r,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ti){const i=_x[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ns(t.r),this.g=ns(t.g),this.b=ns(t.b),this}copyLinearToSRGB(t){return this.r=Ku(t.r),this.g=Ku(t.g),this.b=Ku(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return ie.fromWorkingColorSpace(Je.copy(this),t),Math.round(cn(Je.r*255,0,255))*65536+Math.round(cn(Je.g*255,0,255))*256+Math.round(cn(Je.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=ie.workingColorSpace){ie.fromWorkingColorSpace(Je.copy(this),n);const i=Je.r,a=Je.g,r=Je.b,s=Math.max(i,a,r),o=Math.min(i,a,r);let l,c;const d=(o+s)/2;if(o===s)l=0,c=0;else{const h=s-o;switch(c=d<=.5?h/(s+o):h/(2-s-o),s){case i:l=(a-r)/h+(a<r?6:0);break;case a:l=(r-i)/h+2;break;case r:l=(i-a)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=ie.workingColorSpace){return ie.fromWorkingColorSpace(Je.copy(this),n),t.r=Je.r,t.g=Je.g,t.b=Je.b,t}getStyle(t=ti){ie.fromWorkingColorSpace(Je.copy(this),t);const n=Je.r,i=Je.g,a=Je.b;return t!==ti?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(Zi),this.setHSL(Zi.h+t,Zi.s+n,Zi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Zi),t.getHSL(gl);const i=Yu(Zi.h,gl.h,n),a=Yu(Zi.s,gl.s,n),r=Yu(Zi.l,gl.l,n);return this.setHSL(i,a,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,a=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*a,this.g=r[1]*n+r[4]*i+r[7]*a,this.b=r[2]*n+r[5]*i+r[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Je=new se;se.NAMES=_x;let mb=0;class eu extends Rs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:mb++}),this.uuid=Fo(),this.name="",this.type="Material",this.blending=ts,this.side=ba,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=vd,this.blendDst=_d,this.blendEquation=Va,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new se(0,0,0),this.blendAlpha=0,this.depthFunc=Cc,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pr,this.stencilZFail=pr,this.stencilZPass=pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(i.blending=this.blending),this.side!==ba&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==vd&&(i.blendSrc=this.blendSrc),this.blendDst!==_d&&(i.blendDst=this.blendDst),this.blendEquation!==Va&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Cc&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jm&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(r){const s=[];for(const o in r){const l=r[o];delete l.metadata,s.push(l)}return s}if(n){const r=a(t.textures),s=a(t.images);r.length>0&&(i.textures=r),s.length>0&&(i.images=s)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let r=0;r!==a;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}onBeforeRender(){console.warn("Material: onBeforeRender() has been removed.")}}class xx extends eu{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new se(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=ex,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new V,vl=new Yt;class li{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=$m,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return lo("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,r=this.itemSize;a<r;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)vl.fromBufferAttribute(this,n),vl.applyMatrix3(t),this.setXY(n,vl.x,vl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)we.fromBufferAttribute(this,n),we.applyMatrix3(t),this.setXYZ(n,we.x,we.y,we.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)we.fromBufferAttribute(this,n),we.applyMatrix4(t),this.setXYZ(n,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)we.fromBufferAttribute(this,n),we.applyNormalMatrix(t),this.setXYZ(n,we.x,we.y,we.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)we.fromBufferAttribute(this,n),we.transformDirection(t),this.setXYZ(n,we.x,we.y,we.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=zs(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=sn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=zs(n,this.array)),n}setX(t,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=zs(n,this.array)),n}setY(t,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=zs(n,this.array)),n}setZ(t,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=zs(n,this.array)),n}setW(t,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array),a=sn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,r){return t*=this.itemSize,this.normalized&&(n=sn(n,this.array),i=sn(i,this.array),a=sn(a,this.array),r=sn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==$m&&(t.usage=this.usage),t}}class yx extends li{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class Sx extends li{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Qa extends li{constructor(t,n,i){super(new Float32Array(t),n,i)}}let gb=0;const Un=new Pe,ff=new Rn,br=new V,_n=new Go,Gs=new Go,Fe=new V;class ur extends Rs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:gb++}),this.uuid=Fo(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(px(t)?Sx:yx)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new It().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Un.makeRotationFromQuaternion(t),this.applyMatrix4(Un),this}rotateX(t){return Un.makeRotationX(t),this.applyMatrix4(Un),this}rotateY(t){return Un.makeRotationY(t),this.applyMatrix4(Un),this}rotateZ(t){return Un.makeRotationZ(t),this.applyMatrix4(Un),this}translate(t,n,i){return Un.makeTranslation(t,n,i),this.applyMatrix4(Un),this}scale(t,n,i){return Un.makeScale(t,n,i),this.applyMatrix4(Un),this}lookAt(t){return ff.lookAt(t),ff.updateMatrix(),this.applyMatrix4(ff.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(t){const n=[];for(let i=0,a=t.length;i<a;i++){const r=t[i];n.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Qa(n,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Go);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){const r=n[i];_n.setFromBufferAttribute(r),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,_n.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,_n.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(_n.min),this.boundingBox.expandByPoint(_n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new op);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(t){const i=this.boundingSphere.center;if(_n.setFromBufferAttribute(t),n)for(let r=0,s=n.length;r<s;r++){const o=n[r];Gs.setFromBufferAttribute(o),this.morphTargetsRelative?(Fe.addVectors(_n.min,Gs.min),_n.expandByPoint(Fe),Fe.addVectors(_n.max,Gs.max),_n.expandByPoint(Fe)):(_n.expandByPoint(Gs.min),_n.expandByPoint(Gs.max))}_n.getCenter(i);let a=0;for(let r=0,s=t.count;r<s;r++)Fe.fromBufferAttribute(t,r),a=Math.max(a,i.distanceToSquared(Fe));if(n)for(let r=0,s=n.length;r<s;r++){const o=n[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Fe.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(t,c),Fe.add(br)),a=Math.max(a,i.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new li(new Float32Array(4*i.count),4));const s=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<i.count;L++)o[L]=new V,l[L]=new V;const c=new V,d=new V,h=new V,f=new Yt,p=new Yt,_=new Yt,x=new V,m=new V;function u(L,b,S){c.fromBufferAttribute(i,L),d.fromBufferAttribute(i,b),h.fromBufferAttribute(i,S),f.fromBufferAttribute(r,L),p.fromBufferAttribute(r,b),_.fromBufferAttribute(r,S),d.sub(c),h.sub(c),p.sub(f),_.sub(f);const D=1/(p.x*_.y-_.x*p.y);isFinite(D)&&(x.copy(d).multiplyScalar(_.y).addScaledVector(h,-p.y).multiplyScalar(D),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-_.x).multiplyScalar(D),o[L].add(x),o[b].add(x),o[S].add(x),l[L].add(m),l[b].add(m),l[S].add(m))}let g=this.groups;g.length===0&&(g=[{start:0,count:t.count}]);for(let L=0,b=g.length;L<b;++L){const S=g[L],D=S.start,W=S.count;for(let k=D,Z=D+W;k<Z;k+=3)u(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const v=new V,y=new V,w=new V,R=new V;function T(L){w.fromBufferAttribute(a,L),R.copy(w);const b=o[L];v.copy(b),v.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(R,b);const D=y.dot(l[L])<0?-1:1;s.setXYZW(L,v.x,v.y,v.z,D)}for(let L=0,b=g.length;L<b;++L){const S=g[L],D=S.start,W=S.count;for(let k=D,Z=D+W;k<Z;k+=3)T(t.getX(k+0)),T(t.getX(k+1)),T(t.getX(k+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new li(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const a=new V,r=new V,s=new V,o=new V,l=new V,c=new V,d=new V,h=new V;if(t)for(let f=0,p=t.count;f<p;f+=3){const _=t.getX(f+0),x=t.getX(f+1),m=t.getX(f+2);a.fromBufferAttribute(n,_),r.fromBufferAttribute(n,x),s.fromBufferAttribute(n,m),d.subVectors(s,r),h.subVectors(a,r),d.cross(h),o.fromBufferAttribute(i,_),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=n.count;f<p;f+=3)a.fromBufferAttribute(n,f+0),r.fromBufferAttribute(n,f+1),s.fromBufferAttribute(n,f+2),d.subVectors(s,r),h.subVectors(a,r),d.cross(h),i.setXYZ(f+0,d.x,d.y,d.z),i.setXYZ(f+1,d.x,d.y,d.z),i.setXYZ(f+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Fe.fromBufferAttribute(t,n),Fe.normalize(),t.setXYZ(n,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,h=o.normalized,f=new c.constructor(l.length*d);let p=0,_=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*d;for(let u=0;u<d;u++)f[_++]=c[p++]}return new li(f,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ur,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,i);n.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){const f=c[d],p=t(f,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const s=this.groups;for(let o=0,l=s.length;o<l;o++){const c=s[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];d.push(p.toJSON(t.data))}d.length>0&&(a[l]=d,r=!0)}r&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(n));const a=t.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const r=t.morphAttributes;for(const c in r){const d=[],h=r[c];for(let f=0,p=h.length;f<p;f++)d.push(h[f].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const s=t.groups;for(let c=0,d=s.length;c<d;c++){const h=s[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const hg=new Pe,La=new lb,_l=new op,pg=new V,Tr=new V,Ar=new V,Rr=new V,df=new V,xl=new V,yl=new Yt,Sl=new Yt,Ml=new Yt,mg=new V,gg=new V,vg=new V,El=new V,bl=new V;class si extends Rn{constructor(t=new ur,n=new xx){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,s=a.length;r<s;r++){const o=a[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){const i=this.geometry,a=i.attributes.position,r=i.morphAttributes.position,s=i.morphTargetsRelative;n.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(r&&o){xl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=o[l],h=r[l];d!==0&&(df.fromBufferAttribute(h,t),s?xl.addScaledVector(df,d):xl.addScaledVector(df.sub(n),d))}n.add(xl)}return n}raycast(t,n){const i=this.geometry,a=this.material,r=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),_l.copy(i.boundingSphere),_l.applyMatrix4(r),La.copy(t.ray).recast(t.near),!(_l.containsPoint(La.origin)===!1&&(La.intersectSphere(_l,pg)===null||La.origin.distanceToSquared(pg)>(t.far-t.near)**2))&&(hg.copy(r).invert(),La.copy(t.ray).applyMatrix4(hg),!(i.boundingBox!==null&&La.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,La)))}_computeIntersections(t,n,i){let a;const r=this.geometry,s=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(s))for(let _=0,x=f.length;_<x;_++){const m=f[_],u=s[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,w=v;y<w;y+=3){const R=o.getX(y),T=o.getX(y+1),L=o.getX(y+2);a=Tl(this,u,t,i,c,d,h,R,T,L),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=_,u=x;m<u;m+=3){const g=o.getX(m),v=o.getX(m+1),y=o.getX(m+2);a=Tl(this,s,t,i,c,d,h,g,v,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(s))for(let _=0,x=f.length;_<x;_++){const m=f[_],u=s[m.materialIndex],g=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=g,w=v;y<w;y+=3){const R=y,T=y+1,L=y+2;a=Tl(this,u,t,i,c,d,h,R,T,L),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const _=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=_,u=x;m<u;m+=3){const g=m,v=m+1,y=m+2;a=Tl(this,s,t,i,c,d,h,g,v,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function vb(e,t,n,i,a,r,s,o){let l;if(t.side===fn?l=i.intersectTriangle(s,r,a,!0,o):l=i.intersectTriangle(a,r,s,t.side===ba,o),l===null)return null;bl.copy(o),bl.applyMatrix4(e.matrixWorld);const c=n.ray.origin.distanceTo(bl);return c<n.near||c>n.far?null:{distance:c,point:bl.clone(),object:e}}function Tl(e,t,n,i,a,r,s,o,l,c){e.getVertexPosition(o,Tr),e.getVertexPosition(l,Ar),e.getVertexPosition(c,Rr);const d=vb(e,t,n,i,Tr,Ar,Rr,El);if(d){a&&(yl.fromBufferAttribute(a,o),Sl.fromBufferAttribute(a,l),Ml.fromBufferAttribute(a,c),d.uv=ni.getInterpolation(El,Tr,Ar,Rr,yl,Sl,Ml,new Yt)),r&&(yl.fromBufferAttribute(r,o),Sl.fromBufferAttribute(r,l),Ml.fromBufferAttribute(r,c),d.uv1=ni.getInterpolation(El,Tr,Ar,Rr,yl,Sl,Ml,new Yt)),s&&(mg.fromBufferAttribute(s,o),gg.fromBufferAttribute(s,l),vg.fromBufferAttribute(s,c),d.normal=ni.getInterpolation(El,Tr,Ar,Rr,mg,gg,vg,new V),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new V,materialIndex:0};ni.getNormal(Tr,Ar,Rr,h.normal),d.face=h}return d}class Vo extends ur{constructor(t=1,n=1,i=1,a=1,r=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:r,depthSegments:s};const o=this;a=Math.floor(a),r=Math.floor(r),s=Math.floor(s);const l=[],c=[],d=[],h=[];let f=0,p=0;_("z","y","x",-1,-1,i,n,t,s,r,0),_("z","y","x",1,-1,i,n,-t,s,r,1),_("x","z","y",1,1,t,i,n,a,s,2),_("x","z","y",1,-1,t,i,-n,a,s,3),_("x","y","z",1,-1,t,n,i,a,r,4),_("x","y","z",-1,-1,t,n,-i,a,r,5),this.setIndex(l),this.setAttribute("position",new Qa(c,3)),this.setAttribute("normal",new Qa(d,3)),this.setAttribute("uv",new Qa(h,2));function _(x,m,u,g,v,y,w,R,T,L,b){const S=y/T,D=w/L,W=y/2,k=w/2,Z=R/2,j=T+1,N=L+1;let H=0,I=0;const tt=new V;for(let nt=0;nt<N;nt++){const dt=nt*D-k;for(let Lt=0;Lt<j;Lt++){const Xt=Lt*S-W;tt[x]=Xt*g,tt[m]=dt*v,tt[u]=Z,c.push(tt.x,tt.y,tt.z),tt[x]=0,tt[m]=0,tt[u]=R>0?1:-1,d.push(tt.x,tt.y,tt.z),h.push(Lt/T),h.push(1-nt/L),H+=1}}for(let nt=0;nt<L;nt++)for(let dt=0;dt<T;dt++){const Lt=f+dt+j*nt,Xt=f+dt+j*(nt+1),X=f+(dt+1)+j*(nt+1),$=f+(dt+1)+j*nt;l.push(Lt,Xt,$),l.push(Xt,X,$),I+=6}o.addGroup(p,I,b),p+=I,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vo(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function _s(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const a=e[n][i];a&&(a.isColor||a.isMatrix3||a.isMatrix4||a.isVector2||a.isVector3||a.isVector4||a.isTexture||a.isQuaternion)?a.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone():Array.isArray(a)?t[n][i]=a.slice():t[n][i]=a}}return t}function $e(e){const t={};for(let n=0;n<e.length;n++){const i=_s(e[n]);for(const a in i)t[a]=i[a]}return t}function _b(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Mx(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ie.workingColorSpace}const xb={clone:_s,merge:$e};var yb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Sb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gi extends eu{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yb,this.fragmentShader=Sb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_s(t.uniforms),this.uniformsGroups=_b(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const s=this.uniforms[a].value;s&&s.isTexture?n.uniforms[a]={type:"t",value:s.toJSON(t).uuid}:s&&s.isColor?n.uniforms[a]={type:"c",value:s.getHex()}:s&&s.isVector2?n.uniforms[a]={type:"v2",value:s.toArray()}:s&&s.isVector3?n.uniforms[a]={type:"v3",value:s.toArray()}:s&&s.isVector4?n.uniforms[a]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?n.uniforms[a]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?n.uniforms[a]={type:"m4",value:s.toArray()}:n.uniforms[a]={value:s}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Ex extends Rn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Di}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ki=new V,_g=new Yt,xg=new Yt;class Zn extends Ex{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Zd*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ju*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zd*2*Math.atan(Math.tan(ju*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ki.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z),Ki.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ki.x,Ki.y).multiplyScalar(-t/Ki.z)}getViewSize(t,n){return this.getViewBounds(t,_g,xg),n.subVectors(xg,_g)}setViewOffset(t,n,i,a,r,s){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(ju*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,r=-.5*a;const s=this.view;if(this.view!==null&&this.view.enabled){const l=s.fullWidth,c=s.fullHeight;r+=s.offsetX*a/l,n-=s.offsetY*i/c,a*=s.width/l,i*=s.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+a,n,n-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Cr=-90,wr=1;class Mb extends Rn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Zn(Cr,wr,t,n);a.layers=this.layers,this.add(a);const r=new Zn(Cr,wr,t,n);r.layers=this.layers,this.add(r);const s=new Zn(Cr,wr,t,n);s.layers=this.layers,this.add(s);const o=new Zn(Cr,wr,t,n);o.layers=this.layers,this.add(o);const l=new Zn(Cr,wr,t,n);l.layers=this.layers,this.add(l);const c=new Zn(Cr,wr,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,a,r,s,o,l]=n;for(const c of n)this.remove(c);if(t===Di)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),s.up.set(0,0,1),s.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lc)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),s.up.set(0,0,-1),s.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,s,o,l,c,d]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,a),t.render(n,r),t.setRenderTarget(i,1,a),t.render(n,s),t.setRenderTarget(i,2,a),t.render(n,o),t.setRenderTarget(i,3,a),t.render(n,l),t.setRenderTarget(i,4,a),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,a),t.render(n,d),t.setRenderTarget(h,f,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class bx extends dn{constructor(t,n,i,a,r,s,o,l,c,d){t=t!==void 0?t:[],n=n!==void 0?n:ps,super(t,n,i,a,r,s,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Eb extends ar{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new bx(a,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Kn}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},a=new Vo(5,5,5),r=new Gi({name:"CubemapFromEquirect",uniforms:_s(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:_a});r.uniforms.tEquirect.value=n;const s=new si(a,r),o=n.minFilter;return n.minFilter===Wa&&(n.minFilter=Kn),new Mb(1,10,this).update(t,s),n.minFilter=o,s.geometry.dispose(),s.material.dispose(),this}clear(t,n,i,a){const r=t.getRenderTarget();for(let s=0;s<6;s++)t.setRenderTarget(this,s),t.clear(n,i,a);t.setRenderTarget(r)}}const hf=new V,bb=new V,Tb=new It;class Ha{constructor(t=new V(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const a=hf.subVectors(i,n).cross(bb.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(hf),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/a;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||Tb.getNormalMatrix(t),a=this.coplanarPoint(hf).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Na=new op,Al=new V;class Tx{constructor(t=new Ha,n=new Ha,i=new Ha,a=new Ha,r=new Ha,s=new Ha){this.planes=[t,n,i,a,r,s]}set(t,n,i,a,r,s){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(r),o[5].copy(s),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Di){const i=this.planes,a=t.elements,r=a[0],s=a[1],o=a[2],l=a[3],c=a[4],d=a[5],h=a[6],f=a[7],p=a[8],_=a[9],x=a[10],m=a[11],u=a[12],g=a[13],v=a[14],y=a[15];if(i[0].setComponents(l-r,f-c,m-p,y-u).normalize(),i[1].setComponents(l+r,f+c,m+p,y+u).normalize(),i[2].setComponents(l+s,f+d,m+_,y+g).normalize(),i[3].setComponents(l-s,f-d,m-_,y-g).normalize(),i[4].setComponents(l-o,f-h,m-x,y-v).normalize(),n===Di)i[5].setComponents(l+o,f+h,m+x,y+v).normalize();else if(n===Lc)i[5].setComponents(o,h,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Na.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Na.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Na)}intersectsSprite(t){return Na.center.set(0,0,0),Na.radius=.7071067811865476,Na.applyMatrix4(t.matrixWorld),this.intersectsSphere(Na)}intersectsSphere(t){const n=this.planes,i=t.center,a=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Al.x=a.normal.x>0?t.max.x:t.min.x,Al.y=a.normal.y>0?t.max.y:t.min.y,Al.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Al)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ax(){let e=null,t=!1,n=null,i=null;function a(r,s){n(r,s),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function Ab(e){const t=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,f=e.createBuffer();e.bindBuffer(l,f),e.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l._updateRange,f=l.updateRanges;if(e.bindBuffer(c,o),h.count===-1&&f.length===0&&e.bufferSubData(c,0,d),f.length!==0){for(let p=0,_=f.length;p<_;p++){const x=f[p];e.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}h.count!==-1&&(e.bufferSubData(c,h.offset*d.BYTES_PER_ELEMENT,d,h.offset,h.count),h.count=-1),l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function s(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:r,update:s}}class ko extends ur{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};const r=t/2,s=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,h=t/o,f=n/l,p=[],_=[],x=[],m=[];for(let u=0;u<d;u++){const g=u*f-s;for(let v=0;v<c;v++){const y=v*h-r;_.push(y,-g,0),x.push(0,0,1),m.push(v/o),m.push(1-u/l)}}for(let u=0;u<l;u++)for(let g=0;g<o;g++){const v=g+c*u,y=g+c*(u+1),w=g+1+c*(u+1),R=g+1+c*u;p.push(v,y,R),p.push(y,w,R)}this.setIndex(p),this.setAttribute("position",new Qa(_,3)),this.setAttribute("normal",new Qa(x,3)),this.setAttribute("uv",new Qa(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ko(t.width,t.height,t.widthSegments,t.heightSegments)}}var Rb=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cb=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Db=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ub=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Lb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nb=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ob=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pb=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ib=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fb=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Hb=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Gb=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vb=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,kb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qb=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,jb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Yb=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Zb=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Kb=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qb=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Jb=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,$b=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,eT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,nT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,iT="gl_FragColor = linearToOutputTexel( gl_FragColor );",aT=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,rT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,sT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,oT=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,cT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,dT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,pT=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,mT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,gT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vT=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_T=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ST=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,MT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ET=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,TT=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,AT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,RT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,CT=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,wT=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,DT=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,UT=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LT=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,NT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,OT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,PT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,zT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,IT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,BT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,FT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,HT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,GT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,VT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,XT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,WT=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,qT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,YT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ZT=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,KT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,QT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,JT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$T=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,tA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,nA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,iA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,aA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,rA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,lA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,cA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,uA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,dA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,hA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,pA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,mA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,gA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,vA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_A=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,SA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,MA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,EA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,TA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const AA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,RA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,CA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,DA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,UA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,NA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,OA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,PA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,FA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,HA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,GA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,kA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,WA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,jA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,YA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ZA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,QA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,JA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$A=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,t1=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,e1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,n1=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,i1=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,a1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,r1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zt={alphahash_fragment:Rb,alphahash_pars_fragment:Cb,alphamap_fragment:wb,alphamap_pars_fragment:Db,alphatest_fragment:Ub,alphatest_pars_fragment:Lb,aomap_fragment:Nb,aomap_pars_fragment:Ob,batching_pars_vertex:Pb,batching_vertex:zb,begin_vertex:Ib,beginnormal_vertex:Bb,bsdfs:Fb,iridescence_fragment:Hb,bumpmap_pars_fragment:Gb,clipping_planes_fragment:Vb,clipping_planes_pars_fragment:kb,clipping_planes_pars_vertex:Xb,clipping_planes_vertex:Wb,color_fragment:qb,color_pars_fragment:jb,color_pars_vertex:Yb,color_vertex:Zb,common:Kb,cube_uv_reflection_fragment:Qb,defaultnormal_vertex:Jb,displacementmap_pars_vertex:$b,displacementmap_vertex:tT,emissivemap_fragment:eT,emissivemap_pars_fragment:nT,colorspace_fragment:iT,colorspace_pars_fragment:aT,envmap_fragment:rT,envmap_common_pars_fragment:sT,envmap_pars_fragment:oT,envmap_pars_vertex:lT,envmap_physical_pars_fragment:xT,envmap_vertex:cT,fog_vertex:uT,fog_pars_vertex:fT,fog_fragment:dT,fog_pars_fragment:hT,gradientmap_pars_fragment:pT,lightmap_pars_fragment:mT,lights_lambert_fragment:gT,lights_lambert_pars_fragment:vT,lights_pars_begin:_T,lights_toon_fragment:yT,lights_toon_pars_fragment:ST,lights_phong_fragment:MT,lights_phong_pars_fragment:ET,lights_physical_fragment:bT,lights_physical_pars_fragment:TT,lights_fragment_begin:AT,lights_fragment_maps:RT,lights_fragment_end:CT,logdepthbuf_fragment:wT,logdepthbuf_pars_fragment:DT,logdepthbuf_pars_vertex:UT,logdepthbuf_vertex:LT,map_fragment:NT,map_pars_fragment:OT,map_particle_fragment:PT,map_particle_pars_fragment:zT,metalnessmap_fragment:IT,metalnessmap_pars_fragment:BT,morphinstance_vertex:FT,morphcolor_vertex:HT,morphnormal_vertex:GT,morphtarget_pars_vertex:VT,morphtarget_vertex:kT,normal_fragment_begin:XT,normal_fragment_maps:WT,normal_pars_fragment:qT,normal_pars_vertex:jT,normal_vertex:YT,normalmap_pars_fragment:ZT,clearcoat_normal_fragment_begin:KT,clearcoat_normal_fragment_maps:QT,clearcoat_pars_fragment:JT,iridescence_pars_fragment:$T,opaque_fragment:tA,packing:eA,premultiplied_alpha_fragment:nA,project_vertex:iA,dithering_fragment:aA,dithering_pars_fragment:rA,roughnessmap_fragment:sA,roughnessmap_pars_fragment:oA,shadowmap_pars_fragment:lA,shadowmap_pars_vertex:cA,shadowmap_vertex:uA,shadowmask_pars_fragment:fA,skinbase_vertex:dA,skinning_pars_vertex:hA,skinning_vertex:pA,skinnormal_vertex:mA,specularmap_fragment:gA,specularmap_pars_fragment:vA,tonemapping_fragment:_A,tonemapping_pars_fragment:xA,transmission_fragment:yA,transmission_pars_fragment:SA,uv_pars_fragment:MA,uv_pars_vertex:EA,uv_vertex:bA,worldpos_vertex:TA,background_vert:AA,background_frag:RA,backgroundCube_vert:CA,backgroundCube_frag:wA,cube_vert:DA,cube_frag:UA,depth_vert:LA,depth_frag:NA,distanceRGBA_vert:OA,distanceRGBA_frag:PA,equirect_vert:zA,equirect_frag:IA,linedashed_vert:BA,linedashed_frag:FA,meshbasic_vert:HA,meshbasic_frag:GA,meshlambert_vert:VA,meshlambert_frag:kA,meshmatcap_vert:XA,meshmatcap_frag:WA,meshnormal_vert:qA,meshnormal_frag:jA,meshphong_vert:YA,meshphong_frag:ZA,meshphysical_vert:KA,meshphysical_frag:QA,meshtoon_vert:JA,meshtoon_frag:$A,points_vert:t1,points_frag:e1,shadow_vert:n1,shadow_frag:i1,sprite_vert:a1,sprite_frag:r1},ot={common:{diffuse:{value:new se(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new It}},envmap:{envMap:{value:null},envMapRotation:{value:new It},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new It}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new It}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new It},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new It},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new It},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new It}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new It}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new It}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new se(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new se(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0},uvTransform:{value:new It}},sprite:{diffuse:{value:new se(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new It},alphaMap:{value:null},alphaMapTransform:{value:new It},alphaTest:{value:0}}},ei={basic:{uniforms:$e([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.fog]),vertexShader:zt.meshbasic_vert,fragmentShader:zt.meshbasic_frag},lambert:{uniforms:$e([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new se(0)}}]),vertexShader:zt.meshlambert_vert,fragmentShader:zt.meshlambert_frag},phong:{uniforms:$e([ot.common,ot.specularmap,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,ot.lights,{emissive:{value:new se(0)},specular:{value:new se(1118481)},shininess:{value:30}}]),vertexShader:zt.meshphong_vert,fragmentShader:zt.meshphong_frag},standard:{uniforms:$e([ot.common,ot.envmap,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.roughnessmap,ot.metalnessmap,ot.fog,ot.lights,{emissive:{value:new se(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag},toon:{uniforms:$e([ot.common,ot.aomap,ot.lightmap,ot.emissivemap,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.gradientmap,ot.fog,ot.lights,{emissive:{value:new se(0)}}]),vertexShader:zt.meshtoon_vert,fragmentShader:zt.meshtoon_frag},matcap:{uniforms:$e([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,ot.fog,{matcap:{value:null}}]),vertexShader:zt.meshmatcap_vert,fragmentShader:zt.meshmatcap_frag},points:{uniforms:$e([ot.points,ot.fog]),vertexShader:zt.points_vert,fragmentShader:zt.points_frag},dashed:{uniforms:$e([ot.common,ot.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:zt.linedashed_vert,fragmentShader:zt.linedashed_frag},depth:{uniforms:$e([ot.common,ot.displacementmap]),vertexShader:zt.depth_vert,fragmentShader:zt.depth_frag},normal:{uniforms:$e([ot.common,ot.bumpmap,ot.normalmap,ot.displacementmap,{opacity:{value:1}}]),vertexShader:zt.meshnormal_vert,fragmentShader:zt.meshnormal_frag},sprite:{uniforms:$e([ot.sprite,ot.fog]),vertexShader:zt.sprite_vert,fragmentShader:zt.sprite_frag},background:{uniforms:{uvTransform:{value:new It},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:zt.background_vert,fragmentShader:zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new It}},vertexShader:zt.backgroundCube_vert,fragmentShader:zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:zt.cube_vert,fragmentShader:zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:zt.equirect_vert,fragmentShader:zt.equirect_frag},distanceRGBA:{uniforms:$e([ot.common,ot.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:zt.distanceRGBA_vert,fragmentShader:zt.distanceRGBA_frag},shadow:{uniforms:$e([ot.lights,ot.fog,{color:{value:new se(0)},opacity:{value:1}}]),vertexShader:zt.shadow_vert,fragmentShader:zt.shadow_frag}};ei.physical={uniforms:$e([ei.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new It},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new It},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new It},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new It},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new It},sheen:{value:0},sheenColor:{value:new se(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new It},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new It},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new It},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new It},attenuationDistance:{value:0},attenuationColor:{value:new se(0)},specularColor:{value:new se(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new It},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new It},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new It}}]),vertexShader:zt.meshphysical_vert,fragmentShader:zt.meshphysical_frag};const Rl={r:0,b:0,g:0},Oa=new Hi,s1=new Pe;function o1(e,t,n,i,a,r,s){const o=new se(0);let l=r===!0?0:1,c,d,h=null,f=0,p=null;function _(g){let v=g.isScene===!0?g.background:null;return v&&v.isTexture&&(v=(g.backgroundBlurriness>0?n:t).get(v)),v}function x(g){let v=!1;const y=_(g);y===null?u(o,l):y&&y.isColor&&(u(y,1),v=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?i.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,s),(e.autoClear||v)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function m(g,v){const y=_(v);y&&(y.isCubeTexture||y.mapping===$c)?(d===void 0&&(d=new si(new Vo(1,1,1),new Gi({name:"BackgroundCubeMaterial",uniforms:_s(ei.backgroundCube.uniforms),vertexShader:ei.backgroundCube.vertexShader,fragmentShader:ei.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(w,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(d)),Oa.copy(v.backgroundRotation),Oa.x*=-1,Oa.y*=-1,Oa.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Oa.y*=-1,Oa.z*=-1),d.material.uniforms.envMap.value=y,d.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(s1.makeRotationFromEuler(Oa)),d.material.toneMapped=ie.getTransfer(y.colorSpace)!==he,(h!==y||f!==y.version||p!==e.toneMapping)&&(d.material.needsUpdate=!0,h=y,f=y.version,p=e.toneMapping),d.layers.enableAll(),g.unshift(d,d.geometry,d.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new si(new ko(2,2),new Gi({name:"BackgroundMaterial",uniforms:_s(ei.background.uniforms),vertexShader:ei.background.vertexShader,fragmentShader:ei.background.fragmentShader,side:ba,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ie.getTransfer(y.colorSpace)!==he,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||f!==y.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,h=y,f=y.version,p=e.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function u(g,v){g.getRGB(Rl,Mx(e)),i.buffers.color.setClear(Rl.r,Rl.g,Rl.b,v,s)}return{getClearColor:function(){return o},setClearColor:function(g,v=1){o.set(g),l=v,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,u(o,l)},render:x,addToRenderList:m}}function l1(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=f(null);let r=a,s=!1;function o(S,D,W,k,Z){let j=!1;const N=h(k,W,D);r!==N&&(r=N,c(r.object)),j=p(S,k,W,Z),j&&_(S,k,W,Z),Z!==null&&t.update(Z,e.ELEMENT_ARRAY_BUFFER),(j||s)&&(s=!1,y(S,D,W,k),Z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function l(){return e.createVertexArray()}function c(S){return e.bindVertexArray(S)}function d(S){return e.deleteVertexArray(S)}function h(S,D,W){const k=W.wireframe===!0;let Z=i[S.id];Z===void 0&&(Z={},i[S.id]=Z);let j=Z[D.id];j===void 0&&(j={},Z[D.id]=j);let N=j[k];return N===void 0&&(N=f(l()),j[k]=N),N}function f(S){const D=[],W=[],k=[];for(let Z=0;Z<n;Z++)D[Z]=0,W[Z]=0,k[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:k,object:S,attributes:{},index:null}}function p(S,D,W,k){const Z=r.attributes,j=D.attributes;let N=0;const H=W.getAttributes();for(const I in H)if(H[I].location>=0){const nt=Z[I];let dt=j[I];if(dt===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(dt=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(dt=S.instanceColor)),nt===void 0||nt.attribute!==dt||dt&&nt.data!==dt.data)return!0;N++}return r.attributesNum!==N||r.index!==k}function _(S,D,W,k){const Z={},j=D.attributes;let N=0;const H=W.getAttributes();for(const I in H)if(H[I].location>=0){let nt=j[I];nt===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(nt=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(nt=S.instanceColor));const dt={};dt.attribute=nt,nt&&nt.data&&(dt.data=nt.data),Z[I]=dt,N++}r.attributes=Z,r.attributesNum=N,r.index=k}function x(){const S=r.newAttributes;for(let D=0,W=S.length;D<W;D++)S[D]=0}function m(S){u(S,0)}function u(S,D){const W=r.newAttributes,k=r.enabledAttributes,Z=r.attributeDivisors;W[S]=1,k[S]===0&&(e.enableVertexAttribArray(S),k[S]=1),Z[S]!==D&&(e.vertexAttribDivisor(S,D),Z[S]=D)}function g(){const S=r.newAttributes,D=r.enabledAttributes;for(let W=0,k=D.length;W<k;W++)D[W]!==S[W]&&(e.disableVertexAttribArray(W),D[W]=0)}function v(S,D,W,k,Z,j,N){N===!0?e.vertexAttribIPointer(S,D,W,Z,j):e.vertexAttribPointer(S,D,W,k,Z,j)}function y(S,D,W,k){x();const Z=k.attributes,j=W.getAttributes(),N=D.defaultAttributeValues;for(const H in j){const I=j[H];if(I.location>=0){let tt=Z[H];if(tt===void 0&&(H==="instanceMatrix"&&S.instanceMatrix&&(tt=S.instanceMatrix),H==="instanceColor"&&S.instanceColor&&(tt=S.instanceColor)),tt!==void 0){const nt=tt.normalized,dt=tt.itemSize,Lt=t.get(tt);if(Lt===void 0)continue;const Xt=Lt.buffer,X=Lt.type,$=Lt.bytesPerElement,pt=X===e.INT||X===e.UNSIGNED_INT||tt.gpuType===tp;if(tt.isInterleavedBufferAttribute){const ut=tt.data,wt=ut.stride,Ot=tt.offset;if(ut.isInstancedInterleavedBuffer){for(let Ft=0;Ft<I.locationSize;Ft++)u(I.location+Ft,ut.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ut.meshPerAttribute*ut.count)}else for(let Ft=0;Ft<I.locationSize;Ft++)m(I.location+Ft);e.bindBuffer(e.ARRAY_BUFFER,Xt);for(let Ft=0;Ft<I.locationSize;Ft++)v(I.location+Ft,dt/I.locationSize,X,nt,wt*$,(Ot+dt/I.locationSize*Ft)*$,pt)}else{if(tt.isInstancedBufferAttribute){for(let ut=0;ut<I.locationSize;ut++)u(I.location+ut,tt.meshPerAttribute);S.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let ut=0;ut<I.locationSize;ut++)m(I.location+ut);e.bindBuffer(e.ARRAY_BUFFER,Xt);for(let ut=0;ut<I.locationSize;ut++)v(I.location+ut,dt/I.locationSize,X,nt,dt*$,dt/I.locationSize*ut*$,pt)}}else if(N!==void 0){const nt=N[H];if(nt!==void 0)switch(nt.length){case 2:e.vertexAttrib2fv(I.location,nt);break;case 3:e.vertexAttrib3fv(I.location,nt);break;case 4:e.vertexAttrib4fv(I.location,nt);break;default:e.vertexAttrib1fv(I.location,nt)}}}}g()}function w(){L();for(const S in i){const D=i[S];for(const W in D){const k=D[W];for(const Z in k)d(k[Z].object),delete k[Z];delete D[W]}delete i[S]}}function R(S){if(i[S.id]===void 0)return;const D=i[S.id];for(const W in D){const k=D[W];for(const Z in k)d(k[Z].object),delete k[Z];delete D[W]}delete i[S.id]}function T(S){for(const D in i){const W=i[D];if(W[S.id]===void 0)continue;const k=W[S.id];for(const Z in k)d(k[Z].object),delete k[Z];delete W[S.id]}}function L(){b(),s=!0,r!==a&&(r=a,c(r.object))}function b(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:L,resetDefaultState:b,dispose:w,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:x,enableAttribute:m,disableUnusedAttributes:g}}function c1(e,t,n){let i;function a(c){i=c}function r(c,d){e.drawArrays(i,c,d),n.update(d,i,1)}function s(c,d,h){h!==0&&(e.drawArraysInstanced(i,c,d,h),n.update(d,i,h))}function o(c,d,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let _=0;_<h;_++)p+=d[_];n.update(p,i,1)}function l(c,d,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<c.length;_++)s(c[_],d[_],f[_]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,f,0,h);let _=0;for(let x=0;x<h;x++)_+=d[x];for(let x=0;x<f.length;x++)n.update(_,i,f[x])}}this.setMode=a,this.render=r,this.renderInstances=s,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function u1(e,t,n,i){let a;function r(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function s(R){return!(R!==Qn&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const T=R===Bo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Fi&&i.convert(R)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==wi&&!T)}function l(R){if(R==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),p=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=e.getParameter(e.MAX_TEXTURE_SIZE),x=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),m=e.getParameter(e.MAX_VERTEX_ATTRIBS),u=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),g=e.getParameter(e.MAX_VARYING_VECTORS),v=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),y=p>0,w=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:s,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:_,maxCubemapSize:x,maxAttributes:m,maxVertexUniforms:u,maxVaryings:g,maxFragmentUniforms:v,vertexTextures:y,maxSamples:w}}function f1(e){const t=this;let n=null,i=0,a=!1,r=!1;const s=new Ha,o=new It,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||a;return a=f,i=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){n=d(h,f,0)},this.setState=function(h,f,p){const _=h.clippingPlanes,x=h.clipIntersection,m=h.clipShadows,u=e.get(h);if(!a||_===null||_.length===0||r&&!m)r?d(null):c();else{const g=r?0:i,v=g*4;let y=u.clippingState||null;l.value=y,y=d(_,f,v,p);for(let w=0;w!==v;++w)y[w]=n[w];u.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=g}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,f,p,_){const x=h!==null?h.length:0;let m=null;if(x!==0){if(m=l.value,_!==!0||m===null){const u=p+x*4,g=f.matrixWorldInverse;o.getNormalMatrix(g),(m===null||m.length<u)&&(m=new Float32Array(u));for(let v=0,y=p;v!==x;++v,y+=4)s.copy(h[v]).applyMatrix4(g,o),s.normal.toArray(m,y),m[y+3]=s.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function d1(e){let t=new WeakMap;function n(s,o){return o===xd?s.mapping=ps:o===yd&&(s.mapping=ms),s}function i(s){if(s&&s.isTexture){const o=s.mapping;if(o===xd||o===yd)if(t.has(s)){const l=t.get(s).texture;return n(l,s.mapping)}else{const l=s.image;if(l&&l.height>0){const c=new Eb(l.height);return c.fromEquirectangularTexture(e,s),t.set(s,c),s.addEventListener("dispose",a),n(c.texture,s.mapping)}else return null}}return s}function a(s){const o=s.target;o.removeEventListener("dispose",a);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}class Rx extends Ex{constructor(t=-1,n=1,i=1,a=-1,r=.1,s=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=r,this.far=s,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,r,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=r,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let r=i-t,s=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,s=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,s,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const qr=4,yg=[.125,.215,.35,.446,.526,.582],ka=20,pf=new Rx,Sg=new se;let mf=null,gf=0,vf=0,_f=!1;const Ga=(1+Math.sqrt(5))/2,Dr=1/Ga,Mg=[new V(-Ga,Dr,0),new V(Ga,Dr,0),new V(-Dr,0,Ga),new V(Dr,0,Ga),new V(0,Ga,-Dr),new V(0,Ga,Dr),new V(-1,1,-1),new V(1,1,-1),new V(-1,1,1),new V(1,1,1)];class Eg{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,a=100){mf=this._renderer.getRenderTarget(),gf=this._renderer.getActiveCubeFace(),vf=this._renderer.getActiveMipmapLevel(),_f=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,a,r),n>0&&this._blur(r,0,0,n),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ag(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tg(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(mf,gf,vf),this._renderer.xr.enabled=_f,t.scissorTest=!1,Cl(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ps||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),mf=this._renderer.getRenderTarget(),gf=this._renderer.getActiveCubeFace(),vf=this._renderer.getActiveMipmapLevel(),_f=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:Bo,format:Qn,colorSpace:Ra,depthBuffer:!1},a=bg(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bg(t,n,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=h1(r)),this._blurMaterial=p1(r,t,n)}return a}_compileMaterial(t){const n=new si(this._lodPlanes[0],t);this._renderer.compile(n,pf)}_sceneToCubeUV(t,n,i,a){const o=new Zn(90,1,n,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Sg),d.toneMapping=xa,d.autoClear=!1;const p=new xx({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),_=new si(new Vo,p);let x=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,x=!0):(p.color.copy(Sg),x=!0);for(let u=0;u<6;u++){const g=u%3;g===0?(o.up.set(0,l[u],0),o.lookAt(c[u],0,0)):g===1?(o.up.set(0,0,l[u]),o.lookAt(0,c[u],0)):(o.up.set(0,l[u],0),o.lookAt(0,0,c[u]));const v=this._cubeSize;Cl(a,g*v,u>2?v:0,v,v),d.setRenderTarget(a),x&&d.render(_,o),d.render(t,o)}_.geometry.dispose(),_.material.dispose(),d.toneMapping=f,d.autoClear=h,t.background=m}_textureToCubeUV(t,n){const i=this._renderer,a=t.mapping===ps||t.mapping===ms;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ag()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tg());const r=a?this._cubemapMaterial:this._equirectMaterial,s=new si(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const l=this._cubeSize;Cl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(s,pf)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodPlanes.length;for(let r=1;r<a;r++){const s=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Mg[(a-r-1)%Mg.length];this._blur(t,r-1,r,s,o)}n.autoClear=i}_blur(t,n,i,a,r){const s=this._pingPongRenderTarget;this._halfBlur(t,s,n,i,a,"latitudinal",r),this._halfBlur(s,t,i,i,a,"longitudinal",r)}_halfBlur(t,n,i,a,r,s,o){const l=this._renderer,c=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new si(this._lodPlanes[a],c),f=c.uniforms,p=this._sizeLods[i]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ka-1),x=r/_,m=isFinite(r)?1+Math.floor(d*x):ka;m>ka&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ka}`);const u=[];let g=0;for(let T=0;T<ka;++T){const L=T/x,b=Math.exp(-L*L/2);u.push(b),T===0?g+=b:T<m&&(g+=2*b)}for(let T=0;T<u.length;T++)u[T]=u[T]/g;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=u,f.latitudinal.value=s==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-i;const y=this._sizeLods[a],w=3*y*(a>v-qr?a-v+qr:0),R=4*(this._cubeSize-y);Cl(n,w,R,3*y,2*y),l.setRenderTarget(n),l.render(h,pf)}}function h1(e){const t=[],n=[],i=[];let a=e;const r=e-qr+1+yg.length;for(let s=0;s<r;s++){const o=Math.pow(2,a);n.push(o);let l=1/o;s>e-qr?l=yg[s-e+qr-1]:s===0&&(l=0),i.push(l);const c=1/(o-2),d=-c,h=1+c,f=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,_=6,x=3,m=2,u=1,g=new Float32Array(x*_*p),v=new Float32Array(m*_*p),y=new Float32Array(u*_*p);for(let R=0;R<p;R++){const T=R%3*2/3-1,L=R>2?0:-1,b=[T,L,0,T+2/3,L,0,T+2/3,L+1,0,T,L,0,T+2/3,L+1,0,T,L+1,0];g.set(b,x*_*R),v.set(f,m*_*R);const S=[R,R,R,R,R,R];y.set(S,u*_*R)}const w=new ur;w.setAttribute("position",new li(g,x)),w.setAttribute("uv",new li(v,m)),w.setAttribute("faceIndex",new li(y,u)),t.push(w),a>qr&&a--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function bg(e,t,n){const i=new ar(e,t,n);return i.texture.mapping=$c,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Cl(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function p1(e,t,n){const i=new Float32Array(ka),a=new V(0,1,0);return new Gi({name:"SphericalGaussianBlur",defines:{n:ka,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:_a,depthTest:!1,depthWrite:!1})}function Tg(){return new Gi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:_a,depthTest:!1,depthWrite:!1})}function Ag(){return new Gi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:_a,depthTest:!1,depthWrite:!1})}function lp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function m1(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===xd||l===yd,d=l===ps||l===ms;if(c||d){let h=t.get(o);const f=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return n===null&&(n=new Eg(e)),h=c?n.fromEquirectangular(o,h):n.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),h.texture;if(h!==void 0)return h.texture;{const p=o.image;return c&&p&&p.height>0||d&&p&&a(p)?(n===null&&(n=new Eg(e)),h=c?n.fromEquirectangular(o):n.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,t.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function a(o){let l=0;const c=6;for(let d=0;d<c;d++)o[d]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function s(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:s}}function g1(e){const t={};function n(i){if(t[i]!==void 0)return t[i];let a;switch(i){case"WEBGL_depth_texture":a=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":a=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":a=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":a=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:a=e.getExtension(i)}return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&lo("THREE.WebGLRenderer: "+i+" extension not supported."),a}}}function v1(e,t,n,i){const a={},r=new WeakMap;function s(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const _ in f.attributes)t.remove(f.attributes[_]);for(const _ in f.morphAttributes){const x=f.morphAttributes[_];for(let m=0,u=x.length;m<u;m++)t.remove(x[m])}f.removeEventListener("dispose",s),delete a[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,n.memory.geometries--}function o(h,f){return a[f.id]===!0||(f.addEventListener("dispose",s),a[f.id]=!0,n.memory.geometries++),f}function l(h){const f=h.attributes;for(const _ in f)t.update(f[_],e.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const x=p[_];for(let m=0,u=x.length;m<u;m++)t.update(x[m],e.ARRAY_BUFFER)}}function c(h){const f=[],p=h.index,_=h.attributes.position;let x=0;if(p!==null){const g=p.array;x=p.version;for(let v=0,y=g.length;v<y;v+=3){const w=g[v+0],R=g[v+1],T=g[v+2];f.push(w,R,R,T,T,w)}}else if(_!==void 0){const g=_.array;x=_.version;for(let v=0,y=g.length/3-1;v<y;v+=3){const w=v+0,R=v+1,T=v+2;f.push(w,R,R,T,T,w)}}else return;const m=new(px(f)?Sx:yx)(f,1);m.version=x;const u=r.get(h);u&&t.remove(u),r.set(h,m)}function d(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function _1(e,t,n){let i;function a(f){i=f}let r,s;function o(f){r=f.type,s=f.bytesPerElement}function l(f,p){e.drawElements(i,p,r,f*s),n.update(p,i,1)}function c(f,p,_){_!==0&&(e.drawElementsInstanced(i,p,r,f*s,_),n.update(p,i,_))}function d(f,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,_);let m=0;for(let u=0;u<_;u++)m+=p[u];n.update(m,i,1)}function h(f,p,_,x){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let u=0;u<f.length;u++)c(f[u]/s,p[u],x[u]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,x,0,_);let u=0;for(let g=0;g<_;g++)u+=p[g];for(let g=0;g<x.length;g++)n.update(u,i,x[g])}}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function x1(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,s,o){switch(n.calls++,s){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function y1(e,t,n){const i=new WeakMap,a=new Ve;function r(s,o,l){const c=s.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let f=i.get(o);if(f===void 0||f.count!==h){let S=function(){L.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var p=S;f!==void 0&&f.texture.dispose();const _=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,u=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],v=o.morphAttributes.color||[];let y=0;_===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let w=o.attributes.position.count*y,R=1;w>t.maxTextureSize&&(R=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const T=new Float32Array(w*R*4*h),L=new gx(T,w,R,h);L.type=wi,L.needsUpdate=!0;const b=y*4;for(let D=0;D<h;D++){const W=u[D],k=g[D],Z=v[D],j=w*R*4*D;for(let N=0;N<W.count;N++){const H=N*b;_===!0&&(a.fromBufferAttribute(W,N),T[j+H+0]=a.x,T[j+H+1]=a.y,T[j+H+2]=a.z,T[j+H+3]=0),x===!0&&(a.fromBufferAttribute(k,N),T[j+H+4]=a.x,T[j+H+5]=a.y,T[j+H+6]=a.z,T[j+H+7]=0),m===!0&&(a.fromBufferAttribute(Z,N),T[j+H+8]=a.x,T[j+H+9]=a.y,T[j+H+10]=a.z,T[j+H+11]=Z.itemSize===4?a.w:1)}}f={count:h,texture:L,size:new Yt(w,R)},i.set(o,f),o.addEventListener("dispose",S)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",s.morphTexture,n);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const x=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(e,"morphTargetBaseInfluence",x),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",f.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",f.size)}return{update:r}}function S1(e,t,n,i){let a=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,h=t.get(l,d);if(a.get(h)!==c&&(t.update(h),a.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),a.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),a.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;a.get(f)!==c&&(f.update(),a.set(f,c))}return h}function s(){a=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:r,dispose:s}}class Cx extends dn{constructor(t,n,i,a,r,s,o,l,c,d=es){if(d!==es&&d!==vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&d===es&&(i=ir),i===void 0&&d===vs&&(i=gs),super(null,a,r,s,o,l,d,i,c),this.isDepthTexture=!0,this.image={width:t,height:n},this.magFilter=o!==void 0?o:Fn,this.minFilter=l!==void 0?l:Fn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}const wx=new dn,Rg=new Cx(1,1),Dx=new gx,Ux=new sb,Lx=new bx,Cg=[],wg=[],Dg=new Float32Array(16),Ug=new Float32Array(9),Lg=new Float32Array(4);function Cs(e,t,n){const i=e[0];if(i<=0||i>0)return e;const a=t*n;let r=Cg[a];if(r===void 0&&(r=new Float32Array(a),Cg[a]=r),t!==0){i.toArray(r,0);for(let s=1,o=0;s!==t;++s)o+=n,e[s].toArray(r,o)}return r}function Ie(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Be(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function nu(e,t){let n=wg[t];n===void 0&&(n=new Int32Array(t),wg[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function M1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function E1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ie(n,t))return;e.uniform2fv(this.addr,t),Be(n,t)}}function b1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ie(n,t))return;e.uniform3fv(this.addr,t),Be(n,t)}}function T1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ie(n,t))return;e.uniform4fv(this.addr,t),Be(n,t)}}function A1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ie(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Be(n,t)}else{if(Ie(n,i))return;Lg.set(i),e.uniformMatrix2fv(this.addr,!1,Lg),Be(n,i)}}function R1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ie(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Be(n,t)}else{if(Ie(n,i))return;Ug.set(i),e.uniformMatrix3fv(this.addr,!1,Ug),Be(n,i)}}function C1(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ie(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Be(n,t)}else{if(Ie(n,i))return;Dg.set(i),e.uniformMatrix4fv(this.addr,!1,Dg),Be(n,i)}}function w1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function D1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ie(n,t))return;e.uniform2iv(this.addr,t),Be(n,t)}}function U1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ie(n,t))return;e.uniform3iv(this.addr,t),Be(n,t)}}function L1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ie(n,t))return;e.uniform4iv(this.addr,t),Be(n,t)}}function N1(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function O1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ie(n,t))return;e.uniform2uiv(this.addr,t),Be(n,t)}}function P1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ie(n,t))return;e.uniform3uiv(this.addr,t),Be(n,t)}}function z1(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ie(n,t))return;e.uniform4uiv(this.addr,t),Be(n,t)}}function I1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let r;this.type===e.SAMPLER_2D_SHADOW?(Rg.compareFunction=hx,r=Rg):r=wx,n.setTexture2D(t||r,a)}function B1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||Ux,a)}function F1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||Lx,a)}function H1(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||Dx,a)}function G1(e){switch(e){case 5126:return M1;case 35664:return E1;case 35665:return b1;case 35666:return T1;case 35674:return A1;case 35675:return R1;case 35676:return C1;case 5124:case 35670:return w1;case 35667:case 35671:return D1;case 35668:case 35672:return U1;case 35669:case 35673:return L1;case 5125:return N1;case 36294:return O1;case 36295:return P1;case 36296:return z1;case 35678:case 36198:case 36298:case 36306:case 35682:return I1;case 35679:case 36299:case 36307:return B1;case 35680:case 36300:case 36308:case 36293:return F1;case 36289:case 36303:case 36311:case 36292:return H1}}function V1(e,t){e.uniform1fv(this.addr,t)}function k1(e,t){const n=Cs(t,this.size,2);e.uniform2fv(this.addr,n)}function X1(e,t){const n=Cs(t,this.size,3);e.uniform3fv(this.addr,n)}function W1(e,t){const n=Cs(t,this.size,4);e.uniform4fv(this.addr,n)}function q1(e,t){const n=Cs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function j1(e,t){const n=Cs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Y1(e,t){const n=Cs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Z1(e,t){e.uniform1iv(this.addr,t)}function K1(e,t){e.uniform2iv(this.addr,t)}function Q1(e,t){e.uniform3iv(this.addr,t)}function J1(e,t){e.uniform4iv(this.addr,t)}function $1(e,t){e.uniform1uiv(this.addr,t)}function t2(e,t){e.uniform2uiv(this.addr,t)}function e2(e,t){e.uniform3uiv(this.addr,t)}function n2(e,t){e.uniform4uiv(this.addr,t)}function i2(e,t,n){const i=this.cache,a=t.length,r=nu(n,a);Ie(i,r)||(e.uniform1iv(this.addr,r),Be(i,r));for(let s=0;s!==a;++s)n.setTexture2D(t[s]||wx,r[s])}function a2(e,t,n){const i=this.cache,a=t.length,r=nu(n,a);Ie(i,r)||(e.uniform1iv(this.addr,r),Be(i,r));for(let s=0;s!==a;++s)n.setTexture3D(t[s]||Ux,r[s])}function r2(e,t,n){const i=this.cache,a=t.length,r=nu(n,a);Ie(i,r)||(e.uniform1iv(this.addr,r),Be(i,r));for(let s=0;s!==a;++s)n.setTextureCube(t[s]||Lx,r[s])}function s2(e,t,n){const i=this.cache,a=t.length,r=nu(n,a);Ie(i,r)||(e.uniform1iv(this.addr,r),Be(i,r));for(let s=0;s!==a;++s)n.setTexture2DArray(t[s]||Dx,r[s])}function o2(e){switch(e){case 5126:return V1;case 35664:return k1;case 35665:return X1;case 35666:return W1;case 35674:return q1;case 35675:return j1;case 35676:return Y1;case 5124:case 35670:return Z1;case 35667:case 35671:return K1;case 35668:case 35672:return Q1;case 35669:case 35673:return J1;case 5125:return $1;case 36294:return t2;case 36295:return e2;case 36296:return n2;case 35678:case 36198:case 36298:case 36306:case 35682:return i2;case 35679:case 36299:case 36307:return a2;case 35680:case 36300:case 36308:case 36293:return r2;case 36289:case 36303:case 36311:case 36292:return s2}}class l2{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=G1(n.type)}}class c2{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=o2(n.type)}}class u2{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const a=this.seq;for(let r=0,s=a.length;r!==s;++r){const o=a[r];o.setValue(t,n[o.id],i)}}}const xf=/(\w+)(\])?(\[|\.)?/g;function Ng(e,t){e.seq.push(t),e.map[t.id]=t}function f2(e,t,n){const i=e.name,a=i.length;for(xf.lastIndex=0;;){const r=xf.exec(i),s=xf.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&s+2===a){Ng(n,c===void 0?new l2(o,e,t):new c2(o,e,t));break}else{let h=n.map[o];h===void 0&&(h=new u2(o),Ng(n,h)),n=h}}}class Jl{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const r=t.getActiveUniform(n,a),s=t.getUniformLocation(n,r.name);f2(r,s,this)}}setValue(t,n,i,a){const r=this.map[n];r!==void 0&&r.setValue(t,i,a)}setOptional(t,n,i){const a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let r=0,s=n.length;r!==s;++r){const o=n[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){const i=[];for(let a=0,r=t.length;a!==r;++a){const s=t[a];s.id in n&&i.push(s)}return i}}function Og(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const d2=37297;let h2=0;function p2(e,t){const n=e.split(`
`),i=[],a=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let s=a;s<r;s++){const o=s+1;i.push(`${o===t?">":" "} ${o}: ${n[s]}`)}return i.join(`
`)}function m2(e){const t=ie.getPrimaries(ie.workingColorSpace),n=ie.getPrimaries(e);let i;switch(t===n?i="":t===Uc&&n===Dc?i="LinearDisplayP3ToLinearSRGB":t===Dc&&n===Uc&&(i="LinearSRGBToLinearDisplayP3"),e){case Ra:case tu:return[i,"LinearTransferOETF"];case ti:case sp:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",e),[i,"LinearTransferOETF"]}}function Pg(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),a=e.getShaderInfoLog(t).trim();if(i&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const s=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+p2(e.getShaderSource(t),s)}else return a}function g2(e,t){const n=m2(t);return`vec4 ${e}( vec4 value ) { return ${n[0]}( ${n[1]}( value ) ); }`}function v2(e,t){let n;switch(t){case NE:n="Linear";break;case OE:n="Reinhard";break;case PE:n="OptimizedCineon";break;case zE:n="ACESFilmic";break;case BE:n="AgX";break;case FE:n="Neutral";break;case IE:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const wl=new V;function _2(){ie.getLuminanceCoefficients(wl);const e=wl.x.toFixed(4),t=wl.y.toFixed(4),n=wl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x2(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(js).join(`
`)}function y2(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function S2(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const r=e.getActiveAttrib(t,a),s=r.name;let o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[s]={type:r.type,location:e.getAttribLocation(t,s),locationSize:o}}return n}function js(e){return e!==""}function zg(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ig(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const M2=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kd(e){return e.replace(M2,b2)}const E2=new Map;function b2(e,t){let n=zt[t];if(n===void 0){const i=E2.get(t);if(i!==void 0)n=zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Kd(n)}const T2=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bg(e){return e.replace(T2,A2)}function A2(e,t,n,i){let a="";for(let r=parseInt(t);r<parseInt(n);r++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return a}function Fg(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function R2(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===tx?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===rE?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===Mi&&(t="SHADOWMAP_TYPE_VSM"),t}function C2(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case ps:case ms:t="ENVMAP_TYPE_CUBE";break;case $c:t="ENVMAP_TYPE_CUBE_UV";break}return t}function w2(e){let t="ENVMAP_MODE_REFLECTION";if(e.envMap)switch(e.envMapMode){case ms:t="ENVMAP_MODE_REFRACTION";break}return t}function D2(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case ex:t="ENVMAP_BLENDING_MULTIPLY";break;case UE:t="ENVMAP_BLENDING_MIX";break;case LE:t="ENVMAP_BLENDING_ADD";break}return t}function U2(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function L2(e,t,n,i){const a=e.getContext(),r=n.defines;let s=n.vertexShader,o=n.fragmentShader;const l=R2(n),c=C2(n),d=w2(n),h=D2(n),f=U2(n),p=x2(n),_=y2(r),x=a.createProgram();let m,u,g=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(js).join(`
`),m.length>0&&(m+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(js).join(`
`),u.length>0&&(u+=`
`)):(m=[Fg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),u=[Fg(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==xa?"#define TONE_MAPPING":"",n.toneMapping!==xa?zt.tonemapping_pars_fragment:"",n.toneMapping!==xa?v2("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",zt.colorspace_pars_fragment,g2("linearToOutputTexel",n.outputColorSpace),_2(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(js).join(`
`)),s=Kd(s),s=zg(s,n),s=Ig(s,n),o=Kd(o),o=zg(o,n),o=Ig(o,n),s=Bg(s),o=Bg(o),n.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,u=["#define varying in",n.glslVersion===tg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===tg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const v=g+m+s,y=g+u+o,w=Og(a,a.VERTEX_SHADER,v),R=Og(a,a.FRAGMENT_SHADER,y);a.attachShader(x,w),a.attachShader(x,R),n.index0AttributeName!==void 0?a.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&a.bindAttribLocation(x,0,"position"),a.linkProgram(x);function T(D){if(e.debug.checkShaderErrors){const W=a.getProgramInfoLog(x).trim(),k=a.getShaderInfoLog(w).trim(),Z=a.getShaderInfoLog(R).trim();let j=!0,N=!0;if(a.getProgramParameter(x,a.LINK_STATUS)===!1)if(j=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,x,w,R);else{const H=Pg(a,w,"vertex"),I=Pg(a,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(x,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+H+`
`+I)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(k===""||Z==="")&&(N=!1);N&&(D.diagnostics={runnable:j,programLog:W,vertexShader:{log:k,prefix:m},fragmentShader:{log:Z,prefix:u}})}a.deleteShader(w),a.deleteShader(R),L=new Jl(a,x),b=S2(a,x)}let L;this.getUniforms=function(){return L===void 0&&T(this),L};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let S=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=a.getProgramParameter(x,d2)),S},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=h2++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=R,this}let N2=0;class O2{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,a=this._getShaderStage(n),r=this._getShaderStage(i),s=this._getShaderCacheForMaterial(t);return s.has(a)===!1&&(s.add(a),a.usedTimes++),s.has(r)===!1&&(s.add(r),r.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new P2(t),n.set(t,i)),i}}class P2{constructor(t){this.id=N2++,this.code=t,this.usedTimes=0}}function z2(e,t,n,i,a,r,s){const o=new vx,l=new O2,c=new Set,d=[],h=a.logarithmicDepthBuffer,f=a.vertexTextures;let p=a.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,D,W,k){const Z=W.fog,j=k.geometry,N=b.isMeshStandardMaterial?W.environment:null,H=(b.isMeshStandardMaterial?n:t).get(b.envMap||N),I=H&&H.mapping===$c?H.image.height:null,tt=_[b.type];b.precision!==null&&(p=a.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));const nt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,dt=nt!==void 0?nt.length:0;let Lt=0;j.morphAttributes.position!==void 0&&(Lt=1),j.morphAttributes.normal!==void 0&&(Lt=2),j.morphAttributes.color!==void 0&&(Lt=3);let Xt,X,$,pt;if(tt){const $t=ei[tt];Xt=$t.vertexShader,X=$t.fragmentShader}else Xt=b.vertexShader,X=b.fragmentShader,l.update(b),$=l.getVertexShaderID(b),pt=l.getFragmentShaderID(b);const ut=e.getRenderTarget(),wt=k.isInstancedMesh===!0,Ot=k.isBatchedMesh===!0,Ft=!!b.map,ue=!!b.matcap,C=!!H,xe=!!b.aoMap,Jt=!!b.lightMap,Zt=!!b.bumpMap,xt=!!b.normalMap,ve=!!b.displacementMap,At=!!b.emissiveMap,_t=!!b.metalnessMap,A=!!b.roughnessMap,M=b.anisotropy>0,G=b.clearcoat>0,J=b.dispersion>0,et=b.iridescence>0,Q=b.sheen>0,St=b.transmission>0,lt=M&&!!b.anisotropyMap,ht=G&&!!b.clearcoatMap,Pt=G&&!!b.clearcoatNormalMap,it=G&&!!b.clearcoatRoughnessMap,ft=et&&!!b.iridescenceMap,qt=et&&!!b.iridescenceThicknessMap,Ct=Q&&!!b.sheenColorMap,mt=Q&&!!b.sheenRoughnessMap,Dt=!!b.specularMap,Ht=!!b.specularColorMap,ye=!!b.specularIntensityMap,O=St&&!!b.transmissionMap,at=St&&!!b.thicknessMap,Y=!!b.gradientMap,K=!!b.alphaMap,st=b.alphaTest>0,bt=!!b.alphaHash,jt=!!b.extensions;let Re=xa;b.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(Re=e.toneMapping);const Xe={shaderID:tt,shaderType:b.type,shaderName:b.name,vertexShader:Xt,fragmentShader:X,defines:b.defines,customVertexShaderID:$,customFragmentShaderID:pt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:Ot,batchingColor:Ot&&k._colorsTexture!==null,instancing:wt,instancingColor:wt&&k.instanceColor!==null,instancingMorph:wt&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ut===null?e.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:Ra,alphaToCoverage:!!b.alphaToCoverage,map:Ft,matcap:ue,envMap:C,envMapMode:C&&H.mapping,envMapCubeUVHeight:I,aoMap:xe,lightMap:Jt,bumpMap:Zt,normalMap:xt,displacementMap:f&&ve,emissiveMap:At,normalMapObjectSpace:xt&&b.normalMapType===XE,normalMapTangentSpace:xt&&b.normalMapType===kE,metalnessMap:_t,roughnessMap:A,anisotropy:M,anisotropyMap:lt,clearcoat:G,clearcoatMap:ht,clearcoatNormalMap:Pt,clearcoatRoughnessMap:it,dispersion:J,iridescence:et,iridescenceMap:ft,iridescenceThicknessMap:qt,sheen:Q,sheenColorMap:Ct,sheenRoughnessMap:mt,specularMap:Dt,specularColorMap:Ht,specularIntensityMap:ye,transmission:St,transmissionMap:O,thicknessMap:at,gradientMap:Y,opaque:b.transparent===!1&&b.blending===ts&&b.alphaToCoverage===!1,alphaMap:K,alphaTest:st,alphaHash:bt,combine:b.combine,mapUv:Ft&&x(b.map.channel),aoMapUv:xe&&x(b.aoMap.channel),lightMapUv:Jt&&x(b.lightMap.channel),bumpMapUv:Zt&&x(b.bumpMap.channel),normalMapUv:xt&&x(b.normalMap.channel),displacementMapUv:ve&&x(b.displacementMap.channel),emissiveMapUv:At&&x(b.emissiveMap.channel),metalnessMapUv:_t&&x(b.metalnessMap.channel),roughnessMapUv:A&&x(b.roughnessMap.channel),anisotropyMapUv:lt&&x(b.anisotropyMap.channel),clearcoatMapUv:ht&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:Pt&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:it&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:qt&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:Ct&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:mt&&x(b.sheenRoughnessMap.channel),specularMapUv:Dt&&x(b.specularMap.channel),specularColorMapUv:Ht&&x(b.specularColorMap.channel),specularIntensityMapUv:ye&&x(b.specularIntensityMap.channel),transmissionMapUv:O&&x(b.transmissionMap.channel),thicknessMapUv:at&&x(b.thicknessMap.channel),alphaMapUv:K&&x(b.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(xt||M),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!j.attributes.uv&&(Ft||K),fog:!!Z,useFog:b.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:k.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:dt,morphTextureStride:Lt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:b.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:Re,decodeVideoTexture:Ft&&b.map.isVideoTexture===!0&&ie.getTransfer(b.map.colorSpace)===he,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ti,flipSided:b.side===fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:jt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(jt&&b.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Xe.vertexUv1s=c.has(1),Xe.vertexUv2s=c.has(2),Xe.vertexUv3s=c.has(3),c.clear(),Xe}function u(b){const S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(const D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(g(S,b),v(S,b),S.push(e.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function g(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function v(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.skinning&&o.enable(4),S.morphTargets&&o.enable(5),S.morphNormals&&o.enable(6),S.morphColors&&o.enable(7),S.premultipliedAlpha&&o.enable(8),S.shadowMapEnabled&&o.enable(9),S.doubleSided&&o.enable(10),S.flipSided&&o.enable(11),S.useDepthPacking&&o.enable(12),S.dithering&&o.enable(13),S.transmission&&o.enable(14),S.sheen&&o.enable(15),S.opaque&&o.enable(16),S.pointsUvs&&o.enable(17),S.decodeVideoTexture&&o.enable(18),S.alphaToCoverage&&o.enable(19),b.push(o.mask)}function y(b){const S=_[b.type];let D;if(S){const W=ei[S];D=xb.clone(W.uniforms)}else D=b.uniforms;return D}function w(b,S){let D;for(let W=0,k=d.length;W<k;W++){const Z=d[W];if(Z.cacheKey===S){D=Z,++D.usedTimes;break}}return D===void 0&&(D=new L2(e,S,b,r),d.push(D)),D}function R(b){if(--b.usedTimes===0){const S=d.indexOf(b);d[S]=d[d.length-1],d.pop(),b.destroy()}}function T(b){l.remove(b)}function L(){l.dispose()}return{getParameters:m,getProgramCacheKey:u,getUniforms:y,acquireProgram:w,releaseProgram:R,releaseShaderCache:T,programs:d,dispose:L}}function I2(){let e=new WeakMap;function t(r){let s=e.get(r);return s===void 0&&(s={},e.set(r,s)),s}function n(r){e.delete(r)}function i(r,s,o){e.get(r)[s]=o}function a(){e=new WeakMap}return{get:t,remove:n,update:i,dispose:a}}function B2(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function Hg(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Gg(){const e=[];let t=0;const n=[],i=[],a=[];function r(){t=0,n.length=0,i.length=0,a.length=0}function s(h,f,p,_,x,m){let u=e[t];return u===void 0?(u={id:h.id,object:h,geometry:f,material:p,groupOrder:_,renderOrder:h.renderOrder,z:x,group:m},e[t]=u):(u.id=h.id,u.object=h,u.geometry=f,u.material=p,u.groupOrder=_,u.renderOrder=h.renderOrder,u.z=x,u.group=m),t++,u}function o(h,f,p,_,x,m){const u=s(h,f,p,_,x,m);p.transmission>0?i.push(u):p.transparent===!0?a.push(u):n.push(u)}function l(h,f,p,_,x,m){const u=s(h,f,p,_,x,m);p.transmission>0?i.unshift(u):p.transparent===!0?a.unshift(u):n.unshift(u)}function c(h,f){n.length>1&&n.sort(h||B2),i.length>1&&i.sort(f||Hg),a.length>1&&a.sort(f||Hg)}function d(){for(let h=t,f=e.length;h<f;h++){const p=e[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:a,init:r,push:o,unshift:l,finish:d,sort:c}}function F2(){let e=new WeakMap;function t(i,a){const r=e.get(i);let s;return r===void 0?(s=new Gg,e.set(i,[s])):a>=r.length?(s=new Gg,r.push(s)):s=r[a],s}function n(){e=new WeakMap}return{get:t,dispose:n}}function H2(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new V,color:new se};break;case"SpotLight":n={position:new V,direction:new V,color:new se,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new V,color:new se,distance:0,decay:0};break;case"HemisphereLight":n={direction:new V,skyColor:new se,groundColor:new se};break;case"RectAreaLight":n={color:new se,position:new V,halfWidth:new V,halfHeight:new V};break}return e[t.id]=n,n}}}function G2(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let V2=0;function k2(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function X2(e){const t=new H2,n=G2(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const a=new V,r=new Pe,s=new Pe;function o(c){let d=0,h=0,f=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,_=0,x=0,m=0,u=0,g=0,v=0,y=0,w=0,R=0,T=0;c.sort(k2);for(let b=0,S=c.length;b<S;b++){const D=c[b],W=D.color,k=D.intensity,Z=D.distance,j=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=W.r*k,h+=W.g*k,f+=W.b*k;else if(D.isLightProbe){for(let N=0;N<9;N++)i.probe[N].addScaledVector(D.sh.coefficients[N],k);T++}else if(D.isDirectionalLight){const N=t.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const H=D.shadow,I=n.get(D);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=j,i.directionalShadowMatrix[p]=D.shadow.matrix,g++}i.directional[p]=N,p++}else if(D.isSpotLight){const N=t.get(D);N.position.setFromMatrixPosition(D.matrixWorld),N.color.copy(W).multiplyScalar(k),N.distance=Z,N.coneCos=Math.cos(D.angle),N.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),N.decay=D.decay,i.spot[x]=N;const H=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,H.updateMatrices(D),D.castShadow&&R++),i.spotLightMatrix[x]=H.matrix,D.castShadow){const I=n.get(D);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,i.spotShadow[x]=I,i.spotShadowMap[x]=j,y++}x++}else if(D.isRectAreaLight){const N=t.get(D);N.color.copy(W).multiplyScalar(k),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=N,m++}else if(D.isPointLight){const N=t.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),N.distance=D.distance,N.decay=D.decay,D.castShadow){const H=D.shadow,I=n.get(D);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,I.shadowCameraNear=H.camera.near,I.shadowCameraFar=H.camera.far,i.pointShadow[_]=I,i.pointShadowMap[_]=j,i.pointShadowMatrix[_]=D.shadow.matrix,v++}i.point[_]=N,_++}else if(D.isHemisphereLight){const N=t.get(D);N.skyColor.copy(D.color).multiplyScalar(k),N.groundColor.copy(D.groundColor).multiplyScalar(k),i.hemi[u]=N,u++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ot.LTC_FLOAT_1,i.rectAreaLTC2=ot.LTC_FLOAT_2):(i.rectAreaLTC1=ot.LTC_HALF_1,i.rectAreaLTC2=ot.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=f;const L=i.hash;(L.directionalLength!==p||L.pointLength!==_||L.spotLength!==x||L.rectAreaLength!==m||L.hemiLength!==u||L.numDirectionalShadows!==g||L.numPointShadows!==v||L.numSpotShadows!==y||L.numSpotMaps!==w||L.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=_,i.hemi.length=u,i.directionalShadow.length=g,i.directionalShadowMap.length=g,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=g,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+w-R,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=T,L.directionalLength=p,L.pointLength=_,L.spotLength=x,L.rectAreaLength=m,L.hemiLength=u,L.numDirectionalShadows=g,L.numPointShadows=v,L.numSpotShadows=y,L.numSpotMaps=w,L.numLightProbes=T,i.version=V2++)}function l(c,d){let h=0,f=0,p=0,_=0,x=0;const m=d.matrixWorldInverse;for(let u=0,g=c.length;u<g;u++){const v=c[u];if(v.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),h++}else if(v.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),a.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const y=i.rectArea[_];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),s.identity(),r.copy(v.matrixWorld),r.premultiply(m),s.extractRotation(r),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(s),y.halfHeight.applyMatrix4(s),_++}else if(v.isPointLight){const y=i.point[f];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:o,setupView:l,state:i}}function Vg(e){const t=new X2(e),n=[],i=[];function a(d){c.camera=d,n.length=0,i.length=0}function r(d){n.push(d)}function s(d){i.push(d)}function o(){t.setup(n)}function l(d){t.setupView(n,d)}const c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:a,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:s}}function W2(e){let t=new WeakMap;function n(a,r=0){const s=t.get(a);let o;return s===void 0?(o=new Vg(e),t.set(a,[o])):r>=s.length?(o=new Vg(e),s.push(o)):o=s[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}class q2 extends eu{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=GE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class j2 extends eu{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Y2=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Z2=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function K2(e,t,n){let i=new Tx;const a=new Yt,r=new Yt,s=new Ve,o=new q2({depthPacking:VE}),l=new j2,c={},d=n.maxTextureSize,h={[ba]:fn,[fn]:ba,[Ti]:Ti},f=new Gi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:Y2,fragmentShader:Z2}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const _=new ur;_.setAttribute("position",new li(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new si(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tx;let u=this.type;this.render=function(R,T,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const b=e.getRenderTarget(),S=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),W=e.state;W.setBlending(_a),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const k=u!==Mi&&this.type===Mi,Z=u===Mi&&this.type!==Mi;for(let j=0,N=R.length;j<N;j++){const H=R[j],I=H.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;a.copy(I.mapSize);const tt=I.getFrameExtents();if(a.multiply(tt),r.copy(I.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(r.x=Math.floor(d/tt.x),a.x=r.x*tt.x,I.mapSize.x=r.x),a.y>d&&(r.y=Math.floor(d/tt.y),a.y=r.y*tt.y,I.mapSize.y=r.y)),I.map===null||k===!0||Z===!0){const dt=this.type!==Mi?{minFilter:Fn,magFilter:Fn}:{};I.map!==null&&I.map.dispose(),I.map=new ar(a.x,a.y,dt),I.map.texture.name=H.name+".shadowMap",I.camera.updateProjectionMatrix()}e.setRenderTarget(I.map),e.clear();const nt=I.getViewportCount();for(let dt=0;dt<nt;dt++){const Lt=I.getViewport(dt);s.set(r.x*Lt.x,r.y*Lt.y,r.x*Lt.z,r.y*Lt.w),W.viewport(s),I.updateMatrices(H,dt),i=I.getFrustum(),y(T,L,I.camera,H,this.type)}I.isPointLightShadow!==!0&&this.type===Mi&&g(I,L),I.needsUpdate=!1}u=this.type,m.needsUpdate=!1,e.setRenderTarget(b,S,D)};function g(R,T){const L=t.update(x);f.defines.VSM_SAMPLES!==R.blurSamples&&(f.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new ar(a.x,a.y)),f.uniforms.shadow_pass.value=R.map.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(T,null,L,f,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(T,null,L,p,x,null)}function v(R,T,L,b){let S=null;const D=L.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)S=D;else if(S=L.isPointLight===!0?l:o,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const W=S.uuid,k=T.uuid;let Z=c[W];Z===void 0&&(Z={},c[W]=Z);let j=Z[k];j===void 0&&(j=S.clone(),Z[k]=j,T.addEventListener("dispose",w)),S=j}if(S.visible=T.visible,S.wireframe=T.wireframe,b===Mi?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:h[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,L.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const W=e.properties.get(S);W.light=L}return S}function y(R,T,L,b,S){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===Mi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,R.matrixWorld);const k=t.update(R),Z=R.material;if(Array.isArray(Z)){const j=k.groups;for(let N=0,H=j.length;N<H;N++){const I=j[N],tt=Z[I.materialIndex];if(tt&&tt.visible){const nt=v(R,tt,b,S);R.onBeforeShadow(e,R,T,L,k,nt,I),e.renderBufferDirect(L,null,k,nt,R,I),R.onAfterShadow(e,R,T,L,k,nt,I)}}}else if(Z.visible){const j=v(R,Z,b,S);R.onBeforeShadow(e,R,T,L,k,j,null),e.renderBufferDirect(L,null,k,j,R,null),R.onAfterShadow(e,R,T,L,k,j,null)}}const W=R.children;for(let k=0,Z=W.length;k<Z;k++)y(W[k],T,L,b,S)}function w(R){R.target.removeEventListener("dispose",w);for(const L in c){const b=c[L],S=R.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}function Q2(e){function t(){let O=!1;const at=new Ve;let Y=null;const K=new Ve(0,0,0,0);return{setMask:function(st){Y!==st&&!O&&(e.colorMask(st,st,st,st),Y=st)},setLocked:function(st){O=st},setClear:function(st,bt,jt,Re,Xe){Xe===!0&&(st*=Re,bt*=Re,jt*=Re),at.set(st,bt,jt,Re),K.equals(at)===!1&&(e.clearColor(st,bt,jt,Re),K.copy(at))},reset:function(){O=!1,Y=null,K.set(-1,0,0,0)}}}function n(){let O=!1,at=null,Y=null,K=null;return{setTest:function(st){st?pt(e.DEPTH_TEST):ut(e.DEPTH_TEST)},setMask:function(st){at!==st&&!O&&(e.depthMask(st),at=st)},setFunc:function(st){if(Y!==st){switch(st){case bE:e.depthFunc(e.NEVER);break;case TE:e.depthFunc(e.ALWAYS);break;case AE:e.depthFunc(e.LESS);break;case Cc:e.depthFunc(e.LEQUAL);break;case RE:e.depthFunc(e.EQUAL);break;case CE:e.depthFunc(e.GEQUAL);break;case wE:e.depthFunc(e.GREATER);break;case DE:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}Y=st}},setLocked:function(st){O=st},setClear:function(st){K!==st&&(e.clearDepth(st),K=st)},reset:function(){O=!1,at=null,Y=null,K=null}}}function i(){let O=!1,at=null,Y=null,K=null,st=null,bt=null,jt=null,Re=null,Xe=null;return{setTest:function($t){O||($t?pt(e.STENCIL_TEST):ut(e.STENCIL_TEST))},setMask:function($t){at!==$t&&!O&&(e.stencilMask($t),at=$t)},setFunc:function($t,fi,$n){(Y!==$t||K!==fi||st!==$n)&&(e.stencilFunc($t,fi,$n),Y=$t,K=fi,st=$n)},setOp:function($t,fi,$n){(bt!==$t||jt!==fi||Re!==$n)&&(e.stencilOp($t,fi,$n),bt=$t,jt=fi,Re=$n)},setLocked:function($t){O=$t},setClear:function($t){Xe!==$t&&(e.clearStencil($t),Xe=$t)},reset:function(){O=!1,at=null,Y=null,K=null,st=null,bt=null,jt=null,Re=null,Xe=null}}}const a=new t,r=new n,s=new i,o=new WeakMap,l=new WeakMap;let c={},d={},h=new WeakMap,f=[],p=null,_=!1,x=null,m=null,u=null,g=null,v=null,y=null,w=null,R=new se(0,0,0),T=0,L=!1,b=null,S=null,D=null,W=null,k=null;const Z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,N=0;const H=e.getParameter(e.VERSION);H.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(H)[1]),j=N>=1):H.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),j=N>=2);let I=null,tt={};const nt=e.getParameter(e.SCISSOR_BOX),dt=e.getParameter(e.VIEWPORT),Lt=new Ve().fromArray(nt),Xt=new Ve().fromArray(dt);function X(O,at,Y,K){const st=new Uint8Array(4),bt=e.createTexture();e.bindTexture(O,bt),e.texParameteri(O,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(O,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let jt=0;jt<Y;jt++)O===e.TEXTURE_3D||O===e.TEXTURE_2D_ARRAY?e.texImage3D(at,0,e.RGBA,1,1,K,0,e.RGBA,e.UNSIGNED_BYTE,st):e.texImage2D(at+jt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,st);return bt}const $={};$[e.TEXTURE_2D]=X(e.TEXTURE_2D,e.TEXTURE_2D,1),$[e.TEXTURE_CUBE_MAP]=X(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[e.TEXTURE_2D_ARRAY]=X(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),$[e.TEXTURE_3D]=X(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),s.setClear(0),pt(e.DEPTH_TEST),r.setFunc(Cc),Zt(!1),xt(Ym),pt(e.CULL_FACE),xe(_a);function pt(O){c[O]!==!0&&(e.enable(O),c[O]=!0)}function ut(O){c[O]!==!1&&(e.disable(O),c[O]=!1)}function wt(O,at){return d[O]!==at?(e.bindFramebuffer(O,at),d[O]=at,O===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=at),O===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=at),!0):!1}function Ot(O,at){let Y=f,K=!1;if(O){Y=h.get(at),Y===void 0&&(Y=[],h.set(at,Y));const st=O.textures;if(Y.length!==st.length||Y[0]!==e.COLOR_ATTACHMENT0){for(let bt=0,jt=st.length;bt<jt;bt++)Y[bt]=e.COLOR_ATTACHMENT0+bt;Y.length=st.length,K=!0}}else Y[0]!==e.BACK&&(Y[0]=e.BACK,K=!0);K&&e.drawBuffers(Y)}function Ft(O){return p!==O?(e.useProgram(O),p=O,!0):!1}const ue={[Va]:e.FUNC_ADD,[oE]:e.FUNC_SUBTRACT,[lE]:e.FUNC_REVERSE_SUBTRACT};ue[cE]=e.MIN,ue[uE]=e.MAX;const C={[fE]:e.ZERO,[dE]:e.ONE,[hE]:e.SRC_COLOR,[vd]:e.SRC_ALPHA,[xE]:e.SRC_ALPHA_SATURATE,[vE]:e.DST_COLOR,[mE]:e.DST_ALPHA,[pE]:e.ONE_MINUS_SRC_COLOR,[_d]:e.ONE_MINUS_SRC_ALPHA,[_E]:e.ONE_MINUS_DST_COLOR,[gE]:e.ONE_MINUS_DST_ALPHA,[yE]:e.CONSTANT_COLOR,[SE]:e.ONE_MINUS_CONSTANT_COLOR,[ME]:e.CONSTANT_ALPHA,[EE]:e.ONE_MINUS_CONSTANT_ALPHA};function xe(O,at,Y,K,st,bt,jt,Re,Xe,$t){if(O===_a){_===!0&&(ut(e.BLEND),_=!1);return}if(_===!1&&(pt(e.BLEND),_=!0),O!==sE){if(O!==x||$t!==L){if((m!==Va||v!==Va)&&(e.blendEquation(e.FUNC_ADD),m=Va,v=Va),$t)switch(O){case ts:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Zm:e.blendFunc(e.ONE,e.ONE);break;case Km:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Qm:e.blendFuncSeparate(e.ZERO,e.SRC_COLOR,e.ZERO,e.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ts:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Zm:e.blendFunc(e.SRC_ALPHA,e.ONE);break;case Km:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Qm:e.blendFunc(e.ZERO,e.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}u=null,g=null,y=null,w=null,R.set(0,0,0),T=0,x=O,L=$t}return}st=st||at,bt=bt||Y,jt=jt||K,(at!==m||st!==v)&&(e.blendEquationSeparate(ue[at],ue[st]),m=at,v=st),(Y!==u||K!==g||bt!==y||jt!==w)&&(e.blendFuncSeparate(C[Y],C[K],C[bt],C[jt]),u=Y,g=K,y=bt,w=jt),(Re.equals(R)===!1||Xe!==T)&&(e.blendColor(Re.r,Re.g,Re.b,Xe),R.copy(Re),T=Xe),x=O,L=!1}function Jt(O,at){O.side===Ti?ut(e.CULL_FACE):pt(e.CULL_FACE);let Y=O.side===fn;at&&(Y=!Y),Zt(Y),O.blending===ts&&O.transparent===!1?xe(_a):xe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),r.setFunc(O.depthFunc),r.setTest(O.depthTest),r.setMask(O.depthWrite),a.setMask(O.colorWrite);const K=O.stencilWrite;s.setTest(K),K&&(s.setMask(O.stencilWriteMask),s.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),s.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),At(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?pt(e.SAMPLE_ALPHA_TO_COVERAGE):ut(e.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(O){b!==O&&(O?e.frontFace(e.CW):e.frontFace(e.CCW),b=O)}function xt(O){O!==iE?(pt(e.CULL_FACE),O!==S&&(O===Ym?e.cullFace(e.BACK):O===aE?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):ut(e.CULL_FACE),S=O}function ve(O){O!==D&&(j&&e.lineWidth(O),D=O)}function At(O,at,Y){O?(pt(e.POLYGON_OFFSET_FILL),(W!==at||k!==Y)&&(e.polygonOffset(at,Y),W=at,k=Y)):ut(e.POLYGON_OFFSET_FILL)}function _t(O){O?pt(e.SCISSOR_TEST):ut(e.SCISSOR_TEST)}function A(O){O===void 0&&(O=e.TEXTURE0+Z-1),I!==O&&(e.activeTexture(O),I=O)}function M(O,at,Y){Y===void 0&&(I===null?Y=e.TEXTURE0+Z-1:Y=I);let K=tt[Y];K===void 0&&(K={type:void 0,texture:void 0},tt[Y]=K),(K.type!==O||K.texture!==at)&&(I!==Y&&(e.activeTexture(Y),I=Y),e.bindTexture(O,at||$[O]),K.type=O,K.texture=at)}function G(){const O=tt[I];O!==void 0&&O.type!==void 0&&(e.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function J(){try{e.compressedTexImage2D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function et(){try{e.compressedTexImage3D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Q(){try{e.texSubImage2D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function St(){try{e.texSubImage3D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function lt(){try{e.compressedTexSubImage2D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ht(){try{e.compressedTexSubImage3D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Pt(){try{e.texStorage2D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function it(){try{e.texStorage3D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ft(){try{e.texImage2D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function qt(){try{e.texImage3D.apply(e,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Ct(O){Lt.equals(O)===!1&&(e.scissor(O.x,O.y,O.z,O.w),Lt.copy(O))}function mt(O){Xt.equals(O)===!1&&(e.viewport(O.x,O.y,O.z,O.w),Xt.copy(O))}function Dt(O,at){let Y=l.get(at);Y===void 0&&(Y=new WeakMap,l.set(at,Y));let K=Y.get(O);K===void 0&&(K=e.getUniformBlockIndex(at,O.name),Y.set(O,K))}function Ht(O,at){const K=l.get(at).get(O);o.get(at)!==K&&(e.uniformBlockBinding(at,K,O.__bindingPointIndex),o.set(at,K))}function ye(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),c={},I=null,tt={},d={},h=new WeakMap,f=[],p=null,_=!1,x=null,m=null,u=null,g=null,v=null,y=null,w=null,R=new se(0,0,0),T=0,L=!1,b=null,S=null,D=null,W=null,k=null,Lt.set(0,0,e.canvas.width,e.canvas.height),Xt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),s.reset()}return{buffers:{color:a,depth:r,stencil:s},enable:pt,disable:ut,bindFramebuffer:wt,drawBuffers:Ot,useProgram:Ft,setBlending:xe,setMaterial:Jt,setFlipSided:Zt,setCullFace:xt,setLineWidth:ve,setPolygonOffset:At,setScissorTest:_t,activeTexture:A,bindTexture:M,unbindTexture:G,compressedTexImage2D:J,compressedTexImage3D:et,texImage2D:ft,texImage3D:qt,updateUBOMapping:Dt,uniformBlockBinding:Ht,texStorage2D:Pt,texStorage3D:it,texSubImage2D:Q,texSubImage3D:St,compressedTexSubImage2D:lt,compressedTexSubImage3D:ht,scissor:Ct,viewport:mt,reset:ye}}function kg(e,t,n,i){const a=J2(i);switch(n){case sx:return e*t;case lx:return e*t;case cx:return e*t*2;case ux:return e*t/a.components*a.byteLength;case ip:return e*t/a.components*a.byteLength;case fx:return e*t*2/a.components*a.byteLength;case ap:return e*t*2/a.components*a.byteLength;case ox:return e*t*3/a.components*a.byteLength;case Qn:return e*t*4/a.components*a.byteLength;case rp:return e*t*4/a.components*a.byteLength;case jl:case Yl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Zl:case Kl:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case bd:case Ad:return Math.max(e,16)*Math.max(t,8)/4;case Ed:case Td:return Math.max(e,8)*Math.max(t,8)/2;case Rd:case Cd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case wd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Dd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ud:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Ld:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Nd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Od:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Pd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case zd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Id:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Bd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Fd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Hd:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Gd:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Vd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case kd:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ql:case Xd:case Wd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case dx:case qd:return Math.ceil(e/4)*Math.ceil(t/4)*8;case jd:case Yd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function J2(e){switch(e){case Fi:case ix:return{byteLength:1,components:1};case To:case ax:case Bo:return{byteLength:2,components:1};case ep:case np:return{byteLength:2,components:4};case ir:case tp:case wi:return{byteLength:4,components:1};case rx:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}function $2(e,t,n,i,a,r,s){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Yt,d=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(A,M){return p?new OffscreenCanvas(A,M):Nc("canvas")}function x(A,M,G){let J=1;const et=_t(A);if((et.width>G||et.height>G)&&(J=G/Math.max(et.width,et.height)),J<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const Q=Math.floor(J*et.width),St=Math.floor(J*et.height);h===void 0&&(h=_(Q,St));const lt=M?_(Q,St):h;return lt.width=Q,lt.height=St,lt.getContext("2d").drawImage(A,0,0,Q,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+Q+"x"+St+")."),lt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function m(A){return A.generateMipmaps&&A.minFilter!==Fn&&A.minFilter!==Kn}function u(A){e.generateMipmap(A)}function g(A,M,G,J,et=!1){if(A!==null){if(e[A]!==void 0)return e[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let Q=M;if(M===e.RED&&(G===e.FLOAT&&(Q=e.R32F),G===e.HALF_FLOAT&&(Q=e.R16F),G===e.UNSIGNED_BYTE&&(Q=e.R8)),M===e.RED_INTEGER&&(G===e.UNSIGNED_BYTE&&(Q=e.R8UI),G===e.UNSIGNED_SHORT&&(Q=e.R16UI),G===e.UNSIGNED_INT&&(Q=e.R32UI),G===e.BYTE&&(Q=e.R8I),G===e.SHORT&&(Q=e.R16I),G===e.INT&&(Q=e.R32I)),M===e.RG&&(G===e.FLOAT&&(Q=e.RG32F),G===e.HALF_FLOAT&&(Q=e.RG16F),G===e.UNSIGNED_BYTE&&(Q=e.RG8)),M===e.RG_INTEGER&&(G===e.UNSIGNED_BYTE&&(Q=e.RG8UI),G===e.UNSIGNED_SHORT&&(Q=e.RG16UI),G===e.UNSIGNED_INT&&(Q=e.RG32UI),G===e.BYTE&&(Q=e.RG8I),G===e.SHORT&&(Q=e.RG16I),G===e.INT&&(Q=e.RG32I)),M===e.RGB&&G===e.UNSIGNED_INT_5_9_9_9_REV&&(Q=e.RGB9_E5),M===e.RGBA){const St=et?wc:ie.getTransfer(J);G===e.FLOAT&&(Q=e.RGBA32F),G===e.HALF_FLOAT&&(Q=e.RGBA16F),G===e.UNSIGNED_BYTE&&(Q=St===he?e.SRGB8_ALPHA8:e.RGBA8),G===e.UNSIGNED_SHORT_4_4_4_4&&(Q=e.RGBA4),G===e.UNSIGNED_SHORT_5_5_5_1&&(Q=e.RGB5_A1)}return(Q===e.R16F||Q===e.R32F||Q===e.RG16F||Q===e.RG32F||Q===e.RGBA16F||Q===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function v(A,M){let G;return A?M===null||M===ir||M===gs?G=e.DEPTH24_STENCIL8:M===wi?G=e.DEPTH32F_STENCIL8:M===To&&(G=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===ir||M===gs?G=e.DEPTH_COMPONENT24:M===wi?G=e.DEPTH_COMPONENT32F:M===To&&(G=e.DEPTH_COMPONENT16),G}function y(A,M){return m(A)===!0||A.isFramebufferTexture&&A.minFilter!==Fn&&A.minFilter!==Kn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function w(A){const M=A.target;M.removeEventListener("dispose",w),T(M),M.isVideoTexture&&d.delete(M)}function R(A){const M=A.target;M.removeEventListener("dispose",R),b(M)}function T(A){const M=i.get(A);if(M.__webglInit===void 0)return;const G=A.source,J=f.get(G);if(J){const et=J[M.__cacheKey];et.usedTimes--,et.usedTimes===0&&L(A),Object.keys(J).length===0&&f.delete(G)}i.remove(A)}function L(A){const M=i.get(A);e.deleteTexture(M.__webglTexture);const G=A.source,J=f.get(G);delete J[M.__cacheKey],s.memory.textures--}function b(A){const M=i.get(A);if(A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let et=0;et<M.__webglFramebuffer[J].length;et++)e.deleteFramebuffer(M.__webglFramebuffer[J][et]);else e.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)e.deleteFramebuffer(M.__webglFramebuffer[J]);else e.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&e.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&e.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&e.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&e.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const G=A.textures;for(let J=0,et=G.length;J<et;J++){const Q=i.get(G[J]);Q.__webglTexture&&(e.deleteTexture(Q.__webglTexture),s.memory.textures--),i.remove(G[J])}i.remove(A)}let S=0;function D(){S=0}function W(){const A=S;return A>=a.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),S+=1,A}function k(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Z(A,M){const G=i.get(A);if(A.isVideoTexture&&ve(A),A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){const J=A.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Xt(G,A,M);return}}n.bindTexture(e.TEXTURE_2D,G.__webglTexture,e.TEXTURE0+M)}function j(A,M){const G=i.get(A);if(A.version>0&&G.__version!==A.version){Xt(G,A,M);return}n.bindTexture(e.TEXTURE_2D_ARRAY,G.__webglTexture,e.TEXTURE0+M)}function N(A,M){const G=i.get(A);if(A.version>0&&G.__version!==A.version){Xt(G,A,M);return}n.bindTexture(e.TEXTURE_3D,G.__webglTexture,e.TEXTURE0+M)}function H(A,M){const G=i.get(A);if(A.version>0&&G.__version!==A.version){X(G,A,M);return}n.bindTexture(e.TEXTURE_CUBE_MAP,G.__webglTexture,e.TEXTURE0+M)}const I={[Sd]:e.REPEAT,[Xa]:e.CLAMP_TO_EDGE,[Md]:e.MIRRORED_REPEAT},tt={[Fn]:e.NEAREST,[HE]:e.NEAREST_MIPMAP_NEAREST,[ll]:e.NEAREST_MIPMAP_LINEAR,[Kn]:e.LINEAR,[qu]:e.LINEAR_MIPMAP_NEAREST,[Wa]:e.LINEAR_MIPMAP_LINEAR},nt={[WE]:e.NEVER,[QE]:e.ALWAYS,[qE]:e.LESS,[hx]:e.LEQUAL,[jE]:e.EQUAL,[KE]:e.GEQUAL,[YE]:e.GREATER,[ZE]:e.NOTEQUAL};function dt(A,M){if(M.type===wi&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Kn||M.magFilter===qu||M.magFilter===ll||M.magFilter===Wa||M.minFilter===Kn||M.minFilter===qu||M.minFilter===ll||M.minFilter===Wa)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,I[M.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,I[M.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,I[M.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,tt[M.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,tt[M.minFilter]),M.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,nt[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Fn||M.minFilter!==ll&&M.minFilter!==Wa||M.type===wi&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const G=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,a.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function Lt(A,M){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",w));const J=M.source;let et=f.get(J);et===void 0&&(et={},f.set(J,et));const Q=k(M);if(Q!==A.__cacheKey){et[Q]===void 0&&(et[Q]={texture:e.createTexture(),usedTimes:0},s.memory.textures++,G=!0),et[Q].usedTimes++;const St=et[A.__cacheKey];St!==void 0&&(et[A.__cacheKey].usedTimes--,St.usedTimes===0&&L(M)),A.__cacheKey=Q,A.__webglTexture=et[Q].texture}return G}function Xt(A,M,G){let J=e.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=e.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=e.TEXTURE_3D);const et=Lt(A,M),Q=M.source;n.bindTexture(J,A.__webglTexture,e.TEXTURE0+G);const St=i.get(Q);if(Q.version!==St.__version||et===!0){n.activeTexture(e.TEXTURE0+G);const lt=ie.getPrimaries(ie.workingColorSpace),ht=M.colorSpace===ia?null:ie.getPrimaries(M.colorSpace),Pt=M.colorSpace===ia||lt===ht?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let it=x(M.image,!1,a.maxTextureSize);it=At(M,it);const ft=r.convert(M.format,M.colorSpace),qt=r.convert(M.type);let Ct=g(M.internalFormat,ft,qt,M.colorSpace,M.isVideoTexture);dt(J,M);let mt;const Dt=M.mipmaps,Ht=M.isVideoTexture!==!0,ye=St.__version===void 0||et===!0,O=Q.dataReady,at=y(M,it);if(M.isDepthTexture)Ct=v(M.format===vs,M.type),ye&&(Ht?n.texStorage2D(e.TEXTURE_2D,1,Ct,it.width,it.height):n.texImage2D(e.TEXTURE_2D,0,Ct,it.width,it.height,0,ft,qt,null));else if(M.isDataTexture)if(Dt.length>0){Ht&&ye&&n.texStorage2D(e.TEXTURE_2D,at,Ct,Dt[0].width,Dt[0].height);for(let Y=0,K=Dt.length;Y<K;Y++)mt=Dt[Y],Ht?O&&n.texSubImage2D(e.TEXTURE_2D,Y,0,0,mt.width,mt.height,ft,qt,mt.data):n.texImage2D(e.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,ft,qt,mt.data);M.generateMipmaps=!1}else Ht?(ye&&n.texStorage2D(e.TEXTURE_2D,at,Ct,it.width,it.height),O&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,it.width,it.height,ft,qt,it.data)):n.texImage2D(e.TEXTURE_2D,0,Ct,it.width,it.height,0,ft,qt,it.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Ht&&ye&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,Ct,Dt[0].width,Dt[0].height,it.depth);for(let Y=0,K=Dt.length;Y<K;Y++)if(mt=Dt[Y],M.format!==Qn)if(ft!==null)if(Ht){if(O)if(M.layerUpdates.size>0){const st=kg(mt.width,mt.height,M.format,M.type);for(const bt of M.layerUpdates){const jt=mt.data.subarray(bt*st/mt.data.BYTES_PER_ELEMENT,(bt+1)*st/mt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Y,0,0,bt,mt.width,mt.height,1,ft,jt,0,0)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,it.depth,ft,mt.data,0,0)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,Y,Ct,mt.width,mt.height,it.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ht?O&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,Y,0,0,0,mt.width,mt.height,it.depth,ft,qt,mt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,Y,Ct,mt.width,mt.height,it.depth,0,ft,qt,mt.data)}else{Ht&&ye&&n.texStorage2D(e.TEXTURE_2D,at,Ct,Dt[0].width,Dt[0].height);for(let Y=0,K=Dt.length;Y<K;Y++)mt=Dt[Y],M.format!==Qn?ft!==null?Ht?O&&n.compressedTexSubImage2D(e.TEXTURE_2D,Y,0,0,mt.width,mt.height,ft,mt.data):n.compressedTexImage2D(e.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ht?O&&n.texSubImage2D(e.TEXTURE_2D,Y,0,0,mt.width,mt.height,ft,qt,mt.data):n.texImage2D(e.TEXTURE_2D,Y,Ct,mt.width,mt.height,0,ft,qt,mt.data)}else if(M.isDataArrayTexture)if(Ht){if(ye&&n.texStorage3D(e.TEXTURE_2D_ARRAY,at,Ct,it.width,it.height,it.depth),O)if(M.layerUpdates.size>0){const Y=kg(it.width,it.height,M.format,M.type);for(const K of M.layerUpdates){const st=it.data.subarray(K*Y/it.data.BYTES_PER_ELEMENT,(K+1)*Y/it.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,K,it.width,it.height,1,ft,qt,st)}M.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,ft,qt,it.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Ct,it.width,it.height,it.depth,0,ft,qt,it.data);else if(M.isData3DTexture)Ht?(ye&&n.texStorage3D(e.TEXTURE_3D,at,Ct,it.width,it.height,it.depth),O&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,ft,qt,it.data)):n.texImage3D(e.TEXTURE_3D,0,Ct,it.width,it.height,it.depth,0,ft,qt,it.data);else if(M.isFramebufferTexture){if(ye)if(Ht)n.texStorage2D(e.TEXTURE_2D,at,Ct,it.width,it.height);else{let Y=it.width,K=it.height;for(let st=0;st<at;st++)n.texImage2D(e.TEXTURE_2D,st,Ct,Y,K,0,ft,qt,null),Y>>=1,K>>=1}}else if(Dt.length>0){if(Ht&&ye){const Y=_t(Dt[0]);n.texStorage2D(e.TEXTURE_2D,at,Ct,Y.width,Y.height)}for(let Y=0,K=Dt.length;Y<K;Y++)mt=Dt[Y],Ht?O&&n.texSubImage2D(e.TEXTURE_2D,Y,0,0,ft,qt,mt):n.texImage2D(e.TEXTURE_2D,Y,Ct,ft,qt,mt);M.generateMipmaps=!1}else if(Ht){if(ye){const Y=_t(it);n.texStorage2D(e.TEXTURE_2D,at,Ct,Y.width,Y.height)}O&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ft,qt,it)}else n.texImage2D(e.TEXTURE_2D,0,Ct,ft,qt,it);m(M)&&u(J),St.__version=Q.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function X(A,M,G){if(M.image.length!==6)return;const J=Lt(A,M),et=M.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+G);const Q=i.get(et);if(et.version!==Q.__version||J===!0){n.activeTexture(e.TEXTURE0+G);const St=ie.getPrimaries(ie.workingColorSpace),lt=M.colorSpace===ia?null:ie.getPrimaries(M.colorSpace),ht=M.colorSpace===ia||St===lt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Pt=M.isCompressedTexture||M.image[0].isCompressedTexture,it=M.image[0]&&M.image[0].isDataTexture,ft=[];for(let K=0;K<6;K++)!Pt&&!it?ft[K]=x(M.image[K],!0,a.maxCubemapSize):ft[K]=it?M.image[K].image:M.image[K],ft[K]=At(M,ft[K]);const qt=ft[0],Ct=r.convert(M.format,M.colorSpace),mt=r.convert(M.type),Dt=g(M.internalFormat,Ct,mt,M.colorSpace),Ht=M.isVideoTexture!==!0,ye=Q.__version===void 0||J===!0,O=et.dataReady;let at=y(M,qt);dt(e.TEXTURE_CUBE_MAP,M);let Y;if(Pt){Ht&&ye&&n.texStorage2D(e.TEXTURE_CUBE_MAP,at,Dt,qt.width,qt.height);for(let K=0;K<6;K++){Y=ft[K].mipmaps;for(let st=0;st<Y.length;st++){const bt=Y[st];M.format!==Qn?Ct!==null?Ht?O&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st,0,0,bt.width,bt.height,Ct,bt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st,Dt,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?O&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st,0,0,bt.width,bt.height,Ct,mt,bt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st,Dt,bt.width,bt.height,0,Ct,mt,bt.data)}}}else{if(Y=M.mipmaps,Ht&&ye){Y.length>0&&at++;const K=_t(ft[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,at,Dt,K.width,K.height)}for(let K=0;K<6;K++)if(it){Ht?O&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ft[K].width,ft[K].height,Ct,mt,ft[K].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Dt,ft[K].width,ft[K].height,0,Ct,mt,ft[K].data);for(let st=0;st<Y.length;st++){const jt=Y[st].image[K].image;Ht?O&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st+1,0,0,jt.width,jt.height,Ct,mt,jt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st+1,Dt,jt.width,jt.height,0,Ct,mt,jt.data)}}else{Ht?O&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ct,mt,ft[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Dt,Ct,mt,ft[K]);for(let st=0;st<Y.length;st++){const bt=Y[st];Ht?O&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st+1,0,0,Ct,mt,bt.image[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,st+1,Dt,Ct,mt,bt.image[K])}}}m(M)&&u(e.TEXTURE_CUBE_MAP),Q.__version=et.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function $(A,M,G,J,et,Q){const St=r.convert(G.format,G.colorSpace),lt=r.convert(G.type),ht=g(G.internalFormat,St,lt,G.colorSpace);if(!i.get(M).__hasExternalTextures){const it=Math.max(1,M.width>>Q),ft=Math.max(1,M.height>>Q);et===e.TEXTURE_3D||et===e.TEXTURE_2D_ARRAY?n.texImage3D(et,Q,ht,it,ft,M.depth,0,St,lt,null):n.texImage2D(et,Q,ht,it,ft,0,St,lt,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,J,et,i.get(G).__webglTexture,0,Zt(M)):(et===e.TEXTURE_2D||et>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,J,et,i.get(G).__webglTexture,Q),n.bindFramebuffer(e.FRAMEBUFFER,null)}function pt(A,M,G){if(e.bindRenderbuffer(e.RENDERBUFFER,A),M.depthBuffer){const J=M.depthTexture,et=J&&J.isDepthTexture?J.type:null,Q=v(M.stencilBuffer,et),St=M.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,lt=Zt(M);xt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,lt,Q,M.width,M.height):G?e.renderbufferStorageMultisample(e.RENDERBUFFER,lt,Q,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,Q,M.width,M.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,St,e.RENDERBUFFER,A)}else{const J=M.textures;for(let et=0;et<J.length;et++){const Q=J[et],St=r.convert(Q.format,Q.colorSpace),lt=r.convert(Q.type),ht=g(Q.internalFormat,St,lt,Q.colorSpace),Pt=Zt(M);G&&xt(M)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,Pt,ht,M.width,M.height):xt(M)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Pt,ht,M.width,M.height):e.renderbufferStorage(e.RENDERBUFFER,ht,M.width,M.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ut(A,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),Z(M.depthTexture,0);const J=i.get(M.depthTexture).__webglTexture,et=Zt(M);if(M.depthTexture.format===es)xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0,et):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,J,0);else if(M.depthTexture.format===vs)xt(M)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0,et):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function wt(A){const M=i.get(A),G=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!M.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");ut(M.__webglFramebuffer,A)}else if(G){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]=e.createRenderbuffer(),pt(M.__webglDepthbuffer[J],A,!1)}else n.bindFramebuffer(e.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=e.createRenderbuffer(),pt(M.__webglDepthbuffer,A,!1);n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ot(A,M,G){const J=i.get(A);M!==void 0&&$(J.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),G!==void 0&&wt(A)}function Ft(A){const M=A.texture,G=i.get(A),J=i.get(M);A.addEventListener("dispose",R);const et=A.textures,Q=A.isWebGLCubeRenderTarget===!0,St=et.length>1;if(St||(J.__webglTexture===void 0&&(J.__webglTexture=e.createTexture()),J.__version=M.version,s.memory.textures++),Q){G.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer[lt]=[];for(let ht=0;ht<M.mipmaps.length;ht++)G.__webglFramebuffer[lt][ht]=e.createFramebuffer()}else G.__webglFramebuffer[lt]=e.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){G.__webglFramebuffer=[];for(let lt=0;lt<M.mipmaps.length;lt++)G.__webglFramebuffer[lt]=e.createFramebuffer()}else G.__webglFramebuffer=e.createFramebuffer();if(St)for(let lt=0,ht=et.length;lt<ht;lt++){const Pt=i.get(et[lt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=e.createTexture(),s.memory.textures++)}if(A.samples>0&&xt(A)===!1){G.__webglMultisampledFramebuffer=e.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){const ht=et[lt];G.__webglColorRenderbuffer[lt]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,G.__webglColorRenderbuffer[lt]);const Pt=r.convert(ht.format,ht.colorSpace),it=r.convert(ht.type),ft=g(ht.internalFormat,Pt,it,ht.colorSpace,A.isXRRenderTarget===!0),qt=Zt(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,qt,ft,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+lt,e.RENDERBUFFER,G.__webglColorRenderbuffer[lt])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=e.createRenderbuffer(),pt(G.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Q){n.bindTexture(e.TEXTURE_CUBE_MAP,J.__webglTexture),dt(e.TEXTURE_CUBE_MAP,M);for(let lt=0;lt<6;lt++)if(M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)$(G.__webglFramebuffer[lt][ht],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+lt,ht);else $(G.__webglFramebuffer[lt],A,M,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);m(M)&&u(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(St){for(let lt=0,ht=et.length;lt<ht;lt++){const Pt=et[lt],it=i.get(Pt);n.bindTexture(e.TEXTURE_2D,it.__webglTexture),dt(e.TEXTURE_2D,Pt),$(G.__webglFramebuffer,A,Pt,e.COLOR_ATTACHMENT0+lt,e.TEXTURE_2D,0),m(Pt)&&u(e.TEXTURE_2D)}n.unbindTexture()}else{let lt=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(lt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(lt,J.__webglTexture),dt(lt,M),M.mipmaps&&M.mipmaps.length>0)for(let ht=0;ht<M.mipmaps.length;ht++)$(G.__webglFramebuffer[ht],A,M,e.COLOR_ATTACHMENT0,lt,ht);else $(G.__webglFramebuffer,A,M,e.COLOR_ATTACHMENT0,lt,0);m(M)&&u(lt),n.unbindTexture()}A.depthBuffer&&wt(A)}function ue(A){const M=A.textures;for(let G=0,J=M.length;G<J;G++){const et=M[G];if(m(et)){const Q=A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:e.TEXTURE_2D,St=i.get(et).__webglTexture;n.bindTexture(Q,St),u(Q),n.unbindTexture()}}}const C=[],xe=[];function Jt(A){if(A.samples>0){if(xt(A)===!1){const M=A.textures,G=A.width,J=A.height;let et=e.COLOR_BUFFER_BIT;const Q=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=i.get(A),lt=M.length>1;if(lt)for(let ht=0;ht<M.length;ht++)n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let ht=0;ht<M.length;ht++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=e.STENCIL_BUFFER_BIT)),lt){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,St.__webglColorRenderbuffer[ht]);const Pt=i.get(M[ht]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Pt,0)}e.blitFramebuffer(0,0,G,J,0,0,G,J,et,e.NEAREST),l===!0&&(C.length=0,xe.length=0,C.push(e.COLOR_ATTACHMENT0+ht),A.depthBuffer&&A.resolveDepthBuffer===!1&&(C.push(Q),xe.push(Q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,xe)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,C))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),lt)for(let ht=0;ht<M.length;ht++){n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,St.__webglColorRenderbuffer[ht]);const Pt=i.get(M[ht]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,Pt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const M=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[M])}}}function Zt(A){return Math.min(a.maxSamples,A.samples)}function xt(A){const M=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ve(A){const M=s.render.frame;d.get(A)!==M&&(d.set(A,M),A.update())}function At(A,M){const G=A.colorSpace,J=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==Ra&&G!==ia&&(ie.getTransfer(G)===he?(J!==Qn||et!==Fi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),M}function _t(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=D,this.setTexture2D=Z,this.setTexture2DArray=j,this.setTexture3D=N,this.setTextureCube=H,this.rebindTextures=Ot,this.setupRenderTarget=Ft,this.updateRenderTargetMipmap=ue,this.updateMultisampleRenderTarget=Jt,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=xt}function tR(e,t){function n(i,a=ia){let r;const s=ie.getTransfer(a);if(i===Fi)return e.UNSIGNED_BYTE;if(i===ep)return e.UNSIGNED_SHORT_4_4_4_4;if(i===np)return e.UNSIGNED_SHORT_5_5_5_1;if(i===rx)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ix)return e.BYTE;if(i===ax)return e.SHORT;if(i===To)return e.UNSIGNED_SHORT;if(i===tp)return e.INT;if(i===ir)return e.UNSIGNED_INT;if(i===wi)return e.FLOAT;if(i===Bo)return e.HALF_FLOAT;if(i===sx)return e.ALPHA;if(i===ox)return e.RGB;if(i===Qn)return e.RGBA;if(i===lx)return e.LUMINANCE;if(i===cx)return e.LUMINANCE_ALPHA;if(i===es)return e.DEPTH_COMPONENT;if(i===vs)return e.DEPTH_STENCIL;if(i===ux)return e.RED;if(i===ip)return e.RED_INTEGER;if(i===fx)return e.RG;if(i===ap)return e.RG_INTEGER;if(i===rp)return e.RGBA_INTEGER;if(i===jl||i===Yl||i===Zl||i===Kl)if(s===he)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===jl)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Yl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===jl)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Yl)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zl)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ed||i===bd||i===Td||i===Ad)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ed)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bd)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Td)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ad)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rd||i===Cd||i===wd)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Rd||i===Cd)return s===he?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===wd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dd||i===Ud||i===Ld||i===Nd||i===Od||i===Pd||i===zd||i===Id||i===Bd||i===Fd||i===Hd||i===Gd||i===Vd||i===kd)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ud)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ld)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Od)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Pd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===zd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Id)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Bd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Hd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Vd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kd)return s===he?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ql||i===Xd||i===Wd)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===Ql)return s===he?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xd)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wd)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===dx||i===qd||i===jd||i===Yd)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ql)return r.COMPRESSED_RED_RGTC1_EXT;if(i===qd)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jd)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Yd)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===gs?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}class eR extends Zn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Dl extends Rn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const nR={type:"move"};class yf{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dl,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dl,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dl,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,r=null,s=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){s=!0;for(const x of t.hand.values()){const m=n.getJointPose(x,i),u=this._getHandJoint(c,x);m!==null&&(u.matrix.fromArray(m.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=m.radius),u.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=d.position.distanceTo(h.position),p=.02,_=.005;c.inputState.pinching&&f>p+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&r!==null&&(a=r),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nR)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=s!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Dl;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const iR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aR=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class rR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n,i){if(this.texture===null){const a=new dn,r=t.properties.get(a);r.__webglTexture=n.texture,(n.depthNear!=i.depthNear||n.depthFar!=i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=a}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Gi({vertexShader:iR,fragmentShader:aR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new si(new ko(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sR extends Rs{constructor(t,n){super();const i=this;let a=null,r=1,s=null,o="local-floor",l=1,c=null,d=null,h=null,f=null,p=null,_=null;const x=new rR,m=n.getContextAttributes();let u=null,g=null;const v=[],y=[],w=new Yt;let R=null;const T=new Zn;T.layers.enable(1),T.viewport=new Ve;const L=new Zn;L.layers.enable(2),L.viewport=new Ve;const b=[T,L],S=new eR;S.layers.enable(1),S.layers.enable(2);let D=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let $=v[X];return $===void 0&&($=new yf,v[X]=$),$.getTargetRaySpace()},this.getControllerGrip=function(X){let $=v[X];return $===void 0&&($=new yf,v[X]=$),$.getGripSpace()},this.getHand=function(X){let $=v[X];return $===void 0&&($=new yf,v[X]=$),$.getHandSpace()};function k(X){const $=y.indexOf(X.inputSource);if($===-1)return;const pt=v[$];pt!==void 0&&(pt.update(X.inputSource,X.frame,c||s),pt.dispatchEvent({type:X.type,data:X.inputSource}))}function Z(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",Z),a.removeEventListener("inputsourceschange",j);for(let X=0;X<v.length;X++){const $=y[X];$!==null&&(y[X]=null,v[X].disconnect($))}D=null,W=null,x.reset(),t.setRenderTarget(u),p=null,f=null,h=null,a=null,g=null,Xt.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||s},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return a},this.setSession=async function(X){if(a=X,a!==null){if(u=t.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",Z),a.addEventListener("inputsourceschange",j),m.xrCompatible!==!0&&await n.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(w),a.renderState.layers===void 0){const $={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(a,n,$),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),g=new ar(p.framebufferWidth,p.framebufferHeight,{format:Qn,type:Fi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let $=null,pt=null,ut=null;m.depth&&(ut=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,$=m.stencil?vs:es,pt=m.stencil?gs:ir);const wt={colorFormat:n.RGBA8,depthFormat:ut,scaleFactor:r};h=new XRWebGLBinding(a,n),f=h.createProjectionLayer(wt),a.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),g=new ar(f.textureWidth,f.textureHeight,{format:Qn,type:Fi,depthTexture:new Cx(f.textureWidth,f.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,s=await a.requestReferenceSpace(o),Xt.setContext(a),Xt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function j(X){for(let $=0;$<X.removed.length;$++){const pt=X.removed[$],ut=y.indexOf(pt);ut>=0&&(y[ut]=null,v[ut].disconnect(pt))}for(let $=0;$<X.added.length;$++){const pt=X.added[$];let ut=y.indexOf(pt);if(ut===-1){for(let Ot=0;Ot<v.length;Ot++)if(Ot>=y.length){y.push(pt),ut=Ot;break}else if(y[Ot]===null){y[Ot]=pt,ut=Ot;break}if(ut===-1)break}const wt=v[ut];wt&&wt.connect(pt)}}const N=new V,H=new V;function I(X,$,pt){N.setFromMatrixPosition($.matrixWorld),H.setFromMatrixPosition(pt.matrixWorld);const ut=N.distanceTo(H),wt=$.projectionMatrix.elements,Ot=pt.projectionMatrix.elements,Ft=wt[14]/(wt[10]-1),ue=wt[14]/(wt[10]+1),C=(wt[9]+1)/wt[5],xe=(wt[9]-1)/wt[5],Jt=(wt[8]-1)/wt[0],Zt=(Ot[8]+1)/Ot[0],xt=Ft*Jt,ve=Ft*Zt,At=ut/(-Jt+Zt),_t=At*-Jt;$.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(_t),X.translateZ(At),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const A=Ft+At,M=ue+At,G=xt-_t,J=ve+(ut-_t),et=C*ue/M*A,Q=xe*ue/M*A;X.projectionMatrix.makePerspective(G,J,et,Q,A,M),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function tt(X,$){$===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices($.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(a===null)return;x.texture!==null&&(X.near=x.depthNear,X.far=x.depthFar),S.near=L.near=T.near=X.near,S.far=L.far=T.far=X.far,(D!==S.near||W!==S.far)&&(a.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,W=S.far,T.near=D,T.far=W,L.near=D,L.far=W,T.updateProjectionMatrix(),L.updateProjectionMatrix(),X.updateProjectionMatrix());const $=X.parent,pt=S.cameras;tt(S,$);for(let ut=0;ut<pt.length;ut++)tt(pt[ut],$);pt.length===2?I(S,T,L):S.projectionMatrix.copy(T.projectionMatrix),nt(X,S,$)};function nt(X,$,pt){pt===null?X.matrix.copy($.matrixWorld):(X.matrix.copy(pt.matrixWorld),X.matrix.invert(),X.matrix.multiply($.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy($.projectionMatrix),X.projectionMatrixInverse.copy($.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Zd*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(X){l=X,f!==null&&(f.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(S)};let dt=null;function Lt(X,$){if(d=$.getViewerPose(c||s),_=$,d!==null){const pt=d.views;p!==null&&(t.setRenderTargetFramebuffer(g,p.framebuffer),t.setRenderTarget(g));let ut=!1;pt.length!==S.cameras.length&&(S.cameras.length=0,ut=!0);for(let Ot=0;Ot<pt.length;Ot++){const Ft=pt[Ot];let ue=null;if(p!==null)ue=p.getViewport(Ft);else{const xe=h.getViewSubImage(f,Ft);ue=xe.viewport,Ot===0&&(t.setRenderTargetTextures(g,xe.colorTexture,f.ignoreDepthValues?void 0:xe.depthStencilTexture),t.setRenderTarget(g))}let C=b[Ot];C===void 0&&(C=new Zn,C.layers.enable(Ot),C.viewport=new Ve,b[Ot]=C),C.matrix.fromArray(Ft.transform.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale),C.projectionMatrix.fromArray(Ft.projectionMatrix),C.projectionMatrixInverse.copy(C.projectionMatrix).invert(),C.viewport.set(ue.x,ue.y,ue.width,ue.height),Ot===0&&(S.matrix.copy(C.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ut===!0&&S.cameras.push(C)}const wt=a.enabledFeatures;if(wt&&wt.includes("depth-sensing")){const Ot=h.getDepthInformation(pt[0]);Ot&&Ot.isValid&&Ot.texture&&x.init(t,Ot,a.renderState)}}for(let pt=0;pt<v.length;pt++){const ut=y[pt],wt=v[pt];ut!==null&&wt!==void 0&&wt.update(ut,$,c||s)}dt&&dt(X,$),$.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:$}),_=null}const Xt=new Ax;Xt.setAnimationLoop(Lt),this.setAnimationLoop=function(X){dt=X},this.dispose=function(){}}}const Pa=new Hi,oR=new Pe;function lR(e,t){function n(m,u){m.matrixAutoUpdate===!0&&m.updateMatrix(),u.value.copy(m.matrix)}function i(m,u){u.color.getRGB(m.fogColor.value,Mx(e)),u.isFog?(m.fogNear.value=u.near,m.fogFar.value=u.far):u.isFogExp2&&(m.fogDensity.value=u.density)}function a(m,u,g,v,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(m,u):u.isMeshToonMaterial?(r(m,u),h(m,u)):u.isMeshPhongMaterial?(r(m,u),d(m,u)):u.isMeshStandardMaterial?(r(m,u),f(m,u),u.isMeshPhysicalMaterial&&p(m,u,y)):u.isMeshMatcapMaterial?(r(m,u),_(m,u)):u.isMeshDepthMaterial?r(m,u):u.isMeshDistanceMaterial?(r(m,u),x(m,u)):u.isMeshNormalMaterial?r(m,u):u.isLineBasicMaterial?(s(m,u),u.isLineDashedMaterial&&o(m,u)):u.isPointsMaterial?l(m,u,g,v):u.isSpriteMaterial?c(m,u):u.isShadowMaterial?(m.color.value.copy(u.color),m.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(m,u){m.opacity.value=u.opacity,u.color&&m.diffuse.value.copy(u.color),u.emissive&&m.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.bumpMap&&(m.bumpMap.value=u.bumpMap,n(u.bumpMap,m.bumpMapTransform),m.bumpScale.value=u.bumpScale,u.side===fn&&(m.bumpScale.value*=-1)),u.normalMap&&(m.normalMap.value=u.normalMap,n(u.normalMap,m.normalMapTransform),m.normalScale.value.copy(u.normalScale),u.side===fn&&m.normalScale.value.negate()),u.displacementMap&&(m.displacementMap.value=u.displacementMap,n(u.displacementMap,m.displacementMapTransform),m.displacementScale.value=u.displacementScale,m.displacementBias.value=u.displacementBias),u.emissiveMap&&(m.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,m.emissiveMapTransform)),u.specularMap&&(m.specularMap.value=u.specularMap,n(u.specularMap,m.specularMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest);const g=t.get(u),v=g.envMap,y=g.envMapRotation;v&&(m.envMap.value=v,Pa.copy(y),Pa.x*=-1,Pa.y*=-1,Pa.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Pa.y*=-1,Pa.z*=-1),m.envMapRotation.value.setFromMatrix4(oR.makeRotationFromEuler(Pa)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=u.reflectivity,m.ior.value=u.ior,m.refractionRatio.value=u.refractionRatio),u.lightMap&&(m.lightMap.value=u.lightMap,m.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,m.lightMapTransform)),u.aoMap&&(m.aoMap.value=u.aoMap,m.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,m.aoMapTransform))}function s(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform))}function o(m,u){m.dashSize.value=u.dashSize,m.totalSize.value=u.dashSize+u.gapSize,m.scale.value=u.scale}function l(m,u,g,v){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.size.value=u.size*g,m.scale.value=v*.5,u.map&&(m.map.value=u.map,n(u.map,m.uvTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function c(m,u){m.diffuse.value.copy(u.color),m.opacity.value=u.opacity,m.rotation.value=u.rotation,u.map&&(m.map.value=u.map,n(u.map,m.mapTransform)),u.alphaMap&&(m.alphaMap.value=u.alphaMap,n(u.alphaMap,m.alphaMapTransform)),u.alphaTest>0&&(m.alphaTest.value=u.alphaTest)}function d(m,u){m.specular.value.copy(u.specular),m.shininess.value=Math.max(u.shininess,1e-4)}function h(m,u){u.gradientMap&&(m.gradientMap.value=u.gradientMap)}function f(m,u){m.metalness.value=u.metalness,u.metalnessMap&&(m.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,m.metalnessMapTransform)),m.roughness.value=u.roughness,u.roughnessMap&&(m.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,m.roughnessMapTransform)),u.envMap&&(m.envMapIntensity.value=u.envMapIntensity)}function p(m,u,g){m.ior.value=u.ior,u.sheen>0&&(m.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),m.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(m.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,m.sheenColorMapTransform)),u.sheenRoughnessMap&&(m.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,m.sheenRoughnessMapTransform))),u.clearcoat>0&&(m.clearcoat.value=u.clearcoat,m.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(m.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,m.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(m.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===fn&&m.clearcoatNormalScale.value.negate())),u.dispersion>0&&(m.dispersion.value=u.dispersion),u.iridescence>0&&(m.iridescence.value=u.iridescence,m.iridescenceIOR.value=u.iridescenceIOR,m.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(m.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,m.iridescenceMapTransform)),u.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),u.transmission>0&&(m.transmission.value=u.transmission,m.transmissionSamplerMap.value=g.texture,m.transmissionSamplerSize.value.set(g.width,g.height),u.transmissionMap&&(m.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,m.transmissionMapTransform)),m.thickness.value=u.thickness,u.thicknessMap&&(m.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=u.attenuationDistance,m.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(m.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(m.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=u.specularIntensity,m.specularColor.value.copy(u.specularColor),u.specularColorMap&&(m.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,m.specularColorMapTransform)),u.specularIntensityMap&&(m.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,u){u.matcap&&(m.matcap.value=u.matcap)}function x(m,u){const g=t.get(u).light;m.referencePosition.value.setFromMatrixPosition(g.matrixWorld),m.nearDistance.value=g.shadow.camera.near,m.farDistance.value=g.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function cR(e,t,n,i){let a={},r={},s=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(g,v){const y=v.program;i.uniformBlockBinding(g,y)}function c(g,v){let y=a[g.id];y===void 0&&(_(g),y=d(g),a[g.id]=y,g.addEventListener("dispose",m));const w=v.program;i.updateUBOMapping(g,w);const R=t.render.frame;r[g.id]!==R&&(f(g),r[g.id]=R)}function d(g){const v=h();g.__bindingPointIndex=v;const y=e.createBuffer(),w=g.__size,R=g.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,w,R),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,v,y),y}function h(){for(let g=0;g<o;g++)if(s.indexOf(g)===-1)return s.push(g),g;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(g){const v=a[g.id],y=g.uniforms,w=g.__cache;e.bindBuffer(e.UNIFORM_BUFFER,v);for(let R=0,T=y.length;R<T;R++){const L=Array.isArray(y[R])?y[R]:[y[R]];for(let b=0,S=L.length;b<S;b++){const D=L[b];if(p(D,R,b,w)===!0){const W=D.__offset,k=Array.isArray(D.value)?D.value:[D.value];let Z=0;for(let j=0;j<k.length;j++){const N=k[j],H=x(N);typeof N=="number"||typeof N=="boolean"?(D.__data[0]=N,e.bufferSubData(e.UNIFORM_BUFFER,W+Z,D.__data)):N.isMatrix3?(D.__data[0]=N.elements[0],D.__data[1]=N.elements[1],D.__data[2]=N.elements[2],D.__data[3]=0,D.__data[4]=N.elements[3],D.__data[5]=N.elements[4],D.__data[6]=N.elements[5],D.__data[7]=0,D.__data[8]=N.elements[6],D.__data[9]=N.elements[7],D.__data[10]=N.elements[8],D.__data[11]=0):(N.toArray(D.__data,Z),Z+=H.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,W,D.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(g,v,y,w){const R=g.value,T=v+"_"+y;if(w[T]===void 0)return typeof R=="number"||typeof R=="boolean"?w[T]=R:w[T]=R.clone(),!0;{const L=w[T];if(typeof R=="number"||typeof R=="boolean"){if(L!==R)return w[T]=R,!0}else if(L.equals(R)===!1)return L.copy(R),!0}return!1}function _(g){const v=g.uniforms;let y=0;const w=16;for(let T=0,L=v.length;T<L;T++){const b=Array.isArray(v[T])?v[T]:[v[T]];for(let S=0,D=b.length;S<D;S++){const W=b[S],k=Array.isArray(W.value)?W.value:[W.value];for(let Z=0,j=k.length;Z<j;Z++){const N=k[Z],H=x(N),I=y%w,tt=I%H.boundary,nt=I+tt;y+=tt,nt!==0&&w-nt<H.storage&&(y+=w-nt),W.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=y,y+=H.storage}}}const R=y%w;return R>0&&(y+=w-R),g.__size=y,g.__cache={},this}function x(g){const v={boundary:0,storage:0};return typeof g=="number"||typeof g=="boolean"?(v.boundary=4,v.storage=4):g.isVector2?(v.boundary=8,v.storage=8):g.isVector3||g.isColor?(v.boundary=16,v.storage=12):g.isVector4?(v.boundary=16,v.storage=16):g.isMatrix3?(v.boundary=48,v.storage=48):g.isMatrix4?(v.boundary=64,v.storage=64):g.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",g),v}function m(g){const v=g.target;v.removeEventListener("dispose",m);const y=s.indexOf(v.__bindingPointIndex);s.splice(y,1),e.deleteBuffer(a[v.id]),delete a[v.id],delete r[v.id]}function u(){for(const g in a)e.deleteBuffer(a[g]);s=[],a={},r={}}return{bind:l,update:c,dispose:u}}class uR{constructor(t={}){const{canvas:n=$E(),context:i=null,depth:a=!0,stencil:r=!1,alpha:s=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=s;const p=new Uint32Array(4),_=new Int32Array(4);let x=null,m=null;const u=[],g=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=xa,this.toneMappingExposure=1;const v=this;let y=!1,w=0,R=0,T=null,L=-1,b=null;const S=new Ve,D=new Ve;let W=null;const k=new se(0);let Z=0,j=n.width,N=n.height,H=1,I=null,tt=null;const nt=new Ve(0,0,j,N),dt=new Ve(0,0,j,N);let Lt=!1;const Xt=new Tx;let X=!1,$=!1;const pt=new Pe,ut=new V,wt=new Ve,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ft=!1;function ue(){return T===null?H:1}let C=i;function xe(E,P){return n.getContext(E,P)}try{const E={alpha:!0,depth:a,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${$h}`),n.addEventListener("webglcontextlost",Y,!1),n.addEventListener("webglcontextrestored",K,!1),n.addEventListener("webglcontextcreationerror",st,!1),C===null){const P="webgl2";if(C=xe(P,E),C===null)throw xe(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Jt,Zt,xt,ve,At,_t,A,M,G,J,et,Q,St,lt,ht,Pt,it,ft,qt,Ct,mt,Dt,Ht,ye;function O(){Jt=new g1(C),Jt.init(),Dt=new tR(C,Jt),Zt=new u1(C,Jt,t,Dt),xt=new Q2(C),ve=new x1(C),At=new I2,_t=new $2(C,Jt,xt,At,Zt,Dt,ve),A=new d1(v),M=new m1(v),G=new Ab(C),Ht=new l1(C,G),J=new v1(C,G,ve,Ht),et=new S1(C,J,G,ve),qt=new y1(C,Zt,_t),Pt=new f1(At),Q=new z2(v,A,M,Jt,Zt,Ht,Pt),St=new lR(v,At),lt=new F2,ht=new W2(Jt),ft=new o1(v,A,M,xt,et,f,l),it=new K2(v,et,Zt),ye=new cR(C,ve,Zt,xt),Ct=new c1(C,Jt,ve),mt=new _1(C,Jt,ve),ve.programs=Q.programs,v.capabilities=Zt,v.extensions=Jt,v.properties=At,v.renderLists=lt,v.shadowMap=it,v.state=xt,v.info=ve}O();const at=new sR(v,C);this.xr=at,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const E=Jt.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Jt.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize(j,N,!1))},this.getSize=function(E){return E.set(j,N)},this.setSize=function(E,P,B=!0){if(at.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}j=E,N=P,n.width=Math.floor(E*H),n.height=Math.floor(P*H),B===!0&&(n.style.width=E+"px",n.style.height=P+"px"),this.setViewport(0,0,E,P)},this.getDrawingBufferSize=function(E){return E.set(j*H,N*H).floor()},this.setDrawingBufferSize=function(E,P,B){j=E,N=P,H=B,n.width=Math.floor(E*B),n.height=Math.floor(P*B),this.setViewport(0,0,E,P)},this.getCurrentViewport=function(E){return E.copy(S)},this.getViewport=function(E){return E.copy(nt)},this.setViewport=function(E,P,B,F){E.isVector4?nt.set(E.x,E.y,E.z,E.w):nt.set(E,P,B,F),xt.viewport(S.copy(nt).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(dt)},this.setScissor=function(E,P,B,F){E.isVector4?dt.set(E.x,E.y,E.z,E.w):dt.set(E,P,B,F),xt.scissor(D.copy(dt).multiplyScalar(H).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(E){xt.setScissorTest(Lt=E)},this.setOpaqueSort=function(E){I=E},this.setTransparentSort=function(E){tt=E},this.getClearColor=function(E){return E.copy(ft.getClearColor())},this.setClearColor=function(){ft.setClearColor.apply(ft,arguments)},this.getClearAlpha=function(){return ft.getClearAlpha()},this.setClearAlpha=function(){ft.setClearAlpha.apply(ft,arguments)},this.clear=function(E=!0,P=!0,B=!0){let F=0;if(E){let z=!1;if(T!==null){const rt=T.texture.format;z=rt===rp||rt===ap||rt===ip}if(z){const rt=T.texture.type,ct=rt===Fi||rt===ir||rt===To||rt===gs||rt===ep||rt===np,gt=ft.getClearColor(),vt=ft.getClearAlpha(),Tt=gt.r,Rt=gt.g,Mt=gt.b;ct?(p[0]=Tt,p[1]=Rt,p[2]=Mt,p[3]=vt,C.clearBufferuiv(C.COLOR,0,p)):(_[0]=Tt,_[1]=Rt,_[2]=Mt,_[3]=vt,C.clearBufferiv(C.COLOR,0,_))}else F|=C.COLOR_BUFFER_BIT}P&&(F|=C.DEPTH_BUFFER_BIT),B&&(F|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Y,!1),n.removeEventListener("webglcontextrestored",K,!1),n.removeEventListener("webglcontextcreationerror",st,!1),lt.dispose(),ht.dispose(),At.dispose(),A.dispose(),M.dispose(),et.dispose(),Ht.dispose(),ye.dispose(),Q.dispose(),at.dispose(),at.removeEventListener("sessionstart",$n),at.removeEventListener("sessionend",cp),Ca.stop()};function Y(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function K(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const E=ve.autoReset,P=it.enabled,B=it.autoUpdate,F=it.needsUpdate,z=it.type;O(),ve.autoReset=E,it.enabled=P,it.autoUpdate=B,it.needsUpdate=F,it.type=z}function st(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function bt(E){const P=E.target;P.removeEventListener("dispose",bt),jt(P)}function jt(E){Re(E),At.remove(E)}function Re(E){const P=At.get(E).programs;P!==void 0&&(P.forEach(function(B){Q.releaseProgram(B)}),E.isShaderMaterial&&Q.releaseShaderCache(E))}this.renderBufferDirect=function(E,P,B,F,z,rt){P===null&&(P=Ot);const ct=z.isMesh&&z.matrixWorld.determinant()<0,gt=Ox(E,P,B,F,z);xt.setMaterial(F,ct);let vt=B.index,Tt=1;if(F.wireframe===!0){if(vt=J.getWireframeAttribute(B),vt===void 0)return;Tt=2}const Rt=B.drawRange,Mt=B.attributes.position;let te=Rt.start*Tt,Se=(Rt.start+Rt.count)*Tt;rt!==null&&(te=Math.max(te,rt.start*Tt),Se=Math.min(Se,(rt.start+rt.count)*Tt)),vt!==null?(te=Math.max(te,0),Se=Math.min(Se,vt.count)):Mt!=null&&(te=Math.max(te,0),Se=Math.min(Se,Mt.count));const Me=Se-te;if(Me<0||Me===1/0)return;Ht.setup(z,F,gt,B,vt);let mn,ee=Ct;if(vt!==null&&(mn=G.get(vt),ee=mt,ee.setIndex(mn)),z.isMesh)F.wireframe===!0?(xt.setLineWidth(F.wireframeLinewidth*ue()),ee.setMode(C.LINES)):ee.setMode(C.TRIANGLES);else if(z.isLine){let yt=F.linewidth;yt===void 0&&(yt=1),xt.setLineWidth(yt*ue()),z.isLineSegments?ee.setMode(C.LINES):z.isLineLoop?ee.setMode(C.LINE_LOOP):ee.setMode(C.LINE_STRIP)}else z.isPoints?ee.setMode(C.POINTS):z.isSprite&&ee.setMode(C.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)ee.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Jt.get("WEBGL_multi_draw"))ee.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const yt=z._multiDrawStarts,We=z._multiDrawCounts,ne=z._multiDrawCount,kn=vt?G.get(vt).bytesPerElement:1,fr=At.get(F).currentProgram.getUniforms();for(let gn=0;gn<ne;gn++)fr.setValue(C,"_gl_DrawID",gn),ee.render(yt[gn]/kn,We[gn])}else if(z.isInstancedMesh)ee.renderInstances(te,Me,z.count);else if(B.isInstancedBufferGeometry){const yt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,We=Math.min(B.instanceCount,yt);ee.renderInstances(te,Me,We)}else ee.render(te,Me)};function Xe(E,P,B){E.transparent===!0&&E.side===Ti&&E.forceSinglePass===!1?(E.side=fn,E.needsUpdate=!0,Wo(E,P,B),E.side=ba,E.needsUpdate=!0,Wo(E,P,B),E.side=Ti):Wo(E,P,B)}this.compile=function(E,P,B=null){B===null&&(B=E),m=ht.get(B),m.init(P),g.push(m),B.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),E!==B&&E.traverseVisible(function(z){z.isLight&&z.layers.test(P.layers)&&(m.pushLight(z),z.castShadow&&m.pushShadow(z))}),m.setupLights();const F=new Set;return E.traverse(function(z){const rt=z.material;if(rt)if(Array.isArray(rt))for(let ct=0;ct<rt.length;ct++){const gt=rt[ct];Xe(gt,B,z),F.add(gt)}else Xe(rt,B,z),F.add(rt)}),g.pop(),m=null,F},this.compileAsync=function(E,P,B=null){const F=this.compile(E,P,B);return new Promise(z=>{function rt(){if(F.forEach(function(ct){At.get(ct).currentProgram.isReady()&&F.delete(ct)}),F.size===0){z(E);return}setTimeout(rt,10)}Jt.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let $t=null;function fi(E){$t&&$t(E)}function $n(){Ca.stop()}function cp(){Ca.start()}const Ca=new Ax;Ca.setAnimationLoop(fi),typeof self<"u"&&Ca.setContext(self),this.setAnimationLoop=function(E){$t=E,at.setAnimationLoop(E),E===null?Ca.stop():Ca.start()},at.addEventListener("sessionstart",$n),at.addEventListener("sessionend",cp),this.render=function(E,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(at.cameraAutoUpdate===!0&&at.updateCamera(P),P=at.getCamera()),E.isScene===!0&&E.onBeforeRender(v,E,P,T),m=ht.get(E,g.length),m.init(P),g.push(m),pt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Xt.setFromProjectionMatrix(pt),$=this.localClippingEnabled,X=Pt.init(this.clippingPlanes,$),x=lt.get(E,u.length),x.init(),u.push(x),at.enabled===!0&&at.isPresenting===!0){const rt=v.xr.getDepthSensingMesh();rt!==null&&iu(rt,P,-1/0,v.sortObjects)}iu(E,P,0,v.sortObjects),x.finish(),v.sortObjects===!0&&x.sort(I,tt),Ft=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Ft&&ft.addToRenderList(x,E),this.info.render.frame++,X===!0&&Pt.beginShadows();const B=m.state.shadowsArray;it.render(B,E,P),X===!0&&Pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const F=x.opaque,z=x.transmissive;if(m.setupLights(),P.isArrayCamera){const rt=P.cameras;if(z.length>0)for(let ct=0,gt=rt.length;ct<gt;ct++){const vt=rt[ct];fp(F,z,E,vt)}Ft&&ft.render(E);for(let ct=0,gt=rt.length;ct<gt;ct++){const vt=rt[ct];up(x,E,vt,vt.viewport)}}else z.length>0&&fp(F,z,E,P),Ft&&ft.render(E),up(x,E,P);T!==null&&(_t.updateMultisampleRenderTarget(T),_t.updateRenderTargetMipmap(T)),E.isScene===!0&&E.onAfterRender(v,E,P),Ht.resetDefaultState(),L=-1,b=null,g.pop(),g.length>0?(m=g[g.length-1],X===!0&&Pt.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,u.pop(),u.length>0?x=u[u.length-1]:x=null};function iu(E,P,B,F){if(E.visible===!1)return;if(E.layers.test(P.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(P);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Xt.intersectsSprite(E)){F&&wt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(pt);const ct=et.update(E),gt=E.material;gt.visible&&x.push(E,ct,gt,B,wt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Xt.intersectsObject(E))){const ct=et.update(E),gt=E.material;if(F&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),wt.copy(E.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),wt.copy(ct.boundingSphere.center)),wt.applyMatrix4(E.matrixWorld).applyMatrix4(pt)),Array.isArray(gt)){const vt=ct.groups;for(let Tt=0,Rt=vt.length;Tt<Rt;Tt++){const Mt=vt[Tt],te=gt[Mt.materialIndex];te&&te.visible&&x.push(E,ct,te,B,wt.z,Mt)}}else gt.visible&&x.push(E,ct,gt,B,wt.z,null)}}const rt=E.children;for(let ct=0,gt=rt.length;ct<gt;ct++)iu(rt[ct],P,B,F)}function up(E,P,B,F){const z=E.opaque,rt=E.transmissive,ct=E.transparent;m.setupLightsView(B),X===!0&&Pt.setGlobalState(v.clippingPlanes,B),F&&xt.viewport(S.copy(F)),z.length>0&&Xo(z,P,B),rt.length>0&&Xo(rt,P,B),ct.length>0&&Xo(ct,P,B),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function fp(E,P,B,F){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[F.id]===void 0&&(m.state.transmissionRenderTarget[F.id]=new ar(1,1,{generateMipmaps:!0,type:Jt.has("EXT_color_buffer_half_float")||Jt.has("EXT_color_buffer_float")?Bo:Fi,minFilter:Wa,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ie.workingColorSpace}));const rt=m.state.transmissionRenderTarget[F.id],ct=F.viewport||S;rt.setSize(ct.z,ct.w);const gt=v.getRenderTarget();v.setRenderTarget(rt),v.getClearColor(k),Z=v.getClearAlpha(),Z<1&&v.setClearColor(16777215,.5),v.clear(),Ft&&ft.render(B);const vt=v.toneMapping;v.toneMapping=xa;const Tt=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),m.setupLightsView(F),X===!0&&Pt.setGlobalState(v.clippingPlanes,F),Xo(E,B,F),_t.updateMultisampleRenderTarget(rt),_t.updateRenderTargetMipmap(rt),Jt.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let Mt=0,te=P.length;Mt<te;Mt++){const Se=P[Mt],Me=Se.object,mn=Se.geometry,ee=Se.material,yt=Se.group;if(ee.side===Ti&&Me.layers.test(F.layers)){const We=ee.side;ee.side=fn,ee.needsUpdate=!0,dp(Me,B,F,mn,ee,yt),ee.side=We,ee.needsUpdate=!0,Rt=!0}}Rt===!0&&(_t.updateMultisampleRenderTarget(rt),_t.updateRenderTargetMipmap(rt))}v.setRenderTarget(gt),v.setClearColor(k,Z),Tt!==void 0&&(F.viewport=Tt),v.toneMapping=vt}function Xo(E,P,B){const F=P.isScene===!0?P.overrideMaterial:null;for(let z=0,rt=E.length;z<rt;z++){const ct=E[z],gt=ct.object,vt=ct.geometry,Tt=F===null?ct.material:F,Rt=ct.group;gt.layers.test(B.layers)&&dp(gt,P,B,vt,Tt,Rt)}}function dp(E,P,B,F,z,rt){E.onBeforeRender(v,P,B,F,z,rt),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),z.transparent===!0&&z.side===Ti&&z.forceSinglePass===!1?(z.side=fn,z.needsUpdate=!0,v.renderBufferDirect(B,P,F,z,E,rt),z.side=ba,z.needsUpdate=!0,v.renderBufferDirect(B,P,F,z,E,rt),z.side=Ti):v.renderBufferDirect(B,P,F,z,E,rt),E.onAfterRender(v,P,B,F,z,rt)}function Wo(E,P,B){P.isScene!==!0&&(P=Ot);const F=At.get(E),z=m.state.lights,rt=m.state.shadowsArray,ct=z.state.version,gt=Q.getParameters(E,z.state,rt,P,B),vt=Q.getProgramCacheKey(gt);let Tt=F.programs;F.environment=E.isMeshStandardMaterial?P.environment:null,F.fog=P.fog,F.envMap=(E.isMeshStandardMaterial?M:A).get(E.envMap||F.environment),F.envMapRotation=F.environment!==null&&E.envMap===null?P.environmentRotation:E.envMapRotation,Tt===void 0&&(E.addEventListener("dispose",bt),Tt=new Map,F.programs=Tt);let Rt=Tt.get(vt);if(Rt!==void 0){if(F.currentProgram===Rt&&F.lightsStateVersion===ct)return pp(E,gt),Rt}else gt.uniforms=Q.getUniforms(E),E.onBeforeCompile(gt,v),Rt=Q.acquireProgram(gt,vt),Tt.set(vt,Rt),F.uniforms=gt.uniforms;const Mt=F.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Mt.clippingPlanes=Pt.uniform),pp(E,gt),F.needsLights=zx(E),F.lightsStateVersion=ct,F.needsLights&&(Mt.ambientLightColor.value=z.state.ambient,Mt.lightProbe.value=z.state.probe,Mt.directionalLights.value=z.state.directional,Mt.directionalLightShadows.value=z.state.directionalShadow,Mt.spotLights.value=z.state.spot,Mt.spotLightShadows.value=z.state.spotShadow,Mt.rectAreaLights.value=z.state.rectArea,Mt.ltc_1.value=z.state.rectAreaLTC1,Mt.ltc_2.value=z.state.rectAreaLTC2,Mt.pointLights.value=z.state.point,Mt.pointLightShadows.value=z.state.pointShadow,Mt.hemisphereLights.value=z.state.hemi,Mt.directionalShadowMap.value=z.state.directionalShadowMap,Mt.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Mt.spotShadowMap.value=z.state.spotShadowMap,Mt.spotLightMatrix.value=z.state.spotLightMatrix,Mt.spotLightMap.value=z.state.spotLightMap,Mt.pointShadowMap.value=z.state.pointShadowMap,Mt.pointShadowMatrix.value=z.state.pointShadowMatrix),F.currentProgram=Rt,F.uniformsList=null,Rt}function hp(E){if(E.uniformsList===null){const P=E.currentProgram.getUniforms();E.uniformsList=Jl.seqWithValue(P.seq,E.uniforms)}return E.uniformsList}function pp(E,P){const B=At.get(E);B.outputColorSpace=P.outputColorSpace,B.batching=P.batching,B.batchingColor=P.batchingColor,B.instancing=P.instancing,B.instancingColor=P.instancingColor,B.instancingMorph=P.instancingMorph,B.skinning=P.skinning,B.morphTargets=P.morphTargets,B.morphNormals=P.morphNormals,B.morphColors=P.morphColors,B.morphTargetsCount=P.morphTargetsCount,B.numClippingPlanes=P.numClippingPlanes,B.numIntersection=P.numClipIntersection,B.vertexAlphas=P.vertexAlphas,B.vertexTangents=P.vertexTangents,B.toneMapping=P.toneMapping}function Ox(E,P,B,F,z){P.isScene!==!0&&(P=Ot),_t.resetTextureUnits();const rt=P.fog,ct=F.isMeshStandardMaterial?P.environment:null,gt=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Ra,vt=(F.isMeshStandardMaterial?M:A).get(F.envMap||ct),Tt=F.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Rt=!!B.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Mt=!!B.morphAttributes.position,te=!!B.morphAttributes.normal,Se=!!B.morphAttributes.color;let Me=xa;F.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(Me=v.toneMapping);const mn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ee=mn!==void 0?mn.length:0,yt=At.get(F),We=m.state.lights;if(X===!0&&($===!0||E!==b)){const Dn=E===b&&F.id===L;Pt.setState(F,E,Dn)}let ne=!1;F.version===yt.__version?(yt.needsLights&&yt.lightsStateVersion!==We.state.version||yt.outputColorSpace!==gt||z.isBatchedMesh&&yt.batching===!1||!z.isBatchedMesh&&yt.batching===!0||z.isBatchedMesh&&yt.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&yt.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&yt.instancing===!1||!z.isInstancedMesh&&yt.instancing===!0||z.isSkinnedMesh&&yt.skinning===!1||!z.isSkinnedMesh&&yt.skinning===!0||z.isInstancedMesh&&yt.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&yt.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&yt.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&yt.instancingMorph===!1&&z.morphTexture!==null||yt.envMap!==vt||F.fog===!0&&yt.fog!==rt||yt.numClippingPlanes!==void 0&&(yt.numClippingPlanes!==Pt.numPlanes||yt.numIntersection!==Pt.numIntersection)||yt.vertexAlphas!==Tt||yt.vertexTangents!==Rt||yt.morphTargets!==Mt||yt.morphNormals!==te||yt.morphColors!==Se||yt.toneMapping!==Me||yt.morphTargetsCount!==ee)&&(ne=!0):(ne=!0,yt.__version=F.version);let kn=yt.currentProgram;ne===!0&&(kn=Wo(F,P,z));let fr=!1,gn=!1,au=!1;const Ce=kn.getUniforms(),ki=yt.uniforms;if(xt.useProgram(kn.program)&&(fr=!0,gn=!0,au=!0),F.id!==L&&(L=F.id,gn=!0),fr||b!==E){Ce.setValue(C,"projectionMatrix",E.projectionMatrix),Ce.setValue(C,"viewMatrix",E.matrixWorldInverse);const Dn=Ce.map.cameraPosition;Dn!==void 0&&Dn.setValue(C,ut.setFromMatrixPosition(E.matrixWorld)),Zt.logarithmicDepthBuffer&&Ce.setValue(C,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Ce.setValue(C,"isOrthographic",E.isOrthographicCamera===!0),b!==E&&(b=E,gn=!0,au=!0)}if(z.isSkinnedMesh){Ce.setOptional(C,z,"bindMatrix"),Ce.setOptional(C,z,"bindMatrixInverse");const Dn=z.skeleton;Dn&&(Dn.boneTexture===null&&Dn.computeBoneTexture(),Ce.setValue(C,"boneTexture",Dn.boneTexture,_t))}z.isBatchedMesh&&(Ce.setOptional(C,z,"batchingTexture"),Ce.setValue(C,"batchingTexture",z._matricesTexture,_t),Ce.setOptional(C,z,"batchingIdTexture"),Ce.setValue(C,"batchingIdTexture",z._indirectTexture,_t),Ce.setOptional(C,z,"batchingColorTexture"),z._colorsTexture!==null&&Ce.setValue(C,"batchingColorTexture",z._colorsTexture,_t));const ru=B.morphAttributes;if((ru.position!==void 0||ru.normal!==void 0||ru.color!==void 0)&&qt.update(z,B,kn),(gn||yt.receiveShadow!==z.receiveShadow)&&(yt.receiveShadow=z.receiveShadow,Ce.setValue(C,"receiveShadow",z.receiveShadow)),F.isMeshGouraudMaterial&&F.envMap!==null&&(ki.envMap.value=vt,ki.flipEnvMap.value=vt.isCubeTexture&&vt.isRenderTargetTexture===!1?-1:1),F.isMeshStandardMaterial&&F.envMap===null&&P.environment!==null&&(ki.envMapIntensity.value=P.environmentIntensity),gn&&(Ce.setValue(C,"toneMappingExposure",v.toneMappingExposure),yt.needsLights&&Px(ki,au),rt&&F.fog===!0&&St.refreshFogUniforms(ki,rt),St.refreshMaterialUniforms(ki,F,H,N,m.state.transmissionRenderTarget[E.id]),Jl.upload(C,hp(yt),ki,_t)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Jl.upload(C,hp(yt),ki,_t),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Ce.setValue(C,"center",z.center),Ce.setValue(C,"modelViewMatrix",z.modelViewMatrix),Ce.setValue(C,"normalMatrix",z.normalMatrix),Ce.setValue(C,"modelMatrix",z.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Dn=F.uniformsGroups;for(let su=0,Ix=Dn.length;su<Ix;su++){const mp=Dn[su];ye.update(mp,kn),ye.bind(mp,kn)}}return kn}function Px(E,P){E.ambientLightColor.needsUpdate=P,E.lightProbe.needsUpdate=P,E.directionalLights.needsUpdate=P,E.directionalLightShadows.needsUpdate=P,E.pointLights.needsUpdate=P,E.pointLightShadows.needsUpdate=P,E.spotLights.needsUpdate=P,E.spotLightShadows.needsUpdate=P,E.rectAreaLights.needsUpdate=P,E.hemisphereLights.needsUpdate=P}function zx(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(E,P,B){At.get(E.texture).__webglTexture=P,At.get(E.depthTexture).__webglTexture=B;const F=At.get(E);F.__hasExternalTextures=!0,F.__autoAllocateDepthBuffer=B===void 0,F.__autoAllocateDepthBuffer||Jt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),F.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,P){const B=At.get(E);B.__webglFramebuffer=P,B.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(E,P=0,B=0){T=E,w=P,R=B;let F=!0,z=null,rt=!1,ct=!1;if(E){const vt=At.get(E);vt.__useDefaultFramebuffer!==void 0?(xt.bindFramebuffer(C.FRAMEBUFFER,null),F=!1):vt.__webglFramebuffer===void 0?_t.setupRenderTarget(E):vt.__hasExternalTextures&&_t.rebindTextures(E,At.get(E.texture).__webglTexture,At.get(E.depthTexture).__webglTexture);const Tt=E.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ct=!0);const Rt=At.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Rt[P])?z=Rt[P][B]:z=Rt[P],rt=!0):E.samples>0&&_t.useMultisampledRTT(E)===!1?z=At.get(E).__webglMultisampledFramebuffer:Array.isArray(Rt)?z=Rt[B]:z=Rt,S.copy(E.viewport),D.copy(E.scissor),W=E.scissorTest}else S.copy(nt).multiplyScalar(H).floor(),D.copy(dt).multiplyScalar(H).floor(),W=Lt;if(xt.bindFramebuffer(C.FRAMEBUFFER,z)&&F&&xt.drawBuffers(E,z),xt.viewport(S),xt.scissor(D),xt.setScissorTest(W),rt){const vt=At.get(E.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+P,vt.__webglTexture,B)}else if(ct){const vt=At.get(E.texture),Tt=P||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,vt.__webglTexture,B||0,Tt)}L=-1},this.readRenderTargetPixels=function(E,P,B,F,z,rt,ct){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=At.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){xt.bindFramebuffer(C.FRAMEBUFFER,gt);try{const vt=E.texture,Tt=vt.format,Rt=vt.type;if(!Zt.textureFormatReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Zt.textureTypeReadable(Rt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=E.width-F&&B>=0&&B<=E.height-z&&C.readPixels(P,B,F,z,Dt.convert(Tt),Dt.convert(Rt),rt)}finally{const vt=T!==null?At.get(T).__webglFramebuffer:null;xt.bindFramebuffer(C.FRAMEBUFFER,vt)}}},this.readRenderTargetPixelsAsync=async function(E,P,B,F,z,rt,ct){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=At.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ct!==void 0&&(gt=gt[ct]),gt){xt.bindFramebuffer(C.FRAMEBUFFER,gt);try{const vt=E.texture,Tt=vt.format,Rt=vt.type;if(!Zt.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Zt.textureTypeReadable(Rt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=E.width-F&&B>=0&&B<=E.height-z){const Mt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Mt),C.bufferData(C.PIXEL_PACK_BUFFER,rt.byteLength,C.STREAM_READ),C.readPixels(P,B,F,z,Dt.convert(Tt),Dt.convert(Rt),0),C.flush();const te=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);await tb(C,te,4);try{C.bindBuffer(C.PIXEL_PACK_BUFFER,Mt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,rt)}finally{C.deleteBuffer(Mt),C.deleteSync(te)}return rt}}finally{const vt=T!==null?At.get(T).__webglFramebuffer:null;xt.bindFramebuffer(C.FRAMEBUFFER,vt)}}},this.copyFramebufferToTexture=function(E,P=null,B=0){E.isTexture!==!0&&(lo("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,E=arguments[1]);const F=Math.pow(2,-B),z=Math.floor(E.image.width*F),rt=Math.floor(E.image.height*F),ct=P!==null?P.x:0,gt=P!==null?P.y:0;_t.setTexture2D(E,0),C.copyTexSubImage2D(C.TEXTURE_2D,B,0,0,ct,gt,z,rt),xt.unbindTexture()},this.copyTextureToTexture=function(E,P,B=null,F=null,z=0){E.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture function signature has changed."),F=arguments[0]||null,E=arguments[1],P=arguments[2],z=arguments[3]||0,B=null);let rt,ct,gt,vt,Tt,Rt;B!==null?(rt=B.max.x-B.min.x,ct=B.max.y-B.min.y,gt=B.min.x,vt=B.min.y):(rt=E.image.width,ct=E.image.height,gt=0,vt=0),F!==null?(Tt=F.x,Rt=F.y):(Tt=0,Rt=0);const Mt=Dt.convert(P.format),te=Dt.convert(P.type);_t.setTexture2D(P,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,P.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,P.unpackAlignment);const Se=C.getParameter(C.UNPACK_ROW_LENGTH),Me=C.getParameter(C.UNPACK_IMAGE_HEIGHT),mn=C.getParameter(C.UNPACK_SKIP_PIXELS),ee=C.getParameter(C.UNPACK_SKIP_ROWS),yt=C.getParameter(C.UNPACK_SKIP_IMAGES),We=E.isCompressedTexture?E.mipmaps[z]:E.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,We.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,We.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,gt),C.pixelStorei(C.UNPACK_SKIP_ROWS,vt),E.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,z,Tt,Rt,rt,ct,Mt,te,We.data):E.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,z,Tt,Rt,We.width,We.height,Mt,We.data):C.texSubImage2D(C.TEXTURE_2D,z,Tt,Rt,rt,ct,Mt,te,We),C.pixelStorei(C.UNPACK_ROW_LENGTH,Se),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Me),C.pixelStorei(C.UNPACK_SKIP_PIXELS,mn),C.pixelStorei(C.UNPACK_SKIP_ROWS,ee),C.pixelStorei(C.UNPACK_SKIP_IMAGES,yt),z===0&&P.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),xt.unbindTexture()},this.copyTextureToTexture3D=function(E,P,B=null,F=null,z=0){E.isTexture!==!0&&(lo("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,F=arguments[1]||null,E=arguments[2],P=arguments[3],z=arguments[4]||0);let rt,ct,gt,vt,Tt,Rt,Mt,te,Se;const Me=E.isCompressedTexture?E.mipmaps[z]:E.image;B!==null?(rt=B.max.x-B.min.x,ct=B.max.y-B.min.y,gt=B.max.z-B.min.z,vt=B.min.x,Tt=B.min.y,Rt=B.min.z):(rt=Me.width,ct=Me.height,gt=Me.depth,vt=0,Tt=0,Rt=0),F!==null?(Mt=F.x,te=F.y,Se=F.z):(Mt=0,te=0,Se=0);const mn=Dt.convert(P.format),ee=Dt.convert(P.type);let yt;if(P.isData3DTexture)_t.setTexture3D(P,0),yt=C.TEXTURE_3D;else if(P.isDataArrayTexture||P.isCompressedArrayTexture)_t.setTexture2DArray(P,0),yt=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,P.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,P.unpackAlignment);const We=C.getParameter(C.UNPACK_ROW_LENGTH),ne=C.getParameter(C.UNPACK_IMAGE_HEIGHT),kn=C.getParameter(C.UNPACK_SKIP_PIXELS),fr=C.getParameter(C.UNPACK_SKIP_ROWS),gn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Me.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Me.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,vt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Tt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Rt),E.isDataTexture||E.isData3DTexture?C.texSubImage3D(yt,z,Mt,te,Se,rt,ct,gt,mn,ee,Me.data):P.isCompressedArrayTexture?C.compressedTexSubImage3D(yt,z,Mt,te,Se,rt,ct,gt,mn,Me.data):C.texSubImage3D(yt,z,Mt,te,Se,rt,ct,gt,mn,ee,Me),C.pixelStorei(C.UNPACK_ROW_LENGTH,We),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,ne),C.pixelStorei(C.UNPACK_SKIP_PIXELS,kn),C.pixelStorei(C.UNPACK_SKIP_ROWS,fr),C.pixelStorei(C.UNPACK_SKIP_IMAGES,gn),z===0&&P.generateMipmaps&&C.generateMipmap(yt),xt.unbindTexture()},this.initRenderTarget=function(E){At.get(E).__webglFramebuffer===void 0&&_t.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?_t.setTextureCube(E,0):E.isData3DTexture?_t.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?_t.setTexture2DArray(E,0):_t.setTexture2D(E,0),xt.unbindTexture()},this.resetState=function(){w=0,R=0,T=null,xt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=t===sp?"display-p3":"srgb",n.unpackColorSpace=ie.workingColorSpace===tu?"display-p3":"srgb"}}class fR extends Rn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:$h}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=$h);const dR=({topColor:e="#8b5cf6",bottomColor:t="#d4af37",intensity:n=1,rotationSpeed:i=.3,interactive:a=!1,className:r="",glowAmount:s=.005,pillarWidth:o=3,pillarHeight:l=.4,noiseIntensity:c=.25,mixBlendMode:d="screen",pillarRotation:h=25,quality:f="high"})=>{const p=Bt.useRef(null),_=Bt.useRef(null),x=Bt.useRef(null),m=Bt.useRef(null),u=Bt.useRef(null),g=Bt.useRef(null),v=Bt.useRef(null),y=Bt.useRef(new Yt(0,0)),w=Bt.useRef(0),[R,T]=Bt.useState(!0);return Bt.useEffect(()=>{const L=document.createElement("canvas");L.getContext("webgl")||L.getContext("experimental-webgl")||T(!1)},[]),Bt.useEffect(()=>{if(!p.current||!R)return;const L=p.current,b=L.clientWidth,S=L.clientHeight,D=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),W=D||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let k=f;W&&f==="high"&&(k="medium"),D&&f!=="low"&&(k="low");const Z={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},j=Z[k]||Z.medium,N=new fR;u.current=N;const H=new Rx(-1,1,1,-1,0,1);g.current=H;let I;try{I=new uR({antialias:!1,alpha:!0,powerPreference:k==="low"?"low-power":"high-performance",precision:j.precision,stencil:!1,depth:!1})}catch(_t){console.error("Failed to create WebGL renderer:",_t),T(!1);return}I.setSize(b,S),I.setPixelRatio(j.pixelRatio),L.appendChild(I.domElement),x.current=I;const tt=_t=>{const A=new se(_t);return new V(A.r,A.g,A.b)},nt=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,dt=`
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin[4];
      uniform float uWaveCos[4];
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;
      const float E = 2.71828182845904523536;

      float noise(vec2 coord) {
        vec2 r = (E * sin(E * coord));
        return fract(r.x * r.y * (1.0 + coord.x));
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        // Apply 2D rotation to UV coordinates using pre-computed values
        uv = vec2(
          uv.x * uPillarRotCos - uv.y * uPillarRotSin,
          uv.x * uPillarRotSin + uv.y * uPillarRotCos
        );

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));

        float maxDepth = 50.0;
        float depth = 0.1;

        // Use pre-computed rotation values (or mouse-based)
        float rotCos = uRotCos;
        float rotSin = uRotSin;
        if(uInteractive && length(uMouse) > 0.0) {
          float mouseAngle = uMouse.x * PI * 2.0;
          rotCos = cos(mouseAngle);
          rotSin = sin(mouseAngle);
        }

        vec3 color = vec3(0.0);
        
        const int ITERATIONS = ${j.iterations};
        const int WAVE_ITERATIONS = ${j.waveIterations};
        const float STEP_MULT = ${j.stepMultiplier.toFixed(1)};
        
        for(int i = 0; i < ITERATIONS; i++) {
          vec3 pos = origin + direction * depth;
          
          // Inline rotation: pos.xz *= rotMat
          float newX = pos.x * rotCos - pos.z * rotSin;
          float newZ = pos.x * rotSin + pos.z * rotCos;
          pos.x = newX;
          pos.z = newZ;

          // Apply vertical scaling and wave deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = deformed + vec3(0.0, uTime, 0.0);
          
          // Inlined wave deformation
          float frequency = 1.0;
          float amplitude = 1.0;
          for(int j = 0; j < WAVE_ITERATIONS; j++) {
            // Inline rotation: deformed.xz *= rot(0.4) using pre-computed
            float wx = deformed.x * uWaveCos[j] - deformed.z * uWaveSin[j];
            float wz = deformed.x * uWaveSin[j] + deformed.z * uWaveCos[j];
            deformed.x = wx;
            deformed.z = wz;
            
            float phase = uTime * float(j) * 2.0;
            vec3 oscillation = cos(deformed.zxy * frequency - phase);
            deformed += oscillation * amplitude;
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          
          // Calculate distance field using cosine pattern
          vec2 cosinePair = cos(deformed.xz);
          float fieldDistance = length(cosinePair) - 0.2;
          
          // Radial boundary constraint (inlined blendMax)
          float radialBound = length(pos.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(-radialBound - (-fieldDistance)), 0.0);
          fieldDistance = -(min(-radialBound, -fieldDistance) - h * h * 0.25 / k);
          
          fieldDistance = abs(fieldDistance) * 0.15 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, pos.y));
          color += gradient / fieldDistance;

          if(fieldDistance < EPSILON || depth > maxDepth) break;
          depth += fieldDistance * STEP_MULT;
        }

        // Normalize by pillar width to maintain consistent glow regardless of size
        float widthNormalization = uPillarWidth / 3.0;
        color = tanh(color * uGlowAmount / widthNormalization);
        
        // Add noise postprocessing
        float rnd = noise(gl_FragCoord.xy);
        color -= rnd / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `,Lt=.4,Xt=new Float32Array(4),X=new Float32Array(4);for(let _t=0;_t<4;_t++)Xt[_t]=Math.sin(Lt),X[_t]=Math.cos(Lt);const $=h*Math.PI/180,pt=Math.cos($),ut=Math.sin($),wt=new Gi({vertexShader:nt,fragmentShader:dt,uniforms:{uTime:{value:0},uResolution:{value:new Yt(b,S)},uMouse:{value:y.current},uTopColor:{value:tt(e)},uBottomColor:{value:tt(t)},uIntensity:{value:n},uInteractive:{value:a},uGlowAmount:{value:s},uPillarWidth:{value:o},uPillarHeight:{value:l},uNoiseIntensity:{value:c},uPillarRotation:{value:h},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:pt},uPillarRotSin:{value:ut},uWaveSin:{value:Xt},uWaveCos:{value:X}},transparent:!0,depthWrite:!1,depthTest:!1});m.current=wt;const Ot=new ko(2,2);v.current=Ot;const Ft=new si(Ot,wt);N.add(Ft);let ue=null;const C=_t=>{if(!a||ue)return;ue=window.setTimeout(()=>{ue=null},16);const A=L.getBoundingClientRect(),M=(_t.clientX-A.left)/A.width*2-1,G=-((_t.clientY-A.top)/A.height)*2+1;y.current.set(M,G)};a&&L.addEventListener("mousemove",C,{passive:!0});let xe=performance.now();const Zt=1e3/(k==="low"?30:60),xt=_t=>{if(!m.current||!x.current||!u.current||!g.current)return;const A=_t-xe;if(A>=Zt){w.current+=.016*i,m.current.uniforms.uTime.value=w.current;const M=w.current*.3;m.current.uniforms.uRotCos.value=Math.cos(M),m.current.uniforms.uRotSin.value=Math.sin(M),x.current.render(u.current,g.current),xe=_t-A%Zt}_.current=requestAnimationFrame(xt)};_.current=requestAnimationFrame(xt);let ve=null;const At=()=>{ve&&clearTimeout(ve),ve=window.setTimeout(()=>{if(!x.current||!m.current||!p.current)return;const _t=p.current.clientWidth,A=p.current.clientHeight;x.current.setSize(_t,A),m.current.uniforms.uResolution.value.set(_t,A)},150)};return window.addEventListener("resize",At,{passive:!0}),()=>{window.removeEventListener("resize",At),a&&L.removeEventListener("mousemove",C),_.current&&cancelAnimationFrame(_.current),x.current&&(x.current.dispose(),x.current.forceContextLoss(),L.contains(x.current.domElement)&&L.removeChild(x.current.domElement)),m.current&&m.current.dispose(),v.current&&v.current.dispose(),x.current=null,m.current=null,u.current=null,g.current=null,v.current=null,_.current=null}},[e,t,n,i,a,s,o,l,c,h,R,f]),R?U.jsx("div",{ref:p,className:`w-full h-full absolute top-0 left-0 ${r}`,style:{mixBlendMode:d}}):U.jsx("div",{className:`w-full h-full absolute top-0 left-0 flex items-center justify-center bg-black/10 text-gray-500 text-sm ${r}`,style:{mixBlendMode:d},children:"WebGL not supported"})},hR=`
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(40px); filter: blur(10px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
  @keyframes fade-in-left {
    from { opacity: 0; transform: translateX(-40px); filter: blur(10px); }
    to { opacity: 1; transform: translateX(0); filter: blur(0); }
  }
  @keyframes fade-in-right {
    from { opacity: 0; transform: translateX(40px); filter: blur(10px); }
    to { opacity: 1; transform: translateX(0); filter: blur(0); }
  }

  /* Animations - slower, more cinematic */
  .animate-enter-title { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards; opacity: 0; }
  .animate-enter-sub { animation: fade-in-up 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s forwards; opacity: 0; }
  .animate-enter-left { animation: fade-in-left 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s forwards; opacity: 0; }
  .animate-enter-right { animation: fade-in-right 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s forwards; opacity: 0; }
  
  /* Mobile override */
  @media (max-width: 768px) {
    .animate-enter-left, .animate-enter-right { animation-name: fade-in-up; }
  }
`,Ul="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-200 bg-black/40 px-2 py-1 rounded-full border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm",Xg="h-px w-6 bg-white/10",pR=({onExitComplete:e})=>{const[t,n]=Bt.useState(!1),i=Bt.useRef(null);Bt.useEffect(()=>()=>{i.current!==null&&(window.clearTimeout(i.current),i.current=null)},[]);const a=()=>{n(!0),i.current!==null&&window.clearTimeout(i.current),i.current=window.setTimeout(()=>{localStorage.setItem("portfolio_last_visit",new Date().toISOString()),e()},800)};return U.jsxs("div",{className:"relative min-h-screen bg-[#050505] text-zinc-100 overflow-hidden font-sans antialiased selection:bg-cyan-500/30",children:[U.jsx("style",{children:hR}),U.jsxs("div",{className:"absolute inset-0 z-0 pointer-events-none",children:[U.jsx("div",{className:"absolute inset-0 opacity-15 mix-blend-soft-light",style:{backgroundImage:"url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop)",backgroundSize:"cover",backgroundPosition:"center"}}),U.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black via-zinc-950/50 to-black"})]}),U.jsx("div",{className:"absolute inset-0 z-0 pointer-events-none overflow-visible",children:U.jsx("div",{className:"relative w-screen h-screen overflow-visible",children:U.jsx(dR,{intensity:1,rotationSpeed:.3,glowAmount:.002,pillarWidth:3,pillarHeight:.4,noiseIntensity:.25,pillarRotation:25,interactive:!1,mixBlendMode:"screen",quality:"high"})})}),U.jsxs("main",{className:`relative z-10 w-full min-h-screen max-w-7xl mx-auto px-6 py-12 flex flex-col justify-between 
        transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] 
        ${t?"opacity-0 scale-95 blur-xl":"opacity-100 scale-100 blur-0"}`,children:[U.jsxs("div",{className:"w-full flex justify-between items-start animate-enter-left",children:[U.jsx("div",{className:Ul,children:"Benjamin P. Haddon"}),U.jsxs("div",{className:`${Ul} hidden md:block`,children:["System Status:"," ",U.jsx("span",{className:"text-zinc-100 drop-shadow-[0_0_5px_rgba(255,255,255,0.35)]",children:"Online"})]})]}),U.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center text-center -mt-12",children:[U.jsx("div",{className:"animate-enter-title relative z-20",children:U.jsxs("h1",{className:"text-4xl md:text-7xl font-sans font-light tracking-tight text-white leading-[1.1] drop-shadow-2xl",children:["An interactive portfolio,",U.jsx("br",{}),U.jsx("span",{className:"font-serif italic text-white/80",children:"searching for meaning."})]})}),U.jsx("div",{className:"mt-16 animate-enter-sub flex items-center justify-center",children:U.jsxs("button",{onClick:a,className:`group relative px-10 py-5 rounded-full 
                         bg-white/5 hover:bg-white/10 
                         backdrop-blur-xl hover:backdrop-blur-2xl
                         border border-white/10 hover:border-white/20
                         shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_8px_40px_-10px_rgba(0,0,0,0.5)]
                         hover:shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_0_40px_-5px_rgba(255,255,255,0.1)]
                         transition-all duration-500 ease-out transform hover:-translate-y-1`,children:[U.jsxs("div",{className:"flex items-center justify-center gap-4",children:[U.jsx("span",{className:"text-xs font-bold tracking-[0.25em] uppercase text-zinc-200 group-hover:text-white transition-colors",children:"View Portfolio"}),U.jsx(nE,{className:"w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"})]}),U.jsx("div",{className:"absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"})]})})]}),U.jsxs("div",{className:"w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-end",children:[U.jsxs("div",{className:"md:col-span-3 animate-enter-left flex flex-col gap-3",children:[U.jsxs("div",{className:"flex items-center gap-3",children:[U.jsx("div",{className:Xg}),U.jsx("span",{className:Ul,children:"Context"})]}),U.jsxs("p",{className:"text-sm text-zinc-300 font-light leading-relaxed",children:["Mythic frameworks for meaning-making. ",U.jsx("br",{})," Progressive web apps that respect attention. ",U.jsx("br",{})," Psychological lenses distilling experience."]})]}),U.jsx("div",{className:"hidden md:block md:col-span-6"}),U.jsxs("div",{className:"md:col-span-3 animate-enter-right flex flex-col gap-3 text-left md:text-right md:items-end",children:[U.jsxs("div",{className:"flex items-center gap-3 md:flex-row-reverse",children:[U.jsx("div",{className:Xg}),U.jsx("span",{className:Ul,children:"Protocol"})]}),U.jsxs("p",{className:"text-sm text-zinc-300 font-light leading-relaxed",children:["AI-scaffolded, human-directed. ",U.jsx("br",{})," Idea · Vision · Prototype · Portfolio-piece"," ",U.jsx("br",{})," Acceleration without abdication."]})]})]})]})]})};console.log("%c Benjamin P. Haddon Portfolio","font-size: 14px; font-weight: bold; color: #d4af37;");console.log("%c v3.6.0","font-size: 12px; color: #888; margin-bottom: 10px;");const mR=7,Nx="portfolio_last_visit";function gR(){if(new URLSearchParams(window.location.search).get("onboarding")==="true")return!0;const t=localStorage.getItem(Nx);if(!t)return!0;try{const n=new Date(t);return(new Date().getTime()-n.getTime())/(1e3*60*60*24)>mR}catch(n){return console.warn("Error parsing last visit timestamp:",n),!0}}async function vR(){const e=gR();e||localStorage.setItem(Nx,new Date().toISOString());const t=e?U.jsx(_R,{}):U.jsx("div",{className:"min-h-screen opacity-100",children:U.jsx(J0,{})});PM.createRoot(document.getElementById("root")).render(U.jsx(co.StrictMode,{children:t}))}vR();function _R(){const[e,t]=co.useState(!1),[n,i]=co.useState(!1),a=()=>{t(!0),requestAnimationFrame(()=>i(!0))};return U.jsxs("div",{className:"min-h-screen",children:[!e&&U.jsx(pR,{onExitComplete:a}),e?U.jsx("div",{className:`min-h-screen transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${n?"opacity-100":"opacity-0"}`,children:U.jsx(J0,{})}):null]})}
