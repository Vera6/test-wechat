Page({

  data: {
    templateMessageResult: '',
    wxacodeSrc: '',
    wxacodeResult: '',
    showClearWXACodeCache: false,
  },

  submitTemplateMessageForm(e) {
    this.setData({
      templateMessageResult: '',
    })

    wx.cloud.callFunction({
      name: 'openapi',
      data: {
        action: 'sendTemplateMessage',
        formId: e.detail.formId,
      },
      success: res => {
        console.warn('[云函数] [openapi] templateMessage.send 调用成功：', res)
        wx.showModal({
          title: '发送成功',
          content: '请返回微信主界面查看',
          showCancel: false,
        })
        wx.showToast({
          title: '发送成功，请返回微信主界面查看',
        })
        this.setData({
          templateMessageResult: JSON.stringify(res.result)
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [openapi] templateMessage.send 调用失败：', err)
      }
    })
  },

  onGetWXACode() {

    this.setData({
      wxacodeSrc: '',
      wxacodeResult: '',
      showClearWXACodeCache: false,
    })

    // 此处为演示，将使用 localStorage 缓存，正常开发中文件 ID 应存在数据库中
    const fileID = wx.getStorageSync('wxacodeCloudID')

    if (fileID) {
      // 有云文件 ID 缓存，直接使用该 ID
      // 如需清除缓存，选择菜单栏中的 “工具 -> 清除缓存 -> 清除数据缓存”，或在 Storage 面板中删掉相应的 key
      this.setData({
        wxacodeSrc: fileID,
        wxacodeResult: `从本地缓存中取得了小程序码的云文件 ID`,
        showClearWXACodeCache: true,
      })
      console.log(`从本地缓存中取得了小程序码的云文件 ID：${fileID}`)
    } else {
      wx.cloud.callFunction({
        name: 'openapi',
        data: {
          action: 'getWXACode',
        },
        success: res => {
          console.warn('[云函数] [openapi] wxacode.get 调用成功：', res)
          wx.showToast({
            title: '调用成功',
          })
          this.setData({
            wxacodeSrc: res.result,
            wxacodeResult: `云函数获取二维码成功`,
            showClearWXACodeCache: true,
          })
          wx.setStorageSync('wxacodeCloudID', res.result)
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '调用失败',
          })
          console.error('[云函数] [openapi] wxacode.get 调用失败：', err)
        }
      })
    }
  },

  clearWXACodeCache() {
    wx.removeStorageSync('wxacodeCloudID')

    this.setData({
      wxacodeSrc: '',
      wxacodeResult: '',
      showClearWXACodeCache: false,
    })

    wx.showToast({
      title: '清除成功',
    })
  },

})

/**
 예전보다 지금 네가 더욱

괜찮을 거야

허전했던 모습

맘속의 빈 곳

다 채워 줬으니

아름다운 세상에서

많이 외로워하며

너란 반쪽을 찾아

헤맨 건

다 옛날 얘긴 걸

내 생애 남은 날들을

너와 함께 하고 싶어

마치 꿈만 같은 걸

이젠 나 혼자가 아닌

너와 함께 하는 거야

Oh love 왜 이제서야

많이 외롭던 나를 찾아온 거야

Oh love 너를 사랑해

이제 모든 시간들을 나와 함께해

하나가 둘이 돼

여지껏 내 가슴 깊게

자리했던 슬픔이 개고

이젠 내 인생의 끝까지 무지개

난 너만 있으면 돼

기억해줄래

이 순간에 내가 하는 약속

사랑하는 너에게

나를 다 줄게

이제 너의 집은 내 맘속

얼마나 수많은 날을

기다려 왔는 줄 아니

이젠 모두 앞에서

너의 손을 꼭 붙잡고

우리 함께 하는 거야

Oh love 왜 이제서야

많이 외롭던 나를 찾아온 거야

Oh love 너를 사랑해

이제 모든 시간들을 나와 함께해

과거 따윈 모두 잊고 나와 함께 할

많은 시간을 추억으로 만들어

Oh love 왜 이제서야

많이 외롭던 나를 찾아온 거야

Oh love 너를 사랑해

이제 모든 시간들을 나와 함께해
 */
