<template>
  <Stack class="navbar">
    <g-link to="/" class="nav-item logo">
      <g-image src="~/assets/images/logo.png" alt="Der Raum" />
    </g-link>
    <g-link to="/projekte/" class="nav-item title link">Projekte</g-link>
    <g-link to="/leistung/gestaltung" class="nav-item title">Leistung</g-link>
    <g-link to="/uber/team" class="nav-item title">Über</g-link>
    <g-link to="/kontakt/" class="nav-item title">Kontakt</g-link>
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
  .navbar {
    @include listStyleNone;
    .logo {
      margin-bottom: spacing(lg);
    }

    .active {
      color: color(dark);
      font-weight: 600;
    }
  }
</style>

