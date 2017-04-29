import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button, Divider, Dimmer, Loader, Card, Icon, Image, Label, Grid } from 'semantic-ui-react';
import List from 'components/List';
import ListItem from 'components/ListItem';
import Overlay from './Overlay';
import { H11, H12 } from '../H1';

function TheMovie(props) {
  const { loading, movie, handleToggle, handleSetActive, params, error, favorites, active, auth } = props;

  const toggleStatus = () => {
    handleSetActive(!(activee()));
    handleToggle(params.id, !(  activee()));
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
    const activee = () => {
      const res = favorites.filter((i) => { if (i.id === params.id) return i.active; });
      if (res.length) return res[0].active;
      return false
    };
    console.log(active, activee());
    return (
      <Grid>
        <Grid.Row style={{ padding: '1rem', margin: '0' }}>
          <Grid.Column
            mobile={16}
            computer={4}
            width={4}
            style={{ padding: '0.5rem' }}
          >
            <Card style={{ margin: '0 auto .5em' }} className="pt-card pt-elevation-1" image={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
            <div>
              <Button fluid color='green' basic>
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
              active={activee()}
              onClick={toggleStatus}
            >
              {activee() ? <span><Icon name="checkmark" />Added</span> : <span><Icon name="add" />Watchlist</span>}
            </Button>
          </Grid.Column>
          <Grid.Column mobile={16} computer={12} style={{ padding: '0.5rem' }}>
            <div>
              <H12>
                { movie.title }
              </H12>
              <H11>
                { ' ' }
                { `\xa0(${movie.release_date.slice(0, 4)})` }
              </H11>
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
            <div style={{ marginTop: '10' }}>
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
                    style={{ fontWeight: '600', margin: '3' }}
                    as="a"
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
        <Grid.Row style={{ paddingTop: '0', margin: '0' }}>
          <Grid.Column>
            <div>
              { movie.images.backdrops
                    .map((item, i) => (
                      <Image
                        key={i}
                        style={{ margin: '10', borderRadius: '3px' }}
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
// popular: PropTypes.array,
};

export default TheMovie;
