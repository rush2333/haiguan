<template>
  <el-dialog
    title="新增材料"
    :visible.sync="isOpen"
    width="25%"
    ref="materialDialog"
    @close="doClose"
    class="materialDialog"
  >
    <el-form
      :rules="rules"
      :model="formdata"
      label-width="80px"
      ref="addMaterialForm"
      center
      title="新增材料"
    >
      <el-form-item label="材料名称">
        <el-input v-model="formdata.name"></el-input>
      </el-form-item>
      <el-form-item label="单价">
        <el-input v-model="formdata.price"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="formdata.unit"></el-input>
      </el-form-item>
      <div class="btn">
        <el-button>取消</el-button>
        <el-button type="primary" @click.native="handleClick">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      formdata: {},
      rules: {},
      isOpen: this.visible
    };
  },
  watch: {
    visible(val) {
      this.isOpen = val;
    }
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  created() {},
  methods: {
    doClose() {
      this.$emit("close", false);
    },
    handleClick() {
      console.log(this.formdata);
      let data = this.formdata;
      Object.assign(data, { c_id: 1 });
      this.$axios
        .post("/material/save", data)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.materialDialog {
  .btn {
    display: flex;
    justify-content: flex-end;
  }
}
</style>