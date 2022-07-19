import http from './api'

export const login = user => {
  return new Promise((resolve, reject) => {
    http.post('users/login', user)
      .then(response => {
        resolve(response.data)
      })
      .catch(error => reject(error))
  })
}
