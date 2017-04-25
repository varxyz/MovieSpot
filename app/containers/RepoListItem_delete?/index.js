/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectCurrentUser } from 'containers/App/selectors';
import ListItem from 'components/ListItem';
import IssueIcon from './IssueIcon';
import IssueLink from './IssueLink';
import RepoLink from './RepoLink';
import Wrapper from './Wrapper';

import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react';

export class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const item = this.props.item;
    const nameprefix = '';
    // console.log(item);
    // If the repository is owned by a different person than we got the data for
    // it's a fork and we should show the name of the owner
    // if (item.owner.login !== this.props.currentUser) {
    //   nameprefix = `${item.owner.login}/`;
    // }
    // Put together the content of the repository
    const content = (
      <Wrapper>
        <Grid.Column className="main-poster">
          <Label as="a" color="green" ribbon>
            <Icon name="star" />
            { item.votes }
          </Label>
          <Card className="pt-card pt-interactive pt-elevation-1" image={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} />
          <Button primary>
          Primary
        </Button>
        </Grid.Column>
      </Wrapper>
    );

    // Render the content into a list item
    return (
      <ListItem item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: React.PropTypes.string,
  currentUser: React.PropTypes.string,
};

export default connect(createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
}))(RepoListItem);
