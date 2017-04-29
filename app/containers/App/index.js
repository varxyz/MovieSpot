import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';

import { connect } from 'react-redux';
import { authActions, getAuth } from '../auth';

const AppWrapper = styled.div`
  max-width: calc(1190px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export function App({ children, signOut }) {
  return (
    <div>
      <Header
        signOut={signOut}
      />
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        {React.Children.toArray(children)}
        {/* <Footer />*/}
      </AppWrapper>
    </div>
  );
}
// const mapStateToProps = getAuth;

const mapDispatchToProps = {
  signOut: authActions.signOut,
};


App.propTypes = {
  children: React.PropTypes.node,
  signOut: React.PropTypes.func,
};

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(App);
// export default withProgressBar(App);
