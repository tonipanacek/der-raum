<template>
  <Container id="contact">
    <Frame id="contact-picture">
      <img src="https://res.cloudinary.com/dwvtvuml8/image/upload/v1579776833/Nachhaltigkeit-Wald-Natur_vyrdtf.jpg">
    </Frame>
    <Cluster>
      <div class="about-text">
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
.about-text {
  width: 100%;
  align-items: flex-start;
  .info {
    width: 45%;
  }
}
#contact {
  h2, h3 {
    @include smallCaps;
    font-weight: 600;
    color: color(dark);
  }
}
.info p {
  color: color(light);
  font-size: .75rem;
  margin-top: .5rem;
}
#contact-picture {
  max-width: 100ch;
}
</style>
