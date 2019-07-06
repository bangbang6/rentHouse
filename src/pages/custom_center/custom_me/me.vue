<!--  -->
<template>
  <div class='me'>
       <image src='../../../static/images/background.png' class='image' mode='scaleToFit'> </image>
      <div class="title">我的资料</div>
       <div class="username">
           <div class='userLabel'> 用户名：</div>
           <input class='text' v-model='username' type='text' placeholder="输入用户名" placeholder-style='font-size:12px;padding:2rpx;' @focus='text_focus' @blur="text_blur" />
       </div>
        
        <div class="tel">
           <div class='userLabel'>电话：</div>
           <input class='text' v-model='tel_value' type='text' placeholder="输入电话"  placeholder-style='font-size:12px;padding:2rpx;' />
       </div>
        <div class="sex">
            <div class='userLabel'> 性别：</div> 
           <input class='text' v-model='sex_value' type='text' placeholder="输入性别"   placeholder-style='font-size:12px;padding:2rpx;'  />
       </div>
        <div class="age">
           <div class='userLabel'> 年龄：</div>
           <input class='text' v-model='age_value' type='text' placeholder="输入年龄"  placeholder-style='font-size:12px;padding:2rpx;'/>
       </div>
       <div class="address">
            <div class='userLabel'> 地址：</div> 
           <input class='text' v-model='address_value' type='text' placeholder="输入地址"  placeholder-style='font-size:12px;padding:2rpx;'/>
       </div>
       <div class="bottom">
            <button class="left" @click="changePassword">修改密码</button>
            <div class="right">
                <button class='btn' @click="submits">提交</button>
            </div>
       </div>
       <div class="bottom">

            <div class="logout">
                <button class='btn' @click="loginout">退出登录</button>
            </div>
       </div>

      <div class="tabbar">
          <div class="house" @click='jumpToHouse'>房屋</div>
          <div class="pub" @click='jumpToPub'>发布</div>
          <div class="me main" >我的</div>
      </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import {request} from '../../../utils/api.js'
import {showModel} from '../../../utils/model.js'
export default {
  data () {
    return {
        username:"",
          
      
      tel_value:"",
      sex_value:"",
      age_value:"",
      address_value:""
        
    };
  },

  components: {},

  computed: {
      ...mapState(['customInfo']),
      
      
  },

  mounted: function(){
      console.log("custom",this.customInfo)
      this.init();
      
  },

  methods: {
      ...mapMutations({changeCustomInfo:"changeCustomInfo"}),
    async submits(){
        console.log(this.sex_value)
        let customInfo =  JSON.parse(JSON.stringify(this.customInfo))
        //console.log(customInfo) 
        //console.log(Object.assign({},{a:1},{b:1}))

       let newCustomInfo = Object.assign({},this.customInfo,{username:this.username_value,tel:this.tel_value,sex:this.sex_value,age:this.age_value,address:this.address_value})
       console.log(newCustomInfo.address)
       if(!this.username || !this.tel_value ||   !this.age_value || !this.address_value){
            console.log('test',newCustomInfo)
            console.log("enter if")
            showModel("提示","信息不能为空")
            return
        }
        //console.log('send')
         
       
        let res = await request("http://localhost:8000/customer/updateInfo",'post',newCustomInfo)
        if(res.code == 0){
            showModel("成功","修改个人信息成功")
             this.changeCustomInfo(res.user)
             this.init()
        } 
    },
    init(){
        this.username = this.customInfo.username
        this.tel_value = this.customInfo.tel
        this.sex_value = this.customInfo.sex
        this.address_value = this.customInfo.address
        this.age_value = this.customInfo.age 
    },
     //
    changePassword(){
        wx.navigateTo({
            url: '../custom_password/main',
           
        })
    },
    loginout(){
        wx.removeStorageSync('cid')
        console.log("退出")
        wx.switchTab({  

          url:'../../custom/signup/main'  

         });  
        
        
    },









      //跳转
      jumpToHouse(){
          wx.navigateTo({
              url:"../custom_house/main",

          })
      },
      jumpToPub(){
          wx.navigateTo({
              url:"../custom_pub/main",

          })
      }
  }
}

</script>
<style lang='scss' scoped>

.me{
    //position: relative;
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
    
   /*  .log{
        margin-top:150rpx;
    } */
    .bottom{
        
        //position: absolute;
        //float:left;
          //margin-top:150rpx;
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
            
        }
        .logout{
            margin-left:450rpx;
            height:60rpx;
            margin-top:350rpx;
            line-height: 60rpx;
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