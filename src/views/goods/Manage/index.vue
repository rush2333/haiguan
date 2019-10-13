<template>
  <div>
    <div class="manage">
      <span class="nav-title">菜品管理</span>
      <el-divider></el-divider>
      <div class="main">
        <div class="main-header">
          <span class="content-header">名称：</span>
          <el-input v-model="queryForm.goods_name" style="width:120px" placeholder="输入名称"></el-input>
          <!-- <span class="content-header">类型：</span>
          <el-select v-model="queryForm.goods_type" placeholder="选择类型" style="width:150px">
            <el-option
              v-for="item in types_select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>-->
          <span class="content-header">供应商：</span>
          <el-select v-model="queryForm.provider" placeholder="选择供应商" style="width:150px">
            <el-option
              v-for="item in provider_select"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" plain @click="queryList">查询</el-button>
          <el-button type="primary" @click="addCuisine">添加商品</el-button>
          <!-- <el-button type="primary" @click="addCuisine">批量添加商品</el-button> -->
        </div>
        <div class="main-content">
          <el-card :body-style="{ padding:0, }" v-for="(item) in goodsList" :key="item.postID">
            <div class="image">
              <img :src="getImageUrl(item.PicPath)" alt />
            </div>
            <div style="padding: 14px;">
              <ul class="main-title">
                <li class="list">名称:{{item.goods_name}}</li>
                <li class="list">库存:{{item.goods_total}}</li>
                <li class="list">价格:{{item.goods_price}}/{{item.unit}}</li>
                <li class="list">类型:{{item.goods_type}}</li>
                <li class="list">流水号:{{item.postID}}</li>
              </ul>
              <div class="btns">
                <el-button type="danger" plain @click="handleDelete(item)">删除</el-button>
                <el-button type="primary" @click="handleEdit(item)">编辑</el-button>
              </div>
            </div>
          </el-card>
        </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="sum"
          :page-size="5"
          :current-page.sync="page"
          @current-change="fetchList"
          @prev-click="fetchList"
          @next-click="fetchList"
        ></el-pagination>
      </div>
    </div>
    <cuisine-dialog :visible="visible" @closeDialog="closeDialog" @_add="_add" />
    <el-dialog
      :visible.sync="editVisible"
      title="编辑"
      width="40%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form ref="editForm" v-model="editFormdata" :inline="true">
        <el-form-item style="display:block" label="图片">
          <el-upload
            ref="editUpload"
            action="http://ysxt.e-irobot.com:9230/NewConsume_mealticket/Mall_photo.ashx"
            name="photo"
            :file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-change="handleChange"
            :limit="limit"
            :class="{hide:hideUpload}"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="名称" prop="goods_name">
          <el-input v-model="editFormdata.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="goods_total">
          <el-input v-model="editFormdata.goods_total"></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="goods_price">
          <el-input v-model="editFormdata.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="editFormdata.unit"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="goods_type">
          <el-input v-model="editFormdata.goods_type"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CuisineDialog from "./dialog";
