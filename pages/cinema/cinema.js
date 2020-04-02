//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    curNav: 1,
    text:'',
    cinemaName:'',
    cinemaAddress:'',
    cinemaTel:'',
    threeD:'',
    child:'',
    park:'',
  },

onLoad :function(e){

  this.searchAllCinema()
  var that=this;
  wx.getSystemInfo({
    success: function (res) {
      console.log(res.windowHeight)
      var windowheight=res.windowHeight 
      var leftright = windowheight*0.6+750    
      that.setData({
        //windowheight: res.windowHeight,
        leftright: windowheight * 0.6 + 750,
      })
      console.log(leftright)
    },
  });
  
},
interSecondTab: function(e){
  var cinemaName = e.currentTarget.dataset.cinemaname;
  var cinemaAddress = e.currentTarget.dataset.cinemaaddress;
  var cinemaTel = e.currentTarget.dataset.cinematel;
  var threeD = e.currentTarget.dataset.threed;
  var child = e.currentTarget.dataset.child;
  var park = e.currentTarget.dataset.park;
  var detailUrl = e.currentTarget.dataset.detailurl;
// console.log("detailUrl :"+detailUrl);
  wx.navigateTo({
    url: '../sec_cinema/sec_cinema?cinemaName='+cinemaName+"&cinemaAddress="+cinemaAddress+"&cinemaTel="+cinemaTel+"&threeD="+threeD+"&child="+child+"&park="+park+"&detailUrl="+detailUrl,
  })
},


  /* 把点击到的某一项 设为当前curNav   */
  switchRightTab: function (e) {
    let id = e.target.dataset.id;
    console.log(id);
    this.setData({
    curNav: id
    })

 var that = this
    wx.request({
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: id,
        tag : '1'
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
        console.log(res.data);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  },
  getinput :function(res){
    var that = this
    that.setData({
      text : res.detail.value
    })
    //console.log("?????"+this.data.text)
  },
  interResult: function(e){
    //console.log("!!!!"+this.data.text)
    wx.navigateTo({
      url: "../sousuoresult/sousuoresult?text="+this.data.text,
    })
  },
  //搜索天津全部影院
  searchAllCinema: function () {
    var that = this
    console.log(this.data.apiKey+"??????")
    wx.request({
      //url: 'http://localhost:8080/servertestfuck/servertestfuck/servertest',
      url: 'https://gaofan9842.xyz/TestWeb',
      data: {
        message: '1',
        tag : '1'
      },
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          answer: res.data.result
        })
        console.log("????????????????????")
        console.log(res.data);
      },
      fail: function (res) {
        console.log(".....fail.....");
      }
    })
  }

})