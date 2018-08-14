//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shareTitle:'真逗喵',//分享title默认值
    videourl:'',//视频地址
    shareImgUrl:''//分享图片地址
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传来的参数地址后赋值
    let currentVideoUlr = options.videourl;
    let currentShareImgUrl = options.shareImg;
    let shareTitle = options.title;
    this.setData({
      shareTitle: shareTitle,
      videourl: currentVideoUlr,
      shareImgUrl: currentShareImgUrl
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
  onShareAppMessage: function (shareObj) {
    let shareVideoUlr = this.data.videourl;
    let shareImgUlr = this.data.shareImgUrl;
    let shareTitle = this.data.shareTitle;
    return {
      title: shareTitle,
      path: '/pages/videoPage/videoPage?videourl=' + shareVideoUlr,
      imageUrl: shareImgUlr
    }
  },
  //返回首页
  goIndex: function(){
    wx.navigateTo({
        url: '../index/index'
    })
  }
})