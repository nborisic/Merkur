import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
      return (
        <div key={ result.sys.id }>
          <div className='col col-sm-9' >
            <div>
              <span className=''>{result.fields.title}</span>
              <span className='pull-right'>{result.fields.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} €</span>
            </div>
            <div className=''>
              { result.fields.address }
            </div>
            <div>
              <Carousel pics={ result.fields.images } />
            </div>
            <div className='flex-container'>
              <div>
                <span className='item'> Datum objave: </span>
                <span className='item'>{result.fields.createdDate.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3.$2.$1')}</span>
              </div>
              <div>
                <span className='item'> Površina: </span>
                <span className='item'>{result.fields.surfaceArea} m²</span>
              </div>
              <div>
                <span className='item'> Cena: </span>
                <span className='item'>{result.fields.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')} €</span>
              </div>
            </div>
          </div>
          <div className='col col-sm-3'>
            {result.fields.description}
          </div>
        </div>
      );
    }
  }
  render() {
    return (
      <div>
        { _.map(this.props.data.items, this.renderComponent) }
      </div>
    );
  }
}
