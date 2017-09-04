import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import SingleComponent from './single_prewiev';
import { SampleNextArrow, SamplePrevArrow } from './arrows';

export default class SliderComponent extends Component {
  static propTypes = {
    data: PropTypes.object,
  }

  constructor() {
    super();
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  next() {
    this.slider.slickNext();
  }
  prev() {
    this.slider.slickPrev();
  }

  render() {
    if (!this.props.data) return (<div> <p>Loading...</p></div>);
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      nextArrow: <SampleNextArrow onClick={ this.next } position='slick-next-slider' />,
      prevArrow: <SamplePrevArrow onClick={ this.prev } position='slick-prev-slider' />,
      responsive: [{
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      }],
    };
    const route = '/Novo_u_ponudi';

    const { items } = this.props.data;
    return (
      <div className='container'>
        <Slider ref={ c => this.slider = c } { ...settings }>
          { items.map((item) => <div key={ item.sys.id } className='col-sm-12' ><SingleComponent data={ item } route={ route } key={ item.sys.id } /></div>)}
        </Slider>
      </div>
    );
  }
}
