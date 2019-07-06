<!--  -->
<template>

  <div class="detail">
      <image src='../../../static/images/background.png' class='image' mode='scaleToFit'> </image>
      <div class="top">
          <image  class='img' :src="rentinfo.pic" />
          
      </div>
      <div class="first">
          <div class="address">{{rentinfo.address}}</div>
          <div class="price">{{rentinfo.price}}元/月</div>
      </div>
      <div class="second">
          <div class="wrapper">
                <div class="housestyle">
              <div class="styleinfo">{{rentinfo.huxing}}</div>
              <div class="stylelabel">户型</div>
          </div>
          </div>
          <div class="wrapper">
              <div class="housearea">
              <div class="areainfo">{{rentinfo.mianji}}m^2</div>
              <div class="arealabel">面积</div>
          </div>
          </div>
          <div class="wrapper">
              <div class="housedesc">
              <div class="descinfo">{{rentinfo.zhuangxiu}}</div>
              <div class="desclabel">装修</div>
          </div>
          </div>
          
          

      </div>
      <div class="third">
          <div class="wrap">
              <div class="username">
            <div class="usernamelabel">联系人</div>
            <div class="usernameinfo">{{customer.username}}</div>
          </div>
          </div>
          <div class="wrap">
              <div class="tel">
              <div class="tellabel">电话</div>
            <div class="telinfo">{{customer.tel}}</div>
          </div>
          </div>
          
        
          
      </div>
      <div class="forth" v-if="type == 'custom'">
        <div class="comment">
            <textarea v-model='comment'
                    class='textarea'
                    :maxlength='100'
                    placeholder='请输入图书短评' placeholder-style="padding:4rpx;font-size:14px;"></textarea>
            </div>
            <button class="btn" @click="addComments">
            评论
            </button>
      </div>
      <div class="fifth">
          <commentlist :comments="comments" @deleteC="deleteC"></commentlist>
      </div>
      <div class="pass" v-if="type == 'admin'">
          <buttom class="nbtn" @click="pass" v-if="!hide">审核通过</buttom>
          <div class="pinfo" v-if="hide">已通过</div>
          
      </div>
  </div>
</template>

