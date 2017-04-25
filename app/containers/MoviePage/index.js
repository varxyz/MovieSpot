import React from 'react';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from 'components/Divider';
import H2 from 'components/H2';
import { Grid } from 'semantic-ui-react';
import TheMovie from 'components/TheMovie';
import Recommended from 'components/Recommended';
import { SmallWrapper, BigWrapper } from './Wrapper';
import { fetchMovie, setMovie, toggle, setActive } from './actions';
import { makeSelectMovie, makeSelectActive } from './selectors';
import { makeSelectMovieQ, makeSelectLoading } from '../App/selectors';
import Section from '../HomePage/Section';

export class MoviePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setTheMovie(this.props.params.id);
    this.props.fetchMovie(this.props.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.params.id !== nextProps.params.id) {
      this.props.setTheMovie(nextProps.params.id);
      this.props.fetchMovie(nextProps.params.id);
    }
  }
  render() {
    const { movie, loading, movieForeverAlone, handleToggle, params, handleSetActive, active } = this.props;
    const reposListProps = {
      loading,
      movieForeverAlone,
      movie,
      handleToggle,
      params,
      handleSetActive,
      active,
    };
    return (
      <article>
        <Helmet title="Home Page" meta={[{ name: 'description', content: 'A React.js Boilerplate application homepage' }, ]} />
        <div>
          <Section>
            <BigWrapper>
              <Grid>
                <TheMovie {...reposListProps} />
              </Grid>
            </BigWrapper>
            <Divider horizontal>
              <H2>Recommended</H2>
            </Divider>
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
    fetchMovie: (id) => {
      dispatch(fetchMovie(id));
    },
    setTheMovie: (id) => {
      dispatch(setMovie(id));
    },
    handleToggle: (id, active) => {
      dispatch(toggle(id, active));
    },
    handleSetActive: (active) => {
      dispatch(setActive(active));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  movieForeverAlone: makeSelectMovie(),
  movie: makeSelectMovieQ(),
  loading: makeSelectLoading(),
  active: makeSelectActive(),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
