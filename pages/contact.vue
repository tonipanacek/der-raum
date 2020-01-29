<template>
  <Container id="contact">
    <Article class="contact">
      <div class="image-container">
        <Frame>
          <img src="https://res.cloudinary.com/dwvtvuml8/image/upload/v1579776429/Screen_Shot_2020-01-08_at_7.21.05_PM_xkdla2.png">
        </Frame>
      </div>
      <Cluster>
        <div class="text">
          <div class="info">
            <h1>{{ $t("contact.name") }}</h1>
            <a target="_blank" href="https://www.google.com/maps/search/?api=1&query=der%20raum">
              <p>{{ $t("contact.streetNumber") }}</p>
              <p>{{ $t("contact.cityZip") }}</p>
            </a>
            <a href="tel:03039375300">
              <p>{{ $t("contact.tel") }}</p>
            </a>
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
  </Container>
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
.contact {
  .text {
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
  .image-container {
    .frame {
      height: 100%;
      width: 100%;
    }
  }
}
.info {
  width: 30ch;
  a {
    text-decoration: none;
  }
  p {
    line-height: 1rem;
    margin: 0;
  }
  h3 {
    @include smallCaps;
    color: color(dark);
    font-size: 1rem;
    font-weight: 300;
  }
}

$main-height: calc(100vh - 3 * #{spacing(lg)});
@include respond-to(large) {
  #contact {
    height: $main-height;
  }
}
</style>
