<template>
  <div class="sidebar">
    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style lang="scss">
  .with-sidebar {
  /* ↓ Suppresses scrolling sometimes caused
  by the overflow */
  overflow: hidden;
  }
  .with-sidebar > * {
    /* ↓ The space value; the first point on the modular scale */
    --space: var(--s1);
    /* ↓ Establish the flex context and allow wrapping */
    display: flex;
    flex-wrap: wrap;
    /* ↓ Negate the margin to follow
    (`* -1` makes the value negative) */
    margin: calc(var(--space) / 2 * -1);
  }
  .with-sidebar > * > * {
    /* ↓ Half margins meet to make the whole space value together */
    margin: calc(var(--space) / 2);
    /* ↓ Allow growing (needed for the vertical configuration) */
    flex-grow: 1;
  }
  .with-sidebar > * > :last-child {
    /* ↓ Grow from nothing */
    flex-basis: 0;
    /* ↓ Ensure all the available space is taken */
    flex-grow: 999;
    /* ↓ The value at which the configuration changes
    between horizontal and vertical */
    min-width: calc(50% - var(--space));
  }
</style>
