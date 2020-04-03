<template>
  <div class="social-icons">
    <a :href="$ta(attributes, 'instagram')" target="_blank" id="instagram-link"
    rel="noreferrer noopener">
      <img svg-inline src="~/assets/images/instagram.svg" alt="Instagram Icon" class="social-item" />
    </a>
    <a :href="$ta(attributes, 'pinterest')" target="_blank" id="pinterest-link" rel="noreferrer noopener">
      <img svg-inline src="~/assets/images/pinterest.svg" alt="Pinterest Icon" id="pinterest" class="social-item" />
    </a>
    <a :href="$ta(attributes, 'facebook')" target="_blank" id="facebook-link" rel="noreferrer noopener">
      <img svg-inline src="~/assets/images/facebook.svg" alt="Facebook Icon" class="social-item" />
    </a>
  </div>
</template>

<script>
import json from '~/content/data/social_media.json'
export default {
  name: "SocialIcons",
  data: () => {
    return {
      attributes: json["socialMedia"]
    }
  }
}
</script>

<style lang="scss">
svg.social-item {
  width: .7rem;
  height: auto;
  fill: color(light);
  overflow: visible;
  &:hover {
    fill: color(dark);
  }
}
svg#pinterest {
  height: .7rem;
}
#pinterest-link {
  height: 18px;
}
.social-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
