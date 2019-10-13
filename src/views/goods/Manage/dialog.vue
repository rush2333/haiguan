<template>
  <el-dialog title="菜品管理" :visible.sync="isOpen" class="diaForm" width="45%" @close="handleClose">
    <el-form
      ref="cuisineManageForm"
      :model="formdata"
      :rules="rules"
      :inline="true"
      label-width="80px"
    >
      <el-form-item label="菜品名称" prop="goods_name">
        <el-input type="text" v-model="formdata.goods_name"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="goods_type">
        <el-input type="text" v-model="formdata.goods_type"></el-input>
      </el-form-item>
      <el-form-item label="供应商" prop="provider">
        <el-input type="text" v-model="formdata.provider"></el-input>
      </el-form-item>
      <el-form-item label="供应数量" prop="goods_total">
        <el-input type="text" v-model="formdata.goods_total"></el-input>
      </el-form-item>
      <el-form-item label="菜品单价" prop="goods_price">
        <el-input type="text" v-model="formdata.goods_price"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input type="text" v-model="formdata.unit"></el-input>
      </el-form-item>
      <el-form-item label="预定时间" style="width:100%" prop="date1">
        <el-date-picker
          v-model="formdata.date1"
          type="datetimerange"
          :picker-options="pickerBeginDateBefore"
          :default-time="['12:00:00', '12:00:00']"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="提货时间" style="width:100%" prop="date2">
        <el-date-picker
          v-model="formdata.date2"
          :default-time="['12:00:00', '12:00:00']"
          :picker-options="pickerBeginDateBefore"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="图片" prop="img_url">
        <div class="imgs">
          <el-upload
            action="http://ysxt.e-irobot.com:9230/NewConsume_mealticket/Mall_photo.ashx"
            list-type="picture-card"
            ref="addUpload"
            name="photo"
            :limit="limit"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleClick">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { isArray } from "util";
export default {
  props: {
    visible: {
      type: Boolean
    },
    editData: Object
  },
  data() {
    return {
      value: "",
      formdata: {
        goods_type: "",
        date1: null,
        date2: null,
        goods_name: "",
        provider: "",
        PicPath: "",
        goods_total: "",
        unit: ""
      },
      rules: {},
      isOpen: this.visible,
      dialogVisible: false,
      dialogImageUrl: "",
      limit: 1,
      pickerBeginDateBefore: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        }
      }
    };
  },
  watch: {
    visible(val) {
      this.isOpen = val;
    }
  },
  methods: {
    handleClick() {
      let book_start, book_end, getgoods_start, getgoods_end;
      let isDate1 = isArray(this.formdata.date1);
      let isDate2 = isArray(this.formdata.date2);
      book_start = isDate1
        ? this.$moment(this.formdata.date1[0]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      book_end = isDate1
        ? this.$moment(this.formdata.date1[1]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      getgoods_start = isDate2
        ? this.$moment(this.formdata.date2[0]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      getgoods_end = isDate2
        ? this.$moment(this.formdata.date2[1]).format("YYYY-MM-DD hh:mm:ss")
        : "";
      Object.assign(this.formdata, {
        types: "add_goods",
        book_start,
        book_end,
        getgoods_start,
        getgoods_end
      });
      this.$axios
        .post("/NewConsume_mealticket/Mall.ashx", this.formdata)
        .then(res => {
          if (res.data.code == "200") {
            this.handleClose();
            this.$message.success(res.data.msg);
            this.$refs.addUpload.clearFiles();
            this.$refs["cuisineManageForm"].resetFields();
            this.$emit("_add");
          }
        })
        .catch(err => console.log(err));
    },
    handleClose() {
      this.$emit("closeDialog", false);
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(res, file, fileList) {
      this.formdata.PicPath = res.data.replace(/\\/g, "\\\\"); //转义url
    }
  }
};
</script>

<style lang="scss" scoped>
.el-select {
  margin: 0 20px 10px 40px;
}
.imgs {
  height: 150px;
  width: 100%;
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>