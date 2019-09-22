<template>
  <el-dialog title="菜品管理" :visible.sync="visible" class="diaForm" width="40%">
    <el-form ref="cuisineManageForm" :model="formdata" :rules="rules" label-width="80px">
      <el-form-item label="菜品名称">
        <el-input type="text" v-model="formdata.name"></el-input>
      </el-form-item>
      <el-form-item label="菜品单价">
        <el-input type="text" v-model="formdata.price"></el-input>
      </el-form-item>
      <el-form-item label="主厨">
        <el-input type="text" v-model="formdata.chef"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="text" v-model="formdata.desc"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      formdata: {},
      rules: {}
    };
  }
};
</script>

<style>
</style>