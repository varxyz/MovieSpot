import React, { PropTypes } from 'react';
import List from 'components/List';
import { Link } from 'react-router';
import ListItem from 'components/ListItem';
import Overlay from './Overlay';
import { H11, H12 } from '../H1';
import { Button, Divider, Dimmer, Loader, Card, Icon, Image, Label, Grid } from 'semantic-ui-react';

class ReposList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  toggleStatus = () => {
    this.setState({
      active: !this.state.active,
    }),
    this.props.handleToggle(this.props.params.id, !this.state.active);
  }
  render() {
    const { loading, movieForeverAlone, movie, handleToggle } = this.props;
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
          <Grid.Row style={{ padding: '1rem', margin: '0' }}>
            <Grid.Column
              mobile={16}
              computer={4}
              width={4}
              style={{ padding: '0.5rem' }}
            >
              <Card style={{ margin: '0 auto .5em' }} className="pt-card pt-elevation-1" image={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`} />
              <div>
                <Button disabled fluid color="green">
                  <Icon name="line chart" />
                  { `\xa0\xa0\xa0\xa0\xa0\xa0${movie.vote_average}\xa0\xa0\xa0\xa0\xa0\xa0${movie.vote_count} votes ` }
                </Button>
              </div>
              <Overlay title={movie} />
              <Button
                fluid
                color="yellow"
                toggle
                active={this.state.active}
                onClick={this.toggleStatus}
              >
                {this.state.active ? <span><Icon name="checkmark" />Added</span> : <span><Icon name="add" />Watchlist</span>}
              </Button>
            </Grid.Column>
            <Grid.Column mobile={16} computer={12} style={{ padding: '0.5rem' }}>
              <div>
                <H12>
                  { movie.title }
                </H12>
                <H11>
                  { ' ' }
                  { '\xa0' + '\xa0' + `(${movie.release_date.slice(0, 4)})` }
                </H11>
              </div>
              <div>
                { movie.genres.map((item) => (
                  <span style={{ margin: '0 .6em .5em 0' }} className="movie-tags pt-tag pt-intent-success pt-minimal">{ item.name }</span>
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
                }) }
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Writer:</span>
                { movie.credits.crew.map((item) => {
                  if (item.job === 'Screenplay') {
                    return (
                      <Link to={`/name/${item.id}`}>
                        { `${item.name} ` }
                      </Link>
                    );
                  }
                }) }
              </div>
              <div className="credits">
                <div style={{ fontWeight: 'bold' }}>
                  Cast:
                </div>
                { movie.credits.cast.slice(0, 19).map((item) => (
                  <Link to={`/name/${item.id}`}>
                    <Label
                      size="large"
                      style={{ fontWeight: '600', margin: '3' }}
                      as="a"
                      image
                    >
                      <img src={`https://image.tmdb.org/t/p/w185/${item.profile_path}`} />
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
                    .map((item) => (
                      <Image
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
}

ReposList.propTypes = {
  loading: PropTypes.bool,
// popular: PropTypes.array,
};

export default ReposList;
