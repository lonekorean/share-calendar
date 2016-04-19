$(function() {
	function authenticate() {
		$(this).prop('disabled', true);
		$.post('authentication')
			.done(authenticationSuccess)
			.fail(authenticationFailure);
	}

	function authenticationSuccess() {
		window.location = 'cal';
	}

	function authenticationFailure(jqXHR, textStatus, errorThrown) {
		alert('Something went wrong: ' + errorThrown);
	}

	$('.sign-in').on('click', authenticate);
});
