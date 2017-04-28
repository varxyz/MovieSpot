import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Divider, Grid } from 'semantic-ui-react';
import H2 from 'components/H2';
import { makeSelectPeople, makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectPopular } from 'containers/App/selectors';
import PopularList from 'components/PopularList';
import PopularPeople from 'components/PopularPeople';
import Section from './Section';
import { loadPopular } from '../App/actions';
import Wrapper from './Wrapper';

export class HomePage extends React.PureComponent {
// eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.loadMainPopular();
  }
  render() {
    const { loading, error, repos, popular, people } = this.props;
    const listProps = {
      loading,
      error,
      repos,
      popular,
      people,
    };
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'MovieSpot homepage' },
          ]}
        />
        <div>
          <Section>
            <Divider horizontal><H2>Popular</H2></Divider>
            <Wrapper>
              <Grid>
                <PopularList {...listProps} />
              </Grid>
            </Wrapper>
            <Divider horizontal><H2>Trending Names</H2></Divider>
            <Wrapper>
              <Grid>
                <PopularPeople {...listProps} />
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
  loadMainPopular: React.PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    loadMainPopular: () => {
      dispatch(loadPopular());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  popular: makeSelectPopular(),
  people: makeSelectPeople(),
  searchResults: makeSelectRepos(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
