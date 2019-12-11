<template>
  <Layout>
    <Container>
      <!-- Learn how to use images here: https://gridsome.org/docs/images -->
      <h1>Hallo, welt!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
      </p>
      <div class="home-images flex">
        <g-image src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557304/derRaum/:filename%2C%20:year/derraum_-1436_qidbrs.jpg"/>
        <g-image src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557480/derRaum/:filename%2C%20:year/derraum_-1096_bkzaxm.jpg"/>
        <g-image src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557644/derRaum/:filename%2C%20:year/derraum_-2049_pm2fwn.jpg""/>
      </div>
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
