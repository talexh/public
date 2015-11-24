/**
 *
 */

$(document).ready(function(e){
	/*Util.handleClick('.actions .delete',function($this){
		var href = $this.attr('href');
		if(confirm('Do you want delete this item?')) {
			window.location.href = href;
		}
	});*/
	Util.ajaxCall('/admin/communicate', 'post', 'uuid=fdsafdsafdsfdsaf', 'json', function(res){
		console.log(res);
	});
	// Handle click delete
	Util.handleClick('.actions .delete', function($me){
		var data = {},
			action = $me.attr('href');
		data.title = $me.data('title');
		data.message = $me.data('message');
		data.buttons = {okText: $me.data('ok'), cancelText: $me.data('cancel')};

		HTMLObject.createConfirmBox(data, function($me){
			if($me.data('kind') == 'ok') {
				window.location.href = action;
			}
			$me.closest('.confirm-locker').remove();
		});
		//$('.form-submitable').submit();
	});

	Util.handleClick('.actions .cancel',function($this){
		var href = $this.attr('target');
		window.location.href = href;
	});

	// Handle click on checkbox all
	Util.handleClickOnCheckbox('input[name="checkall"]', function($this){
		$('input[type="checkbox"]').each(function(index, ele){
			if($this.is(':checked')) {
				ele.checked = true;
			} else {
				ele.checked = false;
			}
		});
	});
	
	// Handle for change select box to filter news by category
	Util.handleChange('select.changable', function($me){
		// TODO
		var categoryId = $('#categoryId').val(),
	    	appId = $('#appId').val();
		if(categoryId == 'all' && appId == 'all') {
			window.location.href = '/admin/'+$($me).data('ctrl')+'/list';
		} else {
	    	window.location.href = '/admin/'+$($me).data('ctrl')+'/list'+'/'+categoryId+'/'+appId;
		}
	});

	// handle click to browse to file
	Util.handleClick('.button.image.browse',function($self){
		var langId = $self.data('id');
		$('.button.image.browse').closest('div').find('input[type="file"]').trigger('click');
	});
	Util.handleClick('.button.file.browse',function($self){
		var langId = $self.data('id');
		$('.button.file.browse').closest('div').find('input[type="file"]').trigger('click');
	});

	Util.handleChange('input[type="file"]', function($me){
		var filename = $($me).val().replace(/C:\\fakepath\\/i, ''),
			ext = filename.substr(filename.lastIndexOf('.')+1, filename.length);

		if($($me).closest('.controls').find('span.filename').length > 0) {
			$($me).closest('.controls').find('span.filename').remove();
		}
		$($me).closest('.controls').find('.arrow_box').fadeOut(300);
		$($me).closest('div').find('input[type="hidden"]').val(filename);
		$($me).closest('.controls').find('.browse').after('&nbsp;&nbsp;<span class="filename">'+filename+' <i class="glyphicon glyphicon-remove remove-file-selected"></i></span>');

		// Handle click on remove icon after user selected file
		Util.handleClick('.remove-file-selected', function($child){
			var parent = $child.closest('.controls'),
				subParent = parent.find('.filename');
			parent.find('input[type="file"]').val('');

			if($($me).data('type') == 'image') {
				var preview = parent.find('img.preview');
				preview.attr('src',preview.data('preview'));
			}

			//$child.closest('.filename').remove();

		});

		if($($me).data('type') == 'media') {
			return false;
		} else {
			Util.readURL($me);
		}

		/*	count = 0,
			$ul = $me.closest('div').find('.file-list').append($('<ul></ul>')),
			$li = $('<li></li>');

		$('.file-list ul li').each(function(i,el){
			var file = $(el).text();
			if(filename == file) {
				count++;
			}
		});
		if(count == 0) {
			$li.text(filename);
			$ul.append($li);
		}*/

	});

	Util.handleKeypress('input[type="text"]', function($me){
		$($me).closest('div').find('.arrow_box').fadeOut(300);
	});

	Util.handleOnSubmit('.form-submitable', function(response){
		if(response.status == 'OK') {
			window.location.href = response.url;
		} else {

			$('.arrow_box').fadeOut(300);
			if(response.field == 'password_confirmation') {
				response.msg = response.msg.replace('password confirmation', '"Password Confirm"');
			}
			var items = response.msg.split(' ');
			$('.' + response.field + '-error').html(response.msg).fadeIn(500);

			HTMLObject.hideOverlay();
		}
	});

	// Handle submit form
	Util.handleClick('.saveopen', function($me){
		if($('input[name="data[reload]"]').length > 0) {
			$('input[name="data[reload]"]').remove();
		}
		if($('input[name="data[redirectTo]"]').length > 0) {
			$('input[name="data[redirectTo]"]').remove();
		}
		if($('input[name="data[addNew]"]').length > 0) {
			$('input[name="data[addNew]"]').remove();
		}
		var attrs = [];
		attrs['data[reload]'] = 1;
		var input = Util.createInputHidden(attrs);
		$('.form-submitable').append(input);
		HTMLObject.createOverlay();
		$('.form-submitable').submit();
	});
	// Handle submit form
	Util.handleClick('.saveaddnew', function($me){
		if($('input[name="data[reload]"]').length > 0) {
			$('input[name="data[reload]"]').remove();
		}
		if($('input[name="data[redirectTo]"]').length > 0) {
			$('input[name="data[redirectTo]"]').remove();
		}
		if($('input[name="data[addNew]"]').length > 0) {
			$('input[name="data[addNew]"]').remove();
		}
		var attrs = [];
		attrs['data[addNew]'] = 1;
		var input = Util.createInputHidden(attrs);
		$('.form-submitable').append(input);
		HTMLObject.createOverlay();
		$('.form-submitable').submit();
	});

	// Handle submit form
	Util.handleClick('.saveclose', function($me){
		if($('input[name="data[reload]"]').length > 0) {
			$('input[name="data[reload]"]').remove();
		}
		if($('input[name="data[redirectTo]"]').length > 0) {
			$('input[name="data[redirectTo]"]').remove();
		}
		if($('input[name="data[addNew]"]').length > 0) {
			$('input[name="data[addNew]"]').remove();
		}
		var attrs = [];
		attrs['data[redirectTo]'] = 1;
		var input = Util.createInputHidden(attrs);
		$('.form-submitable').append(input);
		HTMLObject.createOverlay();
		$('.form-submitable').submit();
	});

	// Tabs
	var tabContainers = $('.main-nav > div');
	tabContainers.hide().filter(':first').show();

	$('.main-nav ul.tabNavigation a').click(function () {
		tabContainers.hide();
		tabContainers.filter(this.hash).show();
		$('.main-nav ul.tabNavigation a').removeClass('selected');
		$(this).addClass('selected');
		return false;
	}).filter(':first').click();

	var langtabContainers = $('#language-tab > div');
	langtabContainers.hide().filter(':first').show();
	$('#language-tab ul.languagetabNavigation a').click(function () {
		langtabContainers.hide();
		langtabContainers.filter(this.hash).show();
		$('#language-tab ul.languagetabNavigation a').removeClass('selected');
		$(this).addClass('selected');

		// Show the first tab
		var $target = $(this).attr('href');
		$($target).find('.main-nav ul.tabNavigation a').filter(':first').click();

		return false;
	}).filter(':first').click();

});
