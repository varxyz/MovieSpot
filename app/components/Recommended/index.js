import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup, } from 'semantic-ui-react';

function ReposList({loading, movieForeverAlone, movie}) {
  if (loading) {
    // return <LoadingIndicator />;
  }

  // if (error !== false) {
  //   const ErrorComponent = () => (
  //     <ListItem item={'Something went wrong, please try again!'} />
  //   );
  //   return <div component={ErrorComponent} />;
  // }
  if (movie && movie.recommendations.results.length > 0) {
    const name = movie.recommendations.results
      .map((item, index) => (
        <Grid.Column mobile={ 8 }
          computer={ 2 }
          style={ { padding: '0.5rem' } }
          key={ `item-${index}` }>
          <Link to={ `/movie/${item.id}` }>
          <Card className="pt-card pt-interactive pt-elevation-1" image={ `https://image.tmdb.org/t/p/w185/${item.poster_path}` } />
          </Link>
        </Grid.Column>
      ))
      .slice(0, 8);
    return (
      <Grid.Row style={ { padding: '1rem', margin: '0' } } columns={ 8 }>
        { name }
      </Grid.Row>
      );
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
// error: PropTypes.any,
// repos: PropTypes.any,
// popular: PropTypes.array,
};

export default ReposList;
