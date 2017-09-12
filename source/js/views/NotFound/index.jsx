import React, { Component } from 'react';
import { Link } from 'react-router';

export default class NotFound extends Component {
  render() {
    return (
      <div className='NotFound'>
        <h1>Nešto je pošlo po zlu. <Link to='/' name='back' >Vrati se na prethodnu stranicu...</Link></h1>
      </div>
    );
  }
}
