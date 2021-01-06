import styled from 'styled-components';

export const StyledButton = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 40px;
  width: 150px;
  border: 2px solid #6f896d;
  margin: 20px 20px 20px 20px;
  color: #6f896d;
  text-transform: uppercase;
  font-size: .8em;
  font-weight: 500;
  letter-spacing: 1.5px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  .link {
    font-weight: 500;
    color: #6f896d;
    position: relative;
    transition: all .45s ease-Out;
    text-decoration: none;
  }
  &:hover #translate {
    left: 0;
  }
  &:hover .link {
    color: #f5f5f5;
  }
  #translate {
    transform: rotate(50deg);
    width: 100%;
    height: 250%;
    left: -200px;
    top: -30px;
    background: #6f896d;
    position: absolute;
    transition: all .3s ease-Out;
  }
`
