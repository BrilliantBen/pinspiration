(function() {
	var Handlebars = require("hbsfy/runtime");
	var Application = require("./classes/routers/Application.js");

	Handlebars.registerHelper('if_eq', function(a, b, opts) {
		if(a == b)
			return opts.fn(this);
		else
			return opts.inverse(this);
	});

	Handlebars.registerHelper("formatList", function(list) {
		var values = list.split(',');
		var newValues = [];
		$.each(values,function( key, value ) {
			newValues.push("<li>"+value+"</li>");
		});
		return new Handlebars.SafeString(newValues.join(""));
	});

	Handlebars.registerHelper("name", function(image) {
		var values = image.split('.');
		return new Handlebars.SafeString(values[0]);

	});

	function init() {
		Window.Application = new Application();
		Window.httpRoot = '/benoit.schrijnemak1/2dev/rmd2/';
		Backbone.history.start();
	}

	init();

})();
