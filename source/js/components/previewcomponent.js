import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import SingleComponent from './single_prewiev';
import ArrangeOptions from './arrange_options';

export default class PreviewComponent extends Component {
  static propTypes = {
    url: PropTypes.object,
    data: PropTypes.object,
  }
  constructor() {
    super();

    this.state = {
      arrange: '',
      arrangedItems: [],
    };
    this.renderField = this.renderField.bind(this);
    this.arrangeArray = this.arrangeArray.bind(this);
  }
  arrangeArray(val) {
    const { items } = this.props.data;
    const arrangedItems = items.slice();
    this.setState({ arrange: val.value });
    switch (val.value) {
      case '1': {
        arrangedItems.sort((a, b) => {
          return a.fields.price - b.fields.price;
          // if (a.fields.price < b.fields.price) return -1;
          // if (a.fields.price > b.fields.price) return 1;
          // return 0;
        });
        break;
      }
      case '2': {
        arrangedItems.sort((a, b) => {
          return b.fields.price - a.fields.price;
        });
        break;
      }
      case '3': {
        arrangedItems.sort((a, b) => {
          return new Date(a.fields.createdDate) - new Date(b.fields.createdDate);
        });
        break;
      }
      case '4': {
        arrangedItems.sort((a, b) => {
          return new Date(b.fields.createdDate) - new Date(a.fields.createdDate);
        });
        break;
      }
    }
    this.setState({ arrangedItems });
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
        const { category, structure, service, city, area, priceFrom, priceTo, areaFrom, areaTo } = this.props.url;
        route = `/${ category }/${ structure }/${ service }/${ city }/${ area }/${ priceFrom }/${ priceTo }/${ areaFrom }/${ areaTo }`;
      }
    }
    return (
      <div className='col-md-4 col-sm-6 ' key={ result.sys.id }>
        <SingleComponent data={ result } route={ route } />
      </div>
    );
  }
  render() {
    if (!this.props) return (<div> <p>Učitava se stranica...</p></div>);
    const { items } = this.props.data;
    const displayItems = this.state.arrangedItems.length !== 0 ? this.state.arrangedItems : items;
    return (
      <div >
        <div className='col col-sm-12'>
          <div className='col col-sm-4'>
            <ArrangeOptions arrangeSearch={ this.arrangeArray } value={ this.state.arrange } />
          </div>
        </div>
        { _.map(displayItems, this.renderField) }
      </div>
    );
  }
}
