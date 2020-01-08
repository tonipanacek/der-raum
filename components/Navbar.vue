<template>
  <Stack class="navbar">
    <nuxt-link
      :to="localePath('index')"
      class="nav-item logo"
    >
      <img
        src="~/assets/images/logo.png"
        alt="Der Raum"
      >
    </nuxt-link>
    <nuxt-link
      :to="localePath('projects')"
      class="nav-item title link"
    >
      {{ $t('navbar.projects') }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('services-design')"
      class="nav-item title"
    >
      {{ $t('navbar.services') }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('about-team')"
      class="nav-item title"
    >
      {{ $t('navbar.about') }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('contact')"
      class="nav-item title"
    >
      {{ $t('navbar.contact') }}
    </nuxt-link>
  </Stack>
</template>

<script>
import Stack from '~/components/Stack.vue';

export default {
  name: 'Navbar',
  components: {
    Stack,
  },
};
</script>

<style lang="scss">
  .navbar {
    @include listStyleNone;
    .logo {
      margin-bottom: spacing(lg);
    }

    .nav-item {
      transition: color 500ms ease;
      &:hover {
        color: darken(color(light), 10%);
      }
    }

    .nuxt-link-exact-active {
      color: color(dark);
      font-weight: 600;
      &:hover {
        color: color(dark);
      }
    }
  }
</style>
