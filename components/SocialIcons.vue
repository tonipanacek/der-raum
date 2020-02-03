<template>
  <Cluster>
    <div class="social-icons">
      <a href="https://www.instagram.com/der.raum" target="_blank">
        <img svg-inline src="~/assets/images/instagram.svg" alt="Instagram Icon" class="social-item" />
      </a>
      <a href="https://www.pinterest.com/derraum" target="_blank" >
        <img svg-inline src="~/assets/images/pinterest.svg" alt="Pinterest Icon" id="pinterest" class="social-item" />
      </a>
      <a href="https://www.facebook.com/derraumberlin" target="_blank">
        <img svg-inline src="~/assets/images/facebook.svg" alt="Facebook Icon" class="social-item" />
      </a>
    </div>
  </Cluster>
</template>

<script>
import Cluster from '~/components/Cluster'
export default {
  name: "SocialIcons",
  components: {
    Cluster
  }
}
</script>

<style lang="scss">
svg.social-item {
  width: .8rem;
  height: auto;
  fill: color(light);
  &:hover {
    fill: color(dark);
  }
}
svg#pinterest {
  height: .8em;
}
.social-icons {
  justify-content: space-between;
}
</style>
