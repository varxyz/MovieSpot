import React, { PropTypes } from 'react';
import GridColumn from './GridColumn';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react';

function ReposList({ loading, error, repos, popular }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (popular) {
    const me = popular.results.map((item) => (<Grid.Column style={{ padding: '0.5rem' }} className="main-poster">
      <Card
        className="pt-card pt-interactive pt-elevation-1"
        image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`}
      />
    </Grid.Column>));

    return (
      <Grid.Row columns={10}>
        {me}
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
