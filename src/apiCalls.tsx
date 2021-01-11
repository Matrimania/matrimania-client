export const getWeddings = () => {
  return fetch('http://localhost:8000/api/v1/weddings/weddings/')
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return "No weddings found"
  })
}

export const postAWedding = (wedding: any) => {
  return fetch('http://localhost:8000/api/v1/weddings/create/', {
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wedding)
  })
  .then(response => {
    if(response.ok) {
      return response
    } else {
      throw Error
    }
  })
  .catch(error => {
    alert('Could not add wedding')
  })
}

export const getWeddingGuests = () => {
  return fetch('http://localhost:8000/api/v1/weddings/guests')
  .then(response => {
    if(response.ok) {
      return response.json()
    } else {
      throw Error
    }
  })
  .catch(error => {
    return "No guests found"
  })
}