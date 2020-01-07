<template>
  <div class="layout">
    <Stack id="left-sidebar">
      <Navbar />
    </Stack>
    <main class="main">
      <slot/>
    </main>
    <Stack id="right-sidebar">
      <div class="right-sidebar small-very">
        <p>De / En</p>
        <p>Legal / Privacy</p>
      </div>
    </Stack>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Stack from '~/components/Stack.vue'

export default {
  components: {
    Navbar,
    Stack
  }
}
</script>

<style lang="scss">
.layout {
  display: flex;
  margin-top: spacing(lg);
}

.main{
  width: 60%;
  flex-grow: 1;
  padding-bottom: $stack-space;
}
#left-sidebar {
  padding: 0 $stack-space * 3;
  width: 40ch;
}
#right-sidebar {
  padding-right: 2rem;
  .right-sidebar {
    height: 90vh;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    p {
      @include smallCaps;
      writing-mode: vertical-lr;
    }
  }
}
</style>
