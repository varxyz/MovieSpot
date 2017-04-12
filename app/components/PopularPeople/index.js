import React, { PropTypes } from 'react';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import ColumnFit from 'components/ColumnFit/';
import { Link } from 'react-router';

import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react';

function ReposList({ loading, error, repos, popular, people }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <div component={ErrorComponent} />;
  }
  if (people) {
    const name = people.results.map((item, index) => (
      <ColumnFit mobile={4} computer={1} style={{ padding: '0.3rem' }} key={`item-${index}`}>
        <Link to={`/name/${item.id}`}><Card
          className="pt-card pt-interactive pt-elevation-1"
          image={`https://image.tmdb.org/t/p/w185/${item.profile_path}`}
        /></Link>
      </ColumnFit>
      )).slice(0, 16);
    return (
      <Grid.Row style={{padding: '1.2em', margin:'0'}} columns={12}>
        {name}
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
