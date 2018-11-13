//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  //手动认证
  getNewUser(Dialog, callback) {
    var that = this;
    // var UserInfo = wx.getStorageSync("UserInfo");
    // if (!UserInfo) {
    Dialog({
      title: '微信授权',
      showImage: " http://placehold.it/200x200",
      showMessage: "我的小程序申请获得以下权力",
      message: '获得你的公开信息(昵称、头像等)',
      selector: '#zan-dialog-test'
    }).then((res) => {
      
    });
    
  },
  //获取用户信息
  getUser: function (success, fail) {
    wx.authorize({
      scope: "scope.userInfo",
      success: success,
      fail: fail
    })
  },
})