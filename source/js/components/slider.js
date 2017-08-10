import React, { Component } from 'react';
import _ from 'lodash';
import CarouselSwipe from 'bootstrap-carousel-swipe';
import PropTypes from 'prop-types';
import SingleComponent from './single_prewiev';


/* global $ */
export default class Slider extends Component {
  static propTypes = {
   data: PropTypes.object,
  }

  constructor() {
    super();
    this.renderField = this.renderField.bind(this);
  }

  renderField(result, i) {
    const ClassName = `item ${ i === 0 ? 'active' : '' }`;
    const route = '/Novo_u_ponudi';


    return (
      <div className={ ClassName } key={ i }>
        <div className='row'>
          { result.map((item) => <div className='col-sm-3' key={ item.sys.id }><SingleComponent data={ item } route={ route } /></div>)}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.data) return (<div> <p>Loading...</p></div>);


    $(document).ready(() => {
      $('#media').carousel({
        pause: true,
        interval: false,
      });
    });

    let { items } = this.props.data;
    items = _.chunk(items, 4);
    return (
      <div className='container'>
        <div className='row'>
          <h2>Novo u ponudi</h2>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='carousel slide media-carousel' id='media'>
              <div className='carousel-inner' name='slider'>
                {items.map(this.renderField)}
              </div>
              <a data-slide='prev' href='#media' className='left carousel-control'>‹</a>
              <a data-slide='next' href='#media' className='right carousel-control'>›</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
