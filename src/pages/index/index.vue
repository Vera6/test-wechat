<template>
  <div>
    <div v-if="isAuth">
      <van-button @click="onPage">Welcome</van-button>
    </div>
    <Auth v-else @getUserInfo="init"/>
  </div>
</template>

<script>
import { getSetting, getUserInfo } from '@/api/wechat'
import api from '@/api'
// import { getHomeData } from '@/api'
import Auth from '../../components/base/auth'

export default {
  data() {
    return {
      isAuth: true
    }
  },
  components: {
    Auth
  },
  mounted() {
    this.init()
    api.getHomeData()
  },
  methods: {
    onPage() {
      this.$router.push('/pages/pay/main')
    },
    getSetting() {
      getSetting(
        'userInfo',
        () => {
          this.isAuth = true
          // showLoading('正在加载')
          this.getUserInfo()
        },
        () => {
          this.isAuth = false
        }
      )
    },
    getUserInfo() {
      getUserInfo(
        (userInfo) => {
          console.log(userInfo)
          // setStorageSync('userInfo', userInfo)
          // const openId = getStorageSync('openId')
          // if (!openId || openId.length === 0) {
          //   getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          // } else {
          //   onOpenIdComplete(openId, userInfo)
          // }
        },
        () => {
          console.log('failed...') // 获取用户信息，抛出异常
        }
      )
    },
    init() {
      this.getSetting()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
