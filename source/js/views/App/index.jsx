import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/navbar';
import GoogleMap from '../../components/google_map';
import Mail from '../../components/mail';

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
    setTimeout(() => { $('html, body').animate({ scrollTop: $(`#${ name }`).offset().top - 120 }, 500); }, 500);
  }

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
        <Navbar onClick={ this.listenEvents } />
        { children }
        <div id='Kontakt' name='kontakt' className='col-sm-12 pgl-bg-light'>
          <div className='container'>
            <div className='row'>
              <div className='col-sm-4'>
                <h2>kontakt</h2>
                <p><span className='glyphicon glyphicon-earphone' />&nbsp; (+381) 036 333 668</p>
                <p><span className='glyphicon glyphicon-earphone' />&nbsp; (+381) 063 7703 523</p>
                <p><span className='glyphicon glyphicon-earphone' />&nbsp; (+381) 063 7703 524</p>
                <p><span className='glyphicon glyphicon-envelope' />&nbsp; nekretninemerkur@open.telekom.rs</p>
                <p><span className='glyphicon glyphicon-home' />&nbsp; Tomislava Andrića Džigija 45, 36000 Kraljevo</p>
              </div>
              <div className='col-sm-4 col-sm-offset-4'>
                <Mail />
              </div>
            </div>
          </div>
        </div>
        <GoogleMap />
      </div>
    );
  }
}
