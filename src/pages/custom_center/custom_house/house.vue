<!--  -->
<template>
  <div class='house'>
       <image src='../../../static/images/background.png' class='image' mode='scaleToFit'/>
       <div class="houses" >
            <houselist v-for="house in houses" :house="house" :key="house.rid"></houselist>
       </div>
     
      <div class="tabbar" >
          <div  class="house main" >房屋</div>
          <div class="pub" @click='jumpToPub'>发布</div>
          <div class="me"  @click='jumpToMe'>我的</div>
      </div>
  </div>
</template>

<script>
import houselist from "@/components/houselist.vue"
import {request} from "../../../utils/api.js"
import {mapMutations} from "vuex"
export default {
  data () {
    return {
        page:1,
        size:4,
        already:false,
        houses:[
           
        ]
    };
  },
    components:{
        houselist
    },
  

  computed: {
     houseStyle(){
          let height = wx.getSystemInfoSync().windowHeight;
          console.log(height)
          return "height:"+(height-50)+"px"
      }
  },

  mounted: function(){
      this.getList(0)
  },
  onPullDownRefresh(){
          console.log("下拉")
          this.page =1;
            this.already = false;
          this.getList(0)
          wx.stopPullDownRefresh()
  },
     
      
   onReachBottom(){
          console.log("到底部")
          if(!this.already){
            this.page = this.page+1
            this.getList(1)
          }
   },
  methods: {
      
      
   
    async getList(init){
        let data = {
            page:this.page+"",
            size:this.size+""
        }
        let res =await request("http://localhost:8000/rentinfo/rentinfos","post",data)
       if(res.code==0){
          if(init == 0){
              this.houses = res.list
           console.log( this.houses)
           console.log(this.houses[0])
          }else{
              console.log("enter concat")
              this.houses = this.houses.concat(res.list)
          }
        
        
        //this.changRentInfos(this.houses)
        if(this.houses.length<this.size && this.page>0){this.already = true}

        
        
        
    }
    
    },
  

       jumpToMe(){
          wx.navigateTo({
              url:"../custom_me/main",

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
.house{
    //overflow: hidden;
    .houses{
         overflow-x: hidden;
        overflow-y: auto;
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
    .tabbar{
        display: flex;

        background-color: white;
        width:750rpx;
        margin: 0;
        padding: 0;
        height:100rpx;
        position: fixed;
        bottom:0;
        z-index:3;
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