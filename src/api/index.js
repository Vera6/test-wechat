import { get } from '../utils/request'
import { APP_ID, APP_SECRET } from '../utils/constant'

const getHomeData = params => get(`/book/home/v2`, params)

const getOpenId = (code) => get('/openId/get', {
  appId: APP_ID,
  secret: APP_SECRET,
  code
})

export default {
  getHomeData,
  getOpenId
}
