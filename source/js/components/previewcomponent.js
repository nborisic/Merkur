import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SingleComponent from './single_prewiev';

export default class PreviewComponent extends Component {
  static propTypes = {
    url: PropTypes.object,
    data: PropTypes.object,
  }
  constructor() {
    super();

    this.state = { arange: '' };
    this.renderField = this.renderField.bind(this);
    this.arangeArray = this.arangeArray.bind(this);
  }

  renderField(result) {
    let route = '';
    switch (Object.keys(this.props.url)[0]) {
      case 'id': {
        route = '/Novo_u_ponudi';
        break;
      }
      case 'quickParameter': {
        const searchTerm = this.props.url.quickParameter;
        route = `/${ searchTerm }`;
        break;
      }
      default: {
        const { Category, structure, Service, City, Area, priceFrom, priceTo, areaFrom, areaTo } = this.props.url;
        route = `/${ Category }/${ structure }/${ Service }/${ City }/${ Area }/${ priceFrom }/${ priceTo }/${ areaFrom }/${ areaTo }`;
      }
    }
    return (
      <div className='col-sm-3' key={ result.sys.id }>
        <SingleComponent data={ result } route={ route } />
      </div>
    );
  }
  // da li se ovde menja app state sa time sto sortiram array koji dolazi iz propsa?
  arangeArray(e) {
    const { items } = this.props.data;
    let value = '';
    value = e.target.value;
    this.setState({ arange: value });
    switch (value) {
      case '1': {
        items.sort((a, b) => {
          return a.fields.price - b.fields.price;
          //if (a.fields.price < b.fields.price) return -1;
          //if (a.fields.price > b.fields.price) return 1;
          //return 0;
        });
        break;
      }
      case '2': {
        items.sort((a, b) => {
          return b.fields.price - a.fields.price;
        });
        break;
      }
      case '3': {
        items.sort((a, b) => {
          return new Date(a.fields.createdDate) - new Date(b.fields.createdDate);
        });
        break;
      }
      case '4': {
        items.sort((a, b) => {
          return new Date(b.fields.createdDate) - new Date(a.fields.createdDate);
        });
        break;
      }
    }
  }

  render() {
    if (!this.props) return (<div> <p>Učitava se stranica...</p></div>);
    const { items } = this.props.data;
    return (
      <div >
        <div className='col col-sm-12'>
          <div className='col col-sm-4'>
            <select onChange={ this.arangeArray } className='placeholder form-control' value={ this.state.arange } >
              <option> Izaberi poredak </option>
              <option value='1' > od najniže cene </option>
              <option value='2'> od najviše cene </option>
              <option value='3'> prvo najnovije </option>
              <option value='4'> prvo najstarije </option>
            </select>
          </div>
        </div>
        { _.map(items, this.renderField) }
      </div>
    );
  }
}
