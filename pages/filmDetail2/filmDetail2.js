Page({
  data: {
    movieid: '',
    name: '',
    picURL: '',
    score: '',
    tag: '',
    time: '',
    urlid:'',
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
      time: options.time,
      score: options.score,
      urlid: options.urlid
    })
    console.log("????" + this.data.picURL)

 

    //从服务器拿数据
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: this.data.urlid,
        tag: '12'
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        that.setData({
          answer: res.data.result,
          answer1:res.data.info[0]
        })
        // console.log(res.data);
        console.log("？？？？？？？？？？"+res.data.info[0]);
        // console.log(res.data.result[0].title);
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



})
