// pages/parent_entry/index.js
const app = getApp();
const Dialog = require("../../components/dialog/dialog/dialog");

import {
  wxOauth,
  wxUpdateUserInfo,
} from "../../utils/api.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacityCollection:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUser();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    this.cameraContext = wx.createCameraContext("camera");
    var i = 0;
    setInterval(function(){
      var opacityCollection = wx.createAnimation({
        duration: 1000,
      })
      if(i===0){
        opacityCollection.opacity(0).step();
        i=1;
      }else{
        opacityCollection.opacity(1).step();
        i=0;
      }
      
      this.setData({
        opacityCollection: opacityCollection.export()
      })
    }.bind(this),1500)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getPhoto(){
    this.cameraContext.takePhoto({
      success:function(res){
        console.log(res);
        wx.getFileSystemManager().readFile({
          filePath:  res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            console.log('data:image/png;base64,' + res.data)
          }
        })

        //这是同步的方法，不过我不太喜欢用
        //let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
        //console.log(base64)
      }
    })
  },
  getUser: function () {
    app.getUser(function (res) {
    }, (res) => {
      console.log(res);
      app.getNewUser(Dialog, "");
    });
    wx.getUserInfo({
      lang: "zh_CN",
      success: function (res) {
        console.log(res) ;
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
        wxUpdateUserInfo(params, 1);
        wx.setStorageSync("userInfo", res.userInfo)
      },
    })
  },

})