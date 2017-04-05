import styled from 'styled-components';
import { Menu } from 'semantic-ui-react';


const StyledMenu = styled(Menu)`
  .item:before {
    content: initial !important;
  }

    width: 100%;
    padding-top: 14px;
    margin-bottom: 10px !important;
`;

export default StyledMenu;
