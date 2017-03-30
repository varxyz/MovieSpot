/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import H2 from 'components/H2';
import { makeSelectPeople, makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectPopular } from 'containers/App/selectors';
import PopularList from 'components/ReposList';
import PopularPeople from 'components/PopularPeople';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, loadPopular, loadNames } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react'
import Wrapper from './Wrapper';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.loadMainPopular();
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos, popular, people } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
      people,
      popular,
    };

    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
          </CenteredSection>
          <Section>
            <Form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.trymeMessage} />
                <AtPrefix>
                  <FormattedMessage {...messages.trymeAtPrefix} />
                </AtPrefix>
                <Input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </Form>
            <Divider className='divider-main' horizontal><H2>Popular</H2></Divider>
            <Wrapper>
              <Grid>
                <PopularList {...reposListProps} />
              </Grid>
            </Wrapper>
            <Divider className='divider-main' horizontal><H2>Trending Names</H2></Divider>
            <Wrapper>
              <Grid>
                <PopularPeople {...reposListProps} />
              </Grid>
            </Wrapper>
          </Section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  popular: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  people: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  loadMainPopular: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    loadMainPopular: () => {
      dispatch(loadPopular());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  popular: makeSelectPopular(),
  people: makeSelectPeople(),
  searchResults: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
