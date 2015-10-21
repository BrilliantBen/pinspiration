var template = require('../../../_hbs/pin.hbs');
var Popup = require('../models/Popup.js');

var PopupView = require('./PopupView.js');

var PinView = Backbone.View.extend({

template: template,

	tagName: 'div',

	events: {
		'click .delete': 'clickDelete',
		'click .edit': 'clickEdit',
		'click .popup': 'clickImage',
	},

	initialize: function(){
		this.listenTo(this.model, 'destroy', this.remove);
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	clickDelete: function(e){
		e.preventDefault();
		this.model.destroy();
	},

	clickEdit: function(e){
		e.preventDefault();
		$parent = $($(e.currentTarget)[0].parentNode);
		$parent.find('div').addClass('hidden');
		$parent.find('input').removeClass('hidden');
		$(document).keypress(function(e) {
    		if(e.which == 13) {
     			this.changeValue(e);
    		}
		}.bind(this));
	},

	changeValue: function(e){
		this.model.set('content', this.$el.find('input').val());
		this.model.save();
		$parent.find('div').removeClass('hidden');
		$parent.find('input').addClass('hidden');
	},

	clickImage: function(e){
		e.preventDefault();

		var array = ($(e.currentTarget)[0].src).split('/');
		var image = array[array.length-1];

		var popup = new Popup({
			image: image
		});

		var view = new PopupView({model:popup});
		$(document.body).prepend(view.render().el);
	}
});

module.exports = PinView;
