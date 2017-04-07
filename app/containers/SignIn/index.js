import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { authActions } from '../auth';
import { Button, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup, } from 'semantic-ui-react';


const SignInPage = ({signInWithGithub, signInWithGoogle, signInWithTwitter, signInWithFacebook}) => {
  return (
    <Grid padded
      middle
      aligned
      centered
      columns={ 2 }>
      <Grid.Column style={ { margin: '23%' } }>
        <h1>SignIn using:</h1>
        <Icon link
          size='massive'
          name='github'
          className="sign-in__button"
          onClick={ signInWithGithub }></Icon>
        <Icon link
          color='red'
          size='massive'
          name='google'
          className="sign-in__Icon"
          onClick={ signInWithGoogle }></Icon>
        <Icon link
          color='blue'
          size='massive'
          name='facebook official'
          className="sign-in__Icon"
          onClick={ signInWithFacebook }></Icon>
      </Grid.Column>
    </Grid>
    );
};

SignInPage.propTypes = {
  signInWithGithub: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithTwitter: PropTypes.func.isRequired,
  signInWithFacebook: PropTypes.func.isRequired,
};


//=====================================
//  CONNECT
//-------------------------------------

const mapDispatchToProps = {
  signInWithGithub: authActions.signInWithGithub,
  signInWithGoogle: authActions.signInWithGoogle,
  signInWithTwitter: authActions.signInWithTwitter,
  signInWithFacebook: authActions.signInWithFacebook,
};

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
