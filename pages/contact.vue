<template>
  <Layout>
    <div class="full-main">
      <img src="https://res.cloudinary.com/tonipanoche/image/upload/v1578507796/derRaum/contact.png">
      <div class="about-text flex-sb">
        <div class="address">
          <h2>Der Raum</h2>
        </div>
        <div class="hours">
          <h3>Hours</h3>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo() {
    return {
      title: "contact"
    }
  }
}
</script>

<style lang="scss">
.full-main {
  img,
  .about-text {
    max-width: 110ch;
  }
  img {
    object-fit: cover;
    max-height: 70vh;
    width: 110ch;
  }
  h2,
  h3 {
    @include smallCaps;
    color: color(dark);
    font-weight: 600;
  }
}
</style>
