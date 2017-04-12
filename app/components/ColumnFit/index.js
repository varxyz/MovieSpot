import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

const Column = styled(Grid.Column)`
  &:first-child {
    margin-left:-1px
  }
`;

export default Column;
