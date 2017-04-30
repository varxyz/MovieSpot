import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import List from 'components/List';
import ListItem from 'components/ListItem';
// import LoadingIndicator from 'components/LoadingIndicator';

import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react';

function ReposList({ loading, auth, dbmov }) {
  if (loading) {
    return (
      <Dimmer active>
        <Loader>Fetching...</Loader>
      </Dimmer>
    );
  }

  // if (error !== false) {
  //   const ErrorComponent = () => (
  //     <ListItem item={'Something went wrong, please try again!'} />
  //   );
  //   return <div component={ErrorComponent} />;
  // }

  if (dbmov) {
    const name = dbmov
      .map((item, index) => (
        <Grid.Column
          mobile={8}
          tablet={4}
          computer={2}
          style={{ padding: '0.5rem' }}
          key={`item-${index}`}
        >
          <Link to={`/movie/${item.id}`}>
            <Card className="pt-card pt-interactive pt-elevation-1" image={`https://image.tmdb.org/t/p/w780/${item.poster_path}`} />
          </Link>
        </Grid.Column>
      ))
    return (
      <Grid.Row style={{ padding: '1rem', margin: '0' }} columns={8}>
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


    // const renderList = () => {
    //   if (loading) {
    //     return <LoadingIndicator />;
    //   }

    //   // if (error !== false) {
    //   //   const ErrorComponent = () => (
    //   //     <ListItem item={'Something went wrong, please try again!'} />
    //   //   );
    //   //   return <div component={ErrorComponent} />;
    //   // }
    //   if (auth.authenticated) {
    //     <ColumnFit
    //       mobile={4}
    //       computer={1}
    //       style={{ padding: '0.3rem' }}
    //       key={'item'}
    //     >
    //       <Link to={'/name/'}>
    //         <Card className="pt-card pt-interactive pt-elevation-1" image={'https://image.tmdb.org/t/p/w185/'} />
    //       </Link>
    //     </ColumnFit>;

    //     return (
    //       <Grid.Row style={{ padding: '1.2em', margin: '0' }} columns={12}>
    //       </Grid.Row>
    //     );
    //   }
    //   return null;
    // };
