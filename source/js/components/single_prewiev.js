import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

export default class SingleComponent extends Component {
  static propTypes = {
    data: PropTypes.object,
    route: PropTypes.string,
  }
  render() {
    const result = this.props.data;
    return (
      <Link to={ `${ this.props.route }/${ result.sys.id }` } key={ result.sys.id } >
        <div className='animation'>
          <div className='pgl-property'>
            <div className='property-thumb-info'>
              <div className='equalizer'>
                <div className='property-thumb-info-image'>
                  <img alt='' className='img-responsive' src={ result.fields.images[0].fields.file.url } />
                  <span className='property-thumb-info-label'>
                    <span className='label price'>{result.fields.price} €</span>
                    <span className='label forrent'>{result.fields.adType}</span>
                  </span>
                </div>
                <div className='property-thumb-info-content'>
                  <h3>{result.fields.title}</h3>
                  <address>{result.fields.area.fields.name}</address>
                </div>
              </div>
              <div className='amenities clearfix'>
                <ul className='pull-left'>
                  <li><strong>Površina:</strong> {result.fields.surfaceArea} m²</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
