<template>
  <div id="press" />
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      de: '/presse',
      en: '/press'
    }
  },
  mounted() {
    this.$router.push(this.$route.path + '/1')
  }
}
</script>
