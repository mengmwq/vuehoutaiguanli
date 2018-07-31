<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo"  unique-opened router>
      <template v-for="item in items">
        <template v-if="item.son">
          <el-submenu :index="''+item.action">
            <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
            <el-menu-item v-for="(subItem,i) in item.son" :key="i" :index="''+subItem.action">{{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="''+item.action">

            <i :class="item.icon"></i>{{ item.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {

       items: [
         {
           icon: "el-icon-edit",
           action: "readme",
           name: "首页",

         },
         {
           icon: "el-icon-document",
           name: "库存管理",
           son: [
             {
               action: "inventoryManagement",
               name: "库存管理"
             },
             {
               action: "addDevice",
               name: "设备添加"
             },

           ]
         },
         {
           icon: "el-icon-location",
           action: "positionTrailing",
           name: "位置跟踪",
         },
         {
           icon: "el-icon-loading",
           action: "humitureSupervision",
           name: "温湿度监控",
         },


       ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },

};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 60px;
  bottom: 0;

}
.sidebar > ul {
  height: 100%;

}


.el-dropdown-menu__item--divided:before, .el-menu, .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, .el-menu--horizontal>.el-submenu  {
  background-color: #5e7382;
}
.el-menu-item{
  background-color: #5e7382;
}


.el-menu-item:hover{
  background-color: #ffffff;
}
</style>
