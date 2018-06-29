import React from 'react';
import PropTypes from 'prop-types';

const NewsItem = (props) => {
  const showImage = props.img ? (<img src={ props.img } alt="" height="50" width="50" />) : null

  return (
    <li className="news-item">
      { showImage }
      <a href={ props.link }>{ props.title }</a>
    </li>
  )
};

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  img: PropTypes.string,
};

NewsItem.defaultProps = {
  img: null,
};

export default NewsItem;