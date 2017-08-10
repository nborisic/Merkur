const express = require('express');
const Mailchimp = require('mailchimp-api-v3');
require('dotenv').config();

const mcApiKey = process.env.MAILCHIMP_API_KEY;
const listId = process.env.MAILING_LIST_ID;


const app = express();
const mailchimp = new Mailchimp(mcApiKey);

// routes
app.get('/api/memberList', (req, res) => {
  mailchimp.get(`/lists/${ listId }/members`)
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    res.send(err);
  });
});

const port = process.env.PORT || 9001;
app.listen(port);

console.log(`express app listening on port ${ port }`);
