/*
 * NamePage
 *
 * List all the features
 */
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import Section from '../HomePage/Section';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Divider from 'components/Divider';

import H1 from 'components/H1';
import H2 from 'components/H2';
import {
  Button,
  Segment,
  Dimmer,
  Loader,
  Card,
  Icon,
  Image,
  Item,
  Label,
  Grid,
  Popup,
} from 'semantic-ui-react';
import { SmallWrapper, BigWrapper } from '../MoviePage/Wrapper';
import { setName, fetchName } from './actions';
import { makeSelectMovie, makeSelectName } from './selectors';
import { makeSelectLoading, makeSelectNameQ } from '../App/selectors';
import Person from 'components/Person';
import KnownFor from 'components/KnownFor';

export class NamePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setTheName(this.props.params.id);
    this.props.setFetchName(this.props.params.id);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.movie) {
  //     this.props.setTheMovie(nextProps.params.id);
  //     this.props.fetchMovie(nextProps.params.id);
  //   }
  // }
  render() {
    const { name, loading } = this.props;
    const nameProps = {
      loading,
      name,
    };
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            {
              name: 'description',
              content: 'A React.js Boilerplate application homepage',
            },
          ]}
        />
        <div>
          <Section>
            <BigWrapper>
              <Grid>
                <Person {...nameProps} />
              </Grid>
            </BigWrapper>
            <Divider horizontal><H2>Known For</H2></Divider>
            <SmallWrapper>
              <Grid>
                <KnownFor {...nameProps} />
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
    setTheName: id => {
      dispatch(setName(id))
    },
    setFetchName: id => {
      dispatch(fetchName(id));
    },
  };
}

const mapStateToProps = createStructuredSelector({
//   movieForeverAlone: makeSelectMovie(),
  name: makeSelectNameQ(),
  loading: makeSelectLoading(),
  nameOne: makeSelectName(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NamePage);
// export default NamePage;
