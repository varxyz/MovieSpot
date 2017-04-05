import React, { PropTypes } from 'react';
import List from 'components/List';
import { Link } from 'react-router';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import {
  Button,
  Divider,
  Segment,
  Dimmer,
  Loader,
  Card,
  Icon,
  Image,
  Item,
  Label,
  Grid,
  Popup
} from 'semantic-ui-react';

function ReposList({ loading, error, repos, popular }) {
  if (loading) {
    return (
      <Dimmer active>
        <Loader>Loading</Loader>
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
      <Grid.Column computer={2} mobile={16} style={{ padding: '0.3rem' }} key={`item-${index}`}>
        <Link to={`/movie/${item.id}`}>
          <Card
            className='pt-card pt-interactive pt-elevation-1'
            image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
          />
        </Link>
      </Grid.Column>
    )).slice(0,16);

    return (
      <Grid.Row style={{ padding: '1.2em', margin:'0' }} columns={10}>
        {movie}
      </Grid.Row>
    );
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  repos: PropTypes.any,
  // popular: PropTypes.array,
};

export default ReposList;
