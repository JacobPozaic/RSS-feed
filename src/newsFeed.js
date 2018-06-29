import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RSSParser from 'rss-parser';

import NewsItem from './news-item';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new RSSParser();

const feedItemMapping = ({ title, link }) => ({ title, link });

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      title: 'Loading news items for ' + this.props.rssfeed + '...',
      items: [],
    });
  }

  parseRssFeed(err, feed) {
    if(err) console.log('Error opening RSS feed: ' + this.props.rssfeed);
    else this.setState(() => ({
      title: feed.title,
      items: feed.items.map(feedItemMapping),
    }));
  }

  componentDidMount() {
    if(this.props.rssfeed.endsWith('.xml')) {
      parser.parseString(CORS_PROXY + this.props.rssfeed, (err, feed) => this.parseRssFeed(err, feed));
    } else {
      parser.parseURL(CORS_PROXY + this.props.rssfeed, (err, feed) => this.parseRssFeed(err, feed));
    }
  }

  render() {
    return (
      <div className="news">
        <h1>{this.state.title}</h1>
        <ul className="news-items">
          {
            this.state.items.map((item, index) => {
              return <NewsItem key= { index } title={ item.title } link={ item.link } />
            })
          }
        </ul>
      </div>
    );
  }
}

NewsFeed.propTypes = {
    rssfeed: PropTypes.string.isRequired,
};