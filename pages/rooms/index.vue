<template>
  <div id="rooms" />
</template>

<script>
import { get, min } from "lodash"

export default {
  async asyncData() {
    // create context via webpack to map over all blog rooms
    const allRooms = await require.context("~/content/rooms/", true, /\.md$/)
    const rooms = allRooms.keys().map(key => {
      // give back the value of each room context
      return allRooms(key)
    })
    return {
      rooms
    }
  },
  mounted() {
    const rooms = this.$data.rooms
    const positions = rooms.map(room => get(room, "attributes.position"))
    const minPosition = min(positions)
    const room = rooms.find(
      room => get(room, "attributes.position") === minPosition
    )
    const slug = this.formatSlug(get(room, "attributes.title", ""))
    const redirectPath = this.localePath({
      name: "rooms-slug",
      params: {
        slug
      }
    })
    this.$router.push(redirectPath)
  }
}
</script>
