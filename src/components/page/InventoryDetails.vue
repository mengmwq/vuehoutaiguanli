<template>
  <div>
    <h5>位置：<span style="color:#3097D1;font-size: 14px;">库存管理</span></h5>
    <div class="anniu">
      <div style="background: #f2f2f2;padding: 10px 10px;">保温箱库存</div>
     <!-- <el-row style="margin: 20px 0px;">
        <el-form :inline="true" class="demo-form-inline" style="display: inline-block">
          <el-form-item label="时间" style="vertical-align: baseline">
            <el-input placeholder="请输入时间"></el-input>
          </el-form-item>
          <el-form-item label="包材">
            <el-select v-model="value" placeholder="请选择包材">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <el-button type="primary">查询</el-button>
        <el-button type="success">导入</el-button>
      </el-row>-->
    </div>
    <!--表格-->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        :index="indexMethod"
        width="120"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="company"
        label="所属公司"
       >
      </el-table-column>
      <el-table-column
        prop="name"
        label="使用包材">
      </el-table-column>
      <el-table-column
        label="数量">
        <template slot-scope="scope" ><p @click="getUpdate(scope.row)">{{ scope.row.v }}</p></template>
      </el-table-column>
    </el-table>


    <!--    入库出库列表-->
    <el-tabs v-model="activeName" style="margin-top:50px;"@tab-click='clickTab'>
      <el-tab-pane label="出库" name="chuku">
        <div class="anniu">
          <el-row style="margin: 20px 0px;">
            <el-form :inline="true" class="demo-form-inline" style="display: inline-block">
              <el-form-item label="设备编号" style="vertical-align: baseline">
                <el-input placeholder="请输入设备编号"  v-model="code"></el-input>
              </el-form-item>
              <el-form-item label="开始时间" style="vertical-align: baseline">
                <el-date-picker
                  v-model="startTime"
                  type="date"
                  placeholder="请输入开始时间">
                </el-date-picker>

              </el-form-item>
              <el-form-item label="结束时间" style="vertical-align: baseline">
                <el-date-picker
                  v-model="endTime"
                  type="date"
                  placeholder="请输入结束时间">
                </el-date-picker>

              </el-form-item>

            </el-form>

            <el-button type="primary" @click="searchUser()" >查询</el-button>
            <!--<el-button type="success" @click="daochuSearch()">导出</el-button>-->
            <a :href="add_nature" @click.prevent="daochuSearch()">导出</a>
          </el-row>
          <el-table
            border
            ref="multipleTable"
            :data="tableData33"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              type="index"
              width="50"
              :index="indexMethod"
            >
            </el-table-column>

            <el-table-column
              prop="v.code"
              label="设备编号"
            >
            </el-table-column>
            <el-table-column
              prop="v.name"
              label="使用包材"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              label="出库时间">
              <template slot-scope="scope">{{ scope.row.v.time | formatDate}}</template>
            </el-table-column>
            <el-table-column
              prop="v.company"
              label="出库分公司"
              show-overflow-tooltip>
            </el-table-column>

            <el-table-column
              prop="v.wendu"
              label="实时温度"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="v.shidu"
              label="实时湿度"
              show-overflow-tooltip>
            </el-table-column>
            <el-table-column

              label="箱子寿命截至时间"
             >
              <template slot-scope="scope">{{ scope.row.v.expire | formatDate}}</template>
            </el-table-column>
          </el-table>
          <div style="margin:20px 0 0 0;">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="total,prev, pager, next"
              :total="ccc"
            >
            </el-pagination>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="入库" name="ruku">
        <div>
          <div class="anniu">
            <el-row style="margin: 20px 0px;">
              <el-form :inline="true" class="demo-form-inline" style="display: inline-block">
                <el-form-item label="设备编号" style="vertical-align: baseline">
                  <el-input placeholder="请输入设备编号" v-model="code"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" style="vertical-align: baseline">
                  <el-date-picker
                    v-model="startTime"
                    type="date"
                    placeholder="请输入开始时间">
                  </el-date-picker>

                </el-form-item>
                <el-form-item label="结束时间" style="vertical-align: baseline">
                  <el-date-picker
                    v-model="endTime"
                    type="date"
                    placeholder="请输入结束时间">
                  </el-date-picker>

                </el-form-item>
                <!-- <el-form-item label="储存超时">
                   <el-select v-model="formInline">
                     <el-option label="请选择" value=""></el-option>
                     <el-option label="是" value="1"></el-option>
                     <el-option label="否" value="0"></el-option>
                   </el-select>
                 </el-form-item>-->
              </el-form>
              <el-button type="primary"  @click="searchUser()">查询</el-button>
              <el-button type="success" @click="daochuSearch()">导出</el-button>

            </el-row>
            <el-table
              border
              ref="multipleTable"
              :data="tableData33"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                type="index"
                width="50">
              </el-table-column>

              <el-table-column
                prop="v.code"
                label="设备编号"
              >
              </el-table-column>
              <el-table-column
                prop="v.name"
                label="使用包材"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column

                label="入库时间"
              >
                <template slot-scope="scope">{{ scope.row.v.time | formatDate}}</template>
              </el-table-column>
              <el-table-column
                prop="v.company"
                label="入库分公司"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                prop="v.wendu"
                label="实时温度"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="v.shidu"
                label="实时湿度"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column

                label="箱子寿命截至时间"
              >
                <template slot-scope="scope">{{ scope.row.v.expire | formatDate}}</template>
              </el-table-column>
              <!-- <el-table-column
                 prop="StoreTimeout"
                 label="储存超时"
                 show-overflow-tooltip>
               </el-table-column>-->
            </el-table>
          </div>
          <div style="margin:20px 0 0 0;">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="total,prev, pager, next"
              :total="ccc"
            >
            </el-pagination>
          </div>
        </div>

      </el-tab-pane>

    </el-tabs>
    <el-dialog title="设备编号详情" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备编号" >
          <el-input  auto-complete="off" style="width: 150px;" v-model="code"  ></el-input>
          <el-button type="primary"  @click="searchUserBianhao()">查询</el-button>
        </el-form-item>
         <div>
        <div
         >
          <span style="margin: 0px 40px;" v-for="(city,index) in neirong"  :key="index"     >{{city.code}}</span>
         </div>
      </div>


      </el-form>


    </el-dialog>
  </div>

