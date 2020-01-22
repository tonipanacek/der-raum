<template>
  <Container id="home">
    <ServiceList :services="services" />
  </Container>
</template>

<script>
import { mapActions } from "vuex"
import Container from "~/components/Container"
import ServiceList from "~/components/ServiceList.vue"
export default {
  layout: "layout",
  components: {
    Container,
    ServiceList
  },
  async asyncData() {
    // create context via webpack to map over all blog posts
    const allServices = await require.context(
      "~/content/services/",
      true,
      /\.md$/
    )
    const services = allServices.keys().map(key => {
      // give back the value of each post context
      return allServices(key)
    })
    return {
      services
    }
  }
}
</script>

