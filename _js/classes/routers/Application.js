var LoginView = require('../views/LoginView.js');
var HomeView = require('../views/HomeView.js');
var AddView = require('../views/AddView.js');
var TagView = require('../views/TagView.js');
var Online = require('../models/Online.js');
var Tags = require('../models/Tags.js');

var list, quote, imageupload = false;

var Application = Backbone.Router.extend({

	routes: {
		"login": "login",
		"home": "home",
		"add": "add",
		"tags/:tag": "tags",
		"*actions": "default",
	},

	empty: function() {
		$('.container').empty();
	},

	default: function() {
		var online = new Online({online: navigator.onLine});

		if(navigator.onLine){
			$.ajax({
				url: Window.httpRoot + "api/users",
				type: 'GET',
	        	dataType: 'json',
		        success: function(res) {
		        	if(res == "failed"){
		        		this.empty();
						this.login = new LoginView({
							model: online
						});
						$('.container').append(this.login.render().el);
		        	}
		        	else{
		        		Window.Application.navigate('home', {trigger: true});
					}
				}.bind(this)
			});
		}
		else{
			this.login = new LoginView({
				model: online
			});
			$('.container').append(this.login.render().el);

		}
	},

	login: function() {
var online = new Online({online: navigator.onLine});

		if(navigator.onLine){
			$.ajax({
				url: Window.httpRoot + "api/users",
				type: 'GET',
	        	dataType: 'json',
		        success: function(res) {
		        	if(res == "failed"){
		        		this.empty();
						this.login = new LoginView({
							model: online
						});
						$('.container').append(this.login.render().el);
		        	}
		        	else{
		        		Window.Application.navigate('home', {trigger: true});
					}
				}.bind(this)
			});
		}
		else{
			this.login = new LoginView({
							model: online
			});
			$('.container').append(this.login.render().el);

		}
	},

	home: function() {

	if(navigator.onLine){
		$.ajax({
			url: Window.httpRoot + "api/users",
			type: 'GET',
    		dataType: 'json',
   			success: function(res) {
    			if(res == "failed"){
    				Window.Application.navigate('login', {trigger: true});
				}
        		else {
    				$.ajax({
    					url: Window.httpRoot + "api/pins/tags",
    					type: 'GET',
   						dataType: 'json',
    					success: function(res) {
    						var types = [];
    						var check = true;
    						var uniqueTypes = [];
    						for (var i = res.length - 1; i >= 0; i--) {
    							types.push(res[i].type);
				        	}
							$.each(types, function(i, el){
							if($.inArray(el, uniqueTypes) === -1) uniqueTypes.push(el);
							});

							if(jQuery.inArray("list", uniqueTypes) !== -1){
						    	list = true;
						    }
						    if(jQuery.inArray("quote", uniqueTypes) !== -1){
						    	quote = true;
						    }
						    if(jQuery.inArray("imageupload", uniqueTypes) !== -1){
						    	imageupload = true;
						    }

							this.empty();
							var tags = new Tags({
								list: list, quote: quote, imageupload: imageupload
							});

			        		this.home = new HomeView({
			        			model: tags
			        		});
						}.bind(this)
					});
	        	}
   			}.bind(this)
		});
	}
	else {
		Window.Application.navigate('login', {trigger: true});
	}
	},

	add: function() {

	if(navigator.onLine){
		this.empty();
		this.add = new AddView();
		$('.container').append(this.add.render().el);
	}
	else {
		Window.Application.navigate('login', {trigger: true});
	}
	},

	tags: function(tag){
	if(navigator.onLine){
		this.empty();
		this.tag = new TagView({
			tag: tag
		});
		$('.container').append(this.tag.render().el);
	}
	else {
		Window.Application.navigate('login', {trigger: true});
	}
	},
});


module.exports = Application;

