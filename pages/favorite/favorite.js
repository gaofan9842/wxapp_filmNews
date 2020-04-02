// pages/favorite/favorite.js
var filmNullTip = {
tipText: '亲，找不到电影的收藏',
  actionText: '去逛逛',
     routeUrl: '../../pages/movie/movie'
    }
var cinemaNullTip = {
  tipText: '亲，找不到影院的收藏',
  actionText: '去逛逛',
  routeUrl: '../../pages/cinema/cinema'
}

Page({

  /**
   * Page initial data
   */
  data: {
    cinema_favorite: [{
      nameArr: '',
      addressArr: '',
      telArr: '',
      threedArr: '',
      childArr: '',
      parkArr: '',
      detailurlArr: ''
    }],
    //movieid:'',
    currentID:0,
    currentIDCinema:0,
    films: [{
      nameArr:'',
      picArr:'',
      scoreArr:'',
      tagArr:'',
      timeArr:'',
      yearArr:'',
      actorsArr:'',
      movieidArr :''
    }],
    hasMore: true,
    showLoading: true,
    start: 0,
    show: 'films',
    nullTip: filmNullTip,

  

  },
  changeViewType:function(e) {
    var data = e.currentTarget.dataset
    this.setData({
      show: data.type,
      nullTip: data.type == 'films' ? filmNullTip : cinemaNullTip
    })
  },
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var that = this
  
    that.onLoad();
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      currentID: 0,
      films: [{
        nameArr: '',
        picArr: '',
        scoreArr: '',
        tagArr: '',
        timeArr: '',
        yearArr: '',
        actorsArr: ''
      }],
      cinema_favorite: [],
      hasMore: true,
      showLoading: true,
      start: 0,
    })
    that.getDataFromCollectMovie();
    that.getDataFromCollectCinema();
  },


  viewFilmDetail: function (e) {
    var name = e.currentTarget.dataset.name;
    var pic = e.currentTarget.dataset.pic;
    var score = e.currentTarget.dataset.score;
    var tag = e.currentTarget.dataset.tag;
    var time = e.currentTarget.dataset.time;
    var movieid = e.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../favoriteFilm/favoriteFilm?name=' + name + '&pic=' + pic + "&score=" + score + "&tag=" + tag + "&time=" + time + "&movieid=" + movieid
    })
  },

  //测试数据显示
  getDataFromCollectMovie: function () {
    try {
      //  wx.clearStorageSync()
      const res = wx.getStorageInfoSync()
      // console.log("本地缓存数据 :" + res.keys.length)

      if (res.keys.length > 1) {
        for (var i = 1; i <= res.keys.length - 1; i++) {
          var temp = res.keys[i];
          var temp2 = wx.getStorageSync(temp);
          temp2 += '+';
          console.log(temp2);
          console.log(temp2.length);
          if(temp2[0]!='?')continue;
          var cur = 0;
          var str = "";
          var nametemp = "";
          var pictemp = "";
          var scoretemp = "";
          var tagtemp = "";
          var timetemp = "";
          var yeartemp = "";
          var actorstemp = "";
          var movieidtemp = "";
          console.log(temp2[95] + "????");
          for (var p = 1; p <= temp2.length - 1; p++) {
            if (temp2[p] == '+') {//console.log("here!!!"+p+" "+temp2[p]);
              if (cur == 0) {
                nametemp = str;
              } else if (cur == 1) {
                pictemp = str;
              } else if (cur == 2) {
                scoretemp = str;
              } else if (cur == 3) {
                tagtemp = str;
              } else if (cur == 4) {
                timetemp = str;
              } else if (cur == 5) {
                yeartemp = str;
              } else if (cur == 6) {
                actorstemp = str;
              } else { 
                movieidtemp = str;
              }
              cur++;
              str = "";
            } else {
              str += temp2[p];
            }

          }
          var newArr = [{
            nameArr: nametemp,
            picArr: pictemp,
            scoreArr: scoretemp,
            tagArr: tagtemp,
            timeArr: timetemp,
            yearArr: yeartemp,
            actorsArr: actorstemp,
            movieidArr : movieidtemp
          }];
          this.data.films = this.data.films.concat(newArr);
          var that = this;
          that.setData({
            films : that.data.films,
            currentID : that.data.films.length-1
          })
        }
      } else {

      }

    } catch (e) {
      // Do something when catch error
    }
  },

  //测试数据显示
  getDataFromCollectCinema: function () {
    try {
      //  wx.clearStorageSync()
      const res = wx.getStorageInfoSync()
      console.log("本地缓存数据 :" + res.keys.length)

      if (res.keys.length > 1) {
        for (var i = 1; i <= res.keys.length - 1; i++) {
          var temp = res.keys[i];
          var temp2 = wx.getStorageSync(temp);
          temp2 += '+';
          console.log(temp2);
          console.log(temp2.length);
          if (temp2[0] != '&') continue;
          var cur = 0;
          var str = "";
          var nametemp = "";
          var addresstemp = "";
          var teltemp = "";
          var threedtemp = "";
          var childtemp = "";
          var parktemp = "";
          var detailurltemp = "";
          //console.log(temp2[95] + "????");
          for (var p = 1; p <= temp2.length - 1; p++) {
            if (temp2[p] == '+') {
              //console.log("here!!!" + p + " " + temp2[p]);
              if (cur == 0) {
                nametemp = str;
              } else if (cur == 1) {
                addresstemp = str;
              } else if (cur == 2) {
                teltemp = str;
              } else if (cur == 3) {
                threedtemp = str;
              } else if (cur == 4) {
                childtemp = str;
              } else if (cur == 5) {
                parktemp = str;
              } else if (cur == 6) {
                detailurltemp = str;
              } else { }
              cur++;
              str = "";
            } else {
              str += temp2[p];
            }

          }
         
          var newArr = [{
            nameArr: nametemp,
            addressArr: addresstemp,
            telArr: teltemp,
            threedArr: threedtemp,
            childArr: childtemp,
            parkArr: parktemp,
            detailurlArr: detailurltemp
          }];
          this.data.cinema_favorite = this.data.cinema_favorite.concat(newArr);
          console.log("wowowoowowowo"+this.data.cinema_favorite.length);
          var that = this;
          that.setData({
            cinema_favorite: this.data.cinema_favorite,
            currentIDCinema: this.data.cinema_favorite.length 
          })



         for (var q = 0; q <= this.data.cinema_favorite.length - 1; q++) {
           console.log(q+"????????????????" + this.data.cinema_favorite[q].nameArr);
           console.log("????????????????" + this.data.cinema_favorite[q].addressArr);
           console.log("????????????????" + this.data.cinema_favorite[q].telArr);
           console.log("????????????????" + this.data.cinema_favorite[q].threedArr);
           console.log("????????????????" + this.data.cinema_favorite[q].childArr);
           console.log("????????????????" + this.data.cinema_favorite[q].parkArr);
           console.log("????????????????" + this.data.cinema_favorite[q].detailurlArr);
         }

        }
      } else {

      }

    } catch (e) {
      // Do something when catch error
    }
  },


  interSecondTab:function(e){
    var name = e.currentTarget.dataset.name;
    var address = e.currentTarget.dataset.address;
    var tel = e.currentTarget.dataset.tel;
    var threed = e.currentTarget.dataset.threed;
    var child = e.currentTarget.dataset.child;
    var park = e.currentTarget.dataset.park;
    var detailurl = e.currentTarget.dataset.detailurl;
      wx.navigateTo({
        url: '../sec_cinema/sec_cinema?cinemaName=' + name + "&cinemaAddress=" + address + "&cinemaTel=" + tel + "&threeD=" + threed + "&child=" + child + "&park=" + park + "&detailUrl=" + detailurl,
      })
  },
})