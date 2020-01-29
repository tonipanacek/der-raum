<template>
  <Stack class="navbar">
    <ul class="list-wrapper">
      <li>
        <nuxt-link :to="localePath('index')" class="nav-item logo">
          <Logo class="logo" />
        </nuxt-link>
      </li>
      <div class="nav-items">
        <li>
          <nuxt-link :to="localePath('projects')" class="nav-item title link">
            {{ $t("navbar.projects") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('services')" class="nav-item title">
            {{ $t("navbar.services") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('rooms')" class="nav-item title">
            {{ $t("navbar.rooms") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('about')" class="nav-item title">
            {{ $t("navbar.about") }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link :to="localePath('contact')" class="nav-item title">
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

.list-wrapper {
  display: flex;
  justify-content: space-between;
}

@include respond-to('large') {
  .list-wrapper {
    display: block;
  }
}

.navbar {
  .logo {
    height: auto;
    width: 5rem;
    margin-bottom: spacing(sm);
  }
  .nav-item {
    transition: color 500ms ease, font-weight 500ms ease;
    &:hover {
      color: color(dark);
    }
  }
  .nuxt-link-active {
    color: color(black);
    font-weight: 600;
    &:hover {
      color: color(dark);
    }
  }
  .nav-items {
    li:first-child {
      a {
        margin-top: 0;
      }
    }
    margin-top: 0;
    @include respond-to('large') {
      margin-top: spacing(md);
    }
  }
}

</style>
