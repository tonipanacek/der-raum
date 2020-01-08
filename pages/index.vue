<template>
  <Container>
    <div class="home-images">
      <img src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557304/derRaum/:filename%2C%20:year/derraum_-1436_qidbrs.jpg">
      <img src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557480/derRaum/:filename%2C%20:year/derraum_-1096_bkzaxm.jpg">
      <img src="https://res.cloudinary.com/tonipanoche/image/upload/v1575557644/derRaum/:filename%2C%20:year/derraum_-2049_pm2fwn.jpg">
    </div>
  </Container>
</template>

<script>
import Container from '~/components/Container';

export default {
  metaInfo: {
    title: 'Der Raum',
  },
  components: {
    Container,
  },
};
</script>

<style scoped lang="scss">
.home-images > img {
  /*max-width: 1000px;*/
}
</style>
