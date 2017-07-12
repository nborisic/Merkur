import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../../components/navbar';
import GoogleMap from '../../components/google_map';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }
  listenEvents(e){
      const {name} = e.target;
      setTimeout(()=>{$("html, body").animate({scrollTop: $("#"+name).offset().top - 100 }, 500);},500)
    }

    componentDidMount(){
      //ne radi?
      window.scrollTo(0,0)
    }

  render() {
    const { children } = this.props;

    return (
      <div className='App'>
      <Navbar onClick={this.listenEvents} />
      {children}
      <GoogleMap />
      </div>
    );
  }
}
