import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { SampleNextArrow, SamplePrevArrow } from './arrows';

export default class Carousel extends Component {
  static propTypes = {
    pics: PropTypes.array.isRequired,
    price: PropTypes.string,
    adType: PropTypes.string,
  }

  componentDidMount() {
    setTimeout(() => { this.carouselNormalization(); }, 1);
  }

  componentDidUpdate() {
    setTimeout(() => { this.carouselNormalization(); }, 1);
  }
  carouselNormalization() {
    const items = document.getElementsByClassName('imgItems');
    const heights = [];
    let tallest = '';
    const skippedItems = [];
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

    if (items.length) {
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
  render() {
    const { pics, price, adType } = this.props;
    const settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow onClick={ this.next } position='slick-next-carousel' />,
      prevArrow: <SamplePrevArrow onClick={ this.prev } position='slick-prev-carousel' />,
    };
    return (
      <Slider id='myCarousel' ref={ c => this.slider = c } { ...settings }>
        { pics.map((item) => {
          return (
            <div key={ item.sys.id } className='col-sm-12 imgItems' >
              <img src={ item.fields.file.url } alt='' />
              <span className='property-thumb-info-label'>
                <span className='label price'> { price } €</span>
                <span className='label forrent'> { adType } </span>
              </span>
            </div>);
        })
        }
      </Slider>
    );
  }
}
