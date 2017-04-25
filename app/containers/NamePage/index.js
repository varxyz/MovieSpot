import React from 'react';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import Divider from 'components/Divider';
import H2 from 'components/H2';
import Person from 'components/Person';
import KnownFor from 'components/KnownFor';
import { SmallWrapper, BigWrapper } from '../MoviePage/Wrapper';
import Section from '../HomePage/Section';
import { setName, fetchName } from './actions';
import { makeSelectName } from './selectors';
import { makeSelectLoading, makeSelectNameQ, makeSelectError } from '../App/selectors';

export class NamePage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.props.setTheName(this.props.params.id);
    this.props.setFetchName(this.props.params.id);
  }
  render() {
    const { name, loading, error } = this.props;
    const nameProps = {
      loading,
      error,
      name,
    };
    return (
      <article>
        <Helmet title="Home Page" meta={[{ name: 'description', content: 'A React.js Boilerplate application homepage' }]} />
        <div>
          <Section>
            <BigWrapper>
              <Grid>
                <Person {...nameProps} />
              </Grid>
            </BigWrapper>
            <Divider horizontal>
              <H2>
                Known For
              </H2>
            </Divider>
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
    setTheName: (id) => {
      dispatch(setName(id));
    },
    setFetchName: (id) => {
      dispatch(fetchName(id));
    },
  };
}

const mapStateToProps = createStructuredSelector({
  name: makeSelectNameQ(),
  loading: makeSelectLoading(),
  nameOne: makeSelectName(),
  error: makeSelectError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(NamePage);
