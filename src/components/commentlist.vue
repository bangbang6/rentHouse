<template>
  <div class="commentlist">
    <div class="page-title" v-if='comments.length'>
      评论
    </div>
    <div class="comment"
        v-for='comment in comments' 
        :key='comment.mid'
         >

         <div class="user">
            <div class="username">{{comment.customer.username}}</div>
            <div class="age">{{comment.customer.age}}岁</div>
         </div>
         <div class="time">
             {{comment.time}}
         </div>
         <div class="message">
             {{comment.content}}
         </div>
         <div class="delete" v-if="type=='admin'" @click="deleteC(comment.mid)">删除</div>
    </div>
  </div>
</template>

<script>
import {request} from '../utils/api.js'
import {showModel} from '../utils/model.js'
export default {
  props: ['comments'],
  methods:{
   /*async deleteC(mid){
       let data={
           mid:mid
       }
       let res = await request("http://localhost:8000/message/delete","post",data)
       if(res.code == 0){
            showModel("成功","删除评论成功")
       }
   } */
   deleteC(mid){
       this.$emit('deleteC',mid)
   }
  },
  data(){
      return {
          type:"custom"
      }
  },
  mounted(){
      if(wx.getStorageSync('cid')){
          this.type="custom"
      }else{
          this.type="admin"
      }
      console.log(this.type)
  }
}
</script>

<style lang='scss'>
.commentlist{
    width:750rpx;
    .page-title{
        font-size: 18px;
        color:#EA5416;
        margin-left:40rpx;
        margin-top:10rpx;
    }
    .comment{
        margin-left:50rpx;
        margin-top:20rpx;
        width:710rpx;
        height:160rpx;
        border-top:1px solid #e9e9e9;
        border-bottom:1px solid #e9e9e9;
        position: relative;
        .user{
            position: absolute;
            top:10rpx;
            left:10rpx;
            font-size: 14px;
            display: flex;
            .username{
              margin-right:20rpx;
            }
        }
        .time{
            position: absolute;
            top:10rpx;
            right:40rpx;
            font-size: 14px;
        }
        .message{
            position: absolute;
            left:60rpx;
            top:50rpx;
        }
        .delete{
            position: absolute;
            right:40rpx;
            bottom:10rpx;
            font-size: 14px;
            color:#EA5416;
        }
          
            
    }
    
}


</style>