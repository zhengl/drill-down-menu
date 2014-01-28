describe('JQueryPlugin', function() {
	it('should be attached to a text input', function() {
		var $input = $('<input>');
		var $el = $input.drilldown();
		expect($el.hasClass('drilldown-hide')).toBeTruthy();

		$input.click();
		expect($el.hasClass('drilldown-hide')).toBeFalsy();
	});
});