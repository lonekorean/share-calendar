$(function() {
	var viewMoment; // holds year and month in view, other stuff not used
	var events;

	function displayCalendar() {
		displayCalendarTitle();

		var iterMoment = viewMoment.clone()
			.startOf('month')
			.startOf('week');

		var endMoment = viewMoment.clone()
			.endOf('month')
			.endOf('week');

		var $calBody = $('.cal tbody');
		$calBody.empty();

		var dayTemplate = $('#day-template').html();

		// loop until we reach the start of a week in the following month
		while (!iterMoment.isAfter(endMoment)) {
			if (iterMoment.day() === 0) {
				// start new row for a week
				$calBody.append('<tr>');
			}

			var $day = $(dayTemplate);
			$day.attr('data-date', iterMoment.format('YYYY-M-D'));

			if (iterMoment.month() !== viewMoment.month()) {
				$day.addClass('outside');
			}

			if (iterMoment.year() === moment().year() && iterMoment.dayOfYear() === moment().dayOfYear()) {
				$day.addClass('today');
			}

			$day.find('.date').text(iterMoment.date());
			$calBody.find('tr').last().append($day);

			iterMoment.add(1, 'd');
		}

		// load events on demand and show them
		if (!events) {
			loadEvents();
		} else {
			displayEvents();
		}
	}

	function displayCalendarTitle() {
		var title = moment()
			.year(viewMoment.year())
			.month(viewMoment.month())
			.format('MMMM YYYY');
		$('.cal-title').text(title);
	}

	function loadEvents() {
		$.get('feed/cal.json' + window.location.search)
			.done(loadEventsSuccess)
			.fail(loadEventsFailure);
	}

	function loadEventsSuccess(data) {
		events = JSON.parse(data);
		displayEvents();
	}

	function loadEventsFailure(jqXHR, textStatus, errorThrown) {
		alert('Something went wrong: ' + errorThrown);
	}

	function displayEvents() {
		$('.event').remove();
		events.forEach(displayEvent);
	}

	function displayEvent(eventItem) {
		var date = moment(eventItem.dtstart).format('YYYY-M-D');
		var time = moment(eventItem.dtstart).format('h:mm a');

		var $event = $('<div>', {
			class: 'event',
			text: ' ' + eventItem.summary
		});
		$('[data-date="' + date + '"]').append($event);

		var $time = $('<strong>', {
			text: time
		});
		$event.prepend($time);
	}

	function navigateMonths(direction) {
		viewMoment.add(direction, 'M');
		displayCalendar();
	}

	function resetMonth() {
		viewMoment = moment();
		displayCalendar();
	}

	function init() {
		viewMoment = moment();

		$('.cal-nav-left').on('click', navigateMonths.bind(this, -1));
		$('.cal-nav-right').on('click', navigateMonths.bind(this, 1));
		$('.cal-nav-today').on('click', resetMonth);

		displayCalendar();
	}

	init();
});
