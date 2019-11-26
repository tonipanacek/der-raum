<template>
  <Stack class="navbar">
    <g-link to="/" class="logo">
      <g-image src="~/assets/images/logo.png" alt="Der Raum" />
    </g-link>
    <g-link to="/projekte/">Projekte</g-link>
    <g-link to="/leistung/">Leistung</g-link>
    <g-link to="/uber/">Über</g-link>
    <g-link to="/kontakt/">Kontakt</g-link>
  </Stack>
</template>

<script>
  import Stack from '~/components/Stack.vue';

  export default {
    name: 'Navbar',
    components: {
      Stack
    }
  }
</script>

<style lang="scss">
</style>

