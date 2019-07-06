<!--  -->
<template>
  <div class="whole">
    
      <div class="houses">
          <houselist v-for="house in houses" :key="house.rid" :house="house"></houselist>
      </div>
      <div class="tabbar" >
          <div  class="house main" >未审核</div>
          <div class="pub" @click='jumpToPub'>已审核</div>
         
      </div>
  </div>
</template>

<script>
import houselist from "@/components/houselist.vue"
import {request} from "../../../utils/api.js"
export default {
  data () {
    return {
        houses:[],
        page:1,
        size:4,
        already:false,
    };
  },

  components: {
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
          this.page = 1;
          this.already = false;
          this.getList(0)
          wx.stopPullDownRefresh()

      }, 
      onReachBottom(){
          console.log("daodibu")
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
        console.log(data)
        console.log("enter center")
        let res =await request("http://localhost:8000/rentinfo/unexamined","post",data)
        console.log('res',res)
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
        if(this.houses.length<this.size){this.already = true}
      }
      
  },
  jumpToPub(){
       wx.navigateTo({
                  url:"../admin_mes/main"
              })
  }
}}

</script>
<style lang='scss' scoped>
.whole{
     .houses{
        overflow-x: hidden;
        overflow-y: auto;
    }
    .tabbar{
        background-color: white;
        display: flex;
        width:750rpx;
        margin: 0;
        padding: 0;
        height:100rpx;
        position: fixed;
        bottom:0;
    
        .house,.pub{
            border:1px solid #e9e9e9;
            width:50%;
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