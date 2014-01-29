describe('JQueryPlugin', function() {
	var $input;
	var $el;

	beforeEach(function() {
		$input = $('<input>');
		$('body').append($input);
		
		$input.drilldown({
			items: [
				{
					title: 'Asia',
					children: [
						{ title: 'China' },
						{ title: 'India' },
					]
				},
				{ 
					title: 'Europe'
				},
			]
		});
		
		$el = $input.next();
	});


	it('should be attached to a text input', function() {
		expect($el.hasClass('drilldown-hide')).toBeTruthy();

		$input.click();
		expect($el.hasClass('drilldown-hide')).toBeFalsy();
	});

	it('should be hidden when clicking on elsewhere', function() {
		expect($el.hasClass('drilldown-hide')).toBeTruthy();

		$input.click();
		expect($el.hasClass('drilldown-hide')).toBeFalsy();

		$('html').click();
		expect($el.hasClass('drilldown-hide')).toBeTruthy();
	});

	it('should have options for initializing of items with JSON', function() {
		var menuItems = $el.children('.drilldown-menu').children('li');

		expect(menuItems.length).toBe(2);
		expect(getTitle(menuItems[0])).toBe('Asia');
		expect(getTitle(menuItems[1])).toBe('Europe');

		expect(menuItems[0].children[1].children.length).toBe(2);
		expect(getTitle(menuItems[0].children[1].children[0])).toBe('China');
		expect(getTitle(menuItems[0].children[1].children[1])).toBe('India');		

	});

	it('should auto-complete', function() {
		$input.val('c').keyup();

		var menuItems = $el.children('.drilldown-menu').children('li');

		expect(menuItems.length).toBe(1);
		expect(getTitle(menuItems[0])).toBe('China');
	});


	afterEach(function() {
		$input.remove();
		$el.remove();
	});
});