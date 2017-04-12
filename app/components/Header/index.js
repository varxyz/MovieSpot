import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, browserHistory } from 'react-router';
import { Navbar, Nav } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';

import { loadRepos, changeSearchQuery } from 'containers/App/actions';
import { makeSelectRepos, makeSelectQueryname, makeSelectAuth } from 'containers/App/selectors';
import NavItemm from './NavItemm';
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
    value2: '',
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
    });
    this.props.assignQuery(e.target.value);
    setTimeout(
      () => {
        if (this.state.value2.length > 0) {
          this.props.search();
        }
      },
      20
    );
    setTimeout(
      () => {
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
        } else {
          return this.resetComponent();
        }
      },
      300
    );
  };
  render() {
    return (
      <Navbar style={{ backgroundColor: '#fff', marginBottom: '0' }}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link style={{ padding: '1em' }} to="/">
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
                className="alo"
                placeholder="Search movies and names..."
                value={this.props.queryname || ''}
                results={this.state.results2}
                loading={this.state.isLoading2}
                onResultSelect={this.handleSelected}
                onSearchChange={this.handleSearchChange}
              />
            </NavItemm>
          </Nav>
          <Nav pullRight style={{ padding: '0.8em', textAlign: 'center' }}>
            { this.props.authenticated.authenticated
              ?
                <Navbar.Text eventKey={1}>
                  <Button.Group >
                    <Link to="/watchlist">
                      <Button basic>
                        Watchlist
                      </Button>
                    </Link>
                    <Button onClick={this.props.signOut} basic>
                  Sign Out
                </Button>
                  </Button.Group>
                </Navbar.Text>
              : <Navbar.Text style={{ textAlign: 'center' }}>
                <Link to="/signin">
                  <Button basic>
                    Sign In
                  </Button>
                </Link>
              </Navbar.Text> }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
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
