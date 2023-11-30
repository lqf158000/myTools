<template>
  <div>
    <el-menu
      class="el-menu-vertical"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
    >
      <template v-for="page in routePages">
        <el-menu-item
          v-if="page.meta && page.meta.isMenu"
          :key="page.name"
          :index="page.path"
        >
          <span slot="title">{{ page.meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import routePages from "../router/routers.ts";

export default {
  data() {
    return {
      routePages,
    };
  },
  methods: {},
};
</script>

<style scoped>
.el-menu-vertical {
  height: 100vh;
  width: 100px;
}
</style>
