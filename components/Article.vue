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
  min-height: calc(100vh - 2 * #{spacing(lg)});
  max-width: 110ch;
  align-items: space-between;
  .image-container {
    flex-grow: 2;
    margin-bottom: spacing(md);
  }
  img,
  & > * {
    max-width: none;
  }
  img {
    object-fit: cover;
    max-height: 70vh;
    width: 110ch;
  }
  .text {
    padding: spacing(md);
    @include respond-to(large) {
      padding: 0;
    }
    h1 {
      @include smallCaps;
      color: color(dark);
      font-size: 1rem;
      font-weight: 300;
    }
    ul {
      list-style-type: square;
    }
    p, ul > li {
      line-height: 2rem;
      color: color(light);
      font-size: .85em;
    }
    strong {
      color: color(dark);
      font-weight: 300;
    }
    & > *, & > * > p:first-child {
      display: inline;
    }
  }
}
</style>
