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