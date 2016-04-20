$(function() {
	var $addModal = $('.add-modal');

	function summonAddModal() {
		$addModal.show();
		$addModal.find('input[type="checkbox"]').prop('checked', true);
		$addModal.find('.recipient-email').val('').focus();
		$('body').addClass('frozen');
	}

	function dismissAddModal() {
		$addModal.hide();
		$('body').removeClass('frozen');
	}

	function sendShare(e) {
		e.preventDefault();

		$(this).prop('disabled', true);
		var payload = {
			recipientEmail: $('.recipient-email').val(),
			showEmails: $('.show-emails-check').is(':checked'),
			showWebinars: $('.show-webinars-check').is(':checked'),
			showEvents: $('.show-events-check').is(':checked'),
			showSocial: $('.show-social-check').is(':checked'),
			showCustom: $('.show-custom-check').is(':checked')
		};
		$.post('share/create', payload)
			.done(sendShareSuccess)
			.fail(sendShareFailure);
	}

	function sendShareSuccess() {
		// would be nicer without a full page reload
		window.location.reload();
	}

	function sendShareFailure(jqXHR, textStatus, errorThrown) {
		alert('Something went wrong: ' + errorThrown);
	}

	function init() {
		$('.share-add').on('click', summonAddModal);
		$('.dismiss-modal').on('click', dismissAddModal);
		$('.send-share').on('click', sendShare);
	}

	init();
});
