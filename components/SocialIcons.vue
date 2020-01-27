<template>
  <Cluster>
    <div class="social-icons">
      <a href="http://www.instagram.com/der.raum" target="_blank">
        <img svg-inline src="~/assets/images/linkedin.svg" alt="Linkedin Icon" class="social-item" />
      </a>
      <a href="https://www.pinterest.com/derraum" target="_blank" >
        <img svg-inline src="~/assets/images/pinterest.svg" alt="Pinterest Icon" id="pinterest" class="social-item" />
      </a>
      <a href="https://www.facebook.com/derraumberlin" target="_blank">
        <img svg-inline src="~/assets/images/twitter.svg" alt="Twitter Icon" class="social-item" />
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
  fill: color(light);
}
svg#pinterest {
  height: .8em;
}
.social-icons {
  margin-top: spacing(sm);
  > * {
    padding-right: spacing(sm);
  }
}
</style>
