import styled from 'styled-components';
import { Search } from 'semantic-ui-react';


const StyledSearch = styled(Search)`
  margin:auto;
  &:hover {
  }

  input {
    width:300px;
    border-radius:4px !important
  }
  .results .result {
    padding: .45714286em 0.74285714em !important;
  }
  .results .result .image {
    float: left !important;
    width: 2em !important;
    margin-right: 1em;
  }
  .results .result .image+.content {
    margin: 0 !important;
  }
`;

export default StyledSearch;
