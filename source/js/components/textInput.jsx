import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Input extends Component {
  static propTypes = {
    validate: PropTypes.func,
    error: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  }
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }
  onInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;
    this.props.validate(value, name);
  }

  render() {
    return (
      <div className='form-group col col-xs-6' >
        <div className='field' >
          <input
            type='text'
            onChange={ this.onInputChange }
            name={ this.props.name }
            className='form-control'
            placeholder={ this.props.placeholder }
            value={ this.props.value }
          />
        </div>
        <span>{this.props.error}</span>
      </div>
    );
  }
}
