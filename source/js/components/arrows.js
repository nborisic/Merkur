import React from 'react';
import PropTypes from 'prop-types';

export function SampleNextArrow(props) {
  const { onClick, position } = props;
  return (
    <div
      className={ `slick-next ${ position }` }
      onClick={ onClick }
    ><i className='icons-right' /></div>
  );
}

export function SamplePrevArrow(props) {
  const { onClick, position } = props;
  return (
    <div
      className={ `slick-prev ${ position }` }
      onClick={ onClick }
    ><i className='icons-left' /></div>
  );
}

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.string,
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
  position: PropTypes.string,
};
