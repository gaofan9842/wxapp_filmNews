// pages/sousuoresult/sousuoresult.js
Page({
  /**
   * 组件的属性列表
   */
  data: {
    name: '',
    id: 0,
    cinemaName: '',
    cinemaAddress: '',
    cinemaTel: '',
    threeD: '',
    child: '',
    park: '',
    movieid: '',
    picURL: '',
    score: '',
    tag: '',
    time: '',
    year: '',
    actors: '',
    collectFlag: 0,
    filmDetail: {},
    showLoading: true,
    showContent: false,
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      name: options.text
    })
    console.log("?????" + this.data.name)

    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: that.data.name,
        tag:'8'
      },
      //   method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        //console.log(res.data.result+"????")
        if (res.data.result.length == 0 ) {
          // wx.navigateTo({
          //   url: '../null_sousuo_result/null_sousuo_result',
          // })
          that.setData({
            id: 1
          })
        } else {
          that.setData({
            id: 0,
            answer: res.data.result
          })
          console.log(res.data);
        }

      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },


  interSecondTab: function (e) {
    var cinemaName = e.currentTarget.dataset.cinemaname;
    var cinemaAddress = e.currentTarget.dataset.cinemaaddress;
    var cinemaTel = e.currentTarget.dataset.cinematel;
    var threeD = e.currentTarget.dataset.threed;
    var child = e.currentTarget.dataset.child;
    var park = e.currentTarget.dataset.park;
    var detailUrl = e.currentTarget.dataset.detailurl;
    // console.log("detailUrl :"+detailUrl);
    wx.navigateTo({
      url: '../sec_cinema/sec_cinema?cinemaName=' + cinemaName + "&cinemaAddress=" + cinemaAddress + "&cinemaTel=" + cinemaTel + "&threeD=" + threeD + "&child=" + child + "&park=" + park + "&detailUrl=" + detailUrl,
    })
  },
  properties: {

  },

  /**
* 组件的初始数据
   */


  /**
   * 组件的方法列表
   */
  methods: {

  }
})
