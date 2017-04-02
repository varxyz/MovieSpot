import React, { PropTypes } from 'react';
import List from 'components/List';
import { Link } from 'react-router';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';
import Overlay from './Overlay'

import H3 from '../H3';
import H1, { bigSpan, smallSpan, H11, H12 } from '../H1';
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
  Popup,
} from 'semantic-ui-react';

function ReposList({ loading, movieForeverAlone, movie }) {
  if (loading) {
    return (
      <Dimmer active>
        <Loader>
          Loading
        </Loader>
      </Dimmer>
    );
  }

  // if (error !== false) {
  //   const ErrorComponent = () => (
  //     <ListItem item={'Something went wrong, please try again!'} />
  //   );
  //   return <List component={ErrorComponent} />;
  // }

  if (movie) {
    return (
      <Grid>
      <Grid.Row
        style={{
          padding: '1.5rem',
        }}
      >
        <Grid.Column width={4} style={{ padding: '0.5rem' }}>
          <Card
            className="pt-card pt-elevation-1"
            image={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}
          />
          <Button fluid color="yellow" toggle>
            <Icon name="add" />Watchlist
          </Button>
          <Overlay title={movie} />
        </Grid.Column>
        <Grid.Column width={8} style={{ padding: '0.5rem' }}>
          <div>
            <H12>{movie.title}</H12>
            <H11>
              {' '}{'\xa0' + '\xa0' + `(${movie.release_date.slice(0, 4)})`}
            </H11>
          </div>
          {movie.overview}
          <div style={{ marginTop: '10' }}>
            <span style={{ fontWeight: 'bold' }}>Director: </span>
            {movie.credits.crew.map(item => {
              if (item.job === 'Director') return item.name;
            })}
          </div>
          <div className="credits">
            <span style={{ fontWeight: 'bold' }}>Cast:</span>
              {movie.credits.cast.slice(0, 10).map(item => (
                  <Link to={`name/${item.id}`}>
                    <Label style={{margin:'3'}} as='a'>
                      {item.name}
                      <Label.Detail style={{fontWeight:'100'}}>{item.character}</Label.Detail>
                    </Label>

                  </Link>
              ))}
          </div>
          <Grid columns={6}>
            <Grid.Row>

            </Grid.Row>
          </Grid>
        </Grid.Column>
        <Grid.Column width={4} style={{ padding: '0.5rem 0 0 2em' }}>
          <div>
            <Label as="a" color="green" size="massive" image>
              {movie.vote_average}
              <Label.Detail>{movie.vote_count}</Label.Detail>
            </Label>
            <div style={{ margin: '5px 0', fontSize: '20', fontWeight: '600' }}>
              Box Office
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>Budget:</span>
              {` ${movie.budget.toLocaleString()}$`}
            </div>
            <div>
              <span style={{ fontWeight: '600' }}>Gross:</span>
              {` ${movie.revenue.toLocaleString()}$`}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Divider style={{margin:'0'}}/>
      <Grid.Row style={{paddingTop:'0'}}>
        <Grid.Column>
          <div>
            {movie.images.backdrops
              .map(item => (
                <Image
                  style={{margin:'10', borderRadius:'3px'}}
                  href={`https://image.tmdb.org/t/p/w1280/${item.file_path}`}
                  src={`https://image.tmdb.org/t/p/w185/${item.file_path}`}
                  target='_blank'
                />
              )).slice(0,4)
              }
          </div>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    );
  }

  return null;
}

ReposList.propTypes = {
  loading: PropTypes.bool,
  // popular: PropTypes.array,
};

export default ReposList;
