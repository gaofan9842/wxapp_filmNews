// pages/sec_cinema/sec_cinema.j
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemaName :'',
    cinemaAddress:'',
    cinemaTel:'',
    threeD:'',
    child:'',
    park:'',
    id:'',
    detailUrl:'',
    tcl:0,
    isFilmFavorite: 0,
    idy:0
  },
  turn_big: function (e) {
    let id = e.target.dataset.id;
    let tcl=e.target.dataset.tcl;
    console.log(id);
    this.setData({
      curNav: id,
      tcl:tcl,
      idy:1
    })

    console.log("uuuuuu") 
  },
  favoriteCinema: function (e) {
    var that = this
    that.setData({
      isFilmFavorite: 1 - that.data.isFilmFavorite
    })
    var tempString = that.data.cinemaName;
    if (this.data.isFilmFavorite == 1) {
      var message = "&" + that.data.cinemaName + "+" + that.data.cinemaAddress + "+" + that.data.cinemaTel + "+" + that.data.threeD + "+" + that.data.child + "+" + that.data.park + "+" + that.data.detailUrl;
      wx.setStorageSync(tempString, message);
    } else {      //取消收藏电影
      wx.removeStorageSync(tempString);
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      cinemaAddress : options.cinemaAddress,
      cinemaName : options.cinemaName,
      cinemaTel : options.cinemaTel,
      threeD : options.threeD,
      child : options.child,
      park : options.park,
      detailUrl:options.detailUrl
    })
console.log(this.data.detailUrl+"??")
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
         message: this.data.detailUrl,
         tag: '5'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          answer: res.data.result
        })

        console.log("???????????????");
        console.log(res.data.result);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })



    that.ifCinemaCollect();





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
  interFilmDetail: function (e) {
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var tag = e.currentTarget.dataset.tag;
    var score = e.currentTarget.dataset.score;
    var time = e.currentTarget.dataset.time;
    var urlid = e.currentTarget.dataset.urlid;
    console.log(name);
     console.log(urlid+"?????????")
    wx.navigateTo({
      url: "../filmDetail2/filmDetail2?name=" + name + "&pic=" + pic + "&tag=" + tag + "&score=" + score + "&time=" + time + "&urlid=" + urlid 
    })
  },
  //查看影院是否被收藏
  ifCinemaCollect: function () {
    var that = this;
    var temp = wx.getStorageSync(that.data.cinemaName);
    if (temp == '') {
      that.setData({
        isFilmFavorite: 0
      })
    } else {
      that.setData({
        isFilmFavorite: 1
      })
    }

    console.log(that.data.isFilmFavorite + "!@#$%^");
   
  },


})