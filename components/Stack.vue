<template>
  <div class="stack">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Stack'
}
</script>

<style lang="scss">
// https://every-layout.dev/layouts/stack/
.stack {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.stack > * {
  margin-top: 0;
  margin-bottom: 0;
}

.stack > * + * {
  margin-top: var($stack-space);
}
</style>
