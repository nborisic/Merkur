import React from 'react';

export default class MailForm extends React.Component {
  handleSubmit(event) {
    function register($form) {
      $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache: false,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        error: (err) => { alert('Could not connect to the registration server. Please try again later.'); },
        success: (data) => {
          if (data.result !== 'success') {
                // Something went wrong, do something to notify the user. maybe alert(data.msg);
          } else {
                // It worked, carry on...
          }
        },
      });
    }

    const $form = $('form');
    if ($form.length > 0) {
      if (event) {
        event.preventDefault();
        register($form);
      }
    }

    /* const massage = {
      name: document.querySelector('[name="name"]').value,
      email: document.querySelector('[name="email"]').value,
    };

    const dataJSON = {
      from: 'postmaster@sandbox83e6257874dd488ba20475477b2a023f.mailgun.org',
      to: 'borisic.nikola@yahoo.com',
      subject: 'Subject text',
      text: `${ massage.name } ${ massage.email }`,
      multipart: true,
    };

    axios({
      method: 'POST',
      url: 'https://api.mailgun.net/v3/sandbox83e6257874dd488ba20475477b2a023f.mailgun.org',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic  ${ btoa('api:key-54ed5636870779885a577fa42bee75ee') }`,
      },
      data: dataJSON });*/
  }


  render() {
    return (
      <form action='//facebook.us16.list-manage.com/subscribe/post-json?u=46219abb54568c0d449a3de01&amp;id=009c3b9585&c=?' className='emailForm' onSubmit={ this.handleSubmit }>
        <input type='text' name='name' placeholder='Ime i prezime' />
        <input type='text' name='email' placeholder='e-mail' />
        <button type='submit'>Add</button>
      </form>
    );
  }
}

