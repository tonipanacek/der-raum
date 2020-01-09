<template>
  <div id="legal">
    <h1>Legal</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error doloremque
      omnis animi, eligendi magni a voluptatum, vitae, consequuntur rerum illum
      odit fugit assumenda rem dolores inventore iste reprehenderit maxime!
      Iusto.
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  mounted() {
    this.unsetPages()
  },
  methods: mapActions(["unsetPages"])
}
</script>
