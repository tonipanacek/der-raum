<template>
  <Container id="contact">
    <Frame>
      <img src="https://res.cloudinary.com/tonipanoche/image/upload/v1578507796/derRaum/contact.png">
    </Frame>
    <Cluster>
      <div class="about-text flex-sb">
        <div class="address">
          <h2>{{ $t("contact.name") }}</h2>
          <p>{{ $t("contact.streetNumber") }}</p>
          <p>{{ $t("contact.cityZip") }}</p>
          <p>{{ $t("contact.tel") }}</p>
          <p>{{ $t("contact.email") }}</p>
        </div>
        <div class="hours">
          <h3>{{ $t("contact.openingTitle") }}</h3>
          <p>{{ $t("contact.weekdays") }}</p>
          <p>{{ $t("contact.weekend") }}</p>
        </div>
      </div>
    </Cluster>
  </Container>
</template>

<script>
import Container from '~/components/Container'
import Cluster from '~/components/Cluster'
import Frame from '~/components/Frame'

export default {
  components: {
    Container,
    Cluster,
    Frame
  }
}
</script>

<style lang="scss">
#contact {
  h2, h3 {
    @include smallCaps;
    font-weight: 600;
    color: color(dark);
  }
}
</style>
