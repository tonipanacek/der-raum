<template>
  <div class="social-icons">
    <div class="list-wrapper">
      <a href="http://www.instagram.com/der.raum" target="_blank">
        <font-awesome-icon :icon="['fab', 'instagram']"/>
      </a>
      <a href="https://www.pinterest.com/derraum" target="_blank">
        <font-awesome-icon :icon="['fab', 'pinterest']"/>
      </a>
      <a href="https://www.facebook.com/derraumberlin" target="_blank">
        <font-awesome-icon :icon="['fab', 'facebook']"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SocialIcons"
}
</script>

<style lang="scss">
.social-icons {
  a {
    text-decoration: none;
    color: color(light);
    font-size: 1rem;
    padding: spacing(xs);
  }
  width: 100%;
  margin-top: spacing(lg);
}

</style>
