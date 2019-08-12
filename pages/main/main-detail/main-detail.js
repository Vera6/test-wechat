const detailsData = require('../../../data/posts-data.js')
const app = getApp()

Page({
  data: {
    isPlayingMusic: false
  },

  onLoad(options) {
    const postId = options.id
    this.data.currentPostId = postId
    const detailData = detailsData.postList[postId]
    this.setData({
      detailData: detailData
    })

    // getStorageSync本地存储
    let detailsCollected = wx.getStorageSync('details_collected')
    if (detailsCollected) {
      const detailCollected = detailsCollected[postId]
      if (detailCollected) {
        this.setData({
          collected: detailCollected
        })
      }
    } else {
      detailsCollected = {}
      detailsCollected[postId] = false
      wx.setStorageSync('details_collected', detailsCollected)
    }

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId
      === postId) {
        this.setData({
          isPlayingMusic: true
      })
    }
  },

  // 收藏
  onColletionTap(event) {
    const self = this
    wx.getStorage({
      key: 'details_collected',
      success(res) {
        const detailsCollected = res.data
        let detailCollected = detailsCollected[self.data.currentPostId]
        detailCollected = !detailCollected
        detailsCollected[self.data.currentPostId] = detailCollected
        wx.setStorageSync('details_collected', detailsCollected)
        self.setData({
          collected: detailCollected
        })
        wx.showToast({
          title: detailCollected ? '收藏成功' : '取消成功',
          duration: 1000,
          icon: 'success'
        })
      }
    })
  },

  //分享
  onShareTap(event) {
    const itemList = [
      '分享给微信好友',
      '分享到朋友圈'
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#f4e33d',
      success(res) {
        wx.showModal({
          content: `用户${itemList[res.tapIndex]}`,
        })
      }
    })
  },

  //音乐
  onMusicTap(event) {
    const currentPostId = this.data.currentPostId
    const detailData = detailsData.postList[currentPostId]
    const isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
    } else {
      wx.playBackgroundAudio({
        dataUrl: detailData.music.url,
        title: detailData.music.title,
        coverImgUrl: detailData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_currentMusicPostId = this.data.currentPostId
      app.globalData.g_isPlayingMusic = true
    }
  },

  // 用户点击右上角分享
  onShareAppMessage() {
    return {
      title: '撩生撩死殷志源',
      desc: '全世界最好的殷志源',
      imageUrl: "/images/index/4.jpg",
      path: '/pages/main/main-detail/main-detail?id=0'
    }
  }
})