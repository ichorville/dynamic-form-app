window["idf"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	
	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var idf = function () {
		function idf(selector) {
			_classCallCheck(this, idf);
	
			this.selector = document.querySelector(selector);
		}
	
		_createClass(idf, [{
			key: 'html',
			value: function html() {
				var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
				if (content !== null) {
					this.selector.innerHTML = content;
				}
				return this.selector.innerHTML;
			}
		}, {
			key: 'init',
			value: function init() {
				var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
	
				if (content == null) {
					this.selector.innerHTML = '\n\t\t\t\t<div id="idf_float_btn_div" class="mdl-grid">\n\t\t\t\t\t<!-- floating button with menu functionality -->\n\t\t\t\t\t<div class="mdl-cell mdl-cell--1-col">\n\t\t\t\t\t\t<button id="idf_add_btn" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored float">\n\t\t\t\t\t\t\t<i class="material-icons">add</i>\n\t\t\t\t\t\t</button>\n\t\t\t\t\t\t<div class="mdl-tooltip" data-mdl-for="idf_add_btn">\n\t\t\t\t\t\t\tAdd Question\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t';
	
					this.idf_add_btn = document.getElementById('idf_add_btn');
					this.idf_add_btn.addEventListener('click', this.addQuestion);
				}
				return this.selector;
			}
		}, {
			key: 'addQuestion',
			value: function addQuestion(event) {
				console.log('came in');
				console.log(event);
				console.log(this);
			}
		}]);
	
		return idf;
	}();
	
	// export the class instance via a function call
	
	
	module.exports = function (selector) {
		return new idf(selector);
	};

/***/ })
/******/ ]);
//# sourceMappingURL=idf.js.map