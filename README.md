# share-calendar

Prototype for sharing a calendar.

### Notes

To run: `npm install`, then `gulp`, then `npm start`. Everything is built to `/dist`. If you're in dev, hit `http://localhost:3000` to run the web app.

In dev, you'll want to create a `.env` file in the root with the following contents (edit as appropriate):

```javascript
process.env.ENVIRONMENT = 'dev';
process.env.PORT = 3000; // do not set in prod (auto-assigned by Heroku)
process.env.SESSION_SECRET = 'your secret string';
process.env.EMAIL_TRANSPORT_STRING = 'smtps://youremail%40gmail.com:yourpass@smtp.gmail.com';
process.env.EMAIL_FROM = '"Your Name" <youremail@gmail.com>';
process.env.LINK_ROOT = 'http://localhost:3000/';
```
