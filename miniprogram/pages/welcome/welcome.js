Page({
    onTap: function (event) {
        wx.switchTab({
            url: "../index/index"
        });
      
    },
    onReachBottom:function(event){
      console.log('asfasdfa')
    }
})