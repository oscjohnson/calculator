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