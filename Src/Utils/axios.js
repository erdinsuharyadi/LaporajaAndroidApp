import URL from '../Config/URL'

const axios = require('axios')
const instance = axios.create({
  baseURL: URL.IP_BE.toString(),
});


module.exports = {
  instance() {
    return instance
  },

  axiosGet(url) {
    return instance.get(url)
  },

  axiosPost: (url, body, token= null) => {
    console.log("API, Token:", token);
    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    instance.defaults.headers.post['x-access-token'] = token
    return new Promise((resolve, reject) => {
      instance.post(url, body)
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  },

  axiosPut: (url, body) => {
    instance.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded'
    return new Promise((resolve, reject) => {
      instance.put(url, body)
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  },

  axiosDelete: (url, token) => {
    return new Promise((resolve, reject) => {
      instance.delete(url, {headers: {
        'x-access-token': token 
      }})
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response.status)
        })
    })
  },

  axiosPatch: (url, body) => {
    instance.defaults.headers.patch['Content-Type'] = 'multipart/form-data'
    return new Promise((resolve, reject) => {
      instance.patch(url, body, {
        onUploadProgress: progressEvent => {
          console.log('Upload progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
        }
      })
        .then(result => {
          resolve(result)
        })
        .catch(error => {
          reject(error.response)
        })
    })
  }


}