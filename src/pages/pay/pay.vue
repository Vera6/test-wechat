<template>
  <web-view :src="shareUrl"></web-view>
</template>

<script>
export default {
  data() {
    return {
      shareUrl: null
    }
  },
  onLoad: function (options) {
    this.shareUrl = ''
  },
  onShareAppMessage: function (res) {
    console.log('res', res)
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '分享H5',
      // 这一点很重要哦，小程序只能打开自己的页面，所以需要本地的地址+webViewUrl的地址才行。
      path: '/pages/pay/main?url=' + res.webViewUrl,
      imageUrl: '',
      success: (res) => {
        if (res.data.code === 0) {
          wx.showToast({
            title: '发送邀请好友成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        console.log('转发失败', res)
      }
    }
  }
}
</script>

