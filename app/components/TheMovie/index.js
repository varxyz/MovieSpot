import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Divider, Dimmer, Loader, Card, Icon, Image, Label, Grid } from 'semantic-ui-react';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Overlay from './Overlay';
import { Heading1, Heading2 } from '../H1';

function TheMovie({ loading, movie, handleToggle, handleSetActive, params, error, favorites, auth, active }) {
  const toggleStatus = () => {
    handleSetActive(!active);
    handleToggle(params.id, !active);
  };
  if (loading || !favorites) {
    return (
      <Dimmer active>
        <Loader>
          Loading
        </Loader>
      </Dimmer>
    );
  }
  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }
  if (movie && favorites) {
    return (
      <Grid>
        <Grid.Row style={{ padding: '1rem', margin: '0px' }}>
          <Grid.Column
            mobile={16}
            computer={4}
            width={4}
            style={{ padding: '0.5rem' }}
          >
            <Card style={{ margin: '0 auto .5em' }} className="pt-card pt-elevation-1" image={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
            <div>
              <Button
                fluid
                color="red"
                basic
                disabled
              >
                <Icon name="line chart" />
                { `\xa0\xa0\xa0\xa0\xa0\xa0${movie.vote_average}\xa0\xa0\xa0\xa0\xa0\xa0${movie.vote_count} votes ` }
              </Button>
            </div>
            <Overlay title={movie} />
            <Button
              disabled={!auth.authenticated}
              fluid
              color="yellow"
              toggle
              active={active}
              onClick={toggleStatus}
            >
              { active ? <span><Icon name="checkmark" />Added</span> : <span><Icon name="add" />Watchlist</span> }
            </Button>
          </Grid.Column>
          <Grid.Column mobile={16} computer={12} style={{ padding: '0.5rem' }}>
            <div>
              <Heading2>
                { movie.title }
              </Heading2>
              <Heading1>
                { ' ' }
                { `\xa0(${movie.release_date.slice(0, 4)})` }
              </Heading1>
            </div>
            <div>
              { movie.genres.map((item, i) => (
                <span key={i} style={{ margin: '0 .6em .5em 0' }} className="movie-tags pt-tag pt-intent-success pt-minimal">{ item.name }</span>
                )) }
            </div>
            { movie.overview }
            <div style={{ marginTop: '1em' }}>
              <span style={{ fontWeight: '600' }}>Budget:</span>
              { ` ${movie.budget.toLocaleString()}$` }
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>Gross:</span>
              { ` ${movie.revenue.toLocaleString()}$` }
            </div>
            <div style={{ marginTop: '10px' }}>
              <span style={{ fontWeight: 'bold' }}>Director:</span>
              { movie.credits.crew.map((item) => {
                if (item.job === 'Director') return item.name;
                return null;
              }) }
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Writer:</span>
              { movie.credits.crew.map((item, i) => {
                if (item.job === 'Screenplay') {
                  return (
                    <Link key={i} to={`/name/${item.id}`}>
                      { `${item.name} ` }
                    </Link>
                  );
                }
                return null;
              }) }
            </div>
            <div className="credits">
              <div style={{ fontWeight: 'bold' }}>
                Cast:
              </div>
              { movie.credits.cast.slice(0, 19).map((item, i) => (
                <Link key={i} to={`/name/${item.id}`}>
                  <Label
                    size="large"
                    style={{ fontWeight: '600', margin: '3px' }}
                    image
                  >
                    <img alt="profile" src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`} />
                    { item.name }
                  </Label>
                </Link>
                )) }
            </div>
          </Grid.Column>
        </Grid.Row>
        <Divider style={{ margin: '0' }} />
        <Grid.Row style={{ paddingTop: '0px', margin: '0px' }}>
          <Grid.Column>
            <div>
              { movie.images.backdrops
                  .map((item, i) => (
                    <Image
                      key={i}
                      style={{ margin: '10px', borderRadius: '3px' }}
                      href={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
                      src={`https://image.tmdb.org/t/p/w185/${item.file_path}`}
                      target="_blank"
                    />
                  ))
                  .slice(0, 4) }
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return null;
}

TheMovie.propTypes = {
  loading: PropTypes.bool,
  movie: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  handleToggle: React.PropTypes.func,
  handleSetActive: React.PropTypes.func,
  auth: React.PropTypes.object,
  favorites: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  active: React.PropTypes.bool,
  params: React.PropTypes.object,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default TheMovie;
