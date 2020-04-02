Page({

  /**
   * 页面的初始数据
   */
  data: {
  films:[],
  hasMore: true,
  showLoading: true,
  start:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.send();
  },
  send: function () {
    var that = this
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      data: {
        message: 'fucking',
        start: that.data.start,

      },
      //   method: 'GET',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        if (res.data.subjects.length === 0)
        {
          that.setData({
            hasMore: false,
          })
        }
        else{
        that.setData({
          showLoading: false,
          start: that.data.start + res.data.subjects.length,
          films: that.data.films.concat(res.data.subjects),

        })
        console.log(res.data);
      }
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var that = this
    that.setData({
      films: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    that.send();
  },
  onReachBottom: function () {
    var that = this
    if (!that.data.showLoading) {
      that.send();
    }
  },
  viewFilmDetail :function (e){
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var tag = e.currentTarget.dataset.tag;
    var score = e.currentTarget.dataset.score;
    var time = e.currentTarget.dataset.time;
    var movieid = e.currentTarget.dataset.movieid;
 
    wx.navigateTo({
      url: '../favoriteFilm/favoriteFilm?name=' + name + '&pic=' + pic + "&tag=" + tag + "&score=" + score + "&movieid=" + movieid + "&time=" +time
    })


  }

})