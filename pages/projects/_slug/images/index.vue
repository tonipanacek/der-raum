<template>
  <div id="images" />
</template>

<script>
export default {
  mounted() {
    this.$router.push(this.$route.path + '/1')
  }
}
</script>
