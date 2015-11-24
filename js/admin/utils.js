/**
 *
 */
'use strict';

var Util = {} || Util;

Util.ajaxCall = function($url, $type, $data, $dataType, callback) {
	$.ajax({
        url: $url,
        type: $type,
        data: $data,
        cache:false,
        contentType: false,
        processData: false,
        dataType: $dataType
    }).done(function (response) {
    	callback(response);
    }).error(function (err) {
    	if($('#screen-lock').length > 0) {
    		$('#screen-lock').remove();
    	}
        alert('Error: ' + err);
    });
};

Util.handleClick = function($target, callback) {
	$($target).on('click', function(e) {
		e.preventDefault();
		callback($(this));
	});
};

Util.handleClickOnCheckbox = function($target, callback) {
	$(document).on('click', $target, function() {
		callback($(this));
	});
};

Util.handleOnSubmit = function($target, callback) {
	$($target).on('submit', function(e){
		e.preventDefault();
		var url = $(this).attr('action'),
			formData = new FormData(this);
		Util.ajaxCall(url, 'POST', formData, 'json', function(response){
			callback(response);
		});
	});
};

Util.readURL = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader(),
        	preview = $(input).closest('div').find('.preview');

        reader.onload = function (e) {
        	preview.attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
};

Util.handleUpload = function($target, callback) {

};

Util.handleChange = function($target, callback) {
	$(document).on('change', $target, function(e) {
		e.preventDefault();
		callback(this);
	});
};

Util.confirm = function($title, $msg, callback) {

};

Util.handleKeypress = function($target, callback) {
	if(typeof $target == 'string') $target = $($target);
	$target.on('keypress', function(e){
		callback($(this));
	});
};

Util.createInputHidden = function(attributes) {
	var input = document.createElement('input');
	input.type = 'hidden';
	for(var k in attributes) {
		var item = attributes[k];
		if(typeof item != 'function') {
			input.name = k;
			input.value = item;
		}
	}
	return input;
};

var HTMLObject = {

    createAlert: function ($target, $msg, callback) {
        if ($('#span-alert').length > 0) $('#span-alert').remove();
        var span = document.createElement('span');

        span.id = 'span-alert';
        span.style.marginLeft = '20px';
        span.style.display = 'inline-block';
        span.innerHTML = $msg;
        span.style.color = '#ff0000';
        span.style.textAlign = 'left';
        if ($msg != '') {
            $target.prev().append(span);
        }
        $target.css({
            'border': '1px solid #ff0000'
        });
        if( typeof callback != 'undefined') {
        	callback();
        }
    },
    createOverlay: function () {
        var screenLock = '<div class="screen-lock" id="screen-lock"></div>';
        $('body').append(screenLock);
        $(screenLock).fadeIn(300);
    },
    hideOverlay: function () {
        $('#screen-lock').fadeOut('200').remove();
    },
	createConfirmBox : function(data,callback) {
		var screenLock = $('<div class="confirm-locker" id="confirm-locker"></div>'),
			dialog = this.createDialog(data.title, data.message, data.buttons, callback);
		screenLock.append(dialog);
        $('body').append(screenLock);
		Util.handleClick('.action.ok', function($me){
			callback($me);
		});
		Util.handleClick('.action.cancel', function($me){
			callback($me);
		});
        $(screenLock).fadeIn(300);
	},
	createDialog : function(title, message, buttonsText, callback){
		var dialog = $('<div class="dialog"><h2 class="title">'+title+' <i class="glyphicon glyphicon-exclamation-sign"></i></h2><p class="text-message">'+message+'</p><div class="buttons"><button class="action ok" data-kind="ok">'+buttonsText.okText+'</button><button class="action cancel" data-kind="cancel">'+buttonsText.cancelText+'</button></div></div>');

		return dialog;
	},
};
