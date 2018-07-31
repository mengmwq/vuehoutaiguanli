<template>
  <div>
    <h5>位置：<span style="color:#3097D1;font-size: 14px;">设备跟踪</span></h5>
    <el-row style="margin: 20px 0px;">
      <el-form :inline="true" class="demo-form-inline" style="display: inline-block">
        <el-form-item label="设备编号" style="vertical-align: baseline">
          <el-input placeholder="请输入设备编号"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" style="vertical-align: baseline">
          <el-input placeholder="请输入开始时间"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" style="vertical-align: baseline">
          <el-input placeholder="请输入结束时间"></el-input>
        </el-form-item>

      </el-form>

      <el-button type="primary">查询</el-button>

    </el-row>
  </div>
</template>
<script>

</script>
<style>

</style>
