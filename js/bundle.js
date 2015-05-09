(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ADD_STRINGS = ['add'];
var SUB_STRINGS = ['sub'];
var MULTIPLY_STRINGS = ['muliply'];
var DIVIDE_STRINGS = ['divide'];
var VALID_STATES = [].concat(ADD_STRINGS, SUB_STRINGS, MULTIPLY_STRINGS, DIVIDE_STRINGS);

module.exports = function (createOptions) {
	var memory;
	var state;
	var current;
	var firstCalculation;

	init();
	return {
		getState: getState,
		hasState: hasState,
		setState: setState,
		unsetState: unsetState,
		getCurrent: getCurrent,
		hasMemory: hasMemory,
		storeInMemoryAndResetCurrent: storeInMemoryAndResetCurrent,
		setAdd: setterTemplate(ADD_STRINGS[0]),
		setSub: setterTemplate(SUB_STRINGS[0]),
		setMultiply: setterTemplate(MULTIPLY_STRINGS[0]),
		setDivide: setterTemplate(DIVIDE_STRINGS[0]),
		numberInput: numberInput,
		appendDigit: appendDigit,
		calculate: calculate,
		calc: calculate,
		clear: clear
	}

	function init() {
		createOptions = createOptions || {};
		memory = createOptions.memory || undefined;
		current = createOptions.current || 0;
		state = createOptions.state || undefined;

		firstCalculation = true;
	}

	function getCurrent() {
		return current;
	}

	function setterTemplate(newState) {
		return function() {
			setState(newState);
		}
	}

	function numberInput(newNumber) {
		if(state === undefined) {
			memory = newNumber;
		}
		else {
			current = newNumber;
		}
	}
	function storeInMemoryAndResetCurrent() { 
		memory = current;
		current = 0;
	}

	function appendDigit(number) {
		current = current * 10 + number;
	}

	function unsetState() {
		state = undefined;
	}

	function setState(newState) {
		if(!contains(VALID_STATES, newState)) {
			throw Error('State must be one of valid states: ' + VALID_STATES.toString());
		}
		state = newState;
		storeInMemoryAndResetCurrent();
		if (!firstCalculation) {
			firstCalculation = true;
		}
	}

	function hasState() {
		return (state !== undefined);
	}
	
	function hasMemory() {
		return (memory !== undefined);
	}

	function getState() {
		return state;
	}

	function calculate() {
		if(firstCalculation) {
			if(!memory) memory = 0;
			
			var temp = current;
			current = memory;
			memory = temp;
			firstCalculation = false;
		}

		if(contains(ADD_STRINGS, state)) {
			current += memory;
		}
		else if(contains(SUB_STRINGS, state)) {
			current -= memory;
		}
		else if(contains(MULTIPLY_STRINGS, state)) {
			current *= memory;
		}
		else if(contains(DIVIDE_STRINGS, state)) {
			current /= memory;
		}
	}

	function clear() {
		state = undefined;
		memory = undefined;
		current = 0;
		firstCalculation = true;
	}

	/* HELPERS */
	
	function contains(arr, value) {
		var check = (arr.indexOf(value) >= 0);
		return check;
	}

}
},{}],2:[function(require,module,exports){
var Calculator = require('./Calculator.js')
window.addEventListener('load', function(){
		testB = document.getElementById('body');

	//Android 2.2 needs FastClick to be instantiated before the other listeners so that the stopImmediatePropagation hack can work.
	FastClick.attach(testB);
},false);


jQuery(document).ready(function($) {
	var calculator = Calculator();

	function render() {
		$('.result').html(calculator.getCurrent());
	}

	$('#all-clear').on('click', function() {
		calculator.clear();
		render();
	});


	$('.numbers .number').on('click', function(){
		if (calculator.hasState() && !calculator.hasMemory()) {
			calculator.storeInMemoryAndResetCurrent();
		}

		var digit = + $(this).html();
		calculator.appendDigit(digit);
		render();
	});

	$('#minus').on('click', calculator.setSub);
	$('#plus').on('click', calculator.setAdd);
	$('#times').on('click', calculator.setMultiply);
	$('#divide').on('click', calculator.setDivide);
	
	$('#calc').on('click', function(){
		calculator.calc();
		render();
	});

	$('.dot').on('click', function(){
		if(/[.]/.test($('.result').html()) == false){
			$('.result').append(".");
		}
	});

	$('.row div:last-child').on('click', function(){});
	$('.numbers .number').on('touchend', function(){});

});
},{"./Calculator.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdjAuMTAuMzcvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvQ2FsY3VsYXRvci5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgQUREX1NUUklOR1MgPSBbJ2FkZCddO1xudmFyIFNVQl9TVFJJTkdTID0gWydzdWInXTtcbnZhciBNVUxUSVBMWV9TVFJJTkdTID0gWydtdWxpcGx5J107XG52YXIgRElWSURFX1NUUklOR1MgPSBbJ2RpdmlkZSddO1xudmFyIFZBTElEX1NUQVRFUyA9IFtdLmNvbmNhdChBRERfU1RSSU5HUywgU1VCX1NUUklOR1MsIE1VTFRJUExZX1NUUklOR1MsIERJVklERV9TVFJJTkdTKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3JlYXRlT3B0aW9ucykge1xuXHR2YXIgbWVtb3J5O1xuXHR2YXIgc3RhdGU7XG5cdHZhciBjdXJyZW50O1xuXHR2YXIgZmlyc3RDYWxjdWxhdGlvbjtcblxuXHRpbml0KCk7XG5cdHJldHVybiB7XG5cdFx0Z2V0U3RhdGU6IGdldFN0YXRlLFxuXHRcdGhhc1N0YXRlOiBoYXNTdGF0ZSxcblx0XHRzZXRTdGF0ZTogc2V0U3RhdGUsXG5cdFx0dW5zZXRTdGF0ZTogdW5zZXRTdGF0ZSxcblx0XHRnZXRDdXJyZW50OiBnZXRDdXJyZW50LFxuXHRcdGhhc01lbW9yeTogaGFzTWVtb3J5LFxuXHRcdHN0b3JlSW5NZW1vcnlBbmRSZXNldEN1cnJlbnQ6IHN0b3JlSW5NZW1vcnlBbmRSZXNldEN1cnJlbnQsXG5cdFx0c2V0QWRkOiBzZXR0ZXJUZW1wbGF0ZShBRERfU1RSSU5HU1swXSksXG5cdFx0c2V0U3ViOiBzZXR0ZXJUZW1wbGF0ZShTVUJfU1RSSU5HU1swXSksXG5cdFx0c2V0TXVsdGlwbHk6IHNldHRlclRlbXBsYXRlKE1VTFRJUExZX1NUUklOR1NbMF0pLFxuXHRcdHNldERpdmlkZTogc2V0dGVyVGVtcGxhdGUoRElWSURFX1NUUklOR1NbMF0pLFxuXHRcdG51bWJlcklucHV0OiBudW1iZXJJbnB1dCxcblx0XHRhcHBlbmREaWdpdDogYXBwZW5kRGlnaXQsXG5cdFx0Y2FsY3VsYXRlOiBjYWxjdWxhdGUsXG5cdFx0Y2FsYzogY2FsY3VsYXRlLFxuXHRcdGNsZWFyOiBjbGVhclxuXHR9XG5cblx0ZnVuY3Rpb24gaW5pdCgpIHtcblx0XHRjcmVhdGVPcHRpb25zID0gY3JlYXRlT3B0aW9ucyB8fCB7fTtcblx0XHRtZW1vcnkgPSBjcmVhdGVPcHRpb25zLm1lbW9yeSB8fCB1bmRlZmluZWQ7XG5cdFx0Y3VycmVudCA9IGNyZWF0ZU9wdGlvbnMuY3VycmVudCB8fCAwO1xuXHRcdHN0YXRlID0gY3JlYXRlT3B0aW9ucy5zdGF0ZSB8fCB1bmRlZmluZWQ7XG5cblx0XHRmaXJzdENhbGN1bGF0aW9uID0gdHJ1ZTtcblx0fVxuXG5cdGZ1bmN0aW9uIGdldEN1cnJlbnQoKSB7XG5cdFx0cmV0dXJuIGN1cnJlbnQ7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXR0ZXJUZW1wbGF0ZShuZXdTdGF0ZSkge1xuXHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdHNldFN0YXRlKG5ld1N0YXRlKTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBudW1iZXJJbnB1dChuZXdOdW1iZXIpIHtcblx0XHRpZihzdGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRtZW1vcnkgPSBuZXdOdW1iZXI7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0Y3VycmVudCA9IG5ld051bWJlcjtcblx0XHR9XG5cdH1cblx0ZnVuY3Rpb24gc3RvcmVJbk1lbW9yeUFuZFJlc2V0Q3VycmVudCgpIHsgXG5cdFx0bWVtb3J5ID0gY3VycmVudDtcblx0XHRjdXJyZW50ID0gMDtcblx0fVxuXG5cdGZ1bmN0aW9uIGFwcGVuZERpZ2l0KG51bWJlcikge1xuXHRcdGN1cnJlbnQgPSBjdXJyZW50ICogMTAgKyBudW1iZXI7XG5cdH1cblxuXHRmdW5jdGlvbiB1bnNldFN0YXRlKCkge1xuXHRcdHN0YXRlID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0ZnVuY3Rpb24gc2V0U3RhdGUobmV3U3RhdGUpIHtcblx0XHRpZighY29udGFpbnMoVkFMSURfU1RBVEVTLCBuZXdTdGF0ZSkpIHtcblx0XHRcdHRocm93IEVycm9yKCdTdGF0ZSBtdXN0IGJlIG9uZSBvZiB2YWxpZCBzdGF0ZXM6ICcgKyBWQUxJRF9TVEFURVMudG9TdHJpbmcoKSk7XG5cdFx0fVxuXHRcdHN0YXRlID0gbmV3U3RhdGU7XG5cdFx0c3RvcmVJbk1lbW9yeUFuZFJlc2V0Q3VycmVudCgpO1xuXHRcdGlmICghZmlyc3RDYWxjdWxhdGlvbikge1xuXHRcdFx0Zmlyc3RDYWxjdWxhdGlvbiA9IHRydWU7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gaGFzU3RhdGUoKSB7XG5cdFx0cmV0dXJuIChzdGF0ZSAhPT0gdW5kZWZpbmVkKTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gaGFzTWVtb3J5KCkge1xuXHRcdHJldHVybiAobWVtb3J5ICE9PSB1bmRlZmluZWQpO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0U3RhdGUoKSB7XG5cdFx0cmV0dXJuIHN0YXRlO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuXHRcdGlmKGZpcnN0Q2FsY3VsYXRpb24pIHtcblx0XHRcdGlmKCFtZW1vcnkpIG1lbW9yeSA9IDA7XG5cdFx0XHRcblx0XHRcdHZhciB0ZW1wID0gY3VycmVudDtcblx0XHRcdGN1cnJlbnQgPSBtZW1vcnk7XG5cdFx0XHRtZW1vcnkgPSB0ZW1wO1xuXHRcdFx0Zmlyc3RDYWxjdWxhdGlvbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmKGNvbnRhaW5zKEFERF9TVFJJTkdTLCBzdGF0ZSkpIHtcblx0XHRcdGN1cnJlbnQgKz0gbWVtb3J5O1xuXHRcdH1cblx0XHRlbHNlIGlmKGNvbnRhaW5zKFNVQl9TVFJJTkdTLCBzdGF0ZSkpIHtcblx0XHRcdGN1cnJlbnQgLT0gbWVtb3J5O1xuXHRcdH1cblx0XHRlbHNlIGlmKGNvbnRhaW5zKE1VTFRJUExZX1NUUklOR1MsIHN0YXRlKSkge1xuXHRcdFx0Y3VycmVudCAqPSBtZW1vcnk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY29udGFpbnMoRElWSURFX1NUUklOR1MsIHN0YXRlKSkge1xuXHRcdFx0Y3VycmVudCAvPSBtZW1vcnk7XG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXIoKSB7XG5cdFx0c3RhdGUgPSB1bmRlZmluZWQ7XG5cdFx0bWVtb3J5ID0gdW5kZWZpbmVkO1xuXHRcdGN1cnJlbnQgPSAwO1xuXHRcdGZpcnN0Q2FsY3VsYXRpb24gPSB0cnVlO1xuXHR9XG5cblx0LyogSEVMUEVSUyAqL1xuXHRcblx0ZnVuY3Rpb24gY29udGFpbnMoYXJyLCB2YWx1ZSkge1xuXHRcdHZhciBjaGVjayA9IChhcnIuaW5kZXhPZih2YWx1ZSkgPj0gMCk7XG5cdFx0cmV0dXJuIGNoZWNrO1xuXHR9XG5cbn0iLCJ2YXIgQ2FsY3VsYXRvciA9IHJlcXVpcmUoJy4vQ2FsY3VsYXRvci5qcycpXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCl7XG5cdFx0dGVzdEIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpO1xuXG5cdC8vQW5kcm9pZCAyLjIgbmVlZHMgRmFzdENsaWNrIHRvIGJlIGluc3RhbnRpYXRlZCBiZWZvcmUgdGhlIG90aGVyIGxpc3RlbmVycyBzbyB0aGF0IHRoZSBzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gaGFjayBjYW4gd29yay5cblx0RmFzdENsaWNrLmF0dGFjaCh0ZXN0Qik7XG59LGZhbHNlKTtcblxuXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcblx0dmFyIGNhbGN1bGF0b3IgPSBDYWxjdWxhdG9yKCk7XG5cblx0ZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdCQoJy5yZXN1bHQnKS5odG1sKGNhbGN1bGF0b3IuZ2V0Q3VycmVudCgpKTtcblx0fVxuXG5cdCQoJyNhbGwtY2xlYXInKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRjYWxjdWxhdG9yLmNsZWFyKCk7XG5cdFx0cmVuZGVyKCk7XG5cdH0pO1xuXG5cblx0JCgnLm51bWJlcnMgLm51bWJlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKGNhbGN1bGF0b3IuaGFzU3RhdGUoKSAmJiAhY2FsY3VsYXRvci5oYXNNZW1vcnkoKSkge1xuXHRcdFx0Y2FsY3VsYXRvci5zdG9yZUluTWVtb3J5QW5kUmVzZXRDdXJyZW50KCk7XG5cdFx0fVxuXG5cdFx0dmFyIGRpZ2l0ID0gKyAkKHRoaXMpLmh0bWwoKTtcblx0XHRjYWxjdWxhdG9yLmFwcGVuZERpZ2l0KGRpZ2l0KTtcblx0XHRyZW5kZXIoKTtcblx0fSk7XG5cblx0JCgnI21pbnVzJykub24oJ2NsaWNrJywgY2FsY3VsYXRvci5zZXRTdWIpO1xuXHQkKCcjcGx1cycpLm9uKCdjbGljaycsIGNhbGN1bGF0b3Iuc2V0QWRkKTtcblx0JCgnI3RpbWVzJykub24oJ2NsaWNrJywgY2FsY3VsYXRvci5zZXRNdWx0aXBseSk7XG5cdCQoJyNkaXZpZGUnKS5vbignY2xpY2snLCBjYWxjdWxhdG9yLnNldERpdmlkZSk7XG5cdFxuXHQkKCcjY2FsYycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0Y2FsY3VsYXRvci5jYWxjKCk7XG5cdFx0cmVuZGVyKCk7XG5cdH0pO1xuXG5cdCQoJy5kb3QnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdGlmKC9bLl0vLnRlc3QoJCgnLnJlc3VsdCcpLmh0bWwoKSkgPT0gZmFsc2Upe1xuXHRcdFx0JCgnLnJlc3VsdCcpLmFwcGVuZChcIi5cIik7XG5cdFx0fVxuXHR9KTtcblxuXHQkKCcucm93IGRpdjpsYXN0LWNoaWxkJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXt9KTtcblx0JCgnLm51bWJlcnMgLm51bWJlcicpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7fSk7XG5cbn0pOyJdfQ==
