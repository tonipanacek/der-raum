<template>
  <div id="images" />
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      de: '/projekte/:slug/bilder/',
      en: '/projects/:slug/images/'
    }
  },
  mounted() {
    this.$router.push(this.$route.path + '/1')
  }
}
</script>
