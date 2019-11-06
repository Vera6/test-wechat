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
 * 유리병 속에 담겨진 그대 편지

你的信装在漂流瓶里

yu li byeong sog e dam gyeo jin geu dae pyeon ji

 

바다를 건너 나에게 돌아오리

漂洋过海回到我身边

ba da leul geon neo na e ge dol a o li

 

슬퍼하지 말아요 My darling

不要悲伤My darling

seul peo ha ji mal a yo my darling

 

내가 그리로 가리다 기다려주오

我这就过去 请等我

nae ga geu li lo ga li da gi da lyeo ju o

 

I'm on fire

We're going higher

I'm on fire

We're going higher

 

나는 불나방

我是飞蛾

na neun bul na bang

 

 

언제나 고독해 킬리만자로

你总是那么孤单

eon je na go dog hae kil li man ja lo

 

걸어가는 듯해 뙤약볕 쬐러

就像走在乞力马扎罗山 烈日铮铮

geol eo ga neun deut hae ddoe yag byeot jjoe leo

 

활활 타오르는 그대의 외로움

你的孤独就要燃烧

hwal hwal ta o leu neun geu dae yi oe lo um

 

내가 달래 주고파 옆에서 Uh

我好想在你身边为你解忧 Uh

nae ga dal lae ju go pa yeop e seo uh

 

닭똥 같은 눈물 내 손등

豆大的泪珠 我用我的手背

dalg ddong gat eun nun mul nae son deung

 

으로 슥슥 닦아 주리다

将它抚去

eu lo seug seug dagg a ju li da

 

그대가 선인장

哪怕你是仙人掌

geu dae ga seon in jang

 

이더라도 얼마든지 안아주리다

我也会拥抱你

i deo la do eol ma deun ji an a ju li da

 

 

Oh oh, I'm so dangerous

 

너의 맘에 불을 지피고 난 뛰어들어 Say

在你的心中点燃火焰 我纵身一跃 Say

neo yi mam e bul eul ji pi go nan ddwi eo deul eo say

 

Oh oh, She's so dangerous

 

그 속으로 몸을 던지고

投身进入

geu sog eu lo mom eul deon ji go

 

 

I'm on fire

 

오르락내리락해

起起伏伏

o leu lag nae li lag hae

 

We're going higher

 

나는 불나방

我是飞蛾

na neun bul na bang

 

I'm on fire

 

너에게 날아갈래

我要飞向你

neo e ge nal a gal lae

 

We're going higher

 

나는 불나방

我是飞蛾

na neun bul na bang

 

 

Wait a minute, hold up wait a minute

 

애타게 만들고 어디가 Stay with me

让人焦虑 哪里Stay with me

ae ta ge man deul go eo di ga stay with me

 

왜 이러니 내게 왜 이러니

为何如此 为何如此对我

wae i leo ni nae ge wae i leo ni

 

노란 입술 자국만 아련히

发黄的嘴唇 只留下隐隐约约的痕迹

no lan ib sul ja gug man a lyeon hi

 

밀고 당기지 말아

不要欲擒故纵

mil go dang gi ji mal a

 

난 오직 한 곳만 보고 날아

我只会看着一个方向飞翔

nan o jig han got man bo go nal a

 

더듬이는 엘로드 그대만을 찾아

我的触角只会寻找着你

deo deum i neun el lo deu geu dae man eul caj a

 

누가 우릴 막아

谁能阻挡我们

nu ga u lil mag a

 

불꽃 속으로 난 활공

我滑翔进入火花之中

bul ggoc sog eu lo nan hwal gong

 

 

Oh oh, I'm so dangerous

 

재가 날려도 날갯짓을 멈추지 않고 Say

我飞起来也不会停止振翅

jae ga nal lyeo do nal gaet jis eul meom cu ji anh go say

 

Oh oh, She's so dangerous

 

그 속으로 몸을 던지고

投身进入

geu sog eu lo mom eul deon ji go

 

I'm on fire

 

오르락내리락해

起起伏伏

o leu lag nae li lag hae

 

We're going higher

 

나는 불나방

我是飞蛾

na neun bul na bang


We're going higher


나는 불나방

我是飞蛾

na neun bul na bang 

 

자다 깨길 반복해

反复失眠

ja da ggae gil ban bog hae

 

불안함 늘 내 옆에 있어

不安感总是伴随我左右

bul an ham neul nae yeop e iss eo

 

어둠 드리우지 않기를

愿黑暗不会降临

eo dum deu li u ji anh gi leul

 

그대 손과 두 눈이

你的双手与双眼

geu dae son gwa du nun i

 

영원히 빛나길 기도해

祈祷永远闪耀

yeong wun hi bic na gil gi do hae

 

해가 떨어지지 않기를

愿太阳永不落下

hae ga ddeo leo ji ji anh gi leul

 

La La La La La La La La La La La La La La

 

불이야 불 Call me up, no 119

火啊 火

bul i ya bul call me up, no 119

 

불이야 불 후하후하 여기 쉬어줘

火啊 火 哗哗 在这里停下吧

bul i ya bul hu ha hu ha yeo gi swi eo jweo

 

불이야 불 Call me up, no 119

火啊 火

bul i ya bul call me up, no 119

 

불이야 불 후하후하 옆에 있어줘

火啊 火 哗哗 请留在我身边

bul i ya bul hu ha hu ha yeop e iss eo jweo
 */

