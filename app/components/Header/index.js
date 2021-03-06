import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, browserHistory } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import debounce from 'lodash.debounce';

import { loadRepos, changeSearchQuery } from 'containers/App/actions';
import { makeSelectRepos, makeSelectQueryname, makeSelectAuth } from 'containers/App/selectors';
import NavItemm, { NavItemSmall } from './NavItemm';
import StyledSearch from '../Search';
import Noposter from './noPoster';

class Header extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isLoading2: false,
      value2: '',
      results2: [],
    };
  }
  componentDidMount() {
    this.resetComponent();
  }
  resetComponent = () => this.setState({
    isLoading2: false,
    results2: [],
  });

  handleSelected = (e, result) => {
    if (result.mediaType === 'person') {
      browserHistory.push(`/name/${result.key}`);
    }
    if (result.mediaType === 'movie') {
      browserHistory.push(`/movie/${result.key}`);
    }
  };

  handleSearchChange = (e) => {
    this.setState({
      isLoading2: true,
      value2: e.target.value,
    }, debounce(() => {
      this.props.assignQuery(this.state.value2);
      if (this.state.value2.length > 0) this.props.search();
      setTimeout(() => {
        if (this.props.searchResults && this.props.searchResults.results.length > 0) {
          const results = this.props.searchResults.results
          .filter((item) => item.media_type === 'movie' || 'person')
          .map((item) => ({
            key: item.id,
            mediaType: item.media_type,
            title: item.original_title || item.name,
            image: item.poster_path || item.profile_path
              ? `https://image.tmdb.org/t/p/w185/${item.poster_path || item.profile_path}`
              : <Noposter />,
            price: item.vote_average || <Icon name="minus" />,
            description: item.release_date
              ? item.release_date.slice(0, 4)
              : '',
          }))
          .slice(0, 10);
          this.setState({
            isLoading2: false,
            results2: results,
          });
        } else if (this.props.searchResults.results.length === 0) this.resetComponent();
      }, 300);
    }, 500));
  };
  render() {
    return (
      <Navbar style={{ backgroundColor: '#fff', marginBottom: '0' }}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link style={{ padding: '1.2em' }} to="/">
              { ' ' }MovieSpot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItemm eventKey={2}>
              <StyledSearch
                style={{ textAlign: 'center' }}
                fluid
                placeholder="Search movies and names..."
                value={this.state.value2}
                results={this.state.results2}
                loading={this.state.isLoading2}
                onResultSelect={this.handleSelected}
                onSearchChange={this.handleSearchChange}
              />
            </NavItemm>
          </Nav>
          <Nav pullRight>
            <NavItemSmall className="trololo" componentClass="span">
              { this.props.authenticated.authenticated
                ?
                  <Button.Group>
                    <Link to="/watchlist">
                      <Button basic>
                    Watchlist
                  </Button>
                    </Link>
                    <Button onClick={this.props.signOut} basic>
                    Sign Out
                  </Button>
                  </Button.Group>
                : <Navbar.Text>
                  <Link to="/signin">
                    <Button basic>
                      Sign In
                    </Button>
                  </Link>
                </Navbar.Text> }
            </NavItemSmall>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  assignQuery: PropTypes.func,
  search: PropTypes.func,
  searchResults: PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.array,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    assignQuery: (evt) => dispatch(changeSearchQuery(evt)),
    search: () => {
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  queryname: makeSelectQueryname(),
  searchResults: makeSelectRepos(),
  authenticated: makeSelectAuth(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
