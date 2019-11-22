<template>
  <div class="order-sum">
    <div class="main">
      <div class="main-header">
        <div class="nav-title">消费订单汇总查询</div>
        <el-divider></el-divider>
        <div class="select-title">
          <el-form :inline="true" :model="formdata" ref="formdata">
            <el-form-item label="姓名" prop="usr_name">
              <el-input
                placeholder="请输入姓名"
                v-model="formdata.usr_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="goods_type">
              <el-select v-model="formdata.goods_type" placeholder="请选择类型">
                <el-option
                  v-for="(item, index) in orderTypeOptions"
                  :key="index"
                  :label="item.goods_type"
                  :value="item.goods_type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="dept_name">
              <el-select v-model="formdata.dept_name" placeholder="请选择部门">
                <el-option
                  v-for="(item, index) in departmentOptions"
                  :key="index"
                  :label="item.dept_name"
                  :value="item.dept_name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开始时间" prop="order_date">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formdata.order_date"
                style="width:200px"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="tran_date">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formdata.tran_date"
                style="width:200px"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input
                placeholder="请输入名称"
                v-model="formdata.goods_name"
              ></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="formdata.state" placeholder="请选择状态">
                <el-option
                  v-for="(item, index) in statusOptions"
                  :key="index"
                  :label="item.state"
                  :value="item.state"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryList">查询</el-button>
              <el-button type="primary" @click="exportExcel">导出</el-button>
            </el-form-item>
          </el-form>
          <div class="types-radio">
            <el-radio-group v-model="formdata.sum_order" @change="changeTypes">
              <el-radio label="dept_name">按部门进行汇总</el-radio>
              <el-radio label="usr_name">按姓名进行汇总</el-radio>
              <el-radio label="goods_type">按类型进行汇总</el-radio>
              <el-radio label="goods_name">按商品进行汇总</el-radio>
              <el-radio label="state">按状态进行汇总</el-radio>
              <el-radio label="provider">按供应商进行汇总</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="main-content">
        <el-table style="width:100%" :data="tableData">
          <!-- <el-table-column label="序号"></el-table-column> -->
          <!-- <el-table-column label="统计变量" prop="" ></el-table-column> -->
          <el-table-column label="下单时间" prop="order_date"></el-table-column>
          <el-table-column label="结束时间" prop="tran_date"></el-table-column>
          <el-table-column label="姓名" prop="usr_name"></el-table-column>
          <el-table-column label="手机号码" prop="phone_no"></el-table-column>
          <el-table-column label="部门" prop="dept_name"></el-table-column>
          <el-table-column label="类型" prop="goods_type"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column label="数量" prop="quantity"></el-table-column>
          <el-table-column
            label="商品总金额(元)"
            prop="money"
          ></el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
        <el-pagination
          style="width:100%;text-align:center"
          background
          layout="prev, pager, next"
          :total="sum"
          :page-size="10"
          :current-page="this.formdata.page"
          @current-change="fetchList"
          @prev-click="fetchList"
          @next-click="fetchList"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        usr_name: "",
        order_date: "",
        tran_date: "",
        goods_type: "",
        dept_name: "",
        state: "",
        goods_name: "",
        page: 1,
        types: "load_tran_info",
        sum_order: "dept_name"
      },
      tableData: [],
      sum: 10,
      orderTypeOptions: [],
      departmentOptions: [],
      statusOptions: []
    };
  },
  created() {
    this.fetchList(1);
    this.getOptions();
  },
  methods: {
    changeTypes() {
      this.fetchList(1);
    },
    fetchList(page) {
      this.formdata.page = page ? page : 1;
      const data = this.formdata;
      this.$axios
        .post("/NewJMConsume_Mall/Mall.ashx", data)
        .then(res => {
          this.tableData = Array.from(res.data.data);
          this.sum = res.data.sum;
        })
        .catch(err => console.log(err));
    },
    queryList() {
      this.formdata.page = 1;
      const data = this.formdata;
      this.$axios
        .post("/NewJMConsume_Mall/Mall.ashx", data)
        .then(res => {
          this.sum = res.data.sum;
          this.tableData = Array.from(res.data.data);
          this.$refs.formdata.resetFields();
        })
        .catch(err => console.log(err));
    },
    getOptions() {
      let status_options = this.$axios.get("/NewJMConsume_Mall/Mall.ashx", {
        params: {
          types: "get_order_state"
        }
      });
      let order_type_options = this.$axios.get("/NewJMConsume_Mall/Mall.ashx", {
        params: {
          types: "get_order_type"
        }
      });
      let department_options = this.$axios.get("/NewJMConsume_Mall/Mall.ashx", {
        params: {
          types: "get_order_department"
        }
      });
      let status = Promise.all([
        status_options,
        order_type_options,
        department_options
      ]);
      status.then(res => {
        let [a, b, c] = res;
        this.statusOptions = Array.from(a.data.data);
        this.statusOptions.unshift({
          state: "全部"
        });
        this.orderTypeOptions = Array.from(b.data.data);
        this.orderTypeOptions.unshift({
          goods_type: "全部"
        });
        this.departmentOptions = Array.from(c.data.data);
        this.departmentOptions.unshift({
          dept_name: "全部"
        });
      });
    },
    exportExcel() {
      this.$axios
        .post(
          "/NewJMConsume_Mall/Mall.ashx",
          Object.assign({}, this.formdata, { btn_type: "导出" })
        )
        .then(res => {
          window.open(res.data.data);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.types-radio {
  display: flex;
  justify-content: space-around;
}
</style>
