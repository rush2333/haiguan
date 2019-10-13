<template>
  <div>
    <div class="details" style="padding: 0 10px;">
      <div class="main">
        <div class="main-header">
          <div class="nav-title">消费明细</div>
          <el-divider></el-divider>
          <div class="select-title">
            <el-form :inline="true" :model="formdata" ref="formdata">
              <el-form-item label="姓名" prop="usr_name">
                <el-input placeholder="请输入姓名" v-model="formdata.usr_name"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="phone_num">
                <el-input placeholder="请输入号码" v-model="formdata.phone_num"></el-input>
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
            </el-form>
          </div>
          <div class="btn-area">
            <el-button type="primary" @click="queryList">查询</el-button>
            <el-button type="primary" @click="exportExcel">导出</el-button>
          </div>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <!-- <el-table-column prop="id" label="序号" width="50"></el-table-column> -->
        <el-table-column label="下单时间">
          <template slot-scope="scoped">
            <span>{{scoped.row.order_date | changeTime("YYYY-MM-DD HH:mm")}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template slot-scope="scoped">
            <span>{{scoped.row.update_date | changeTime("YYYY-MM-DD HH:mm")}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="usr_name" label="姓名" width="80px"></el-table-column>
        <el-table-column prop="phone_no" label="手机号码" width="120px"></el-table-column>
        <el-table-column prop="goods_type" label="类型" width="80px"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="quantity" label="商品数量（斤）" width="100px"></el-table-column>
        <el-table-column prop="money" label="商品金额（元）" width="100px"></el-table-column>
        <el-table-column prop="state" label="状态" width="80px"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
      </el-table>
      <el-pagination
        style="width:100%;text-align:center"
        background
        layout="prev, pager, next"
        :total="sum"
        :page-size="10"
        :current-page="page"
        @current-change="fetchList"
        @prev-click="fetchList"
        @next-click="fetchList"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      formdata: {
        types: "load_order_ask",
        usr_name: "",
        phone_num: "",
        order_date: "",
        update_date: "",
        goods_name: "",
        goods_type: "",
        dept_name: "",
        state: "",
        page: 1
      },
      page: 1,
      sum: 50,
      statusOptions: [],
      departmentOptions: [],
      orderTypeOptions: [],
      goods_type: "",
      dept_name: "",
      state: "",
      tableData: []
    };
  },
  created() {
    this.fetchList(1);
    this.getOptions();
  },
  methods: {
    fetchList(page) {
      this.$axios
        .post(
          "/NewConsume_mealticket/Mall.ashx",
          Object.assign({}, this.formdata, { page: page || 1 })
        )
        .then(res => {
          this.tableData = res.data.data;
          this.page = page;
          this.sum = res.data.sum || 50;
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
    },

    queryList() {
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", this.formdata)
        .then(res => {
          // this.$refs.formdata.resetFields();
          this.tableData = res.data.data;
          this.sum = res.data.sum || 50;
        })
        .catch(err => console.log(err));
    },
    exportExcel() {
      this.$axios
        .post(
          "/NewConsume_mealticket/Mall.ashx",
          Object.assign({}, this.formdata, { btn_type: "导出" })
        )
        .then(res => {
          window.open(res.data.data);
        })
        .catch(err => console.log(err));
    }
  },
  filters: {
    changeTime: function(data, str) {
      return moment(data).format(str);
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  .select-title {
    float: left;
    width: 90%;
    display: flex;
    flex-wrap: wrap;
  }
  .btn-area {
    float: right;
    width: 10%;
    display: flex;
    flex-direction: column;
    display: block;
    .el-button {
      margin-bottom: 20px;
    }
  }
}
</style>