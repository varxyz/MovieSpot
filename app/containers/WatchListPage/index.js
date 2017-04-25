import React from 'react';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { loadWatch, fetchMovieDb } from 'containers/App/actions';
import Favorites from 'components/WatchListItem';
import { BigWrapper } from '../MoviePage/Wrapper';
import { makeSelectLoading, makeSelectAuth, makeSelectFavs, makeSelectDbFavs } from '../App/selectors';
import Section from '../HomePage/Section';

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
