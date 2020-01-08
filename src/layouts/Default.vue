<template>
  <div class="layout flex">
    <Stack id="left-sidebar">
      <Navbar />
    </Stack>
    <main class="main">
      <slot/>
    </main>
    <Stack id="right-sidebar">
      <div class="right-stack small-very">
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
  margin-top: spacing(lg);
}
.main{
  flex-grow: 1;
  padding-bottom: $stack-space;
}
#left-sidebar {
  padding: 0 $stack-space * 3;
  width: 40ch;
}
#right-sidebar {
  padding-right: 2rem;
  .right-stack{
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
