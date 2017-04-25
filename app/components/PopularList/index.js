import React, { PropTypes } from 'react';
import List from 'components/List';
import { Link } from 'react-router';
import ListItem from 'components/ListItem';
import { Column, GridRow } from 'components/Grid/';
import { Dimmer, Loader, Card } from 'semantic-ui-react';

function ReposList({ loading, error, popular }) {
  if (loading) {
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

  if (popular) {
    const movie = popular.results.map((item, index) => (
      <Column
        computer={2}
        mobile={8}
        key={`item-${index}`}
      >
        <Link to={`/movie/${item.id}`}>
          <Card className="pt-card pt-interactive pt-elevation-1" image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
        </Link>
      </Column>
    )).slice(0, 16);

    return (
      <GridRow columns={10}>
        { movie }
      </GridRow>
    );
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  popular: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object,
  ]),
};

export default ReposList;
