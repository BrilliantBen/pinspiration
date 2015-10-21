 var Pin = Backbone.Model.extend({

	defaults: {
		"type": "Unknown type",
		"content": "Unknown content",
		"userid": "no userid",
	},

	urlRoot: Window.httpRoot + 'api/pins',

	initialize: function(options){
		if(options){
			if(options.email){
				this.email = options.email;
			}
			if(options.id){
				this.id = options.id;
			}
		}
	},

	methodUrl: function(method){
		if(method === "delete" && this.id) {
			this.url = Window.httpRoot + 'api/pins/' + this.id;
			return;
		}
		if(method === "read" && this.id) {
			this.url = Window.httpRoot + 'api/pins/' + this.id;
			return;
		}
		if(method === "update" && this.id) {
			this.url = Window.httpRoot + 'api/pins/' + this.id;
			return;
		}
		this.url = Window.httpRoot + 'api/pins';
	},

	sync: function(method, model, options) {
		if(model.methodUrl && model.methodUrl(method.toLowerCase())) {
			options = options || {};
			options.url = model.methodUrl(method.toLowerCase());
		}
    Backbone.Collection.prototype.sync.apply(this, arguments);
	}

});

module.exports = Pin;
