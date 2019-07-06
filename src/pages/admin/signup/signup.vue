<!--  -->
<template>
  <div class='login'>
       <image src='../../../static/images/background.png' class='image' mode='scaleToFit'> </image>
      <div class='title'>注册</div>
       <div class="username">
           <!-- <div class='userLabel'> 用户名：</div> -->
           <input :class='text' v-model="username" type='text' placeholder="输入用户名" placeholder-class='test_holder' @focus='text_focus' @blur="text_blur" />
       </div>
       <div class="password_div">
           <!-- <div class='passwordLabel'> 用户名：</div> -->
           <input :class='password' v-model="pass" type='password' placeholder="输入密码" placeholder-class='password_holder' @focus='password_focus' @blur="password_blur"/>
       </div>
       <div class="tel_div">
           <!-- <div class='passwordLabel'> 用户名：</div> -->
           <input :class='tel' type='text' v-model="num" placeholder="手机号" placeholder-class='tel_holder' @focus='tel_focus' @blur="tel_blur"/>
       </div>
       <div class="info">
        <div class="left" @click='jumpToReg'>已有账号?去登陆</div>   
        <div class="right"><button class='btn' @click='register' >注册</button></div>   
        </div> 
  </div>
</template>

<script>
import {request} from '../../../utils/api.js'
import {showToast,showModel} from "../../../utils/model.js"
import {mapState,mapMutations} from 'vuex'

export default {
  data () {
    return {
        
        text:"text",
        password:"password",
        tel:"tel",
        username:"",
        pass:"",
        num:"",
        repeat:true
    };
  },

  components: {},

  computed: {},

  mounted: function(){},

  methods: {
      ...mapMutations({changeAdminInfo:"changeAdminInfo"}),
       text_focus(e){
          //console.log(1)
          this.text = "focus"
            
      },
      
      async text_blur(e){
          this.text =  "text"
          //console.log('value',this.username)
          //检测用户名重复吗？
          if(!this.username) return 
          //console.log('promise',request("http://localhost:8000/admin/confirm","post",{username:this.username}))
          let res = request("http://localhost:8000/admin/confirm","post",{username:this.username})
           //console.log("userInfo",res)
           console.log(res)
           /* if(res.code == -1){
               repeat = false
               showToast("用户名已存在")
            }  */
   
      },
      password_focus(){
            this.password = "focus"
      },
      password_blur(){
            this.password =  "text"
      },
    tel_focus(){
            this.tel = "focus"
      },
      tel_blur(){
            this.tel =  "tel"
      },
      async register(){
         // console.log('enter')
          if(!this.username || !this.pass || !this.num || !this.repeat){
              showModel("失败","信息填写不正确")
              return
          }
          //console.log("注册额")
          console.log( 'username',this.username)
          let res =await request("http://localhost:8000/admin/signup","post",{
              username:this.username,
              password:this.pass,
              tel:this.num
          })
          console.log("userInfo",res)
          if(res.code==0){
              wx.setStorageSync('aid', res.user.aid)
               this.changeAdminInfo(res.user)
               wx.navigateTo({
                   url: '../../admin_center/admin_main/main',
                   
               })

          }/* else{
              showToast("failed")
          } */
        //console.log("userInfo",res)

          
      },

      jumpToReg(){
          console.log(1)
          wx.navigateTo({
            url:"../login/main"
            })
      }
      
  }
}

</script>
<style lang='scss' scoped>
.login{
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
    .focus{
        margin-top:50rpx;
        margin-left:50rpx;
        border-radius: 10rpx;
        border:1px solid #EA5149;
        width:650rpx;
        height:80rpx;
        padding-left: 18rpx;
        letter-spacing: 2rpx;
        //color:#EA5149
    }
    .tel_holder{
        margin-left: 6rpx;
        letter-spacing: 2rpx;
    }
    .test_holder{
        margin-left: 6rpx;
        letter-spacing: 2rpx;
        //color:#EA5149
    }
    .password_holder{
        margin-left: 6rpx;
        letter-spacing: 2rpx;
        //color:#EA5149
    }
    .info{
        margin-left:50rpx;
        margin-top:50rpx;
        width:650rpx;
        height:100rpx;
        line-height: 100rpx;
        .left{
            float: left;
            color:#EA5149
        }
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