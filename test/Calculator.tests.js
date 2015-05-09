var assert = require('assert');
Calculator = require('../js/Calculator.js');

module.exports = {
	'when initalizing calculator should have result as zero': function() {
		var calc = Calculator();

		var result = calc.getCurrent();
		
		assert.equal(result, 0);
	},
	'when setting state to add through shorthand should have state add': function() {
		var calc = Calculator();
		
		calc.setAdd();
		
		assert.equal(calc.getState(), 'add');
	},
	'when setting state to add should have state add': function() {
		var calc = Calculator();
		calc.setState('add');

		var result = calc.getState();
		
		assert.equal(result, 'add');		
	},
	'when setting state to something ambigious should throw an error': function() {
		var calc = Calculator();
		var codeToRun = function() {
			calc.setState('chicken');
		}

		assert.throws(codeToRun, Error);
	},
	'when calculating should yield the correct result': function () {
		var calc = Calculator();
		calc.setAdd();
		calc.appendDigit(5);
		calc.calculate();
		var result = calc.getCurrent();
		assert.equal(result, 5);
	},
	'when no set state, hasState should return false': function (){
		var calc = Calculator();

		var result = calc.hasState();
		
		assert.equal(result, false);			
	},
	'when unsetting state should not have any state': function() {
		var calc = Calculator();
		calc.setAdd();
		assert.equal('add', calc.getState());

		calc.unsetState();
		
		assert.equal(undefined, calc.getState());			
	},
	'when calling clear should not have any state, and current should equal 0': function() {
		var calc = Calculator();
		calc.setAdd();
		calc.appendDigit(7);
		calc.calculate();

		calc.clear();
		
		assert.equal(0, calc.getCurrent());			
		assert.equal(undefined, calc.getState());			
	},
	'when appending a digit, current number should be correct': function() {
		var calc = Calculator();
		assert.equal(calc.getCurrent(), 0);
		calc.appendDigit(9);
		assert.equal(calc.getCurrent(), 9);

		calc.appendDigit(1);
		
		assert.equal(calc.getCurrent(), 91);
	},
	'when calling storeInMemoryAndResetCurrent should set current to zero': function () {
		var calc = Calculator();
		calc.appendDigit(9);
		assert.equal(calc.getCurrent(), 9);		

		calc.storeInMemoryAndResetCurrent();
		
		assert.equal(calc.getCurrent(), 0);		
	},
	'when calling calculator.hasMemory() should return true if has memory': function() {
		var calc = Calculator();
		calc.appendDigit(9);
		assert.equal(calc.getCurrent(), 9);	

		calc.storeInMemoryAndResetCurrent();
		
		assert.equal(calc.hasMemory(), true);		
	}

}
/*
	getResults -> getMemory (Namnbyte, OBS troligtvis ska inte den ens exposas)

 
calculator.add(12312);
calculator.allClear();
calculator.result();
calculator.setAction('add');

*/