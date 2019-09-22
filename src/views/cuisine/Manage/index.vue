<template>
  <div>
    <div class="manage">
      <span class="nav-title">菜品管理</span>
      <el-divider></el-divider>
      <div class="main">
        <div class="main-header">
          <span class="content-header">所属公司：</span>
          <el-select v-model="value" placeholder="请选择" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="content-header">类型：</span>
          <el-select v-model="value" placeholder="请选择" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="content-header">餐次：</span>
          <el-select v-model="value" placeholder="请选择" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" plain>查询</el-button>
          <el-button type="primary">添加</el-button>
        </div>
        <div class="main-content">
          <el-card :body-style="{ padding:0, }" v-for="o in 5" :key="o">
            <div class="image">
              <img :src="fil[o%fil.length]" alt />
            </div>
            <div style="padding: 14px;">
              <ul class="main-title">
                <li>名称：</li>
                <li>类型</li>
                <li>餐次：</li>
                <li>价格：</li>
                <li>主厨：</li>
              </ul>
              <div class="bottom clearfix"></div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <cuisine-dialog :visible="visible" />  
  </div>
</template>

<script>
import CuisineDialog from './dialog'
export default {
  data() {
    return {
      visible:true,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      currentDate: new Date(),
      fil: [
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      ]
    };
  },
  components:{CuisineDialog}
};
</script>

<style lang="scss" scoped>
.manage {


  .main {
    height: 100%;

    .main-content {
      display: flex;
      width: 100%;
      .main-title {
        font-size: 18px;
      }
      .el-card {
        width: 100%;
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
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }
        .clearfix:before,
        .clearfix:after {
          display: table;
          content: "";
        }

        .clearfix:after {
          clear: both;
        }
      }
    }
  }
}
</style>