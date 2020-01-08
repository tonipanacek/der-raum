<template>
  <Stack class="navbar">
    <nuxt-link :to="localePath('index')" class="nav-item logo">
      <g-image src="~/assets/images/logo.png" alt="Der Raum" />
    </nuxt-link>
    <nuxt-link :to="localePath('projects')" class="nav-item title link">
      {{ $t('navbar.projects') }}
    </nuxt-link>
    <nuxt-link :to="localePath('services')" class="nav-item title">
      {{ $t('navbar.services') }}
    </nuxt-link>
    <nuxt-link :to="localePath('about')" class="nav-item title">
      {{ $t('navbar.about') }}
    </nuxt-link>
    <nuxt-link :to="localePath('contact')" class="nav-item title">
      {{ $t('navbar.contact') }}
    </nuxt-link>
  </Stack>
</template>

<script>
import Stack from '~/components/Stack.vue'

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
