import React, { Component } from 'react';
import PropTypes from 'prop-types';


/* global $ */
export default class Carousel extends Component {
  static propTypes = {
    pics: PropTypes.array.isRequired,
  }

  render() {
    const pics = this.props.pics;
    $(document).ready(() => {
      $('#myCarousel').carousel({
        pause: true,
        interval: false,
      });
    });

    return (
      <div id='myCarousel' className='carousel slide' data-ride='carousel' >
        <ol className='carousel-indicators'>
          {pics.map((item, i) => {
            return (
              <li data-target='#myCarousel' data-slide-to={ i } className={ i === 0 ? 'active' : '' } key={ item.sys.id } />
            );
          })}
        </ol>
        <div className='carousel-inner'>
          { pics.map((item, i) => {
            const ClassName = `item ${ i === 0 ? 'active' : '' }`;
            return (
              <div className={ ClassName } key={ item.sys.id }>
                <img src={ item.fields.file.url } alt={ item.fields.file.details.fileName } />
              </div>
            );
          }
            ) }
        </div>
        <a className='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>
          <span className='glyphicon glyphicon-chevron-left' aria-hidden='true' />
          <span className='sr-only'>Previous</span>
        </a>
        <a className='right carousel-control' href='#myCarousel' role='button' data-slide='next'>
          <span className='glyphicon glyphicon-chevron-right' aria-hidden='true' />
          <span className='sr-only'>Next</span>
        </a>
      </div>);
  }
}
