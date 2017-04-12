/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Section from '../HomePage/Section';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from 'components/Divider';

import H1 from 'components/H1';
import H2 from 'components/H2';
import {
  Button,
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
import { SmallWrapper, BigWrapper } from './Wrapper';
import { fetchMovie, setMovie, toggle } from './actions';
import { makeSelectMovie } from './selectors';
import { makeSelectMovieQ, makeSelectLoading } from '../App/selectors';
import TheMovie from 'components/TheMovie';
import Recommended from 'components/Recommended';

export class MoviePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setTheMovie(this.props.params.id);
    this.props.fetchMovie(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.movie) {
      this.props.setTheMovie(nextProps.params.id);
      this.props.fetchMovie(nextProps.params.id);
    }
  }
  render() {
    const { movie, loading, movieForeverAlone, handleToggle, params } = this.props;
    const reposListProps = {
      loading,
      movieForeverAlone,
      movie,
      handleToggle,
      params,
    };
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            {
              name: 'description',
              content: 'A React.js Boilerplate application homepage',
            },
          ]}
        />
        <div>
          <Section>
            <BigWrapper>
              <Grid>
                <TheMovie {...reposListProps} />
              </Grid>
            </BigWrapper>
            <Divider horizontal><H2>Recommended</H2></Divider>
            <SmallWrapper>
              <Grid>
                <Recommended {...reposListProps} />
              </Grid>
            </SmallWrapper>
          </Section>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchMovie: id => {
      dispatch(fetchMovie(id));
    },
    setTheMovie: id => {
      dispatch(setMovie(id));
    },
    handleToggle: (id, active) => {
      dispatch(toggle(id, active));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  movieForeverAlone: makeSelectMovie(),
  movie: makeSelectMovieQ(),
  loading: makeSelectLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
