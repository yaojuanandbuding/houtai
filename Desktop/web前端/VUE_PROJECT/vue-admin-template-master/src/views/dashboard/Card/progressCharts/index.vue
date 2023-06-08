<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
export default {
  name: "",
  mounted() {
    //初始化echarts实例
    let lineharts = echarts.init(this.$refs.charts);
    //配置数据
    lineharts.setOption({
      xAxis: {
        show: false,
        //最小值与最大值设置
         min:0,
         max:100
       
      },
      yAxis: {
        show: false,
         type: "category",
         
      },
      //系列
      series: [
        {
          type: "bar",
          data: [78],
          color:'pink',
          //柱状图的宽度
          barWidth:10,
          color:'yellowgreen',
          //背景颜色的设置
          showBackground:true,
         //设置背景颜色
          backgroundStyle:{
            color:'#eee'
          },
          //文本
          label:{
            show:true,
            // 改变文本内容
            formatter:'|',
            position:'right'
          }
        },
       
      ],
      //布局调式
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style scoped>
.charts {
  width: 100%;
  height: 100%;
}
</style>