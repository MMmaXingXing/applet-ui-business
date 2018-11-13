//index.js
//获取应用实例
const app = getApp()
const Dialog = require("../../components/dialog/dialog/dialog");
import {
  wxOauth,
  wxUpdateUserInfo,
} from "../../utils/api.js"

Page({
  data: {
    imageSwiper: ["http://img1.imgtn.bdimg.com/it/u=2291628774,4135890311&fm=26&gp=0.jpg","http://img1.imgtn.bdimg.com/it/u=2291628774,4135890311&fm=26&gp=0.jpg"],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    wxOauth();
    this.getUser();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getUser: function () {
    app.getUser(function (res) {

    }, (res) => {
      app.getNewUserDialog(Dialog, "");
    });
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(wx.getStorageSync("ouath").sessionId);
        let params = {
          sessionId: wx.getStorageSync("ouath").sessionId,
          nick_name: res.userInfo.nickName,
          headimg_url: res.userInfo.avatarUrl,
          city: res.userInfo.city,
          sex: res.userInfo.gender,
          province: res.userInfo.province,
          country: res.userInfo.country,
        }
        // wxUpdateUserInfo(params, 1);
        wx.setStorageSync("userInfo", res.userInfo)
      },
    })
  },
  getUser: function () {
    app.getUser(function (res) {

    }, (res) => {
      app.getNewUser(Dialog, "");
    });
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(wx.getStorageSync("ouath").sessionId);
        let params = {
          sessionId: wx.getStorageSync("ouath").sessionId,
          open_id:"",
          nick_name: res.userInfo.nickName,
          headimg_url: res.userInfo.avatarUrl,
          city: res.userInfo.city,
          sex: res.userInfo.gender,
          province: res.userInfo.province,
          country: res.userInfo.country,
        }
        wxUpdateUserInfo(params, 1);
        wx.setStorageSync("userInfo", res.userInfo)
      },
    })
  },
})
