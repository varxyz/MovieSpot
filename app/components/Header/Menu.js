import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';


const StyledMenu = styled(Menu)`
  .item:before {
    content: initial !important;
  }
`;

export default StyledMenu;
