var template = require('../../../_hbs/add.hbs');

var AddView = Backbone.View.extend({

	template: template,
	tagName: 'div',
	className: 'home-div',

	events: {
		'click .logout': "clickedLogout",
		'click .add-pin': 'clickedAddPin',
		'click .addimg': 'showForm',
		'click .addlist': 'showForm',
		'click .addquote': 'showForm',
		'click .back': 'navigateBack',
	},

	clickedLogout: function(e){
		e.preventDefault();

		$.ajax({
			url: Window.httpRoot + "api/logout",
			type: 'GET',
       		dataType: 'json',

        	success: function(res) {
        		Window.Application.navigate('login', {trigger: true});
        	}
    	});

	},

	initialize: function() {

        this.string = "";
        this.formValues = {};

        $.ajax({
        	url: Window.httpRoot + "api/users",
        	type: 'GET',
        	dataType: 'json',

        	success: function(res) {
        		if(res == "failed"){
        			Window.Application.navigate('login', {trigger: true});
		       	}
    	    }

   		 });
  	},

    render: function(){

   		this.$el.html(this.template());
   		return this;

   	},

    clickedAddPin: function(e){

		var type = e.currentTarget.parentNode.parentNode.classList[0];
		var author = "no one";

		e.preventDefault();

		if(type == "quote"){

			var $form2 = this.$el.find(".quote").find('input[type="text"]');
			var content = this.$el.find('.quote-input-add').val();
			type = e.currentTarget.parentNode.parentNode.classList[0];
			author = this.$el.find('.author-input-add').val();

			if(content===""){
				this.$el.find('.quote-input-add').addClass('error1');
			}
			else {
				this.$el.find('.quote-input-add').removeClass('error1');
			}

			if(author===""){
				this.$el.find('.author-input-add').addClass('error1');
			}
			else {
				this.$el.find('.author-input-add').removeClass('error1');
			}

			if(author !== "" && content!==""){
				this.formValues = {content: content, type: type, author: author};
				this.sendFile(this.formValues);
				this.$el.find('.main-error-login').removeClass("hidden");
				this.$el.find('.main-error-login').text("added!");

				$form2.each((function( key, value ) {
				 	$(value).val('');
				}).bind(this));

			}
		}

		else if (type=="list"){
			var values = [];
			var $form = this.$el.find(".list").find('input[type="text"]');

			$form.each((function( key, value ) {
				if(this.$el.find('.list'+(key+1)+'-input-add').val() !== ""){
					values.push(this.$el.find('.list'+(key+1)+'-input-add').val());
				}
				this.string = values.toString();
			}).bind(this));

			var notValid = /^[,]*$/.test(this.string);

			if(notValid){
				$($form[0]).addClass('error1');
			}
			else {
				this.formValues = {content: this.string, type: type, author: author};
				this.sendFile(this.formValues);
				$($form[0]).removeClass('error1');
				this.$el.find('.main-error-login').removeClass("hidden");
				this.$el.find('.main-error-login').text("added!");

				$form.each((function( key, value ) {
				 	$(value).val('');
				}).bind(this));

			}
		}

		else if(type=="imageupload"){
			var $form3 = this.$el.find(".imageupload").find('input[type="text"]');
			var imageName = this.$el.find('.imagename-input-add').val();
			var file = this.$el.find('.imagefile-input-add')[0].files[0];

			if(file !== undefined){

				if((file.type).split("/")[0] == "image"){
					this.$el.find('.placeholder').removeClass('error1');
					var ext = (file.type).split("/")[1];
					this.reader = new FileReader();
					this.reader.readAsDataURL(file);

					this.reader.onload = (function(event) {
						var result = this.reader.result;
						this.formValues = {content: imageName+"."+ext, type: type, author: author, file: result};

						if(imageName === ""){
								this.$el.find('.imagename-input-add').addClass('error1');
						}
						else {
							this.$el.find('.imagename-input-add').removeClass('error1');
							this.sendFile(this.formValues);
							this.$el.find('.main-error-login').removeClass("hidden");
							this.$el.find('.main-error-login').text("added!");

							$form3.each((function( key, value ) {
							 	$(value).val('');
							 	console.log($(value).val());
							}).bind(this));
						}
					}).bind(this);
				}
				else {
					this.$el.find('.placeholder').addClass('error1');
				}

			}
			else {
				this.$el.find('.placeholder').addClass('error1');
			}
		}
	},

	sendFile: function(file){

		$.ajax({
			url: Window.httpRoot + "api/pins",
			type:'POST',
	      	data: file,
	    });

	},

	showForm: function(e){
		e.preventDefault();

		$('.imageupload').addClass('hidden');
		$('.list').addClass('hidden');
		$('.quote').addClass('hidden');

		this.$el.find('.addimg').removeClass('selected');
		this.$el.find('.addlist').removeClass('selected');
		this.$el.find('.addquote').removeClass('selected');
		this.$el.find('.main-error-login').addClass("hidden");


		switch(e.currentTarget.classList[0]){
			case 'addimg':

			$('.imageupload').removeClass('hidden');
			this.$el.find('.addimg').addClass('selected');

			break;

			case 'addlist':

			$('.list').removeClass('hidden');
			this.$el.find('.addlist').addClass('selected');

			break;

			case 'addquote':

			$('.quote').removeClass('hidden');
			this.$el.find('.addquote').addClass('selected');

			break;
		}
	},

	navigateBack: function(e){
		e.preventDefault();
		Window.Application.navigate('home', {trigger: true});
	}
});

module.exports = AddView;
