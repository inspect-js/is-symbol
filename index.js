'use strict';

var callBound = require('call-bind/callBound');
var $toString = callBound('Object.prototype.toString');
var hasSymbols = require('has-symbols')();
var safeRegexTest = require('safe-regex-test');

if (hasSymbols) {
	var $symToStr = callBound('Symbol.prototype.toString');
	var isSymString = safeRegexTest(/^Symbol\(.*\)$/);
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return isSymString($symToStr(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (!value || typeof value !== 'object' || $toString(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return false && value;
	};
}
