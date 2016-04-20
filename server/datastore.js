module.exports = {
	calendars: [
		{
			userId: 41,
			events: [
				{
					uid: '439423062ce549ada62b6940e0e541b8',
					dtstart: '20160421T190000Z',
					dtend: '20160421T210000Z',
					summary: 'UX Dev Webinar',
					location: 'Atlanta, GA',
					description: 'Be sure to demo the app that you\'re demoing right now.'
				},
				{
					uid: 'a64c2efb870e4d798773719f2d7127ad',
					dtstart: '20160429T210000Z',
					dtend: '20160429T230000Z',
					summary: 'Wine and Cheese Marketing Event',
					location: 'Atlanta, GA',
					description: 'Wine and cheese and marketing stuff.'
				},
				{
					uid: 'a64c2efb870e4d798773719f2d7127ad',
					dtstart: '20160528T200000Z',
					dtend: '20160528T022000Z',
					summary: 'Recruiting Event',
					location: 'Atlanta, GA',
					description: 'Find some people.'
				}
			]
		}
	],
	shares: [
		{
			uid: 'b8019e2ff5484732aac7d8e143091678',
			userId: 41,
			recipientEmail: 'carson@gearfactory.com',
			showEmails: true,
			showWebinars: true,
			showEvents: true,
			showSocial: true,
			showCustom: true
		},
		{
			uid: '18edd9145684487aac2f6e0956e922a1',
			userId: 41,
			recipientEmail: 'elisabeth@gearfactory.com',
			showEmails: false,
			showWebinars: true,
			showEvents: true,
			showSocial: false,
			showCustom: true
		},
		{
			uid: '6c9964b60e5b489fa77716f16ed63dc9',
			userId: 9,
			recipientEmail: 'dan@potatonetwork.com',
			showEmails: false,
			showWebinars: false,
			showEvents: false,
			showSocial: false,
			showCustom: false
		}
	]
};
