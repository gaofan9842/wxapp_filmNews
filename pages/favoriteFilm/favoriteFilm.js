Page({
  data: {
    movieid: '',
    name: '',
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
    id: ''
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      name: options.name,
      picURL: options.pic,
      tag: options.tag,
      time: options.time,
      score: options.score,
      movieid: options.movieid,
    })
    console.log("????" + this.data.picURL);

that.ifMovieCollect();
    //从服务器拿数据
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: this.data.movieid,
        tag: '9'
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          answer3: res.data.result,
          answer4: res.data.info
        })
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },

  onPullDownRefresh: function () {
    var data = {
      id: this.data.filmDetail.id
    }
    this.onLoad(data)
  },


  favoriteFilm: function (e) {
    var that = this
    that.setData({
      collectFlag: 1 - that.data.collectFlag
    })
    var tempString = that.data.name;
    if (this.data.collectFlag == 1) {
      var message = "?"+that.data.name + "+" + that.data.picURL + "+" + that.data.score + "+" + that.data.tag + "+" + that.data.time + "+" + that.data.year + "+" + that.data.actors + "+" + that.data.movieid;
      wx.setStorageSync(tempString, message);

    } else {      //取消收藏电影
      wx.removeStorageSync(tempString);
    }
  },



  //查看影片是否被收藏
  ifMovieCollect: function () {
    var that = this;
    var temp = wx.getStorageSync(that.data.name);
    if (temp == '') {
      that.setData({
        collectFlag: 0
      })
    } else {
      that.setData({
        collectFlag: 1
      })
    }

    console.log(that.data.collectFlag + "!@#$%^");
  }

})