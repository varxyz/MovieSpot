import React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'components/A';
import LocaleToggle from 'containers/LocaleToggle';
import Wrapper from './Wrapper';
import messages from './messages';
import { Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <Wrapper>
      <section>
        <FormattedMessage {...messages.licenseMessage} />
      </section>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            love: <Icon name="heart" color="red" />,
            author: <A href="https://github.com/varxyz"><Icon color="black" name="github" />Sergey M</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
