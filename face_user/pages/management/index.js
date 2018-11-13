import { $wuxDialog } from '../../components/wux_change/index'

// pages/management/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.inviteOpen();
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

  baseOpenItem(){
    $wuxDialog('#wux-dialog').confirm({
      resetOnClose: true,
      closable: false,
      title: '',
      content: '您的家长免费额度已用完，如再 添加新的家长需要收费10元一个 点击确定添加，或者取消',
      onConfirm(e) {
        console.log('凭什么吃我的冰淇淋！')
      },
      onCancel(e) {
        console.log('谢谢你不吃之恩！')
      },
    })
  },
  addStudent(){
    this.baseOpenItem();
  },
  addFamily(){
    this.inviteOpen()
  },
  inviteOpen(){
    $wuxDialog("#wux-invite").alert({
      resetOnClose: true,
      closable: false,
      share: function(e){
        console.log(123412);
      },
      content: 'OR',
      onConfirm(e) {
        console.log('1111!')
      },
    })
  }
})