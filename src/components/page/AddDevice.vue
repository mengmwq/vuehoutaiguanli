<template>
  <div>
    <h5>位置：<span style="color:#3097D1;font-size: 14px;">库存管理&gt设备添加</span></h5>
    <div class="anniu">
      <el-row>
        <el-form :inline="true" class="demo-form-inline" style="display: inline-block" >
          <el-form-item label="设备编号" style="vertical-align: baseline">
            <el-input placeholder="请输入设备编号"  v-model="code" ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="add()" >添加</el-button>
        <el-button type="primary"  @click="searchUser()" >查询</el-button>
        <el-upload
          class="upload-demo"
          action="http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-import"
           multiple
          :show-file-list="false"
          :beforeUpload="beforeAvatarUpload"
          :onError="uploadError"
          :onSuccess="uploadSuccess"
          :file-list="fileList">
          <el-button  type="primary" >导入</el-button>
        </el-upload>
      </el-row>
    </div>


    <!-- 表格 -->
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
        prop="v.code"
        label="设备编号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="v.name"
        label="使用包材">
      </el-table-column>

      <el-table-column
        label="添加时间">
        <template slot-scope="scope">{{ scope.row.v.createtime | formatDate}}</template>
      </el-table-column>

      <el-table-column
        prop="v.company"
        label="所在分公司">
      </el-table-column>
      <el-table-column
        label="箱子寿命截止时间">
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

    <!-- 添加   弹框 -->
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="设备编号" :label-width="formLabelWidth" >
          <el-input v-model="form.code" auto-complete="off"  @blur="testChina(val='添加')" ></el-input>
        </el-form-item>
        <el-form-item label="使用包材" :label-width="formLabelWidth">
          <el-select  v-model="form.name" placeholder="请选择" @blur="testName(val='添加')" >
            <el-option value="">请选择</el-option>
            <el-option value="4L">4L</el-option>
            <el-option value="12L">12L</el-option>
            <el-option value="28L">28L</el-option>
            <el-option value="35L">35L</el-option>
            <el-option value="56L">56L</el-option>
            <el-option value="78L">78L</el-option>
            <el-option value="97L">97L</el-option>
            <el-option value="130L">130L</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属大区" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择"  @blur="testRegion(val='添加')">
            <el-option value="请选择">请选择</el-option>
            <el-option value="华北大区">华北大区</el-option>
            <el-option value="华东大区">华东大区</el-option>
            <el-option value="华南大区">华南大区</el-option>
            <el-option value="华中大区">华中大区</el-option>
            <el-option value="西北大区">西北大区</el-option>
            <el-option value="西南大区">西南大区</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在分公司" :label-width="formLabelWidth">
          <el-select v-model="form.company" placeholder="请选择" @blur="testCompany(val='添加')">
            <el-option value="请选择">请选择</el-option>
            <el-option value="中集冷云北京公司">中集冷云北京公司</el-option>
            <el-option value="中集冷云天津公司">中集冷云天津公司</el-option>
            <el-option value="中集冷云烟台公司">中集冷云烟台公司</el-option>
            <el-option value="中集冷云哈尔滨公司">中集冷云哈尔滨公司</el-option>
            <el-option value="中集冷云长春公司">中集冷云长春公司</el-option>
            <el-option value="中集冷云石家庄公司">中集冷云石家庄公司</el-option>
            <el-option value="中集冷云沈阳公司">中集冷云沈阳公司</el-option>
            <el-option value="中集冷云济南公司">中集冷云济南公司</el-option>
            <el-option value="中集冷云呼和浩特公司">中集冷云呼和浩特公司</el-option>
            <el-option value="中集冷云太原公司">中集冷云太原公司</el-option>
            <el-option value="中集冷云上海公司">中集冷云上海公司</el-option>
            <el-option value="中集冷云南京公司">中集冷云南京公司</el-option>
            <el-option value="中集冷云杭州公司">中集冷云杭州公司</el-option>
            <el-option value="中集冷云合肥公司">中集冷云合肥公司</el-option>
            <el-option value="中集冷云宁波公司">中集冷云宁波公司</el-option>
            <el-option value="中集冷云海口公司">中集冷云海口公司</el-option>
            <el-option value="中集冷云广州公司">中集冷云广州公司</el-option>
            <el-option value="中集冷云厦门公司">中集冷云厦门公司</el-option>
            <el-option value="中集冷云福州公司">中集冷云福州公司</el-option>
            <el-option value="中集冷云深圳公司">中集冷云深圳公司</el-option>
            <el-option value="中集冷云南昌公司">中集冷云南昌公司</el-option>
            <el-option value="中集冷云南宁公司">中集冷云南宁公司</el-option>
            <el-option value="中集冷云武汉公司">中集冷云武汉公司</el-option>
            <el-option value="中集冷云长沙公司">中集冷云长沙公司</el-option>
            <el-option value="中集冷云郑州公司">中集冷云郑州公司</el-option>
            <el-option value="中集冷云兰州公司">中集冷云兰州公司</el-option>
            <el-option value="中集冷云乌鲁木齐公司">中集冷云乌鲁木齐公司</el-option>
            <el-option value="中集冷云西安公司">中集冷云西安公司</el-option>
            <el-option value="中集冷云成都公司">中集冷云成都公司</el-option>
            <el-option value="中集冷云重庆公司">中集冷云重庆公司</el-option>
            <el-option value="中集冷云昆明公司">中集冷云昆明公司</el-option>
            <el-option value="中集冷云贵阳公司">中集冷云贵阳公司</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="截止时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.expire"
            type="date"
            @blur="testExpire(val='添加')"
            placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrder()">确 定</el-button>
      </div>
    </el-dialog>

  </div>



