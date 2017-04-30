import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Dimmer, Loader, Card, Grid } from 'semantic-ui-react';
import ListItem from 'components/ListItem';

function KnownFor({ loading, name, error }) {
  if (loading) {
    return (
      <Dimmer active>
        <Loader>Fetching...</Loader>
      </Dimmer>
    );
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <div component={ErrorComponent} />;
  }
  if (name) {
    const entry = name.combined_credits.cast
      .map((item, index) => {
        if (item.poster_path) {
          return (
            <Grid.Column
              mobile={8}
              computer={2}
              style={{ padding: '0.5rem' }}
              key={`item-${index}`}
            >
              <Link to={`/movie/${item.id}`}>
                <Card className="pt-card pt-interactive pt-elevation-1" image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
              </Link>
            </Grid.Column>
          );
        }
        return null;
      });
    const crew = name.combined_credits.crew
      .filter((item) => item.job === 'Director')
      .map((item, i) => (
        <Grid.Column key={i} mobile={8} computer={2} style={{ padding: '0.5rem' }}>
          <Link to={`/movie/${item.id}`}>
            <Card className="pt-card pt-interactive pt-elevation-1" image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
          </Link>
        </Grid.Column>
      ));
    return (
      <Grid.Row style={{ padding: '1em', margin: '0' }} columns={8}>
        { crew }
        { entry }
      </Grid.Row>
    );
  }

  return null;
}

KnownFor.propTypes = {
  loading: PropTypes.bool,
  name: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export default KnownFor;
