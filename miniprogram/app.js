// app.js
// 在app.js文件中 ， 定义了一些生命周期方法
App({
  // onLaunch监听小程序初始化，当小程序初始化完成时，会触发onLaunch（全局只触发一次）
  onLaunch: function (options) {

    /** 
     * options是一个参数对象， 里面包含了三个参数 ， path,query和scene ，
     * path是打开小程序的路径，
     * query是打开小程序页面url的参数，
     * scene是打开小程序的场景值
    **/
    console.log("app.js ---onLaunch---", options)
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
  },

  // 监听小程序显示，当小程序启动，或从后台进入前台显示，会触发onShow
  onShow:function(){
    console.log("app.js ---onShow---")
  },

  // 监听小程序隐藏 当小程序从前台进入后台，会触发 onHide
  onHide:function(){
    console.log("app.js ---onHide---")
  },

  // 错误监听函数，当小程序发生脚本错误，或者api调用失败时，会触发onError并带上错误信息
  onError: function (msg){
    console.log("app.js ---onError---" + msg)
  },

  // 可以添加任意的函数或数据到Object参数中，用this可以访问
  globalData: {}
})
