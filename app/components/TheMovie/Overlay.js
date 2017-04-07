import React, { Component } from 'react';
import {
  Embed,
  Popup,
  Button,
  Header,
  Image,
  Label,
  Modal,
  Menu,
  Icon,
} from 'semantic-ui-react';

class ModalDimmer extends Component {
  state = {
    open: false,
  };

  show = dimmer =>
    () =>
      this.setState({
        dimmer,
        open: true,
      });
  close = () =>
    this.setState({
      open: false,
    });

  render() {
    const { open, dimmer } = this.state;
    const movie = this.props.title;
    const imdb = this.props.rating;

    return (
      <div>
        <Menu style={{ margin: '.7em 0' }} size="mini" icon="labeled">
          <Modal
            trigger={
              <Menu.Item style={{ minWidth: '5.5em' }} name="Trailer">
                <Icon name="play circle outline" /> Trailer
              </Menu.Item>
            }
            basic
            size="large"
          >
            <Header
              icon="play circle outline"
              content={`${movie.title} (${movie.release_date.slice(0, 4)})`}
            />
            <Modal.Content>
              <Embed
                id={
                  movie.videos.results.length > 0
                    ? `${movie.videos.results[0].key}`
                    : ''
                }
                placeholder={
                  movie.images.backdrops.length > 0
                    ? `http://image.tmdb.org/t/p/w780/${movie.images.backdrops[0].file_path}`
                    : ''
                }
                source="youtube"
              />
            </Modal.Content>
          </Modal>
          <Menu.Item
            style={{ minWidth: '5.5em' }}
            name="imdb"
            onClick={() => {
              window.open(
                `http://www.imdb.com/title/${movie.imdb_id}`,
                '_blank'
              );
            }}
          >
            <Icon name="video" /> IMDb
          </Menu.Item>
          {(() => {
            if (movie.reviews.results.length === 0) {
              return (
                <Menu.Item
                  style={{ minWidth: '5.5em' }}
                  disabled
                  name="Reviews"
                >
                  <Icon disabled name="users" />
                  <span style={{ color: '#989999' }}>Reviews</span>
                </Menu.Item>
              );
            } else {
              return (
                <Menu.Item
                  style={{ minWidth: '6.2em' }}
                  name="Reviews"
                  onClick={this.show('inverted')}
                >
                  <Icon name="users" /> Reviews
                </Menu.Item>
              );
            }
          })()}
        </Menu>
        <Modal
          style={{ bottom: 'initial' }}
          dimmer={dimmer}
          open={open}
          onClose={this.close}
        >
          <Modal.Header>
            Reviews
          </Modal.Header>
          <Modal.Content>
            {movie.reviews.results.map((item, id) => (
              <Modal.Description key={id}>
                <Header style={{ margin: '25px 0 5px' }}>
                  <Label pointing="below" color="teal" horizontal>
                    {item.author}
                  </Label>
                </Header>
                <p>
                  {item.content}
                </p>
              </Modal.Description>
            ))}
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              icon="close"
              labelPosition="right"
              content="Close"
              onClick={this.close}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalDimmer;
