<template>
  <Layout>
    <Container>
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <h1>Hello, English world!</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>
    <p class="home-links">
      <a href="https://gridsome.org/docs/" target="_blank" rel="noopener">Gridsome Docs</a>
      <a href="https://github.com/gridsome/gridsome" target="_blank" rel="noopener">GitHub</a>
    </p>
  </Container>
  </Layout>
</template>

<script>
import Container from '~/components/Container';
export default {
  metaInfo: {
    title: 'Der Raum'
  },
  components: {
    Container
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
