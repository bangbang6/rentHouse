<!--  -->
<template>
  <div class='whole'>
      <div class="houses" @click="toDetail">
          <div class="left">
              <image class="img" :src="house.pic" mode="scaleToFill" />
          </div>
          <div class="right">
              <div class="title">{{house.address}}</div>
              <div class="row">
                  <div class="housestyle">{{house.huxing}}</div>
                  <div class="housearea">{{house.mianji}}m^2</div>
                  <div class="housedesc">{{house.zhuangxiu}}</div>
              </div>
              <div class="bottom">
                <div class="price">{{house.price}}元/月</div>
                <div class="already">{{already}}</div>
              </div>
               
          </div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex' 
export default {
  components: {},
  props:['house'],


  

  computed: {
      //...mapState(['rentinfos'])
      already(){
          return this.house.examined == 0? "未审核":"已审核"
      }
  },

  mounted: function(){
      console.log("enter booklist")
     // console.log(this.rentinfos)
     
  },
   /*  watch:{
        houses(val,oldval){
            console.log("new",val)
            console.log("old",oldval)
            this.houses = val
        } 
    },*/
  methods: {
    toDetail(){
        console.log('jump')
        //console.log("enter")
        this.$router.push({ path: '/pages/custom_center/house_detail/main', query: { rid: this.house.rid } })
        /* wx.navigateTo({
            url:"/pages/custom_center/house_detail/main"
        }) */
    },
  }
}

</script>
<style lang='scss' scoped>

.houses{
    width:750rpx;
    height:300rpx;
    border:1px solid #e9e9e9;
    font-size: 14px;
    
    .left{
        float: left;
        width:250rpx;
        height:250rpx;
        margin-top:25rpx;
        margin-left:25rpx;
        .img{
             width:250rpx;
            height:250rpx;
        }
    }
    .right{
        float: right;
        width:450rpx;
        margin-left:25rpx;
        height:250rpx;
        margin-top:25rpx;
        position: relative;
        
        .title{
            font-size: 20px;
            letter-spacing: 2px;
            height:130rpx;

        }
        .row{
            width:450rpx;
            display: flex;
            font-size: 16px;
            color:gray;
            
            .housestyle,.housearea,.housedesc{
                    margin-right:16rpx;
            }
           
        }
        .bottom{

            width:100%;
            font-size: 20px;
            color:#EA5149;
            position: absolute;
            bottom:0;
            left:0;
            .price{
                float: left;        
            }
            .already{
                font-size: 20px;
                margin-right:50rpx;
                float: right;
            }
        }
        

        
    }
}
</style>