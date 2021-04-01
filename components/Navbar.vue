<template>
  <Stack class="navbar">
    <ul class="navbar-list-wrapper">
      <li>
        <nuxt-link :to="localePath({ name: 'index' })" class="nav-item logo">
          <Logo class="logo" />
        </nuxt-link>
      </li>
      <li>
        <button
          aria-expanded="false"
          aria-controls="menu-list"
          class="btn btn-burger"
          @click="toggleMobileMenu"
        >
          <svg viewBox="0 0 100 80" width="30" height="25">
            <rect width="100" height="5"></rect>
            <rect y="30" width="100" height="5"></rect>
            <rect y="60" width="100" height="5"></rect>
          </svg>
        </button>
        <button
          aria-expanded="true"
          aria-controls="menu-list"
          class="btn btn-close hidden"
          @click="toggleMobileMenu"
        >
          <img svg-inline src="~/assets/images/X_thick_2.svg" alt="Close Menu" />
        </button>
        <ul class="nav-items">
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
              id="product-nav-item"
            >
              {{ $t('navbar_titles.product') }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('philosophy')"
              :to="localePath({ name: 'philosophy' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.philosophy") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('partners')"
              :to="localePath({ name: 'partners' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.partners") }}
            </nuxt-link>
          </li>
          <li>
            <nuxt-link
              v-if="isOnline('press')"
              :to="localePath({ name: 'press' })"
              class="nav-item title"
            >
              {{ $t("navbar_titles.press") }}
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
import { mapState, mapActions } from "vuex"
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
  computed: {
    ...mapState(["menuOpen"]),
  },
  methods: {
    isOnline(menuItem) {
      const onlineNavbar = this.menuItems.map(item => item.toLowerCase())
      return onlineNavbar.includes(menuItem)
    },
    widthChange() {
      const mq = window.matchMedia( "(max-width: 1024px)" );
      return mq.matches
    },
    hideMenu(navItems, hamburger, close) {
      this.unsetMenuOpen();
      navItems.classList.remove('show');
      document.body.classList.remove('no-scroll');
      hamburger.classList.remove('hidden');
      close.classList.add('hidden');
    },
    showMenu(navItems, hamburger, close) {
      this.setMenuOpen();
      navItems.classList.add('show');
      document.body.classList.add('no-scroll');
      hamburger.classList.add('hidden');
      close.classList.remove('hidden');
    },
    toggleMobileMenu() {
      const navItems = document.querySelector('.nav-items');
      const hamburger = document.querySelector('.btn-burger');
      const close = document.querySelector('.btn-close');
      if (this.menuOpen) {
        this.hideMenu(navItems, hamburger, close);
      } else {
        this.showMenu(navItems, hamburger, close);
      }
    },
    ...mapActions(['setMenuOpen', 'unsetMenuOpen'])
  },
  watch: {
    $route (to, from) {
      if (window.matchMedia( "(max-width: 1024px)" ).matches) {
        const navItems = document.querySelector('.nav-items');
        const hamburger = document.querySelector('.btn-burger');
        const close = document.querySelector('.btn-close');
        this.hideMenu(navItems, hamburger, close);
        // if (to.path === '/' && this.menuOpen) {
        //   this.toggleMobileMenu();
        // }
      }
    }
  }
}
</script>

<style lang="scss">
.show {
  display: block !important;
}

.hidden {
  display: none;
}

.btn {
  outline: none;
  border: none;
  background: inherit;
  padding: 0;
  cursor: pointer;
  @include respond-to('large') {
    display: none;
  }
}
.btn-close {
  img, svg {
    width: 30px;
    height: 25px;
    &:focus {
      outline: 0;
    }
  }
}
.navbar ul {
  list-style: none;
  margin: 0;
  padding: 0;
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
    position: fixed;
    top: 6rem;
    right: 0;
    bottom: 0;
    left: calc(4rem + 80px);
    z-index: 10;
    padding-right: 1rem;
    // padding-left: 3rem;
    background: white;
    display: none;
    @include respond-to('large') {
      display: block;
      margin-top: spacing(md);
      padding-right: 0;
      padding-left: 0;
      position: static;
    }
  }
}

</style>
