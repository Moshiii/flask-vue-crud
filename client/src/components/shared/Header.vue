<template>
  <a-layout-header>
    <a href="/">
      <div class="logo" />
    </a>
    <a-menu theme="dark" mode="horizontal" :default-selected-keys="[]" class="menu">
      <a-menu-item key="1">
        User
      </a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script>
export default {};
</script>

<style scoped>
.menu {
  line-height: 64px;
  float: right;
}
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>
