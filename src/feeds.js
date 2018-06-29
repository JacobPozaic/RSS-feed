import React, { Component } from 'react';
import NewsFeed from './newsFeed';
import {
  Container,
  Row,
  Col,
  Button,
  Input,
} from 'reactstrap';

//['https://reddit.com/.rss', 'https://feeds2.feedburner.com/piriform']
export default class Feed extends Component {
  constructor(props) {
    super(props);

    this.addFeed = this.addFeed.bind(this);
    this.submit = this.submit.bind(this);
  }

  state = {
    feeds: [],
    newFeed: '',
  };

  addFeed({ target }) {
    this.setState(() => ({ newFeed: target.value }));
  }

  removeFeed(feed) {
    this.setState(prevState => ({
      feeds: prevState.feeds.filter(a => a !== feed),
    }));
  }

  submit(event) {
    event.preventDefault();
    if(this.state.newFeed !== '') {
      this.setState(prevState => ({
        feeds: prevState.feeds.concat(prevState.newFeed),
        newFeed: '',
      }));
    }
  }

  render() {
    const { feeds, newFeed } = this.state;

    return (
      <Container>
        <div className="feeds">
          <div className="feeds-subscribe">
            <p>Enter the address of a RSS feed</p>
            <form onSubmit={this.submit}>
              <Col>
                <Input type="text" value={newFeed} onChange={this.addFeed} />
              </Col>
              <Col>
                <Button color="danger">Submit</Button>
              </Col>
            </form>
          </div>
          
          {feeds.length > 0 ? (
            <div className="feeds-subscriptions">
              <p>Feeds I am subscribed to:</p>
              <ul className="feeds-subscriptions-list">
                {feeds.map(feed => (
                  <li>
                    <Col>{feed}</Col>
                    <Col>
                      <Button color="danger" size="sm" onClick={() => this.removeFeed(feed)}>
                        Delete
                      </Button>
                    </Col>
                  </li>
                ))}
              </ul>

              {feeds.map(feed => (
                <Row>
                  <NewsFeed key={feed} rssfeed={feed} />
                </Row>
              ))}
            </div>
          ) : (
            <p>
              No feeds!
            </p>
          )}
        </div>
      </Container>
    );
  }
}
