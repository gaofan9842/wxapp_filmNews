// 重力感应参数
var SHAKE_THRESHOLD = 200
var lastUpdate
var x, y, z, lastX, lastY, lastZ
Page({
  data: {
    show:false,
    x: 0,
    y: 0,
    z: 0,
    film: [], //摇中的电影
    films: [], //全部电影列表
    showFilm: false, //是否显示摇中的
    loaded: false, //数据是否载入完成，没有完成不可以摇
    shakeSoundUrl: 'https://static.sesine.com/wechat-weapp-movie/sound/shake.mp3',
    shakeCompleteSoundUrl: 'https://static.sesine.com/wechat-weapp-movie/sound/shakeComplete.wav',
    shakeWelcomeImg: 'https://static.sesine.com/wechat-weapp-movie/images/shake_welcome.png',
    hasMore: true,
    debug: false //显示debug数据
  },
  onLoad: function (options) {
    // 初始化数据
    x = 0, y = 0, z = 0, lastX = 0, lastY = 0, lastZ = 0, lastUpdate = 0;
    var that = this
    wx.getStorage({
      key: 'shakeFilmList',
      success: function (res) {
          // 如果缓存内有数据，则获取数据
          that.setData({
            films: res.data,
            loaded: true
          })
      },
      fail: function () {
        // 如果缓存内无数据，则请求数据
        // that.getData()
        console.log(res.data);
      }
    })
    that.shake() //开启监听重力感应
  },
  shake: function () {
    var that=this
    var that = this
    //摇一摇音效
    this.shakeSound = wx.createAudioContext('shakeSound')
    this.shakeCompleteSound = wx.createAudioContext('shakeCompleteSound')
    // 是否可以摇 5秒钟一次
    var flag = true
    wx.onAccelerometerChange(function (res) {
      if (!that.data.show) {
        return
      }
      else{
      that.setData({
        x: res.x,
        y: res.y,
        z: res.z,
      })
      var time = new Date()
      var curTime = time.getTime()
      if ((curTime - lastUpdate) > 100) {
        var diffTime = curTime - lastUpdate
        lastUpdate = curTime
        x = res.x
        y = res.y
        z = res.z
        var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 10000
        if (speed > SHAKE_THRESHOLD) {
          // 判断数据是否载入和是否在允许的时间（5秒每次间隔）
          if (that.data.loaded && flag) {
            that.shakeSound.play()
            // 随机获取电影
            that.getFilm()
            setTimeout(function () {
              that.shakeCompleteSound.play()
            }, 800)
            flag = false
            setTimeout(function () {
              flag = true
            }, 5000)
          }
        }
       
        lastX = x
        lastY = y
        lastZ = z
      }
    }
    })
  },
  onShow: function () {
    var that = this;
    that.setData({
      show: true
    })
    // wx.onAccelerometerChange(function (e) {
    //   if (!that.isShow) {
    //     return
    //   }
    //   console.log(e.x)
    //   console.log(e.y)
    //   console.log(e.z)
    //   if (e.x > 1 && e.y > 1) {
    //     wx.showToast({
    //       title: '摇一摇成功',
    //       icon: 'success',
    //       duration: 2000
    //     })
    //   }
    // })
  },
  // getData: function () {
  //   var that = this
  //   var start = 0
  //   var count = 250
  //   wx.showToast({
  //     title: '数据加载中',
  //     icon: 'loading',
  //     duration: 10000
  //   })
  //   // 超过10秒关闭载入动画并保存
  //   setTimeout(function () {
  //     done()
  //   }, 10000)
  //   function done() {
  //     that.setData({
  //       loaded: true
  //     })
  //     wx.hideToast()
  //     that.saveData(that.data.films)
  //   }
    
  // },
 
  onUnload: function () {
    var that=this;
    that.setData({
      show:false
    })

  },
  play: function () {
    this.shakeSound.play()
  },
  getFilm: function () {
    var that = this
    var length = that.data.films.length
    var index = that.getRandomNum(0, length - 1)
    that.setData({
      film: that.data.films[index],
      showFilm: true
    })
  },
  getRandomNum: function (min, max) {
    var range = max - min;
    var rand = Math.random();
    var num = min + Math.round(rand * range); //四舍五入
    return num;
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