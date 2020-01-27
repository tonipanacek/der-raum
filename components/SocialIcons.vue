<template>
  <div class="social-icons">
<!--     <div class="social-wrapper"> -->
      <a href="http://www.instagram.com/der.raum" target="_blank" class="social-item">
        <img src="~/assets/images/linkedin.svg" alt="Linkedin Icon" />
      </a>
      <a href="https://www.pinterest.com/derraum" target="_blank" class="social-item">
        <img src="~/assets/images/pinterest.svg" alt="Pinterest Icon" />
      </a>
      <a href="https://www.facebook.com/derraumberlin" target="_blank" class="social-item">
        <img src="~/assets/images/twitter.svg" alt="Twitter Icon" />
      </a>
<!--     </div> -->
  </div>
</template>

<script>
export default {
  name: "SocialIcons"
}
</script>

<style lang="scss">
.social-icons {
  text-align: center;
  margin-top: spacing(lg);
}
.social-item img {
  width: 1rem;
  fill: color(light);
}



</style>
