import styled from 'styled-components';

const Noposter = styled.div`
    width: 28px;
    height: 45px;
    display: inline-block;
    text-align: center;
    background-color: #dbdbdb;
    color: #b5b5b5;
    box-sizing: border-box;
    font-size: 1em;

  &::before {
    content: "▣";
    line-height: 40px;
    font-size: 12px;
    color: #777;
    font-weight: 900;
  }
`;

export default Noposter;
