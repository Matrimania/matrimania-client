import React, { useState } from 'react';
import { StyledButton } from '../App/styledComponents.styles';
import Guest from '../Guest/Guest';
import './GuestList.css'
import empty from '../../assets/emptyGuestList.png'
import { StyledButton, StyledCard } from '../App/styledComponents.styles'


type NewGuest = {
  id: number,
  guestName: string,
  phoneNumber: string;
}

const GuestList: React.FC = () => {
<<<<<<< HEAD

<<<<<<< HEAD
  const [guestName, setGuestName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState(0)
  const [guests, setGuests] = useState<NewGuest[]>([])
=======
  const organizePhoneInput = () => {
    for(let i = 0; i <= 9; i++) {
      filter.push(i + keypadZero)
      filter.push(i + numpadZero)
    }
=======
  
  const [guestName, setGuestName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [guests, setGuests] = useState<NewGuest[]>([]);
<<<<<<< HEAD
  let filter: any = [];
  const keypadZero: number = 48;
  const numpadZero: number = 96;

  // const organizePhoneInput = (event: any) => {
  //   for(let i = 0; i <= 9; i++) {
  //     filter.push(i + keypadZero)
  //     filter.push(i + numpadZero)
  //   }
>>>>>>> 170ecbde... Add dashes to phoneNumber input. bug missing last two numbers

  //   filter.push(8); 
  //   filter.push(9);
  //   filter.push(46);
  //   filter.push(37);
  //   filter.push(39);
  //   onKeyDown(event)
  // }

  // const onKeyDown = (event: any) => {
  //   console.log('down')
  //   if(filter.indexOf(event.keyCode) < 0) {
  //     return false
  //   }
  //   onKeyUp()
  // }
=======
>>>>>>> f0b0b63b... Clean up unwanted comments

  const checkNumber = (value: string) => {
    value = value.trim().replaceAll( "-", "")
    var reg = /^\d+$/;
    if (reg.test(value)) {
      formatPhoneText(value)
    } else {
      console.log('type error')
      //error handling. have specific error message
      // alert? (not favorite idea)
      // have div pop up?
    }
    //error handling/bug with input leaving first digit when user uses backspace to correct phone number
  } 

  const formatPhoneText = (value: string) => {
    if (value.length > 3 && value.length <= 6) {
      value = value.slice(0,3) + "-" + value.slice(3);
    } else if(value.length > 6) {
      value = value.slice(0,3) + "-" + value.slice(3,6) + "-" + value.slice(6);
    } else if(value.length === 0) {
      console.log('need number')
    }
    setPhoneNumber(value)
  }

<<<<<<< HEAD

<<<<<<< HEAD
  const onKeyUp = (event) => {
    let input = event.target;
    let formatted = formatPhoneText(input.value)
    let isError = (validatePhone(formatted) || formatted.length === 0)
    let color = (isError) ? "gray" : "red";
    let borderWidth = (isError) ? "1px" : "3px";
    input.style.borderColor = color;
    input.style.borderWidth = borderWidth;
    input.value = formatted;
  }
  
>>>>>>> 542d4a89... Create validatePhone function
=======
  // const validatePhone = (p: string) => {
  //   let phoneRE = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
  //   let digits = p.replace(/\D/g, "");
  //   console.log(phoneRE.test(digits))
  //   return phoneRE.test(digits)
  // }
>>>>>>> 170ecbde... Add dashes to phoneNumber input. bug missing last two numbers

  // const onKeyUp = () => {
  //   console.log("up")
  //   let input = phoneNumber.toString();
  //   let formatted = formatPhoneText(input)
  //   let isError = (validatePhone(formatted) || formatted.length === 0)
  //   let color = (isError) ? "gray" : "red";
  //   let borderWidth = (isError) ? "1px" : "3px";
  //   input.style.borderColor = color;
  //   input.style.borderWidth = borderWidth;
  //   setPhoneNumber(formatted);
  // }

  
=======
>>>>>>> f0b0b63b... Clean up unwanted comments
  const submitGuest = (event: React.FormEvent) => {
    event.preventDefault();
    const newGuest: NewGuest = {
      id: Date.now(),
      guestName,
      phoneNumber
    }
    if (guestName !== "" && phoneNumber !== "") {
      setGuests([...guests, newGuest])
      clearInputs();
    } else {
      console.log('need input')
    }
    // should be a POST request + adding card to UI
  }

  const clearInputs = () => {
    setGuestName('')
    setPhoneNumber('')
  }

  const deleteGuest = (id: number) => {
    const filteredGuestList = guests.filter(guest => guest.id !== id)
    setGuests (filteredGuestList)
  }

	return (
    <>
      <form className="formWrapper">
        <article className="instructionWrap">
          <h1 className="weddingTitle"style={{fontSize: '3vw'}}>Let's start with your guest list</h1>
          <h2 className="weddingDate" style={{fontSize: '1.5vw', padding: '2% 10%', textAlign: 'left'}}>For each person included in your family photos, please include: <br></br><br></br>1. Their first and last name<br></br>2. A mobile phone number that accepts text messages<br></br> <br></br>Don't forget yourselves!</h2>
        </article>
        <input
          type='text'
          placeholder='Guest Name'
          name='guestName'
          value={guestName}
          onChange={event => setGuestName(event.target.value)}
        />
        <input
<<<<<<< HEAD
          type='tel'
          placeholder='Phone Number'
=======
          type='text'
<<<<<<< HEAD
          placeholder='Phone Number (XXX-XXX-XXXX)'
>>>>>>> 170ecbde... Add dashes to phoneNumber input. bug missing last two numbers
=======
          placeholder='Phone Number XXX-XXX-XXXX'
>>>>>>> 603f1687... Code cleanup
          name='phoneNumber'
          maxLength={12}
          value={phoneNumber}
          onChange={event => checkNumber(event.target.value)}
        />
        <StyledButton>
          <div id="translate"></div>
          <a className="link" id="addListButton" onClick={event => submitGuest(event)}>Add To Guest List</a>
        </StyledButton>
      </form>
      <h2 className="weddingName" style={{fontSize: '1.75em', paddingLeft: '3%', paddingBottom: '2%', width: '40%', textAlign: 'center', opacity: '80%'}}>- Your Guest List -</h2>
      <section className="guestCards">
        {guests.length > 0 && guests.map(guest => (<Guest
          guestName={guest.guestName}
          id={guest.id}
          phoneNumber={guest.phoneNumber}
          key={guest.id}
          deleteGuest={deleteGuest}>
          </Guest>))}
        </StyledCard>
      </section>
    </>
	)
}

export default GuestList;
