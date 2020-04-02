var douban = require('../../comm/script/fetch')
var config = require('../../comm/script/config')
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading:true,
    start: 0,
    url: '',
    keyword: '',
    isNull: false,
    nullTip: {
      tipText: 'sorry，没有找到您要的内容，换个关键词试试吧',
      actionText: '返回',
      routeUrl: '../../pages/search/search'
    }
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      url: options.url,
      keyword: options.text,
      title: options.keyword
    })
  

    //电影搜索
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: this.data.keyword,
        tag: '7'

      },
      //   method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        if (res.data.result.length === 0) {
          that.setData({
            hasMore: false,
          })
        }
        else {
          that.setData({
            showLoading: false,
            films: res.data.result
          })
          console.log(res.data.result);
        }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })




  },


  viewFilmDetail: function (e) {
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var tag = e.currentTarget.dataset.tag;
    var score = e.currentTarget.dataset.score;
    var maoyanid = e.currentTarget.dataset.maoyanid;
    console.log(name);
    // console.log(pic_url)
    wx.navigateTo({
      url: "../searchPage/searchPage?name=" + name + "&pic=" + pic + "&tag=" + tag + "&score=" + score + "&maoyanid=" + maoyanid
    })
  }
})