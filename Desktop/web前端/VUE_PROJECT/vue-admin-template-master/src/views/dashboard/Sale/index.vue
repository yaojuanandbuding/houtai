<template>
  <el-card class="box-card" style="margin-top: 10px">
    <div slot="header" class="clearfix">
      <!-- @tab-click="handleClick" -->
      <!-- 头部左侧内容 -->
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visite"></el-tab-pane>
      </el-tabs>
      <!-- 头部右侧内容 -->
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <!--  v-model="value1" -->
        <el-date-picker
        v-model="date"
          class="date"
          type="datetimerange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <!-- 容器 -->
          <div class="charts" ref="charts"></div>
        </el-col>
        <el-col :span="6" class="right1">
                <h3>门店{{title}}排名</h3>
                <ul>
                    <li>
                        <span class="rindex">1</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                        <span class="rindex">2</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                            <span class="rindex">3</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                            <span>4</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                            <span>5</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                            <span>6</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                    <li>
                            <span>7</span>
                        <span>肯德基</span>
                        <span class="rvalue">123456</span>
                    </li>
                </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
//引入echarts
import * as echarts from "echarts";
import dayjs from 'dayjs'
export default {
 data() {
    return {
     activeName: "sale",
     myCharts:null,
     //收集日历的数据
     date:[]
    }
 },
  mounted() {
    //初始化echarts实例
    this.myCharts = echarts.init(this.$refs.charts);
    //配置数据
    this.myCharts.setOption({
        title:{
            text:this.title+'趋势'
        },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220,110,98,167,123,44],
          color:'pink'
        },
      ],
    });
  },
  computed:{
    //计算属性-标题
    title(){
     return this.activeName=='sale'?'销售额':'访问量'
    }
  },
  //监听属性
  watch:{
    title(){
        //重新修改图标的配置数据
        //图标配置数据可以再次修改，如果有新的数值，新的数值，没有新的数值，还是用以前的
        this.myCharts.setOption({
            title:{
                text:this.title+'趋势'
            }
        })
    }
  },
  methods: {
    //本天
    setDay(){
     const day = dayjs().format('YYYY-MM-DD');
     this.date = [day,day]
    },
    setWeek(){
        const start = dayjs().day(1).format('YYYY-MM-DD');
         const end = dayjs().day(7).format('YYYY-MM-DD');
         this.date =[start,end]
    },
    setMonth(){
        const start = dayjs().startOf('month').format('YYYY-MM-DD')
         const end = dayjs().endOf('month').format('YYYY-MM-DD')
         this.date=[start,end]
    },
    setYear(){
        const start = dayjs().startOf('year').format('YYYY-MM-DD')
         const end = dayjs().endOf('year').format('YYYY-MM-DD')
         this.date=[start,end]
    }
  },
};
</script>
<style scoped>
.clearfix {
  position: relative;
  display: flex;
  justify-content: space-between;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
}
.date {
  width: 250px;
  margin: 0 20px;
}
.right span {
  margin: 0 10px;
}
.charts {
  width: 100%;
  height: 300px;
}
.right1 {
    padding:0;
}
.right1 span {
    margin: 0 10px;
}
ul {
    list-style: none;
    width: 100%;
    width: 300px;
    padding: 0;
}
ul li {
    height: 8%;
    margin: 10px 0;
}
.rindex {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: black;
    color: white;
    text-align: center;
}
.rvalue{
    float: right;
}
</style>