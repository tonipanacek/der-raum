<template>
  <Stack id="right-sidebar">
    <div class="social-wrapper">
      <SocialIcons id="right-social"/>
    </div>
    <div class="right-stack small-very">
      <p>
        <nuxt-link :to="switchLocalePath('de')" hreflang="de" rel="alternate">De</nuxt-link>
        /
        <nuxt-link :to="switchLocalePath('en')" hreflang="en" rel="alternate">En</nuxt-link>
      </p>
      <p>
        <nuxt-link :to="localePath('impressum')">{{ $t("rightSidebar.impressum") }}</nuxt-link>
        /
        <nuxt-link :to="localePath('privacy')">{{ $t("rightSidebar.privacy") }}</nuxt-link>
      </p>
    </div>
  </Stack>
</template>

<script>
import Stack from "~/components/Stack"
import SocialIcons from "~/components/SocialIcons"

export default {
  name: "RightSidebar",
  components: {
    Stack,
    SocialIcons
  }
}
</script>

<style lang="scss">
$main-height: calc(100vh - 2 * #{spacing(frame)});
.right-sidebar {
  background: white;
  padding: 1em 2em 2em 2em;
  a,
  a:hover,
  a:focus,
  a:visited {
    transition: color 500ms ease, font-weight 500ms ease;
    text-decoration: none;
    color: color(light);
    &:hover {
      color: color(dark);
    }
    &.nuxt-link-exact-active {
      color: color(dark);
      font-weight: 600;
    }
  }
  .right-stack {
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: initial;
    align-items: flex-end;
    height: 2em;
    p {
      @include smallCaps;
      color: color(light);
      font-size: 1em;
      writing-mode: horizontal-tb;
      margin: 0;
    }
  }
}
@include respond-to('large') {
  .right-sidebar {
    width: 50px;
    position: relative;
    height: $main-height;
    margin: 0 2em;
    padding: 0;
    .right-stack {
      margin-top: 0;
      height: $main-height;
      flex-direction: column;
      p {
        writing-mode: vertical-lr;
      }
    }
  }
}
.social-wrapper {
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @include respond-to('large') {
    height: 0;
  }
  #right-social {
    display: flex;
    width: 6rem;
    height: 2rem;
    align-items: center;
    justify-content: space-around;
    margin: spacing(frame) 0;
    @include respond-to('large') {
      display: none;
    }
  }
}
</style>
