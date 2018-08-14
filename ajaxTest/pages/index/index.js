//index.js
//获取应用实例
const app = getApp()
// 参数解析hotType为内容类型
// 2---笑话
// 3---图片
// 4---视频
Page({
  data: {
    scrollHeight: 600,
    hotType:4,//内容类型
    pageNumber: 1,//请求的页码
    hotMessagePage:1,//笑话页码
    hotVideoPage:1,//搞笑视频页码
    hotImgPage:1,//搞笑图片页码
    isLoadShow: false,
    hotMessageList: [],//笑话列表
    hotVideoList: [],//搞笑视频列表
    hotImgList: []//搞笑图片列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转至视频详情页面
  gotoVideo: function(event){
    console.log(event)
    let videoUrl = event.currentTarget.dataset.videourl;
    let shareImg = event.currentTarget.dataset.shareimg;
    let title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: '../videoPage/videoPage?videourl=' + videoUrl + '&shareImg=' + shareImg + '&title=' + title
    })
  },
  //请求笑话资源，参数hotType为类型，pageNumber为页码,
  hotMessage: function (hotType, pageNumber){
    let _this = this;
    wx.request({
      url: 'https://www.apiopen.top/satinApi',
      data: { "type": hotType, "page": pageNumber },
      success: function (res) {
        _this.setData({
          isLoadShow: false
        })
        let newData = res.data.data;//新资源
        // console.log(newData)
        // 原有的资源
        // console.log(hotMessageListData)
        // 如果原有的资源长度大于0，则进行拼接，否则，直接覆盖
        switch (hotType){
          case 2: //笑话资源
              let hotMessageListData = _this.data.hotMessageList;
              if (hotMessageListData.length > 0) {
                hotMessageListData = hotMessageListData.concat(newData);
              } else {
                hotMessageListData = newData;
              }
              // 对资源进行赋值
              _this.setData({
                hotMessageList: hotMessageListData
              })
              break;

          case 3://动图资源
              let hotImgListData = _this.data.hotImgList;
              if (hotImgListData.length > 0) {
                hotImgListData = hotImgListData.concat(newData);
              } else {
                hotImgListData = newData;
              }
              // 对资源进行赋值
              _this.setData({
                hotImgList: hotImgListData
              })
              break;
          default://视频资源
              let hotVideoListData = _this.data.hotVideoList;
              if (hotVideoListData.length > 0) {
                hotVideoListData = hotVideoListData.concat(newData);
              } else {
                hotVideoListData = newData;
              }
              // 对资源进行赋值
              _this.setData({
                hotVideoList: hotVideoListData
              })
        }
      }
    })
  },
  //下拉到底部触发加载新资源事件
  loadNewData: function(){
    let currentHotType = this.data.hotType;//当前内容类型
    if(currentHotType == 2){//笑话类型页码
      this.data.hotMessagePage = this.data.hotMessagePage+1;
      this.data.pageNumber = this.data.hotMessagePage;
    } else if (currentHotType == 3){//图片类型
      this.data.hotImgPage = this.data.hotImgPage + 1;
      this.data.pageNumber = this.data.hotImgPage;
    } else if (currentHotType == 3) {//视频类型
      this.data.hotVideoPage = this.data.hotVideoPage + 1;
      this.data.pageNumber = this.data.hotVideoPage;
    }
    let newPageNumber = this.data.pageNumber;//当前类型的页码
    console.log(this.data.hotMessagePage)
     this.hotMessage(currentHotType,newPageNumber);
     this.setData({
       isLoadShow: true
     })
  },
  //切换视频事件
  loadVideo: function(){
    let currentPage = this.data.hotVideoPage;
    //页码初始化，类型切换
    this.setData({
      hotType: 4,
      pageNumber: currentPage
    });
    if(currentPage == 1){
      this.hotMessage(this.data.hotType, currentPage);
    }
  },
  //切换图片事件
  loadImg: function () {
    let currentPage = this.data.hotImgPage;
    //页码初始化，类型切换
    this.setData({
      hotType: 3,
      pageNumber: currentPage
    });
    if (currentPage == 1) {
      this.hotMessage(this.data.hotType, currentPage);
    }
  },
  //切换笑话事件
  loadMessage: function () {
    let currentPage = this.data.hotMessagePage;
    //页码初始化，类型切换
    this.setData({
      hotType: 2,
      pageNumber: currentPage
    });
    if (currentPage == 1) {
      this.hotMessage(this.data.hotType, currentPage);
    }
  },
  //进入页面加载事件
  onLoad: function () {
    let _this = this;
    // 获取手机宽度高度
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res);
        // 可使用窗口宽度、高度
        // console.log('height=' + res.windowHeight);
        // console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        _this.setData({
          scrollHeight: res.windowHeight*2-80+'rpx'
        })
      }
    })
    //加载默认类型内容
    this.hotMessage(this.data.hotType,1,false);
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }

})
