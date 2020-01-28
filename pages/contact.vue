<template>
  <Article class="contact">
    <div class="image-container">
      <Frame>
        <img src="https://res.cloudinary.com/dwvtvuml8/image/upload/v1579776429/Screen_Shot_2020-01-08_at_7.21.05_PM_xkdla2.png">
      </Frame>
    </div>
    <Cluster>
      <div class="contact-text">
        <div class="info">
          <h2>{{ $t("contact.name") }}</h2>
          <p>{{ $t("contact.streetNumber") }}</p>
          <p>{{ $t("contact.cityZip") }}</p>
          <p>{{ $t("contact.tel") }}</p>
          <p>{{ $t("contact.email") }}</p>
        </div>
        <div class="info">
          <h3>{{ $t("contact.openingTitle") }}</h3>
          <p>{{ $t("contact.weekdays") }}</p>
          <p>{{ $t("contact.weekend") }}</p>
        </div>
      </div>
    </Cluster>
  </Article>
</template>

<script>
import Container from '~/components/Container'
import Cluster from '~/components/Cluster'
import Frame from '~/components/Frame'
import Article from "~/components/Article"

export default {
  components: {
    Container,
    Cluster,
    Frame,
    Article
  }
}
</script>

<style lang="scss">
.contact {
  max-width: 110ch;
  h2,
  h3 {
    @include smallCaps;
    color: color(dark);
  }
}
.contact-text {
  margin: spacing(sm) 0;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  .info {
    width: 45%;
  }
}
.info p {
  color: color(light);
  font-size: .75rem;
  margin-top: .5rem;
}
</style>
