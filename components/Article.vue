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
  min-height: calc(100vh - 2 * #{spacing(frame)});
  align-items: space-between;
  .image-container {
    flex-grow: 2;
    margin-bottom: spacing(frame);
    img {
      object-fit: cover;
      max-width: 100%;
      @respond-to("large") {
        object-position: left top;
        object-fit: contain;
      }
    }
  }
  img,
  & > * {
    max-width: none;
  }
  img {
    object-fit: cover;
    max-height: 80vh;
    max-width: 110ch;
  }
  .text {
    padding: spacing(frame);
    @include respond-to(large) {
      padding: 0;
    }
    h1 {
      @include smallCaps;
      color: color(dark);
      font-weight: 300;
    }
    ul {
      list-style-type: square;
    }
    p, ul > li {
      line-height: 2rem;
      color: color(light);
      font-size: .8em;
    }
    strong {
      color: color(dark);
      font-weight: 300;
    }
    // & > *, & > * > p:first-child {
    //   display: inline;
    // }
  }
}
</style>
