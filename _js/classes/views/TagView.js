var template = require('../../../_hbs/tag.hbs');
var Pin = require('../models/Pin.js');
var PinView = require('./PinView.js');
var pinCollection = require('../collections/PinCollection.js');
var TagView = Backbone.View.extend({

	template: template,

	events: {
		'click .back': 'navigateBack',
	},


	initialize: function(options){
		if(options && options.tag){
			this.pinCollection = new pinCollection({
				tag: options.tag
			});
		this.pinCollection.on('sync', this.renderPins, this);
		}
	},

	render: function(){
	this.$el.html(this.template());
	this.pinCollection.fetch({
		success: function(collection, response){
			if(response.length === 0){
				Window.Application.navigate('home', {trigger:true});
			}
		}
	});

	this.$pins = this.$el.find('.pins');
	return this;
	},

	renderPins: function(e){
		this.pinCollection.forEach(this.renderTweet, this);
	},

	renderTweet: function(feedback){
		this.$pins.append(
			new PinView({model:feedback}).render().el
		);
	},

	navigateBack: function(e){
		e.preventDefault();
    	Window.Application.navigate('home', {trigger: true});
	}
});

module.exports = TagView;

