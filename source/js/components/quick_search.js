import React, { Component } from 'react';
import { Link } from 'react-router';

export default class QuickSearch extends Component {
  render() {
    return (
      <nav className='navbar navbar-inverse' >
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar2'>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <div className='nav'>
            Brza pretraga:
            </div>
          </div>
          <div className='collapse navbar-collapse' id='myNavbar2'>
            <ul className='nav navbar-nav'>
              <li><Link to='/Stan' name='Stanovi'>Stanovi</Link></li>
              <li><Link to='/Poslovni_prostor' name='Poslovni prostor'>Poslovni prostor</Link></li>
              <li><Link to='/Kuća' name='Kuće'>Kuće</Link></li>
              <li><Link to='/Plac' name='Placevi'>Placevi</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
