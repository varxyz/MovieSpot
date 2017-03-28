import React from 'react';

import Ul from './Ul';
import Wrapper from './Wrapper';
import { Button, Divider, Segment, Dimmer, Loader, Card, Icon, Image, Item, Label, Grid, Popup } from 'semantic-ui-react'

function List(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);

  // If we have items, render them
  if (props.items) {
    content = props.items.map((item, index) => (
      
      <ComponentToRender key={`item-${index}`} item={item} />
     
    ));
  } else {
    // Otherwise render a single component
    content = (<ComponentToRender />);
  }

  return (
    <Wrapper>
        {content}
    </Wrapper>
  );
}

List.propTypes = {
  component: React.PropTypes.func.isRequired,
  items: React.PropTypes.object,
};

export default List;
