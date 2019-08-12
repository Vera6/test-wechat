const mainData = require('../../data/posts-data.js')

Page({
  onLoad(options) {
    this.setData({
      mainList: mainData.postList
    });
  },

  // 轮播图点击
  onSwiperTap(event) {
    // target指的是当前点击的组件
    const mainId = event.target.dataset.postid
    wx.navigateTo({
      url: 'main-detail/main-detail?id=' + mainId
    })
  },

  // 列表图点击
  onMainTap(event) {
    // currentTarget 指的是事件捕获的组件
    const mainId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'main-detail/main-detail?id=' + mainId
    })
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: '撩生撩死殷志源',
      desc: '全世界最好的殷志源',
      imageUrl: "/images/index/4.jpg",
      path: '/pages/main/main'
    }
  }
})