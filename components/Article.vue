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
  &.project {
    .image-container {
      img {
        object-fit: contain;
        @include respond-to("large") {
        object-position: left top;
        object-fit: cover;
        height: 100%;
        }
      }
    }
  }
  .image-container {
    flex-grow: 2;
    margin-bottom: spacing(frame);
    position: relative;
    height: 100%;
    justify-content: space-around;
    display: flex;
    & > *:not(.frame) {
      img {
      position: absolute;
      overflow: hidden;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      object-fit: cover;
        @include respond-to("large") {
          object-position: left top;
          object-fit: contain;
          height: 100%;
          width: 100%;
        }
      }
    }
    img {
      object-fit: cover;
      @include respond-to("large") {
        object-position: left top;
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }
  & > * {
    max-width: none;
  }
  .text {
    padding: spacing(frame);
    @include respond-to(large) {
      padding: 0;
    }
    h1 {
      @include smallCaps;
      color: color(dark);
      font-weight: 600;
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
  }
}
</style>
