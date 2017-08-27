import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledSelect } from './styledComponents';

export default class ArrangeOption extends Component {
  static propTypes = {
    arrangeSearch: PropTypes.func,
    value: PropTypes.string,
  }

  render() {
    const option = [{
      'label': 'od najniže cene',
      'value': '1',
    },
    {
      'label': 'od najviše cene',
      'value': '2',
    },
    {
      'label': 'prvo najnovije',
      'value': '3',
    },
    {
      'label': 'prvo najstarije',
      'value': '4',
    }];

    return (
      <StyledSelect
        placeholder=' Izaberi poredak '
        name='arrange'
        options={ option }
        value={ this.props.value }
        onChange={ this.props.arrangeSearch }
      />
    );
  }
}
