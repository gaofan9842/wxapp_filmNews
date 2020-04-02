// var douban = require('../../comm/script/fetch')
// var config = require('../../comm/script/config')
var app = getApp()
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  onLoad: function () {
    
    
    var that = this
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters?city=天津',
      data: {
        start: that.data.start,
      },
      //   method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        if (res.data.subjects.length === 0) {
          that.setData({
            hasMore: false,
          })
        }
        else {
          that.setData({
            showLoading: false,
            start: that.data.start + res.data.subjects.length,
            films: that.data.films.concat(res.data.subjects),
          })
          that.saveData();
          console.log(res.data);
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
  },

  getinput: function (res) {
    var that = this
    that.setData({
      text: res.detail.value
    })
    //console.log("?????"+this.data.text)
  },
  interResult: function (e) {
    //console.log("!!!!"+this.data.text)
    wx.navigateTo({
      url: "../searchResult/searchResult?text=" + this.data.text,
    })
  },
  onPullDownRefresh: function () {
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    this.onLoad()
  },

  onReachBottom: function () {
  
    var that = this
    if (!that.setData.showLoading) {
      that.onLoad();
    }
  },
  saveData: function (data) {
    var that=this;
    wx.setStorage({
      key: 'shakeFilmList',
      data: that.data.films
    })
    console.log('hhhhhhhhh');
  },

  viewFilmDetail: function (e) {
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var tag = e.currentTarget.dataset.tag;
    var score = e.currentTarget.dataset.score;
    var movieid = e.currentTarget.dataset.movieid;
    var time = e.currentTarget.dataset.time;
    wx.navigateTo({
      url: "../filmDetail/filmDetail?name=" + name + "&pic=" + pic + "&tag=" + tag + "&score=" + score + "&time=" + time + "&movieid=" + movieid
    })
  },
 
})