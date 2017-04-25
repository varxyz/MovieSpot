import React, { PropTypes } from 'react';
import { Divider, Dimmer, Loader, Card, Grid } from 'semantic-ui-react';
import List from 'components/List';
import ListItem from 'components/ListItem';
import { H12 } from '../H1';

class ReposList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }
  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    const { loading, name, error } = this.props;

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

    if (name) {
      return (
        <Grid>
          <Grid.Row style={{ padding: '1em', margin: '0' }}>
            <Grid.Column
              mobile={16}
              computer={4}
              width={4}
              style={{ padding: '0.5rem' }}
            >
              <Card style={{ margin: '0 auto .5em' }} className="pt-card pt-elevation-1" image={`https://image.tmdb.org/t/p/w780/${name.profile_path}`} />
            </Grid.Column>
            <Grid.Column mobile={16} computer={12} style={{ padding: '0.5rem' }}>
              <div>
                <H12>
                  { name.name }
                </H12>
              </div>
              { (() => {
                if (this.props.name.biography && !this.state.expanded) {
                  const delimiter = '.',
                    last = '3',
                    tokens = this.props.name.biography
                        .split(delimiter)
                        .slice(0, last),
                    result = tokens.join(delimiter);
                  return `${result}.`;
                } else {
                  return this.props.name.biography;
                }
              })() }
              { this.props.name.biography
                ? <div onClick={this.handleClick} style={{ cursor: 'pointer', bottom: '1', left: '5' }} className="movie-tags pt-tag pt-intent-success pt-minimal">
                    Read
                    { this.state.expanded ? 'Less' : 'More' }
                </div>
                : null }
            </Grid.Column>
          </Grid.Row>
          <Divider style={{ margin: '0' }} />
          <Grid.Row columns={8} style={{ padding: '.4em 1.4em 1.4em', margin: '0' }}>
            { name.images.profiles
                .slice(1)
                .map((item) => (
                  <Grid.Column style={{ padding: '.5rem' }}>
                    <div>
                      <Card href={`https://image.tmdb.org/t/p/w1280/${item.file_path}`} image={`https://image.tmdb.org/t/p/w185/${item.file_path}`} target="_blank" />
                    </div>
                  </Grid.Column>
                ))
                .slice(0, 8) }
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
