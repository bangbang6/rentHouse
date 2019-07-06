<!--  -->
<!--  -->
<template>
  <div class='publish'>
      <image src='../../../static/images/background.png' class='image' mode='scaleToFit'> </image>
      <div class="title">发布房屋</div>
       <div class="username">
           <div class='userLabel'> 房型：</div>
           <input class='text' v-model='housestyle' type='text' placeholder="x室x厅" placeholder-style='font-size:12px;padding:2rpx;' @focus='text_focus' @blur="text_blur" />
       </div>
        
        <div class="tel">
           <div class='userLabel'>房屋面积</div>
           <input class='text' v-model='housearea' type='text' placeholder="单位(m^2)"  placeholder-style='font-size:12px;padding:2rpx;' />
       </div>
        <div class="sex">
            <div class='userLabel'> 装修情况</div> 
           <input class='text' v-model='housedec' type='text' placeholder="是否装修"   placeholder-style='font-size:12px;padding:2rpx;'  />
       </div>
        <div class="age">
           <div class='userLabel'> 出租价格</div>
           <input class='text' v-model='houseprice' type='text' placeholder="输入价格"  placeholder-style='font-size:12px;padding:2rpx;'/>
       </div>
       <div class="address">
            <div class='userLabel'> 房屋地址</div> 
           <input class='text' v-model='houseaddress' type='text' placeholder="输入地址"  placeholder-style='font-size:12px;padding:2rpx;'/>
       </div>
       <div class="pic">
            <button class='btn' @click="updateImg"> 上传图片</button> 
           <image :src="imageSrc" class='img' mode = "scaleToFill" @click='preview'/>
       </div>
       <div class="bottom">
            <!-- <button class="left" @click="resets">重置</button> -->
            <div class="right">
                <button class='btn' @click="submits">提交</button>
            </div>
       </div>
       <div class="bottom">
            <!-- <button class="left" @click="resets">重置</button> -->
            <div class="right">
                <button class='btn' @click="toMyhouse">已发布</button>
            </div>
       </div>
      <div class="tabbar">
          <div class="house" @click='jumpToHouse'>房屋</div>
          <div class="pub main" >发布</div>
          <div class="me" @click='jumpToMe'>我的</div>
      </div>
  </div>
</template>

<script>
import {request} from "../../../utils/api.js" 
import {showModel} from "../../../utils/model.js"
import {mapState} from "vuex"
export default {
  data () {
    return {
        housestyle:"",
        housearea:"",
        housedec:"",
        houseprice:"",
        houseaddress:"",
        imageSrc:"",

    };
  },

  components: {},

  computed: {
      ...mapState(['customInfo'])
  },

  mounted: function(){},

  methods: {
        resets(){
            this.housestyle = "";
            this.housearea = '';
            this.housedec = "";
            this.houseprice = "";
            this.houseaddress = ""
        },
        getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        },
        async submits(){
            
            let cid=this.customInfo.cid
        
            console.log("cid",cid)
            let time =this.getNowFormatDate()
            console.log(time)
            console.log('enter')
                let data = {
                    huxing:this.housestyle,
                    mianji:this.housearea,
                    zhuangxiu:this.housedec,
                    price:this.houseprice,
                    address:this.houseaddress,
                    time,
                    cid,
                    pic:this.imageSrc
                }
                console.log(data)
                let res = await request("http://localhost:8000/rentinfo/add","post",data)
                if(res.code == 0){
                    showModel("成功","发布房屋成功")
                    this.resets()
                }
        },
  
        updateImg(){
         wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: res => {
            wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })  
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                let tempFilePaths = res.tempFilePaths;
                this.imageSrc = tempFilePaths[0]
        
            }
        })
    },
    preview(){
        wx.previewImage({
            current: this.imageSrc, // 当前显示图片的http链接
            urls: [this.imageSrc] // 需要预览的图片http链接列表
            })
    },
    toMyhouse(){
        wx.navigateTo({
            url:"../custom_already/main"
        })
    },







       jumpToMe(){
          wx.navigateTo({
              url:"../custom_me/main",

          })
      },
      jumpToHouse(){
          wx.navigateTo({
              url:"../custom_house/main",

          })
      }
  }
}

</script>
<style lang='scss' scoped>
.publish{
      .image{
        //filter:blur(5px);
        z-index:-1;
        position: fixed;
        top:0;
        bottom: 0;
        left:0;
        right:0;
        height:100%;
    }
    .title{
        font-size: 20px;
        font-weight:800;
        color:#EA5149;
        padding-left: 18rpx;
        margin-top:50rpx;
         margin-left:50rpx;
         height:60rpx;
         line-height: 60rpx;
    }
    input:focus{
        border:1px solid #EA5149;
        outline: 1px solid #EA5149;
    }
    .pic{
        width:750rpx;
        height:300rpx;
        .btn{
            float: left;
            margin-top:60rpx;
            height:100rpx;
            line-height: 100rpx;
            background-color:#EA5149;
            color:white;
             font-size: 14px;
             letter-spacing:2rpx;
             padding-left:18rpx;
             width:200rpx;
             margin-left:50rpx;
        }
        .img{
            margin-top:50rpx;
            width:350rpx;
            height:100rpx;
            border: 1px solid #e9e9e9;
            float: right;
            margin-right:50rpx;

        }
    }
    .username,.tel,.sex,.age,.address{
        width:750rpx;
        height:60rpx;
        .userLabel{
            float: left;
            font-size: 14px;
            letter-spacing: 2rpx;
            padding-left: 18rpx;
            color:#EA5149;
            height:60rpx;
            line-height: 60rpx;
            margin-top:50rpx;
            margin-left:50rpx;
        }
        .text{
            margin-top:50rpx;
            margin-right:50rpx;
            border-radius: 10rpx;
            float:right;
            //border:1px solid #e9e9e9;
            width:500rpx;
            height:60rpx;
            padding-left: 18rpx;
            font-size:14px;
            letter-spacing: 2rpx;
            //color:#EA5149
        }
        .test_holder{
                color:#EA5149;
                font-size:7rpx;
        }
    }
    .bottom{
        
        //position: absolute;
        //float:left;
      
        margin-left:50rpx;
        margin-right:50rpx;
        height:60rpx;
        line-height: 60px;
        .left{
            float: left;
            margin-top:60rpx;
            height:60rpx;
            line-height: 60rpx;
            background-color:#EA5149;
            color:white;
             font-size: 14px;
             letter-spacing:2rpx;
             padding-left:18rpx;
             width:200rpx;

        }
        .right{
            float: right;
            margin-top:60rpx;
            margin-right: 10px;
        }
        .btn{
             height:60rpx;
            line-height: 60rpx;
            background-color:#EA5149;
            color:white;
            width:200rpx;
            font-size:14px;
        }
    }
    .tabbar{
        display: flex;
        width:750rpx;
        margin: 0;
        padding: 0;
        height:100rpx;
        position: fixed;
        bottom:0;
        .house,.me,.pub{
            border:1px solid #e9e9e9;
            width:33.3%;
            text-align: center;
            line-height: 100rpx;
            font-size:14px;
            //color: #EA5149
        }
        .main{
            color: #EA5149
        }
    }
}

</style>