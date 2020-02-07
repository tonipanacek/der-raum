<template>
  <article class="article">
    <slot />
  </article>
</template>

<script>
export default {
  name: "Article"
}
</script>

<style lang="scss">
.article {
  display: flex;
  flex-direction: column;
  max-width: 110ch;
  align-items: space-between;
  margin: 0 auto;
  @include respond-to('large') {
    min-height: calc(100vh - 2 * #{spacing(frame)});
  }
  .image-container {
    margin-bottom: spacing(frame);
    img {
      object-fit: cover;
      max-width: 100%;
      max-height: 100%;
    }
  }
  img,
  & > * {
    max-width: none;
  }
  img {
    object-fit: cover;
    max-height: 80vh;

  }
  .text {
    padding: spacing(frame);
    @include respond-to(large) {
      padding: 0;
      padding-bottom: 1em;
    }
    h1 {
      @include smallCaps;
      color: color(black);
      font-weight: 600;
    }
    ul {
      list-style-type: square;
    }
    p, ul > li {
      line-height: 2rem;
      color: color(dark);
      font-size: .8em;
    }
    strong {
      color: color(dark);
      font-weight: 600;
    }
  }
}
</style>
