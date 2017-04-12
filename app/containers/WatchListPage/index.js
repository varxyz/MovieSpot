/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import Section from '../HomePage/Section';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from 'components/Divider';
import { Link } from 'react-router';
import { loadWatch, fetchMovieDb } from 'containers/App/actions';

import LoadingIndicator from 'components/LoadingIndicator';
import ColumnFit from 'components/ColumnFit/';
import { fetchMovie } from '../MoviePage/actions';

import H1 from 'components/H1';
import H2 from 'components/H2';
import { Button, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react';
import { SmallWrapper, BigWrapper } from '../MoviePage/Wrapper';
// import { fetchMovie, setMovie, toggle } from './actions';
// import { makeSelectMovie } from './selectors';
import { makeSelectMovieQ, makeSelectLoading, makeSelectAuth, makeSelectFavs, makeSelectDbFavs } from '../App/selectors';
import TheMovie from 'components/TheMovie';
import Recommended from 'components/Recommended';
import Favorites from 'components/WatchListItem';

export class WatchList extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.fetchFav(this.props.auth.user.authUser.uid);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.favorites.length !== nextProps.dbmov.length) this.props.fetchMovieFav();
  }
  render() {
    const { loading, auth, dbmov } = this.props;
    const listProps = {
      loading,
      auth,
      dbmov,
    };
    return (
      <article>
        <Helmet title="Watchlist Page" meta={[{ name: 'description', content: 'A React.js Boilerplate application homepage' }, ]} />
        <div>
          <Section>
            <BigWrapper>
              <Grid>
                <Favorites {...listProps} />
              </Grid>
            </BigWrapper>
          </Section>
        </div>
      </article>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    fetchFav: (id) => {
      dispatch(loadWatch(id));
    },
    fetchMovieFav: () => {
      dispatch(fetchMovieDb());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth(),
  loading: makeSelectLoading(),
  favorites: makeSelectFavs(),
  dbmov: makeSelectDbFavs(),
});

export default connect(mapStateToProps, mapDispatchToProps)(WatchList);
