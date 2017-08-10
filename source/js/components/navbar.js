import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Logo from '../../assets/img/logo.png';

export default class Navbar extends Component {
  static propTypes = {
  onClick: PropTypes.func,
  }
  render() {
    return (
      <nav className='navbar navbar-inverse navbar-fixed-top' >
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
              <span className='icon-bar' />
              <span className='icon-bar' />
              <span className='icon-bar' />
            </button>
            <Link className='navbar-brand' to='/' onClick={ this.props.onClick }>
              <img src={ Logo } name='Pocetna' alt='' className='logo' />
            </Link>
          </div>
          <div className='collapse navbar-collapse' id='myNavbar'>
            <ul className='nav navbar-nav' onClick={ this.props.onClick }>
              <li className='active'><Link to='/' name='Pocetna'>Početna</Link></li>
              <li><Link to='/' name='ONama'>O nama</Link></li>
              <li><Link to='/' name='Staradimo'>Šta radimo</Link></li>
              <li><Link to='/' name='Kontakt'>Kontakt</Link></li>
            </ul>
          </div>
        </div>
      </nav>);
  }
}

