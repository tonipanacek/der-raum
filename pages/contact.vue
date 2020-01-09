<template>
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
</template>

<script>
import { mapActions } from "vuex"

export default {
  mounted() {
    this.unsetPages()
  },
  methods: mapActions(["unsetPages"])
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
