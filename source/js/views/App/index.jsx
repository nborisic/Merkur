import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/navbar';
// import MailComponent from '../../components/mail';
import GoogleMap from '../../components/google_map';

/* global $ */
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  listenEvents(e) {
    const { name } = e.target;
    setTimeout(() => { $('html, body').animate({ scrollTop: $(`#${ name }`).offset().top - 100 }, 500); }, 500);
  }

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <Navbar onClick={ this.listenEvents } />
        { children }
        <GoogleMap />
      </div>
    );
  }
}
