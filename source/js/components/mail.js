import React from 'react';

export default function MailForm() {
  return (
    <form method='POST' action='http://formspree.io/merkursajt2017@gmail.com'>
      <input type='email' name='email' placeholder='Vaš e-mail' className='col-xs-12 form-control' />
      <input type='text' name='name' placeholder='Vaše ime i prezime' className='col-xs-12 form-control' />
      <textarea name='message' placeholder='Vaša poruka' className='col-xs-12 form-control' />
      <button type='submit' className='btn btn-primary'>Pošalji poruku</button>
    </form>
  );
}

