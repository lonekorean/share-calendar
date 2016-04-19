$(function() {
	function authenticate() {
		$(this).prop('disabled', true);
		$.post('authentication')
			.done(authenticationSuccess)
			.fail(authenticationFailure);
	}

	function authenticationSuccess() {
		window.location = 'my-cal';
	}

	function authenticationFailure(jqXHR, textStatus, errorThrown) {
		alert('Something went wrong: ' + errorThrown);
	}

	$('.go-login').on('click', authenticate);
});
