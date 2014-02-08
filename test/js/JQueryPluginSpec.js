describe('JQueryPlugin', function() {
	var $input;
	var $el;
	var items = [
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
				];

	beforeEach(function() {
		$input = $('<input>');
		$('body').append($input);	
	});

	describe('with static data', function(){
		beforeEach(function() {
			$input.drilldown({
				options: {
					iconMappings: function() { return '<i class="icon" />' }
				},
				items: items
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

			expectNestedContinentItems(menuItems);
		});

		it('should auto-complete', function() {
			$input.val('c').keyup();

			var menuItems = $el.children('.drilldown-menu').children('li');

			expect(menuItems.length).toBe(1);
			expect(getTitle(menuItems[0])).toBe('China');
		});
	});

	describe('with dynamic data', function() {
		beforeEach(function() {
			$input.drilldown({
				options: {
					iconMappings: function() { return '<i class="icon" />' }
				},
				items: function() {
					return [
								{
									title: 'Asia',
									hasChild: true
								},
								{ 
									title: 'Europe'
								},
							];
				}
			});
			
			$el = $input.next();
		});

		xit('should have options for initializing of items with JSON', function() {
			var menuItems = $el.children('.drilldown-menu').children('li');

			expect(menuItems.length).toBe(2);
			expect(getTitle(menuItems[0])).toBe('Asia');
			expect(getTitle(menuItems[1])).toBe('Europe');
		});		
	});

	afterEach(function() {
		$input.remove();
		$el.remove();
	});
	
});