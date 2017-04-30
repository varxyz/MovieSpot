import React from 'react';
import { Icon } from 'semantic-ui-react';
import Wrapper from './Wrapper';

function Footer() {
  return (
    <Wrapper>
      <section>
        <div>TechStack: React, Redux, ImmutableJS, ReduxSaga, Firebase, Reselect. © MIT</div>
      </section>
      <section>
        <div>Made by <a href=""><Icon color="black" name="github" />varxyz</a></div>
      </section>
    </Wrapper>
  );
}

export default Footer;
