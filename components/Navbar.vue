<template>
  <Stack class="navbar">
    <ul class="navbar-list-wrapper">
      <li>
        <nuxt-link :to="localePath({ name: 'index' })" class="nav-item logo">
          <Logo class="logo" />
        </nuxt-link>
      </li>
      <div class="nav-items">
        <li>
          <nuxt-link :to="localePath({ name: 'projects' })" class="nav-item title link">
            {{ $t("navbar.projects") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'services' })" class="nav-item title">
            {{ $t("navbar.services") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'rooms' })" class="nav-item title">
            {{ $t("navbar.rooms") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'about' })" class="nav-item title">
            {{ $t("navbar.about") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath({ name: 'contact' })" class="nav-item title">
            {{ $t("navbar.contact") }}
          </nuxt-link>
        </li>
      </div>
    </ul>
  </Stack>
</template>

<script>
import Stack from "~/components/Stack"
import Logo from "~/assets/images/logo.svg"

export default {
  name: "Navbar",
  components: {
    Stack,
    Logo
  }
}
</script>

<style lang="scss">
.navbar ul {
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  padding-block-start: 0;
  padding-block-end: 0;
  -webkit-padding-start: 0;

  li {
    display: block;
  }
}

.navbar-list-wrapper {
  display: flex;
  justify-content: space-between;
  padding-left: 0;
}

@include respond-to('large') {
  .navbar-list-wrapper {
    display: block;
  }
}

.navbar {
  .logo {
    height: 7.5rem;
    width: 5rem;
    margin-bottom: spacing(sm);
  }
  .nav-item {
    transition: color 100ms ease, font-weight 100ms ease;
    &:hover {
      color: color(dark);
      font-weight: 900;
    }
  }
  .nuxt-link-active {
    color: color(black);
    font-weight: 900;
    &:hover {
      color: color(black);
      font-weight: 900;
    }
  }
  .nav-items {
    li:first-child {
      a {
        margin-top: 0;
        line-height: .7rem;
      }
    }
    margin-top: 0;
    @include respond-to('large') {
      margin-top: spacing(md);
    }
  }
}

</style>
