var Pin = require('../models/Pin.js');

var PinCollection = Backbone.Collection.extend({

	model: Pin,
	url: Window.httpRoot + 'api/pins',

	comparator: function(pin) {
		return - pin.get("id");
	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.url = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	},

	initialize: function(options){
		if(options){
		this.tag = options.tag;
		}
	},

	methodUrl: function(method){
		if(method === "read" && this.tag){
			this.url = Window.httpRoot + 'api/pins/tags/' + this.tag;
			return;
		}

		this.url = Window.httpRoot + 'api/pins';
	},

	filterPins: function(query){
		return this.filter(function(pin){
			return pin.get('content').toLowerCase().indexOf(query) > -1;
		});

	}


});

module.exports = PinCollection;