import GLOBAL from "@/api/global_variable";
export default {
  data() {
    return {
      visible: false,
      baseUrl: GLOBAL.baseUrl,
      editVisible: false,
      dialogVisible: false,
      uploadVisible: true,
      hideUpload: false,
      limit: 1,
      dialogImageUrl: "",
      newTypeName: "",
      page: 1,
      sum: 10,
      goodsList: [],
      editFormdata: {
        postID: "",
        goods_name: "",
        goods_type: "",
        goods_total: "",
        unit: "",
        PicPath: ""
      },
      queryForm: {
        goods_name: "",
        goods_type: "",
        provider: ""
      },
      fileList: [],
      types_select: [],
      provider_select: []
    };
  },
  components: { CuisineDialog },
  created() {
    this.fetchList(this.page);
    this.getOptions("get_goods_type", "goods_type", this.types_select);
    this.getOptions("get_provider", "provider", this.provider_select);
  },
  methods: {
    fetchList(page) {
      this.page = page;
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", {
          types: "load_mall_default",
          page: page
        })
        .then(res => {
          this.goodsList = res.data.data;
          this.sum = res.data.sum;
        })
        .catch(err => console.log(err));
    },
    getOptions(types, str, select_options) {
      this.$axios
        .get("/NewConsume_mealticket/Mall.ashx", {
          params: {
            types: types
          }
        })
        .then(res => {
          let data = res.data.data;
          data = data.map(item => item[str]);
          data.forEach(e => {
            select_options.push({ label: e, value: e });
          });
        })
        .catch(err => console.log(err));
    },

    queryList() {
      let { goods_type, goods_name, provider } = this.queryForm;
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", {
          types: "load_mall_default",
          goods_name,
          provider,
          page: 1
        })
        .then(res => {
          this.page = 1;
          this.queryForm = {};
          this.goodsList = res.data.data;
        });
    },
    handleEdit(item) {
      this.fileList.push(
        Object.assign(
          {},
          {
            name: `${item.goods_name}.jpg`,
            url: this.getImageUrl(item.PicPath)
          }
        )
      );
      this.hideUpload = true;
      this.editVisible = true;
      this.editFormdata = Object.assign({}, item);
    },

    confirmEdit() {
      Object.assign(this.editFormdata, {
        types: "edit_goods"
      });
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", this.editFormdata)
        .then(res => {
          if (res.data.code == "200") {
            this.$message.success(res.data.msg);
            this.fileList = new Array();
            this.$refs.editUpload.clearFiles();
            this.$refs["editForm"].resetFields();
            this.fetchList(this.page);
            this.editVisible = false;
          } else {
            this.$message.fail(res.data.msg);
          }
        })
        .catch(err => console.log(err));
    },
    handleClose(done) {
      this.fileList = new Array();
      this.editVisible = false;
    },
    closeDialog(val) {
      this.editData = {};
      this.visible = val;
    },

    openNewType() {
      this.newTypeVisible = true;
    },

    addCuisine() {
      this.visible = true;
    },

    _add() {
      this.fetchList(this.page);
    },

    handleClickPage(e) {
      this.page = e;
      this.fetchList(e);
    },
    handleNext(e) {
      this.page = e;
      this.fetchList(e);
    },
    handlePrev(e) {
      this.page = e;
      this.fetchList(e);
    },

    getImageUrl(url) {
      return `${GLOBAL.baseURL}${url.replace(/\\/g, "/")}`;
    },
    handleChange(file, fileList) {
      this.hideUpload = fileList.length >= this.limit;
    },
    handleRemove(file, fileList) {
      this.hideUpload = fileList.length >= this.limit;
    },
    handlePreview(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      this.editFormdata.PicPath = res.data.replace(/\\/g, "\\\\"); //转义url
      console.log(this.editFormdata);
    },

    handleDelete(item) {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/NewConsume_mealticket/Mall.ashx", {
              types: "delete_goods",
              postID: item.postID
            })
            .then(() => {
              this.fetchList(this.page);
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="scss">
.manage {
  .main {
    height: 100%;
    .main-header {
      .el-button {
        margin: 10px;
      }
    }
    .el-pagination {
      position: absolute;
      left: 40%;
    }
    .main-content {
      display: flex;
      width: 100%;
      .main-title {
        font-size: 16px;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .list {
        margin: 10px;
      }
      .list:last-child {
        margin-right: auto;
      }
      .el-card {
        width: 19%;
        margin: 0 10px;
        .time {
          font-size: 13px;
          color: #999;
        }
        .bottom {
          margin-top: 13px;
          line-height: 12px;
        }
        .image {
          width: 100%;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          img {
            width: 100%;
            height: 100%;
          }
          // .imgs {
          //   object-fit: contain;
          // }
        }
        .btns {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          .el-button {
            margin: 5px;
          }
        }
      }
    }
  }
}
</style>