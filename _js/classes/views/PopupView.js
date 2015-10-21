var template = require('../../../_hbs/popup.hbs');

var PopupView = Backbone.View.extend({

template: template,

	tagName: 'div',

	events: {
		'click .pop-image': 'clickPop',
	},

	initialize: function(options){
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

	clickPop: function(e){
		e.preventDefault();
		this.model.destroy();
	}
});

module.exports = PopupView;
