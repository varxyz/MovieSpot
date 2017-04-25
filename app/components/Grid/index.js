import styled from 'styled-components';
import { Grid } from 'semantic-ui-react';

export const Column = styled(Grid.Column)`
  &:first-child {
    margin-left:-1px
  }
  padding: 0.3rem !important;
`;

export const GridRow = styled(Grid.Row)`
  padding: 1.2em !important;
  margin: 0 !important;
`;
