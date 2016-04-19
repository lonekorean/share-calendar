$(function() {
	function displayCalendarTitle(month, year) {
		var title = moment()
			.year(year)
			.month(month)
			.format('MMMM YYYY');
		$('.cal-title').text(title);
	}

	function displayCalendar(month, year) {
		displayCalendarTitle(month, year);

		var m = moment()
			.year(year)
			.month(month)
			.date(1) // start at first day of the month
			.day(0); // shift to the Sunday of that week

		var $wrapper = $('.cal-wrapper');
		while (m.month() <= month || m.day() > 0) {
			var $day = $('<div>')
				.text(m.date())
				.attr('data-date', m.format('YYYY-M-D'))
				.addClass('day');

			if (m.month() !== month) {
				$day.addClass('outside-month');
			}

			$wrapper.append($day);
			m.add(1, 'd');
		}
	}

	function init() {
		var month = 2;// moment().month();
		var year = moment().year();

		displayCalendar(month, year);
	}

	init();
});
