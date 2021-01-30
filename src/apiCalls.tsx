export const getWeddingInfo = (weddingId:number) => {
  return Promise.all([getWeddings(), getSingleWeddingGuests(weddingId), getSingleWeddingPhotos(weddingId)])
  .then(data => data)
  .catch(error => error)
}

export const getWeddings = () => {
  return fetch("http://matrimania-backend.herokuapp.com/api/v1/weddings/weddings/")
  .then(response => response.json())
  .catch(() => {
    return "No weddings found"
  })
}

export const postAWedding = (wedding: any) => {
  return fetch("http://matrimania-backend.herokuapp.com/api/v1/weddings/create/", {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wedding)
  })
  .then(response => response.json())
  .catch(() => {
    alert('Could not add wedding')
  })
};

export const postAPhoto = (photo:any) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/photos/?weddingId=${photo.weddingId}`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(photo)
  })
  .then(response => response.json())
  .catch(() => {
    alert('Could not add photo')
  })
}

export const postAGuest = (guest:any) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/guests/?wedding=${guest.weddingId}`, {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(guest)
  })
  .then(response => response.json())
  .catch(() => {
    alert('Could not add guest')
  })
}

export const getSingleWeddingGuests = (weddingId:number) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/guests/?wedding=${weddingId}`)
  .then(response => response.json())
  .catch(() => {
    return "No guests found"
  })
}

export const getSingleWeddingPhotos = (weddingId:number) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/photos/?weddingId=${weddingId}`)
  .then(response => response.json())
  .catch(() => {
    return "No photos found"
    // this error message isn't showing anywhere yet
  })
}
export const deleteAGuest = (guestId:number) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/remove_guest/?guest=${guestId}`)
  .then(response => response.json())
  .catch(() => {
    return "Deleted"
    //this error handling needs adjusting
  })
}

export const deleteWedding = (weddingId:number) => {
  return fetch(`http://matrimania-backend.herokuapp.com/api/v1/weddings/remove/?wedding=${weddingId}`)
  .then(response => response.json())
  .catch(() => {
    return "Not Deleted"
  })
}