</template>
<script>
  import { formatDate } from "./../../js/data.js";
  export default {
    data() {
      return {
        fileList:[],
        tableData: [],
        currentPage: 1,
        code:'',
        ccc: 0,
        arr: [],
        dialogFormVisible: false,
        formLabelWidth: "100px",
        form: {
          code: '',
          name:'',
          company:'',
          region:'',
          expire:''
        },

      }
    },

    created() {

      this.show(); // 刚进来的时候  请求数据
    },
    methods:{
      testChina(val){
        // 验证  设备编号
        let reg = /^[0-9]+.?[0-9]*$/;
        if(val=='添加'){
          if(this.form.code == ''){
            this.$message('设备编号不能为空');
          } else if(!reg.test(this.form.code)){
            this.$message('设备编号必须为数字');
            this.form.code = '';
          }
        }
      },
      testName(val){
        // 验证  包材


        if(val=='添加'){
          if(this.form.name == ''){
            this.$message('请选择包材');
            this.form.name = '';
          }
        }
      },
      testCompany(val){
        // 验证  所在分公司


        if(val=='添加'){
          if(this.form.company == ''){
            this.$message('请选择所在分公司');

          }
        }
      },
      testRegion(val){
        // 验证  大区


        if(val=='添加'){
          if(this.form.region == ''){
            this.$message('请选择所在大区');

          }
        }
      },
      testExpire(val){
        // 验证  时间
        //this.form.name

        if(val=='添加'){
          if(this.form.expire == ''){
            this.$message('请选择截取时间');
            this.form.expire = '';
          }
        }
      },
      add() {

        this.form.code = '';
        this.form.name ='';
        this.form.company = '';
        this.form.region = '';
        this.form.expire = '';
        this.dialogFormVisible = true
      },

      // 上传成功后的回调
      uploadSuccess (response, file, fileList) {
        let that = this;
        that.$message(response.message);
      },
      // 上传错误
      uploadError (response, file, fileList) {
        let that = this;
        that.$message(response.message);
      },
      // 上传前对文件的大小的判断
      beforeAvatarUpload (file) {
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        if (!extension && !extension2 ) {
          alert('上传模板只能是 xls、xlsx、 格式!')
        }

        return extension || extension2
      },

      handleSelectionChange(val) {
        // 全选 ID
        this.arr = [];
        val.forEach((item,index)=>{
          this.arr.push(item.u_id);
        })
      },
      handleCurrentChange(val) {
        this.arr = [];
        this.currentPage = val;
        this.show();
      },
      searchUser() {
        // 查询
        this.currentPage = 1;
        this.show();
      },
      indexMethod(index) {
        return index * 1+1;
      },
      show(){
        let that = this;


        this.$axios({
          url:"http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-list?vue=true?",
          method:"post",
          data: {
            page: this.currentPage,
            code: this.code,
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
           var counts=res.data.data.data;
           console.log(counts,2)
            var arr = [];
            for (var i in counts) {
              let o={v:counts[i]};
              arr.push(o);
            }
            console.log(arr,1)

            that.tableData = arr;
            that.ccc = Number(res.data.data.count) || 0;

          }else if(res.data.code == "504"){
            that.tableData = res.message;
            that.ccc = Number(res.data.data.count) || 0;
          }
        })
      },

      addOrder(){
        let that = this;
        this.$axios({
          url: "http://www.ccsc58.cc/zjzljkpt/php/public/admin/devicenum-add?vue=true",
          method: "post",
          data: {
            code :   this.form.code,
            name :   this.form.name,

            company :   this.form.company,
            expire :   this.form.expire,
            region :  this.form.region,
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
          if(res.data.code == "201"){
            that.dialogFormVisible = false;
            that.$message("添加成功");
            that.show();
          }else{
            that.$message("添加失败");;

          }
        });

      }


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
.anniu{
  margin: 30px 0px;
}
  .upload-demo{
    display: inline-flex;
  }

</style>
