<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div class="main">
      <order-sum />
    </div> -->
    <!-- <order-detail /> -->
    <!-- <goods-manage /> -->
    <!-- <cuisine-manage /> -->
  </div>
</template>

<script>
import OrderDetail from "@/views/goods/OrderDetails";
import GoodsManage from "@/views/goods/Manage";
import CuisineManage from "@/views/cuisine/Manage";
import OrderSum from "@/views/goods/OrderSum";
export default {
  name: "App",
  components: { OrderDetail, GoodsManage, CuisineManage, OrderSum }
};
</script>

<style lang="scss">
</style>
