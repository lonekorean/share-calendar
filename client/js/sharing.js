$(function() {
	var $addModal = $('.add-modal');

	function summonAddModal() {
		$addModal.show();
		$addModal.find('.recipient-email').focus();
		$('body').addClass('frozen');
	}

	function dismissAddModal() {
		$addModal.hide();
		$('body').removeClass('frozen');
	}

	function init() {
		$('.share-add').on('click', summonAddModal);
		$('.dismiss-modal').on('click', dismissAddModal);
	}

	init();
});
