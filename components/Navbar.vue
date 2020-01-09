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
      :to="localePath('services')"
      class="nav-item title"
    >
      {{ $t('navbar.services') }}
    </nuxt-link>
    <nuxt-link
      :to="localePath('about')"
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
import Stack from '~/components/Stack'

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

    .nav-item {
      transition: color 500ms ease;
      &:hover {
        color: color(dark);
      }
    }

    .nuxt-link-exact-active {
      color: color(black);
      font-weight: 600;
      &:hover {
        color: color(dark);
      }
    }
  }
</style>
