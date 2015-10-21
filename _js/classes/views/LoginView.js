var template = require('../../../_hbs/login.hbs');
var LoginView = Backbone.View.extend({

	template: template,
	tagName: 'div',
	className: 'login-div',

	events: {
		'click .user-register': 'clickedRegister',
		'click .user-login': 'clickedLogin',
	},

	initialize: function(options) {

	},

	clickedRegister: function(e, data){
		this.$el.find('.main-info').addClass('hidden');
		this.$el.find('.main-error-register').addClass('hidden');

		e.preventDefault();

		var name = this.$el.find('.name-input-register').val();
		var email = this.$el.find('.email-input-register').val();
		var password = this.$el.find('.password-input-register').val();

		var formValues = {email: email, password: password, name: name};

		$.ajax({
	     	url: Window.httpRoot + "api/users",
	      	type:'POST',
	      	dataType:"json",
	      	data: formValues,
	      	success:function (data) {

		        if(data.error) {

		          this.$el.find('.main-error-register').text(data.error);
		          this.$el.find('.main-error-register').removeClass('hidden');

		          if (this.$el.find('.email-input-register').val() === ''){
		          	this.$el.find('.email-input-register').addClass('error-login');
		          }
		          else {
		          	this.$el.find('.email-input-register').removeClass('error-login');
		          }

		          if (this.$el.find('.password-input-register').val() === ''){
		          	this.$el.find('.password-input-register').addClass('error-login');
		          }
		          else {
		          	this.$el.find('.password-input-register').removeClass('error-login');
		          }

		          if (this.$el.find('.name-input-register').val() === ''){
		          	this.$el.find('.name-input-register').addClass('error-login');
		          }
		          else {
		          	this.$el.find('.name-input-register').removeClass('error-login');
		          }

		        }
		        else{
		        	this.$el.find('.email-input-register').val("");
		        	this.$el.find('.password-input-register').val("");
		        	this.$el.find('.name-input-register').val("");
		        	this.$el.find('.main-info').removeClass('hidden');
		        	this.$el.find('.main-info').text("Registration done.");
		        }

	      	}.bind(this)
    	});
	},

	clickedLogin: function(e){
		this.$el.find('.main-error-login').addClass('hidden');

		e.preventDefault();

		var email = this.$el.find('.email-input-login').val();
		var password = this.$el.find('.password-input-login').val();

		var formValues = {email: email, password: password};

		$.ajax({
	     	url: Window.httpRoot + "api/login",
	      	type:'POST',
	      	dataType:"json",
	      	data: formValues,
	      	success:function (data) {

		        if(data.error) {

		          this.$el.find('.main-error-login').text(data.error);
		          this.$el.find('.main-error-login').removeClass('hidden');

		          if (this.$el.find('.email-input-login').val() === ''){
		          	this.$el.find('.email-input-login').addClass('error-login');
		          }
		          else {
		          	this.$el.find('.email-input-login').removeClass('error-login');
		          }

		          if (this.$el.find('.password-input-login').val() === ''){
		          	this.$el.find('.password-input-login').addClass('error-login');
		          }
		          else {
		          	this.$el.find('.password-input-login').removeClass('error-login');
		          }
		        }
		        else {
					Window.Application.navigate('home', {trigger: true});
		        }

	      	}.bind(this)
    	});
	},

	validateInput: function(inputfield) {
		if(inputfield.val().length === 0) {
			inputfield.addClass('error');
		}
		else {
			inputfield.removeClass('error');
		}
	},

	clearInput: function(inputfield) {
		inputfield.val('');
		inputfield.removeClass('error');
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes));
		return this;
	},

});

module.exports = LoginView;
