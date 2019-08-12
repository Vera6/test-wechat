const mainData = require('../../data/posts-data.js')

Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mainList: mainData.postList
    });
  },

  // 轮播图点击
  onSwiperTap: function (event) {
    // target指的是当前点击的组件
    const mainId = event.target.dataset.postid
    wx.navigateTo({
      url: 'main-detail/main-detail?id=' + mainId
    })
  },

  // 列表图点击
  onMainTap: function (event) {
    // currentTarget 指的是事件捕获的组件
    const mainId = event.currentTarget.dataset.postid
    wx.navigateTo({
      url: 'main-detail/main-detail?id=' + mainId
    })
  }
})