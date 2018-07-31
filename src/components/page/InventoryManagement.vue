<template>
  <div>
    <h5>位置：<span style="color:#3097D1;font-size: 14px;">库存管理</span></h5>
    <el-row type="flex" class="row-bg " justify="space-around" style="margin: 20px 0px;">
      <el-col :span="4"><div class="grid-content bg-purple"><el-card shadow="always" >保温箱总数量 : <h1 style="color:red;text-align: center;margin:20px 0px 0px 0px;">{{ count}}</h1></el-card></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"><el-card shadow="always" >出库数量 : <h1 style="color:red;text-align: center;margin:20px 0px 0px 0px;">{{getCount}}</h1></el-card></div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"><el-card shadow="always" >入库数量 : <h1 style="color:red;text-align: center;margin:20px 0px 0px 0px;">{{outCount}}</h1></el-card></div></el-col>
    </el-row>
   <div v-for="(val, key, index) in  items"  :key="key" >
     <el-row :gutter="24"  class="row-bg " style="margin: 20px 0px 0px 0px;background: #f2f2f2;padding: 20px 0px 0px 10px;"  >
       <el-col :span="16" :lg="14"><div class="grid-content bg-purple">{{key}}</div></el-col>
       <el-col :span="8" :lg="10">
         <div id="bwqR" class="grid-content bg-purple">
           <span>保温箱：{{val.count}}</span>
           <span>入库：{{sons[key].getCount}}</span>
           <span>出库：{{sons[key].outCount}}</span>
         </div>
       </el-col>
     </el-row>
     <div >
       <el-row :gutter="24"  class="row-bg " justify="space-around" style="background: #f2f2f2;margin: 0px;"  >
         <el-col :span="5" :offset="2" :lg="5" v-for="(val2, key2, index) in  val.son"  >
           <div :data_id="key2" @click="sendParams($event)">
             <el-card shadow="always" >
               <div >{{key2}}</div>
               <ul class="lisyt">
                 <li>保温箱：{{val.son[key2].count}}</li>
                 <div v-if="sons[key].son">
                   <div v-if="sons[key].son[key2]==undefined">
                     <li>入库：0</li>
                     <li>出库：0</li>
                   </div>
                   <div v-else-if="((sons[key].son[key2].out!==undefined)&&(sons[key].son[key2].get!==undefined))">
                     <li>入库：{{sons[key].son[key2].get.count}}</li>
                     <li>出库：{{sons[key].son[key2].out.count}}</li>
                   </div>
                   <div v-else-if="((sons[key].son[key2].out==undefined)&&(sons[key].son[key2].get==undefined))">
                     <li>入库：0</li>
                     <li>出库：0</li>

                   </div>
                   <div v-else-if="((sons[key].son[key2].out==!undefined)||(sons[key].son[key2].get==undefined))">
                     <li>出库：{{sons[key].son[key2].out.count}}</li>
                     <li>入库：0</li>
                   </div>
                   <div v-else-if="((sons[key].son[key2].out==undefined)||(sons[key].son[key2].get==!undefined))">
                     <li>入库：{{sons[key].son[key2].get.count}}</li>
                     <li>出库：0</li>
                   </div>
                 </div>
                 <div v-else>
                   <li>入库：0</li>
                   <li>出库：0</li>
                 </div>
               </ul>
             </el-card>
           </div>
         </el-col>
       </el-row>
     </div>
   </div>
  </div>
</template>
<script>
  import axios from "axios"
export default {
  data(){
    return{
      count:'',
      getCount:'',
      outCount:'',
      items:[],
      sonItem:'',
      sons:[]
    }
  },
  created() {
    this.getList();
  },
  methods:{
    sendParams(e){
      this.p_id = e.currentTarget.getAttribute("data_id");
      console.log(   this.p_id);

      let that =this;
      that.$router.push({ name: 'inventoryDetails', params: { p_id: that.p_id }});
    },
    getList(){
      let that = this;
      this.$axios({
        url:"http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-index?vue=true",
        method:"get",
        data: {

        },
        transformRequest: [
          function(data) {
            let ret = "";
            for (let it in data) {
              ret +=
                encodeURIComponent(it) +
                "=" +
                encodeURIComponent(data[it]) +
                "&";
            }
            return ret;
          }
        ],
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      }).then(function(res) {
        console.log(res.data.data.region)
         that.count = res.data.data.zongbu.count;
         that.getCount = res.data.data.zongbu.getCount;
         that.outCount = res.data.data.zongbu.outCount;
         that.items = res.data.data.region.device;
         that.sons =res.data.data.region.record;

      })
    }
  }
}
</script>
<style scoped>
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-card.is-always-shadow{
    background: #EFF4F6;
    margin: 20px 0px;
  }
  #bwqR span{
    margin: 0px 40px;
  }
  .lisyt li{
    margin: 15px 0px 0px 0px;

  }
  ul,li{
    list-style: none;
  }

</style>
