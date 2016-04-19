$(function() {
	var viewMoment; // holds year and month in view, other stuff not used

	function displayCalendar() {
		displayCalendarTitle();

		var m = moment()
			.year(viewMoment.year())
			.month(viewMoment.month())
			.date(1) // start at first day of the month
			.day(0); // shift to the Sunday of that week

		var $calBody = $('.cal tbody');
		$calBody.empty();

		var dayTemplate = $('#day-template').html();

		// loop until we reach the start of a week in the following month
		while (m.month() <= viewMoment.month() || m.day() > 0) {
			if (m.day() === 0) {
				// start new row for a week
				$calBody.append('<tr>');
			}

			var $day = $(dayTemplate);
			$day.attr('data-date', m.format('YYYY-M-D'));
			if (m.month() !== viewMoment.month()) {
				$day.addClass('outside');
			}
			if (m.year() === moment().year() && m.dayOfYear() === moment().dayOfYear()) {
				$day.addClass('today');
			}

			$day.find('.date').text(m.date());

			$calBody.find('tr').last().append($day);
			m.add(1, 'd');
		}
	}

	function displayCalendarTitle() {
		var title = moment()
			.year(viewMoment.year())
			.month(viewMoment.month())
			.format('MMMM YYYY');
		$('.cal-title').text(title);
	}

	function navigateMonths(direction) {
		viewMoment.add(direction, 'M');
		displayCalendar();
	}

	function init() {
		viewMoment = moment();

		$('.cal-nav-left').on('click', navigateMonths.bind(this, -1));
		$('.cal-nav-right').on('click', navigateMonths.bind(this, 1));

		displayCalendar();
	}

	init();
});
