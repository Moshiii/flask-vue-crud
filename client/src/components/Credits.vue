<template>
  <a-layout id="components-layout-demo-top">
    <Header />
    <a-layout-content class="content">
      <section class="text">
        <h1>Life is too short to google the same code snippet twice.</h1>
        <p>Special thanks to:</p>
        <ul class="nostyle">
          <li><a href="https://www.pythonsheets.com/" target="_blank">Pysheeet</a></li>
          <li><a href="https://devhints.io/" target="_blank">Devhintks</a></li>
        </ul>
        <p>Made with ❤️ @Toronto + Waterloo, Canada.</p>
        <p>
          <a href="https://github.com/Moshiii/" target="_blank">Moshi</a>, <a>Zhao</a>, and
          <a href="https://github.com/cocoral" target="_blank">Coral</a>.
        </p>
      </section>
    </a-layout-content>
    <Footer />
  </a-layout>
</template>

<script>
export default {};
</script>

<style scoped>
.content {
  padding: 64px 50px;
  min-height: calc(100vh - 133px);
}

.text {
  text-align: center;
}
.nostyle {
  list-style: none;
}
</style>
