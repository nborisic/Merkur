import React, { Component } from 'react';
import PropTypes from 'prop-types';


/* global $ */


function carouselNormalization() {
  const items = document.getElementById('myCarousel').getElementsByClassName('item');
  const heights = [];
  let tallest = '';
  const skippedItems = [];

  if (items.length) {
    function normalizeHeights() {
      const containerWidth = items[0].clientWidth;
      for (let i = 0; i < items.length; i++) {
        const img = items[i].childNodes[0];
        let imgWidth = img.naturalWidth;
        let imgHeight = img.naturalHeight;
        // izbacujem vertikalne slike da ne uticu na rezervisan prosor
        if (imgHeight > imgWidth) {
          skippedItems.push(i);
          continue;
        }

        let calcHeight = '';
        if (containerWidth > imgWidth) {
          img.style.width = '100%';
          calcHeight = (imgHeight * containerWidth) / imgWidth;
          imgWidth = containerWidth;
          imgHeight = calcHeight;
        }
        calcHeight = (imgHeight * containerWidth) / imgWidth;
        heights.push(calcHeight);
      }
      tallest = Math.max.apply(null, heights);
      for (let i = 0; i < items.length; i++) {
        items[i].style.minHeight = `${ tallest }px`;
      }
      // resize i centriranje vertikalnih slika
      for (let i = 0; i < items.length; i++) {
        for (let j = 0; j < skippedItems.length; j++) {
          if (i === skippedItems[j]) {
            items[i].childNodes[0].style.height = `${ tallest }px`;
            items[i].childNodes[0].style.margin = 'auto';
          }
        }
      }
    }
    normalizeHeights();

    window.addEventListener('resize', () => {
      let resizeTimeout = null;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          function resizeImg() {
            tallest = 0;
            heights.length = 0;
            for (let i = 0; i < items.length; i++) {
              items[i].style.minHeight = 0;
            }
            normalizeHeights();
          }
          resizeImg();
        }, 100);
      }
    }, true);
  }
}

export default class Carousel extends Component {
  static propTypes = {
    pics: PropTypes.array.isRequired,
    price: PropTypes.string,
    adType: PropTypes.string,
  }
  constructor() {
    super();
    this.addStyles = this.addStyles.bind(this);
  }
  componentDidMount() {
    this.addStyles();
  }
  componentDidUpdate() {
    this.addStyles();
  }

  addStyles() {
    const items = document.getElementById('myCarousel');
    window.requestAnimationFrame(() => {
      if (items) {
        carouselNormalization();
      }
    });
  }

  render() {
    const { pics, price, adType } = this.props;
    $(document).ready(() => {
      $('#myCarousel').carousel({
        pause: true,
        interval: false,
      });
    });
    this.addStyles();


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
                <span className='property-thumb-info-label'>
                  <span className='label price'> { price } €</span>
                  <span className='label forrent'> { adType } </span>
                </span>
                <div className='pull-right'>
                  <div className='margin'>
                    <a role='button' data-slide='prev' href='#myCarousel' ><div className='carousel-div-left' /></a>
                  </div>
                  <div className='margin'>
                    <a role='button' data-slide='next' href='#myCarousel'><div className='carousel-div-right' /></a>
                  </div>
                </div>
              </div>
            );
          }
            ) }
        </div>
      </div>);
  }
}
