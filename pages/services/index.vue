<template>
  <div id="services" />
</template>

<script>
import { get } from 'lodash'

export default {
  async asyncData () {
    // create context via webpack to map over all blog services
    const allServices = await require.context('~/content/services/', true, /\.md$/)
    const services = allServices.keys().map((key) => {
      // give back the value of each service context
      return allServices(key)
    })
    return {
      services
    }
  },
  mounted () {
    const services = this.$data.services
    const service = get(services, '0', {})
    const slug = this.formatSlug(get(service, 'attributes.title', ''))
    const redirectPath = this.localePath({
      name: 'services-slug',
      params: {
        slug
      }
    })
    this.$router.push(redirectPath)
  }
}
</script>
