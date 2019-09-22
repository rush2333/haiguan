<template>
  <div class="details">
    <div class="nav-title">材料价格明细</div>
    <el-divider></el-divider>
    <div class="main">
      <div class="main-header">
        <el-button type="primary" plain style="margin-left:0">查询</el-button>
        <el-button type="primary">导出</el-button>
        <el-button type="primary">批量导入</el-button>
        <el-button type="primary" @click="addMaterial">添加</el-button>
      </div>
      <div class="main-content">
        <el-table style="width:100%; font-size:14px" :data="tableData">
          <el-table-column prop="id" label="序号" width="200px"></el-table-column>
          <el-table-column prop="name" label="材料名称"></el-table-column>
          <el-table-column label="单价/元">
            <template slot-scope="scope">{{scope.row.price}}元/kg</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleClick(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <handle-dialog :visible="visible" ref="materialDialog" @close="closeDialog" />
  </div>
</template>

<script>
import HandleDialog from "./dialog";
export default {
  data() {
    return {
      tableData: [
        {
          id: 5,
          name: "生姜",
          price: 20,
          unit: "kg",
          state: 1,
          create_time: "2019-08-16 10:27:50",
          canteen_id: 6,
          company_id: 3,
          canteen: "饭堂1",
          company: "企业A"
        }
      ],
      visible: false
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    addMaterial() {
      this.visible = true;
    },
    closeDialog(val) {
      this.visible = val
    }
  },
  components: {
    HandleDialog
  }
};
</script>

<style>
</style>