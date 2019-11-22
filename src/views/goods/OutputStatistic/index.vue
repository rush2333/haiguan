<template>
  <div class="output">
    <div class="main">
      <div class="main-header">
        <div class="nav-title">进销统计报表</div>
        <el-divider></el-divider>
        <el-form :inline="true" :model="formdata" ref="formdata">
          <el-form-item label="开始">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formdata.in_time"
              style="width:200px"
              type="datetime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="结束">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="formdata.out_time"
              style="width:200px"
              type="datetime"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="供销商">
            <el-select v-model="formdata.provider">
              <el-option
                v-for="(item, index) in providerOptions"
                :key="index"
                :label="item.provider"
                :value="item.provider"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="queryList">查询</el-button>
          <el-button @click="exportExcel">导出</el-button>
        </el-form>
      </div>
      <div class="main-content">
        <!-- <el-card style="width:100%"> -->
        <!-- <div slot="header" class="clearfix">日期：{{this.header}}</div> -->
        <el-table
          :data="tabledata"
          style="width:100%"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column label="供应商" prop="provider"></el-table-column>
          <el-table-column label="名称 " prop="goods_name"></el-table-column>
          <el-table-column
            label="单价(元)"
            prop="goods_price"
          ></el-table-column>
          <el-table-column
            label="总进货量"
            prop="goods_total"
          ></el-table-column>
          <el-table-column label="总销售量" prop="quantity"></el-table-column>
          <el-table-column label="库存量" prop="real_total"></el-table-column>
          <el-table-column
            label="总销售额(元)"
            prop="sales_volume"
          ></el-table-column>
        </el-table>
        <!-- </el-card> -->
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
        in_time: "",
        out_time: "",
        provider: ""
      },
      types: "load_purchase_sale",
      page: 1,
      sum: 1,
      providerOptions: [],
      tabledata: [],
      header: ""
    };
  },

  created() {
    this.fetchList(1);
    this.getProviderOptions();
  },

  methods: {
    fetchList(page) {
      let data = Object.assign({}, this.formdata, {
        types: this.types,
        page: page || this.page
      });
      this.$axios
        .post("/NewJMConsume_Mall/Mall.ashx", data)
        .then(res => {
          this.headers = `${this.$moment(this.formdata.order_date)}——${
            this.formdata.tran_date
          }`;
          this.tabledata = Array.from(res.data.data);
          this.sum = res.data.sum;
        })
        .catch(err => console.log(err));
    },

    queryList() {
      let data = Object.assign({}, this.formdata, {
        types: this.types,
        page: this.page
      });
      this.$axios
        .post("/NewJMConsume_Mall/Mall.ashx", data)
        .then(res => {
          this.tabledata = Array.from(res.data.data);
          this.sum = res.data.sum;
          this.$refs.formdata.resetFields();
        })
        .catch(err => console.log(err));
    },

    exportExcel() {
      this.$axios
        .post(
          "/NewJMConsume_Mall/Mall.ashx",
          Object.assign({}, this.formdata, {
            btn_type: "导出",
            page: this.page,
            types: this.types
          })
        )
        .then(res => {
          window.open(res.data.data);
        })
        .catch(err => console.log(err));
    },

    getProviderOptions() {
      this.$axios
        .get("/NewJMConsume_Mall/Mall.ashx?types=get_ps_provider")
        .then(res => {
          this.providerOptions = Array.from(res.data.data);
          this.providerOptions.unshift({
            provider: "全部"
          });
        })
        .catch(err => console.log(err));
    },

    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    }
  }
};
</script>

<style lang="scss" scoped>
.clearfix {
  text-align: center;
  font-size: 16px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
</style>
