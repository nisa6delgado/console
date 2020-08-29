var codemirror = CodeMirror(document.getElementsByClassName('editor')[0], {
    value: '',
    mode: 'application/x-httpd-php',
    theme: 'xq-light',
    smartIndent: true,
    lineNumbers: true,
    indentSize: 4,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchTags: { bothTags: true },
    extraKeys: {"Ctrl-J": "toMatchingTag"},
    highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true }
});

emmetCodeMirror(codemirror);

$(document).ready(function () {
    if (window.localStorage.getItem('url') == '') {
        var url = prompt('Indique el servidor al que necesita conectarse', window.localStorage.getItem('url'));

        while (!url) {
            var url = prompt('Indique el servidor al que necesita conectarse', window.localStorage.getItem('url'));
        }

        window.localStorage.setItem('url', url);
    }

    if (window.localStorage.getItem('text') != '') {
        codemirror.setValue(window.localStorage.getItem('text'));
    } else {
        codemirror.setValue('<?php\n\n\n');
    }

    codemirror.focus();
});

new PerfectScrollbar('.result', {
    minScrollbarLength: 50
});

$('.editor').on('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (String.fromCharCode(e.which).toLowerCase() === 's')) {
    	event.preventDefault();

    	$('.result').html('<div class="text-center"><div class="spinner-border" style="margin-top: 35vh; width: 10rem; height: 10rem;" role="status"><span class="sr-only">Cargando...</span></div></div>');

    	value = codemirror.getValue();

        window.localStorage.setItem('text', value);
    	
    	$.ajax({
    		type: 'POST',
    		url: window.localStorage.getItem('url') + '/vendor/nisadelgado/framework/console/process.php',
    		data: {
    			value: value
    		},
    		success: function (response) {
    			$('.result').html(response);
    		},
            error: function (error) {
                $('.result').html(response);
            }
    	});
    }
});

$(document).on('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && (String.fromCharCode(e.which).toLowerCase() === 'b')) {
        event.preventDefault();

        var url = prompt('Indique el servidor al que necesita conectarse', window.localStorage.getItem('url'));

        while (!url) {
            var url = prompt('Indique el servidor al que necesita conectarse', window.localStorage.getItem('url'));
        }

        window.localStorage.setItem('url', url);
    }
});
