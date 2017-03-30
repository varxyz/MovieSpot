import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';

import messages from './messages';
import { changeSearchQuery } from '../../containers/HomePage/actions';
import { loadRepos, loadPopular } from '../../containers/App/actions';
import { makeSelectRepos, makeSelectIsLoading } from '../../containers/App/selectors';

import { makeSelectQueryname } from '../../containers/HomePage/selectors';

import { Button, Icon, Modal, Search, Grid, Input, Menu } from 'semantic-ui-react';


class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { isLoading2: false, value2: '', results2: [] };
  }

  resetComponent = () => this.setState({ isLoading2: false, results2: [], value2: '' })
  handleSearchChange = (e) => {
    this.setState({ isLoading2: true, value2: e.target.value });
    this.props.assignQuery(this.state.value2);
    setTimeout(() => {
      if (this.state.value2.length > 0) {
      this.props.search();

        // console.log(this.props.search)
      }
      else  if (this.state.value2.length === 0) return this.resetComponent()

    }, 700);
  }
  render() {
    const { queryname, searchResults, isLoading } = this.props;
    const results = () => {
      if (searchResults !== false) {
        return searchResults.results.map((item, id) => ({
          key: id,
          title: item.original_title || item.name,
          image: `https://image.tmdb.org/t/p/w185/${item.poster_path || item.profile_path || ''}`,
          // description: imdb.Plot,
          price: 'Not enough votes',
          ...item,
        }));
      }
    };
    return (
      <div>
        <Menu style={{ justifyContent: 'center' }}>
          <Menu.Item header>MovieSpot</Menu.Item>
          <Menu.Item style={{ width: '40em' }}>
            <Search
              value={this.state.value2}
              results={results()}
              loading={this.state.isLoading2}
              onResultSelect={this.props.handleResultSelect}
              onSearchChange={this.handleSearchChange}
            />
          </Menu.Item>
          <Menu.Item name="aboutUs" onClick={this.handleItemClick} />
          <Menu.Item >
            <Button
              basic
              color="red"
              size="mini"
              content="Watchlist"
              icon="favorite"
              label={{ basic: true, color: 'red', pointing: 'left', content: '2,048' }}
            />
          </Menu.Item>
          <Menu.Item >
            <Button size="mini">Log-in</Button>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    assignQuery: (evt) => (
      dispatch(changeSearchQuery(evt))
    ),
    search: () => {
      // dispatch(changeSearchQuery()),
      // setTimeout(() => {
        dispatch(loadRepos());
      // }, 500);
    },
    // onSubmitForm: (evt) => {
    //   if (evt !== undefined && evt.preventDefault) evt.preventDefault();
    //   dispatch(loadRepos());
    // },
    // loadMainPopular: () => {
    //   dispatch(loadPopular());
    // },
  };
}

const mapStateToProps = createStructuredSelector({
  queryname: makeSelectQueryname(),
  searchResults: makeSelectRepos(),
  isLoading: makeSelectIsLoading(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Header);
