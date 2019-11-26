import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()

const API_URL = {
  dev: 'https://test.youbaobao.xyz:18081'
}

function createFly() {
  if (mpvuePlatform === 'wx') {
    return fly
  }
  return null
}

function handleError(err) {
  console.log(err)
}

function getUrl(url) {
  return API_URL.dev + url
}

export function get(url, params = {}, showError = true) {
  const fly = createFly()
  const url1 = getUrl(url)
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url1, params).then(response => {
        console.log(response)
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

export function post(url, params = {}, showError = true) {
  const fly = createFly()
  const url2 = getUrl(url)
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url2, params).then(response => {
        console.log(response)
        if (response && response.data && response.data.error_code === 0) {
          resolve(response)
        } else {
          if (showError) {
            const msg = (response && response.data && response.data.msg) || '请求失败'
            mpvue.showToast({
              title: msg,
              duration: 2000
            })
          }
          reject(response)
        }
      }).catch(err => {
        handleError(err)
        reject(err)
      })
    })
  }
}

fly.interceptors.request.use((request) => {
  // 给所有请求添加自定义header
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json'
  }
  return request
})
