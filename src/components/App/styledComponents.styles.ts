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
      }
    }
    width: ${props => {
      if(props.contents === 'details') {
        return '100%;'
      }
    }
  }
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
    } else {
      return '92vh;'
    }
  }};
  @media (max-width: 750px) {
    flex-direction: ${props => {
      if(props.contents === 'other') {
        return 'column;'
        }
      }
    }
    z-index: ${props => {
      if(props.contents === 'details') {
        return '10;'
        }
      }
    }
    transition: ${props => {
      if(props.contents === 'details') {
        return 'all .3s ease-Out;'
        }
      }
    }
    position: ${props => {
      if(props.contents === 'details') {
        return 'absolute;'
        }
      }
    }
    opacity: ${props => {
      if(props.contents === 'details') {
        return '40%;'
        }
      }
    }
    border: ${props => {
      if(props.contents === 'details') {
        return 'none;'
        }
      }
    }
  }
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
    } else if(props.contents === 'empty' || 'list') {
      return '43em;'
    } else {
      return '75%;'
    }
  }};
  margin: ${props => {
    if(props.contents === 'wedding') {
      return '1%;'
    } else {
      return '8%;'
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
  @media (max-width: 1000px) {
    width: ${props => {
      if(props.contents === 'list') {
        return '75%;'
      } else {
        return '90%;'
      }
    }}
    height: ${props => {
      if(props.contents === 'list') {
        return '75%;'
      } else {
        return '80%;'
      }
    }}
  }
  @media (max-width: 750px) {
    width: 90%;
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
