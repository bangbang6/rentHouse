<!--  -->
<template>
  <div>
      <houselist v-for="house in houses" :house="house" :key="house.rid"></houselist>
  </div>
</template>

<script>
import houselist from "@/components/houselist.vue"
import {mapState} from "vuex"
import {request} from "../../../utils/api.js"
export default {
  data () {
    return {
        page:1,
        size:4,
        houses:[],
        already:false,
    };
  },

  components: {
      houselist
  },

  computed: {
      ...mapState(['customInfo'])
  },

  mounted: function(){
      this.getList()
  },

  methods: {
      async getList(){
          let data = {
              page:this.page+"",
              size:this.size+"",
              cid:this.customInfo.cid+""
          }
        let res = await request("http://localhost:8000/rentinfo/rentinfosbycid","post",data)
        if(res.code == 0){
 console.log(res.list)
            this.houses = res.list
            if(this.houses.length<this.size){this.already = true}
        }
           
        
      },
        onPullDownRefresh(){
          console.log("下拉")
          this.page = 1;
          this.getList()
          wx.stopPullDownRefresh()

      },
      onReachBottom(){
          console.log("daodibu")
          if(!this.already){
            this.page = this.page+1
                    this.getList()
          }
          
      }, 
  }
}

</script>
<style lang='scss' scoped>
</style>