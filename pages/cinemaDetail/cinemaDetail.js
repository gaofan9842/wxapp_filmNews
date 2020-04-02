// pages/sec_cinema/sec_cinema.j
Page({

  data: {
    cinemaName: '',
    cinemaAddress: '',
    cinemaTel: '',
    threeD: '',
    child: '',
    park: '',
    id: '',
    detailUrl: '',
    tcl: 0,
    isFilmFavorite: 0,
    idy: 0
  },
  turn_big: function (e) {
    let id = e.target.dataset.id;
    let tcl = e.target.dataset.tcl;
    console.log(id);
    this.setData({
      curNav: id,
      tcl: tcl,
      idy: 1
    })

    console.log("uuuuuu")
  },

  onLoad: function (options) {
    var that = this
    that.setData({
      cinemaAddress: options.address,
      cinemaName: options.name,
      detailUrl: options.url
    })
    console.log(this.data.detailUrl + "??")
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: this.data.detailUrl,
        tag: '11'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          answer: res.data.result,
          answer1: res.data.info[0]
        })

        console.log("???????????????");
        console.log(res.data.result);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })


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
 

})