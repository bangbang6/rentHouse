import {showModel} from "./model.js"
export function request(url,method,data={}){
   return new Promise((resolve,reject)=>{
    wx.request({
        url,
        data,
        method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
            console.log(res.data.code)
            if(res.data.code==0){
                resolve(res.data)
            }else{
                showModel("失败",res.data.msg)
                reject(res.data)
            
            }
        }
       
    })
   })
}