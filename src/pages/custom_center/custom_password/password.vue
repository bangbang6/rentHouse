<!--  -->
<template>
  <div class="main">
      <image src='../../../static/images/background.png' class='image' mode='scaleToFit'> </image>
      <div class='title'>修改密码</div>
       <div class="username">
           <!-- <div class='userLabel'> 用户名：</div> -->
           <input class='text' v-model="old_pass" type='text' placeholder="输入原密码" place-style="font-size:12px;"/>
       </div>
       <div class="password_div">
           <!-- <div class='passwordLabel'> 用户名：</div> -->
           <input class='password' v-model="new_pass" type='password' placeholder="输入新密码"   place-style="font-size:12px;"/>
       </div>
       <div class="tel_div">
           <!-- <div class='passwordLabel'> 用户名：</div> -->
           <input class='tel' type='text' v-model="num" placeholder="输入绑定的手机号" placeholder-class='tel_holder'  place-style="font-size:12px;"/>
       </div>
       <div class="bottom">
           <div class="right"><button class="btn" @click="submits">提交</button></div>
       </div>
  </div>
</template>

<script>
import {request} from "../../../utils/api.js"
import {showModel} from "../../../utils/model.js"
import {mapState,mapMutations} from "vuex"
export default {
  data () {
    return {
        old_pass:"",
        new_pass:"",
        num:""
    };
  },

  components: {},

  computed: {
      ...mapState(['customInfo'])
  },

  mounted: function(){
      console.log(this.customInfo)
  },

  methods: {
      async submits(){
         
          
          console.log(this.old_pass)
          let datas = {
              username:this.customInfo.username,
              password:this.old_pass,
              newpassword:this.new_pass,
              tel:this.num,
          }
          console.log("enter")
          //console.log('data',datas)
          let res = await request("http://localhost:8000/customer/change","post",datas)

          
          if(res.code == 0){
              showModel("成功","密码修改成功")
              wx.navigateTo({
                  url:"../custom_me/main"
              })
          }
      }
  }
}

</script>
<style lang='scss' scoped>
.main{

    width:750rpx;
    font-size:16px;
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
        margin-top:200rpx;
        margin-left:50rpx;
        font-size:20px; 
        font-weight:800;
        padding:10rpx;
        color:#EA5149
    }
    .text{
        margin-top:50rpx;
        margin-left:50rpx;
        border-radius: 10rpx;
        border:1px solid #e9e9e9;
        width:650rpx;
        height:80rpx;
        padding-left: 18rpx;
        letter-spacing: 2rpx;
        //color:#EA5149
    }
    .tel{
        margin-top:50rpx;
        margin-left:50rpx;
        border-radius: 10rpx;
        border:1px solid #e9e9e9;
        width:650rpx;
        height:80rpx;
        padding-left: 18rpx;
        letter-spacing: 2rpx;
        
    }
    .password{
        margin-top:50rpx;
        margin-left:50rpx;
        border-radius: 10rpx;
        border:1px solid #e9e9e9;
        width:650rpx;
        height:80rpx;
        padding-left: 18rpx;
        letter-spacing: 2rpx;
        //color:#EA5149
    }
    .bottom{
        margin-left:50rpx;
        margin-top:50rpx;
        width:650rpx;
        height:100rpx;
        line-height: 100rpx;
        
        .right{
            float: right;
            height:100rpx;
           
            .btn{
                height:60rpx;
                line-height: 60rpx;
                font-size: 14px;
                background-color: #EA5149;
                margin-top:20rpx;
                color:white
            }
        }
        
    }
}
</style>