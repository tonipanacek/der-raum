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
  align-items: space-between;
  margin: 0 auto;
  &.project {
    justify-content: space-between;
  }
  @include respond-to('large') {
    min-height: calc(100vh - 2 * #{spacing(frame)});
    width: 100%;
  }
  .image-container {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .text {
    padding: spacing(frame);
    @include respond-to(large) {
      margin-top: spacing(frame);
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
      font-size: .85rem;
    }
    strong {
      color: color(dark);
      font-weight: 600;
    }
  }
  a,
  a:focus,
  a:visited {
    transition: color 100ms ease, font-weight 100ms ease-in-out;
    text-decoration: none;
    color: color(dark);
    &:hover {
      color: color(black);
      font-weight: 400;
    }
    &:focus {
      outline: 0;
    }
  }

}
</style>