<script>
import {request} from "../../../utils/api.js"
import {mapState} from "vuex"
import {showModel} from "../../../utils/model.js"
import commentlist from "@/components/commentlist.vue"
export default {
  data () {
    return {
        rid:0,
        rentinfo:{},
        customer:{},
        showAdd:true,
        comment:"",
        comments:[],
        type:"custom",
        hide:false
    };
  },

  components: {
      commentlist
  },

  computed: {

      ...mapState(['customInfo'])
  },

  mounted: function(){
      console.log("enter detail")
      console.log(this.$root.$mp.query.rid)
        this.rid = this.$root.$mp.query.rid
        this.hide=false
        if(wx.getStorageSync('cid')){
            this.type = "custom"
        }else{
            this.type = "admin"
        }
        console.log(this.type)
        this.getDetail()

  },
    
  methods: {
      async getDetail(){
          let data = {
              rid : this.rid
          }
          console.log(this.rid)
          let res = await request("http://localhost:8000/rentinfo/showdetail","post",data)
          if(res.code == 0){
              this.rentinfo = res.rentinfo

              this.hide = this.rentinfo.examined == 1?true:false
              this.customer = res.customer
              this.comments = res.message
              console.log('comments',this.comments)
          }
      },
      async deleteC(mid){
        let data={
           mid:mid+""
       }
       console.log(data)
       let res = await request("http://localhost:8000/message/delete","post",data)
       if(res.code == 0){
            showModel("成功","删除评论成功")
            this.getDetail()
       }
      },
      async addComments(){
          console.log("enter addme")
          let time = this.getNowFormatDate()
          console.log(time)
          let data = {
              time:time,
              cid:this.customInfo.cid+"",
              rid:this.rid+"",
              content:this.comment,
              title:""  

          }
          console.log("cdata",data)
          let res = await request("http://localhost:8000/message/add","post",data)
          if(res.code == 0){
              
              showModel("成功","添加评论成功")
             this.getDetail()
          }
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
        async pass(){
            let data = {
                rid:this.rid
            }
            let res  = await request("http://localhost:8000/rentinfo/examine","post",data)
            if(res.code == 0){
                showModel("成功","已经成功审核")
                
                this.hide=true
                wx.navigateTo({
                    url: '../../admin_center/admin_main/main',
                   
                })
            }
        }
      
  }
}

</script>
<style lang='scss' scoped>
.detail{
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
    .top{
        width:750rpx;
        height:300rpx;
        .img{
            width:750rpx;
            height:300rpx;

        }
    }
    .first{
        margin-left:20rpx;
        font-size: 20px;
        width:710rpx;
        height:150rpx;
        .address{
           
            letter-spacing: 2px;
        }
        .price{
            letter-spacing: 2px;
            color:#EA5149;
            margin-top:20rpx;
        }
    }
    .second{
        margin-left:20rpx;
        width:710rpx;
        height:150rpx;
        border-bottom:1px solid #e9e9e9;
        border-top:1px solid #e9e9e9;
        display: flex;
        .wrapper{
            width:33.3%;
            height:150rpx;
            .housestyle{
                margin:20rpx auto;
                height:110rpx;
                width:150rpx;
                .styleinfo{
                    text-align: center;
                   
                }
                .stylelabel{
                    text-align: center;
                     font-weight: 600;
                    //color:#e9e9e9;
                }
            }
            .housearea{
                margin:20rpx auto;
                height:110rpx;
                width:150rpx;
                .areainfo{
                    text-align: center;
                    
                }
                .arealabel{
                    text-align: center;
                    font-weight: 600;
                    //color:#e9e9e9;
                }
            }
            .housedesc{
                margin:20rpx auto;
                height:110rpx;
                width:150rpx;
                .descinfo{
                    text-align: center;
                    
                }
                .desclabel{
                    text-align: center;
                    font-weight: 600;
                    //color:#e9e9e9;
                }
            }
            
        }
        
    }
    .third{
        display: flex;
        margin-left:20rpx;
        width:710rpx;
        height:140rpx;
        margin-top:40rpx;
        border-bottom:1px solid #e9e9e9;
        border-top:1px solid #e9e9e9;
        .wrap{
            width:50%;
            .username{
                width:80%;
                margin-left:10%;
                margin-top:20rpx;
                height:100rpx;
                .usernamelabel{
                    text-align: center;
                    font-weight: 600;
                }
                .usernameinfo{
                    text-align: center;
                }
           }
           .tel{
                width:80%;
                margin-left:10%;
                margin-top:20rpx;
                height:100rpx;
                .tellabel{
                    text-align: center;
                    font-weight: 600;
                }
                .telinfo{
                    text-align: center;
                }
           }
           
        }
        
    }
    .forth{
        width:650rpx;
        height:300rpx;
        margin-top:50rpx;
         margin-left:50rpx;
         position: relative;
        .comment{
            width:650rpx;
            height:200rpx;
            font-size: 14px;
          
            .textarea{
                height:150rpx;
            }
        }
        .btn{
                position: absolute;
                bottom:0;
                right: 0;
                background-color: #EA5149;
                color:white;
                font-size: 14px;
                width:200rpx;
                line-height:60rpx;
                height:60rpx;
        }
        
    }
    .pass{
        width:650rpx;
        margin-left:50rpx;
        .nbtn{
            background-color: #EA5149;
            color:white;
            font-size: 14px;
            width:200rpx;
            line-height:60rpx;
            height:60rpx;
            float: right;
            text-align: center;
            margin-top:50rpx;
        }
        .pinfo{
            color:#EA5149;
            font-size: 16px;
            width:200rpx;
            line-height:60rpx;
            height:60rpx;
            float: right;
            text-align: center;
            margin-top:50rpx;
        }
    }
}
</style>