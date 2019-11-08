<template>
  <div class="userinfo">
    <img
      class="userinfo-avatar"
      v-if="avatarUrl"
      :src="avatarUrl"
      background-size="cover" />
    <button
      v-else
      class="userinfo-avatar"
      open-type="getUserInfo"
      @getuserinfo="onGotUserInfo" />
    <div class="userinfo-nickname">
      <card :text="nickName"></card>
    </div>
    <!-- <button
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber">点击登入</button> -->
  </div>
</template>

<script> 
import card from '@/components/card'

export default {
  data () {
    return {
      nickName: '',
      avatarUrl: ''
    }
  },

  components: {
    card
  },

  methods: {
    onGotUserInfo (e) {
      const result = e.mp.detail
      console.log(result)
      const { errMsg, userInfo } = result
      // 如果没有获取到，则停留在当前页面，让用户自己返回上一级
      if (!userInfo) {
        console.log(errMsg)
        return
      }
      // 如果授权成功了，则触发登录
      wx.login({
        success: (res) => {
          // 登录成功再获取用户信息
          console.log('res', res)
          this.nickName = result.userInfo.nickName
          this.avatarUrl = result.userInfo.avatarUrl
          // wx.setStorageSync('nickName', this.nickName)
          // wx.setStorageSync('avatarUrl', this.avatarUrl)
      },
        fail: () => {
        }
      })
    },
    getPhoneNumber(e) {
      const { encryptedData, iv } = e.mp.detail;
      console.log("encryptedData: ", e);
      if (!encryptedData) {
        return
      }
      wx.showLoading({
        title: "登录中"
      });
      wx.login({
        success: (res) => {
          // 登录成功再获取用户信息
          console.log('res', encryptedData)
      },
        fail: () => {
        }
      })
    },
  },

  created () {
    // let app = getApp()
    // this.nickName = wx.getStorageSync('nickName')
    // this.avatarUrl = wx.getStorageSync('avatarUrl')
  }
}
</script>

<style lang="scss" scoped>

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
  background: url('http://static-fe.anlink.tech/circle/confirmSuccess.png') no-repeat;
  background-size: 100% 100%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
