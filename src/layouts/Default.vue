<template>
  <div class="layout">
    <Stack id="right-sidebar">
      <Navbar />
    </Stack>
    <main class="main">
      <slot/>
    </main>
    <Stack id="left-sidebar">
      <div>
        <p>De/En</p>
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
}
.main{
  width: 60%;
  padding-bottom: $stack-space;
}
#right-sidebar {
  padding: $stack-space $stack-space * 3;
}
</style>
