import { NavItem as NavItemCustom } from 'react-bootstrap';
import styled from 'styled-components';


const NavItem = styled(NavItemCustom)`
  a {
    padding: 0;
  }
`;
export const NavItemSmall = styled(NavItemCustom)`
    padding: 1em;
`;
export default NavItem;
