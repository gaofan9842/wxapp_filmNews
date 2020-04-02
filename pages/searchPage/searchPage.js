Page({
  data: {
    movieid: '',
    name: '',
    picURL: '',
    score: '',
    tag: '',
    maoyanid: '',
    year: '',
    actors: '',
    filmDetail: {},
    showLoading: true,
    showContent: false,
    id: '',
  },
  onLoad: function (options) {
    var that = this
    that.setData({
      name: options.name,
      picURL: options.pic,
      tag: options.tag,
      maoyanid: options.maoyanid,
      score: options.score,
    })
    console.log("????" + this.data.picURL)

  
    //从服务器拿数据
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: this.data.maoyanid,
        tag: '12'
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          answer:res.data.info[0],
          answer3: res.data.result
        })
        console.log(res.data.result);
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
  }


})