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

	$('.row div:last-child').on('click', function(){});

	$('.numbers .number').on('click', function(){
		if (calculator.hasState() && !calculator.hasMemory()) {
			calculator.storeInMemoryAndResetCurrent();
		}

		var digit = + $(this).html();
		calculator.appendDigit(digit);
		render();
	});

	$('.numbers .number').on('touchend', function(){});

	$('#erase').on('click', function(){
		$(this).css('background', '#d0d1d3');
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

});
},{"./Calculator.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdjAuMTAuMzcvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwianMvQ2FsY3VsYXRvci5qcyIsImpzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBBRERfU1RSSU5HUyA9IFsnYWRkJ107XG52YXIgU1VCX1NUUklOR1MgPSBbJ3N1YiddO1xudmFyIE1VTFRJUExZX1NUUklOR1MgPSBbJ211bGlwbHknXTtcbnZhciBESVZJREVfU1RSSU5HUyA9IFsnZGl2aWRlJ107XG52YXIgVkFMSURfU1RBVEVTID0gW10uY29uY2F0KEFERF9TVFJJTkdTLCBTVUJfU1RSSU5HUywgTVVMVElQTFlfU1RSSU5HUywgRElWSURFX1NUUklOR1MpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjcmVhdGVPcHRpb25zKSB7XG5cdHZhciBtZW1vcnk7XG5cdHZhciBzdGF0ZTtcblx0dmFyIGN1cnJlbnQ7XG5cdHZhciBmaXJzdENhbGN1bGF0aW9uO1xuXG5cdGluaXQoKTtcblx0cmV0dXJuIHtcblx0XHRnZXRTdGF0ZTogZ2V0U3RhdGUsXG5cdFx0aGFzU3RhdGU6IGhhc1N0YXRlLFxuXHRcdHNldFN0YXRlOiBzZXRTdGF0ZSxcblx0XHR1bnNldFN0YXRlOiB1bnNldFN0YXRlLFxuXHRcdGdldEN1cnJlbnQ6IGdldEN1cnJlbnQsXG5cdFx0aGFzTWVtb3J5OiBoYXNNZW1vcnksXG5cdFx0c3RvcmVJbk1lbW9yeUFuZFJlc2V0Q3VycmVudDogc3RvcmVJbk1lbW9yeUFuZFJlc2V0Q3VycmVudCxcblx0XHRzZXRBZGQ6IHNldHRlclRlbXBsYXRlKEFERF9TVFJJTkdTWzBdKSxcblx0XHRzZXRTdWI6IHNldHRlclRlbXBsYXRlKFNVQl9TVFJJTkdTWzBdKSxcblx0XHRzZXRNdWx0aXBseTogc2V0dGVyVGVtcGxhdGUoTVVMVElQTFlfU1RSSU5HU1swXSksXG5cdFx0c2V0RGl2aWRlOiBzZXR0ZXJUZW1wbGF0ZShESVZJREVfU1RSSU5HU1swXSksXG5cdFx0bnVtYmVySW5wdXQ6IG51bWJlcklucHV0LFxuXHRcdGFwcGVuZERpZ2l0OiBhcHBlbmREaWdpdCxcblx0XHRjYWxjdWxhdGU6IGNhbGN1bGF0ZSxcblx0XHRjYWxjOiBjYWxjdWxhdGUsXG5cdFx0Y2xlYXI6IGNsZWFyXG5cdH1cblxuXHRmdW5jdGlvbiBpbml0KCkge1xuXHRcdGNyZWF0ZU9wdGlvbnMgPSBjcmVhdGVPcHRpb25zIHx8IHt9O1xuXHRcdG1lbW9yeSA9IGNyZWF0ZU9wdGlvbnMubWVtb3J5IHx8IHVuZGVmaW5lZDtcblx0XHRjdXJyZW50ID0gY3JlYXRlT3B0aW9ucy5jdXJyZW50IHx8IDA7XG5cdFx0c3RhdGUgPSBjcmVhdGVPcHRpb25zLnN0YXRlIHx8IHVuZGVmaW5lZDtcblxuXHRcdGZpcnN0Q2FsY3VsYXRpb24gPSB0cnVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gZ2V0Q3VycmVudCgpIHtcblx0XHRyZXR1cm4gY3VycmVudDtcblx0fVxuXG5cdGZ1bmN0aW9uIHNldHRlclRlbXBsYXRlKG5ld1N0YXRlKSB7XG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0c2V0U3RhdGUobmV3U3RhdGUpO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIG51bWJlcklucHV0KG5ld051bWJlcikge1xuXHRcdGlmKHN0YXRlID09PSB1bmRlZmluZWQpIHtcblx0XHRcdG1lbW9yeSA9IG5ld051bWJlcjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRjdXJyZW50ID0gbmV3TnVtYmVyO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBzdG9yZUluTWVtb3J5QW5kUmVzZXRDdXJyZW50KCkgeyBcblx0XHRtZW1vcnkgPSBjdXJyZW50O1xuXHRcdGN1cnJlbnQgPSAwO1xuXHR9XG5cblx0ZnVuY3Rpb24gYXBwZW5kRGlnaXQobnVtYmVyKSB7XG5cdFx0Y3VycmVudCA9IGN1cnJlbnQgKiAxMCArIG51bWJlcjtcblx0fVxuXG5cdGZ1bmN0aW9uIHVuc2V0U3RhdGUoKSB7XG5cdFx0c3RhdGUgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRmdW5jdGlvbiBzZXRTdGF0ZShuZXdTdGF0ZSkge1xuXHRcdGlmKCFjb250YWlucyhWQUxJRF9TVEFURVMsIG5ld1N0YXRlKSkge1xuXHRcdFx0dGhyb3cgRXJyb3IoJ1N0YXRlIG11c3QgYmUgb25lIG9mIHZhbGlkIHN0YXRlczogJyArIFZBTElEX1NUQVRFUy50b1N0cmluZygpKTtcblx0XHR9XG5cdFx0c3RhdGUgPSBuZXdTdGF0ZTtcblx0XHRzdG9yZUluTWVtb3J5QW5kUmVzZXRDdXJyZW50KCk7XG5cdFx0aWYgKCFmaXJzdENhbGN1bGF0aW9uKSB7XG5cdFx0XHRmaXJzdENhbGN1bGF0aW9uID0gdHJ1ZTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBoYXNTdGF0ZSgpIHtcblx0XHRyZXR1cm4gKHN0YXRlICE9PSB1bmRlZmluZWQpO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBoYXNNZW1vcnkoKSB7XG5cdFx0cmV0dXJuIChtZW1vcnkgIT09IHVuZGVmaW5lZCk7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcblx0XHRyZXR1cm4gc3RhdGU7XG5cdH1cblxuXHRmdW5jdGlvbiBjYWxjdWxhdGUoKSB7XG5cdFx0aWYoZmlyc3RDYWxjdWxhdGlvbikge1xuXHRcdFx0aWYoIW1lbW9yeSkgbWVtb3J5ID0gMDtcblx0XHRcdFxuXHRcdFx0dmFyIHRlbXAgPSBjdXJyZW50O1xuXHRcdFx0Y3VycmVudCA9IG1lbW9yeTtcblx0XHRcdG1lbW9yeSA9IHRlbXA7XG5cdFx0XHRmaXJzdENhbGN1bGF0aW9uID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYoY29udGFpbnMoQUREX1NUUklOR1MsIHN0YXRlKSkge1xuXHRcdFx0Y3VycmVudCArPSBtZW1vcnk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY29udGFpbnMoU1VCX1NUUklOR1MsIHN0YXRlKSkge1xuXHRcdFx0Y3VycmVudCAtPSBtZW1vcnk7XG5cdFx0fVxuXHRcdGVsc2UgaWYoY29udGFpbnMoTVVMVElQTFlfU1RSSU5HUywgc3RhdGUpKSB7XG5cdFx0XHRjdXJyZW50ICo9IG1lbW9yeTtcblx0XHR9XG5cdFx0ZWxzZSBpZihjb250YWlucyhESVZJREVfU1RSSU5HUywgc3RhdGUpKSB7XG5cdFx0XHRjdXJyZW50IC89IG1lbW9yeTtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBjbGVhcigpIHtcblx0XHRzdGF0ZSA9IHVuZGVmaW5lZDtcblx0XHRtZW1vcnkgPSB1bmRlZmluZWQ7XG5cdFx0Y3VycmVudCA9IDA7XG5cdFx0Zmlyc3RDYWxjdWxhdGlvbiA9IHRydWU7XG5cdH1cblxuXHQvKiBIRUxQRVJTICovXG5cdFxuXHRmdW5jdGlvbiBjb250YWlucyhhcnIsIHZhbHVlKSB7XG5cdFx0dmFyIGNoZWNrID0gKGFyci5pbmRleE9mKHZhbHVlKSA+PSAwKTtcblx0XHRyZXR1cm4gY2hlY2s7XG5cdH1cblxufSIsInZhciBDYWxjdWxhdG9yID0gcmVxdWlyZSgnLi9DYWxjdWxhdG9yLmpzJylcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKXtcblx0XHR0ZXN0QiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5Jyk7XG5cblx0Ly9BbmRyb2lkIDIuMiBuZWVkcyBGYXN0Q2xpY2sgdG8gYmUgaW5zdGFudGlhdGVkIGJlZm9yZSB0aGUgb3RoZXIgbGlzdGVuZXJzIHNvIHRoYXQgdGhlIHN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiBoYWNrIGNhbiB3b3JrLlxuXHRGYXN0Q2xpY2suYXR0YWNoKHRlc3RCKTtcbn0sZmFsc2UpO1xuXG5cbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oJCkge1xuXHR2YXIgY2FsY3VsYXRvciA9IENhbGN1bGF0b3IoKTtcblxuXHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0JCgnLnJlc3VsdCcpLmh0bWwoY2FsY3VsYXRvci5nZXRDdXJyZW50KCkpO1xuXHR9XG5cblx0JCgnI2FsbC1jbGVhcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdGNhbGN1bGF0b3IuY2xlYXIoKTtcblx0XHRyZW5kZXIoKTtcblx0fSk7XG5cblx0JCgnLnJvdyBkaXY6bGFzdC1jaGlsZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7fSk7XG5cblx0JCgnLm51bWJlcnMgLm51bWJlcicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG5cdFx0aWYgKGNhbGN1bGF0b3IuaGFzU3RhdGUoKSAmJiAhY2FsY3VsYXRvci5oYXNNZW1vcnkoKSkge1xuXHRcdFx0Y2FsY3VsYXRvci5zdG9yZUluTWVtb3J5QW5kUmVzZXRDdXJyZW50KCk7XG5cdFx0fVxuXG5cdFx0dmFyIGRpZ2l0ID0gKyAkKHRoaXMpLmh0bWwoKTtcblx0XHRjYWxjdWxhdG9yLmFwcGVuZERpZ2l0KGRpZ2l0KTtcblx0XHRyZW5kZXIoKTtcblx0fSk7XG5cblx0JCgnLm51bWJlcnMgLm51bWJlcicpLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7fSk7XG5cblx0JCgnI2VyYXNlJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHQkKHRoaXMpLmNzcygnYmFja2dyb3VuZCcsICcjZDBkMWQzJyk7XG5cdH0pO1xuXG5cdCQoJyNtaW51cycpLm9uKCdjbGljaycsIGNhbGN1bGF0b3Iuc2V0U3ViKTtcblx0JCgnI3BsdXMnKS5vbignY2xpY2snLCBjYWxjdWxhdG9yLnNldEFkZCk7XG5cdCQoJyN0aW1lcycpLm9uKCdjbGljaycsIGNhbGN1bGF0b3Iuc2V0TXVsdGlwbHkpO1xuXHQkKCcjZGl2aWRlJykub24oJ2NsaWNrJywgY2FsY3VsYXRvci5zZXREaXZpZGUpO1xuXHRcblx0JCgnI2NhbGMnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuXHRcdGNhbGN1bGF0b3IuY2FsYygpO1xuXHRcdHJlbmRlcigpO1xuXHR9KTtcblxuXHQkKCcuZG90Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcblx0XHRpZigvWy5dLy50ZXN0KCQoJy5yZXN1bHQnKS5odG1sKCkpID09IGZhbHNlKXtcblx0XHRcdCQoJy5yZXN1bHQnKS5hcHBlbmQoXCIuXCIpO1xuXHRcdH1cblx0fSk7XG5cbn0pOyJdfQ==
