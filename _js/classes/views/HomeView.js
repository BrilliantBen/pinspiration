var PinCollection = require('../collections/PinCollection.js');
var PinView = require('./PinView.js');

var template = require('../../../_hbs/home.hbs');

var HomeView = Backbone.View.extend({

	template: template,
	tagName: 'div',
	className: 'home-div',

	events: {
		'click .logout': "clickedLogout",
		'click .addpin': "clickedAddpin",
		'click button': "buttonClicked",
		'input .filter': 'inputFilter',
	},

	clickedLogout: function(e){
		e.preventDefault();

    	$.ajax({
	     	url: Window.httpRoot + "api/logout",
        	type: 'GET',
        	dataType: 'json',
        	success: function(res) {
          	 	Window.Application.navigate('login', {trigger: true});
          	},
		});
	},

	initialize: function(options) {
		$('.container').append(this.render().el);

		this.collection = new PinCollection();
		this.listenTo(this.collection, 'sync', this.renderPins);
		this.listenTo(this.collection, 'remove', this.redirect);
		this.collection.fetch();
	},

	renderPins: function(test){
		this.$pins.empty();
		this.collection.forEach(this.collection.comparator, this);
		this.collection.forEach(this.renderPin, this);
	},

		renderPin: function(model){
		var view = new PinView({
			model: model
		});

		this.$pins.append(view.render().el);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));

		this.$pins = this.$el.find('.pins');
		return this;
	},
	clickedAddpin: function(e){
        Window.Application.navigate('add', {trigger: true});
	},

	inputFilter: function(e){
		e.preventDefault();
		e.stopPropagation();

		var input = $(e.currentTarget).val().toLowerCase();

		if (input !== ""){
			this.renderFilteredPins(this.collection.filterPins(input));
		}
		else{
			this.collection.fetch();
		}
	},

	renderFilteredPins: function(pins){
		this.$pins.empty();
		pins.forEach(this.renderPin, this);
	},

	redirect: function(e){
		var lists = [];
		var quotes = [];
		var imageuploads = [];
		this.model.set({"list":false});
		this.model.set({"quote":false});
		this.model.set({"imageupload":false});

		this.collection.each(function(item) {
			if(item.get('type')=="list"){
			lists.push(item);
		}

			if(item.get('type')=="quote"){
				quotes.push(item);
			}

			if(item.get('type')=="imageupload"){
				imageuploads.push(item);
			}
		}.bind(this));


		if (typeof lists[0] !== 'undefined') {
			this.model.set({"list":true});
		}

		if (typeof quotes[0] !== 'undefined') {
				this.model.set({"quote":true});
		}

		if (typeof imageuploads[0] !== 'undefined') {
				this.model.set({"imageupload":true});
		}

		this.initialize();
	},

	buttonClicked: function(e){
		e.preventDefault();

		switch(e.currentTarget.classList[0]){
			case 'listclick':

				Window.Application.navigate('tags/list', {trigger: true});

			break;

			case 'quoteclick':

				Window.Application.navigate('tags/quote', {trigger: true});

			break;

			case 'imageclick':

				Window.Application.navigate('tags/imageupload', {trigger: true});

			break;
		}
	}

});

module.exports = HomeView;
