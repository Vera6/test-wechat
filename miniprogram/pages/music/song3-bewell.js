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
 아프지 마요

외롭지 마요

행복하길 바라요

오늘도 어제도 사실 그대 걱정돼

썼다 지워버린

잘 지내 만 수십 개

나도 알고 있어요

그럴 리 없다는 걸

난 이기적이네요 끝까지

내가 원망스러워

미칠 것만 같았겠죠

만나지 말걸 그랬다며

다 후회했겠죠

미워해서라도 날

잊지 않으려는 그대에게

감히 내가 이런 말

할 자격 없겠지만

제발

아프지 마요

외롭지 마요

슬프지 마

고작 나 하나 때문에

아무리 그리워도

초라해지진 마요

행복하길 바라요

미안해요

I never meant to break your heart

만날 땐 널 못 챙겼던

난데 이렇게 헤어지니까 너를 챙겨

I'll be sorry forever forever

욕해도 돼

내 핑계로 술 마시고 실수해도 돼

내가 좀 괴롭게

보란 듯이 웃어줄 순 없어도

어디 아프지만 말아줘

Be well

내가 원망스러워

미칠 것만 같았겠죠

잘해주지 말걸

그랬다며 후회했겠죠

미워해서라도 날

간직해주려는 그대에게

감히 내가 이런 말

할 자격 없겠지만

제발

아프지 마요

외롭지 마요

슬프지 마

고작 나 하나 때문에

아무리 그리워도

초라해지진 마요

행복하길 바라요

미안해요

나보다 잘해줄 사람 만나길

적어도 나 같지는

않은 사람 만나길

널 울릴 만큼 웃게

해줄 사람 위해

그 눈물 아껴둬요

제발

아프지 마요

아프지 마요

외롭지 마요

외롭지 마요

슬프지 마

고작 나 하나 때문에

아무리 그리워도

초라해지진 마요

행복하길 바라요

미안해요

잘 살아요
 */
