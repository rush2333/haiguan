<template>
  <div>
    <div class="details">
      消费明细
      <el-table :data="tableData" style="width: 100%" >
        <el-table-column prop="date" label="消费时间" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="手机号码"></el-table-column>
        <!-- <el-table-column prop="address" label="消费地点"></el-table-column> -->
        <!-- <el-table-column prop="address" label="消费类型"></el-table-column>
        <el-table-column prop="address" label="餐饮"></el-table-column>
        <el-table-column prop="address" label="菜品"></el-table-column>
        <el-table-column prop="address" label="金额"></el-table-column> -->
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
      data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1511 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1512 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1513弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1514 弄'
        }]
      }
    },
   
};
</script>

<style scoped>
.details {
  color: blue;
}
</style>