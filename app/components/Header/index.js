import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import debounce from 'lodash.debounce';
import { Link, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import NavItemm from './NavItemm'

import A from './A';
import Img from './Img';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import StyledSearch from '../Search';
import Noposter from './noPoster';


import messages from './messages';
import { changeSearchQuery } from '../../containers/App/actions';
import { loadRepos, loadPopular } from '../../containers/App/actions';
import { makeSelectRepos, makeSelectQueryname } from '../../containers/App/selectors';


import { Button, Icon, Modal, Search, Grid, Label, Menu } from 'semantic-ui-react';
import StyledMenu from './Menu';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
  })

  handleSelected = (e, result) => {
    if (result.mediaType === 'person') browserHistory.push(`/name/${result.key}`);
    if (result.mediaType === 'movie') browserHistory.push(`/movie/${result.key}`);
  }

  handleSearchChange = (e) => {
    const res = this.props.searchResults.results;
    this.setState({
      isLoading2: true,
      value2: e.target.value,
    });
    this.props.assignQuery(e.target.value);
    setTimeout(() => {
      if (this.state.value2.length > 0) {
        this.props.search();
      } else if (this.props.searchResults.total_results < 1) return this.resetComponent();
    }, 20);
    setTimeout(() => {
      if (this.props.searchResults.results && this.props.searchResults.results.length > 0) {
        console.log('plus');
        const results = this.props.searchResults.results.filter((item) => item.media_type === 'movie' || 'person').map((item) => ({
          key: item.id,
          mediaType: item.media_type,
          title: item.original_title || item.name,
          image: item.poster_path || item.profile_path ? `https://image.tmdb.org/t/p/w185/${item.poster_path || item.profile_path}` : <Noposter />,
          price: item.vote_average || <Icon name="minus" />,
          description: item.release_date ? item.release_date.slice(0, 4) : '',
        })).slice(0, 10);
        this.setState({
          isLoading2: false,
          results2: results,
        });
      } else {
        console.log('minus');
        return this.resetComponent();
      }
    }, 300);
  }
  render() {
    // const { queryname, searchResults, isLoading } = this.props;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link style={{ color: '#474747' }} activeStyle={{ color: '#000' }} to="/"> MovieSpot
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} >
            Alo
          </NavItem>
        </Nav>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} >
              <Link style={{ color: '#333' }} activeStyle={{ color: '#000' }} to="/movie/334543"> Watchlist
              </Link>
            </NavItem>
            <NavItemm eventKey={2}>
              <StyledSearch
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
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}> Action
              </MenuItem>
              <MenuItem eventKey={3.2}> Another action
              </MenuItem>
              <MenuItem eventKey={3.3}> Something else here
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}> Separated link
              </MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
              Link Right
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    assignQuery: (evt) => (
    dispatch(changeSearchQuery(evt))
    ),
    search: () => {
      dispatch(loadRepos());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  queryname: makeSelectQueryname(),
  searchResults: makeSelectRepos(),
// isLoading: makeSelectIsLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Header);
