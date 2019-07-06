export function showModel(title,content){
    wx.showModal({
        title,
        content,
        
      })
      
}

export function showToast(title,icon="success"){
    wx.showToast({
        title,
        icon,
        duration: 2000
      })
     
      
}