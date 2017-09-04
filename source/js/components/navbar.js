import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Logo from '../../assets/img/logo4.png';

export default class Navbar extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }
  render() {
    return (
      <header className='navbar-fixed-top'>
        <div id='top'>
          <div className='container'>
            <p className='pull-left text-note hidden-xs' > Kontakt: <i className='fa fa-phone' /> (+381) 036 333 668</p>
            <p className='pull-left text-note-ext hidden-sm hidden-xs'><i className='fa fa-phone' /> (+381) 063 7703 523</p>
            <p className='pull-left text-note-ext hidden-sm hidden-md hidden-xs'><i className='fa fa-phone' /> (+381) 063 7703 524</p>
          </div>
        </div>
        <nav className='navbar navbar-default pgl-navbar-main'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <Link className='logo' to='/' onClick={ this.props.onClick }>
                <img src={ Logo } name='Pocetna' alt='' className='logo' />
              </Link>
            </div>
            <div className='navbar-collapse collapse width'>
              <ul className='nav navbar-nav pull-right' onClick={ this.props.onClick }>
                <li><Link to='/' name='Pocetna'>Početna</Link></li>
                <li><Link to='/' name='Novo-u-ponudi'>Novo u ponudi</Link></li>
                <li><Link to='/' name='O-nama'>O nama</Link></li>
                <li><Link to='/' name='Sta-radimo'>Šta radimo</Link></li>
                <li><Link to='/' name='Kontakt'>Kontakt</Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

