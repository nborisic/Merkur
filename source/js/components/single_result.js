import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carousel from './carousel';

export default class SingleResult extends Component {
  static propTypes = {
    data: PropTypes.object,
    url: PropTypes.object,
  }

  constructor() {
    super();
    this.renderComponent = this.renderComponent.bind(this);
  }

  renderComponent(result) {
    if (this.props.url.id === result.sys.id) {
      const createdDate = result.fields.createdDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1');
      const price = result.fields.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
      return (
        <div key={ result.sys.id } className='pgl-bg-light'>
          <Carousel pics={ result.fields.images } price={ price } adType={ result.fields.adType } />
          <div className='pgl-detail'>
            <div className='row'>
              <div className='col-sm-4'>
                <ul className='list-unstyled amenities amenities-detail'>
                  <li><strong>Tip objekta:</strong> {result.fields.realtyType}</li>
                  <li><strong>Površina:</strong> {result.fields.surfaceArea} m²</li>
                  <li><i className='icons icon-price' /> {price} €</li>
                  <li><address><i className='icons icon-location' /> { result.fields.address }</address></li>
                  <li><i className='icons icon-bedroom' /> {result.fields.structure}</li>
                  <li><strong>Datum objave:</strong> {createdDate}&nbsp;god.</li>
                </ul>
              </div>
              <div className='col-sm-8'>
                <h2>{result.fields.title}</h2>
                <p>{result.fields.description}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        { this.props.data.items.map(this.renderComponent) }
      </div>
    );
  }
}
