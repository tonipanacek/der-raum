<template>
  <Stack class="navbar">
    <ul class="navbar-list-wrapper">
      <li>
        <nuxt-link :to="localePath({ name: 'index' })" class="nav-item logo">
          <Logo class="logo" />
        </nuxt-link>
      </li>
      <li>
        <ul class="nav-items">
          <li>
            <nuxt-link
              v-if="isOnline('projects')"
              :to="localePath({ name: 'index' })"
              class="nav-item title link"
            >
              {{ $t("navbar_titles.projects") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('studio')"
              :to="localePath({ name: 'studio' })"
              class="nav-item title link"
            >
              {{ $t("navbar_titles.studio") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('carpentry')"
              :to="localePath({ name: 'carpentry' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.carpentry") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('product')"
              :to="localePath({ name: 'product' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.product") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('about')"
              :to="localePath({ name: 'about' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.about") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('contact')"
              :to="localePath({ name: 'contact' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.contact") }}
            </nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </Stack>
</template>

<script>
import Stack from "~/components/Stack"
import Logo from "~/assets/images/logo.svg"
import menuItems from "~/content/data/navbar.json"

export default {
  name: "Navbar",
  data() {
    return {
      menuItems: menuItems.onlineMenuItems
    }
  },
  components: {
    Stack,
    Logo
  },
  methods: {
    isOnline(menuItem) {
      const onlineNavbar = this.menuItems.map(item => item.toLowerCase())
      return onlineNavbar.includes(menuItem)
    }
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
  .nuxt-link-exact-active {
    color: color(black);
    font-weight: 900;
    &:hover {
      color: color(black);
      font-weight: 900;
    }
  }
  .nav-items {
    padding-left: 0;
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
