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
 * 많은 시간이 우릴 놓아줬어

서로의 맘을 닫은 채로

각자의 길을 걷자고

많은 시간이 우릴 갈라놨어

아무런 준비도 없는 채로

등을 돌려서 미안해

여태 이게 다 뭐라고

죽자고 죽자고 달려와서는

서로의 맘을 아프게 해야 했어

이젠 다 뭐라도

죽자고 죽자고 달려들어서

꿈을 꾸고 싶어

이 순간도 내 맘은 그때 그대로

얼굴은 변했지만 내 맘은 그대로

빛을 잃지 않는 별 하나가 되어서

영원히 우주에 떠있을게

Would u please

믿어줘요 다신 떠나지 않을게요

손을 잡고서 우리 절대 놓지 말아요

미안해요 오래 기다렸죠

너무 반가워요

오랜만이에요

다시 만나 반가워요

오랜만이에요

지금 이 순간이 난 너무 그리웠어

너와 나 같은 길 위에서

이렇게 서로를 바라보는 게

그 작은 미련도 절대로 남지 않게

단 한순간이라도 눈을 돌리지 않을게

여태 이게 다 뭐라고

죽자고 죽자고 달려와서는

서로의 맘을 아프게 해야 했어

이젠 다 뭐라도

죽자고 죽자고 달려들어서

꿈을 꾸고 싶어

눈을 뜨면 달아날 것 같아

꿈이면 안 돼

볼을 세게 꼬집어 아플 때까지

행복하기만 해도 바쁜 인생인데

슬픔의 여유는 없어 그냥 웃자

Would u please

믿어줘요 다신 떠나지 않을게요

손을 잡고서 우리 절대 놓지 말아요

미안해요 오래 기다렸죠

너무 반가워요

오랜만이에요

머릿속에서 새하얗게 잊혀지기 전에

시간을 다시 돌려서 처음의

그 모습처럼

언제나 나의 곁에 있어줘요

영원히 거기서 날 지켜봐요

Everyday everyday

Everynight everynight

두 눈을 감는 날까지

나 그대 곁에

믿어줘요 다신 떠나지 않을게요

손을 잡고서 우리 절대 놓지 말아요

미안해요 오래 기다렸죠

너무 반가워요

오랜만이에요

다시 만나 반가워요

오랜만이에요
 */