</template>
<script>
  import { formatDate } from "./../../js/data.js";
  export default {
    data() {
      return {
        code:'',
        add_nature: "",
        startTime:'',
        endTime:'',
        activeName: "chuku",
        small: true,
        value: '',
        ccc:0,
        neirong:[],
        tableData :[],
        formInline: '',
        currentPage: 1,
        dialogFormVisible: false,
        nei:'',
        tableData33: [
        ],
        form:{

          code:this.code,


        },
        option2:[],
        multipleSelection: [],
        name:"",
        com:""
      }
    },
    created() {
      this.com = this.$route.params.p_id;
      this.show(); // 刚进来的时候  请求数据
      this.status = '2';
      this.getList();

    },

    methods: {
      getUpdate(rows) {
        this.name = rows.name;
        this.company = rows.company;

        let that  = this;
        this.$axios({
          url:"http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-list?vue=true?",
          method:"post",
          data: {
            company: this.company ,
            name:this.name,
            field:'code',
            code:this.code



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

         that. neirong = res.data.data.data;
          window.sessionStorage.setItem('name',that.name);



          that.  dialogFormVisible = true
        })


      },
      searchUserBianhao(){

//        let name = window.sessionStorage.getItem('name');
//        console.log(this.name,4545);
        let that  = this;
        this.$axios({
          url:"http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-list?vue=true?",
          method:"post",
          data: {
            code: this.code ,
            name:this.name,
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
          console.log(res.data.message)
          if(res.data.code==200){
            that. neirong = res.data.data.data;
          }else if(res.data.code=504){
            that. neirong = res.data.data.data;
              alert("暂无此单号")

          }
        })

      },
      clickTab(tab, event) {
        // 点击  tab
        if(tab.name == 'ruku'){
          this.status = '1';
          this.currentPage = 1;
          this.ccc = 1;
          this.getList();
        }else{

          this.status = '2';

          this.currentPage = 1;
          this.ccc = 1;
          this.getList();
        }

      },
      daochuSearch(){
//        alert(22)
        let url = 'http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-export';
        window.location.href = `${url}?company=${this.com}&status=${this.status}&code=${this.code}&startTime=${this.startTime}&endTime=${this.endTime}`;


      },

      handleCurrentChange(val) {

        this.currentPage = val;
        this.show();
       this.getList();
      },
      searchUser() {
        // 查询
        this.currentPage = 1;
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleBtnClick() {
        this.activeName = "ruku";

      },
      indexMethod(index) {
        return index * 1+1;
      },

      show(){
        let that = this;
//        this.com = that.$route.params.p_id;
        this.$axios({
          url:"http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-statistics?vue=true?",
          method:"post",
          data: {
            company:this.com,

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
          if(res.data.code == '200') {

            var  counts = res.data.data.count;
            var arr  =[];
            console.log(arr,0)
            for (var i in counts) {
              let o={name:i,v:counts[i],company:res.data.data.company};
              arr.push(o);
            }
            console.log(arr,1)
           that.tableData = arr;



          }else if(res.data.code == "504"){


            that.tableData = res.message;


          }


        })
      },

      getList() {
        // 订单问题  展示
        let that = this;
//        let company = that.$route.params.p_id;
        this.$axios({
          url: "http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-recordList",
          method: "post",
          data: {
            page: this.currentPage,
            status: this.status,
            company:this.com,
            code:this.code,
            startTime:this.startTime,
            endTime:this.endTime




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
          if(res.data.code == "200"){
            var counts=res.data.data.data;
            console.log(counts,2)
            var arr = [];
            for (var i in counts) {
              let o={v:counts[i]};
              arr.push(o);
            }
            console.log(arr,1)
            that.tableData33 = arr
            that.ccc = Number(res.data.data.count) || 0;
          }else{
            that.tableData33 = res.message;
            that.ccc = Number(res.data.data.count) || 0;
          }


        });
      },
    },
    filters: {
      formatDate(time) {
        var date = new Date(time * 1000);
        return formatDate(date, "yyyy-MM-dd hh:mm:ss");
      }
    },

  }


</script>
<style scoped="">
  .anniu {
    margin: 30px 0px;
  }
</style>

