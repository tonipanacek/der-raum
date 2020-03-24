<template>
  <ServiceList :services="services" />
</template>

<script>
import { get, sortBy } from "lodash"
import { mapActions } from "vuex"
import ServiceList from "~/components/ServiceList.vue"
export default {
  layout: "layout",
  components: {
    ServiceList
  },
  async asyncData() {
    // create context via webpack to map over all blog posts
    const allServices = await require.context(
      "~/content/services/",
      true,
      /\.md$/
    )
    let services = allServices.keys().map(key => {
      // give back the value of each post context
      return allServices(key)
    })
    services = sortBy(services, service => get(service, 'attributes.position'))
    return {
      services
    }
  }
}
</script>



