<template>
  <div class="order-sum">
    <div class="main">
      <div class="main-header">
        <div class="nav-title">消费订单汇总查询</div>
        <el-divider></el-divider>
        <div class="select-title">
          <el-form :inline="true" :model="formdata" ref="formdata">
            <el-form-item label="姓名" prop="usr_name">
              <el-input placeholder="请输入姓名" v-model="formdata.usr_name"></el-input>
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
            <el-form-item label="结束时间" prop="update_date">
              <el-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                v-model="formdata.update_date"
                style="width:200px"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="商品名称" prop="goods_name">
              <el-input placeholder="请输入名称" v-model="formdata.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-select v-model="formdata.state" placeholder="请选择状态">
                <el-option
                  v-for="(item,index) in statusOptions"
                  :key="index"
                  :label="item.state"
                  :value="item.state"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryList">查询</el-button>
              <el-button type="primary" @click="changeTypes">导出</el-button>
            </el-form-item>
          </el-form>
          <div class="types-radio">
            <el-radio-group v-model="types" @change="changeTypes">
              <el-radio label="tran_dept_sum">按部门进行汇总</el-radio>
              <el-radio label="tran_name_sum">按姓名进行汇总</el-radio>
              <el-radio label="tran_type_sum">按类型进行汇总</el-radio>
              <el-radio label="tran_goods_sum">按商品进行汇总</el-radio>
              <el-radio label="tran_state_sum">按状态进行汇总</el-radio>
              <el-radio label="tran_provider_sum">按供应商进行汇总</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="main-content">
        <el-table style="width:100%">
          <el-table-column label="序号"></el-table-column>
          <el-table-column label="统计变量"></el-table-column>
          <el-table-column label="下单时间"></el-table-column>
          <el-table-column label="结束时间"></el-table-column>
          <el-table-column label="姓名"></el-table-column>
          <el-table-column label="手机号码"></el-table-column>
          <el-table-column label="部门"></el-table-column>
          <el-table-column label="类型"></el-table-column>
          <el-table-column label="商品名称"></el-table-column>
          <el-table-column label="数量"></el-table-column>
          <el-table-column label="商品总金额(元)"></el-table-column>
          <el-table-column label="备注"></el-table-column>
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
        page: 1
      },
      sum: 10,
      types: "tran_dept_sum",
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
      this.formdata.page = page;
      let data = Object.assign({}, this.formdata, { types: this.types });
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", data)
        .then(res => console.log(res));
    },
    queryList() {
      this.formdata.page = 1;
      let data = Object.assign({}, this.formdata, { types: this.types });
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", data)
        .then(res => {
          console.log(res);
          this.$refs.formdata.resetFields();
        })
        .catch(err => console.log(err));
    },
    getOptions() {
      let status_options = this.$axios.get("/NewConsume_mealticket/Mall.ashx", {
        params: {
          types: "get_order_state"
        }
      });
      let order_type_options = this.$axios.get(
        "/NewConsume_mealticket/Mall.ashx",
        {
          params: {
            types: "get_order_type"
          }
        }
      );
      let department_options = this.$axios.get(
        "/NewConsume_mealticket/Mall.ashx",
        {
          params: {
            types: "get_order_department"
          }
        }
      );
      let status = Promise.all([
        status_options,
        order_type_options,
        department_options
      ]);
      status.then(res => {
        let [a, b, c] = res;
        this.statusOptions = a.data.data;
        this.orderTypeOptions = b.data.data;
        this.departmentOptions = c.data.data;
      });
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
