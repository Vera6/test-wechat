<template>
  <div class="index-box">
    <div v-if="isAuth">
      <div 
        class="userinfo-avatar"
        :style="{ backgroundImage: 'url(' + avatarUrl + ')' }"/>
      <div class="userinfo-nickname">{{nickName}}</div>
      <van-button class="btn" type="primary" size="large" @click="onPage">Welcome</van-button>
      <!-- <image-container :width="594" :height="315" mode="widthFix" src=""></image-container> -->
    </div>
    <Auth v-else @getUserInfo="init"/>
  </div>
</template>

<script>
import { getSetting, getUserInfo } from '@/api/wechat'
// import { get } from '@/utils/request'
// import api from '@/api'
// import { getHomeData } from '@/api'
import Auth from '../../components/base/auth'
import ImageContainer from '../../components/base/ImageContainer'
const common = require('@/utils/xml.js')

export default {
  data() {
    return {
      isAuth: true,
      avatarUrl: '',
      nickName: ''
    }
  },
  components: {
    Auth,
    ImageContainer
  },
  mounted() {
    this.init()
    this.getVersion()
    // api.getHomeData()
  },
  computed: {
    avatarUrlStyle() {
      return `background: url(${this.avatarUrl}) no-repeat`
      // return 'backgroundImage: url(' + this.avatarUrl + ')'
    }
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
        (res) => {
          console.log(res)
          // setStorageSync('userInfo', userInfo)
          // const openId = getStorageSync('openId')
          // if (!openId || openId.length === 0) {
          //   getUserOpenId(openId => onOpenIdComplete(openId, userInfo))
          // } else {
          //   onOpenIdComplete(openId, userInfo)
          // }
          this.avatarUrl = res.avatarUrl
          this.nickName = res.nickName
          // console.log('this.avatarUrl', this.avatarUrl)
        },
        () => {
          console.log('failed...') // 获取用户信息，抛出异常
        }
      )
    },
    init() {
      this.getSetting()
    },
    getVersion() {
      const jsonObj = '<PolicyInfo id="1"><BaseInfo><AgentCode>111</AgentCode><AgentCode>222</AgentCode><AgentCode>111</AgentCode></BaseInfo></PolicyInfo>'
      // 解析xml字符串，转换成js对象
      const resObj = common.xml2Obj(jsonObj)
      const jsonObj1 = '<Like id="1"><BaseInfo><AgentCode>111</AgentCode><AgentCode>222</AgentCode><AgentCode>111</AgentCode></BaseInfo></Like>'
      const resObj1 = common.xml2Obj(jsonObj1)
      console.log('resObj', resObj)
      console.log('resObj111111', resObj1)
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo-avatar {
  float: left;
  width: 50px;
  height: 50px;
  margin: 20px;
  border-radius: 50%;
  background-size: cover;
}

.userinfo-avatar:after {
  border: none;
}

.userinfo-nickname {
  font-size: 16px;
  color: #007aff;
  background-color: white;
  background-size: cover;
  padding-top: 35px;
}

.userinfo-nickname::after {
  border: none;
}

</style>

<style lang="scss">
.index-box {
  .van-button {
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>

