import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Pagination extends Component {
  static propTypes = {
    setNumber: PropTypes.func,
    no: PropTypes.number,
  }
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    this.props.setNumber(e.target.innerText);
  }
  renderPagination(noFields) {
    const rows = [];
    for (let i = 1; i <= noFields; i++) {
      rows.push(<li onClick={ this.onClick } key={ i } ><a href='/' >{i}</a></li>);
    }
    return rows;
  }
  render() {
    return (
      <ul className='pagination'>
        {this.renderPagination(this.props.no)}
      </ul>
    );
  }
}
