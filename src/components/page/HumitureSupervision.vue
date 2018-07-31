<template>
<div>
  <h5>位置：<span style="color:#3097D1;font-size: 14px;">温湿度监控</span></h5>
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
  <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
</div>
</template>
<script>

  export default {
    name: 'hello',
    data () {
      return {

      }
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(
          {
            title: {
              text: '保温箱温湿度',
              subtext: '数据来源：传感器实时监测',
              left: 'center',
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {}
              }
            },
            xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
            },
            yAxis: {
              type: 'value',
              axisLabel: {

                formatter: function (value) {
                  var texts = [];
                  if(value==0){
                    texts.push('0');
                  }
                  else if (value <=200) {
                    texts.push('5');
                  }
                  else if (value<= 400) {
                    texts.push('10');
                  }
                  else if(value<= 600){
                    texts.push('15');
                  }
                  else if(value<= 800){
                    texts.push('20');
                  }
                  else if(value<= 1000){
                    texts.push('25');
                  }
                  else{
                    texts.push('30');
                  }
                  return texts;

                }
              },

              axisPointer: {
                snap: true
              }
            },
            visualMap: {
              show: false,
              dimension: 0,
              pieces: [{
                lte: 6,
                color: 'green'
              }, {
                gt: 6,
                lte: 8,
                color: 'red'
              }, {
                gt: 8,
                lte: 14,
                color: 'green'
              }, {
                gt: 14,
                lte: 17,
                color: 'red'
              }, {
                gt: 17,
                color: 'green'
              }]
            },
            series: [
              {
                name:'温度',
                type:'line',
                smooth: true,
                data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],

              },
              {
                name:'湿度',
                type:'line',
                smooth: true,
                data: [500, 180, 250, 280, 270, 300, 520, 500, 450, 380, 380, 360, 40, 50, 680, 750, 820, 770, 60, 200],

              }
            ]
          }
        );
      }
    }
  }


</script>
<style>

</style>
