import styled from 'styled-components';

type StyledCardProps = {
  contents: string
}
type DetailsProps = {
  contents: string
}


export const DetailsWrapper = styled.section<DetailsProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 92%;
  @media (max-width: 750px) {
    z-index: ${props => {
      if(props.contents === 'details') {
        return '10;'
      }
    }};
    width: ${props => {
      if(props.contents === 'details') {
        return '100%;'
      }
    }};
    height: ${props => {
      if(props.contents === 'shoot') {
        return '90vh;'
      }
    }};
    margin-top: ${props => {
      if(props.contents === 'shoot') {
        return '1%;'
      }
    }};
  }
`
export const DetailsFormWrapper = styled.section<DetailsProps>`
  transition: all .5s ease-Out;
  display: flex;
  width: 100%;
  overflow: scroll;
  height: ${props => {
    if(props.contents === 'other') {
      return '92vh;'
    } else if (props.contents === 'shoot') {
      return '87vh;'
    } else {
      return '92%;'
    }
  }};
  @media (max-width: 750px) {
    flex-direction: ${props => {
      if(props.contents === 'other') {
        return 'column;'
      }
    }};
    height: ${props => {
      if(props.contents === 'shoot') {
        return '100%;'
      }
    }};
    transition: ${props => {
      if(props.contents === 'details') {
        return 'all .3s ease-Out;'
      }
    }};
    position: ${props => {
      if(props.contents === 'details') {
        return 'absolute;'
      }
    }};
    opacity: ${props => {
      if(props.contents === 'details') {
        return '40%;'
      }
    }};
    border: ${props => {
      if(props.contents === 'details') {
        return 'none;'
      }
    }};
    justify-content: ${props => {
      if(props.contents ==='shoot') {
        return 'center;'
      }
    }}
  };
`

export const StyledCard = styled.section<StyledCardProps>`
  transition: all .5s ease-Out;
  background-color: #ffffff;
  display: ${props => {
    if(props.contents === 'empty'){
      return 'grid;'
    } else {
      return 'flex;'
    }
  }};
  justify-content: ${props => {
    if(props.contents === 'shoot') {
      return 'center;'
    }
  }};
  flex-direction: column;
  width: ${props => {
    if(props.contents === 'wedding') {
      return '30%;'
    } else {
      return '75%;'
    }
  }};
  height: ${props => {
    if(props.contents === 'wedding') {
      return '40em;'
    } else if(props.contents === 'empty') {
      return '43em;'
    } else if(props.contents === 'fullPage') {
      return '43em;'
    } else if(props.contents === 'list') {
      return '50em;'
    } else if(props.contents === 'other'){
      return '65%;'
    } else if(props.contents === 'shoot') {
      return '50%;'
    }
  }};
  margin: ${props => {
    if(props.contents === 'wedding') {
      return '1%;'
    } else if(props.contents === 'list') {
      return '3%;'
    } else if(props.contents === 'fullPage') {
      return '2%;'
    } else if (props.contents === 'other') {
      return '2%;'
    } else if(props.contents === 'shoot') {
      return '2%;'
    }
  }};
  border-radius: 30px;
  box-shadow: 1px 1px 20px #A8826F;
  font-size: 12px;
  align-self: center;
  overflow: ${props => {
    if(props.contents === 'list') {
      return 'scroll;'
    } else {
      return 'hidden;'
    }
  }};
  align-items: ${props => {
    if(props.contents === 'wedding') {
      return 'stretch;'
    } else {
      return 'center;'
    }
  }};
  justify-items: ${props => {
    if(props.contents === 'list') {
      return 'flex-start;'
    } else {
      return 'center;'
    }
  }};
  padding-top: ${props => {
    if(props.contents === 'wedding') {
      return '0px;'
    } else {
      return '30px;'
    }
  }};
  padding-bottom: ${props => {
    if(props.contents === 'wedding') {
      return '0px;'
    } else {
      return '30px;'
    }
  }};
  &:hover {
    box-shadow: ${props => {
      if (props.contents === 'wedding') {
        return '1px 1px 20px inset #A8826F;'
      } else {
        return '1px 1px 20px #A8826F;'
      }
    }};
  }
  @media (min-width: 1500px) {
    width: ${props => {
      if(props.contents === 'wedding') {
        return '23%;'
      }
    }};
  }
  @media (max-width: 1000px) {
    width: ${props => {
      if(props.contents === 'list') {
        return '75%;'
      } else if(props.contents === 'wedding') {
        return '45%;'
      } else {
        return '90%;'
      }
    }};
    height: ${props => {
      if(props.contents === 'list') {
        return '75%;'
      } else if(props.contents === 'fullPage') {
        return '25%;'
      } else {
        return '80%;'
      }
    }};
  }
  @media (max-width: 750px) {
    width: 90%;
  }
`
export const PhotoCard = styled.article<DetailsProps>`
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  margin-bottom: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
  border-bottom: 1px solid #A8826F;
  overflow: ${props => {
    if(props.contents === 'shoot') {
      return 'scroll;'
    }
  }};
  justify-content: ${props => {
    if(props.contents === 'shoot') {
      return 'center;'
    } else {
      return 'space-between;'
    }
  }};
  height: ${props => {
    if(props.contents === 'shoot') {
      return '75%;'
    }
  }};
  .photoHeader {
    font-weight: 800;
    font-size: ${props => {
      if(props.contents === 'shoot') {
        return '50px;'
      }
    }};
    margin: ${props => {
      if(props.contents === 'shoot') {
        return '5%;'
      }
    }};
  }
  .photoDescription {
    font-style: italic;
    font-size: ${props => {
      if(props.contents === 'shoot') {
        return '35px;'
      }
    }};
  }
  .guestData {
    font-size: ${props => {
      if(props.contents === 'shoot') {
        return '30px;'
      }
    }};
    margin-bottom: ${props => {
      if(props.contents === 'shoot') {
        return '5%;'
      }
    }};
  }
  @media (max-width: 750px) {
    justify-content: ${props => {
      if(props.contents === 'shoot') {
        return 'space-between;'
      }
    }};
    height: ${props => {
      if(props.contents === 'shoot') {
        return '90%;'
      }
    }};
  }
`
export const StyledButton = styled.div`
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 40px;
  width: 150px;
  border: 2px solid #6f896d;
  margin: 10px;
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
export const BackButton = styled.div`
  background-color: #6f896d;
  font-family: 'Roboto', sans-serif;
  display: inline-flex;
  height: 25px;
  width: 100px;
  margin: 10px;
  border: 2px solid #6f896d;
  color: #f5f5f5;
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
    color: #f5f5f5;
    position: relative;
    transition: all .35s ease-Out;
    text-decoration: none;
    left: 0;
  }
  &:hover #arrow {
    left: 0;
  }
  &:hover .link {
    left: 150px;
  }
  #arrow {
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    color: #6f896d;
    width: 100%;
    height: 100%;
    font-size: 2em;
    background: #f5f5f5;
    left: -200px;
    position: absolute;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .35s ease-Out;
    bottom: 0;
  }
`
