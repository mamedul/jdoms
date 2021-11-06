/*!
* jDoms JavaScript Library
* https://mamedul.gitlab.io/dev-projects/jdoms
*
* Copyright (c) 2021 by MAMEDUL ISLAM
*
* Licensed under the MIT license:
*   https://opensource.org/licenses/MIT
*
* Project home:
*   https://mamedul.gitlab.io/dev-projects/jdoms
* 
* Version: 1.0.0
*/
(function (global, factory) {

	'use strict';

	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = global.document ?
			factory(global, true) :
			function (win) {
				if (!win.document) {
					throw new Error("jDoms requires a document which has a window");
				}
				return factory(win);
			};
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
		factory(global);
	} else {
		factory(global);
	}

	if( typeof global !== "undefined" ){
		global = window||globalThis||self||this;
	}

	global.jDoms = factory();

}((typeof window !== "undefined" ? window||globalThis : this||self), (function () {

	'use strict';

	var version = "1.0.0",
		developer = "MAMEDUL ISLAM";

	/* Important polyfills */
	if(typeof String.prototype.trim !== 'function') {
		String.prototype.trim = function() {
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	
	if (!Array.prototype.filter) {
		Array.prototype.filter = function(fun) {
			var len = this.length >>> 0;
			if (typeof fun != "function") {
				throw new TypeError();
			}
			var res = [];
			var thisP = arguments[1]; 
			for (var i = 0; i < len; i++) {
				if (i in this) {
					var val = this[i];
					if (fun.call(thisP, val, i, this)) {
						res.push(val);
					}
				}
			}
			return res;
		};
	}

	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function(obj, start) {
			 for (var i = (start || 0), j = this.length; i < j; i++) {
				 if (this[i] === obj) { return i; }
			 }
			 return -1;
		};
	}

	/* Inside global functions */
	
	var _isUndefined = function(variable){
		return (typeof variable==="undefined");
	};

	var _isSet = function(variable){
		return (typeof variable!=="undefined");
	};

	var _isString = function(variable){
		return (typeof variable==="string");
	};

	var _isNumber = function(variable){
		return (typeof variable==="number");
	};

	var _isFinite = function(variable){
		return isFinite(variable);
	};

	var _isInfinity = function(variable){
		return  (typeof variable==="number" && !isFinite(variable));
	};

	var _isBoolean = function(variable){
		return (typeof variable==="boolean");
	};

	var _isBigInt = function(variable){
		return (typeof variable==="bigint");
	};

	var _isFlatten = function(variable){
		return (typeof variable==="string" || typeof variable==="number" || typeof variable==="boolean");
	};
	
	var _isEmpty = function(variable){
		if( typeof variable==='undefined'||variable===""||variable===0||variable===[]||variable==={}||variable===false||variable===null||isNaN(variable)||variable===function(){}){ return true; }
		return false;
	};

	var _isArray = function(variable){
		if(typeof Array!="undefined" && typeof Array.isArray!="undefined" ){ return Array.isArray(variable); }
		if(variable.constructor && variable.constructor.name && variable.constructor.name=="Array"){ return true; }
		if(typeof Object!="undefined" &&  Object.prototype && Object.prototype.toString && Object.prototype.toString.call && Object.prototype.toString.call(variable)=="[object Array]" );{ return true; }
		return false;
	};

	var _isFunction = function(variable){
		return (typeof variable==="function");
	};

	var _isObject = function(variable){
		return (typeof variable==="object");
	};

	var _isPureObject = function(variable){
		return (typeof variable==="object" && typeof Object!="undefined" && variable===Object(variable) );
	};
	
	var _isSymbol = function(variable){
		return (typeof variable==="undefined");
	};

	var _isjDoms = function(variable){
		return ( (typeof variable==="function" && variable.name=="jDoms") || (typeof variable==="object" && typeof variable.constructor!="undefined" && typeof variable.constructor.name!="undefined" && variable.constructor.name=='jDoms') );
	};

	var _sizeOf = function(variable){
		var _size = 0;
		if(typeof variable=="boolean"||typeof variable=="function"||typeof variable=="symbol"){ 
			_size = 1;
		}else if(typeof variable=="bigint"){
			if(typeof BigInt == "function" && typeof BigInt.valueOf == "function"){
				_size = (""+BigInt(variable).valueOf()).length;
			}else{
				_size = (""+variable).length + 1;
			}
		}else if(typeof variable=="string"||typeof variable=="number"){
			_size = (""+variable).length;
		}else if(typeof variable=="object"){
			if(typeof Object=="function" && typeof Object.keys=="function"){
				_size = Object.keys(variable).length;
			}
			if(_size==0){
				var key;
				for (key in variable) {
					if (variable.hasOwnProperty(key)){ _size++; }else{ continue; }
				}
			}
			if(_size==0 && typeof variable.nodeName!="undefined" && typeof variable.nodeType!="undefined" && typeof variable.nodeValue!="undefined" ){
				_size++;
			}
		}
		return _size;
	};

	var _now = function(){
		return (new Date()).getTime();
	};

	var _trim = function(str){
		try{
			if(_isString(str)){
				if(str.trim){
					return str.trim();
				}else{
					return str.replace(/^\s+|\s+$/gm,'');
				}
			}else if( _isArray(str) || _isObject(str) ){
				for(var key in str ){
					str[key] = _trim(str[key]);
				}
				return str;
			}
		}catch(err){}
		return str;
	};

	var _unique = function (arr) {
		if(_isArray(arr)){
			arr = arr.filter(function (v, i, a) { return a.indexOf(v) === i; });
		}else if(_isString(arr) ||_isNumber(arr)){
			var new_str = "";
			arr = "" + arr;
			for(var i=0; i<arr.length; i++){
				if(new_str.indexOf(arr[i])<0){ new_str+=arr[i]; }
			}
			return new_str;
		}
		return arr;
	};

	var _merge = function (obj, nextObj) {
		if(_isObject(obj) && _isObject(nextObj)){
			for (var p in nextObj) {
				try {
					if ( nextObj[p].constructor==Object ) {
						obj[p] = MergeRecursive(obj[p], nextObj[p]);
					} else {
						obj[p] = nextObj[p];
					}
				} catch(e) {
					obj[p] = nextObj[p];
				}
			}
		}
		return obj;
	};

	var _escape = function(str){
		try{
			return encodeURI(str);
		}catch(err){}
		return "";
	};

	var _unescape = function(str){
		try{
			return decodeURI(str);
		}catch(err){}
		return str;
	};

	var _encodeBase64 = function( rawStr ){
		if(_isSet(btoa)){ return btoa(rawStr); }
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var _utf8_encode = function (string) {
			string = string.replace(/\r\n/g,"\n");
			var utfText = "";
			for (var n = 0; n < string.length; n++) {
				var c = string.charCodeAt(n);
				if (c < 128) {
					utfText += String.fromCharCode(c);
				}else if((c > 127) && (c < 2048)) {
					utfText += String.fromCharCode((c >> 6) | 192);
					utfText += String.fromCharCode((c & 63) | 128);
				}else {
					utfText += String.fromCharCode((c >> 12) | 224);
					utfText += String.fromCharCode(((c >> 6) & 63) | 128);
					utfText += String.fromCharCode((c & 63) | 128);
				}
			}
			return utfText;
		};
		var _encode = function (str) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			str = _utf8_encode(str);
			while (i < str.length) {

				chr1 = str.charCodeAt(i++);
				chr2 = str.charCodeAt(i++);
				chr3 = str.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
			}
			return output;
		};
		return _encode (rawStr);
	};

	var _decodeBase64 = function( encodedStr ){
		if(_isSet(atob)){ return atob(encodedStr); }
		var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var _utf8_decode = function (utfText) {
			var string = "";
			var i = 0;
			var c = 0, c1 = 0, c2 = 0;
			while ( i < utfText.length ) {
				c = utfText.charCodeAt(i);
				if (c < 128) {
					string += String.fromCharCode(c);
					i++;
				}else if((c > 191) && (c < 224)) {
					c2 = utfText.charCodeAt(i+1);
					string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
					i += 2;
				}else {
					c2 = utfText.charCodeAt(i+1);
					c3 = utfText.charCodeAt(i+2);
					string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
					i += 3;
				}
			}
			return string;
		};

		var _decode = function (str) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			str = str.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < str.length) {
				enc1 = _keyStr.indexOf(str.charAt(i++));
				enc2 = _keyStr.indexOf(str.charAt(i++));
				enc3 = _keyStr.indexOf(str.charAt(i++));
				enc4 = _keyStr.indexOf(str.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) { output = output + String.fromCharCode(chr2);}
				if (enc4 != 64) { output = output + String.fromCharCode(chr3);}
			}
			output = _utf8_decode(output);
			return output;
		};
		return _decode (encodedStr);
	};
		
	var _stringify = function() {
		function e(e) {
			return c.lastIndex = 0, c.test(e) ? '"' + e.replace(c, function(e) {
				var n = f[e];
				return _isString(n) ? n : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
			}) + '"' : '"' + e + '"';
		}
		function n(e) {
			var n = [];
			for (var o in e){ n = n.concat(o); }
			return n;
		}
		function o(n) {
			var g = ['!doctype', 'br', 'hr', 'img', 'link', 'meta', 'input'];
			var o = n.tagName.toLowerCase(),
				t = "<" + o;
			return n.attributes.length > 0 && (t += " "), t += Array.prototype.map.call(n.attributes, function(n) {
				return "" === n.value ? n.name : n.name + "=" + e(n.value);
			}).join(" "), t += g.indexOf(o)>-1? ">":">"+n.innerHTML+"</"+o+">";
		}
		function t(r, c) {
			var f, u, d, p, g, m, h = a;
			try {
				if (g = c[r], g && "object" == typeof g && _isFunction(g.toJSON) && (g = g.toJSON(r)), g instanceof HTMLElement){ return o(g); }
				if (g instanceof RegExp) { return String(g); }
				if (g instanceof MimeType || g instanceof Plugin) { return Object.prototype.toString.call(g); }
				switch (typeof g) {
					case "string":
						return e(g);
					case "boolean":
					case "null":
					case "number":
					case "undefined":
						return String(g);
					case "function":
					case "object":
						if (!g) return "null";
						var y = s.indexOf(g) + 1;
						if (y > 0) return "/**ref:" + y.toString(16) + "**/";
						if (s.push(g), y = s.length, m = "/**id:" + y.toString(16) + "**/", _isFunction(g)) return m + " " + String(g);
						if (a += l, p = [], "[object Array]" === Object.prototype.toString.apply(g)) {
							for (d = g.length, f = 0; f < d; f += 1) p[f] = t(f, g) || "null";
							return u = 0 === p.length ? "[]" : "[\n" + a + m + "\n" + a + p.join(",\n" + a) + "\n" + h + "]", a = h, u;
						}
						var q = n(g), k;
						for(var x in q) {
							if(!q.hasOwnProperty(x)){continue;}
							k = q[x];
							u = t(k, g), u && p.push(e(k) + ": " + u);
						}
						return u = 0 === p.length ? "{}" : "{\n" + a + m + "\n" + a + p.join(",\n" + a) + "\n" + h + "}", a = h, u;
				}
			} catch (b) {
				return "";
			}
		}
		function r(e) {
			if (_isString(e)) return e;
			a = "", l = "  ", s = [];
			for (var n = t("", {
					"": e
				}), o = s.length; o;) new RegExp("/\\*\\*ref:" + o.toString(16) + "\\*\\*/").test(n) || (n = n.replace(new RegExp("[\r\n\t ]*/\\*\\*id:" + o.toString(16) + "\\*\\*/", "g"), "")), o--;
			return s = null, n;
		}
		var a, l, s, c = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			f = { "\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" };
		return { quote: e, getString: r };
	}();

	var _delay = function (callback, ms) {
		var delay = (function () {
			var timer = 0;
			return function (callback, ms) {
				clearTimeout(timer);
				timer = setTimeout(callback, ms||0);
			};
		})();
		return delay(callback, ms);
	};

	var _promise = function(resolve, reject){
		var jDomsPromise = function (jDomsPromise) {
			var that = this;
			this.state = 'pending';
			this.value = undefined;
			this.consumers = [];
			jDomsPromise(this.resolve.bind(this), this.reject.bind(this));
		};
		jDomsPromise.prototype.fulfill = function (value) {
			if (this.state !== 'pending') return;
			this.state = 'fulfilled';
			this.value = value;
			this.done();
		};
		jDomsPromise.prototype.reject = function (reason) {
			if (this.state !== 'pending') return;
			this.state = 'rejected';
			this.value = reason;
			this.done();
		};
		jDomsPromise.prototype.then = function(onFulfilled, onRejected ) {
			var consumer = new jDomsPromise(function () {});
			consumer.onFulfilled = _isFunction(onFulfilled)? onFulfilled : null;
			consumer.onRejected = _isFunction(onRejected)? onRejected : null;
			this.consumers = this.consumers.concat(consumer);
			this.done();
			return consumer;
		};
		jDomsPromise.prototype.done = function() {
			var promise = this;
			if (this.state === 'pending') return;
			var callbackName = this.state == 'fulfilled' ? 'onFulfilled' : 'onRejected';
			var resolver = this.state == 'fulfilled' ? 'resolve' : 'reject';
			setTimeout(function() {
				var pConsumers = promise.consumers.splice(0);
				for( var key in pConsumers ) {
					var consumer = pConsumers[key];
					try {
						var callback = consumer[callbackName];
						if (callback) {
							consumer.resolve(callback(promise.value));
						} else {
							consumer[resolver](promise.value);
						}
					} catch (e) {
						consumer.reject(e);
					}
				}
			}, 0);
		};
		jDomsPromise.prototype.resolve = function(x) {
			var wasCalled, then;
			if (this === x) {
				throw new TypeError('Circular reference: promise value is promise itself');
			}
			if (x instanceof jDomsPromise) {
				x.then(this.resolve.bind(this), this.reject.bind(this));
			} else if (x === Object(x)) {
				try {
					then = x.then;
					if (_isFunction(then)) {
						then.call(x, function resolve(y) {
							if (wasCalled) return;
							wasCalled = true;
							this.resolve(y);
						}.bind(this), function reject(reasonY) {
							if (wasCalled) return;
							wasCalled = true;
							this.reject(reasonY);
						}.bind(this));
					} else {
						this.fulfill(x);
					}
				} catch(e) {
					if (wasCalled) return;
					this.reject(e);
				}
			} else {
				this.fulfill(x);
			}
		};
		return new jDomsPromise(resolve, reject);
	};

	var _dateParse = function(date){
		return Date.parse(date);
	};

	var _urlParse = function (url) {
		var loc= location||window.location;
		var data = { hash: loc.hash||"", host: loc.host||"", hostname: loc.hostname||"", href: loc||"", origin: loc.origin||"", password: loc.password||"", pathname: loc.pathname||"", port: loc.port||"", protocol: loc.protocol||"", search: loc.search||"", username: loc.username||"" };
		var a =  document.createElement("a");
		a.href = url;
		data.hash = a.hash;
		data.host = a.host;
		data.hostname = a.hostname;
		data.href = a.href;
		data.origin = a.origin;
		data.password = a.password;
		data.pathname = a.pathname;
		data.port = a.port;
		data.protocol = a.protocol;
		data.search = a.search;
		data.username = a.username;
		return data;
	};

	var _jsonParse = function (json_codes) {
		var data = {};
		if ( _isObject(JSON) && _isFunction(JSON.parse) ) {
			try {
				data = JSON.parse(json_codes);
			} catch (err) {}
		} else if (_isObject(Components) && _isFunction(Components.classes) && _isFunction(Components.interfaces)) {
			try {
				var nativeJSON = Components.classes["@mozilla.org/dom/json;1"].createInstance(Components.interfaces.nsIJSON);
				data = nativeJSON.decode(json_codes);
			} catch (err) {}
		} else {
			var jsonTrims = json_codes.replace(/^\s+/, "").replace(/\s+$/, "");
			var new_data = (function (jsstring) {
				var rvalidchars = /^[\],:{}\s]*$/,
					rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
					rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
					rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
				if (rvalidchars.test(jsonTrims.replace(rvalidescape, "@")
						.replace(rvalidtokens, "]")
						.replace(rvalidbraces, ""))) {
					return (new Function("return " + jsonTrims))();
				}
			})();
			data = !new_data ? data : new_data;
		}
		return data;
	};

	var _xmlParse =  function(xml){
		if (window.DOMParser) {
			var parser = new DOMParser();
			return parser.parseFromString(xml,"text/xml");
		}
		if(_isSet(ActiveXObject)){
		  	var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			return xmlDoc.loadXML(xml);
		}
		return {};
	};

	var _htmlParse =  function(html){
		if (html.toLowerCase().replace(/^\s+|\s+$/gm,'').indexOf('<!doctype') === 0 && document.implementation && document.implementation.createHTMLDocument ) {
			var doc = document.implementation.createHTMLDocument("");
			doc.documentElement.innerHTML = html;
			return doc;
		} else if ('content' in document.createElement('template')) {
		   var elm = document.createElement('template');
		   elm.innerHTML = html;
		   return elm.content;
		} else {
			var docFrag = document.createDocumentFragment();
			var el = document.createElement('body');
			el.innerHTML = html;
			for (i = 0; 0 < el.childNodes.length;) {
				docFrag.appendChild(el.childNodes[i]);
			}
			return docFrag;
		}
	};
	
	var _ajax = function (ajx) {
		
		var xhr;
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if (ajx.xhr && ( _isFunction(ajx.method) || _isObject(ajx.method) ) ) {
			xhr = ajx.xhr;
		}

		var enctype = 'application';
		if (ajx.enctype && _isString(ajx.method)) {
			if (ajx.method == 'multipart/form-data') {
				enctype = 'multipart';
			} else if (ajx.method == 'text/plain') {
				enctype = 'text';
			}
		}

		var url = '';
		if (ajx.url && _isString(ajx.method)) {
			url = ajx.url;
		}

		var method = 'GET';
		if (ajx.method && _isString(ajx.method) && ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'].indexOf(ajx.method.toUpperCase()) > -1) {
			method = ajx.method.toUpperCase();
		}

		var async = true;
		if (ajx.async && _isBoolean(ajx.async)) {
			xhr.async = ajx.async;
		}

		if (ajx.onBefore) {
			ajx.onBefore(xhr);
		}

		var data = new FormData();
		if (ajx.data && _isObject(ajx.data)) {
			for (var k in ajx.data) {
				data.append(k, ajx.data[k]);
			}
		}

		if (ajx.data && _isString(ajx.data)) {
			data = ajx.data;
			if (method == 'GET' || method == 'PUT') {
				url = url + (data[0] == '?' ? data : '?' + data);
			}
		}

		xhr.open(method, url, true);

		if (ajx.method && _isString(ajx.method) && ajx.method.toUpperCase() == 'POST') {
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		}

		if (ajx.timeout && (_isString(ajx.timeout) || _isNumber(ajx.timeout))) {
			xhr.timeout = parseInt(ajx.timeout);
		}

		xhr.onreadystatechange = function () {

			if (ajx.onReadyStateChange) {
				ajx.onReadyStateChange(xhr, this.readyState, this.status);
			}

			if (this.readyState == 0) {
				if (ajx.onNotConnected) {
					ajx.onNotConnected(xhr);
				}
			}

			if (this.readyState == 1) {
				if (ajx.onConnected) {
					ajx.onNotConnected(xhr);
				}
			}

			if (this.readyState == 2) {
				if (ajx.onReceived) {
					ajx.onReceived(xhr);
				}
			}

			if (this.readyState == 3) {
				if (ajx.onLoading) {
					ajx.onReceived(xhr);
				}
			}

			if (this.readyState == 4) {

				if (ajx.onComplete) {
					ajx.onComplete(xhr);
				}

				if (this.status == 200) {
					if (ajx.onSuccess) {
						ajx.onSuccess(xhr);
					}
				}

			}

		};

		xhr.onloadstart = function (xhr) {
			if (ajx.onLoadStart) {
				ajx.onLoadStart(xhr);
			}
		};

		xhr.onloadend = function (xhr) {
			if (ajx.onLoadEnd) {
				ajx.onLoadEnd(xhr);
			}
		};

		xhr.ontimeout = function (evt) {
			if (ajx.onTimeout) {
				var loaded = false,
					total = false;
				if (evt.lengthComputable) {
					loaded = evt.loaded || evt.position;
					total = evt.loaded;
				}
				ajx.onTimeout(xhr, loaded, total);
			}
		};

		xhr.onload = function (xhr) {
			if (ajx.onLoad) {
				ajx.onLoad(xhr);
			}
		};

		xhr.onprogress = function (evt) {
			if (ajx.onProgress) {
				var loaded = false,
					total = false;
				if (evt.lengthComputable) {
					loaded = evt.loaded || evt.position;
					total = evt.loaded;
				}
				ajx.onProgress(xhr, loaded, total);
			}
		};

		xhr.onabort = function (xhr) {
			if (ajx.onAbort) {
				ajx.onAbort(xhr);
			}
		};

		xhr.onerror = function (xhr) {
			if (ajx.onError) {
				ajx.onError(xhr);
			}
		};
		
		xhr.send(data);
		
		return xhr;
	};

	var _eventCallback = function(ev){
		var _ev = { altKey: true, bubbles: true, cancelable: true, changedTouches: true, ctrlKey: true, detail: true, eventPhase: true, metaKey: true, pageX: true, pageY: true, shiftKey: true, view: true, "char": true, code: true, charCode: true, key: true, keyCode: true, button: true, buttons: true, clientX: true, clientY: true, offsetX: true, offsetY: true, pointerId: true, pointerType: true, screenX: true, screenY: true, targetTouches: true, touches: true, which: true };
		var tempArray = jDoms(_eventCallback.that).doms(_eventCallback.selectors);
		for (var q = 0; q < tempArray.length; q++) {
			ev = ev||window.event;
			var tgt = ev.target||ev.currentTarget||ev.srcElement;
			if( tempArray[q] == tgt || jDoms(tempArray[q]).child(tgt).length>0 || ( (_isSet(tempArray[q].compareDocumentPosition)) && tempArray[q].compareDocumentPosition(tgt)==16 ) || ( (_isSet(tempArray[q].contains)) && tempArray[q].contains(tgt) ) ){
				
				for( var ek in ev ){
					if(!ev.hasOwnProperty(ek)){continue;}
					_ev[ek] = ev[ek];
				}

				var tgt = ["target", "targetElement", "srcElement"];
				for(var t=0; t<tgt.length; t++){
					_ev[tgt[t]] = tempArray[q];
					if(_isSet(Object.defineProperty)){
						Object.defineProperty(_ev, tgt[t], {
							writable: false,
							value: tempArray[q]
						});
					}
				}

				_eventCallback.callback(_ev);

			}
		}
		this.that = null;
		this.selectors = null;
		this.callback = null;
	};

	_eventCallback.type = null;
	_eventCallback.that = null;
	_eventCallback.selectors = null;
	_eventCallback.callback = null;

	/* Default prototype functions */
	var functions = {

		version: version,

		length: function(){
			return this.length || 0;
		},

		doms: function (selectors) {
			
			var args = arguments || [];
			selectors = selectors || args[0];
			var context = args[1] || '';
			var new_selectors = [];

			if (this.length > 0) {

				for (var k = 0; k < this.length; k++) {

					var new_doms = jDoms(selectors, context, this[k]);

					for (var x = 0; x < new_doms.length; x++) {

						new_selectors = new_selectors.concat(new_doms[x]);

					}

				}

			}

			return jDoms(new_selectors);

		},

		find: function (selectors) {

			var args = arguments;
			var context = args[1] || '';
			return this.doms(selectors, context);

		},

		search: function (selectors) {

			var args = arguments;
			var context = args[1] || '';
			return this.doms(selectors, context);

		},

		index: function(index){

			try{
				return (this.length==0) ? this._[parseInt(index)] : this[parseInt(index)] ;
			}catch(err){}

			return null;

		},

		domIndex: function(index){
			
			var item = [];

			try{
				item = this[parseInt(index)] ;
			}catch(err){}

			return jDoms( item );

		},

		key: function(key){
			
			try{
				if( _isSet(this._.hasOwnProperty) ){ return this._[key]; }
			}catch(err){}
			
			return null;

		},

		each: function (callback) {

			for (var i = 0; i < this.length; i++) {

				callback(this[i], i, this);

			}

			return this;

		},

		parent: function () {

			var args = arguments || [];
			var selectors = args[0];

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {

				array1 = array1.concat(this[i].parentElement || this[i].parentNode);
				if (_isSet(selectors)) {
					var tempArray = jDoms(selectors, "", (this[i].ownerDocument || document));
					for (var n = 0; n < tempArray.length; n++) {
						array2 = array2.concat(tempArray[n]);
					}
				}

			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) !== -1;
				});
			}
			
			array1 = _unique(array1);

			return jDoms(array1);

		},

		closest: function (selectors) {
			
			if (window.Element && !Element.prototype.closest) {
				Element.prototype.closest = function (s) {
					var matches = new jDoms.jDomsList(selectors, "", (this.document || this.ownerDocument || document)),
						i,
						el = this;
					do {
						i = matches.length;
						while (--i >= 0 && matches.item(i) !== el) {}
					} while ((i < 0) && (el = (el.parentElement || el.parentNode)));
					return el || [];
				};
			}

			var array1 = [];

			for (var i = 0; i < this.length; i++) {
				if (_isSet(this[i].closest)) {
					var closestDoms = this[i].closest(selectors);
					for (var x = 0; x < closestDoms.length; x++) {
						array1 = array1.concat(closestDoms[x]);
					}
				}

			}

			array1 = _unique( array1 );

			return jDoms(array1);

		},

		child: function(){

			var args = arguments || [];
			var selectors = args[0];

			var array1 = [];
			var array2 = [];
			var childList, n;

			for (var i = 0; i < this.length; i++) {

				if(_isSet(this[i].children)){
					childList = this[i].children;
					for (n = 0; n < childList.length; n++) {
						array1 = array1.concat(childList[n]);
					}
				}else if(_isSet(this[i].childNodes)){
					childList = this[i].childNodes;
					for (n = 0; n < childList.length; n++) {
						if ( childList[i].nodeName && childList[i].nodeType==Node.ELEMENT_NODE ) {
							array1 = array1.concat(childList[n]);
						}
					}
				}

				array1 = array1.concat();
				if (_isSet(selectors)) {
					var tempArray = jDoms(selectors, "", (this[i].ownerDocument || document));
					for (var nn = 0; nn < tempArray.length; nn++) {
						array2 = array2.concat(tempArray[nn]);
					}
				}

			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, p, a) {
						return a.indexOf(v) === p;
					});
				}
				array1 = array1.filter(function (p) {
					return array2.indexOf(p) !== -1;
				});
			}

			array1 = _unique( array1 );

			return jDoms(array1);

		},

		children: function(){
			
			var args = arguments || [];
			var selectors = args[0];
			return this.child(selectors);

		},

		match: function (selectors) {

			var args = arguments || [];
			selectors = selectors || args[0] || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {
				array1 = array1.concat(this[i]);
			}

			var tempArray = jDoms(selectors, context, root);
			for (var n = 0; n < tempArray.length; n++) {
				array2 = array2.concat(tempArray[n]);
			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) !== -1;
				});
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		matchTo: function (selectors) {

			var args = arguments || [];
			selectors = selectors || args[0] || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {
				array1 = array1.concat(this[i]);
			}

			var tempArray = jDoms(selectors, context, root);
			for (var n = 0; n < tempArray.length; n++) {
				array2 = array2.concat(tempArray[n]);
			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array2 = array2.filter(function (n) {
					return array1.indexOf(n) !== -1;
				});
			}

			array2 = _unique(array2);

			return jDoms(array2);

		},

		merge: function (selectors) {

			var args = arguments || [];
			selectors = selectors || args[0] || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {
				array1 = array1.concat(this[i]);
			}

			var tempArray = jDoms(selectors, context, root);
			for (var n = 0; n < tempArray.length; n++) {
				array2 = array2.concat(tempArray[n]);
			}
			
			if (_isSet(selectors)) {
				for( var k=0; k<array2.length; k++){
					if(array1.indexOf(array2[k])<0){
						array1 = array1.concat(array2[k]);
					}
				}
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		unique: function(){
			
			var array1 = [];

			for (var i = 0; i < this.length; i++) {
				array1 = array1.concat(this[i]);
			}

			array1 = _unique(array1);
			
			return jDoms(array1);

		},

		not: function (selectors) {
			var args = arguments || [];
			selectors = selectors || args[0];
			var	context = args[1] || "",
				root = _isSet(args[2]) ? args[2] : document;

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {
				array1 = array1.concat(this[i]);
			}

			var tempArray = jDoms(selectors, context, root);
			for (var n = 0; n < tempArray.length; n++) {
				array2 = array2.concat(tempArray[n]);
			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) === -1;
				});
			}

			array1 = _unique( array1 );

			return jDoms(array1);

		},

		is: function (selectors) {

			if (_isUndefined(this[0])) {
				return false;
			}

			var array1 = [ this[0] ];
			var array2 = [];

			var tempArray = jDoms(this[0]).match(selectors);
			for (var n = 0; n < tempArray.length; n++) {
				array2 = array2.concat(tempArray[n]);
			}

			array1 = array1.filter(function (n) {
				return array2.indexOf(n) !== -1;
			});

			return array1.length > 0 ? true : false;

		},

		isSame: function (selectors) {

			var args = arguments || [];
			selectors = selectors || args[0] || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var a = [];
			var b = [];

			for (var i = 0; i < this.length; i++) {
				a = a.concat(this[i]);
			}

			var tempArray = jDoms(selectors, context, root);
			for (var n = 0; n < tempArray.length; n++) {
				b = b.concat(tempArray[n]);
			}

			a = jDoms.unique(a); 
			b = jDoms.unique(b); 
			
			if (a.length !== b.length){ return false; }
			if (a === b) { return true; }
			
			for (var k = 0; k < a.length; k++) {
				if ( b.indexOf(a[k])==-1){ return false; }
			}
			return true;
			
		},

		isContains: function(selectors){

			var args = arguments || [];
			selectors = selectors || args[0];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var first = this[0];
			var second = jDoms(selectors, context, root)[0];

			if(_isSet(first) && _isSet(second) && _isSet(first.contains) ){
				return first.contains(second);
			}

			return false;

		},

		isContainsBy: function(selectors){

			var args = arguments || [];
			selectors = selectors || args[0];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var second = this[0];
			var first = jDoms(selectors, context, root)[0];

			if(_isSet(first) && _isSet(second) && _isSet(first.contains) ){
				return first.contains(second);
			}

			return false;

		},

		previous: function () {

			var args = arguments || [];
			var selectors = args[0];

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {

				var previousSibling = this[i].previousSibling;
				while (previousSibling && previousSibling.nodeType != 1) {
					previousSibling = previousSibling.previousSibling;
				}

				array1 = array1.concat(previousSibling);
				if (_isSet(selectors)) {
					var tempArray = jDoms(selectors, "", (this[i].ownerDocument || document));
					for (var n = 0; n < tempArray.length; n++) {
						array2 = array2.concat(tempArray[n]);
					}
				}

			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) !== -1;
				});
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		next: function () {

			var args = arguments || [];
			var selectors = args[0];

			var array1 = [];
			var array2 = [];

			for (var i = 0; i < this.length; i++) {

				var nextSibling = this[i].nextSibling;
				while (nextSibling && nextSibling.nodeType != 1) {
					nextSibling = nextSibling.nextSibling;
				}
				array1 = array1.concat(nextSibling);

				if (_isSet(selectors)) {
					var tempArray = jDoms(selectors, "", (this[i].ownerDocument || document));
					for (var n = 0; n < tempArray.length; n++) {
						array2 = array2.concat(tempArray[n]);
					}
				}

			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, p, a) {
						return a.indexOf(v) === p;
					});
				}
				array1 = array1.filter(function (p) {
					return array2.indexOf(p) !== -1;
				});
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		first: function () {

			var array1 = this[0] ? [this[0]] : [];

			if (!array1) {
				return jDoms(array1);
			}

			var args = arguments || [];
			var selectors = args[0];

			var array2 = [];

			if (_isSet(selectors)) {
				var tempArray = jDoms(selectors, "", (array1[0].ownerDocument || document));
				for (var n = 0; n < tempArray.length; n++) {
					array2 = array2.concat(tempArray[n]);
				}
			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) !== -1;
				});
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		last: function () {

			var array1 = this[this.length - 1] ? [this[this.length - 1]] : [];

			if (!array1) {
				return jDoms(array1);
			}

			var args = arguments || [];
			var selectors = args[0];

			var array2 = [];

			if (_isSet(selectors)) {
				var tempArray = jDoms(selectors, "", (array1[0].ownerDocument || document));
				for (var n = 0; n < tempArray.length; n++) {
					array2 = array2.concat(tempArray[n]);
				}
			}

			if (_isSet(selectors)) {
				if (array2.length > 1) {
					array2 = array2.filter(function (v, i, a) {
						return a.indexOf(v) === i;
					});
				}
				array1 = array1.filter(function (n) {
					return array2.indexOf(n) !== -1;
				});
			}

			array1 = _unique(array1);

			return jDoms(array1);

		},

		clone: function () {

			var args = arguments;
			var deep = (_isSet(args[0]) && args[0] === false) ? false : true;

			for (var i = 0; i < this.length; i++) {
				if (_isSet(this[i].cloneNode)) {
					return this[i].cloneNode(deep);
				}
			}

			return this;

		},

		addEvent: function (evt) {

			var args = arguments;
			evt = evt || args[0] || "";
			var selectors, callback, useCapture = false;
			var evtArray = evt.split(" ");

			if (_isSet(args[3])) {
				selectors = args[1];
				callback = args[2];
				useCapture = (args[3] === true);
			} else if (_isSet(args[2])) {
				selectors = args[1];
				callback = args[2];
			} else if (_isSet(args[1])) {
				callback = args[1];
			}

			var array2 = [], tempArray, n, reCallback, that;

			for (var i = 0; i < this.length; i++) {
				that = this[i];

				for (n = 0; n < evtArray.length; n++) {
					if (_isSet(selectors)) {
						_eventCallback.that = this[i];
						_eventCallback.selectors = selectors;
						_eventCallback.callback = callback;
						_eventCallback.type = evtArray[n];
						jDoms(that).setProperty("jDomsEvent-"+evtArray[n]+"-"+callback.name, callback.name);
						if (this[i].addEventListener) {
							this[i].addEventListener(evtArray[n], _eventCallback, useCapture);
						} else if (this[i].attachEvent) {
							this[i].attachEvent('on' + evtArray[n], _eventCallback);
						}
					}else{
						if (this[i].addEventListener) {
							this[i].addEventListener(evtArray[n], callback, useCapture);
						} else if (this[i].attachEvent) {
							this[i].attachEvent('on' + evtArray[n], callback);
						}
					}
					
				}
			}

		},

		on: function (evt) {

			var args = arguments;
			evt = args[0];
			var	selectors = args[1],
				callback = args[2],
				useCapture = args[3];
			return this.addEvent(evt, selectors, callback, useCapture);

		},

		removeEvent: function (evt) {

			var args = arguments;
			evt = evt || args[0] || "";
			var selectors, callback, useCapture = false;
			var evtArray = evt.split(" ");

			if (_isSet(args[3])) {
				selectors = args[1];
				callback = args[2];
				useCapture = (args[3] === true);
			} else if (_isSet(args[2])) {
				selectors = args[1];
				callback = args[2];
			} else if (_isSet(args[1])) {
				callback = args[1];
			}

			var array2 = [], tempArray, n, reCallback, that;

			if(_isFunction(callback)){
				for (var i = 0; i < this.length; i++) {
					that = this[i];
					
					for (n = 0; n < evtArray.length; n++) {
						if (_isSet(selectors)) {
							if(jDoms(that).getProperty("jDomsEvent-"+evtArray[n]+"-"+callback.name)==callback.name){
								if (this[i].removeEventListener) {
									this[i].removeEventListener(evtArray[n], _eventCallback, useCapture);
								} else if (this[i].detachEvent) {
									this[i].detachEvent('on' + evtArray[n], _eventCallback);
								}
							}
						}else{
							if (this[i].removeEventListener) {
								this[i].removeEventListener(evtArray[n], callback, useCapture);
							} else if (this[i].detachEvent) {
								this[i].detachEvent('on' + evtArray[n], callback);
							}
						}
						
					}
				}
			}

		},

		off: function (evt) {

			var args = arguments;
			evt = args[0];
			var	selectors = args[1],
				callback = args[2],
				useCapture = args[3];
			return this.removeEvent(evt, selectors, callback, useCapture);

		},

		fireEvent: function (eventName) {

			for (var i = 0; i < this.length; i++) {

				var doc = document;
				if (this[i].ownerDocument) {
					doc = this[i].ownerDocument;
				} else if (this[i].nodeType == 9) {
					doc = this[i];
				}

				if (this[i].dispatchEvent) {
					var eventClass = "";
					switch (eventName) {
						case "click":
						case "mousedown":
						case "mouseup":
							eventClass = "MouseEvents";
							break;
						case "focus":
						case "change":
						case "blur":
						case "select":
							eventClass = "HTMLEvents";
							break;
					}
					var event = doc.createEvent(eventClass);
					var bubbles = eventName == "change" ? false : true;
					if (event.initEvent) {
						event.initEvent(eventName, bubbles, true);
					}
					event.synthetic = true;
					this[i].dispatchEvent(event, true);
				} else if (this[i].fireEvent && doc.createEventObject) {
					var event = doc.createEventObject();
					event.synthetic = true;
					this[i].fireEvent("on" + eventName, event);
				}

			}

			return this;

		},

		trigger: function (eventName) {

			return this.fireEvent(eventName);

		},

		create: function(){

			var array1 = [];

			if(_isString(this._)){

				var tags = this._.replace(/(?:\s*-\s*)+|\s{2,}/g, " ").split(" ");
				var tag, tagName;
				
				for( var i=0; i<tags.length; i++){
					
					tag = null;

					tagName = tags[i].replace(/[^A-Za-z]/gi,"");
					
					if( _isString(this.__) ){
						tag = document.createElementNS( this.__, tagName );
						if( _isObject(this.___) ){
							try{
								for( var attrNameNS in this.___ ){
									if( !this.__.hasOwnProperty(attrNameNS) ){ continue; }
									tag.setAttribute( attrNameNS, this.___[attrNameNS] );
								}
							}catch(err){}
						}
					}

					if( _isObject(this.__) ){
						try{
							tag = document.createElement( tagName );
							for( var attrName in this.__ ){
								if( !this.__.hasOwnProperty(attrName) ){ continue; }
								tag.setAttribute( attrName, this.__[attrName] );
							}
							tag.innerHTML = this.___;
						}catch(err){}
					}
					
					if(tag){
						if(_isSet(arguments[0])){
							var props = arguments[0];
							if( _isObject(props) ){
								try{
									for( var propName in props ){
										if( !props.hasOwnProperty(propName) ){ continue; }
										tag[propName] = props[propName];
									}
								}catch(err){}
							}
						}
						array1 = array1.concat(tag);
					}

				}

			}
			

			return jDoms(array1);

		},

		createElement: function(){
			return this.create( arguments[0] );
		},

		getHtml: function () {

			var args = arguments || [];

			for (var i = 0; i < this.length; i++) {

				if (_isSet(args[0]) && args[0] === true) {
					if (_isSet(this[i].outerHTML)) {
						return this[i].outerHTML;
					} else {
						e.insertAdjacentHTML('beforeBegin', code);
						var new_elem = e.previousSibling;
						e.parentElement.removeChild(e);

						var html = "";
						if ((_isSet(this[i].nodeName) || _isSet(this[i].tagName)) && _isSet(this[i].attributes)) {
							var endless = ['!doctype', 'br', 'hr', 'img', 'link', 'meta', 'input'];
							var tag = this[i].nodeName || this[i].tagName;
							tag = tag.toLowerCase();
							var attrs = "";
							for (var n = 0; n < this[i].attributes.length; n++) {
								attrs += this[i].attributes[n].nodeName;
								attrs += this[i].attributes[n].nodeValue.indexOf('"') > -1 ? "'" : '"';
								attrs += this[i].attributes[n].nodeValue;
								attrs += this[i].attributes[n].nodeValue.indexOf('"') > -1 ? "'" : '"';
							}
							html = _isSet(this[i].innerHTML)? this[i].innerHTML : "";

							return "<" + tag + (attrs == "" ? "" : " " + attrs) + (endless.indexOf(tag) > -1 ? "/>" : ">" + html + "<" + tag + ">");
						}
					}
				}

				if (_isSet(this[i].innerHTML)) { return this[i].innerHTML; }

			}

			return "";

		},

		setHtml: function (html) {

			var args = arguments || [];

			for (var i = 0; i < this.length; i++) {

				if (_isSet(args[1]) && args[1] === true) {
					if (_isSet(this[i].outerHTML)) {
						this[i].outerHTML = html;
					} else {
						this[i].insertAdjacentHTML('beforeBegin', code);
						var parent = this[i].parentElement || this[i].parentNode;
						parent.removeChild(e);
					}
				} else if (_isSet(this[i].innerHTML)) {
					this[i].innerHTML = html;
				}

			}

			return this;

		},

		html: function () {

			var args = arguments || [];
			var set = _isSet(args[0]);
			var outer = ((_isSet(args[1]) && args[1] === true) === true);

			if (set) {
				return this.setHtml(args[0], outer);
			} else {
				return this.getHtml(outer);
			}

		},

		appendHtml: function (html) {
			
			for (var i = 0; i < this.length; i++) {
				try{
					if( (_isObject(html) && _isNumber(html.length)) || _isArray(html) ){
						for( var x=0; x<html.length; x++ ){
							this[i].appendChild(html[x]);
						}
					}else if(_isSet(html.nodeType)){
						this[i].appendChild(html);
					}else{
						var frag = document.createDocumentFragment();
						var span = document.createElement("span");
						span.innerHTML = html;
						for (var n = 0; n < span.childNodes.length; n++) {
							frag.appendChild(span.childNodes[n]);
						}
						this[i].appendChild(frag);
					}
				}catch(err){}
			}

			return this;

		},

		append: function (html){
			return this.appendHtml(html);
		},

		prependHtml: function (html) {

			for (var i = 0; i < this.length; i++) {
				try{
					if(_isObject(html)){
						if(_isSet(html.hasOwnProperty)){
							for(var k in html){
								if(!html.hasOwnProperty(k)){continue;}
								if (this[i].firstChild) {
									this[i].insertBefore(html[k], this[i].firstChild);
								} else {
									this[i].appendChild(html[k]);
								}
							}
						}else if(_isSet(html.nodeType)){
							if (this[i].firstChild) {
								this[i].insertBefore(html, this[i].firstChild);
							} else {
								this[i].appendChild(html);
							}
						}
					}else{
						var frag = document.createDocumentFragment();
						var span = document.createElement("span");
						span.innerHTML = html;
						for (var n = 0; n < span.childNodes.length; n++) {
							frag.appendChild(span.childNodes[n]);
						}
						if (this[i].firstChild) {
							this[i].insertBefore(frag, this[i].firstChild);
						} else {
							this[i].appendChild(frag);
						}
					}
				}catch(err){}
			}

			return this;

		},

		prepend: function (html){
			return this.prependHtml(html);
		},

		appendHtmlTo: function (selectors) {

			var args = arguments;
			selectors = args[0] || selectors || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var jDoms2 = jDoms(selectors, context, root);
			
			return jDoms2.appendHtml(this);

		},

		appendTo: function (selectors){

			var args = arguments;
			selectors = args[0] || selectors || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;
			
			return this.appendHtmlTo(selectors,context,root);

		},

		prependHtmlTo: function (selectors) {

			var args = arguments || [];
			selectors = selectors || args[0] || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;

			var jDoms2 = jDoms(selectors, context, root);

			return jDoms2.prependHtml(this);

		},

		prependTo: function (selectors){

			var args = arguments;
			selectors = args[0] || selectors || [];
			var context = args[1] || '',
				root = _isSet(args[2]) ? args[2] : document;
			
			return this.prependHtmlTo(selectors,context,root);

		},

		addBefore: function (html) {

			for (var i = 0; i < this.length; i++) {
				try{
					if(_isObject(html)){
						if (_isSet(html.innerHTML) && _isSet(html.nodeName) && _isSet(html.nodeType) && html.nodeType==1) {
							this[i].insertAdjacentElement('beforebegin', html);
						}else if(_isArray(html)||_isjDoms(html)){
							for(var n=0; n<html.length; n++){
								if (html[n] && _isSet(html[n].innerHTML) && _isSet(html[n].nodeName) && _isSet(html[n].nodeType) && html[n].nodeType==1) {
									this[i].insertAdjacentElement('beforebegin', html[n]);
								} else if(_isFlatten(html[n])){
									this[i].insertAdjacentHTML('beforebegin', html[n]);
								}
							}
						}else if(_isSet(html.hasOwnProperty)){
							for(var k in html){
								if(!_isSet(html.hasOwnProperty(k))){continue;}
								if (html[k] && _isSet(html[k].innerHTML) && _isSet(html[k].nodeName) && _isSet(html[k].nodeType) && html[k].nodeType==1) {
									this[i].insertAdjacentElement('beforebegin', html[k]);
								} else if(_isFlatten(html[k])){
									this[i].insertAdjacentHTML('beforebegin', html[k]);
								}
							}
						}
					} else if(_isFlatten(html)){
						this[i].insertAdjacentHTML('beforebegin', html);
					}
				}catch(err){}
			}

			return this;

		},

		addAfter: function (html) {

			for (var i = 0; i < this.length; i++) {
				try{
					if(_isObject(html)){
						if (_isSet(html.innerHTML) && _isSet(html.nodeName) && _isSet(html.nodeType) && html.nodeType==1) {
							this[i].insertAdjacentElement('afterend', html);
						}else if(_isArray(html)||_isjDoms(html)){
							for(var n=0; n<html.length; n++){
								if (html[n] && _isSet(html[n].innerHTML) && _isSet(html[n].nodeName) && _isSet(html[n].nodeType) && html[n].nodeType==1) {
									this[i].insertAdjacentElement('afterend', html[n]);
								} else if(_isFlatten(html[n])){
									this[i].insertAdjacentHTML('afterend', html[n]);
								}
							}
						}else if(_isSet(html.hasOwnProperty)){
							for(var k in html){
								if(!_isSet(html.hasOwnProperty(k))){continue;}
								if (html[k] && _isSet(html[k].innerHTML) && _isSet(html[k].nodeName) && _isSet(html[k].nodeType) && html[k].nodeType==1) {
									this[i].insertAdjacentElement('afterend', html[k]);
								} else if(_isFlatten(html[k])){
									this[i].insertAdjacentHTML('afterend', html[k]);
								}
							}
						}
					} else if(_isFlatten(html)){
						this[i].insertAdjacentHTML('afterend', html);
					}
				}catch(err){}
			}

			return this;

		},

		before: function (html) {
			return this.addBefore(html);
		},

		after: function (html) {
			return this.addAfter(html);
		},

		setText: function (content) {

			var args = arguments || [];
			var outer = ((_isSet(args[1]) && args[1] === true) === true);
			
			for (var i = 0; i < this.length; i++) {
				try{
					if(this[i]){
						if(outer){
							if(_isSet(this[i].outerText)){
								this[i].outerText = content;
							}else{
								content = document.createTextNode(content);
								jDoms(this[i]).setHtml( content );
							}
						}else{
							if ( _isSet(this[i].textContent)) {
								this[i].textContent = content;
							}else if ( _isSet(this[i].innerText)) {
								this[i].innerText = content;
							}else{
								content = document.createTextNode(content);
								jDoms(this[i]).setHtml(content);
							}
						}
					}
				}catch(err){}
			}

			return this;

		},

		getText: function () {

			var args = arguments || [];
			var outer = ((_isSet(args[1]) && args[1] === true) === true);

			for (var i = 0; i < this.length; i++) {
				try{
					if(this[i]){
						if(outer){
							if(_isSet(this[i].outerText)){
								return this[i].outerText;
							}else{
								return jDoms(this[i]).getHtml();
							}
						}else{
							if ( _isSet(this[i].textContent)) {
								return this[i].textContent;
							}else if ( _isSet(this[i].innerText)) {
								return this[i].innerText;
							}else{
								return jDoms(this[i]).getHtml(content, outer);
							}
						}
					}
				}catch(err){}
			}

			return "";

		},

		text: function () {

			var args = arguments || [];
			var set = _isSet(args[0]);
			var outer = ((_isSet(args[1]) && args[1] === true) === true);

			if (set) {
				return this.setText(args[0], outer);
			} else {
				return this.getText(outer);
			}

		},

		attributesList: function () {

			var data = {};
			for (var i = 0; i < this.length; i++) {
				if (this[i].attributes) {
					data = {};
					for (var n = 0; n < this[i].attributes.length; n++) {
						if (_isSet(this[i].attributes[n].name)) {
							data[this[i].attributes[n].name] = this[i].attributes[n].value;
						}
					}
				}
				return data;
			}
			return data;

		},

		setAttribute: function () {

			var args = arguments || [];
			var first = args[0] || "";
			var second = args[1];

			for (var i = 0; i < this.length; i++) {
				if (_isObject(first)) {
					for (var key in first) {
						if (_isSet(this[i].setAttribute)) {
							try{
								this[i].setAttribute(key, first[key]);
							}catch(err){}
						}
					}
				} else if (_isString(first) && _isSet(second)) {
					try{
						this[i].setAttribute(first, second);
					}catch(err){}
				}
			}
			return this;

		},

		setAttr: function () {
			var args = arguments || [];
			var first = args[0] || "";
			var second = args[1];
			return this.getAttribute(first,second);
		},

		getAttribute: function (attrName) {

			for (var i = 0; i < this.length; i++) {
				if (_isString(attrName)) {
					return this[i].getAttribute(attrName);
				}
			}
			return null;

		},

		getAttr: function (attrName) {
			return this.getAttribute(attrName);
		},

		attribute: function () {

			var args = arguments || [];
			var first = args[0];
			var second = args[1];

			for (var i = 0; i < this.length; i++) {

				if (_isObject(first)) {
					return this.setAttribute(first,second);
				} else if (_isString(first) && _isSet(second) ) {
					return this.setAttribute(first,second);
				} else if (_isString(first) && _isUndefined(second) && this[i] && this[i].getAttribute) {
					return this.getAttribute(first) || null;
				} else {
					return this.attributesList();
				}

			}

			return [];

		},

		attr: function(){
			var args = arguments || [];
			var first = args[0];
			var second = args[1];
			return this.attribute(first,second);
		},

		removeAttribute: function (attrName) {

			for (var i = 0; i < this.length; i++) {
				if (this[i] && this[i].removeAttribute) {
					if(_isString(attrName)){
						this[i].removeAttribute(attrName);
					}else if(_isArray(attrName)){
						for(var a=0; a<attrName.length; a++){
							this[i].removeAttribute(attrName[a]);
						}
					}else if(_isPureObject(attrName)){
						for(var k in attrName){
							if(!attrName.hasOwnProperty(k)){continue;}
							this[i].removeAttribute(attrName[k]);
						}
					}
				}
			}

			return this;

		},

		removeAttr: function (attrName) {
			return this.removeAttribute(attrName);
		},

		setProperty: function (propertyName, propertyValue) {

			for (var i = 0; i < this.length; i++) {
				if(this[i]){
					if (_isObject(propertyName)) {
						for (var key in propertyName) {
							try {
								this[i][key] = propertyName[key];
							} catch (err) {}
						}
					} else if (_isString(propertyName)) {
						try {
							this[i][propertyName] = propertyValue;
						} catch (err) {}
					}
				}
			}

			return this;

		},

		setProp: function (propertyName, propertyValue) {
			return this.setProperty(propertyName, propertyValue);
		},

		getProperty: function (propertyName) {

			for (var i = 0; i < this.length; i++) {

				if (_isString(propertyName)) {
					try {
						return this[i][propertyName];
					} catch (err) {
						return null;
					}
				}

			}

			return null;

		},

		getProp: function (propertyName) {
			return this.getProperty(propertyName);
		},

		property: function () {

			var args = arguments || [];
			var first = args[0];
			var second = args[2];
			for (var i = 0; i < this.length; i++) {
				if (_isObject(first)) {
					return this.setProperty(first);
				} else if (_isString(first) && _isSet(second)) {
					return this.setProperty(first, second);
				} else if (_isString(first) && _isUndefined(second) ) {
					return this.getProperty(first);
				}
			}
			
			return this;

		},

		prop: function () {
			var args = arguments || [];
			var first = args[0];
			var second = args[2];
			return this.property(first,second);
		},

		removeProperty: function (propertyName) {

			for (var i = 0; i < this.length; i++) {
				if(_isSet(this[i])){
					try {
						delete this[i][propertyName];
						if(_isFunction(this[i].removeAttribute)){ this[i].removeAttribute(propertyName); };
					} catch (err) {}
				}
			}

			return this;

		},

		removeProp: function (propertyName) {
			return this.removeProperty(propertyName);
		},

		getStyle: function (propertyName) {

			for (var i = 0; i < this.length; i++) {
				if (_isString(propertyName)) {
					var doc = this[i].ownerDocument || document;
					var win = (doc.defaultView || window);
					if (win && _isSet(win.getComputedStyle)) {
						return win.getComputedStyle(this[i], null).getPropertyValue(propertyName);
					}else if(this[i].currentStyle){
						return this[i].currentStyle[propertyName];
					}
					if (this[i].style){
						if(this[i].style.getPropertyValue){
							return this[i].style.getPropertyValue(propertyName);
						}else{
							return this[i].style[propertyName];
						}
					}
				}
			}

			return "";

		},

		setStyle: function (propertyName) {

			var args = arguments || [];
			propertyName = propertyName || args[0];
			var propertyValue = args[1];
			var propertyPriority = args[2];
			if (_isSet(propertyPriority)) {
				if (propertyPriority == "important" || propertyPriority === true) {
					propertyPriority = "important";
				} else {
					propertyPriority = "";
				}
			} else {
				propertyPriority = "";
			}
			
			for (var i = 0; i < this.length; i++) {

				if (_isObject(propertyName)) {

					for (var key in propertyName) {
						if (this[i].style){
							try {
								if(this[i].style.setProperty) {
									this[i].style[key] = propertyName[key];
									this[i].style.setProperty(key, propertyName[key], propertyPriority);
								}
							} catch (err) {}
						}
					}

				} else if (_isString(propertyName) && _isSet(propertyValue) ) {

					if (this[i].style){
						try {
							if(this[i].style.setProperty) {
								this[i].style[propertyName] = propertyValue;
								this[i].style.setProperty(propertyName, propertyValue, propertyPriority);
							}
						} catch (err) {}
					}

				}

			}

			return this;

		},

		removeStyle: function (propertyName) {

			for (var i = 0; i < this.length; i++) {

				if (_isObject(propertyName)) {

					propertyName = Object.entries(propertyName);

					for (var n = 0; n < propertyName.length; n++) {
						if (this[i].style) {
							this[i].style[propertyName[n]] = "";
							this[i].style[propertyName[n]] = null;
							if (_isSet(this[i].style.removeProperty)) {
								this[i].style.removeProperty(propertyName[n]);
							}
						}
					}

				} else if (_isString( propertyName)) {

					if (this[i].style) {
						this[i].style[propertyName] = "";
						this[i].style[propertyName] = null;
						if (_isSet(this[i].style.removeProperty)) {
							this[i].style.removeProperty(propertyName);
						}
					}

				}

			}

			return this;

		},

		style: function () {

			var args = arguments || [];
			var propertyName = args[0];
			var propertyValue = args[1];
			var propertyPriority = args[2];

			for (var i = 0; i < this.length; i++) {

				if (_isObject(propertyName)) {
					this.setStyle(propertyName, propertyValue, propertyPriority);
				} else if (_isString(propertyName) && _isSet(propertyValue)) {
					this.setStyle(propertyName, propertyValue, propertyPriority);
				} else if (_isString(propertyName) && _isUndefined(propertyValue)) {
					return this.getStyle(propertyName);
				}

			}

			return this;

		},

		css: function(){
			var args = arguments || [];
			var propertyName = args[0];
			var propertyValue = args[1];
			var propertyPriority = args[2];
			return this.style(propertyName, propertyValue, propertyPriority);
		},

		getValue: function () {

			for (var i = 0; i < this.length; i++) {

				if (_isSet(this[i].value)) {
					return this[i].value;
				}

			}

			return "";

		},

		getVal: function(){
			return this.getValue();
		},

		setValue: function (content) {

			for (var i = 0; i < this.length; i++) {
				if (_isSet(this[i])) {
					if (_isSet(content)) {
						if (_isSet(this[i].value)) {
							try{ this[i].value = content; }catch(err){}
						}
					}
				}
			}

			return this;

		},

		setVal: function(){
			return this.getValue();
		},

		value: function () {

			var args = arguments || [];
			var first = args[0];

			for (var i = 0; i < this.length; i++) {
				if (_isSet(this[i])) {
					if (_isSet(first)) {
						if (_isSet(this[i].value)) {
							try{ this[i].value = first; }catch(err){}
						}
					} else {
						return _isSet(this[i].value) ? this[i].value : '';
					}
				}
			}

			if (_isSet(first)) {
				return this;
			}else{
				return '';
			}

		},

		val: function(){
			var args = arguments || [];
			var first = args[0];
			return this.value(first);
		},

		remove: function () {

			for (var i = 0; i < this.length; i++) {

				try{
					if (this[i] && this[i].remove) {
						this[i].remove();
					} else if (this[i] && this[i].parentNode) {
						this[i].parentNode.removeChild(this[i]);
					}
				}catch(err){}

			}

			return this;

		},

		hide: function () {
			
			var args = arguments;
			var importance = (_isSet(args[0]) && args[0] === false) ? '' : 'important';

			for (var i = 0; i < this.length; i++) {

				if (this[i] && this[i].style) {
					this[i].style.setProperty("display", "none", importance);
				}

			}

			return this;

		},

		show: function () {

			var styleDisplay = 'block';
			var args = arguments;
			var displayType = _isSet(args[0]) ? args[0] : styleDisplay;
			
			var displayTypes = ['inherit', 'initial', 'inline', 'block', 'contents', 'flex', 'grid', 'inline-block', 'inline-flex', 'inline-grid', 'inline-table', 'list-item', 'run-in', 'table', 'table-caption', 'table-header-group', 'table-footer-group', 'table-column', 'table-column-group', 'table-row', 'table-row-group', 'table-cell'];
			try{
				if (displayType && displayTypes.indexOf(displayType) > -1) {
					displayType = displayType.toLowerCase();
				}else{
					displayType = styleDisplay;
				}
			}catch(err){
				displayType = styleDisplay;
			}
			
			return this.setStyle( "display", displayType, "important" );

		},

		classList: function(){

			var classList = [];

			for (var i = 0; i < this.length; i++) {
				if( _isSet(this[0].classList) ){
					return this[i].classList;
				}else if( _isSet(this[i].getAttribute) ){
					classList = [];
					var classAttr = _isSet(this[i].getAttribute);
					if(classAttr){ 
						var splitList = classAttr.split(" ");
						for( var k=0; k < splitList.length; k++ ){
							if(splitList[i]!=""){ classList = classList.concat(splitList[i]); }
						}
					}
					return classList;
				}
			}
			
			return classList;

		},

		hasClass: function (className) {

			for (var i = 0; i < this.length; i++) {
				return this.classList().indexOf(className)>-1;
			}

			return false;

		},

		addClass: function (className) {

			if ( _isString(className) ) {
				var item, classList;
				for (var i = 0; i < this.length; i++) {
					try{
						if (this[i] && _isSet(this[i].classList)) {
							this[i].classList.add(className);
						}else{
							item=jDoms(this[i]);
							classList = jDoms(this[i]).classList();
							if( classList.indexOf(className)==-1){
								classList = classList.concat(className);
								item.setAttribute("class", classList.join(" ") );
							}
						}
					}catch(err){}
				}
			}

			return this;

		},

		removeClass: function (className) {

			if ( _isString(className) ) {
				var item, classList;
				for (var i = 0; i < this.length; i++) {
					try{
						if (this[i] && _isSet(this[i].classList)) {
							this[i].classList.remove(className);
						}else{
							item=jDoms(this[i]);
							classList = jDoms(this[i]).classList();
							classList = jDoms.unique(classList);
							if( classList.indexOf(className)>-1){
								for( var k=0; k<classList.length; k++){
									if(classList[k]==className){ classList.splice(k,1); break;} continue;
								}
								item.setAttribute("class", classList.join(" ") );
							}
						}
					}catch(err){}
				}
			}

			return this;

		},

		class: function(){
			return this.classList();
		},

		empty: function () {

			for (var i = 0; i < this.length; i++) {
				if(this[i]) {
					if(_isSet(this[i].value)){
						this[i].value="";
					}else if(_isSet(this[i].innerHTML)){
						this[i].innerHTML="";
					}
				}
			}

			return this;

		},

		normalize: function () {

			for (var i = 0; i < this.length; i++) {
				if( _isSet(this[i].normalize) ){ this[i].normalize(); }
			}

			return this;

		},

		getWidth: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].clientWidth){ return this[i].clientWidth; }
				return 0;
			}

			return 0;

		},

		getHeight: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].clientHeight){ return this[i].clientHeight; }
				return 0;
			}

			return 0;

		},

		setWidth: function(width){

			if(_isNumber(width)){width=width+"px";}
			return this.setStyle("width", width);

		},

		setHeight: function(height){

			if(_isNumber(height)){height=height+"px";}
			return this.setStyle("height", height);

		},

		width: function(){

			var args = arguments || [];
			var width = args[0];
			if(_isSet(width)){
				return this.setWidth(width);
			}else{
				return this.getWidth();
			}

		},

		height: function(){

			var args = arguments || [];
			var height = args[0];
			if(_isSet(height)){
				return this.setHeight(height);
			}else{
				return this.getHeight();
			}

		},

		offsetWidth: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].offsetWidth){ return this[i].offsetWidth; }
				if(this[i].getBoundingClientRect){ return this[i].getBoundingClientRect().width; }
				return 0;
			}
			return 0;

		},

		offsetHeight: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].offsetHeight){ return this[i].offsetHeight; }
				if(this[i].getBoundingClientRect){ return this[i].getBoundingClientRect().height; }
				return 0;
			}
			return 0;
		},

		offsetLeft: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].offsetLeft){ return this[i].offsetLeft; }
				if(this[i].getBoundingClientRect){ return this[i].getBoundingClientRect().left; }
				return 0;
			}
			return 0;

		},

		offsetTop: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i].offsetTop){ return this[i].offsetTop; }
				if(this[i].getBoundingClientRect){ return this[i].getBoundingClientRect().top; }
				return 0;
			}
			return 0;
		},

		offset: function(){

			var data = {left: 0, top: 0, x:0, y:0 };

			for (var i = 0; i < this.length; i++) {
				
				if( _isSet(this[i].offsetLeft)){ data.left=data.x=this[i].offsetLeft; }
				if( _isSet(this[i].offsetTop)){ data.top=data.y=this[i].offsetTop; }
				
				if(_isSet(this[i].getBoundingClientRect)){
					var r = this[i].getBoundingClientRect();
					data.left==r.left;
					data.x=r.x;
					data.top==r.top;
					data.y=r.y;
				}

				return data;

			}

			return data;

		},

		innerWidth: function(){

			for (var i = 0; i < this.length; i++) {
				var width = jDoms(this[i]).getStyle("width");
					width = isNaN(parseFloat(width))?0:parseFloat(width);
				var paddingLeft = jDoms(this[i]).getStyle("padding-left");
					paddingLeft = isNaN(parseFloat(paddingLeft))?0:parseFloat(paddingLeft);
				var paddingRight = jDoms(this[i]).getStyle("padding-right");
					paddingRight = isNaN(parseFloat(paddingRight))?0:parseFloat(paddingRight);
				var borderLeft = jDoms(this[i]).getStyle("border-left");
					borderLeft = isNaN(parseFloat(borderLeft))?0:parseFloat(borderLeft);
				var borderRight = jDoms(this[i]).getStyle("border-right");
					borderRight = isNaN(parseFloat(borderRight))?0:parseFloat(borderRight);
				var BoxSizing = jDoms(this[i]).getStyle("box-sizing");
				if(width){ return width;}
				if(_isSet(this[i].offsetWidth)){ return (BoxSizing=="border-box") ? this[i].offsetWidth : this[i].offsetWidth - (paddingLeft+paddingRight); }
				if(_isSet(this[i].getBoundingClientRect)){ return (BoxSizing=="border-box") ? this[i].getBoundingClientRect().width : this[i].getBoundingClientRect().width - ( paddingLeft+paddingRight+borderLeft+borderRight ) ; }
				return 0;
			}
			return 0;

		},

		innerHeight: function(){

			for (var i = 0; i < this.length; i++) {
				
				var height = jDoms(this[i]).getStyle("height");
					height = isNaN(parseFloat(height))?0:parseFloat(height);
				var paddingTop = jDoms(this[i]).getStyle("padding-top");
					paddingTop = isNaN(parseFloat(paddingTop))?0:parseFloat(paddingTop);
				var paddingBottom = jDoms(this[i]).getStyle("padding-bottom");
					paddingBottom = isNaN(parseFloat(paddingBottom))?0:parseFloat(paddingBottom);
				var borderTop = jDoms(this[i]).getStyle("border-top");
					borderTop = isNaN(parseFloat(borderTop))?0:parseFloat(borderTop);
				var borderBottom = jDoms(this[i]).getStyle("border-bottom");
					borderBottom = isNaN(parseFloat(borderBottom))?0:parseFloat(borderBottom);
					var BoxSizing = jDoms(this[i]).getStyle("box-sizing");
				if(height){ return height;}
				if(_isSet(this[i].offsetHeight)){ return (BoxSizing=="border-box") ? this[i].offsetHeight : this[i].offsetHeight - (paddingTop+paddingBottom); }
				if(_isSet(this[i].getBoundingClientRect)){ return (BoxSizing=="border-box") ? this[i].getBoundingClientRect().height : this[i].getBoundingClientRect().height - ( paddingTop+paddingBottom+borderTop+borderBottom ) ; }
				return 0;
			}
			return 0;

		},

		outerWidth: function(){
			
			for (var i = 0; i < this.length; i++) {
				var width = jDoms(this[i]).getStyle("width");
					width = isNaN(parseFloat(width))?0:parseFloat(width);
				var paddingLeft = jDoms(this[i]).getStyle("padding-left");
					paddingLeft = isNaN(parseFloat(paddingLeft))?0:parseFloat(paddingLeft);
				var paddingRight = jDoms(this[i]).getStyle("padding-right");
					paddingRight = isNaN(parseFloat(paddingRight))?0:parseFloat(paddingRight);
				var borderLeft = jDoms(this[i]).getStyle("border-left");
					borderLeft = isNaN(parseFloat(borderLeft))?0:parseFloat(borderLeft);
				var borderRight = jDoms(this[i]).getStyle("border-right");
					borderRight = isNaN(parseFloat(borderRight))?0:parseFloat(borderRight);
				var marginLeft = jDoms(this[i]).getStyle("margin-left");
					marginLeft = isNaN(parseFloat(marginLeft))?0:parseFloat(marginLeft);
				var marginRight =jDoms(this[i]).getStyle("margin-right");
					marginRight = isNaN(parseFloat(marginRight))?0:parseFloat(marginRight);
				var BoxSizing = jDoms(this[i]).getStyle("box-sizing");
				if(_isSet(this[i].getBoundingClientRect)){ return this[i].getBoundingClientRect().width+(marginLeft+marginRight); }
				if(_isSet(this[i].clientWidth)){ return this[i].clientWidth+(marginLeft+marginRight); }
				return (BoxSizing=="border-box") ? width+marginLeft  : width+(paddingLeft+paddingRight+borderLeft+borderRight+marginLeft+marginRight);

			}
			return 0;

		},

		outerHeight: function(){

			for (var i = 0; i < this.length; i++) {
				var height = jDoms(this[i]).getStyle("height");
					height = isNaN(parseFloat(height))?0:parseFloat(height);
				var paddingTop = jDoms(this[i]).getStyle("padding-top");
					paddingTop = isNaN(parseFloat(paddingTop))?0:parseFloat(paddingTop);
				var paddingBottom = jDoms(this[i]).getStyle("padding-bottom");
					paddingBottom = isNaN(parseFloat(paddingBottom))?0:parseFloat(paddingBottom);
				var borderTop = jDoms(this[i]).getStyle("border-top");
					borderTop = isNaN(parseFloat(borderTop))?0:parseFloat(borderTop);
				var borderBottom = jDoms(this[i]).getStyle("border-bottom");
					borderBottom = isNaN(parseFloat(borderBottom))?0:parseFloat(borderBottom);
				var marginTop = jDoms(this[i]).getStyle("margin-top");
					marginTop = isNaN(parseFloat(marginTop))?0:parseFloat(marginTop);
				var marginBottom = jDoms(this[i]).getStyle("margin-bottom");
					marginBottom = isNaN(parseFloat(marginBottom))?0:parseFloat(marginBottom);
				var BoxSizing = jDoms(this[i]).getStyle("box-sizing");
				if(_isSet(this[i].getBoundingClientRect)){ return this[i].getBoundingClientRect().height+marginTop+marginBottom; }
				if(_isSet(this[i].clientHeight)){ return this[i].clientHeight+marginTop+marginBottom; }
				return (BoxSizing=="border-box") ? height+marginTop+marginBottom : height+paddingTop+paddingBottom+borderTop+borderBottom+marginTop+marginBottom;
			}
			return 0;

		},

		scrollWidth: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i] && _isSet(this[i].scrollWidth)){ return this[i].scrollWidth; }
				return 0;
			}
			return 0;

		},

		scrollHeight: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i] && _isSet(this[i].scrollHeight)){ return this[i].scrollHeight; }
				return 0;
			}
			return 0;
			
		},

		scrollTop: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i] && _isSet(this[i].scrollTop)){ return this[i].scrollTop; }
				return 0;
			}
			return 0;
			
		},

		scrollLeft: function(){

			for (var i = 0; i < this.length; i++) {
				if(this[i] && _isSet(this[i].scrollLeft)){ return this[i].scrollLeft; }
				return 0;
			}
			return 0;
			
		},

		scrollTo: function(){

			var args = arguments||[];
			var x = args[0];
			var y = args[1];
			for (var i = 0; i < this.length; i++) {

				try{

					if(_isSet(this[i].scrollTo) ){
						if( _isPureObject(x) ){
							if(_isUndefined(x.top) && _isSet(x.y)){x.top=x.y;}
							if(_isUndefined(x.left) && _isSet(x.x)){x.left=x.x;}
							this[i].scrollTo(x);
						}else if(_isNumber(x) && (_isNumber(y) || !_isSet(y) ) ){
							this[i].scrollTo(x,y||0);
						}
					}

				}catch(err){}
				
			}
			
			return this;

		},

		scrollBy: function(){

			var args = arguments||[];
			var x = args[0];
			var y = args[1];
			for (var i = 0; i < this.length; i++) {

				try{
					
					if(  _isSet(this[i].scrollBy) ){
						if( _isPureObject(x) ){
							if(_isUndefined(x.top) && _isSet(x.y)){x.top=x.y;}
							if(_isUndefined(x.left) && _isSet(x.x)){x.left=x.x;}
							this[i].scrollBy(x);
						}else if( _isNumber(x) && ( _isNumber(y) || !_isSet(y) ) ){
							this[i].scrollBy(x,y||0);
						}
					}

				}catch(err){}
				
			}
			
			return this;

		},

		click: function () {
			
			for (var i = 0; i < this.length; i++) {
				if(this[i].click){ this[i].click(); return jDoms( this[i] ); }
			}

			return null;

		},

		focus: function () {
			
			for (var i = 0; i < this.length; i++) {
				if(this[i].focus){ this[i].focus(); return jDoms( this[i] ); }
			}

			return null;

		},

		blur: function () {
			
			for (var i = 0; i < this.length; i++) {
				if(this[i].blur){ this[i].blur(); return jDoms( this[i] ); }
			}

			return null;

		},

		select: function () {
			
			for (var i = 0; i < this.length; i++) {
				if(this[i].select){ this[i].select(); return jDoms( this[i] ); }
			}

			return null;

		},

		delay: function (callback, ms) {

			var delay = (function () {
				var timer = 0;
				return function (callback, ms) {
					clearTimeout(timer);
					timer = setTimeout(callback, ms);
				};
			})();

			return delay(callback, ms);

		},

		openFullscreen: function () {

			for (var i = 0; i < this.length; i++) {

				if (this[i].requestFullscreen) {
					this[i].requestFullscreen();
					return true;
				} else if (this[i].webkitRequestFullscreen) {
					this[i].webkitRequestFullscreen();
					return true;
				} else if (this[i].msRequestFullscreen) {
					this[i].msRequestFullscreen();
					return true;
				}

				return false;

			}

			return false;

		},
		
		document: function () {

			for (var i = 0; i < this.length; i++) {
				return (this[i].nodeType && this[i].nodeType == 9) ? this[i] : (this[i].ownerDocument || this.ownerDocument || document);
			}

			return this.ownerDocument || window.document|| document || null;

		},

		window: function () {

			var doc=this.document||document;
			for (var i = 0; i < this.length; i++) {
				doc = (this[i].nodeType && this[i].nodeType == 9) ? this[i] : (this[i].ownerDocument || this.ownerDocument || document);
			}

			return doc.defaultView || window || this.window || globalThis || null;

		},

		buildQuery: function () {

			var args = arguments || [];
			var data = '';

			var elements = _isSet(args[0]) ? jDoms(args[0]) : ( _isSet(this[0]) && _isSet(this[0].elements) ? this[0].elements : [] );

			if (elements) {

				for (var i = 0; i < elements.length; i++) {

					if (elements[i].name) {

						if (elements[i].type.toLowerCase() == 'radio' || elements[i].type.toLowerCase() == 'checkbox') {

							if (elements[i].checked == true) {

								data += elements[i].name + '=' + encodeURIComponent(elements[i].value) + '&';

							}

						} else {

							data += elements[i].name + '=' + encodeURIComponent(elements[i].value) + '&';

						}
					}
				}
			}

			if (data.length > 2) {
				data = data.substring(0, data.length - 1);
			}

			return data;

		},

		buildFormData: function () {

			var data = _isFunction(FormData) ? new FormData() : null;

			if ( data!=null && this[0] && this[0].elements) {

				var elements = this[0].elements;

				for (var i = 0; i < elements.length; i++) {

					if (elements[i].name) {
						if (elements[i].type.toLowerCase() == 'radio' || elements[i].type.toLowerCase() == 'checkbox') {
							if (elements[i].checked == true) {
								data.append(elements[i].name, elements[i].value);
							}
						} else if (elements[i].type.toLowerCase() == 'file') {
							for (var j = 0; j < elements[i].files.length; j++) {
								data.append(elements[i].name + '[]', elements[i].files[j]);
							}
						} else {
							data.append(elements[i].name, elements[i].value);
						}
					}
				}
			}

			return data;

		},
		
		dateParse: function () {

			var codes = this._ || {};
			return jDoms.dateParse( codes );

		},

		urlParse: function () {

			var codes = this._ || {};
			return jDoms.urlParse( codes );

		},
		
		xmlParse: function () {
			
			var args = arguments||[];

			if(_isSet( args[0] )){
				return jDoms.xmlParse( args[0] );
			}else{
				for( var i=0; i < this.length; i++ ){
					return jDoms.xmlParse( this[i] );
				}
				return jDoms.xmlParse( {} );
			}

		},

		htmlParse: function () {
			
			var args = arguments||[];
			if(_isSet( args[0] )){
				return jDoms.htmlParse( args[0] );
			}else{
				for( var i=0; i < this.length; i++ ){
					return jDoms.htmlParse( this[i] );
				}
				return jDoms.htmlParse( {} );
			}

		},

		jsonParse: function () {
			
			var args = arguments||[];
			if(_isSet( args[0] )){
				return jDoms.jsonParse( args[0] );
			}else{
				for( var i=0; i < this.length; i++ ){
					return jDoms.jsonParse( this[i] );
				}
				return jDoms.jsonParse( {} );
			}

		}

	};

	
	var jDoms = function () {
			
		var args = arguments||[];

		var selectors = args[0] || [],
			context = args[1] || '',
			root = _isSet(args[2]) ? args[2] : document;
			
		var jDomsList = new jDoms.jDomsList(selectors, context, root);

		jDoms.jDomsList.prototype.constructor = jDoms;
		jDoms.jDomsList.prototype.version = version;
		jDoms.jDomsList.prototype._ = selectors;
		jDoms.jDomsList.prototype.__ = context;
		jDoms.jDomsList.prototype.___ = root;

		for (var functionName in functions) {
			if (!functions.hasOwnProperty(functionName)) {
				continue;
			}
			if (_isUndefined(functionName) || _isUndefined(functions[functionName]) ) {
				continue;
			}
			jDoms.jDomsList.prototype[functionName] = functions[functionName];
		}

		for (var fncName in jDoms.fnc) {
			if (!jDoms.fnc.hasOwnProperty(fncName)) {
				continue;
			}
			if (_isUndefined(fncName) || _isUndefined(jDoms.fnc[fncName])) {
				continue;
			}
			if (_isSet(functions[fncName])) {
				continue;
			}
			jDoms.jDomsList.prototype[fncName] = jDoms.fnc[fncName];
		}

		return jDomsList;

	};

	jDoms.jDomsList = function (selectors) {

		var args = arguments || [];
		selectors = selectors || args[0] || [];
		var context = args[1] || '',
			root = _isSet(args[2]) ? args[2] : document;

		var domArr = [];
		var from = null;
		var length = 0;

		try {

			if (selectors == window) {
				domArr = [window];
				from = "window";
			} else if (selectors == document) {
				domArr = [document];
				from = "document";
			} else if (selectors && typeof selectors == 'object' ) {
				if(_isjDoms(selectors)){
					for(var i=0; i<selectors.length; i++){
						if(_isSet(selectors[i])){
							domArr = domArr.concat(selectors[i]);
						}
					}
					from = "jDoms";
				}else if(_isArray(selectors)){
					domArr = selectors;
					from = "array";
				} else if ( _isSet(selectors.nodeType) && _isSet(selectors.nodeName) && _isSet(selectors.nodeValue) ) {
					domArr = [selectors];
					from = "node";
				}else{
					domArr = selectors;
					from = "object";
				}
			} else if (_isString(selectors)) {
				if (_isSet(root.querySelectorAll)) {
					domArr = root.querySelectorAll(selectors);
					from = "query_selector_all";
				} else if (selectors.substr(0, 1) == "#" && selectors.replace(/[\.\/\`\'\=\<\>\~\%\(\)\[\]\{\}\|\*\^\:\"\s\\]/gi, "") == selectors && _isSet(root.getElementById)) {
					var domArr2 = root.getElementById(selectors.substr(1));
					domArr = (domArr2 == null ? [] : [domArr2]);
					from = "id";
				} else if (selectors.substr(0, 1) == "." && selectors.replace(/[\#\/\\\"\`\'\=\<\>\~\%\(\)\[\]\{\}\|\*\^\:\s]/gi, "") == selectors && _isSet(root.getElementsByClassName)) {
					domArr = root.getElementsByClassName(selectors.substr(1));
					domArr = (domArr == null ? [] : domArr);
					from = "class_name";
				} else if (selectors.substr(0, 6) == "[name=" && selectors.substr(-1) == "]" && selectors.substr(6, selectors.length - 7).replace(/^[\s+\"\']|[\s+\"\']$/gm, "") == selectors.substr(6, selectors.length - 7).replace(/[^A-Za-z0-9_-]/gi, "") && _isSet(root.getElementsByName)) {
					domArr = root.getElementsByName(selectors.substr(6, selectors.length - 7).replace(/^[\s+\"\']|[\s+\"\']$/gm, ""));
					domArr = (domArr == null ? [] : domArr);
					from = "name";
				} else if (selectors.replace(/[^A-Za-z0-9_-]/gi, "") == selectors && _isSet(root.getElementsByTagName) ) {
					domArr = root.getElementsByTagName(selectors);
					domArr = (domArr == null ? [] : domArr);
					from = "tag_name";
				} else if (_isString(context)) {
					domArr = root.getElementsByTagNameNS(context, selectors);
					domArr = (domArr == null ? [] : domArr);
					from = "tag_name_ns";
				}
			}

		} catch (err) {
			domArr = [];
			from = "error_catch";
		}

		if (typeof domArr == 'object' && !(["window","document","jDoms","object","array","id","node"].indexOf(from)>-1)) {
			domArr = (typeof Array == 'function' && typeof Array.from == 'function' && typeof Array.isArray == 'function' && !Array.isArray(domArr)) ? Array.from(domArr) : (typeof Object == 'function' && typeof Object.entries == 'function') ? Object.entries(domArr) : domArr;
		}

		for (var key in domArr) {
			if (domArr[key]) {
				this[parseInt(key)] = domArr[key];
				length++;
			}
		}
		
		this.length = length || 0;
		
		return this;

	};

	jDoms.fnc = jDoms.prototype = {};

	jDoms.version = version;

	jDoms.developer = developer;

	jDoms.isUndefined = function(variable){ return _isUndefined(variable); };

	jDoms.isSet = function(variable){ return _isSet(variable); };

	jDoms.isString = function(variable){ return _isString(variable); };

	jDoms.isNumber = function(variable){ return _isNumber(variable); };

	jDoms.isFinite = function(variable){ return _isFinite(variable); };

	jDoms.isInfinity = function(variable){ return _isInfinity(variable); };

	jDoms.isBoolean = function(variable){ return _isBoolean(variable); };

	jDoms.isBigInt = function(variable){ return _isBigInt(variable); };

	jDoms.isFlatten = function(variable){ return _isFlatten(variable); };
	
	jDoms.isEmpty = function(variable){ return _isEmpty(variable); };

	jDoms.isArray = function(variable){ return _isArray(variable); };

	jDoms.isFunction = function(variable){ return _isFunction(variable); };

	jDoms.isObject = function(variable){ return _isObject(variable); };

	jDoms.isPureObject = function(variable){ return _isPureObject(variable); };
	
	jDoms.isSymbol = function(variable){ return _isSymbol(variable); };

	jDoms.isjDoms = function(variable){ return _isjDoms(variable); };

	jDoms.sizeOf = function(variable){ return _sizeOf(variable); };

	jDoms.trim = function(str){ return _trim(str); };

	jDoms.unique = function (arr) { return _unique(arr); };

	jDoms.merge = function (obj, nextObj) { return _merge(obj, nextObj); };

	jDoms.escape = function(rawStr){ return _escape(rawStr); };

	jDoms.encodeString = function(rawStr){ return _escape(rawStr); };

	jDoms.unescape = function(encodedStr){ return _unescape(encodedStr); };

	jDoms.decodeString = function(encodedStr){ return _unescape(encodedStr); };

	jDoms.encodeBase64 = function( rawStr ){ return _encodeBase64(rawStr); };

	jDoms.decodeBase64 = function( encodedStr ){ return _decodeBase64(encodedStr); };

	jDoms.stringify = function( value ){ return _stringify.getString(value); };

	jDoms.delay = function (callback, ms) { return _delay(callback, ms); };

	jDoms.now = function(){ return _now(); };

	jDoms.promise = function(resolve, reject){ return _promise(resolve, reject); };

	jDoms.dateParse = function(date){ return _dateParse(date); };

	jDoms.urlParse = function (url) { return _urlParse(url); };

	jDoms.jsonParse = function (json_codes) { return _jsonParse(json_codes); };

	jDoms.xmlParse =  function(xml){ return _xmlParse(xml); };

	jDoms.htmlParse =  function(html){ return _htmlParse(html); };
	
	jDoms.ajax = function (ajx) { return _ajax(ajx); };
	
	jDoms.document = function () {

		for (var i = 0; i < this.length; i++) {
			return (this[i].nodeType && this[i].nodeType == 9) ? this[i] : (this[i].ownerDocument || this.ownerDocument || document);
		}
		return this.ownerDocument || window.document|| document || null;

	};

	jDoms.window = function () {

		var doc=this.document||document;
		for (var i = 0; i < this.length; i++) {
			doc = (this[i].nodeType && this[i].nodeType == 9) ? this[i] : (this[i].ownerDocument || this.ownerDocument || document);
		}

		return doc.defaultView || window || this.window || globalThis || null;

	};

	jDoms.userAgent = function(){
		return navigator.userAgent;
	};

	jDoms.isCookie = function(){ 
		return navigator.cookieEnabled;
	};

	jDoms.setCookie = function( cookieName, cookieValue, expireTime ){
		if(!navigator.cookieEnabled) { return false; }
        var cookiePath = (arguments || [])[3] || "/";
        var secure = (window.location.protocol=="https:");
        var d = new Date();
        d.setTime(d.getTime() + parseInt(expireTime) );
        var expires = "expires="+d.toUTCString();
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=" + cookiePath + ";" + (secure?"SameSite=None; Secure;":"");
		return true;
    };
	
    jDoms.getCookie = function( cookieName ){ 
        var name = cookieName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') { c = c.substring(1); }
            if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
        }
        return null;
    };
	
    jDoms.removeCookie = function( cookieName ){
		var d = new Date(0);
		document.cookie = cookieName +"=; path=/; expires="+d.toUTCString()+";";
		return true;
    };

	jDoms.geo = function(callback){
		var data = { result: false, accuracy: null, altitude: null, altitudeAccuracy: null, heading: null, latitude: null, longitude: null, speed: null, timestamp: (new Date()).getTime() };
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(geo){
				data.result = geo.coords.result = true;
				data.accuracy = geo.coords.accuracy||null;
				data.altitude = geo.coords.altitude||null;
				data.altitudeAccuracy = geo.coords.altitudeAccuracy||null;
				data.heading = geo.coords.heading||null;
				data.latitude = geo.coords.latitude||null;
				data.longitude = geo.coords.longitude||null;
				data.speed = geo.coords.speed||null;
				data.timestamp = (new Date()).getTime();
				callback(data);
			});
		}else{
			data.timestamp = (new Date()).getTime();
			callback(data);
		}
	};

	jDoms.closeFullscreen = function() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			return true;
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
			return true;
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
			return true;
		}
		return false;
	};

	jDoms.active = function(){
		return jDoms(jDoms.document().activeElement);
	};

	jDoms.domReady = function(callback){
		var done = false,
        top = true,
        called = false,
		win = window || globalThis || self,
        doc = win.document,
        root = doc.documentElement,
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',
        init = function (e) {
            if (e.type == 'readystatechange' && doc.readyState != 'complete') { return; }
            (e.type == 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) { if(!called){ called=true; callback.call(win, e.type || e); } }
        },
        poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };
		if (doc.readyState == 'complete'){ 
			if(!called){ called=true; callback.call(win, 'lazy'); }
		} else {
			if (doc.createEventObject && root.doScroll) {
				try {
					top = !win.frameElement;
				} catch (e) {}
				if (top){ poll(); }
			}
			doc[add](pre + 'DOMContentLoaded', init, false);
			doc[add](pre + 'readystatechange', init, false);
			win[add](pre + 'load', init, false);
		}
	};
	
	jDoms.docReady = jDoms.domReady;
	jDoms.ready = jDoms.domReady;

	return jDoms;

})));