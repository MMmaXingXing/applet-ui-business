// components/mine/swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image_data: {
      type: Array,
      value: ["https://faceschool-1252048467.cos.ap-shanghai.myqcloud.com/applet-dev/swiper1.jpg"]
    },
  },
  externalClasses: ['swiper-swiper'],

  /**
   * 组件的初始数据
   */
  data: {
    currentSwiper:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange: function (e) {
      this.setData({
        currentSwiper: e.detail.current
      })
    },
  }
})
