const app = getApp();
const baseUrl = ""; //这里些 公共的请求路径地址

const requestBase = (component, data, method, application, dataType) => {

  !application ? application = 'application/json' : application;

  !method ? method = "POST" : '';

  return new Promise((resolve, reject) => {
    wx.request({
      url: component,
      data: data,
      method: method,
      success: resolve,
      fail: function(){
        wx.showToast({
          title: "网络错误，请刷新重试！",
          icon: "none",
          mask: true,
        })
        typeof reject == "function" ? reject() : reject;
      },
      header: application,
      dataType: dataType
    })
  })
}
//公共错误处理
const pub_err = (res, transfer, params1, params2, params3,_idx_call) => {
  if (!res.data.state) {
    
    if (res.data.code == 1049) {
      wx.clearStorageSync();
      wxOauth(transfer, params1, params2, params3, _idx_call);
    }else if(res.data.code == 1001){
    }else{
      wx.showToast({
        title: res.data.error, //1056已保存
        icon: "none"
      });
    }
    return;
  }
}

// 全局验证seccionId
const pub_auth = () => {
  var auth = wx.getStorageSync("ouath");
  if (new Date().getTime() - auth.time * 1000 > 0 || !auth) {
    return false;
  } else {
    return true;
  }
}

// 1.获取用户sessionid
const wxOauth = (reslove, params1, params2, params3, _idx_call, reject) => {
  if (pub_auth()) {
    return;
  }
  wx.login({
    success: function(res) {
      console.log(res);
      requestBase(`${baseUrl}wx/oauth`, {
        jscode: res.code
      }).then((res) => {
        pub_err(res);
        if(res.data.state){
          let data = {
            sessionId: res.data.data.sessionId,
            time: res.data.data.time - 1800
          }
          wx.setStorageSync("ouath", data)
        }else{
          if (_idx_call < 2) {
            ++_idx_call
            typeof reslove == "function" ? reslove(params1, params2, params3, _idx_call) : reslove;
          } else {
            wx.showToast({
              title: res.data.error,
              icon: "none"
            });
          }
        }
      }, (res) => {
        typeof reject == "function" ? reject() : reject;
      })
    }
  })
}

// 2. 更新全部用户信息
const wxUpdateUserInfo = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(wxUpdateUserInfo, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/update_user_info`, params).then((res) => {
    pub_err(res, wxUpdateUserInfo, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove() : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}
 
//GET请求 使用示例
// const goodsTypeAll = (reslove, reject, place, _idx_call) => {
//   if (!pub_auth()) {
//     wxOauth(goodsTypeAll, "", reslove, reject, _idx_call)
//   }
//   requestBase(`${baseUrl}goods/type_all`, "", "GET").then((res) => {
//     pub_err(res, goodsTypeAll, "", reslove, reject, _idx_call);
//     typeof reslove == "function" ? reslove(res) : reslove;
//   }, (res) => {
//     typeof reject == "function" ? reject() : reject;
//   })
// }



module.exports = {
  wxOauth,
  wxUpdateUserInfo,//更新个人信息
}